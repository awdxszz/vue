import Ajax from '@/components/Ajax'
export default {
  name:'WebVideo',
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
      // 搜索、删除
      seaData:{isShow:false,form:{type:'',title:'',name:'',tel:''}},
      delData:{isShow:false},
    }
  },
  mounted(){
    let _self = this;
    // 动作菜单
    this.$refs.ajax.post('UserMain/getMenusAction','&url=WebVideo',function(res){
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
      this.$refs.ajax.post('WebVideo/list',perm,function(res){
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
        this.seaData.form = {type:'',title:'',name:'',tel:''};
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
          this.editData.form.name = this.selectData[0].name;
          this.editData.form.action = this.selectData[0].action;
          this.editData.form.perm = this.selectData[0].perm;
          this.editData.form.ico = this.selectData[0].ico;
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

    /* 删除 */
    subDel(){
      let _self = this;
      this.delData.isShow=false;
      // 获取ID
      let data = this.selectData;
      let id = '';
      for(let i=0; i<data.length; i++) id += data[i].id+',';
      // 提交
      this.$refs.ajax.post('WebVideo/del','&key='+id,function(res){
        let d = res.data;
        if(d.code!==0){
          _self.$message.error(d.msg);
        }else{
          _self.$message({message:d.msg,type: 'success'});
          _self.loadData();
        }
      });
    },

  }
}