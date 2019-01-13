export default {
  name:'login',
  data(){
    return {
      uinfo:{uname:this.$storage.getItem('uname'),passwd:''},
      loginSub:false,
    }
  },
  mounted(){
  },
  methods:{
    
    /* 登录 */
    login(){
      let _self = this;
      let uname = this.uinfo.uname;
      let passwd = this.uinfo.passwd;
      // 验证
      let regTel = /^1[3|4|5|7|8]\d{9}$/;
      let regPwd = /^[a-zA-Z0-9|_|@|-|*|&]{6,32}$/;
      if(!uname || !passwd){
        return false;
      }else if(!regTel.test(uname)){
        this.$createToast({txt:'请输入手机号码！'}).show();
        return false;
      }else if(!regPwd.test(passwd)){
        this.$createToast({txt:'密码为6~32位字符！'}).show();
        return false;
      }
      // 提交
      this.loginSub = true;
      this.$ajax.post(
        this.$config.apiUrl+'user/login',
        'uname='+uname+'&passwd='+passwd
      ).then(function(res){
        _self.loginSub = false;
        let d = res.data;
        if(d.code==0){
          // 保存用户信息
          _self.$storage.setItem('uid',d.uid);
          _self.$storage.setItem('uname',d.uname);
          _self.$storage.setItem('token',d.token);
          _self.$storage.setItem('uinfo',JSON.stringify(d.uinfo));
          // 跳转首页
          _self.$createToast({txt:'登录成功'}).show();
          setTimeout(function(){
            return _self.$router.push('/');
          },600);
        }else{
          _self.$createToast({txt:d.msg}).show();
        }
      }).catch(function(){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
        _self.loginSub = false;
      });
    },

    /* 注册 */
    register(){
      this.$createToast({txt:'暂不开通注册！'}).show();
    },

    /* 找回密码 */
    retrieve(){
      this.$createToast({txt:'暂不开通找回密码！'}).show();
    },

  },
}