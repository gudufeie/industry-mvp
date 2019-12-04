<template>
    <div class="distribute-detail">
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                  <span class="status_type">标题
                      <span class="star">*</span>
                  </span>
                  <el-input 
                    v-model="dispenseInfo.navigationTitle" 
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
                  <span class="status_type" style="line-height: 55px;">描述
                      <span class="star">*</span>
                  </span>
                  <el-input 
                    type="textarea"
                    :rows="2"
                    v-model="dispenseInfo.description" 
                    placeholder="30个字以内"
                    maxlength="30"
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
                 <el-select v-model="dispenseInfo.enable" placeholder="请选择">
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
                 <el-select v-model="dispenseInfo.categoryOneId" placeholder="请选择一级目录">
                    <el-option
                    v-for="(item,index) in categoryOneList"
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
                    v-model="dispenseInfo.sort"
                    placeholder="请输入">
                  </el-input>  
                 </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                 <span class="status_type">最近更新时间</span>
                 <span class="status_type" style="text-align:left;width:76%">{{dispenseInfo.updateTime | formatDate}}</span>
                </div>
                <el-divider></el-divider>
            </el-col>
       </el-row>
       <el-row :gutter="20" class="table-row">
            <el-col :span="20" :offset="2">
                <div class="add-wrap">
                    <el-button size="mini" @click="addKeyword">新增</el-button>
                </div>
                <div class="grid-content bg-purple">
                 <el-table
                    :header-cell-style="{color:'#000'}"
                    :data="dispenseTwoData"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="title"
                    label="配置词"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="categoryName"
                    label="二级类目"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="标签">
                        <template slot-scope="{row}">
                            <span>{{row.label == 1?'热标':row.label == 2?'新标':'无'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="sort"
                    label="排序"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="keyWordName"
                    label="关键词">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="keywordEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" @click="keywordDelete(scope.$index, scope.row)">删除</el-button>
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

       <!-- 关键词明细 -->
        <el-dialog
            title="关键词明细"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="name">
                <span class="key-title">标题<span class="star">*</span></span>
                <el-input 
                    v-model="title" 
                    placeholder="10个字以内"
                    maxlength="10"
                    show-word-limit>
                </el-input> 
            </div>
            <div class="name">
                <span class="key-title">二级类目<span class="star">*</span></span>
                <el-select v-model="categoryTwoId" placeholder="请选择二级类目">
                    <el-option
                    v-for="(item,index) in categoryTwoList"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="name">
                <span class="key-title">是否展示标签<span class="star">*</span></span>
                <el-select v-model="enable" placeholder="请选择">
                    <el-option
                    v-for="item in tagsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="name">
                <span class="key-title">排序<span class="star">*</span></span>
                <el-input 
                    v-model="sort" 
                    placeholder="10个字以内"
                    maxlength="10"
                    show-word-limit>
                </el-input> 
            </div>
            <el-divider></el-divider>
            <div class="add-wrap">
                <el-button size="mini" @click="addKeywordDetail">新增</el-button>
            </div>
            <el-table
                :header-cell-style="{color:'#000'}"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="60">
                </el-table-column>
                <el-table-column
                label="配置词"
                width="120">
                    <template slot-scope="{$index,row}">
                        <el-input class="congigKeyword" v-if="!!showEdit[$index]" v-model="row.title"></el-input>
                        <span v-if="!!!showEdit[$index]">{{row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="跳转类型"
                width="110">
                    <template slot-scope="{$index,row}">
                        <el-select v-if="!!showEdit[$index]" class="congigKeyword" v-model="row.forwardType" placeholder="请选择">
                            <el-option
                                v-for="item in forwardTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-if="!!!showEdit[$index]">{{row.forwardType == '1'?'关键词':'地址'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="关键词/地址">
                    <template slot-scope="{$index,row}">
                        <el-select v-if="!!showEdit[$index] && row.forwardType == '1'" class="congigKeyword" v-model="row.content" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in cateTwoKeywords"
                                :key="index"
                                :label="item.keyWordName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input class="congigKeyword" v-if="!!showEdit[$index] && row.forwardType == '2'" v-model="row.content"></el-input>
                        <span v-if="!!!showEdit[$index] && row.forwardType == '1'">{{row.content | getCateName(cateTwoKeywords)}}</span>
                        <span v-if="!!!showEdit[$index] && row.forwardType == '2'">{{row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="标签"
                width="100">
                    <template slot-scope="{$index,row}">
                        <el-select v-if="!!showEdit[$index]" class="congigKeyword" v-model="row.lable" placeholder="请选择">
                            <el-option
                                v-for="item in labelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-if="!!!showEdit[$index]">{{row.lable == '1'?'热标':'新标'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="排序"
                width="100">
                    <template slot-scope="{$index,row}">
                        <el-input class="congigKeyword" v-if="!!showEdit[$index]" v-model="row.sort"></el-input>
                        <span v-if="!!!showEdit[$index]">{{row.sort}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                width="210">
                    <template slot-scope="{$index,row}">
                        <el-button size="mini" @click="handleEdit($index,row)" v-if="!!!showBtn[$index]">编辑</el-button>
                        <el-button size="mini" @click="handleSubmit($index,row)" v-if="!!showBtn[$index]">保存</el-button>
                        <el-button size="mini" @click="handleCancel($index, row)" v-if="!!showBtn[$index]">取消</el-button>
                        <el-button size="mini" @click="handleDelete($index, row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveKeywordDetail">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { loadAllCateList, addDispense, loadDispenseTwo, addEditKeywordDetail,
        configKeyDelete, getCateTwoKeyword, getAllKey, addOrUpdateConfigKey,
        deleteConfigKey } from "../service/getData";
export default {
    data(){
        return{
            dispenseInfo:{
                categoryOneId: "",
                description: "",
                enable: 1,
                id: '',
                navigationTitle: "",
                sort: 0,
                updateTime: ""
            },
            dialogVisible:false,
            inputVisible: false,
            inputValue: '',
            categoryOneList:[],
            statusList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            tableData: [],
            dispenseTwoData:[],
            enable:1,
            tagsList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            categoryTwoId:'',
            categoryTwoList:[],
            sort:'',
            title:'',
            dispenseId:'',
            keywordId:'',
            showEdit: [],      //显示输入框
            showBtn: [],      //显示保存按钮
            forwardTypeOptions:[
                {label:'关键词',value:'1'},
                {label:'地址',value:'2'}
            ],
            mode:false,
            labelOptions:[
                {label:'无',value:'0'},
                {label:'热标',value:'1'}
            ],
            cateTwoKeywords:[],
            cateTwoKeyword:''
        }
    },
    computed: {
        dispenseDetail(){
            return this.$store.state.dispenseDetail;
        }
    },
    mounted(){
        if(this.dispenseDetail.id){
            this.dispenseId = this.dispenseDetail.id;
            this.dispenseInfo.navigationTitle = this.dispenseDetail.navigationTitle;
            this.dispenseInfo.id = this.dispenseDetail.id;
            this.dispenseInfo.description = this.dispenseDetail.description;
            this.dispenseInfo.categoryOneId = this.dispenseDetail.categoryOneId;
            this.dispenseInfo.enable = this.dispenseDetail.enable;
            this.dispenseInfo.sort = this.dispenseDetail.sort;
            this.dispenseInfo.updateTime = this.dispenseDetail.updateTime;
            this.getDispenseTwo(this.dispenseDetail.id);
            this.$store.commit('saveDispenseDetail',"")
        }else{
            this.dispenseInfo.id = '';
        }
        this.getAllCates();

        for(var i = 0; i < this.tableData.length; i ++) {
            this.showEdit[i] = false;
            this.showBtn[i] = false;
        }
    },
    methods:{
        // 初始化获取所有类目
        getAllCates(){
            loadAllCateList({}).then(res=>{
                if(res.data){
                    this.categoryOneList = res.data;
                }
            })
        },

        // 查询二级内容
        getDispenseTwo(id){
            loadDispenseTwo({id:id}).then(res=>{
                this.dispenseTwoData = res.data;
            })
        },

        // 关闭对话框
        handleClose() {
            this.dialogVisible = false;
        },

        back(){
            this.$router.go(-1);//返回上一层
        },

        // 添加关联关键词
        addRelation(){
            if(!!!this.relationName.trim()){
                this.$message({
                    message:'请输入关联关键词！!',
                    type: "warning",
                    center:true
                })
                return false;
            }
            let params ={
                id:'',
                keyWordRelationname:this.relationName
            }
            addKeywordRelation(params).then(res=>{
                if(res.code == 200){
                    let data = {};
                    this.relateKeywordList.unshift(this.relationName);
                    data = {
                        id: res.msg,
                        keyWordRelationname: this.relationName
                    }
                    this.keyWordRelationname.unshift(data)
                    this.relationName = '';
                    this.$message({
                        message:'添加成功!',
                        type: "success",
                        center:true
                    })
                }else{
                    this.$message({
                        message:'请输入关联关键词！!',
                        type: "warning",
                        center:true
                    })
                    return false;
                }
            })
        },

        // 添加分发楼层
        save(){
            if(!!!this.dispenseInfo.navigationTitle){
                this.$message.warning('请输入标题');
                return false;
            }
            if(!!!this.dispenseInfo.categoryOneId){
                this.$message.warning('请选择一级类目');
                return false;
            }
            if(!!!this.dispenseInfo.sort){
                this.$message.warning('请输入排序');
                return false;
            }
            let params = {
                id: this.dispenseInfo.id,
                navigationTitle:this.dispenseInfo.navigationTitle,
                description:this.dispenseInfo.description,
                categoryOneId:this.dispenseInfo.categoryOneId,
                enable:this.dispenseInfo.enable,
                sort:this.dispenseInfo.sort
            }
            addDispense(params).then(res=>{
                if(res.code == 200){
                    this.$message.success('添加成功');
                    this.$router.push('/home')
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },

        // 添加配置词
        addKeywordDetail(){
            this.mode = true;
            this.tableData.push({
                addressId:this.keywordId,
                content: '',
                forwardType: "1",
                id: "",
                lable: "1",
                sort: 0,
                title: "",
            })
            this.showEdit[this.tableData.length-1] = true;
            this.showBtn[this.tableData.length-1] = true;
            this.$set(this.showEdit,this.tableData.length-1,true)
            this.$set(this.showBtn,this.tableData.length-1,true)
        },

        // 调出关键词明细弹出框
        addKeyword(){
            this.dialogVisible = true;
            this.title = '';
            this.categoryTwoId = '';
            this.enable = '';
            this.sort = '';
            for(var item of this.categoryOneList){
                if(item.id == this.dispenseInfo.categoryOneId){
                    this.categoryTwoList = item.childrenList;
                }
            }          
        },

        // 新增关键词明细
        saveKeywordDetail(){
          if(!!!this.dispenseInfo.id){
              this.$message.warning('请先添加热搜词');
              return false;
          }else{
            if(!!!this.title){
                this.$message.warning('请输入标题');
                return false;
            }
            if(!!!this.categoryTwoId){
                this.$message.warning('请选择二级类目');
                return false;
            }
            if(!!!this.sort){
                this.$message.warning('请输入排序');
                return false;
            }
              let params ={
                  parentId: this.dispenseInfo.id,
                  sort: this.sort,
                  categoryTwoId: this.categoryTwoId,
                  content:this.categoryTwoId,
                  title:this.title,
                  label: this.enable
              }

            addEditKeywordDetail(params).then(res=>{
                if(res.code == 200){
                    this.$message.success('添加成功');
                    this.dialogVisible = false;
                    this.getDispenseTwo(this.dispenseId);
                }else{
                    this.$message.warning(res.msg)
                }
            })
          }    
        },

        // 关键词编辑
        keywordEdit(index,row){
            for(var item of this.categoryOneList){
                if(item.id == this.dispenseInfo.categoryOneId){
                    this.categoryTwoList = item.childrenList;
                }
            }
            this.dialogVisible = true;
            this.keywordId = row.id;
            this.title = row.title;
            this.categoryTwoId = row.content;
            this.sort = row.sort;
            this.tagId = row.label;
            getCateTwoKeyword({id:this.categoryTwoId}).then(res=>{
                this.cateTwoKeywords = res.data;
            })
            this.loadAllKey(row.id);
        },

        // 关键词删除
        keywordDelete(index,row){
            this.$confirm('此操作将永久删除该关键词, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                configKeyDelete({id: row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getDispenseTwo(this.dispenseId);
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

        // 获取所有配置词
        loadAllKey(id){
            getAllKey({id:id}).then(res=>{
                this.tableData = res.data;
            })
        },

        // 配置词进入编辑状态
        handleEdit(index,row){
            if(!!!this.categoryTwoId){
                this.$message.warning('请先添加关键词明细');
                return false;
            }
            this.showEdit[index] = true;
            this.showBtn[index] = true;
            this.$set(this.showEdit,index,true)
            this.$set(this.showBtn,index,true)
        },

        // 配置词保存修改或新增
        handleSubmit(index,row){
            let item = {};
            item= {
                addressId: row.addressId,
                content: row.content,
                forwardType: row.forwardType,
                id: row.id,
                lable: row.label,
                sort: row.sort,
                title: row.title,
            }
            this.showEdit[index] = false;
            this.showBtn[index] = false;
            this.$set(this.showEdit,index,false)
            this.$set(this.showBtn,index,false)
            addOrUpdateConfigKey(item).then(res=>{
                if(res.code == 200){
                    this.$message.success('添加成功');
                    this.loadAllKey(this.keywordId);
                }else{
                    this.$message.warning(res.msg);
                    this.loadAllKey(row.id);
                }
            })
        },

        // 配置词取消编辑
        handleCancel(index,row){
            if(!!this.mode){
                this.tableData.splice(index,1);
                this.mode = false;
            }else{
                this.showEdit[index] = false;
                this.showBtn[index] = false;
                this.$set(this.showEdit,index,false)
                this.$set(this.showBtn,index,false)
            }
        },

        // 配置词删除
        handleDelete(index,row){
            this.$confirm('此操作将永久删除该配置词, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteConfigKey({id: row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.loadAllKey(this.keywordId);
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
        }
    }
}
</script>
<style lang="less">
    .distribute-detail .el-dialog{
        width:70% !important;
    }
</style>
<style lang="less" scoped>
    .status_type{
        display: inline-block; 
        width: 15%; 
    }
    .el-input,.el-select,.el-textarea{
        width: 50%;
    }
    .congigKeyword{
        width: 100%;
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
    .el-tag + .el-tag {
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
    .add-wrap{
        text-align: right;
        margin-bottom: 10px;
    }

    .el-dialog__wrapper{
        text-align: center;
    }
    .el-dialog__wrapper /deep/  .el-dialog__footer{
        text-align: center !important;
    }
    .el-link{
        color:#0b7a75;
        line-height: 40px;
        position: absolute;
    }
    .el-dialog__wrapper /deep/ .el-dialog__header{
        border-bottom: 1px solid #cccccc !important;
    }
    .name{
        line-height: 60px;
        span{
            margin-right: 10px;
        }
    }
    .key-title{
        display: inline-block;
        width:15%;
        text-align: right;
    }

</style>

