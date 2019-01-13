<template>
  <div class="html_body">
    <!-- 验证Token -->
    <Token ref="token" />
    <!-- TOP -->
    <header class="header top_header">
      <span class="ico_left ico_arrow_left" @click="back()">返回</span>
      <b>扫描二维码</b>
    </header>
    <div id="codeCT" class="code_ct">{{codeContent.url}}</div>
  </div>
</template>

<style lang="less" scoped>
.top_header{background-color: #6FB737;}
.code_ct{height: calc(100% - 60px);}
</style>

<script src="./Codes.js"></script>