<?php

/**
* 上传类
*/

namespace app\library;

class Upload{

  // 上传处理
  static function upload($path){
    $upName = 'up';
		$type = ['jpg','png','gif','mov','mp4','wav','mp3'];
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

  /* Base64上传 */
  static function uploadBase64($path,$base64){
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