/*
* 自定义属性、函数
*/
export default function install(Vue){

  // 配置
  Vue.prototype.$config = {
    name:'WebMIS',
    version: '0.0.1',
    link_name: 'WebMIS',
    // apiUrl: 'http://192.168.1.88:9091/api/',
    apiUrl: 'http://vue.webmis.vip/api/',
    map_key: 'c526dde052bd47c221103ae04176cc3c',
  }

  // 本地硬盘
  Vue.prototype.$storage = window.localStorage;

  // 公共
  Vue.prototype.$inc = {
    
    /* Token */
    token(){
      return Vue.prototype.$storage.getItem('token');
    },

    /* 设备检测 */
    os(){
      let u = navigator.userAgent;
      let os = '';
      if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
        os = 'Android';
      }else if(u.indexOf('iPhone') > -1){
        os = 'iPhone';
      }else if(u.indexOf('Windows Phone') > -1){
        os = 'WindowsPhone';
      }else{
        os = 'Other';
      }
      return os;
    },

    /* 定位 */
    geolocation(callback){
      try{
        plus.geolocation.watchPosition(callback);
      }catch(e){console.log('定位');}
    },

    /* 拍照 */
    camera(callback){
      try{
        let camera = plus.camera.getCamera();
        camera.captureImage(function(url){
          plus.io.resolveLocalFileSystemURL(url, function (entry) {
            callback(entry.fullPath);
          },function (e) {
            console.log("读取拍照失败");
          });
        },function(e){console.log('已取消');});
      }catch(e){console.log('拍照');}
    },

    /* 相册 */
    photo(callback){
      try{
        plus.gallery.pick(function(paths){
          callback(paths);
        });
      }catch(e){console.log('相册');}
    },

    /* 录像 */
    video(callback){
      try{
        let camera = plus.camera.getCamera();
        camera.startVideoCapture(function(url) {
          plus.io.resolveLocalFileSystemURL(url, function (entry) {
            callback(entry.fullPath);
          },function (e) {
            console.log("读取录像失败");
          });
        },function(e){console.log('已取消');});
      }catch(e){console.log('录像');}
    },

    /* 音频 */
    audio(r,callback){
      try{
        r.record({filename: '_doc/audio/'}, function(url) {
          plus.io.resolveLocalFileSystemURL(url, function (entry) {
            callback(entry.fullPath);
          },function (e) {
            console.log("读取音频失败");
          });
        },function(e){console.log('已取消');});
      }catch(e){console.log('录音');}
    },

    /* 压缩图片 */
    compressImage(file,parm,callback){
      // 默认
      let imageWidth = 0;
      let imageHeight = 0;
      let offsetX = 0;
      let offsetY = 0;
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let w = 420;
      let h = 560;
      if(parm.width) w = parm.width;
      if(parm.height) h = parm.height;
      let img = new Image();
      img.src = file;
      img.onload = function () {
        // 等比例缩放
        if (this.width > this.height) {
            imageWidth = w;
            imageHeight = Math.round(w*this.height/this.width);
        }else{
            imageWidth = w;
            imageHeight = Math.round(w*this.height/this.width);
        }
        // 是否裁切
        if(h>0){
            offsetY = - Math.round((imageHeight-h)/2);
        }
        // 画板高宽
        canvas.width = imageWidth;
        canvas.height = h?h:imageHeight;
        context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
        let data = canvas.toDataURL('image/jpeg');
        callback(data);
      }
    },

    /* 系统缓存 */
    cacheClear(){
      try{
        plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
          return entry.removeRecursively();
        }, function(e) {
          console.log('清理缓存失败');
        });
      }catch(e){console.log('清理缓存');}
    },

  }
}