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
    {path:'/video/video', name:'videoVideo', component:resolve=>require(['./views/video/Video.vue'],resolve)},
    {path:'/video/audio', name:'videoAudio', component:resolve=>require(['./views/video/Audio.vue'],resolve)},
    {path:'/video/photo', name:'videoPhoto', component:resolve=>require(['./views/video/Photo.vue'],resolve)},
    {path:'/video/show/:id', name:'videoShow', component:resolve=>require(['./views/video/Show.vue'],resolve)},
    {path:'/user/info', name:'userInfo', component:resolve=>require(['./views/user/Info.vue'],resolve)},
    {path:'/user/passwd', name:'userPasswd', component:resolve=>require(['./views/user/Passwd.vue'],resolve)},
  ]
})
