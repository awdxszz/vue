<template>
  <div id="app">
    <!-- 登陆 -->
    <el-container class="login_body" v-if="!isLogin">
      <el-card class="login_ct">
        <div slot="header" class="title">
          <span>会员登录</span>
          <el-button type="text">注册</el-button>
        </div>
        <div class="item">
          <el-input v-model="loginData.uname" placeholder="用户名/手机/邮箱">
            <template slot="prepend"><i class="fa fa-user-o fa-lg"></i></template>
          </el-input>
        </div>
        <div class="item">
          <el-input v-model="loginData.passwd" type="password" placeholder="请输入密码">
            <template slot="prepend"><i class="fa fa-key fa-lg"></i></template>
          </el-input>
        </div>
        <div class="item">
          <el-button @click="login()" type="primary" style="width:100%" :disabled="loginData.isSub">{{loginData.subText}}</el-button>
        </div>
      </el-card>
    </el-container>
    <!-- 登陆 End -->
    <!-- 主要框架 -->
    <el-container class="main_body">
      <el-aside class="menus_left" :style="{width: isCollapse?'auto':'200px'}">
        <el-menu class="menus_left_list" :default-active="defaultMenu" :collapse="isCollapse">
          <div class="menus_logo">
            <em class="logo"></em>
            <span class="text" v-if="!isCollapse">{{$config.name}}</span>
          </div>
          <!-- 菜单 -->
          <el-submenu v-for="(val1,key1) in menus" :index="''+key1">
            <template slot="title"><i :class="val1.ico"></i><span>&nbsp;&nbsp;{{val1.title}}</span></template>
            <el-menu-item-group v-if="val1.menus" v-for="(val2,key2) in val1.menus">
              <span slot="title">{{val2.title}}</span>
              <template v-if="val2.menus" v-for="(val3,key3) in val2.menus">
                  <el-menu-item :index="key1+'-'+key2+'-'+key3" @click="getUrl(val3.url,key1+'-'+key2+'-'+key3)"><i :class="val3.ico"></i>&nbsp;&nbsp;{{val3.title}}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
          <!-- 菜单 End -->
          <div class="menus_version" v-if="!isCollapse">当前版本：v{{$config.version}}</div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部信息 -->
        <el-header class="right_header" :style="{height: '50px',padding: '0 10px'}">
          <span><el-button size="small" class="fa fa-th-large fa-1x" @click="collapse()"></el-button></span>
          <div class="right_user">
            <el-dropdown trigger="click" @command="getUrl">
              <span class="el-dropdown-link">
                {{userInfo.uname}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="UserInfo">
                  <div class="item">部门：{{userInfo.department}}</div>
                  <div class="item">职务：{{userInfo.position}}</div>
                  <div class="item">姓名：{{userInfo.name}}</div>
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- 内容部分 -->
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
    <!-- 主要框架 End -->
  </div>
</template>

<style lang="less">
body{margin: 0; padding: 0;}
html,body,#app{height: 100%;}

.c1{color: #CCC; padding-bottom: 10px;}

.el-button:hover,.el-button:focus{color: #FFF; background-color: #6FB737; border-color: #3F9707;}
.el-button:active{color: #FFF; background-color: #6FB737; border-color: #3F9707;}
.el-button:visited{color: #6FB737; background-color: #6FB737; border-color: #3F9707;}

.el-button--primary,.el-button--primary:focus{background-color: #6FB737; border-color: #3F9707; color: #FFF;}
.el-button--primary:hover{background-color: #FF6600; border-color: #FF0000; color: #FFF;}
.el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{background-color: #909399; border-color: #909399; color: #333;}

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color: #6FB737; border-color: #3F9707; color: #FFF;}
.el-switch.is-checked .el-switch__core{background-color: #6FB737; border-color: #3F9707;}

.el-checkbox__label{padding-left: 5px;}

/* Login */
.login_body{position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%; background-image: url("./assets/bg.jpeg"); background-size: cover; background-position: center;}
.login_ct{position: fixed; z-index: 99; width: calc(100% - 30px); max-width: 360px; max-height: 300px; left: 50%; top: 50%; transform: translate(-50%, -50%); margin: 0 auto;}
.login_ct .title button{float: right; padding: 3px 0}
.login_ct .item{padding: 8px 0;}

/* Menus */
.main_body{height: 100%;}
.menus_left{height: 100%;}

.menus_logo{overflow: hidden; height: 50px; line-height: 50px; text-align: center; font-size: 21px; border-bottom: #000 1px solid;}
.menus_logo .logo{position: absolute; margin: 7px 0 0 -18px; display: inline-block; width: 36px; height: 36px; border-radius: 50%; background: url('./assets/logo.png') no-repeat #FFF center center; background-size: 80%;}
.menus_logo .text{padding-left: 24px;}
.menus_logo b{font-size: 14px; padding-left: 5px;}
.menus_version{font-size: 12px; padding: 10px; text-align: center; color: #666; border-top: #000 1px solid;}

.menus_left_list{height: 100%; color: #CCC; background-color: #20222A; border: none;}
.menus_left_list .el-submenu__title{height: 46px; line-height: 46px; color: #CCC;}
.menus_left_list .el-submenu__title:hover{background-color: #30333A;}
.menus_left_list .el-submenu__title .fa{font-size: 21px;}
.menus_left_list .el-submenu .el-menu-item{height: 36px; line-height: 36px; color: #FFF;}
.menus_left_list ul{background-color: #20222A;}
.menus_left_list .el-menu-item:hover{background-color: #6FB737; color: #FFF;}
.menus_left_list .el-menu-item:hover i{color: #FFF;}
.menus_left_list .el-menu-item.is-active{background-color: #6FB737; color: #FFF;}

.el-menu--popup .el-menu-item.is-active{background-color: #6FB737; color: #FFF;}
.el-menu--popup .el-menu-item.is-active:hover{color: #FFF;}
.el-menu-item-group li{height: 36px; line-height: 36px;}
.el-menu-item-group li:hover{background-color: #6FB737; color: #FFF;}
.el-menu-item-group li:hover i{color: #FFF;}

/* Top */
.right_header{line-height: 50px; border-bottom: #EBEEF5 1px solid; background-color: #FFF; color: #666;}
.right_user{float: right;}

/* Content */
.el-main{padding: 10px;}
.el-card__body{padding: 8px;}
.el-table{color: #000;}
.el-table td, .el-table th{padding: 10px 0;}
.el-table .cell{line-height: 20px;}
.el-dialog__header,{padding: 10px;}
.el-dialog__headerbtn{top: 12px; right: 15px;}
.el-dialog__body,.el-dialog--center .el-dialog__body{padding: 16px 30px;}
.el-dialog__footer{padding: 0 30px 20px;}

/* Page */
.page{text-align: center;}
.el-pagination.is-background .el-pager li:not(.disabled).active{background-color: #6FB737;}
</style>

<script src="./App.js"></script>
