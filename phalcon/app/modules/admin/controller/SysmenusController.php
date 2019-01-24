<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenu;

class SysMenusController extends UserBase {

  /* 列表 */
  function listAction(){
    // 条件
    $key = trim($this->request->getPost('key'));
    $where = '';
    if($key){
      $key = json_decode($key);
      foreach($key as $k=>$v){
        $where .= $k." LIKE '%".$v."%' AND ";
      }
      $where = rtrim($where,'AND ');
    }
    // 分段
    $page = trim($this->request->getPost('page'));
    $pagesize = trim($this->request->getPost('pagesize'));
    $start = ($page-1)*$pagesize;
    $total = SysMenu::count([$where]);
    $menus = SysMenu::find([
      $where,
      'columns'=>'id,fid,title,url,ico,ctime,perm',
      'order'=>'fid desc, id desc',
      'limit'=>['number'=>$pagesize,'offset'=>$start]
    ]);
    return self::getJSON(['code'=>0,'list'=>$menus,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    $key = trim($this->request->getPost('key'));
    if(!$key || empty($key)) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 数据处理
    $model = new SysMenu();
    $data = json_decode($key);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    $model->ctime = date('YmdHis');
    // 执行
    if($model->save()==true){
      return self::getJSON(['code'=>0,'msg'=>'添加成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'添加失败！']);
    }
  }

  /* 编辑 */
  function editAction(){
    $id = trim($this->request->getPost('id'));
    $key = trim($this->request->getPost('key'));
    if(!$id) return self::getJSON(['code'=>40000,'msg'=>'参数错误！']);
    if(!$key) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 数据处理
    $model = SysMenu::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    if(!$model) return self::getJSON(['code'=>40000,'msg'=>'该条数据不存在！']);
    $data = json_decode($key);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    // 执行
    if($model->save()==true){
      return self::getJSON(['code'=>0,'msg'=>'更新成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'更新失败！']);
    }
  }

  /* 删除 */
  function delAction(){
    $key = trim($this->request->getPost('key'));
    if(!$key) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 数据处理
    $id = trim($key,',');
    // 执行
    $model = SysMenu::find(['id in('.$id.')']);
    if($model->delete()==true){
      return self::getJSON(['code'=>0,'msg'=>'删除成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'删除失败！']);
    }
  }
  
}