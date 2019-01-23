<?php

namespace app\modules\api\controller;

use app\modules\api\model\WebUser;
use app\library\Inc;

class UserVideoController extends UserBase{

  static private $videoDir = 'upload/video/';
  static private $audioDir = 'upload/audio/';
  static private $photoDir = 'upload/photo/';

  /* 上传文件 */
  function videoAction(){
    self::getJSON();
    // 用户ID
    $token = trim($this->request->getPost('token'));
    $res = self::getToken($token);
    // echo $res->uid;
    // 保存视频
    $up = self::upload(self::$videoDir);
    if($up['status']){
      return self::getJSON([
        'code'=>0,
        'msg'=>$up['msg'],
        'data'=>[
          'src'=>Inc::BaseUrl(self::$videoDir.$up['file']),
          'file'=>$up['file']
        ]
      ]);
    }else{
      return self::getJSON(['code'=>50001,'msg'=>$up['msg']]);
    }
  }
  /* 删除文件 */
  function videoDelAction(){
    $file = trim($this->request->getPost('file'));
    unlink(self::$videoDir.$file);
    return self::getJSON(['code'=>0,'msg'=>'删除成功']);
  }

  // 上传处理
  private function upload($path){
    $upName = 'up';
		$type = ['jpg','png','gif','mov'];
		$ext = substr(strrchr($_FILES[$upName]['name'],'.'),1);
    $file = date('YmdHis').rand(1000,9999).'.'.$ext;
    if(in_array($ext,$type)){
      if(move_uploaded_file($_FILES[$upName]['tmp_name'],$path.$file)){
        return ['status'=>true,'msg'=>'上传成功','file'=>$file];
      }else{
        return ['status'=>false,'msg'=>'保存图片失败！'];
      }
    }else{return ['status'=>false,'msg'=>'只支持'.implode(',',$type).'格式！'];}
  }

}