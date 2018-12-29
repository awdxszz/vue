<template>
  <div>
    <ajax ref="ajax"></ajax>
    <!-- 搜索 -->
    <el-dialog title="搜索" :visible.sync="seaData.isShow" width="36%" center>
      <el-form :model="seaData.form">
        <el-form-item label="FID" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.fid" placeholder="所属父级ID"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.title" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.url" placeholder="链接地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subSea()">搜索</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addData.isShow">
      <el-form :model="addData.form">
        <el-form-item label="FID" :label-width="formLabelWidth">
          <el-input v-model="addData.form.fid" style="max-width: 240px;" placeholder="所属父级ID"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="addData.form.title" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="addData.form.url" placeholder="链接地址"></el-input>
        </el-form-item>
        <el-form-item label="图标样式" :label-width="formLabelWidth">
          <el-input v-model="addData.form.ico" style="max-width: 240px;" placeholder="字体图标"></el-input>
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth">
          <el-checkbox-group v-model="addData.form.permArr">
            <el-checkbox v-for="val in aMenus" :key="val.name" :label="val.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subAdd()">添加</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editData.isShow">
      <el-form :model="editData.form">
        <el-form-item label="FID" :label-width="formLabelWidth">
          <el-input v-model="editData.form.fid" style="max-width: 240px;" placeholder="所属父级ID"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="editData.form.title" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="editData.form.url" placeholder="链接地址"></el-input>
        </el-form-item>
        <el-form-item label="图标样式" :label-width="formLabelWidth">
          <el-input v-model="editData.form.ico" style="max-width: 240px;" placeholder="字体图标"></el-input>
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth">
          <el-checkbox-group v-model="editData.form.permArr">
            <el-checkbox v-for="val in aMenus" :key="val.name" :label="val.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subEdit()">更新</el-button>
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
        <el-table-column prop="fid" label="FID" width="60"></el-table-column>
        <el-table-column prop="title" label="菜单名称" width="120"></el-table-column>
        <el-table-column prop="url" label="链接地址"></el-table-column>
        <el-table-column prop="perm" label="权限" width="60"></el-table-column>
        <el-table-column prop="ico" label="图标"></el-table-column>
        <el-table-column prop="ctime" label="创建时间"></el-table-column>
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
.el-checkbox+.el-checkbox{margin-left: 16px; line-height: 30px;}
</style>

<script src="./Menus.js"></script>
