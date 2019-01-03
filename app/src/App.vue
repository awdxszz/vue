<template>
  <div id="app">
    <!-- 内容部分 -->
    <div class="in_body">

      <!-- 首页 -->
      <cube-sticky v-if="tabs.click=='首页'" :pos="scroll.index.y">
        <cube-scroll ref="indexScroll" :scroll-events="scroll.index.scrollEvents" @scroll="scrollHandler" @pulling-down="indexDown" :options="scroll.index.options">
          <cube-sticky-ele>
              <header class="header" :style="{backgroundColor:'rgba(111,183,55,'+scroll.index.color+')'}">
                <span class="text_left" @click="openMap()">地图</span>
                <b>{{$config.name}}</b>
                <span class="ico_right ico_qr" @click="openBarCode()"></span>
              </header>
            </cube-sticky-ele>
            <!-- 底线 -->
          <div class="bottom_line"><span>{{$config.link_name}}</span></div>
        </cube-scroll>
      </cube-sticky>
      <!-- 首页 End -->

      <!-- 视频 -->
      <div v-if="tabs.click=='视频'" class="video_body">
        <!-- TOP -->
        <header class="header video_header">
          <span class="text_left">视频</span>
          <label class="video_sea">
            <i class="ico ico_sea"></i>
            <input type="text" class="input" placeholder="请输入视频名称" />
          </label>
          <span class="ico_right ico_qr"></span>
        </header>
        <!-- 滑动内容 -->
        <div class="video_ct">
          <cube-scroll ref="videoScroll" :scroll-events="scroll.video.scrollEvents" @pulling-down="videoDown" :options="scroll.video.options">
            <cube-swipe>
              视频内容
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
        <header class="header">
          <b>个人中心</b>
        </header>
        <!-- 滑动内容 -->
        <div class="me_ct">
          <cube-scroll ref="meScroll" :scroll-events="scroll.me.scrollEvents" @pulling-down="meDown" :options="scroll.me.options">
            <cube-swipe>
              内容
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
    <!-- 路由 -->
    <transition name="page-move">
      <router-view class="html_view"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
*{touch-action: pan-y;}
html,body,h1,h2,ul{margin: 0; padding: 0; vertical-align: baseline;}
html,body,#app{overflow: hidden; width: 100%; height: 100%;}
#app{position: absolute; z-index: 1; left: 0; top: 0; color: #333; font-size: 14px; font-family: 'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}
#Index{height: 100%;}
a{text-decoration: none; color: #333;}
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

/* Index */
.in_body{width: 100%; height: calc(100% - 55px); background-color: #F2F4F6;}
.nav{height: 54px; bottom: 0; border-top: #F2F4F6 1px solid; background-color: #FFF;}
.nav .cube-tab{color: #999;}
.nav .cube-tab_active{color: #6FB737;}
.nav .cube-tab i{font-size: 180%;}
.nav .text{font-size: 10px; padding-top: 3px;}

/* 视频 */
.video_header{background-color: #6FB737;}
.video_body{height: 100%;}
.video_sea{position: absolute; width: calc(100% - 108px); height: 30px; left: 60px; text-align: left;}
.video_sea .ico{position: absolute; width: 30px; height: 30px; margin-left: 2px;}
.video_sea .input{float: left; width: calc(100% - 40px); height: 100%; padding: 0 10px 0 30px; font-size: 14px; border: none; background-color: #F2F4F6; border-radius: 5px;}
.video_nav{overflow: hidden; background-color: #FFF; border-bottom: #F2F4F6 1px solid;}
.video_nav .cube-tab-bar{height: 40px;}
.video_ct{height: calc(100% - 65px);}

/* 我的 */
.me_body{height: 100%;}
.me_ct{height: calc(100% - 65px);}
.me_top{height: 180px;}

</style>

<script src="./App.js"></script>
