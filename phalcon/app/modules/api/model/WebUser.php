<?php

namespace app\modules\api\model;

use Phalcon\Mvc\Model;

class WebUser extends Model{
	public $id;
	public function getSource(){
		return "web_user";
	}
}
