<template>
  <div id="app">
  <!-- 验证Token -->
  <Token ref="token" />
<div id="Index">
    <!-- 内容部分 -->
    <div class="in_body">

      <!-- 首页 -->
      <cube-sticky v-if="tabs.click=='首页'" :pos="scroll.index.y">
        <cube-scroll ref="indexScroll" :scroll-events="scroll.index.events" @scroll="scrollHandler" @pulling-down="indexDown" :options="scroll.index.options">
          <!-- Top -->
          <cube-sticky-ele>
            <header class="header in_header" :style="{backgroundColor:'rgba(111,183,55,'+scroll.index.color+')'}">
              <span class="text_left" @click="openMap()">昆明市</span>
              <b>{{$config.name}}</b>
              <span class="ico_right ico_qr" @click="openBarCode()"></span>
            </header>
          </cube-sticky-ele>
          <!-- 轮播图 -->
          <cube-slide :data="slideList">
            <cube-slide-item v-for="(item, index) in slideList" :key="index">
              <a :href="item.url" :style="{height:'210px',background:'url('+item.image+') no-repeat center center #FFF',backgroundSize: 'auto 100%'}"></a>
            </cube-slide-item>
          </cube-slide>
          <!-- Menus -->
          <ul class="in_menu">
            <li v-for="(val,key) in menus" :key="key">
              <router-link :to="val.url"><span :style="{backgroundImage: 'url('+val.ico+')'}"></span><p>{{val.name}}</p></router-link>
            </li>
          </ul>
          <!-- 视频 -->
          <div class="in_ct mtop">
            <div class="in_title"><span class="line" :style="{backgroundColor:'#6FB737'}"></span><span class="title">视频</span></div>
            <ul class="in_list">
              <li v-for="(val,key) in video" :key="key">
                <div class="ct"><img :src="val.image"><p>{{val.title}}</p></div>
              </li>
            </ul>
          </div>
          <!-- 录音 -->
          <div class="in_ct mtop">
            <div class="in_title"><span class="line" :style="{backgroundColor:'#FF6600'}"></span><span class="title">录音</span></div>
            <ul class="in_list">
              <li v-for="(val,key) in audio" :key="key">
                <div class="ct"><img :src="val.image"><p>{{val.title}}</p></div>
              </li>
            </ul>
          </div>
          <!-- 拍照 -->
          <div class="in_ct mtop">
            <div class="in_title"><span class="line" :style="{backgroundColor:'#3385FF'}"></span><span class="title">拍照</span></div>
            <ul class="in_list">
              <li v-for="(val,key) in photo" :key="key">
                <div class="ct"><img :src="val.image"><p>{{val.title}}</p></div>
              </li>
            </ul>
          </div>
          <!-- 底线 -->
          <div class="bottom_line"><span>{{$config.link_name}}</span></div>
        </cube-scroll>
      </cube-sticky>
      <!-- 首页 End -->

      <!-- 视频 -->
      <div v-if="tabs.click=='采访'" class="video_body">
        <!-- TOP -->
        <header class="header video_header">
          <span class="text_left">采访</span>
          <label class="video_sea">
            <i class="ico ico_sea"></i>
            <input type="text" class="input" placeholder="请输入专题名称" v-model="videoSea.key" v-on:input="search()" />
          </label>
          <span class="ico_right" @click="selectVideo()"><i class="cubeic-add"></i></span>
        </header>
        <!-- 滑动内容 -->
        <div class="video_ct">
          <cube-scroll ref="videoScroll" :scroll-events="scroll.video.events" @pulling-down="videoDown" :options="scroll.video.options">
            <cube-swipe>
              <!-- 滑块 -->
              <transition-group name="swipe" tag="ul" class="video_list">
                <li class="swipe-item-wrapper" v-for="(data,index) in videoData" :key="data.item.id">
                  <cube-swipe-item ref="swipeItem" :btns="data.btns" :index="index" @btn-click="orderAction" @active="orderOnItem">
                    <!-- 列表内容 -->
                    <div @click="videoShow(data.item.id)" class="ct item-inner">
                      <div class="img" :style="{backgroundImage:'url('+data.item.img+')'}"></div>
                      <div class="text">
                        <h1 class="title">{{data.item.title}}</h1>
                        <dl class="info">
                          <dd>{{data.item.name}}</dd>
                          <dd>{{data.item.tel}}</dd>
                          <dd class="s">{{data.item.addr}}</dd>
                        </dl>
                      </div>
                    </div>
                    <!-- 列表内容 End -->
                  </cube-swipe-item>
                </li>
              </transition-group>
              <!-- 底线 -->
              <div class="bottom_line"><span>{{$config.link_name}}</span></div>
            </cube-swipe>
          </cube-scroll>
        </div>
      </div>
      <!-- 视频 End -->

      <!-- 我的 -->
      <div v-if="tabs.click=='我的'" class="me_body">
        <!-- TOP -->
        <div class="me_top">
          <header class="header">
            <b>个人中心</b>
          </header>
          <div class="me_info">
            <div class="text">
              <div class="nick" v-if="uinfo.nickname"><b>{{uinfo.nickname}}</b></div>
              <div class="nick" v-else><b>用户昵称</b></div>
              <div class="name">{{uinfo.uname}}<span v-if="uinfo.name">({{uinfo.name}})</span></div>
            </div>
            <div class="img" v-if="uinfo.img" :style="{backgroundImage: 'url('+uinfo.img+')'}"></div>
            <div class="img" v-else :style="{backgroundImage: 'url('+require('./assets/index/store_img.png')+')'}"></div>
          </div>
        </div>
        <!-- 滑动内容 -->
        <div class="me_ct">
          <cube-scroll ref="meScroll" :scroll-events="scroll.me.events" @pulling-down="meDown" :options="scroll.me.options">
            <cube-swipe>
              <!-- List -->
              <ul class="me_list">
                <li @click="$router.push('/user/info')">
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/info.png')+')'}"></span>
                  <span class="title">个人资料</span>
                  <i class="cubeic-arrow"></i>
                </li>
                <li @click="$router.push('/user/passwd')">
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/passwd.png')+')'}"></span>
                  <span class="title">修改密码</span>
                  <i class="cubeic-arrow"></i>
                </li>
              </ul>
              <!-- <ul class="me_list mtop">
                <li>
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/amount.png')+')'}"></span>
                  <span class="title">账单明细</span>
                  <i class="cubeic-arrow"></i>
                </li>
                <li>
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/integral.png')+')'}"></span>
                  <span class="title">积分明细</span>
                  <i class="cubeic-arrow"></i>
                </li>
                <li>
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/log.png')+')'}"></span>
                  <span class="title">操作日志</span>
                  <i class="cubeic-arrow"></i>
                </li>
              </ul> -->
              <ul class="me_list mtop">
                <li>
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/tel.png')+')'}"></span>
                  <span class="title">用户反馈</span>
                  <!-- <i class="cubeic-arrow"></i> -->
                  <span class="info">{{meInfo.tel}}</span>
                </li>
                <li @click="clearCache()">
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/clear.png')+')'}"></span>
                  <span class="title">清理缓存</span>
                  <!-- <i class="cubeic-arrow"></i> -->
                  <span class="info">{{meInfo.cache.info}}</span>
                </li>
                <li>
                  <span class="ico" :style="{backgroundImage: 'url('+require('./assets/user/system.png')+')'}"></span>
                  <span class="title">系统信息</span>
                  <!-- <i class="cubeic-arrow"></i> -->
                  <span class="info">{{meInfo.version}}</span>
                </li>
              </ul>
              <div class="logout mtop">
                <cube-button class="logout_bt" @click="logout()">退出登录</cube-button>
              </div>
              <!-- 底线 -->
              <div class="bottom_line"><span>{{$config.link_name}}</span></div>
            </cube-swipe>
          </cube-scroll>
        </div>
      </div>
      <!-- 我的 End -->

    </div>
    <!-- 导航 -->
    <div class="nav">
      <cube-tab-bar v-model="tabs.default" @click="nav">
        <cube-tab v-for="item in tabs.menus" :label="item.label" :key="item.label">
          <div class="ico"><i slot="icon" :class="item.icon"></i></div>
          <div class="text">{{item.label}}</div>
        </cube-tab>
      </cube-tab-bar>
    </div>
</div>
    <!-- 路由 -->
    <transition name="page-move">
      <router-view class="html_view"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
// *{touch-action: pan-y;}
html,body,h1,h2,ul{margin: 0; padding: 0; vertical-align: baseline;}
html,body,#app{overflow: hidden; width: 100%; height: 100%;}
#app{position: absolute; z-index: 1; left: 0; top: 0; color: #333; font-size: 14px; font-family: 'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}
#Index{height: 100%;}
a{text-decoration: none; color: #333;}
img{border: none; vertical-align: top;}
ul{list-style: none;}

/* 翻页效果 */
.page-move-enter,.page-move-leave-active{transform: translate(100%, 0);}
.page-move-enter-active,.page-move-leave-active{transition: transform .3s;}

/* Content */
.html_view{position: absolute; z-index: 10; width: 100%; height: 100%; top: 0; left: 0; background-color: #F2F4F6;}

/* Inc */
.mtop{margin-top: 10px;}
.left{float: left;}.right{float: right;}
.border_top_1px:before{content: ""; position: absolute; display: block; width: 200%; transform: scale(.5); border-bottom: #EBEBEB 1px solid;}
.border_bottom_1px:after{content: ""; position: absolute; display: block; width: 200%; transform: scale(.5); border-bottom: #EBEBEB 1px solid;}

/* Bottom */
.bottom_line{overflow: hidden; font-size: 12px; color: #CCC; margin: 10px 0; padding: 5px 0; text-align: center;}
.bottom_line span{position: relative; z-index: 2; display: inline-block; background-color: #F2F4F6; padding: 0 10px;}
.bottom_line:before{content: ""; width: 160%; margin-left: -80%; margin-top: 6px; left: 50%; border-bottom: #CCC 1px solid; position: absolute; display: block; transform: scale(.5);}

/* TOP */
.cube-sticky-ele{position: absolute; width: 100%;}
.header{position: relative; z-index: 5; height: 30px; line-height: 30px; text-align: center; padding: 30px 10px 6px;}
.header b{font-size: 16px; font-weight: 600;}
.text_left,.text_right{position: absolute; z-index: 1; height: 30px; line-height: 32px; padding: 0 8px;}
.ico_left,.ico_right{position: absolute; z-index: 1; height: 30px; line-height: 32px; padding: 0 5px 0 25px;}
.text_left,.ico_left{left: 10px;}
.text_right,.ico_right{right: 10px;}

/* ICO */
.ico_sea{background: url('assets/public/search.svg') no-repeat center center; background-size: 80%;}
.ico_qr{background: url('assets/public/qrcode.svg') no-repeat center center; background-size: 80%;}
.ico_arrow_left{background: url('assets/public/arrow_left.svg') no-repeat 4px center; background-size: auto 60%;}
.ico_arrow_right{background: url('assets/public/arrow_right.svg') no-repeat 4px center; background-size: 60%;}
</style>

<style lang="less" scoped>
/* Index */
.in_body{width: 100%; height: calc(100% - 55px); background-color: #F2F4F6;}
.in_header{color: #FFF;}
.in_header .icon{fill: #FFFFFF;}
.nav{height: 54px; bottom: 0; border-top: #F2F4F6 1px solid; background-color: #FFF;}
.nav .cube-tab{color: #999;}
.nav .cube-tab_active{color: #6FB737;}
.nav .cube-tab i{font-size: 180%;}
.nav .text{font-size: 10px; padding-top: 3px;}

.in_menu{overflow: hidden; background-color: #FFF; padding: 0 15px;}
.in_menu li{float: left; width: 25%; text-align: center; padding: 5px 0;}
.in_menu a{display: inline-block;}
.in_menu span{display: inline-block; width: 64px; height: 64px; background-repeat: no-repeat; background-color: #F2F4F6; background-size: 60%; background-position: center center; border-radius: 50%;}
.in_menu p{line-height: 24px; font-size: 12px;}

.in_ct{background: #FFF;}
.in_title{overflow: hidden; height: 18px; line-height: 18px; padding: 15px 10px; border-bottom: #F2F4F6 1px solid;}
.in_title .line{float: left; display: inline-block; width: 5px; height: 100%; background-color: #F2F4F6;}
.in_title .title{float: left; font-size: 16px; margin-left: 8px;}
.in_list{overflow: hidden; background-color: #FFF;}
.in_list li{float: left; width: 50%; box-sizing: border-box; border-bottom: #F2F4F6 1px solid; border-right: #F2F4F6 1px solid;}
.in_list .ct{padding: 5px;}
.in_list img{width: 100%;}
.in_list p{padding: 5px 0; font-size: 14px;}

/* 视频 */
.video_header{background-color: #6FB737; color: #FFF;}
.video_header .ico_right i{font-size: 200%;}
.video_body{height: 100%;}
.video_sea{position: absolute; width: calc(100% - 108px); height: 30px; left: 60px; text-align: left;}
.video_sea .ico{position: absolute; width: 30px; height: 30px; margin-left: 2px;}
.video_sea .input{float: left; width: calc(100% - 40px); height: 100%; padding: 0 10px 0 30px; font-size: 14px; border: none; background-color: #F2F4F6; border-radius: 5px;}
.video_nav{overflow: hidden; background-color: #FFF; border-bottom: #F2F4F6 1px solid;}
.video_nav .cube-tab-bar{height: 40px;}
.video_ct{height: calc(100% - 65px);}

.video_list{overflow: hidden;}
.video_list li{overflow: hidden; margin-top: 1px; background-color: #FFF;}
.video_list .ct{overflow: hidden; padding: 5px;}
.video_list .img{float: left; width: 140px; height: 90px; background-size: 100% auto; background-position: center center; background-repeat: no-repeat;}
.video_list .title{padding: 8px 10px;}
.video_list .text{overflow: hidden;}
.video_list .text h1{font-size: 16px;}
.video_list .info{overflow: hidden; padding: 0 10px; font-size: 14px;}
.video_list .info dt{float: left; width: 32px; line-height: 20px;}
.video_list .info dd{float: left; line-height: 20px; padding-right: 10px;}
.video_list .info .s{width: 100%; font-size: 12px; color: #CCC;}

/* 我的 */
.me_body{height: 100%;}
.me_top{height: 180px; background: url('./assets/user/bg.jpg') no-repeat #FFF; background-size: 100% auto; background-position: center center;}
.me_ct{overflow: hidden; height: calc(100% - 180px);}

.me_info{overflow: hidden; padding: 16px;}
.me_info .img{float: right; width: 72px; height: 72px; background: url('./assets/index/store_img.png') no-repeat; border: #4A4B4C 3px solid; border-radius: 50%; background-color: #F2F4F6; background-position: center center; background-size: 100%;}
.me_info .text{float: left; padding-top: 16px; width: calc(100% - 80px);}
.me_info .text .nick{overflow: hidden; height: 28px; line-height: 28px;}
.me_info .text b{float: left; font-size: 21px; font-weight: 700; padding-right: 5px;}
.me_info .text .name{padding: 8px 0;}

.me_list{overflow: hidden; background-color: #FFF;}
.me_list li{height: 54px; line-height: 54px; padding: 0 15px;}
.me_list li:after{content: ""; left: 54px; top: 54px; position: relative; display: block; width: 100%; border-bottom: #F2F4F6 1px solid;}
.me_list .ico{float: left; display: inline-block; width: 36px; height: 36px; margin-top: 8px; border-radius: 50%; background-repeat: no-repeat; background-size: 100%; background-position: center center;}
.me_list .title{float: left; font-size: 16px; padding-left: 15px;}
.me_list .info{float: right; font-size: 14px; color: #CCC; padding: 0 10px;}
.me_list i{float: right; color: #999;}

.logout{padding: 0 15px;}
.logout_bt{height: 40px; line-height: 40px; padding: 0; color: #6FB737;}
</style>

<script src="./App.js"></script>
