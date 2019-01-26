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

  /* 列表 */
  function listAction(){
    self::getJSON();
    $page = trim($this->request->getPost('page'));
    $limit = trim($this->request->getPost('limit'));
    $key = trim($this->request->getPost('key'));
    $uid = trim($this->request->getPost('uid'));
    $type = trim($this->request->getPost('type'));
    // 查询条件
    $where = '(title like "%'.$key.'%" or name like "%'.$key.'%" or tel like "%'.$key.'%")';
    if($uid) $where .= ' and user_id="'.$uid.'"';
    if($type) $where .= ' and type="'.$type.'"';
    // 查询
    $start = ($page-1)*$limit;
    $list = WebVideo::find([
      $where,
      'columns'=>'id,type,title,name,tel,addr,img',
      'order'=>'id desc',
      'limit'=>['number'=>$limit,'offset'=>$start]
    ]);
    // 数据
    $data = [];
    foreach($list as $key=>$val){
      $val->img=Inc::BaseUrl(self::$imgDir.$val->img);
      $data[] = [
        'item'=>$val,
        'btns'=>[
          ['action'=>'tel','text'=>'联系客户','color'=>'#A2A4A6','val'=>$val->tel],
          ['action'=>'send','text'=>'删除','color'=>'#FF0000','val'=>$val->id]
        ]
      ];
    }
    return self::getJSON(['code'=>0,'data'=>$data,'msg'=>'查询结果']);
  }

  /* 详情 */
  function showAction(){
    $id = trim($this->request->getPost('id'));
    if(!$id || empty($id) || !is_numeric($id)) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 查询
    $one = WebVideo::findFirst($id);
    // 上传内容
    $upload = json_decode($one->upload);
    $up = [];
    foreach($upload as $val){
      if($one->type==0) $up[]=Inc::BaseUrl(self::$videoDir.$val);
      elseif($one->type==1) $up[]=Inc::BaseUrl(self::$audioDir.$val);
      elseif($one->type==2) $up[]=Inc::BaseUrl(self::$photoDir.$val);
    }
    // 结果
    return self::getJSON(['code'=>0,'data'=>[
      'type'=>$one->type,
      'title'=>$one->title,
      'upload'=>$up,
      'info'=>[
        [
          'title'=>'基本信息',
          'items'=>[
            ['name'=>'标题','value'=>$one->title],
            ['name'=>'日期','value'=>date('Y-m-d',$one->ctime)],
            ['name'=>'地点','value'=>$one->addr],
          ]
        ],
        [
          'title'=>'个人信息',
          'items'=>[
            ['name'=>'姓名','value'=>$one->name],
            ['name'=>'电话','value'=>$one->tel],
            ['name'=>'性别','value'=>$one->sex],
            ['name'=>'生日','value'=>$one->birthday],
            ['name'=>'文化程度','value'=>$one->education],
          ]
        ],
        [
          'title'=>'其它',
          'items'=>[
            ['name'=>'备注','value'=>$one->remark],
          ]
        ]
      ]
    ],'msg'=>'查询结果']);
  }

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

  /* 删除 */
  function delAction(){
    $id = trim($this->request->getPost('id'));
    if(!$id || empty($id) || !is_numeric($id)) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 查询
    $model = WebVideo::findFirst($id);
    $upload = json_decode($model->upload);
    // 删除文件
    foreach($upload as $val){
      if($model->type==0) unlink(self::$videoDir.$val);
      elseif($model->type==1) unlink(self::$audioDir.$val);
      elseif($model->type==2) unlink(self::$photoDir.$val);
    }
    // 删除数据
    if($model->delete()==true){
      return self::getJSON(['code'=>0,'msg'=>'删除成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'删除失败！']);
    }
  }

  /* 视频 */
  function videoAction(){
    // 保存
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

  /* 音频 */
  function audioAction(){
    // 保存
    $up = self::upload(self::$audioDir);
    if($up['status']){
      return self::getJSON([
        'code'=>0,
        'msg'=>$up['msg'],
        'data'=>[
          'src'=>Inc::BaseUrl(self::$audioDir.$up['file']),
          'file'=>$up['file']
        ]
      ]);
    }else{
      return self::getJSON(['code'=>50001,'msg'=>$up['msg']]);
    }
  }
  /* 删除音频 */
  function audioDelAction(){
    $file = trim($this->request->getPost('file'));
    unlink(self::$audioDir.$file);
    return self::getJSON(['code'=>0,'msg'=>'删除成功']);
  }

  /* 拍照 */
  function photoAction(){
    $base64 = trim($this->request->getPost('up'));
    // 保存
    $up = self::uploadBase64(self::$photoDir,str_replace(' ','+',$base64));
    if($up['status']){
      return self::getJSON([
        'code'=>0,
        'msg'=>$up['msg'],
        'data'=>[
          'src'=>Inc::BaseUrl(self::$photoDir.$up['file']),
          'file'=>$up['file']
        ]
      ]);
    }else{
      return self::getJSON(['code'=>50001,'msg'=>$up['msg']]);
    }
  }
  /* 删除音频 */
  function photoDelAction(){
    $file = trim($this->request->getPost('file'));
    unlink(self::$photoDir.$file);
    return self::getJSON(['code'=>0,'msg'=>'删除成功']);
  }

  // 上传处理
  private function upload($path){
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