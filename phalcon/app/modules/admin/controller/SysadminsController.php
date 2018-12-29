<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysAdmin;
use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;

class SysadminsController extends UserBase {

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
    $total = SysAdmin::count([$where]);
    $menus = SysAdmin::find([
      $where,
      'columns'=>'id,code,uname,tel,email,name,department,position,state,perm',
      'order'=>'id desc',
      'limit'=>['number'=>$pagesize,'offset'=>$start]
    ]);
    return self::getJSON(['code'=>0,'list'=>$menus,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    $key = trim($this->request->getPost('key'));
    if(!$key || empty($key)) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 数据处理
    $model = new SysAdmin();
    $data = json_decode($key);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      if($key=='tel' && empty($val)) continue;
      if($key=='email' && empty($val)) continue;
      $model->$key = trim($val);
    }
    $model->code = date('YmdHis').rand(1000,9999);
    $model->password = $data->passwd?md5($data->passwd):md5('123456');
    $model->rtime = date('YmdHis');
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
    $model = SysAdmin::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    if(!$model) return self::getJSON(['code'=>40000,'msg'=>'该条数据不存在！']);
    $data = json_decode($key);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      if($key=='uname' && empty($val)) continue;
      if($key=='tel' && empty($val)) continue;
      if($key=='email' && empty($val)) continue;
      $model->$key = trim($val);
    }
    // 是否修改密码
    if(isset($data->passwd) && !empty(trim($data->passwd))) $model->password=md5($data->passwd);
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
    // 禁止删除管理员
    if(in_array(1,explode(',',$id))) return self::getJSON(['code'=>40000,'msg'=>'无法删除系统管理员！']);
    // 执行
    $model = SysAdmin::find(['id in('.$id.')']);
    if($model->delete()==true){
      return self::getJSON(['code'=>0,'msg'=>'删除成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'删除失败！']);
    }
  }

  /* 全部菜单 */
  function allMenusAction(){
    // 获取菜单
    $menus = self::getMenu();
    // 动作菜单
    $aMenus = SysMenuAction::find(['columns'=>'name,perm']);
    // 组合结果
    $data = []; $n1=0;
    foreach($menus as $v1){
      $data[$n1] = ['id'=>$v1->id.'','label'=>$v1->title];
      $n2=0;
      foreach($v1->menus as $v2){
        $data[$n1]['children'][$n2] = ['id'=>$v1->id.':'.$v2->id,'label'=>$v2->title];
        $n3=0;
        foreach($v2->menus as $v3){
          $data[$n1]['children'][$n2]['children'][$n3] = ['id'=>$v1->id.':'.$v2->id.':'.$v3->id,'label'=>$v3->title];
          $n4=0;
          foreach($aMenus as $v4){
            if(intval($v3->perm)&intval($v4->perm)){
              $data[$n1]['children'][$n2]['children'][$n3]['children'][$n4] = ['id'=>$v3->id.'-'.$v4->perm,'label'=>$v4->name];
              $n4++;
            }
          }
          $n3++;
        }
        $n2++;
      }
      $n1++;
    }
    return self::getJSON(['code'=>0,'menus'=>$data]);
  }
  // 递归菜单
	static private function getMenu($fid=0){
    $data=[];
    $M = SysMenu::find(['fid='.$fid,'columns'=>'id,title,perm']);
		foreach($M as $val){
      $val->menus = self::getMenu($val->id);
			$data[] = $val;
		}
		return $data;
  }
  
}