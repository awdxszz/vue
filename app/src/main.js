import Vue from 'vue'
import router from './router'
// import store from './store'
import axios from 'axios'
import FastClick from 'fastclick'

// UI
import Config from './config'
import Cube from 'cube-ui'
import App from './App.vue'

// Click点击延迟问题
FastClick.attach(document.body)

// 配置
Vue.prototype.$ajax = axios;
Vue.use(Config)
Vue.use(Cube)
Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
