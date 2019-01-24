<?php

namespace app\modules\api\controller;

use app\modules\api\model\WebUser;
use app\modules\api\model\WebVideo;
use app\library\Inc;

class UserVideoController extends UserBase{

  static private $imgDir = 'upload/img/';
  static private $videoDir = 'upload/video/';
  static private $audioDir = 'upload/audio/';
  static private $photoDir = 'upload/photo/';

  /* 添加 */
  function addAction(){
    $token = trim($this->request->getPost('token'));
    $type = trim($this->request->getPost('type'));
    $data = trim($this->request->getPost('data'));
    $img = trim($this->request->getPost('img'));
    if(!$data || empty($data)) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 用户ID
    $uinfo = self::getToken($token);
    // 数据处理
    $model = new WebVideo();
    $data = json_decode($data);
    foreach($data as $key=>$val){
      // 封面图
      if($key=='img'){
        $up = self::uploadBase64(self::$imgDir,str_replace(' ','+',$val));
        if($up['status']){
          $model->img = $up['file'];
        }else{
          return self::getJSON(['code'=>50001,'msg'=>$up['msg']]);
        }
        continue;
      }
      // 上传内容
      if($key=='upload'){
        $upload_tmp = [];
        foreach($val as $up){
          $upload_tmp[] = $up->file;
        }
        $model->upload = json_encode($upload_tmp);
        continue;
      }
      // 采访时间
      if($key=='ctime'){
        $model->ctime=strtotime($val);
        continue;
      }
      // 生日
      if($key=='birthday'){
        $model->birthday=strtotime($val);
        continue;
      }
      $model->$key = trim($val);
    }
    $model->user_id = $uinfo->uid;
    $model->type = $type;
    // 执行
    if($model->save()==true){
      return self::getJSON(['code'=>0,'msg'=>'添加成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'添加失败！']);
    }
  }

  /* 上传视频 */
  function videoAction(){
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
  /* 删除视频 */
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
    }else{
      return ['status'=>false,'msg'=>'只支持'.implode(',',$type).'格式！'];
    }
  }

  // Base64上传
  private function uploadBase64($path,$base64){
    // 否有逗号
    if (strstr($base64,',')) $base64=explode(',',$base64)[1];
    // 文件名
    $ext = 'jpg';
    $file = date('YmdHis').rand(1000,9999).'.'.$ext;
    // 保存
    if(file_put_contents($path.$file,base64_decode($base64))){
      return ['status'=>true,'msg'=>'上传成功','file'=>$file];
    }else{
      return ['status'=>false,'msg'=>'保存图片失败！'];
    }
  }

}