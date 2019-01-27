<?php

namespace app\modules\admin\model;

use Phalcon\Mvc\Model;

class WebVideo extends Model{
	public $id;
	public function getSource(){
		return "web_video";
	}
}
