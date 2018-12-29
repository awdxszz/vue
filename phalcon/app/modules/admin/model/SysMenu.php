<?php

namespace app\modules\admin\model;

use Phalcon\Mvc\Model;

class SysMenu extends Model{

  public $id;
  protected $fid;
  protected $title;

  /* 构造函数 */
  function initialize(){
    // 允许跨域请求
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
  }

  /* 数据表 */
	public function getSource(){
		return "sys_menus";
  }

  /* FID */
  public function setFid($fid){
    if(!is_numeric($fid)){
      throw new \InvalidArgumentException('只能是数字！');
    }
    $this->fid = $fid;
  }
  public function getFid(){
    return $this->fid;
  }
  
  /* 名称 */
  public function setTitle($title){
    if(!preg_match('/^[\x7f-\xff_a-zA-Z]{4,18}$/',$title)){
      throw new \InvalidArgumentException('为2~6位汉字或4~18位英文！');
    }
    $this->title = $title;
  }
  public function getTitle(){
    return $this->title;
  }

}
