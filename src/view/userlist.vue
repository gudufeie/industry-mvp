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
          prop="name"
          label="用户名"
          width="80">
          </el-table-column>
          <el-table-column
          prop="shopName"
          label="店铺名称">
          </el-table-column>
          <el-table-column
          prop="phone"
          width="100"
          label="联系电话">
          </el-table-column>
          <el-table-column
          prop="role"
          width="80"
          label="角色">
          </el-table-column>
          <el-table-column
          prop="type"
          width="80"
          label="类型">
          </el-table-column>
          <el-table-column
          prop="registerTime"
          label="注册时间">
          </el-table-column>
          <el-table-column
          prop="loginTime"
          label="最近登录时间">
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
            :current-page="currentPage4"
            background
            :page-sizes="[10, 25, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            prev-text="上一页"
            next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return{
            tableData:[
                {id:1111,name:'擎天柱',shopName:'良品铺子',phone:'155666666',role:'供应商',type:'企业',registerTime:'2019-11-13',loginTime:'2019-11-13 10:00:00'}
            ],
            userRole:0,
            userRoles:[
                {label:'全部',value:0},
                {label:'客户',value:1},
                {label:'供应商',value:2}
            ],
            userType:0,
            userTypes:[
                {label:'全部',value:0},
                {label:'企业',value:1},
                {label:'个人',value:2}
            ],
            searchName:''
        }
    },
    methods:{
        search: function(){
            console.log(this.userRole,this.userType,this.searchName)
        },
        handleManag: function(index,row){
            this.$store.commit('saveUserInfo',row)
            this.$router.push({
                path:'/userinfo',
            })
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

