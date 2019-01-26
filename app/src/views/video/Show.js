import Token from '@/components/Token'
export default {
  name:'videoShow',
  components: {Token},
  data(){
    return {
      token:this.$inc.token(),
      id:this.$route.params.id,
      // 滑动效果
      scroll:{
        show:{events: ['scroll'], y: 0, color: 0, options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}}},
      },
      // 轮播图
      slideList:[],
      // 用户信息
      type:'',
      title:'',
      img:'',
      infoList:[]
    }
  },
  mounted(){
    // 加载数据
    this.loadData();
  },
  methods:{

    /* 下拉刷新-视频 */
    showDown(){
      this.loadData();
    },

    /* 加载数据 */
    loadData(){
      let _self = this;
      // AJAX
      this.$ajax.post(
        this.$config.apiUrl+'UserVideo/show',
        'token='+this.$inc.token()+'&id='+this.id
      ).then(function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$createToast({txt:res.msg}).show();
        }else{
          _self.type = d.data.type;
          _self.title = d.data.title;
          _self.img = d.data.img;
          _self.slideList = d.data.upload;
          _self.infoList = d.data.info;
        }
        // 加载动画
        _self.$refs.showScroll.forceUpdate();
      }).catch(function(e){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
      });
    },

    /* 监听标题栏-首页 */
    scrollHandler({y}) {
      this.scroll.show.y = -y
      // 改变背景色
      if(-y>=0 && -y<=100) this.scroll.show.color = (-y/100).toFixed(2);
    },

    /* 返回 */
    back(){
      this.$router.go(-1);
    }
  },
}