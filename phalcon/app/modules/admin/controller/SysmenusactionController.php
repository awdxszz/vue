<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenuAction;

class SysMenusActionController extends UserBase {

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
    $limit = trim($this->request->getPost('limit'));
    $start = ($page-1)*$limit;
    $total = SysMenuAction::count([$where]);
    $menus = SysMenuAction::find([
      $where,
      'columns'=>'id,name,action,perm,ico',
      'order'=>'id',
      'limit'=>['number'=>$limit,'offset'=>$start]
    ]);
    return self::getJSON(['code'=>0,'list'=>$menus,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    $key = trim($this->request->getPost('key'));
    if(!$key || empty($key)) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 数据处理
    $data = json_decode($key);
    // 数据处理
    $model = new SysMenuAction();
    $data = json_decode($key);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
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
    $model = SysMenuAction::findFirst(['id=:id:','bind'=>['id'=>$id]]);
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
    $model = SysMenuAction::find(['id in('.$id.')']);
    if($model->delete()==true){
      return self::getJSON(['code'=>0,'msg'=>'删除成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'删除失败！']);
    }
  }
  
}