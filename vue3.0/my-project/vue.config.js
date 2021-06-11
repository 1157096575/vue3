const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

const Timestamp = new Date().getTime();
let isaOutputConfig = {};
if(process.env.NODE_ENV === "production"){
  isaOutputConfig = {
    css: {
      // 是否使用css分离插件 ExtractTextPlugin
      extract: {
        filename: `css/[name].[chunkhash:8].${Timestamp}.css`,
        chunkFilename:`css/[name].[chunkhash:8].${Timestamp}.css`
      }
    },
    configureWebpack: {
      output: { // 输出重构  打包编译后的 文件名称  【模块名称.hash.时间戳】
        filename: `js/[name].[chunkhash:8].${Timestamp}.js`,
        chunkFilename: `js/[name].[chunkhash:8].${Timestamp}.js`
      }
    }
  }
}
// 配置静态资源cdn路径
let URL = './'
let outputDir = 'dist'
if(process.env.NODE_ENV === "production"){
  URL = process.env.VUE_APP_URL ? process.env.VUE_APP_URL :'/'
  outputDir = process.env.VUE_APP_OUTPUTDIR ? process.env.VUE_APP_OUTPUTDIR : 'dist'
}
module.exports = {
  publicPath: URL,
  filenameHashing: true,
  outputDir:outputDir + Timestamp,
  productionSourceMap: process.env.VUE_APP_CONSOLE === 'true',
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    /*设置路径别名*/
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"))
      .set("_image", resolve("src/assets/image"));

    /*全局注入公共样式*/
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
  // 合并 scss 文件
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        
      ]
    }
  },
  ...isaOutputConfig,
  /*跨域代理*/
  devServer: {
    disableHostCheck: true,
    // https: true,
    proxy: {
      "/api": {
     target: "http://xxx", //api
        ws: true,
        changeOrigin: true,
        secure: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        /*注意依赖的文件要放置在前面*/
        path.resolve(__dirname, "./src/styles/css.scss"),
      ]
    });
}
