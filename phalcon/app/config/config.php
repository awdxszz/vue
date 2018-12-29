<?php
/*
* WebMIS开源项目
* Author: admin@webmis.vip
*/

return new \Phalcon\Config([
  'version' => '0.0.1',
  'key'=>md5('webmis'),  // 加密字符串
  'token_time'=>1*24*3600,  // Token有效期
	// 数据库配置
	'database' => [
		'adapter'=>'Mysql',
		'host'=>'localhost',
		'username'=>'webmis',
		'password'=>'webmis',
		'dbname'=>'mvc_vue',
		'charset'=>'utf8',
	],
	// 缓存数据库
	'redis'=>[
		'host'=>'127.0.0.1',
		'port'=>6379
	],
	// APP配置
	'application' => [
		'appDir'=>APP_PATH.'/',
		'cacheDir'=> BASE_PATH.'/cache/',
		'baseUri'=>'',
	],
	// CLI结果新行
	'printNewLine' => true
]);
