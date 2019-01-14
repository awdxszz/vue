export default {
  name:'register',
  data(){
    return {
      uinfo:{uname:'',passwd:'',passwd2:''},
      regSub:false,
    }
  },
  mounted(){
  },
  methods:{
    
    /* 注册 */
    register(){
      let _self = this;
      let uname = this.uinfo.uname;
      let passwd = this.uinfo.passwd;
      let passwd2 = this.uinfo.passwd2;
      // 验证
      let regTel = /^1[3|4|5|7|8]\d{9}$/;
      let regPwd = /^[a-zA-Z0-9|_|@|-|*|&]{5,16}$/;
      if(!uname || !passwd){
        return false;
      }else if(!regTel.test(uname)){
        this.$createToast({txt:'请输入手机号码！'}).show();
        return false;
      }else if(!regPwd.test(passwd)){
        this.$createToast({txt:'密码为5~16位字符！'}).show();
        return false;
      }else if(passwd!=passwd2){
        this.$createToast({txt:'两次密码不一致！'}).show();
        return false;
      }
      // 提交
      this.regSub = true;
      this.$ajax.post(
        this.$config.apiUrl+'user/register',
        'uname='+uname+'&passwd='+passwd
      ).then(function(res){
        _self.regSub = false;
        let d = res.data;
        if(d.code==0){
          // 跳转首页
          _self.$createToast({txt:'注册成功'}).show();
          setTimeout(function(){
            return _self.$router.push('/login');
          },600);
        }else{
          _self.$createToast({txt:d.msg}).show();
        }
      }).catch(function(){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
        _self.regSub = false;
      });
    },

    /* 登录 */
    login(){
      this.$router.push('/login');
    },

    /* 找回密码 */
    retrieve(){
      this.$createToast({txt:'暂不开通找回密码！'}).show();
    },

  },
}