<?php

namespace app\modules\api\controller;

use Phalcon\Mvc\Controller;

class BaseController extends Controller{
    
    /* 返回JSON */
    protected function getJSON($data=''){
        header('Access-Control-Allow-Origin:*');
        header('Access-Control-Allow-Methods:*');
        header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
        return $this->response->setJsonContent($data);
    }

}