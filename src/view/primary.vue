<template>
    <div>
       <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <span class="status_type">一级分类名称
                      <span class="star">*</span>
                    </span>
                  <el-input 
                    v-model="typeName" 
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
                 <span class="status_type">是否启用
                     <span class="star">*</span>
                </span>
                 <el-select v-model="enable" placeholder="请选择">
                    <el-option
                    v-for="item in enableList"
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
                 <span class="status_type">类型
                     <span class="star">*</span>
                 </span>
                 <el-select v-model="type" placeholder="请选择">
                    <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id">
                    </el-option>
                 </el-select>
                </div>
            </el-col>
       </el-row>
       <el-row :gutter="20" class="bottom-button">
            <el-col :span="3" :offset="10">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <el-button type="primary" @click="submit">保存</el-button>
                 </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <el-button @click="quit">取消</el-button>
                 </div>
            </el-col>
       </el-row>
    </div>
</template>
<script>
import {addFirstCate, loadCateTypes} from '../service/getData'
export default {
    data(){
        return{
              typeName: '',
              enable:1,
              enableList:[
                  {label:'否',value:0},
                  {label:'是',value:1}
              ],
              type:'0',
              typeList:[],
              mode:'add',
              cateId:''
        }
    },
    mounted(){
        if(!!this.$route.query){
            this.mode = 'edit';
            this.typeName = this.$route.query.categoryName;
            this.type = this.$route.query.typeId;
            this.enable = this.$route.query.state;
            this.cateId = this.$route.query.id;
        }
        loadCateTypes({}).then(res=>{
            this.typeList = res.data;
            for(var index in this.typeList){
                if(this.typeList[index].typeName == '跳转地址' || this.typeList[index].typeName == '全部'){
                    this.typeList.splice(index,1);
                }
            }
        })
    },
    methods:{
        // 提交添加
        submit: function(){
            if(!!!this.typeName){
                this.$message({
                    message:'请输入分类名称!',
                    type: "warning",
                    center:true
                })
                return false;
            }

            if(!!!this.type){
                this.$message({
                    message:'请输入分类类型!',
                    type: "warning",
                    center:true
                })
                return false;
            }
            let params = {};
            if(this.mode == 'add'){
                params = {
                    categoryName:this.typeName,
                    state:this.enable,
                    typeId:this.type
                }
            }else{
                params = {
                    categoryName:this.typeName,
                    state:this.enable,
                    typeId:this.type,
                    id:this.cateId
                }
            }
            addFirstCate(params).then(res=>{
                if(res.code == 200){
                    if(this.mode = 'add'){
                        this.$message({
                            message:'添加成功!',
                            type: "success",
                            center:true
                        })
                    }else{
                        this.$message({
                            message:'修改成功!',
                            type: "success",
                            center:true
                        })
                    }
                    this.$router.push({
                        path:'/category'
                    })
                }
                else{
                    if(this.mode = 'add'){
                        this.$message({
                            message:res.msg,
                            type: "warning",
                            center:true
                        })
                    }else{
                        this.$message({
                            message:res.msg,
                            type: "warning",
                            center:true
                        })
                    }
                }
            });
        },

        // 返回上一页
        quit: function(){
            this.$router.go(-1);//返回上一层
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
    .bottom-button{
        margin-top: 60px;
    }
    .grid-content{
        align-items: center;
    }
    .star{
        vertical-align: middle;
        color:red;
    }
</style>

