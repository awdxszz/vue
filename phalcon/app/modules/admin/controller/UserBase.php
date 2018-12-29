<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysAdmin;
use app\modules\admin\model\SysMenu;

class UserBase extends Base{

  static protected $perm = '';  // 权限值

	/* 构造函数 */
  function initialize(){
    // 菜单权限
    self::getPerm();
    // 权限判断
    self::isPerm();
  }

  /* 权限判断 */
  private function isPerm(){
    $controller = $this->dispatcher->getControllerName();
    if($controller!='UserMain'){
      $mid = SysMenu::findFirst(['url="'.$controller.'"','columns'=>'id']);
      if(!isset(self::$perm[$mid->id])){
        return $this->response->redirect('user/safety?code=4005&msg=无权访问该菜单！');
      }
    }
  }

  /* 菜单权限 */
  private function getPerm(){
    // 是否POST
    if(!$this->request->isPost()) return false;
    // Token验证
    $token = trim($this->request->getPost('token'));
    if(strlen($token)<157){
      return $this->response->redirect('user/safety?code=40001&msg=请重新登录！');
    }
    $res = self::verToken($token);
    if($res['code']!=0){
      return $this->response->redirect('user/safety?code='.$res['code'].'&msg='.$res['msg']);
    }
    // 菜单权限
    $res = self::getToken($token);
    $perm = SysAdmin::findFirst(['code="'.$res->uid.'"','columns'=>'perm']);
    $data = [];
		$arr = explode(' ',$perm->perm);
		foreach($arr as $val){
			$a = explode(':',$val);
			$data[$a[0]] = $a[1];
    }
    // 赋值权限
    self::$perm = $data;
  }
  
}