<template>
  <div class="html_body">
    <!-- 验证Token -->
    <Token ref="token" />
    <!-- 内容 -->
    <cube-sticky :pos="scroll.show.y">
      <cube-scroll ref="showScroll" :scroll-events="scroll.show.events" @scroll="scrollHandler" @pulling-down="showDown" :options="scroll.show.options">
        <!-- Top -->
        <cube-sticky-ele>
          <header class="header in_header" :style="{backgroundColor:'rgba(111,183,55,'+scroll.show.color+')'}">
            <span class="ico_left ico_arrow_left" @click="back()">返回</span>
            <b>{{title}}{{type}}</b>
          </header>
        </cube-sticky-ele>
        <!-- 轮播图 -->
        <cube-slide :data="slideList">
          <cube-slide-item v-for="(val, index) in slideList" :key="index">
            <!-- <a :href="item.url" :style="{height:'210px',background:'url('+item.image+') no-repeat center center #FFF',backgroundSize: 'auto 100%'}"></a> -->
            <a href="#" style="height:auto">
              <video v-if="type=='0'" conrtols="true" :poster="img">
                <source :src="val" type="video/mp4">
              </video>
              <audio v-if="type=='1'" :src="val" conrtols="true" />
              <img v-if="type=='2'" :src="val" />
            </a>
          </cube-slide-item>
        </cube-slide>
        <!-- 用户信息 -->
        <ul class="list" v-for="(group,index) in infoList" :key="index">
          <li class="title">{{group.title}}</li>
          <li v-for="(val,index) in group.items" :key="index">
            <span class="name">{{val.name}}</span>
            <nobr>{{val.value}}</nobr>
          </li>
        </ul>
        <!-- 底线 -->
        <div class="bottom_line"><span>{{$config.link_name}}</span></div>
      </cube-scroll>
    </cube-sticky>
    <!-- 内容 End -->
  </div>
</template>

<style lang="less" scoped>
.cube-slide video{width: 100%; background-color: #FFF;}
.cube-slide audio{width: 100%;}
.cube-slide img{width: 100%; background-color: #FFF;}

.list{overflow: hidden;}
.list li{height: 54px; line-height: 54px; padding-left: 15px; background-color: #FFF;}
.list li:after{content: ""; left: 10px; top: 54px; position: relative; display: block; width: 100%; border-bottom: #F2F4F6 1px solid;}
.list .title{height: 36px; line-height: 36px; background-color: #F2F4F6; color: #666;}
.list .name{float: left; font-size: 14px;}
.list nobr{float: right; width: calc(100% - 80px); overflow: hidden; text-overflow: ellipsis; font-size: 14px; color: #666; padding: 0 10px;}
</style>

<script src="./Show.js"></script>