<template>
  <div class="html_body" style="background-color: #FFF;">
    <div class="login_top"></div>
    <div class="login_ct">
      <div class="title">
        <h1>新用户注册</h1>
        <h2>New user registration</h2>
      </div>
      <ul class="login">
        <li>
          <cube-input type="tel" class="input" v-model="uinfo.uname" :maxlength="11" :clearable="true" placeholder="手机号码"></cube-input>
        </li>
        <li>
          <cube-input type="password" class="input" v-model="uinfo.passwd" :maxlength="32" :eye="{open:true,reverse:true}" placeholder="请输入密码"></cube-input>
        </li>
        <li>
          <cube-input type="password" class="input" v-model="uinfo.passwd2" :maxlength="32" :eye="{open:true,reverse:true}" placeholder="确认密码"></cube-input>
        </li>
      </ul>
      <div>
        <cube-button class="login_bt" @click="register()" :disabled="regSub">注 册</cube-button>
      </div>
      <div class="login_link">
        <span class="left" @click="login()">已有帐号</span>
        <span class="right" @click="retrieve()">无法登录</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login_top{width: 100%; height: 26%; background: url('../../assets/user/bg.jpg') no-repeat; background-size: 100% auto; background-position: center center;}
.login_ct{position: fixed; width: 240px; height: 300px; margin: -150px 0 0 -120px; left: 50%; top: 50%;}
.login_ct .title{line-height: 22px; text-align: center; color: #666; height: 46px; padding: 10px 0;}
.login_ct .title h1{font-size: 21px;}
.login_ct .title h2{font-size: 14px; font-weight: normal;}
.login{border-top: rgba(0,0,0,0.1) 5px solid; padding: 10px 0 20px;}
.login li{padding: 5px 0;}
.login_bt{height: 40px; line-height: 40px; padding: 0; background-color: #FF6600; color: #FFF;}
.login_link{position: fixed; width: 100%; height: 48px; line-height: 48px; left: 0; bottom: 0;}
.login_link span{padding: 0 20px;}
</style>

<script src="./Register.js"></script>