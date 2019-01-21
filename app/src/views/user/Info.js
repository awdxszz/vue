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
        {type:'input',label:'昵称',modelKey: 'nickname',props:{placeholder: '请输入'},rules: {required: true},trigger: 'blur'},
        {type:'input',label:'姓名',modelKey: 'name',props:{placeholder: '请输入姓名'}},
        {type:'select',label:'性别',modelKey: 'sex',props:{options: ['男','女']}},
        {type:'select',label:'生日',modelKey: 'birthday'},
        {type:'textarea',label:'个性签名',modelKey: 'sign',props:{placeholder: '填写个性签名'}},
      ],
    }
  },
  mounted(){
    // 插件
    // document.addEventListener('plusready', this.getScan(), false);
  },
  methods:{

    /* 下拉刷新-视频 */
    infoDown(){
      // 加载数据
      this.$refs.infoScroll.forceUpdate();
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