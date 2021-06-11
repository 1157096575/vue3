const Home = () => import(/* webpackChunkName: "home" */'_c/home/home.vue')
const page1 = () => import(/* webpackChunkName: "page1" */'_c/page1/page1.vue')

export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      keepAlive: true
    },
    component: Home
  },
  {
    path: '/page1',
    name: 'page1',
    meta: {
      title: 'page1',
      isLogin: true
    },
    component: page1
  }
]
