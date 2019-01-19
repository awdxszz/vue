<template>
  <div class="html_body">
    <!-- 验证Token -->
    <Token ref="token" />
    <!-- TOP -->
    <header class="header top_header">
      <span class="ico_left ico_arrow_left" @click="back()">返回</span>
      <b>视频采访</b>
    </header>
    <div id="codeCT" class="video_ct">
      内容
    </div>
  </div>
</template>

<style lang="less" scoped>
.top_header{background-color: #6FB737;}
.video_ct{height: calc(100% - 60px);}
</style>

<script src="./Video.js"></script>