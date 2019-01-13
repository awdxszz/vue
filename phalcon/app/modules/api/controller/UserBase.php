<?php

namespace app\modules\api\controller;

class UserBase extends Base {
    /* 构造函数 */
	public function initialize(){
        $token = trim($this->request->getPost('token'));
        if(!$token) return self::getJSON(['code'=>40001,'msg'=>'请输入Token！']);
        // 验证Token
        $res = self::token($token);
        if($res['code']!=10001) return self::getJSON($token);
    }
}