<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;

class UserMainController extends UserBase{

	/* 获取菜单 */
	function getMenusAction(){
    // 查询菜单
    return self::getJSON([
      'code'=>0,
      'menus'=>self::getMenu()
    ]);
  }
  // 递归菜单
	static private function getMenu($fid=0){
    $data=[];
    $M = SysMenu::find(['fid='.$fid,'columns'=>'id,fid,title,url,ico']);
		foreach($M as $val){
			if(isset(self::$perm[$val->id])){
        $val->menus = self::getMenu($val->id);
				$data[] = $val;
			}
		}
		return $data;
  }

  /* 动作菜单 */
  function getMenusActionAction(){
    $url = trim($this->request->getPost('url'));
    $mid = SysMenu::findFirst(['url="'.$url.'"','columns'=>'id']);
    return self::getJSON([
      'code'=>0,
      'menuAction'=>self::actionMenus(self::$perm[$mid->id]),
    ]);
  }
  // 动作菜单
	static private function actionMenus($perm=''){
		$data = [];
    // 全部动作菜单
    $aMenus = SysMenuAction::find(['','columns'=>'name,action,ico,perm']);
    foreach($aMenus as $val){
			// 匹配权限值
			if(intval($perm)&intval($val->perm)){
				$data[] = ['name'=>$val->name,'action'=>$val->action,'ico'=>$val->ico];
			}
    }
    return $data;
  }

  /* 全部动作菜单 */
  function getMenusActionAllAction(){
    $aMenus = SysMenuAction::find(['','columns'=>'name,action,perm']);
    return self::getJSON(['code'=>0,'aMenus'=>$aMenus]);
  }

  /* 查询子菜单 */
  function getMenusChildrenAction(){
    $fid = trim($this->request->getPost('fid'));
    $menus = SysMenu::find(['fid=:fid:','bind'=>['fid'=>$fid],'columns'=>'id,title']);
    $data = [];
    foreach($menus as $val){
      $data[] = ['label'=>$val->title,'value'=>$val->id];
    }
    return self::getJSON(['code'=>0,'menus'=>$data]);
  }
  
}