export default {
  data(){
    return {
      // 滑动效果
      scroll:{
        // 首页
        index:{
          scrollEvents: ['scroll'], y: 0, color: 0,
          options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}},
        },
        // 视频
        video:{
          scrollEvents: ['scroll'],
          options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}},
        },
        // 我的
        me:{
          events: ['scroll'],
          options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}},
        },
      },
      // 底部菜单
      tabs:{
        default:'首页',click:'首页',
        menus:[{label:'首页',icon:'cubeic-home'},{label:'视频',icon:'cubeic-vip'},{label:'我的',icon:'cubeic-person'}]
      },
    }
  },
  mounted(){
    // 加载数据
    this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      
    },

    /* 地图 */
    openMap(){
      this.$router.push('/maps');
    },
    
    /* 扫码 */
    openBarCode(){
      this.$router.push('/codes');
    },

    /* 订单-切换导航 */
    orderNavClick(label){
      console.log(label);
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