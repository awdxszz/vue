<template>
  <div if="noDisplay"></div>
</template>

<script>
export default {
  name:'Token',
  data(){
    return {
      noDisplay:false,
    }
  },
  methods: {

    /* 验证Token */
    token(){
      let _self = this;
      this.$ajax.post(
        this.$config.apiUrl+'user/token',
        'token='+this.$inc.token()
      ).then(function(res){
        let d = res.data;
        if(d.code!==0){
          _self.logout();
        }
      }).catch(function(){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
      });
    },

    /* 退出登陆 */
    logout(){
      // 清除信息
      this.$storage.removeItem('token');
      this.$storage.removeItem('uinfo');
      return this.$router.push('/login');
    }

  },
}
</script>

