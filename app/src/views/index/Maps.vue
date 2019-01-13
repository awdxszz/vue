<template>
  <div class="html_body">
    <!-- 验证Token -->
    <Token ref="token" />
    <!-- TOP -->
    <header class="header top_header">
      <span class="ico_left ico_arrow_left" @click="back()">返回</span>
      <b>地图定位</b>
      <span class="text_right">{{mapInfo.city}}</span>
    </header>
    <div id="container" class="map_ct"></div>
    <ul class="map_info">
      <li>区域：{{mapInfo.area}}</li>
      <li>地址：{{mapInfo.addr}}</li>
      <li>经纬度：{{mapInfo.longitude}},{{mapInfo.latitude}}</li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.top_header{background-color: #6FB737;}
.map_ct{height: calc(100% - 140px);}
.map_info{overflow: hidden; background-color: #FFF; padding: 10px; font-size: 14px;}
.map_info li{line-height: 20px;}
</style>

<script src="./Maps.js"></script>

