<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple search-bar">
                    <router-link  to="hotKeywordDetail"><el-button type="primary">新增热词</el-button></router-link>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-table
                        :header-cell-style="{color:'#000'}"
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="热搜词"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="备注">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="上线时间"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="下线时间"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="排序"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="发布状态"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="管理"
                        width="210">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" @click="outline(scope.$index, scope.row)">下线</el-button>
                                <el-button size="mini" @click="deleteKeyword(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 25, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal"
                        prev-text="上一页"
                        next-text="下一页">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            currentPage:1,
            pageTotal:1,
            pageSize:10
        }
    },
    methods:{
        handleSizeChange(){

        },

        handleCurrentChange(){

        },

        // 编辑
        edit(){
            this.$router.push({
                path:'/hotKeywordDetail'
            })
        },

        // 下线
        outline(){

        },

        // 删除
        deleteKeyword(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
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
<style lang="less" scoped>
    .main-wrap{
        font-size: 14px;
        padding:10px;
    }
    .el-row{
        margin-bottom: 20px;
    }
    .search-bar{
        text-align:right;
        padding-right: 10px;
    } 
    .block{
        margin-top:10px;
    }
    .el-col{
        padding: 0!important;
    }
</style>

