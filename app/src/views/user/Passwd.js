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
        {type:'input',label:'原密码',passwd: 'passwd',props:{type:'password',placeholder: '请输入原密码'},rules: {required: true},trigger: 'blur'},
        {type:'input',label:'新密码',passwd: 'passwd1',props:{type:'password',placeholder: '请输入新密码'},rules: {required: true},trigger: 'blur'},
        {type:'input',label:'确认密码',passwd: 'passwd2',props:{type:'password',placeholder: '请输入确认密码'},rules: {required: true},trigger: 'blur'},
      ],
    }
  },
  mounted(){
    // 插件
    // document.addEventListener('plusready', this.getScan(), false);
  },
  methods:{

    /* 下拉刷新-视频 */
    passwdDown(){
      // 加载数据
      this.$refs.passwdScroll.forceUpdate();
    },

    /* 返回 */
    back(){
      this.$router.go(-1);
    }
  },
}