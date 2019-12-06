<template>
  <div class="service">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span>一级类目</span>
          <el-select v-model="categoryOneId" placeholder="请选择" @change="getCateOne" clearable>
            <el-option
              v-for="(item,index) in categoryOneList"
              :key="index"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span>二级类目</span>
          <el-select v-model="categoryTwoId" placeholder="请选择" clearable>
            <el-option
              v-for="(item,index) in categoryTwoList"
              :key="index"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span>服务价格</span>
          <el-select v-model="isServicePrice" placeholder="请选择">
            <el-option
              v-for="item in servicePriceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="servicekeyWord" placeholder="id/名称/标签"></el-input>
          <el-button @click="search" type="primary">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="serviceAdd()">新增服务</el-button>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-button type="primary">导入服务</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="serviceList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="id" label="服务ID" width="80"></el-table-column>
      <el-table-column prop="serviceName" label="服务名称"></el-table-column>
      <el-table-column prop="servicePrice" width="100" label="服务价格">
        <template slot-scope="{row}">
          <span>{{row.servicePrice == 0?'/':row.servicePrice == -1?'面议':row.servicePrice == -2?'免费':row.servicePrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="categoryOneName" width="80" label="一级类目"></el-table-column>
      <el-table-column prop="categoryTwoName" width="80" label="二级类目"></el-table-column>
      <el-table-column prop="keyWordName" label="标签"></el-table-column>
      <el-table-column prop="businessName" label="商家名称"></el-table-column>
      <el-table-column prop="address" label="商家所在地" width="100">
        <template slot-scope="{row}">
          {{row.province | getAddress}}{{row.city | getAddress}}{{row.area | getAddress}}{{row.address}}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="180">
        <template slot-scope="{row}">
            <span>{{row.releaseTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="loginstatu" label="发布状态">
        <template slot-scope="{row}">
          <span>{{row.enabled == 1?'启用':'下线'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理" width="240">
        <template slot-scope="scope">
          <el-button size="mini" @click="handledetail(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleOnOrOut(scope.$index, scope.row)"
            >{{scope.row.enabled == 1?'下线':'启用'}}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        background
        :page-sizes="[10, 25, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { CodeToText } from 'element-china-area-data';
import { loadBusiServiceList, loadAllCateList,serviceOnOutline, deleteService } from "../service/getData";
export default {
  created() {
    
  },
  data() {
    return {
      serviceList: [],
      categoryOneId:'',
      categoryTwoId:'',
      categoryOneList:[],
      categoryTwoList:[],
      isServicePrice:'',
      servicekeyWord:'',
      servicePriceList:[
        {label:'全部',value:''},
        {label:'否',value:0},
        {label:'是',value:1}
      ],
      pageNum: 1,
      pageSize:10,
      pageTotal:1,
      value: "",
      searchName: "",
    };
  },
  filters:{
    getAddress(code){
      let address = '';
      if(code){
        address = CodeToText[code];
      }
      return address;
    }
  },
  mounted(){
    this.getserviceList();
    this.getAllCates();
  },
  methods: {
    // 获取全部类目
    getserviceList() {
      let params = {
        categoryOneId: this.categoryOneId,
        categoryTwoId: this.categoryTwoId,
        isServicePrice: this.isServicePrice,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        servicekeyWord: this.servicekeyWord
      }
      loadBusiServiceList(params).then(res => {
        this.serviceList = res.data.dataList;
        this.pageTotal = res.data.totalCount;
      });
    },

    // 跳转编辑页面
    handledetail: function(index, row) {
      this.$store.commit("saveServiceInfo", row);
      this.$router.push({
        path: "/serviceDetail"
      });
    },

    // 跳转增加服务
    serviceAdd(){
      this.$router.push({
        path: "/serviceDetail"
      });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getserviceList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getserviceList();
    },
    search(){
      this.getserviceList();
    },

    // 初始化获取所有类目
    getAllCates(){
      loadAllCateList({}).then(res=>{
        if(res.data){
          this.categoryOneList = res.data;
        }
      })
    },

    // 获取一级类目ID及其所有二级类目
    getCateOne(){
      for(var item of this.categoryOneList){
        if(this.categoryOneId == item.id){
          this.categoryTwoList = item.childrenList;
          break;
        }
      }
    },

    // 服务上下线
    handleOnOrOut(index,row){
      let enabled = Math.abs(row.enabled-1);
      let params = {
        enabled: enabled,
        id: row.id
      }
      serviceOnOutline(params).then(res=>{
        if(res.code == 200){
          this.getserviceList();
        }
      })
    },

    // 服务删除
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          deleteService({id:row.id}).then(res=>{
              if(res.code == 200){
                  this.$message.success('删除成功');
                  this.getserviceList();
              }
          })
      }).catch(() => {
          this.$message.info('已取消删除')         
      });
    }
  }
};
</script>
<style scoped>
.service {
  font-size: 14px;
}
.el-select {
  width: 50%;
  margin-left: 10px;
}
.el-input {
  width: 60%;
  margin-right: 0;
}
.el-button {
  border-radius: 5px;
}
.el-row {
  margin-bottom: 20px;
}
.search {
  text-align: right;
}
.block {
  margin-top: 10px;
}
</style>

