<template>
    <div>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                  <span class="status_type">标题
                      <span class="star">*</span>
                  </span>
                  <el-input 
                    v-model="titleName" 
                    placeholder="10个字以内"
                    maxlength="10"
                    show-word-limit>
                  </el-input>  
                 </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                 <span class="status_type">是否启用
                     <span class="star">*</span>
                 </span>
                 <el-select v-model="topStatus" placeholder="请选择">
                    <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                 </el-select>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                 <span class="status_type">一级类目
                     <span class="star">*</span>
                 </span>
                 <el-select v-model="firstCate" placeholder="请选择一级目录">
                    <el-option
                    v-for="(item,index) in firstCateList"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id">
                    </el-option>
                 </el-select>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                  <span class="status_type">排序
                      <span class="star">*</span>
                  </span>
                  <el-input 
                    v-model="sortName"
                    placeholder="请输入">
                  </el-input>  
                 </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                 <span class="status_type">最近更新时间:</span>
                 <span class="status_type" style="text-align:left;width:76%">{{updateTime|formatDate}}</span>
                </div>
                <el-divider></el-divider>
            </el-col>
       </el-row>
        <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                    <div style="text-align:right;margin-bottom:10px;">
                        <el-button type="mini" @click="addRow()">新增</el-button>
                    </div>
            </el-col>
       </el-row>
       <el-row :gutter="20" class="table-row">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                 <el-table
                    :header-cell-style="{color:'#000'}"
                    :data="tableData"
                    border
                    style="width: 100%"
                    class="table"
                    >
                    <el-table-column
                    type="index"
                    label="序号"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    label="配置词"
                    >
                    <template slot-scope="scope">
                        <el-input v-model="configurationWord" placeholder="请输入内容" v-show="isShow== scope.$index"></el-input>
                        <span v-show="!(isShow == scope.$index)">{{scope.row.title}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="跳转类型"
                    >
                    <template slot-scope="scope">
                        <el-select v-model="jumpAddress" placeholder="请选择" v-show="isShow== scope.$index">
                            <el-option
                            v-for="(item,index) in jumpOptions"
                            :key="index"
                            :label="item.typeName"
                            :value="item.id" >
                            </el-option>
                        </el-select>
                        <span v-show="!(isShow == scope.$index)">{{scope.row.typeName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="类目/地址">
                    <template slot-scope="scope">
                        <el-input v-model="categoryConent" placeholder="请输入内容" v-show="isShow== scope.$index && jumpAddress==hrefId"></el-input>
                        <el-select v-model="categoryParam" placeholder="请选择" v-show="isShow== scope.$index && jumpAddress!=hrefId">
                            <el-option
                            v-for="(item,index) in categoryOptions"
                            :key="index"
                            :label="item.categoryName"
                            :value="item.id" >
                            </el-option>
                        </el-select>
                        <span v-show="!(isShow == scope.$index)">{{scope.row.content}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="标签"
                    width="100">
                    <template slot-scope="scope">
                        <el-select v-model="tagParam" placeholder="请选择" v-show="isShow== scope.$index">
                            <el-option
                            v-for="(item,index) in tagOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-show="!(isShow == scope.$index)">{{scope.row.lable == '1'?'热标':scope.row.lable == '0'?'无':''}}</span>
                         </template>
                    </el-table-column>
                    <el-table-column
                    label="排序"
                    width="80">
                    <template slot-scope="scope">
                        <el-input v-model="sortData" placeholder="请输入内容" v-show="isShow== scope.$index"></el-input>
                        <span v-show="!(isShow == scope.$index)">{{scope.row.sort}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="操作"
                    width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handlEdit(scope.$index, scope.row)" v-show="!(isShow== scope.$index)">编辑</el-button>
                             <el-button size="mini" @click="handlSave(scope.$index, scope.row)" v-show="isShow== scope.$index">保存</el-button>
                            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20" class="btn-wrap">
            <el-col :span="3" :offset="9">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <el-button type="primary" @click="save">保存</el-button>
                 </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <el-button @click="back">取消</el-button>
                 </div>
            </el-col>
       </el-row>
    </div>
</template>
<script>
import {editTopdata,loadAllCateList,editSecondary,getSecondarytype,getTwoProduct,getTwoTopContent,getDeleteTopContent} from '@/service/getData'

export default {
    data(){
        return{
            categoryConent:'',
            sortData:'',
            configurationWord:'',
            jumpAddress:'',
            categoryParam:'',
            tagParam:'',
            isShow:-1,
            titleName: '',
            topStatus:1,
            sortName:'',
            firstCateList:[],
            firstCate:'',
            updateTime:'',
            statusList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            editShow:false,
            tableData:[],
            jumpOptions:[],
            categoryOptions:[],
            tagOptions:[
                {label:'无',value:'0'},
                {label:'热标',value:'1'}
            ],
            getTopEditData:'',
            publicParam:'',
            initfortype:'',
            hrefId:''
        }
    },
    created(){
     
  this.init();
    },
    // computed: {
    //     getTopEditData(){
    //         return this.$store.state.topEditData;
    //     }
    // },
    mounted(){
      
    },
    methods:{
            addRow () {
                  let newLine = {
                  };
                  this.tableData.push(newLine); // 移到第一行
                  this.isShow=this.tableData.length-1

            },
            // 初始化
            init(){
                let that=this
                that.getTopEditData= JSON.parse(this.$local.get("topEditData"));
                if(that.$route.query.id==1){
                    let parmas={}
                    loadAllCateList(parmas).then(res =>{
                        that.firstCateList=res.data
                        that.firstCate=that.getTopEditData.categoryOneId
                        that.titleName=that.getTopEditData.navigationTitle
                        that.topStatus=that.getTopEditData.enable
                        that.sortName=that.getTopEditData.sort
                        that.updateTime=that.getTopEditData.updateTime
                        that.initfortype=that.getTopEditData.forwardType
                    })
                    that.initSecondary()
                }else{
                    let parmas={}
                    loadAllCateList(parmas).then(res =>{
                        that.firstCateList=res.data
                    })
                }
                // 获取跳转类型
                getSecondarytype({}).then(res=>{
                    that.jumpOptions=res.data;
                    for(var index in that.jumpOptions){
                        if(that.jumpOptions[index].typeName == '全部'){
                            that.jumpOptions.splice(index,1);
                        }
                        if(that.jumpOptions[index].typeName == '跳转地址'){
                            this.hrefId = that.jumpOptions[index].id;
                        }
                    }
                })
                // 获取二级类目
                getTwoProduct({}).then(res =>{
                    that.categoryOptions=res.data
                })
            },
             // 初始化二级类目
            initSecondary(){
                    var that=this
                    let query={
                        id:that.getTopEditData.id
                    }
                    editSecondary(query).then(res =>{
                        that.tableData=res.data
                    })
            },
            // 二级类目编辑
            handlEdit(index,row){
                if(!!!row.categoryTwoId){
                    this.categoryConent=row.content
                }else{
                    this.categoryParam=row.categoryTwoId
                }
                    this.isShow=index
                    this.jumpAddress=row.forwardType
                    this.tagParam=row.lable
                    this.configurationWord=row.title
                    this.sortData=row.sort
            },
            // 二级类目保存
            handlSave(index,row){
                let rowId
                if(this.jumpAddress==this.hrefId){
                    this.publicParam=this.categoryConent
                }else{
                     this.publicParam=this.categoryParam
                }

                  if(row.id == undefined){
                      rowId=''
                  }else{
                      rowId=row.id
                  }
                let params={
                    parentId:this.getTopEditData.id,
                    id:rowId,
                    title:this.configurationWord,
                    forwardType:this.jumpAddress,
                    content:this.publicParam,
                    lable:this.tagParam,
                    sort:this.sortData,
                    typeId:this.jumpAddress
                }
                // 保存编辑的数据
                getTwoTopContent(params).then(res =>{
                    if(res.code == 200){
                        if(this.isShow != -1){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.success('添加成功')
                        }
                        //   刷新初始化的二级类目接口
                        this.initSecondary()
                    }else{
                        this.$message.warning(res.msg)
                    }
                })
                this.isShow=-1
            },
            // 二级类目删除
            handleDelete(index,row){
                this.$confirm('此操作将永久删除该配置词, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getDeleteTopContent({id: row.id}).then(res=>{
                        if(res.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.initSecondary();
                        }
                        else{
                            this.$message.warning(res.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 一级类目保存
            save(){
                let prductId
                if(this.$route.query.id==1){
                     prductId=this.getTopEditData.id
                }else{
                    prductId=''
                }
                let parmas={
                         navigationTitle:this.titleName,
                         enable :this.topStatus,
                         categoryOneId:this.firstCate,
                         sort:this.sortName,
                         id:prductId
                }
                editTopdata(parmas).then(res =>{
                    if(res.code == 200){
                        if(!!prductId){
                            this.$message.success('添加成功')
                        }else{
                            this.$message.success('修改成功')
                        }
                        this.$router.push({
                            path:'/home',
                        })
                    }else{
                        this.$message.warning(res.msg)
                    }
                })
            },
            back(){
                 this.$router.go(-1);
            }

    }
}
</script>
<style lang="less">
.table .cell .el-button:nth-child(3){
    margin-left: 10px;
}
.table .el-button+.el-button{
    margin-left: 0px;
}
</style>

<style lang="less" scoped>
table .el-input,table .el-select{
    width: 100%;
}
    .status_type{
        display: inline-block; 
        width: 15%; 
    }
    .el-input,.el-select{
        width: 50%;
    }
    .el-row{
        margin-top: 20px;
    }
    .table-row{
        margin-top: 0px;
    }
    .btn-wrap{
        margin-top: 30px;
        .el-button{
            width: 120px;
        }
    }
    .el-tag + .el-tag + .el-tag  {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 60%;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .grid-content{
        align-items: center;
    }
    .star{
        vertical-align: middle;
        color:red;
    }
    .button-new-tag{
        margin-left: 0;
        width: 65px;
    }
    .el-divider--horizontal{
        height: 2px;
        background-color:#4c4c4c;
    }
</style>

