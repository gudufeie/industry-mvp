<template>
    <div class="cateSort">
        <el-dialog :title="cateName" :visible.sync="dialogTableVisible" center>
            <el-table :data="cateData" border>
                <el-table-column property="name" label="类目名" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.categoryName}}
                            (<span :class="scope.row.state == '1'? 'online':'outline'">{{scope.row.state == '1'?'启用':'下线'}}</span>)
                        </span>
                    </template>
                </el-table-column>
                <el-table-column property="number" label="权重" align="center">
                    <template slot-scope="scope">
                        <el-input class="number" type="text" v-model="scope.row.sort"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="saveBtn" type="primary" @click="submit">保存</el-button>
        </el-dialog>
    </div>
</template>
<script>
import {updateCateSort} from '../service/getData';
export default {
    data(){
        return{
            cateName:'',
            dialogTableVisible:false,
            cateData:[]
        }
    },
    props:{
        options:Object,
    },
    watch:{
        options: function(){
            this.dialogTableVisible = this.options.show;
            this.cateName = this.options.name + '类目排序';
            this.cateData = this.options.cateData;
            this.sort()
        }
    },
    mounted(){

    },
    created(){
        
    },
    methods:{
        submit(){
            updateCateSort(this.cateData).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message:'修改成功!',
                        type: "success",
                        center:true
                    })
                    this.dialogTableVisible = false;
                }
                else{
                    this.$message({
                        message:'修改失败!',
                        type: "success",
                        center:true
                    })
                }
            })
        },

        compare(attr) {
            return function(a,b){
                var x = a[attr];
                var y = b[attr];
                return ((x>y)?-1:(x<y)?1:0)
            }
        },

            // 排序
        sort() {
            this.cateData.sort(this.compare('sort')); 
        },
    }
}
</script>
<style lang="less" scoped>
    .saveBtn{
        margin-top: 20px;
    }
</style>
<style>
    .el-dialog--center .el-dialog__body{
        text-align: center !important;
    }
    .online{
        color:#0b7a75;
    }
    .outline{
        color:red;
    }
</style>