import Token from '@/components/Token'
export default {
  name:'maps',
  components: {Token},
  data(){
    return {
      token:this.$inc.token(),
      mapInfo:{city:'城市',area:'区域',addr:'地址',longitude:0,latitude:0},
      maps:null,
      marker:null,
      // 滑动效果
      scrollEvents: ['scroll'],
      // 刷新参数
      options:{pullDownRefresh: {threshold: 60,stop: 40,txt: '已更新'}},
    }
  },
  mounted(){
    // 翠湖公园
    // this.getMaps(102.702315,25.05094);
    // 定位插件
    document.addEventListener('plusready', this.geolocation(), false);
  },
  methods:{
    /* 定位 */
    geolocation(){
      let _self = this;
      try{
        // 定位更新
        plus.geolocation.watchPosition(function(p){
          // console.log(JSON.stringify(p));
          // 数据
          _self.mapInfo = {
            city:p.address.city,
            area:p.address.country+p.address.province+p.address.city+p.address.district,
            addr:p.addresses,
            longitude:p.coords.longitude,
            latitude:p.coords.latitude,
          }
          // 标记地图
          _self.getMaps(p.coords.longitude,p.coords.latitude);
        },function(e){
          console.log('定位失败:'+e.message);
        });
      }catch(e){
        console.log('Plus只能运行手机设备');
      }
    },
    // 获取地图
    getMaps(longitude,latitude){
      let _self = this;
      // 坐标转换
      let key = this.$config.map_key;
      let type = 'gps';
      let locations = longitude+','+latitude;
      this.$ajax.get('https://restapi.amap.com/v3/assistant/coordinate/convert?key='+key+'&locations='+locations+'&coordsys='+type).then(function(res){
        if(res.data.info == 'ok'){
          // 处理坐标
          var position = res.data.locations.split(',');
          // 地图
          if(!_self.maps) _self.maps = new AMap.Map("container", {resizeEnable: true, center: position, zoom: 16});
          // 标记位置
          if(!_self.marker){
            _self.marker = new AMap.Marker({
              position:position,
              icon: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
            });
            _self.maps.add(_self.marker);
          }else{
            _self.marker.setPosition(position);
          }
        }
      });
    },

    /* 下拉刷新 */
    onPullingDown(){
      // 加载数据
      this.loadData();
      this.$refs.scroll.forceUpdate();
    },
    /* 返回 */
    back(){
      this.$router.go(-1);
    }
  },
}