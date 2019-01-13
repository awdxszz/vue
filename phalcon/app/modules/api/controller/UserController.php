<?php

namespace app\modules\api\controller;

use app\library\Safety;
use app\modules\api\model\WebUser;

class UserController extends Base {
    
  /* 登陆 */
  function loginAction(){
    self::getJSON();
    // 是否POST
    if(!$this->request->isPost()) return false;
    // 数据
    $uname = trim($this->request->getPost('uname'));
    $passwd = md5($this->request->getPost('passwd'));
    // 判断登陆次数
    $login_num = $this->redis->get('LOGIN_NUM_'.$uname);
    if($login_num>$this->config->login_num) return self::getJSON(['code'=>40002,'msg'=>'请明天再尝试！']);
    // 用户数据
    $uData = WebUser::findFirst([
      '(uname=:uname: OR tel=:uname: OR email=:uname:) AND password = :passwd:',
      'bind' => ['uname'=>$uname, 'passwd'=>$passwd],
      'columns'=>'id,user_id,state,name,sex,nickname,birthday,img'
    ]);
    // 判断结果
    if(empty($uData)){
      $this->redis->setex('LOGIN_NUM_'.$uname,$this->config->login_num_time,$login_num+1);
      return self::getJSON(['code'=>40002,'msg'=>'登录错误！还剩'.($this->config->login_num-$login_num).'次']);
    }
    // 是否禁用
    if($uData->state!='1') return self::getJSON(['code'=>40002,'msg'=>'该用户已被禁用！']);
    // 结果
    return self::getJSON([
      'code'=>0,
      'uid'=>$uData->code,
      'uname'=>$uname,
      'uinfo'=>[
        'name'=>$uData->name,
        'sex'=>$uData->sex,
        'nickname'=>$uData->nickname,
        'birthday'=>$uData->birthday,
        'img'=>$uData->img,
      ],
      'token'=>self::setToken($uData->id,$uname),
    ]);
  }

  /* 验证Token */
  function tokenAction(){
    // 是否POST
    if(!$this->request->isPost()) return false;
    // 数据
    self::getJSON();
    $token = trim($this->request->getPost('token'));
    if(!$token) return self::getJSON(['code'=>40001,'msg'=>'请输入Token！']);
    return self::getJSON(self::token($token));
  }
  /* 刷新Token */
  function reTokenAction(){
    $token = trim($this->request->getPost('token'));
    if(!$token) return self::getJSON(['code'=>40001,'msg'=>'请输入Token！']);
    // 解密
    $data = self::getToken($token);
    if(!isset($data->ltime) && $data->ltime<time()) return ['code'=>40001,'msg'=>'令牌已过期！'];
    return ['status'=>'y','token'=>self::setToken($data->uid,$data->uname)];
  }
    
}