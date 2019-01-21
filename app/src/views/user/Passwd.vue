<template>
  <div class="html_body">
    <!-- 验证Token -->
    <Token ref="token" />
    <!-- TOP -->
    <header class="header top_header">
      <span class="ico_left ico_arrow_left" @click="back()">返回</span>
      <b>修改密码</b>
    </header>
    <div id="codeCT" class="passwd_ct">
      <cube-scroll ref="passwdScroll" :scroll-events="scroll.passwd.events" @pulling-down="passwdDown" :options="scroll.passwd.options">
        <cube-swipe>
          <cube-form :model="formData" class="cube-form_groups">
            <cube-form-group>
              <cube-form-item :field="formField[0]"></cube-form-item>
              <cube-form-item :field="formField[1]"></cube-form-item>
              <cube-form-item :field="formField[2]"></cube-form-item>
            </cube-form-group>
            <cube-form-group>
              <cube-button type="submit">修改密码</cube-button>
            </cube-form-group>
          </cube-form>
          <!-- 底线 -->
          <div class="bottom_line"><span>{{$config.link_name}}</span></div>
        </cube-swipe>
      </cube-scroll>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top_header{background-color: #6FB737;}
.passwd_ct{height: calc(100% - 60px);}
.cube-btn{color: #6FB737;}
</style>

<script src="./Passwd.js"></script>