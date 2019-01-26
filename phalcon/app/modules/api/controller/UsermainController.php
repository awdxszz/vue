<?php

namespace app\modules\api\controller;

use app\modules\api\model\WebUser;
use app\library\Inc;
use app\library\Upload;

class UserMainController extends UserBase{

  static private $icoDir = 'upload/ico/';

  /* 获取用户信息 */
  function getUinfoAction(){
    $token = trim($this->request->getPost('token'));
    $user = self::getToken($token);
    $uData = WebUser::findFirst([
      'user_id=:uid: AND state="1"',
      'bind' => ['uid'=>$user->uid],
      'columns'=>'name,sex,nickname,birthday,img'
    ]);
    if($uData->img) $uData->img=Inc::BaseUrl(self::$icoDir.$uData->img);
    return self::getJSON(['code'=>0,'data'=>$uData]);
  }

  /* 上传头像 */
  function upImgAction(){
    $token = trim($this->request->getPost('token'));
    $base64 = trim($this->request->getPost('img'));
    $user = self::getToken($token);
    // 保存
    $up = Upload::uploadBase64(self::$icoDir,str_replace(' ','+',$base64));
    if($up['status']){
      // 删除原图
      $model = WebUser::findFirst(['user_id=:uid:','bind' => ['uid'=>$user->uid]]);
      if($model->img) @unlink(self::$icoDir.$model->img);
      $model->img = $up['file'];
      // 结果
      if($model->save()==true){
        return self::getJSON([
          'code'=>0,
          'msg'=>$up['msg'],
          'data'=>[
            'src'=>Inc::BaseUrl(self::$icoDir.$up['file']),
            'file'=>$up['file']
          ]
        ]);
      }else{
        return self::getJSON(['code'=>50000,'msg'=>'更换失败！']);
      }
    }else{
      return self::getJSON(['code'=>50001,'msg'=>$up['msg']]);
    }
  }
  
}