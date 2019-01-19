import Token from '@/components/Token'
export default {
  name:'userInfo',
  components: {Token},
  data(){
    return {
      token:this.$inc.token(),
    }
  },
  mounted(){
    // 插件
    // document.addEventListener('plusready', this.getScan(), false);
  },
  methods:{

    /* 返回 */
    back(){
      this.$router.go(-1);
    }
  },
}