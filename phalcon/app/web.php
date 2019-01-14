<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Application;
use Phalcon\Mvc\Router;
use Phalcon\Mvc\Dispatcher;

// 开发模式(1.Development，2.Production)
$mode = 'Production';

define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . '/app');

try {
	// 注册堆栈框架
	$di = new FactoryDefault();

	// 配置信息
	$di->setShared('config', function () {
		return include APP_PATH . "/config/config.php";
	});

	// 自动加载
	include APP_PATH.'/config/loader.php';
	// 公共服务
	require APP_PATH.'/config/services.php';
	// 公共服务：web
	require APP_PATH.'/config/services_web.php';

	/*  注册：默认路由 */
	$di->setShared('router', function () {
		$router = new Router();
		$router->setDefaultModule('home');
		return $router;
	});

	/* Web：默认命名空间 */
	$di->setShared('dispatcher', function() {
		$dispatcher = new Dispatcher();
		$dispatcher->setDefaultNamespace('app\modules\home\controller');
		return $dispatcher;
	});
	
	// 处理请求
	$app = new Application($di);

	// 注册：模块
	$app->registerModules([
		'home'=>[
			'className'=>'app\modules\home\module',
			'path'=>APP_PATH.'/modules/home/Module.php',
		],
		'admin'=>[
			'className'=>'app\modules\admin\module',
			'path'=>APP_PATH.'/modules/admin/Module.php',
		],
		'api'=>[
			'className'=>'app\modules\api\module',
			'path'=>APP_PATH.'/modules/api/Module.php',
		],
	]);

	// 注册：路由
	require APP_PATH . '/config/routes.php';
	
	// 执行
	$app->handle()->send();
	
} catch (\Exception $e) {
	if($mode=='Development'){
		echo $e->getMessage() . '<br>';
		echo '<pre>' . $e->getTraceAsString() . '</pre>';
	}else{
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
		echo json_encode(['code'=>40001,'msg'=>$e->getMessage()]);
	}
}
