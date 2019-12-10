<template>
    <div class="userlist">
        <el-row :gutter="20">
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="user_player">用户角色</span>
                    <el-select v-model="userRole" placeholder="请选择">
                        <el-option
                        v-for="item in userRoles"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <span class="user_player">用户类型</span>
                    <el-select v-model="userType" placeholder="请选择">
                        <el-option
                        v-for="item in userTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple search">
                    <el-input v-model="searchName" placeholder="id/联系电话/店铺名称/用户名"></el-input>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
            </el-col>
        </el-row>
    <el-table
          :data="tableData"
          border
          style="width: 100%"
          >
          <el-table-column
          prop="id"
          label="用户ID"
          width="100">
          </el-table-column>
          <el-table-column
          prop="customerName"
          label="用户名"
          width="80">
          </el-table-column>
          <el-table-column
          prop="businessName"
          label="店铺名称">
          </el-table-column>
          <el-table-column
          prop="moblieNo"
          width="120"
          label="联系电话">
          </el-table-column>
          <el-table-column
          width="80"
          label="角色">
            <template slot-scope="{row}">
                <span>{{row.enterpriseRole == 1?'客户':row.enterpriseRole == 2?'供应商':''}}</span>
            </template>
          </el-table-column>
          <el-table-column
          width="80"
          label="属性">
            <template slot-scope="{row}">
                <span>{{row.enterpriseType == 1?'企业':row.enterpriseRole == 2?'个人':''}}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="注册时间"
          width="160">
            <template slot-scope="{row}">
                <span>{{row.registerTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="最近登录时间"
          width="160">
            <template slot-scope="{row}">
                <span>{{row.loginTime | formatDate}}</span>
            </template>
          </el-table-column>
         <el-table-column label="操作" width="80">
          <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleManag(scope.$index, scope.row)">管理</el-button>
         </template>
       </el-table-column>
      </el-table>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            background
            :page-sizes="[10, 25, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal"
            prev-text="上一页"
            next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {loadUserList} from "@/service/getData"
export default {
    data (){
        return{
            tableData:[],
            userRole:'',
            userRoles:[
                {label:'全部',value:''},
                {label:'客户',value:1},
                {label:'供应商',value:2}
            ],
            userType:'',
            userTypes:[
                {label:'全部',value:''},
                {label:'企业',value:1},
                {label:'个人',value:2}
            ],
            searchName:'',
            currentPage:1,
            pageSize:10,
            dataTotal:1
        }
    },
    mounted(){
        this.getUsers();
    },
    methods:{
        // 获取所有用户
        getUsers(){
            let params = {
                enterpriseRole:this.userRole,
                enterpriseType:this.userType,
                condition:this.searchName,
                pageNum:1,
                pageSize:10
            }
            loadUserList(params).then(res=>{
                this.tableData = res.data.dataList;
                if(this.pageNum > res.data.totalPage){
                    this.pageNum = res.data.totalPage;
                    this.getUsers();
                }
            })
        },
        search: function(){
            this.getUsers();
        },

        // 跳转用户详情
        handleManag: function(index,row){
            this.$store.commit('saveUserInfo',row)
            this.$router.push({
                path:'/userinfo',
                query:{
                    activeIndex:1
                }
            })
        },
        // 更改分页数量
        handleSizeChange(){

        },

        // 跳转页面
        handleCurrentChange(){

        }
    }
}
</script>
<style scoped>
    .userlist{
        font-size: 14px;
    }
    .el-select{
        width: 60%;
    }
    .user_player{
        margin-right: 15px;
    }
    /* .userlist{
        margin: 20px 30px 0 30px;
    } */
    .el-input{
        width: 60%;
        margin-right: 0;
    }
  .el-input__inner, .el-button {
        border-radius: 0;
    }
    .userlist .el-row{
        margin-bottom: 20px;
    }
    .search{
        text-align: right;
    }
    .block{
        margin-top: 10px;
    }
</style>

