import Ajax from '@/components/Ajax'
export default {
  name:'SysMenus',
  components: {Ajax},
  data(){
    return {
      formLabelWidth:'80px',
      // 动作菜单
      menuActionData:[],
      // 勾选
      selectData:[],
      // 分页
      pageData:{list:[], total:0, page:1, limit:15},
      // 搜索、添加、编辑、删除、权限
      seaData:{isShow:false,form:{code:'',uname:'',name:'',state:''}},
      addData:{isShow:false,form:{uname:'',passwd:'',name:'',tel:'',email:'',department:'',position:'',state:'1'}},
      editData:{isShow:false,form:{uname:'',passwd:'',name:'',tel:'',email:'',department:'',position:'',state:''}},
      delData:{isShow:false},
      permData:{isShow:false,uid:'',default:[''],form:[]},
      // 全部动作菜单
      aMenus:[],
    }
  },
  mounted(){
    let _self = this;
    // 全部动作菜单
    this.$refs.ajax.post('UserMain/getMenusActionAll','',function(res){
      let d = res.data;
      if(d.code!==0){
        _self.$message.error(d.msg);
      }else{
        _self.aMenus = d.aMenus;
      }
    });
    // 动作菜单
    this.$refs.ajax.post('UserMain/getMenusAction','&url=SysAdmins',function(res){
      let d = res.data;
      if(d.code!==0){
        _self.$message.error(d.msg);
      }else{
        _self.menuActionData = d.menuAction;
      }
    });
    // 加载数据
    this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      let _self = this;
      // 分页数据
      const loading = this.$loading({lock: true, text: '分页数据', background: 'rgba(0,0,0,0.2)'});
      let perm = '&page='+this.pageData.page+'&limit='+this.pageData.limit+'&key='+JSON.stringify(this.seaData.form);
      this.$refs.ajax.post('SysAdmins/list',perm,function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          _self.pageData.list = d.list;
          _self.pageData.total = d.total;
        }
        // 关闭加载
        loading.close();
      });
    },

    /* 分页 */
    page(val){
      this.pageData.page = val;
      this.loadData();
    },

    /* 获取选择数据 */
    getSelect(val) {
      this.selectData = val;
    },

    /* 动作菜单 */
    openAction(action){
      if(action=='list'){
        this.seaData.form = {code:'',uname:'',name:'',state:''};
        this.pageData.page = 1;
        this.loadData();
      }else if(action=='sea'){
        this.seaData.isShow=true;
      }else if(action=='add'){
        this.addData.isShow=true;
      }else if(action=='edit'){
        if(this.selectData.length>0){
          this.editData.isShow=true;
          // 数据
          this.editData.form.id = this.selectData[0].id;
          this.editData.form.uname = this.selectData[0].uname;
          this.editData.form.name = this.selectData[0].name;
          this.editData.form.tel = this.selectData[0].tel;
          this.editData.form.email = this.selectData[0].email;
          this.editData.form.department = this.selectData[0].department;
          this.editData.form.position = this.selectData[0].position;
          this.editData.form.state = this.selectData[0].state;
          this.editData.form.passwd = '';
        }else{
          this.$message.error('请选择数据！');
        }
      }else if(action=='del'){
        if(this.selectData.length>0){
          this.delData.isShow=true;
        }else{
          this.$message.error('请选择数据！');
        }
      }
    },

    /* 搜索 */
    subSea(){
      this.seaData.isShow=false;
      this.pageData.page = 1;
      this.loadData();
    },

    /* 添加 */
    subAdd(){
      let _self = this;
      this.addData.isShow=false;
      // 提交
      this.$refs.ajax.post('SysAdmins/add','&key='+JSON.stringify(this.addData.form),function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          _self.$message({message:d.msg,type: 'success'});
          // 刷新数据
          _self.loadData();
        }
      });
    },

    /* 编辑 */
    subEdit(){
      let _self = this;
      this.editData.isShow=false;
      // 提交
      let post = JSON.stringify(this.editData.form);
      this.$refs.ajax.post('SysAdmins/edit','&id='+this.editData.form.id+'&key='+post,function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          _self.$message({message:d.msg,type: 'success'});
        }
        // 刷新数据
        _self.loadData();
      });
    },

    /* 删除 */
    subDel(){
      let _self = this;
      this.delData.isShow=false;
      // 获取ID
      let data = this.selectData;
      let id = '';
      for(let i=0; i<data.length; i++) id += data[i].id+',';
      // 提交
      this.$refs.ajax.post('SysAdmins/del','&key='+id,function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          _self.$message({message:d.msg,type: 'success'});
          _self.loadData();
        }
      });
    },

    /* 编辑权限 */
    eidtPerm(id,perm){
      let _self = this;
      _self.permData.isShow=true;
      _self.permData.uid=id;
      // 全部菜单
      this.$refs.ajax.post('SysAdmins/allMenus','',function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          _self.permData.form = d.menus;
          // 拆分权限
          if(perm){
            let a1 = perm.split(' ');
            let a2,n,defArr=[];
            for(let x=0; x<a1.length; x++){
              a2 = a1[x].split(':');
              perm = parseInt(a2[1]);
              if(perm>0){
                // 权限表
                for(let k in _self.aMenus){
                  if(perm&parseInt(_self.aMenus[k].perm)) defArr.push(a2[0]+'-'+_self.aMenus[k].perm);
                }
              }
            }
            // 勾选默认
            _self.$refs.perm.setCheckedKeys(defArr);
          }
        }
      });
    },
    subPerm(){
      let _self = this;
      let key = this.$refs.perm.getCheckedKeys();
      // 组合-动作权限
      let arr,data={};
      for(let i=0; i<key.length; i++){
        arr = key[i].split('-');
        if(arr.length>1){
          if(data[arr[0]]) data[arr[0]] += parseInt(arr[1]);
          else data[arr[0]] = parseInt(arr[1]);
        }
      }
      // 追加父级菜单
      let char = JSON.stringify(this.permData.form);
      let res = char.match(/\d+\:\d+\:\d+/g);
      for(let k in data){
        for(let i=0; i<res.length; i++){
          arr = res[i].split(':');
          if(arr[2]==k){
            data[arr[0]] = 0;
            data[arr[1]] = 0;
          }
        }
      }
      // 组合权限
      let perm='';
      for(let k in data){
        perm += k+':'+data[k]+' ';
      }
      // 提交
      this.permData.isShow=false;
      let post = JSON.stringify({perm:perm});
      this.$refs.ajax.post('SysAdmins/edit','&id='+this.permData.uid+'&key='+post,function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          _self.$message({message:d.msg,type: 'success'});
        }
        // 刷新数据
        _self.loadData();
      });
    },
  }
}