import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/login', name:'login', component:resolve=>require(['./views/user/Login.vue'],resolve)},
    {path:'/register', name:'register', component:resolve=>require(['./views/user/Register.vue'],resolve)},
    {path:'/maps', name:'maps', component:resolve=>require(['./views/index/Maps.vue'],resolve)},
    {path:'/codes', name:'codes', component:resolve=>require(['./views/index/Codes.vue'],resolve)},
  ]
})
