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
      <cube-scroll ref="videoScroll" :scroll-events="scroll.video.events" @pulling-down="videoDown" :options="scroll.video.options">
        <cube-swipe>
          <div class="video_img"><div>封面图</div></div>
          <cube-form :model="formData" class="cube-form_groups">
            <cube-form-group legend="基本信息">
              <cube-form-item :field="formField[0]"></cube-form-item>
              <cube-form-item :field="formField[1]">
                <cube-button class="cube-btn" @click="showCtime">{{formData.ctime || '请选择采访时间'}}</cube-button>
              </cube-form-item>
              <cube-form-item :field="formField[2]"></cube-form-item>
            </cube-form-group>
            <cube-form-group legend="个人信息">
              <cube-form-item :field="formField[3]"></cube-form-item>
              <cube-form-item :field="formField[4]"></cube-form-item>
              <cube-form-item :field="formField[5]"></cube-form-item>
              <cube-form-item :field="formField[6]">
                <cube-button class="cube-btn" @click="showBirthday">{{formData.birthday || '请选择生日'}}</cube-button>
              </cube-form-item>
              <cube-form-item :field="formField[7]"></cube-form-item>
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
.video_ct{height: calc(100% - 60px);}

.video_img{height: 150px; padding-top: 60px; text-align: center; background-color: #FFF;}
.video_img div{margin: 0 auto; width: 80px; padding-top: 80px; background: url('../../assets/index/video.svg') no-repeat center center #FFF; background-size: 65% auto;}

.cube-form-field .cube-btn{background: none; color: #CCC; text-align: left; padding-left: 0; font-size: 14px;}
.cube-btn{color: #6FB737;}
</style>

<script src="./Video.js"></script>