export default {
  name:'APP',
  data(){
    return {
      // 登录
      isLogin: true,
      loginData:{uname:'',passwd:'',subText:'登录',isSub:false},
      userInfo:{uname:'',department:'',position:'',name:''},
      // 左侧菜单
      isCollapse: false,
      defaultMenu: '',
      menus:[],
    }
  },
  mounted(){
    let _self = this;
    // Token验证
    this.token();
    // 用户信息
    let uinfo = this.$storage.getItem('uinfo');
    if(!uinfo) return false;
    uinfo = JSON.parse(uinfo);
    this.userInfo = {uname:uinfo.uname, department:uinfo.department, position:uinfo.position, name:uinfo.name},
    // 默认菜单
    this.isCollapse = this.$storage.getItem('isCollapse')=='true'?true:false;
    this.defaultMenu = this.$storage.getItem('defaultMenu')?this.$storage.getItem('defaultMenu'):'0-0-0';
    // 获取菜单
    this.$ajax.post(
      this.$config.apiUrl+'UserMain/getMenus',
      'token='+this.$inc.token()
    ).then(function(res){
      let d = res.data;
      if(d.code==0){
        _self.menus = d.menus;
      }
    }).catch(function(){
      _self.$message.error('网络加载失败，请重试');
    });
  },
  methods:{

    /* 登录 */
    login(){
      let _self = this;
      let uname = this.loginData.uname;
      let passwd = this.loginData.passwd;
      let regUname = /^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{4,15}$/;
      let regTel = /^1[3|4|5|7|8]\d{9}$/;
      let regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      let regPwd = /^[a-zA-Z0-9|_|@|-|*|&]{5,16}$/;
      // 是否合法
      if(!uname || !passwd){
        return false;
      }else if(!regUname.test(uname) && !regTel.test(uname) && !regEmail.test(uname)){
        this.$message.error('请输入帐号/手机/邮箱！');
        return false;
      }else if(!regPwd.test(passwd)){
        this.$message.error('密码为5~16位字符！');
        return false;
      }
      // 提交
      this.loginData.subText = '正在登录';
      this.loginData.isSub = true;
      this.$ajax.post(
        this.$config.apiUrl+'user/login',
        'uname='+uname+'&passwd='+passwd
      ).then(function(res){
        _self.loginData.subText = '登录';
        _self.loginData.isSub = false;
        // 数据处理
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          // 保存用户信息
          _self.$storage.setItem('token',d.token);
          _self.$storage.setItem('uid',d.uinfo.uid);
          _self.$storage.setItem('uinfo',JSON.stringify(d.uinfo));
          // 跳转首页
          window.location.reload();
        }
      }).catch(function(){
        _self.$message.error('网络加载失败，请重试');
        _self.loginData.subText = '重试';
        _self.loginData.isSub = false;
      });
    },

    /* 验证Token */
    token(){
      let _self = this;
      this.$ajax.post(
        this.$config.apiUrl+'user/token',
        'token='+this.$inc.token()
        ).then(function(res){
          let d = res.data;
          if(d.code==0){
            _self.isLogin = true;
          }else{
            _self.isLogin = false;
          }
        }).catch(function(){
          _self.$message.error('网络加载失败，请重试');
        });
    },

    /* 跳转URL */
    getUrl(url,position){
      if(url=='logout'){
        this.$storage.setItem('token','');
        this.$storage.setItem('uinfo','');
        window.location.reload();
      }else{
        this.$router.push(url);
        // 保存当前位置
        this.$storage.setItem('defaultMenu',position);
      }
    },

    /* 收缩菜单 */
    collapse(){
      this.isCollapse = !this.isCollapse;
      this.$storage.setItem('isCollapse',this.isCollapse);
    }

  }
}