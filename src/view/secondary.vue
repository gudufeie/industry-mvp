<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <span class="status_type">所属一级类目</span>
                  <span style="text-align:left;width:76%">{{firstCateName}}</span> 
                 </div>
            </el-col>
       </el-row>
       <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple" style="display:flex;justify-content:space-between">
                  <span class="status_type">二级分类名称
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
                    <span class="status_type">类型</span>
                    <span style="text-align:left;width:76%">{{type == '1'?'产品': type == '2'?'服务':'解决方案'}}</span>
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
import {addSecondCate} from '../service/getData';
export default {
    data(){
        return{
              firstCateName:'',
              typeName: '',
              enable:'0',
              enableList:[
                  {label:'否',value:'0'},
                  {label:'是',value:'1'}
              ],
              type:'',
              typeList:[
                  {label:'产品',value:'0'},
                  {label:'服务',value:'1'},
                  {label:'解决方案',value:'2'},
              ],
              parentId:'',
              mode:'add',
              id:'',
              typeId:''
        }
    },
    mounted(){
        let firstCateInfo = this.$route.query.firstCate;
        this.firstCateName = firstCateInfo.categoryName;
        this.type = this.typeId = firstCateInfo.typeId;
        this.parentId = firstCateInfo.id;
        if(!!this.$route.query.secondCate){
            this.mode = 'edit';
            let secondCate = this.$route.query.secondCate;
            this.typeName = secondCate.categoryName;
            this.type = secondCate.typeId;
            this.id = secondCate.id;
            if(secondCate.status == '启用'){
                this.enable = '1';
            }else{
                this.enable = '0';
            }
        }
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

            let params = {
                categoryName:this.typeName,
                state:this.enable,
                id: this.id,
                parentId: this.parentId,
                typeId: this.typeId
            }
            addSecondCate(params).then(res=>{
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
                            message:'添加失败：'+res.msg,
                            type: "warning",
                            center:true
                        })
                    }else{
                        this.$message({
                            message:'修改失败：'+res.msg,
                            type: "warning",
                            center:true
                        })
                    }
                }
            })
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

