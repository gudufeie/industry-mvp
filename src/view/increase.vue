<template>
    <div>
       <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <span class="status_type">关键词名称
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
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
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
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                 <span class="status_type">二级类目
                     <span class="star">*</span>
                 </span>
                 <el-select v-model="secondCate" placeholder="请选择二级目录">
                    <el-option
                    v-for="item in secondCateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                 </el-select>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
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
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                 <span class="status_type">更新时间:</span>
                 <span class="status_type" style="text-align:left;width:76%">{{updateTime}}</span>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                 <span class="status_type">关联关键词:</span>
                 <span class="status_type" style="text-align:left;width:76%">
                     <el-tag
                        :key="tag"
                        v-for="tag in relateKeywordList"
                        closable
                        color='#fff'
                        type = 'info'
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <!-- <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        >
                    </el-input> -->
                    <p>
                        <el-button class="button-new-tag" size="small" @click="showInput">添加 +</el-button>
                        <el-input 
                            class="input-new-tag" 
                            v-model="relationName" 
                            size="small" 
                            v-if="inputVisible"
                            placeholder="10个字以内"
                            maxlength="10"
                            show-word-limit>
                        </el-input>
                        <el-button class="button-new-tag" size="small" @click="addRelation" v-if="inputVisible">确定</el-button>
                    </p>
                </span>
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
            key:{}
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
<style scoped>
    .status_type{
        display: inline-block;  
    }
    .el-input,.el-select{
        width: 76%;
    }
    .el-row{
        margin-top: 20px;
    }
    .el-button{
        width: 120px;
    }
    .btn-wrap{
        margin-top: 60px;
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
</style>

