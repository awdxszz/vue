<template>
  <div>
    <ajax ref="ajax"></ajax>
    <!-- 搜索 -->
    <el-dialog title="搜索" :visible.sync="seaData.isShow" width="36%" center>
      <el-form :model="seaData.form">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.code" placeholder="用户编号"></el-input>
        </el-form-item>
        <el-form-item label="帐号" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.uname" placeholder="用户名/手机/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="seaData.form.state" placeholder="1:正常 2:禁用"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subSea()">搜索</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addData.isShow" top="5vh">
      <el-form :model="addData.form">
        <el-form-item label="状态" :label-width="formLabelWidth" required>
          <el-switch v-model="addData.form.state" active-value="1" inactive-value="2" active-text="正常/禁用"></el-switch>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" required>
          <el-input v-model="addData.form.uname" style="max-width: 240px;" placeholder="英文开头4~16位字符"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addData.form.passwd" type="password" placeholder="5~16位字符, 默认123456"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="addData.form.tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addData.form.email" placeholder="邮箱帐号"></el-input>
        </el-form-item>
        <div class="c1">其他信息</div>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addData.form.name" style="max-width: 240px;" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="addData.form.department" style="max-width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="职务" :label-width="formLabelWidth">
          <el-input v-model="addData.form.position" style="max-width: 240px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subAdd()">添加</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editData.isShow" top="5vh">
      <el-form :model="editData.form">
        <el-form-item label="状态" :label-width="formLabelWidth" required>
          <el-switch v-model="editData.form.state" active-value="1" inactive-value="2" active-text="正常/禁用"></el-switch>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" required>
          <el-input v-model="editData.form.uname" style="max-width: 240px;" placeholder="英文开头4~16位字符"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="editData.form.passwd" type="password" placeholder="5~16位字符, 默认空不覆盖"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="editData.form.tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editData.form.email" placeholder="邮箱帐号"></el-input>
        </el-form-item>
        <div class="c1">其他信息</div>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="editData.form.name" style="max-width: 240px;" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="editData.form.department" style="max-width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="职务" :label-width="formLabelWidth">
          <el-input v-model="editData.form.position" style="max-width: 240px;"></el-input>
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
    <!-- 权限 -->
    <el-dialog title="编辑权限" :visible.sync="permData.isShow" top="5vh">
      <el-tree ref="perm" :data="permData.form" show-checkbox :default-checked-keys="permData.default" node-key="id"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subPerm()">更新</el-button>
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
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="code" label="编号" width="180"></el-table-column>
        <el-table-column prop="uname" label="用户名" width="100"></el-table-column>
        <el-table-column label="姓名" width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>手机: {{ scope.row.tel }}</p>
              <p>邮箱: {{ scope.row.email }}</p>
              <div slot="reference">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="position" label="职务"></el-table-column>
        <el-table-column label="状态" width="60">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.state==1">正常</el-tag>
            <el-tag type="danger" size="mini" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限" width="70">
          <template slot-scope="scope">
            <el-button @click="eidtPerm(scope.row.id,scope.row.perm)" size="mini">权限</el-button>
          </template>
        </el-table-column>
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
</style>

<script src="./Admin.js"></script>
