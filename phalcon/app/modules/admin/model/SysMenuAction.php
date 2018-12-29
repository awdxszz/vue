<?php

namespace app\modules\admin\model;

use Phalcon\Mvc\Model;

class SysMenuAction extends Model{

  public $id;
  protected $name;
  protected $action;
  protected $perm;

  /* 构造函数 */
  function initialize(){
    // 允许跨域请求
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
  }

  /* 数据表 */
	public function getSource(){
		return "sys_menus_action";
  }
  
  /* 名称 */
  public function setName($name){
    if(!preg_match('/^[\x7f-\xff_a-zA-Z]{4,18}$/',$name)){
      throw new \InvalidArgumentException('为2~6位汉字或4~18位英文！');
    }
    $this->name = $name;
  }
  public function getName(){
    return $this->name;
  }

  /* 命名 */
  public function setAction($action){
    if(!preg_match('/^[a-zA-Z]{3,16}$/',$action)){
      throw new \InvalidArgumentException('命名为3~16位英文！');
    }
    $this->action = $action;
  }
  public function getAction(){
    return $this->action;
  }

  /* 权限 */
  public function setPerm($perm){
    if((int)$perm<1 || (int)$perm%2!=0){
      throw new \InvalidArgumentException('权限为2的n次方！');
    }
    $this->perm = $perm;
  }
  public function getPerm(){
    return $this->perm;
  }

}
