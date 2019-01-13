import Token from '@/components/Token'
export default {
  components: {Token},
  created() {
    this.activeIndex = -1
  },
  watch:{
    $route(to){
      // 切换效果
      let elem = document.getElementById('Index');
      if(to.path=='/'){
        elem.style.transition = 'transform .3s';
        elem.style.transform = 'translate(0%, 0)';
      }else{
        elem.style.transition = 'transform .3s';
        elem.style.transform = 'translate(-90%, 0)';
      }
    }
  },
  data(){
    return {
      // 滑动效果：首页、视频、我的
      scroll:{
        index:{events: ['scroll'], y: 0, color: 0, options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}}},
        video:{events: ['scroll'],options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}}},
        me:{events: ['scroll'],options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}}},
      },
      // 底部菜单
      tabs:{
        default:'首页',click:'首页',
        menus:[{label:'首页',icon:'cubeic-home'},{label:'视频',icon:'cubeic-vip'},{label:'我的',icon:'cubeic-person'}]
      },
      /* 首页 */
      // 轮播图
      slideList:[
        {url:'',image:'//ykimg.alicdn.com/develop/image/2019-01-06/ebc586d55c677afcad8ebd92bcf2ed26.jpg'},
        {url:'',image:'//ykimg.alicdn.com/develop/image/2019-01-07/2a460ca9000e7fb395a212f6344dad2e.jpg'},
      ],
      video:[
        {title:'回到明朝当王爷之杨凌传',url:'',image:'//r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F'},
        {title:'我的保姆手册',url:'',image:'//r1.ykimg.com/050C00005BFE639FADA80C365B057C86'},
        {title:'原来你还在这里',url:'',image:'//r1.ykimg.com/050C00005BFE62A9AD9AB7376B0BFC33'},
        {title:'时空侠',url:'',image:'//r1.ykimg.com/050C00005BFE5FC8AD9AB738F6060151'},
      ],
      photo:[
        {title:'古剑奇谭2',url:'',image:'//r1.ykimg.com/050C00005B448196ADBDD3DE51098FB0'},
        {title:'一千零一夜TV版',url:'',image:'//r1.ykimg.com/050C00005A0BD1A3AD881A048E019C17'},
        {title:'局部 第二季',url:'',image:'//r1.ykimg.com/050C00005AB48CE3ADBC09AE2B05CEDE'},
        {title:'环太平洋：雷霆再起',url:'',image:'//r1.ykimg.com/050C00005AB0949FAD881A05B80529DD'},
      ],
      // 菜单
      menus:[
        {name:'视频',url:'/test',ico:require('./assets/index/store_img.png')},
        {name:'录音',url:'/test',ico:require('./assets/index/store_img.png')},
        {name:'拍照',url:'/test',ico:require('./assets/index/store_img.png')},
      ],
      /* 视频 */
      videoData:[
        {
          item:{id:'201810161723560001',title:'回到明朝当王爷之杨凌传',name:'姓名',tel:'15087738003',key:'蒙面唱将猜猜猜 第三季',image:'//r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F'},
          btns:[{action:'tel',text:'编辑',color:'#A2A4A6',val:'201810161723560001'},{action:'send',text:'删除',color:'#FF0000',val:'201810161723560001'}]
        },
        {
          item:{id:'201810161723560002',title:'我的保姆手册',name:'姓名',tel:'15087738003',key:'挑战吧!太空',image:'//r1.ykimg.com/050C00005BFE639FADA80C365B057C86'},
          btns:[{action:'tel',text:'编辑',color:'#A2A4A6',val:'201810161723560002'},{action:'send',text:'删除',color:'#FF0000',val:'201810161723560002'}]
        },
      ],
      // 我的
      uinfo:{
        uname:'',
        name:'姓名',
        nickname:'用户昵称',
        img:require('./assets/index/store_img.png')
      },
      meInfo:{
        tel:'0871-67777777',
        version:'版本 '+this.$config.version,
      },
    }
  },
  mounted(){
    // 验证Token
    this.$refs.token.token();
    // 加载数据
    this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      // 用户信息
      let uinfo = this.$storage.getItem('uinfo');
      if(!uinfo) return;
      this.uinfo = JSON.parse(uinfo);
      this.uinfo.uname = this.$storage.getItem('uname');
    },

    /* 地图 */
    openMap(){
      this.$router.push('/maps');
    },
    
    /* 扫码 */
    openBarCode(){
      this.$router.push('/codes');
    },

    /* 订单-详情 */
    openOrderShow(id){
      this.$router.push('/ordershow/'+id);
    },
    /* 订单-动作 */
    orderAction(btn, index) {
      if(btn.action === 'tel'){
        window.location.href = 'tel:'+btn.val;
      }else if(btn.action === 'send') {
        alert(btn.val);
        // this.$createActionSheet({title: '确认要删除吗',active: 0,
        //   data: [{content: '删除'}],
        //   onSelect: () => {
        //     this.orderData.splice(index, 1);
        //   }
        // }).show()
      } else {
        // 收缩
        this.$refs.swipeItem[index].shrink()
      }
    },
    // 自动收缩
    orderOnItem(index) {
      if (index === this.activeIndex) return false;
      if (this.activeIndex !== -1) this.$refs.swipeItem[this.activeIndex].shrink();
      this.activeIndex = index
    },
    
    /* 下拉刷新-首页 */
    indexDown(){
      console.log('AJAX');
      this.$refs.indexScroll.forceUpdate();
    },
    /* 下拉刷新-视频 */
    videoDown(){
      // 加载数据
      this.$refs.videoScroll.forceUpdate();
    },
    /* 下拉刷新-我的 */
    meDown(){
      // 加载数据
      this.$refs.meScroll.forceUpdate();
    },

    /* 切换菜单 */
    nav(label){
      this.tabs.click=label;
      // 加载数据
      this.loadData();
    },
    
    /* 监听标题栏-首页 */
    scrollHandler({y}) {
      this.scroll.index.y = -y
      // 改变背景色
      if(-y>=0 && -y<=100) this.scroll.index.color = (-y/100).toFixed(2);
    },

    /* 退出登陆 */
    logout(){
      this.$refs.token.logout();
    },

  }
}