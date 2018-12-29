import Vue from 'vue'
import router from './router'
// import store from './store'
import axios from 'axios'

import Config from './config'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
import App from './App.vue'

// 配置
Vue.prototype.$ajax = axios;
Vue.use(Config)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
