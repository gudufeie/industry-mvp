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
                            <el-select v-model="firstCate" placeholder="请选择一级类目">
                                <el-option
                                v-for="item in firstCateList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="grid-content bg-purple" style="display:flex;justify-content:space-between;margin-top:20px;">
                            <span class="status_type">二级类目
                                <span class="star">*</span>
                            </span>
                            <el-select v-model="secondCate" placeholder="请选择二级类目">
                                <el-option
                                v-for="item in secondCateList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="grid-content bg-purple" style="display:flex;justify-content:space-between;margin-top:20px;">
                            <el-select v-model="keyword" clearable filterable placeholder="请搜索/选择关键词" style="width:100%">
                                <el-option
                                v-for="item in keywordList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
import { loadRelationKeyDetail, updateRelationKeyword, addRelationKeyword } from '../service/getData'
export default {
    data(){
        return{
            name: '',
            firstCateList:[],
            secondCateList:[],
            firstCate:'',
            secondCate:'',
            updateTime:'',
            keyword:'',
            keywordList:'',
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
    },
    methods:{
        back(){
            this.$router.go(-1);//返回上一层
        },

        // 查询关联关键词详细信息
        getRelationDetail(){
            if(!!this.getRelationKey){
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
                        _this.firstCate = key.categoryOneName;
                        _this.secondCate = key.categoryTwoName;
                        _this.keyword = key.keyWordName;
                        _this.updateTime = key.updateTime;
                    }
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
                    keyWordId: 'c51f2a0e25a94b4cb4d4e103780b971a',
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

