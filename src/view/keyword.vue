<template>
    <div class="keyword">
    <el-row>
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-input v-model="keywordName" placeholder="关键词"></el-input>
                 <el-button @click="search" type="primary">搜索</el-button>
            </div>
        </el-col>
        <el-col :span="4" :offset="12">
            <div class="grid-content bg-purple add-key">
                 <router-link to="increase"><el-button type="primary"> 新增关键词 </el-button></router-link>
            </div>
        </el-col>
    </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          >
          <el-table-column
          type='index'
          label="序号"
          width="50">
          </el-table-column>
          <el-table-column
          prop="keyWordName"
          label="关键词"
          width="150">
          </el-table-column>
          <el-table-column
          prop="categoryOneName"
          label="一级类目"
          width="120">
          </el-table-column>
          <el-table-column
          prop="categoryTwoName"
          label="二级类目"
          width="120">
          </el-table-column>
          <el-table-column
          prop="keyWordRelations"
          label="关联关键词">
          </el-table-column>
          <el-table-column
          width="80"
          label="发布状态">
            <template slot-scope="{row}">
                <span>{{row.enable == '1'?'启用中':'已下线'}}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180">
            <template slot-scope="{row}">
                <span>{{row.updateTime | formatDate}}</span>
            </template>
          </el-table-column>
         <el-table-column label="操作" width="220">
          <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
         <el-button
          size="mini"
          type="success"
          @click="handleon(scope.$index, scope.row)">{{scope.row.enable == 0?'启用':'下线'}}</el-button>
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
import { loadKeyword, deleteKeyword, updateKeyStatus } from '../service/getData'
export default {
    data(){
        return{
        currentPage:1,
        pageSize:10,
        pageTotal:0,
        tableData: [],
        keywordName:'',
        enable:null,
        }
    },
    mounted(){
        this.loadKeywordList();
    },
    methods: {
        // 编辑关联词
        handleEdit(index,row){
            this.$store.commit("saveKeyword",row);
            this.$router.push({
                path:'increase',
            })
        },

        // 删除关键词
        handleDelete(index,row){
            this.$confirm('此操作将永久删除该关键词, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteKeyword({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message:'删除成功!',
                            type: "success",
                            center:true
                        })
                        this.tableData.splice(index,1);
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

        // 修改关键词状态
        handleon(index,row){
            if(row.enable == 1){
                this.enable = 0;
            }else{
                this.enable = 1;
            }
            let params = {
                enable: this.enable,
                id:row.id
            }
            updateKeyStatus(params).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message:'修改成功!',
                        type: "success",
                        center:true
                    })
                    let _this = this;
                    _this.loadKeywordList();
                }else{
                    this.$message({
                        message:'修改失败!',
                        type: "warning",
                        center:true
                    })
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },


        // 加载关键词
        loadKeywordList(){
            let params ={
              keyWordName:this.keywordName,
              pageNum:1,
              pageSize:10  
            }
            loadKeyword(params).then(res=>{
                this.tableData = res.data.dataList;
                this.currentPage = res.data.totalCount;
                this.pageTotal =  res.data.totalPage;
            })
        },

        // 搜索关键词
        search(){
            let params ={
              keyWordName:this.keywordName.trim(),
              pageNum:1,
              pageSize:10  
            }
            loadKeyword(params).then(res=>{
                this.tableData = res.data.dataList;
                this.currentPage = res.data.totalCount;
                this.pageTotal =  res.data.totalPage;
            })
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

