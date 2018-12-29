<?php

/**
* 安全验证类
*/

namespace app\library;

class Safety{
	static function isRight($name='',$val=''){
		// 正则
		$data = [
			'uname'=>['/^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{3,15}$/','英文开头4~16位字符'],
			'passwd'=>['/^[a-zA-Z0-9|_|@|-|*|&]{5,16}$/','5~16位字符'],
			'tel'=>['/^1[3|4|5|7|8]\d{9}$/','请输入手机号码'],
			'email'=>['/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/','请输入邮箱']
		];
		return preg_match($data[$name][0],$val)?true:$data[$name][1];
	}
}