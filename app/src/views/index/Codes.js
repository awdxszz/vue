import Token from '@/components/Token'
export default {
  name:'codes',
  components: {Token},
  data(){
    return {
      token:this.$inc.token(),
      scan:null,
      codeContent:{type:'',url:''},
    }
  },
  mounted(){
    // 二维码插件
    document.addEventListener('plusready', this.getScan(), false);
  },
  methods:{
    /* 扫描二维码 */
    getScan(){
      let _self = this;
      try{
        // 是否创建
        if(!this.scan){
          this.scan = new plus.barcode.Barcode('codeCT');
          this.scan.onmarked = function(type, result){
            _self.codeContent = {type:type,url:result};
            // 关闭扫码
            _self.scan.close();
          }
        }
        // 打开
        this.scan.start();
      }catch(e){
        console.log('Plus只能运行手机设备');
      }
    },

    /* 返回 */
    back(){
      this.$router.go(-1);
      // 关闭扫码
      this.scan.close();
    }
  },
}