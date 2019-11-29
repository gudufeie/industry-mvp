<template>
    <div>
       <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <span class="status_type">关联关键词名称
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
                 <span class="status_type">更新时间:</span>
                 <span class="status_type" style="text-align:left;width:76%">{{updateTime}}</span>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                    <span class="status_type">所属关键词
                        <span class="star">*</span>
                    </span>
                    <div style="width:76%;">
                        <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                            <span class="status_type">一级类目
                                <span class="star">*</span>
                            </span>
                            <el-select v-model="firstCateId" placeholder="请选择一级类目" @change="getCateOne">
                                <el-option
                                v-for="(item,index) in firstCateList"
                                :key="index"
                                :label="item.categoryName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="grid-content bg-purple" style="display:flex;justify-content:space-between;margin-top:20px;">
                            <span class="status_type">二级类目
                                <span class="star">*</span>
                            </span>
                            <el-select v-model="secondCateId" placeholder="请选择二级类目" @change="getCateTwo">
                                <el-option
                                v-for="(item,index) in secondCateList"
                                :key="index"
                                :label="item.categoryName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="grid-content bg-purple" style="display:flex;justify-content:space-between;margin-top:20px;">
                            <el-select v-model="keywordId" clearable filterable placeholder="请搜索/选择关键词" style="width:100%" @change="getKeyWord">
                                <el-option
                                v-for="(item,index) in keywordList"
                                :key="index"
                                :label="item.keyWordName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20" class="btn-wrap">
            <el-col :span="3" :offset="9">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <el-button @click="submitRelationKey" type="primary">保存</el-button>
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
import { loadRelationKeyDetail, updateRelationKeyword, addRelationKeyword, 
        loadAllCateList, searchTag } from '../service/getData'
export default {
    data(){
        return{
            name: '',
            firstCateList:[],
            secondCateList:[],
            firstCate:'',
            secondCate:'',
            firstCateId:'',
            secondCateId:'',
            updateTime:'',
            keyword:'',
            keywordList:[],
            statusList:[
                {label:'是',value:'1'},
                {label:'否',value:'0'}
            ],
            relationKeyword:{},
            id:'',
            keywordId:''
        }
    },
    computed:{
        getRelationKey(){
            return this.$store.state.relationKeyword;
        }
    },
    mounted(){
        this.getRelationDetail();
        // 获取所有类目，包括一级和二级
        loadAllCateList({}).then(res=>{
            this.firstCateList = res.data;
            for(var item of this.firstCateList){
                if(item.id == this.firstCateId){
                    this.firstCate = item.categoryName;
                    this.secondCateList = item.childrenList;
                    break;
                }
            }         
        })
    },
    methods:{
        back(){
            this.$router.go(-1);//返回上一层
        },

        // 查询关联关键词详细信息
        getRelationDetail(){
            if(!!this.getRelationKey.id){
                let params = {
                    id:this.getRelationKey.id
                }
                loadRelationKeyDetail(params).then(res=>{
                    let _this = this;
                    if(res.code == 200){
                        let key = res.data.keyWord;
                        _this.id = res.data.id;
                        _this.keywordId = key.id;
                        _this.name = res.data.keyWordRelationname;
                        _this.firstCateId = key.categoryOneId;
                        _this.secondCateId = key.categoryTwoId;
                        _this.keyword = key.keyWordName;
                        _this.updateTime = key.updateTime;
                    }
                    let params={
                        categoryOneId:this.firstCateId,
                        categoryTwoId:this.secondCateId,
                        keyWordName:''
                    }
                    searchTag(params).then(res=>{
                        this.keywordList = res.data;
                    })
                })
            }
            this.$local.clear("relationKeyword");  //清除本地的关联关键词信息
            this.$store.commit('saveRelationKey',"")
        },

        // 添加或修改关联关键词
        submitRelationKey(){
            if(!!!this.name){
                this.$message({
                    message:'请输入关联关键词！!',
                    type: "warning",
                    center:true
                })
                return false;
            }
            if(!!!this.keywordId){
                this.$message({
                    message:'请选择关键词！!',
                    type: "warning",
                    center:true
                })
                return false;
            }
            if(!!this.id){
                let params = {
                    id: this.id,
                    keyWordId: this.keywordId,
                    keyWordRelationname: this.name
                }
                updateRelationKeyword(params).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message:'修改成功!',
                            type: "success",
                            center:true
                        })
                        this.$router.push({
                            path:'/association'
                        })
                    }else{
                        this.$message({
                            message:'修改失败!',
                            type: "warning",
                            center:true
                        }) 
                    }
                })
            }else{
               let params = {
                    id: this.id,
                    keyWordId: this.keywordId,
                    keyWordRelationname: this.name
               } 
               addRelationKeyword(params).then(res=>{
                   if(res.code == 200){
                        this.$message({
                            message:'添加成功!',
                            type: "success",
                            center:true
                        })
                        this.$router.push({
                            path:'/association'
                        })
                    }else{
                        this.$message({
                            message:'添加失败!',
                            type: "warning",
                            center:true
                        }) 
                    }
               })
            }
        },

        // 获取一级类目
        getCateOne(){
            for(var item of this.firstCateList){
                if(item.id == this.firstCateId){
                    this.firstCate = item.categoryName;
                    this.secondCateList = item.childrenList;
                    this.secondCateId = "";
                    break;
                }
            }
        },

        // 获取二级类目
        getCateTwo(){
            let params={
                categoryOneId:this.firstCateId,
                categoryTwoId:this.secondCateId,
                keyWordName:this.keyword
            }
            searchTag(params).then(res=>{
                this.keywordList = res.data;
                if(res.data.length > 0){
                    this.keywordId = res.data[0].id;
                    this.keyword = res.data[0].keyWordName
                }
            })

            for(var item of this.secondCateList){
                if(item.id == this.secondCateId){
                    this.secondCate = item.categoryName;
                    break;
                }
            }
        },

        // 获取关键字
        getKeyWord(){
            for(var item of this.keywordList){
                if(item.id == this.keywordId){
                    this.keyword = item.keyWordName;
                }
            }
        }
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
        width: 90px;
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
</style>

