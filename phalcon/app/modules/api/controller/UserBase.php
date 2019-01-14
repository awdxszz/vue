<?php

namespace app\modules\api\controller;

class UserBase extends Base {

  /* 构造函数 */
	public function initialize(){
    // 验证Token
    $token = trim($this->request->getPost('token'));
    if(!$token) return $this->response->redirect('user/safety?code=40001&msg=请输入Token！');
    $res = self::token($token);
    if($res['code']!=0) return $this->response->redirect('user/safety?code=40001&msg=Token验证失败！');
  }
}