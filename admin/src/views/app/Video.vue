<template>
  <div>
    <ajax ref="ajax"></ajax>
    <!-- 搜索 -->
    <el-dialog title="搜索" :visible.sync="seaData.isShow" width="36%" center>
      <el-form :model="seaData.form">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.type" placeholder="0视频、1音频、2照片"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.title" placeholder="专题名称"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.name" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.name" placeholder="手机号码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subSea()">搜索</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="delData.isShow" width="30%" center>
      <div>是否删除已选择数据？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delData.isShow=false">取 消</el-button>
        <el-button type="primary" @click="subDel()">彻底删除</el-button>
      </div>
    </el-dialog>
    <!-- 功能菜单 -->
    <el-row v-if="menuActionData.length">
      <el-button-group>
        <el-button v-for="val in menuActionData" :key="val.name" :icon="val.ico" @click="openAction(val.action)">{{val.name}}</el-button>
      </el-button-group>
    </el-row>
    <!-- 功能菜单 End -->
    <!-- 分页数据 -->
    <el-row>
      <el-table :data="pageData.list" stripe @selection-change="getSelect">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="id" label="ID" width="60"></el-table-column>
        <el-table-column prop="user_id" label="所属用户" width="180"></el-table-column>
        <el-table-column label="类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.type==0">视频</span>
            <span v-if="scope.row.type==1">音频</span>
            <span v-if="scope.row.type==2">照片</span>
          </template>
        </el-table-column>
        <el-table-column label="封面图" width="80">
          <template slot-scope="scope">
            <div class="img" :style="{backgroundImage:'url('+scope.row.img+')'}"></div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="姓名" width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>日期: {{ scope.row.ctime }}</p>
              <p>地点: {{ scope.row.addr }}</p>
              <div slot="reference">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="tel" label="手机号码"></el-table-column>
        <el-table-column prop="birthday" label="生日"></el-table-column>
        <el-table-column prop="education" label="学历"></el-table-column>
      </el-table>
    </el-row>
    <el-row class="page">
      <el-pagination background layout="prev, pager, next, total" :total="pageData.total" :current-page="pageData.page" :page-size="pageData.pageSize" @current-change="page"></el-pagination>
    </el-row>
    <!-- 分页数据 End -->
  </div>
</template>

<style lang="less" scoped>
.el-row{padding: 10px 0;}
.img{height: 30px; background-repeat: no-repeat; background-size: auto 100%; background-position: center center;}
</style>

<script src="./Video.js"></script>
