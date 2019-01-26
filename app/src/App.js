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
        elem.style.transform = 'translate(-100%, 0)';
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
        menus:[{label:'首页',icon:'cubeic-home'},{label:'采访',icon:'cubeic-vip'},{label:'我的',icon:'cubeic-person'}]
      },
      /* 首页 */
      // 轮播图
      slideList:[
        {url:'',image:'http://ykimg.alicdn.com/develop/image/2019-01-06/ebc586d55c677afcad8ebd92bcf2ed26.jpg'},
        {url:'',image:'http://ykimg.alicdn.com/develop/image/2019-01-07/2a460ca9000e7fb395a212f6344dad2e.jpg'},
      ],
      // 菜单
      menus:[
        {name:'视频',url:'/video/video',ico:require('./assets/index/video.svg')},
        {name:'录音',url:'/video/audio',ico:require('./assets/index/audio.svg')},
        {name:'拍照',url:'/video/photo',ico:require('./assets/index/photo.svg')},
      ],
      video:[],
      audio:[],
      photo:[],
      /* 视频 */
      videoSea:{key:''},
      videoData:[],
      // 我的
      uinfo:{
        uname:'',
        name:'姓名',
        nickname:'用户昵称',
        img:require('./assets/index/store_img.png')
      },
      meInfo:{
        tel:'0871-67777777',
        cache: {size: 0, info: '0 KB'},
        version:'版本 '+this.$config.version,
      },
    }
  },
  mounted(){
    // 验证Token
    this.$refs.token.token();
    // 加载数据
    this.loadDataIndex();
    this.loadDataVideo();
    this.loadDataMe();
  },
  methods:{

    /* 下拉刷新-首页 */
    indexDown(){
      this.loadDataIndex();
    },
    /* 下拉刷新-视频 */
    videoDown(){
      this.loadDataVideo();
    },
    /* 下拉刷新-我的 */
    meDown(){
      this.loadDataMe();
    },

    /* 加载数据-首页 */
    loadDataIndex(){
      let _self = this;
      // 视频
      this.$ajax.post(
        this.$config.apiUrl+'UserVideo/index',
        'token='+this.$inc.token()+'&type=0&limit=4'
      ).then(function(res){
        let d = res.data;
        if(d.code!==0) _self.$createToast({txt:res.msg}).show();
        else _self.video = d.data;
      }).catch(function(e){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
      });
      // 音频
      this.$ajax.post(
        this.$config.apiUrl+'UserVideo/index',
        'token='+this.$inc.token()+'&type=1&limit=4'
      ).then(function(res){
        let d = res.data;
        if(d.code!==0) _self.$createToast({txt:res.msg}).show();
        else _self.audio = d.data;
      }).catch(function(e){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
      });
      // 照片
      this.$ajax.post(
        this.$config.apiUrl+'UserVideo/index',
        'token='+this.$inc.token()+'&type=2&limit=4'
      ).then(function(res){
        let d = res.data;
        if(d.code!==0) _self.$createToast({txt:res.msg}).show();
        else _self.photo = d.data;
      }).catch(function(e){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
      });
      // 加载动画
      _self.$refs.indexScroll.forceUpdate();
    },

    /* 搜索 */
    search(){
      this.loadDataVideo();
    },
    /* 加载数据-采访 */
    loadDataVideo(){
      let _self = this;
      let uid = this.$storage.getItem('uid');
      let page = 1;
      let limit = 30;
      // AJAX
      this.$ajax.post(
        this.$config.apiUrl+'UserVideo/list',
        'token='+this.$inc.token()+'&uid='+uid+'&page='+page+'&limit='+limit+'&key='+this.videoSea.key
      ).then(function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$createToast({txt:res.msg}).show();
        }else{
          _self.videoData = d.data;
        }
        // 加载动画
        _self.$refs.videoScroll.forceUpdate();
      }).catch(function(e){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
      });
    },

    /* 加载数据-我的 */
    loadDataMe(){
      let _self = this;
      // 用户信息
      this.$ajax.post(
        this.$config.apiUrl+'usermain/getUinfo',
        'token='+this.$inc.token()
      ).then(function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$createToast({txt:res.msg}).show();
        }else{
          _self.uinfo = d.data;
          _self.uinfo.uname = _self.$storage.getItem('uname');
        }
        // 加载动画
        _self.$refs.meScroll.forceUpdate();
      }).catch(function(e){
        _self.$createToast({txt:'网络加载失败，请重试'}).show();
      });
      // 系统缓存
      document.addEventListener('plusready', this.getDrcSize(), false);
    },

    /* 地图 */
    openMap(){
      this.$router.push('/maps');
    },
    
    /* 扫码 */
    openBarCode(){
      this.$router.push('/codes');
    },

    /* 视频-选择 */
    selectVideo(){
      this.$createActionSheet({
        title: '采访方式',active: 0,
        data: [{content:'视频'},{content:'录音'},{content:'拍照'}],
        onSelect: (item, index)=>{
          if(index==0){
            this.$router.push('/video/video');
          }else if(index==1){
            this.$router.push('/video/audio');
          }else if(index==2){
            this.$router.push('/video/photo');
          }
        }
      }).show();
    },
    /* 视频-详情 */
    videoShow(id){
      this.$router.push('/video/show/'+id);
    },
    /* 视频-动作 */
    orderAction(btn, index) {
      let _self = this;
      if(btn.action === 'tel'){
        window.location.href = 'tel:'+btn.val;
      }else if(btn.action === 'send') {
        this.$createActionSheet({title: '确认要删除吗',active: 0,
          data: [{content: '删除'}],
          onSelect: () => {
            // 提交删除
            this.$ajax.post(
              this.$config.apiUrl+'UserVideo/del',
              'token='+this.$inc.token()+'&id='+btn.val
            ).then(function(res){
              let d = res.data;
              if(d.code!==0) _self.$createToast({txt:res.msg}).show();
              else _self.videoData.splice(index,1);
            }).catch(function(e){
              _self.$createToast({txt:'网络加载失败，请重试'}).show();
            });
          }
        }).show()
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

    /* 切换菜单 */
    nav(label){
      this.tabs.click=label;
      // 加载数据
      // this.loadData();
    },
    
    /* 监听标题栏-首页 */
    scrollHandler({y}) {
      this.scroll.index.y = -y
      // 改变背景色
      if(-y>=0 && -y<=100) this.scroll.index.color = (-y/100).toFixed(2);
    },

    /* 缓存-清除 */
		clearCache: function() {
      this.$inc.cacheClear();
      this.$createToast({txt:'清除成功'}).show();
      this.meInfo.cache.info = '0 KB';
    },
    /* 缓存-大小 */
		getDrcSize: function() {
      this.meInfo.cache.size = 0;
			this.getSize('_doc/');
		},
		getSize: function(d) {
      var _self = this;
      try{
        plus.io.resolveLocalFileSystemURL(d, function(fs) {
          var drc = fs.createReader();
          drc.readEntries(function(entries) {
            for(var i = 0; i < entries.length; i++) {
              if(entries[i].isDirectory) {
                _self.getSize(entries[i].fullPath)
              } else {
                entries[i].file(function(e) {
                  _self.meInfo.cache.size += e.size;
                  _self.toSize(_self.meInfo.cache.size);
                })
              }
            }
          }, function(e) {
            _self.$createToast({txt:e.message}).show();
          });
        });
      }catch(e){
        console.log('缓存文件');
      }
		},
		toSize: function(f) {
			let _self = this;
			let kb = (f / 1024).toFixed(2);
			if(kb < 1024) {
				kb = kb + ' KB';
			} else if(kb >= 1024 && kb < 1048576) {
				kb = (kb / 1024).toFixed(2) + ' M';
			} else if(kb >= 1048576 && kb < 1073741824) {
				kb = (kb / 1024 / 1024).toFixed(2) + ' G';
			}
			_self.meInfo.cache.info = kb;
		},

    /* 退出登陆 */
    logout(){
      this.$refs.token.logout();
    },

  }
}