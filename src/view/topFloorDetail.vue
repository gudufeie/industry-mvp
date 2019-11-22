<template>
    <div>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                  <span class="status_type">标题
                      <span class="star">*</span>
                  </span>
                  <el-input 
                    v-model="name" 
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
                 <el-select v-model="status" placeholder="请选择">
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
                    v-for="item in firstCateList"
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
                  <span class="status_type">排序
                      <span class="star">*</span>
                  </span>
                  <el-input 
                    v-model="name"
                    placeholder="请输入">
                  </el-input>  
                 </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
                 <span class="status_type">最近更新时间:</span>
                 <span class="status_type" style="text-align:left;width:76%">{{updateTime}}</span>
                </div>
                <el-divider></el-divider>
            </el-col>
       </el-row>
       <el-row :gutter="20" class="table-row">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple">
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
                    prop="name"
                    label="配置词"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="跳转类型"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="类目/地址">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="标签"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="排序"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="操作"
                    width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">下线</el-button>
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
import { addKeywork, addKeywordRelation, loadKeywordDetail, updateKeyword } from '../service/getData';

export default {
    data(){
        return{
            name: '',
            status:1,
            relateKeywordList:[],
            inputVisible: false,
            inputValue: '',
            firstCateList:[],
            secondCateList:[],
            firstCate:'',
            secondCate:'',
            updateTime:'',
            statusList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            relationName:'',
            keyWordRelationname:[],
            relateKeywordList:[],
            keyworkId:'',
            firstCateId:'',
            secondCateId:'',
            key:{},
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
        }
    },
    computed: {
        keywordInfo(){
            return this.$store.state.keywordInfo;
        }
    },
    mounted(){
        this.getKeyword();
    },
    methods:{
        getKeyword(){
            if(this.keywordInfo){
                let key = this.keywordInfo;
                this.keyworkId = key.id;
                this.name = key.keyWordName;
                this.firstCate = key.categoryOneName;
                this.secondCate = key.categoryTwoName;
                this.firstCateId = key.categoryOneId;
                this.secondCateId = key.categoryTwoId;
                this.status = key.enable;
                this.updateTime = key.updateTime;
                this.relateKeywordList = (key.keyWordRelations).split(',')
                this.relateKeywordList = this.relateKeywordList.filter(function (el) {
                    return el && el.trim();
                })
                this.getKeywordDetail();
            }
            this.$local.clear('keyword')
        },

        // 查询关键字详情
        getKeywordDetail(){
            loadKeywordDetail({id:this.keyworkId}).then(res=>{
                this.keyWordRelationname = res.data.keyWordRelationsDTOs
            })
        },

        handleClose(tag) {
            this.relateKeywordList.splice(this.relateKeywordList.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.relateKeywordList.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
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

        // 添加关键字
        save(){
            if(!!!this.name.trim()){
                this.$message({
                    message:'请输入关键词！!',
                    type: "warning",
                    center:true
                })
                return false;
            }
            if(!!!this.keyworkId){
                let params = {
                    categoryOneId:this.firstCateId, 
                    categoryOneName:this.firstCate,
                    categoryTwoId:this.secondCateId,
                    categoryTwoName:this.secondCate,
                    enable:this.status,
                    keyWordName:this.name,
                    keyWordRelationsDTOs:this.keyWordRelationname
                }
                addKeywork(params).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message:'添加成功!',
                            type: "success",
                            center:true
                        })
                        this.$router.push({
                            path:'/keyword'
                        })
                    }else{
                        this.$message({
                            message:res.msg,
                            type: "warning",
                            center:true
                        })
                        return false;
                    }
                })
            }else{
                let params = {
                    id:this.keyworkId,
                    categoryOneId:this.firstCateId, 
                    categoryOneName:this.firstCate,
                    categoryTwoId:this.secondCateId,
                    categoryTwoName:this.secondCate,
                    enable:this.status,
                    keyWordName:this.name,
                    keyWordRelationsDTOs:this.keyWordRelationname
                }
                updateKeyword(params).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message:'修改成功!',
                            type: "success",
                            center:true
                        })
                        this.$router.push({
                            path:'/keyword'
                        })
                    }else{
                        this.$message({
                            message:res.msg,
                            type: "warning",
                            center:true
                        })
                        return false;
                    }
                })
            }
        },
    }
}
</script>
<style lang="less" scoped>
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
</style>

