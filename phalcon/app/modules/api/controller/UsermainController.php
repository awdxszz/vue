<?php

namespace app\modules\api\controller;

use app\modules\api\model\WebUser;

class UserMainController extends UserBase{

  /* 获取用户信息 */
  function getUinfoAction(){
    $token = trim($this->request->getPost('token'));
    $res = self::getToken($token);
    $uData = WebUser::findFirst([
      'user_id=:uid: AND state="1"',
      'bind' => ['uid'=>$res->uid],
      'columns'=>'name,sex,nickname,birthday,img'
    ]);
    return self::getJSON(['code'=>0,'data'=>$uData]);
  }
  
}