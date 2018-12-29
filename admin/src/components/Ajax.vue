<template></template>

<script>
export default {
  name:'Ajax',
  data(){
    return {}
  },
  methods:{
    /* Post */
    post(url,perm,callback){
      let _self = this;
      this.$ajax.post(
        this.$config.apiUrl+url,
        'token='+this.$inc.token()+perm
      ).then(callback).catch(function(){
        _self.$message.error('网络加载失败，请重试');
      });
    }
  }
}
</script>
