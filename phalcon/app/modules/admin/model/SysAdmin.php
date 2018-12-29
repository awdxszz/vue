<?php

namespace app\modules\admin\model;

use Phalcon\Mvc\Model;

class SysAdmin extends Model{

  public $id;
  protected $uname;
  protected $tel;
  protected $email;

  /* 构造函数 */
  function initialize(){
    // 允许跨域请求
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
  }

  /* 数据表 */
	public function getSource(){
		return "sys_admin";
  }
  
  /* 用户名 */
  public function setUname($uname){
    // 是否合法
    if(!preg_match('/^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{3,15}$/',$uname)){
      throw new \InvalidArgumentException('英文字母开头的4~16位字符！');
    }
    // 是否存在
    $where = 'uname=:uname:';
    if($this->id) $where = 'id<>'.$this->id.' AND '.$where;
    $user = $this->findFirst([$where,'bind'=>['uname'=>$uname],'columns'=>'id']);
    if($user){
      throw new \InvalidArgumentException('该用户名已经存在！');
    }
    $this->uname = $uname;
  }
  public function getUname(){
    return $this->uname;
  }

  /* 手机号码 */
  public function setTel($tel){
    // 是否合法
    if(!preg_match('/^1[3|4|5|7|8]\d{9}$/',$tel)){
      throw new \InvalidArgumentException('请输入手机号码');
    }
    // 是否存在
    $where = 'tel=:tel:';
    if($this->id) $where = 'id<>'.$this->id.' AND '.$where;
    $user = $this->findFirst([$where,'bind'=>['tel'=>$tel],'columns'=>'id']);
    if($user){
      throw new \InvalidArgumentException('该手机号码已经存在！');
    }
    $this->tel = $tel;
  }
  public function getTel(){
    return $this->tel;
  }

  /* 邮箱 */
  public function setEmail($email){
    // 是否合法
    if(!preg_match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/',$email)){
      throw new \InvalidArgumentException('请输入邮箱');
    }
    // 是否存在
    $where = 'email=:email:';
    if($this->id) $where = 'id<>'.$this->id.' AND '.$where;
    $user = $this->findFirst([$where,'bind'=>['email'=>$email],'columns'=>'id']);
    if($user){
      throw new \InvalidArgumentException('该邮箱已经存在！');
    }
    $this->email = $email;
  }
  public function getEmail(){
    return $this->email;
  }

}
