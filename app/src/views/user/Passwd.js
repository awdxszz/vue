import Token from '@/components/Token'
export default {
  name:'userPasswd',
  components: {Token},
  data(){
    return {
      token:this.$inc.token(),
      // 滑动效果
      scroll:{
        passwd:{events: ['scroll'],options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}}},
      },
      // 表单数据
      formData:{passwd:'',passwd1:'',passwd2:''},
      formField:[
        {type:'input',label:'原密码',modelKey:'passwd',props:{type:'password',placeholder:'请输入原密码'},rules: {required:true,min:5}},
        {type:'input',label:'新密码',modelKey:'passwd1',props:{type:'password',placeholder:'请输入新密码'},rules: {required:true,min:5}},
        {type:'input',label:'确认密码',modelKey:'passwd2',props:{type:'password',placeholder:'请输入确认密码'},rules: {required:true,min:5}},
      ],
      // 提交按钮
      subStatus:{dis:false,text:'修改密码'}
    }
  },
  mounted(){
  },
  methods:{

    /* 下拉刷新-视频 */
    passwdDown(){
      // 加载数据
      this.$refs.passwdScroll.forceUpdate();
    },

    /* 提交 */
    validate(result){
      this.subStatus.dis = result.valid;
      console.log(result);
    },
    submitData(){
      let _self = this;
      console.log(this.subStatus.dis);
      if(this.subStatus.dis){
        // 按钮
        this.subStatus.dis = false;
        this.subStatus.text = '提交中...';
        // AJAX
        let data = JSON.stringify(this.formData);
        this.$ajax.post(
          this.$config.apiUrl+'UserInfo/passwd',
          'token='+this.$inc.token()+'&data='+data
        ).then(function(res){
          res = res.data;
          console.log(res);
          if(res.code!=0){
            _self.$createToast({txt:res.msg}).show();
            // 按钮
            _self.subStatus.dis = true;
            _self.subStatus.text = '重试';
          }else{
            _self.$createToast({txt:res.msg}).show();
            // 按钮
            _self.subStatus.dis = false;
            _self.subStatus.text = '完成';
            // 返回
            _self.$router.go(-1);
          }
        }).catch(function(e){
          _self.$createToast({txt:'网络加载失败，请重试'}).show();
        });
      }else{
        _self.$createToast({txt:'请完善信息！'}).show();
      }
      return false;
    },

    /* 返回 */
    back(){
      this.$router.go(-1);
    }
  },
}