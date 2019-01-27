import Token from '@/components/Token'
export default {
  name:'userInfo',
  components: {Token},
  data(){
    return {
      token:this.$inc.token(),
      // 滑动效果
      scroll:{
        info:{events: ['scroll'],options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}}},
      },
      // 表单数据
      formData:{nickname:'',name:'',sex:'',birthday:'',sign:''},
      formField:[
        {type:'input',label:'昵称',modelKey: 'nickname',props:{placeholder: '请输入昵称'},rules: {required: true}},
        {type:'input',label:'姓名',modelKey: 'name',props:{placeholder: '请输入姓名'}},
        {type:'select',label:'性别',modelKey: 'sex',props:{options: ['男','女']}},
        {type:'select',label:'生日',modelKey: 'birthday'},
        {type:'textarea',label:'个性签名',modelKey: 'sign',props:{placeholder: '填写个性签名'}},
      ],
      // 提交按钮
      subStatus:{dis:true,text:'提交'}
    }
  },
  mounted(){
     // 加载数据
     this.loadData();
  },
  methods:{

    /* 下拉刷新-视频 */
    infoDown(){
      // 加载数据
      this.$refs.infoScroll.forceUpdate();
    },

    /* 加载数据 */
    loadData(){
      let _self = this;
      // 用户信息
      this.$ajax.post(
        this.$config.apiUrl+'UserInfo/getUinfo',
        'token='+this.$inc.token()
      ).then(function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$createToast({txt:res.msg}).show();
        }else{
          _self.formData = d.data;
        }
        // 加载动画
        _self.$refs.infoScroll.forceUpdate();
      });
    },

    /* 提交 */
    validate(result){
      this.subStatus.dis = result.valid;
    },
    submitData(){
      let _self = this;
      if(this.subStatus.dis){
        // 按钮
        this.subStatus.dis = false;
        this.subStatus.text = '提交中...';
        // AJAX
        let data = JSON.stringify(this.formData);
        this.$ajax.post(
          this.$config.apiUrl+'UserInfo/edit',
          'token='+this.$inc.token()+'&data='+data
        ).then(function(res){
          res = res.data;
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

    /* 生日 */
    showBirthday(){
      if (!this.birthdayPicker) {
        this.birthdayPicker = this.$createDatePicker({
          title: '选择生日',
          min: new Date(1970,1,1),
          max: new Date(),
          value: new Date(),
          onSelect: this.selectBirthday,
        });
      }
      this.birthdayPicker.show()
    },
    selectBirthday(date,val,text){
      this.formData.birthday = val[0]+'-'+val[1]+'-'+val[2];
    },

    /* 返回 */
    back(){
      this.$router.go(-1);
    }
  },
}