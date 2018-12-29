<?php

namespace app\modules\admin\controller;

use app\library\Safety;
use app\modules\admin\model\SysAdmin;

class UserController extends Base{

	/* 首页 */
	function loginAction(){
    // 是否POST
    if(!$this->request->isPost()) return false;
    // 数据
    $uname = trim($this->request->getPost('uname'));
    $passwd = md5($this->request->getPost('passwd'));
    // 用户名是否合法
    $isUname = Safety::isRight('uname',$uname);
    $isTel = Safety::isRight('tel',$uname);
    $isEmail = Safety::isRight('email',$uname);
    if($isUname!==true && $isTel!==true && $isEmail!==true){
      return self::getJSON(['code'=>40001,'msg'=>'请输入帐号/手机/邮箱']);
    }
    $uData = SysAdmin::findFirst([
      '(uname = :uname: OR tel = :uname: OR email= :uname:) AND password = :passwd:',
      'bind' => ['uname'=>$uname, 'passwd'=>$passwd],
      'columns'=>'id,code,state,department,position,name'
    ]);
    // 判断结果
    if(empty($uData)){
      return self::getJSON(['code'=>40002,'msg'=>'帐号或密码错误！']);
    }
    // 是否禁用
    if($uData->state!='1') return self::getJSON(['code'=>40002,'msg'=>'该用户已被禁用！']);
    // 结果
    return self::getJSON([
      'code'=>0,
      'uinfo'=>[
        'uid'=>$uData->code,
        'uname'=>$uname,
        'department'=>$uData->department,
        'position'=>$uData->position,
        'name'=>$uData->name,
      ],
      'token'=>self::setToken($uData->code,$uname),
    ]);
  }
  
  /* 验证Token */
  function tokenAction(){
    // 是否POST
    if(!$this->request->isPost()) return false;
    // 数据
    $token = trim($this->request->getPost('token'));
    if(strlen($token)<157) return self::getJSON(['code'=>40001,'msg'=>'请输入Token！']);
    return self::getJSON(self::verToken($token));
  }

  /* 刷新Token */
  function reTokenAction(){
    // 是否POST
    if(!$this->request->isPost()) return false;
    // 数据
    $token = trim($this->request->getPost('token'));
    if(strlen($token)<157) return self::getJSON(['code'=>40001,'msg'=>'请输入Token！']);
    // 解密
    $data = self::getToken($token);
    if(!isset($data->ltime) && $data->ltime<time()) return ['code'=>40001,'msg'=>'令牌已过期！'];
    return self::getJSON(['code'=>0,'token'=>self::setToken($data->uid,$data->uname)]);
  }

  /* 安全防范 */
  function safetyAction(){
    return self::getJSON([
      'code'=>$this->request->getQuery('code'),
      'msg'=>$this->request->getQuery('msg')
    ]);
  }

}