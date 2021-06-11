const plugins = [
  "@vue/babel-plugin-transform-vue-jsx",
  ['import', {
  libraryName: 'vant',
  libraryDirectory: 'es',
  style: true
}, 'vant']
]

if(process.env.VUE_APP_CONSOLE === 'false') {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
