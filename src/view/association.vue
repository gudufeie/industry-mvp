<template>
    <div class="keyword">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-input v-model="relationName" placeholder="关联关键词"></el-input>
                    <el-button @click="search" type="primary">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="4" :offset="12">
                <div class="grid-content bg-purple add-key">
                    <router-link to="addAssociationKey"><el-button type="primary"> 新增关联关键词 </el-button></router-link>
                </div>
            </el-col>
        </el-row>
            <el-table
            :data="tableData"
            border
            style="width: 100%"
            >
            <el-table-column
            type="index"
            label="序号"
            width="120">
            </el-table-column>
            <el-table-column
            prop="keyWordRelationname"
            label="关联关键词">
            </el-table-column>
            <el-table-column
            prop="keyWordName"
            label="关键词">
            </el-table-column>
            <el-table-column
            prop="updateTime"
            label="最近更新时间">
            </el-table-column>
            <el-table-column label="操作" width="150">
            <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 25, 50]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
            prev-text="上一页"
            next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { loadRelationKeyList, deleteRelationKeyword } from '../service/getData';

export default {
    data(){
        return{
        relationName:'',
        currentPage: 1,
        pageSize:10,
        pageTotal:0,
        tableData: [],
        }
    },
    mounted(){
        this.loadRelationKey();
    },
    methods: {
        handleEdit(index,row){
            this.$store.commit("saveRelationKey",row)
            this.$router.push({
                path:'/addAssociationKey',
            })
        },

        // 删除关联关键词
        handleDelete(index,row){
            this.$confirm('此操作将永久删除该关联关键词, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
                }).then(() => {
                    let id = (row.id).toString();
                    deleteRelationKeyword({id:id}).then(res=>{
                        if(res.code == 200){
                            this.$message({
                                message:'删除成功!',
                                type: "success",
                                center:true
                            })
                            this.loadRelationKey();
                        }
                        else{
                            this.$message({
                                message:'删除失败!',
                                type: "warning",
                                center:true
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },

        // 获取所有关联关键词
        loadRelationKey(){
            let params = {
                keyWordName: this.relationName,
                pageNum:1,
                pageSize:10
            }
            loadRelationKeyList(params).then(res=>{
                if(!!res.data.dataList){
                    this.tableData = res.data.dataList;
                    this.currentPage = res.data.pageNum,
                    this.pageTotal = res.data.totalCount,
                    this.pageSize = res.data.pageSize
                }
            })
        },

        // 搜索
        search(){
            this.relationName = this.relationName.trim();
            this.loadRelationKey();
        }
    },
}
</script>
<style scoped>
    .el-row {
    margin-bottom: 20px;
    margin-top: 10px;
    }
    .el-input{
        width: 60%;
        margin-right: 20px;
    }
    .block{
        margin-top: 10px;
    }
    .add-key{
        float: right;
    }
</style>

