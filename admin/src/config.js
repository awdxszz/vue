/*
* 自定义属性、函数
*/
export default function install(Vue){

  // 配置
  Vue.prototype.$config = {
    name:'WebMIS',
    version: '0.0.1',
    // apiUrl: 'http://192.168.1.88:9091/admin/',
    apiUrl: 'http://vue.webmis.vip/admin/',
  }

  // 本地硬盘
  Vue.prototype.$storage = window.localStorage;

  // 公共
  Vue.prototype.$inc = {
    
    /* Token */
    token:function(){
      return Vue.prototype.$storage.getItem('token');
    },

    /* 设备检测 */
    os:function(){
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

  }

}