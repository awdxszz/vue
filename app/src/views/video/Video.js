import Token from '@/components/Token'
export default {
  name:'Video',
  components: {Token},
  data(){
    return {
      token:this.$inc.token(),
      // 滑动效果
      scroll:{
        video:{events: ['scroll'],options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}}},
      },
      // 录音
      audio:null,
      // 表单数据
      formData:{img:'',video:[],title:'',ctime:'',addr:'',name:'',tel:'',sex:'',birthday:'',education:'',remark:''},
      formField:[
        {type:'input',label:'标题',modelKey: 'title',props:{placeholder: '请输入'},rules: {required: true},trigger: 'blur'},
        {type:'Date',label:'时间',modelKey: 'ctime',rules: {required: true}},
        {type:'input',label:'采访地点',modelKey: 'addr',props:{placeholder: '定位地址'},rules: {required: true}},
        {type:'input',label:'姓名',modelKey: 'name',props:{placeholder: '请输入姓名'},rules: {required: true},trigger: 'blur'},
        {type:'input',label:'电话',modelKey: 'tel',props:{placeholder: '请输入手机号码'},rules: {required: true},trigger: 'blur'},
        {type:'select',label:'性别',modelKey: 'sex',props:{options: ['男','女']},rules: {required: true}},
        {type:'select',label:'生日',modelKey: 'birthday',rules: {required: true}},
        {type:'select',label:'文化程度',modelKey: 'education',props:{options: ['博士','硕士','本科','高中','初中','其他']},rules: {required: true}},
        {type:'textarea',label:'备注',modelKey: 'remark',props:{placeholder: '填写备注'}},
      ],
    }
  },
  mounted(){
    let _self = this;
    // 插件
    document.addEventListener('plusready',this.loadData(), false);
  },
  methods:{

    /* 下拉刷新-视频 */
    videoDown(){
      // 加载数据
      this.$refs.videoScroll.forceUpdate();
    },

    /* 加载数据 */
    loadData(){
      let _self = this;
        // 定位地址
        this.$inc.geolocation(function(p){
          _self.formData.addr = p.address.country+p.address.province+p.address.city+p.address.district+p.addresses;
        });
    },

    /* 封面图 */
    selectImg(){
      let _self = this;
      this.$createActionSheet({
        title: '封面图',active: 0,
        data: [{content:'拍照'},{content:'相册'}],
        onSelect: (item, index)=>{
          if(index==0){
            _self.$inc.camera(function(file){
              _self.compress(file);
            });
          }else if(index==1){
            _self.$inc.photo(function(file){
              _self.compress(file);
            });
          }
        }
      }).show();
    },
    // 压缩图片
    compress(file){
      let _self = this;
      this.$inc.compressImage(file,{width: 448,height: 252},function(imgBase64) {
        _self.formData.img = imgBase64;
      });
    },

    /* 录制视频 */
    addVideo(){
      // if(this.audio){
      //   this.audio.stop();
      //   this.audio = null;
      // }else{
      //   this.audio = plus.audio.getRecorder();
      //   this.$inc.audio(this.audio,function(file){
      //     console.log(file);
      //   });
      // }
    },

    /* 采访时间 */
    showCtime(){
      if (!this.ctimePicker) {
        this.ctimePicker = this.$createDatePicker({
          title: '采访时间',
          min: new Date(2019,1,1),
          max: new Date(2020,1,1),
          value: new Date(),
          onSelect: this.selectCtime,
        });
      }
      this.ctimePicker.show()
    },
    selectCtime(date,val,text){
      this.formData.ctime = val[0]+'-'+val[1]+'-'+val[2];
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