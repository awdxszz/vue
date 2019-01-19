<template>
  <div class="html_body">
    <!-- 验证Token -->
    <Token ref="token" />
    <!-- TOP -->
    <header class="header top_header">
      <span class="ico_left ico_arrow_left" @click="back()">返回</span>
      <b>拍照采访</b>
    </header>
    <div id="codeCT" class="photo_ct">
      内容
    </div>
  </div>
</template>

<style lang="less" scoped>
.top_header{background-color: #3385FF;}
.photo_ct{height: calc(100% - 60px);}
</style>

<script src="./Photo.js"></script>