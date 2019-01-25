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
      <cube-scroll ref="photoScroll" :scroll-events="scroll.photo.events" @pulling-down="photoDown" :options="scroll.photo.options">
        <!-- <cube-swipe> -->
          <div class="photo_img" @click="selectImg()">
            <img :src="formData.img?formData.img:require('../../assets/index/img.jpg')" />
          </div>
          <cube-form :model="formData" @submit="submitData()" class="cube-form_groups">
            <cube-form-group legend="拍摄照片">
              <ul class="upload">
                <li class="upload_img" v-for="(val,index) in formData.upload" :key="index">
                  <i @click="removePhoto(index)" v-if="val.del||val.loading==0">x</i>
                  <div v-if="!val.src">{{val.loading}}%</div>
                  <img v-if="val.src" :src="val.src" />
                </li>
                <li class="upload_an" @click="addPhoto()">+</li>
              </ul>
            </cube-form-group>
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
              <cube-button type="submit" :disabled="subStatus.dis">{{subStatus.text}}</cube-button>
            </cube-form-group>
          </cube-form>
          <!-- 底线 -->
          <div class="bottom_line"><span>{{$config.link_name}}</span></div>
        <!-- </cube-swipe> -->
      </cube-scroll>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top_header{background-color: #4CB4E7;}
.photo_ct{height: calc(100% - 66px); overflow-y: auto;}

.photo_img{text-align: center; background-color: #FFF; background-size: 100% auto; background-repeat: no-repeat;}
.photo_img img{width: 100%;}

.upload{overflow: hidden; background-color: #f3f4f5; padding: 0 5px;}
.upload li{float: left; width: 25%; height: 80px; box-sizing: border-box; border: #F2F4F6 5px solid;}
.upload_img{text-align: right; background-color: rgba(37,38,45,.4);}
.upload_img img{float: left; width: 100%; height: 100%;}
.upload_img div{text-align: center; line-height: 70px; color: #333;}
.upload_img i{position: absolute; font-style: normal; text-align: center; width: 24px; height: 24px; margin: -8px 0 0 -18px; background-color: #6FB737; color: #FFF; border-radius: 50%;}
.upload_img i:active{background-color: #FF6600;}
.upload_an{font-size: 32px; line-height: 65px; text-align: center; background-color: #FFF;}
.upload_an:active{background-color: #F2F4F6;}

.cube-form-field .cube-btn{background: none; color: #CCC; text-align: left; padding-left: 0; font-size: 14px;}
.cube-btn{color: #6FB737;}
</style>

<script src="./Photo.js"></script>