<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\WebVideo;
use app\library\Inc;

class WebVideoController extends UserBase {

  static private $imgDir = 'upload/img/';
  static private $videoDir = 'upload/video/';
  static private $audioDir = 'upload/audio/';
  static private $photoDir = 'upload/photo/';

  /* 列表 */
  function listAction(){
    // 条件
    $key = trim($this->request->getPost('key'));
    $where = '';
    if($key){
      $key = json_decode($key);
      foreach($key as $k=>$v){
        $where .= $k." LIKE '%".$v."%' AND ";
      }
      $where = rtrim($where,'AND ');
    }
    // 分段
    $page = trim($this->request->getPost('page'));
    $limit = trim($this->request->getPost('limit'));
    $start = ($page-1)*$limit;
    $total = WebVideo::count([$where]);
    $menus = WebVideo::find([
      $where,
      'columns'=>'id,user_id,type,title,name,sex,birthday,tel,education,ctime,addr,img',
      'order'=>'id',
      'limit'=>['number'=>$limit,'offset'=>$start]
    ]);
    // 数据
    $list = [];
    foreach($menus as $key=>$val){
      $val->img = Inc::BaseUrl(self::$imgDir.$val->img);
      $val->ctime = date('Y-m-d',$val->ctime);
      $val->birthday = date('Y-m-d',$val->birthday);
      $list[] = $val;
    }
    return self::getJSON(['code'=>0,'list'=>$list,'total'=>$total]);
  }

  /* 删除 */
  function delAction(){
    $key = trim($this->request->getPost('key'));
    if(!$key) return self::getJSON(['code'=>40000,'msg'=>'没有数据！']);
    // 数据处理
    $id = trim($key,',');
    // 执行
    $model = WebVideo::find(['id in('.$id.')']);
    if($model->delete()==true){
      return self::getJSON(['code'=>0,'msg'=>'删除成功！']);
    }else{
      return self::getJSON(['code'=>50000,'msg'=>'删除失败！']);
    }
  }
  
}