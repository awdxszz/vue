<?php

namespace app\modules\api\controller;

use Phalcon\Mvc\Controller;

class Base extends Controller{
    
  /* 返回JSON */
  protected function getJSON($data=''){
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    return $this->response->setJsonContent($data);
  }

  /* 错误信息 */
  static protected function error($perm=''){
    throw new \InvalidArgumentException($perm);
  }

  /* Token-验证 */
  protected function token($token){
    // 解密
    $data = self::getToken($token);
    if(!isset($data->login)) return ['code'=>40000,'msg'=>'令牌错误！'];
    // 是否超时
    if($data->ltime<time()) return ['code'=>40000,'msg'=>'令牌已过期！'];
    // 结果
    return ['code'=>0,'msg'=>'验证成功！','time'=>$data->ltime-time()];
  }
  // 加密Token
  protected function setToken($uid,$uname){
    return $this->jwt->encode([
      'uid'=>$uid,
      'uname'=>$uname,
      'login'=>true,
      'ltime'=>time()+$this->config->token_time,
    ],$this->config->key);
  }
  // 解密Token
  protected function getToken($token){
    return $this->jwt->decode($token,$this->config->key,['HS256']);
  }

}