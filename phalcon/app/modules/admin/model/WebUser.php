<?php

namespace app\modules\admin\model;

use Phalcon\Mvc\Model;

class WebUser extends Model{
	public $id;
	public function getSource(){
		return "web_user";
	}
}
