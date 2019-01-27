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
          <cube-form :model="formData" @validate="validate" :immediateValidate="true" class="cube-form_groups">
            <cube-form-group>
              <cube-form-item :field="formField[0]"></cube-form-item>
              <cube-form-item :field="formField[1]"></cube-form-item>
              <cube-form-item :field="formField[2]"></cube-form-item>
            </cube-form-group>
            <cube-form-group>
              <div class="sub" @click="submitData()">{{subStatus.text}}</div>
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
.passwd_ct{height: calc(100% - 66px);}

.sub{width: calc(100% - 20px); margin: 0 auto; text-align: center; padding: 15px 0; background: #4a4c5b; color: #6FB737; border-radius: 5px;}
.sub:active{background-color: #6FB737;}
</style>

<script src="./Passwd.js"></script>