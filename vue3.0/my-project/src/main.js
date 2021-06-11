import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VConsole from "vconsole";

Vue.config.productionTip = false

const vConsole = new VConsole()
console.log(vConsole.version)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
