<template>
  <div class="html_body">
    <!-- 验证Token -->
    <Token ref="token" />
    <!-- TOP -->
    <header class="header top_header">
      <span class="ico_left ico_arrow_left" @click="back()">返回</span>
      <b>个人资料</b>
    </header>
    <div id="codeCT" class="info_ct">
      <cube-scroll ref="infoScroll" :scroll-events="scroll.info.events" @pulling-down="infoDown" :options="scroll.info.options">
        <cube-swipe>
          <cube-form :model="formData" class="cube-form_groups">
            <cube-form-group>
              <cube-form-item :field="formField[0]"></cube-form-item>
              <cube-form-item :field="formField[1]"></cube-form-item>
              <cube-form-item :field="formField[2]"></cube-form-item>
              <cube-form-item :field="formField[3]">
                <cube-button class="cube-btn" @click="showBirthday">{{formData.birthday || '请选择生日'}}</cube-button>
              </cube-form-item>
              <cube-form-item :field="formField[8]"></cube-form-item>
            </cube-form-group>
            <cube-form-group>
              <cube-button type="submit">提交</cube-button>
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
.info_ct{height: calc(100% - 60px);}

.cube-form-field .cube-btn{background: none; color: #CCC; text-align: left; padding-left: 0; font-size: 14px;}
.cube-btn{color: #6FB737;}
</style>

<script src="./Info.js"></script>