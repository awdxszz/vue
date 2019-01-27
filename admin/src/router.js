import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/', name:'index', component:()=>import('./views/Index.vue')},
    // 系统
    {path:'/SysMenus', name:'SysMenus', component:resolve=>require(['./views/system/Menus.vue'],resolve)},
    {path:'/SysMenusAction', name:'SysMenusAction', component:resolve=>require(['./views/system/Action.vue'],resolve)},
    {path:'/SysAdmins', name:'SysAdmins', component:resolve=>require(['./views/system/Admin.vue'],resolve)},
    // APP
    {path:'/WebUser', name:'WebUser', component:resolve=>require(['./views/app/User.vue'],resolve)},
    {path:'/WebVideo', name:'WebVideo', component:resolve=>require(['./views/app/Video.vue'],resolve)},
  ]
})
