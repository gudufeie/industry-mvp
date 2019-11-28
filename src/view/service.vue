<template>
  <div class="service">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span>一级类目</span>
          <el-select v-model="serviceRole" placeholder="请选择">
            <el-option
              v-for="item in serviceRoles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span>二级类目</span>
          <el-select v-model="serviceType" placeholder="请选择">
            <el-option
              v-for="item in serviceTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <span>服务价格</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="input" placeholder="id/名称/标签"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="handledetail()">新增服务</el-button>
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
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="服务ID" width="80"></el-table-column>
      <el-table-column prop="serviceName" label="服务名称"></el-table-column>
      <el-table-column prop="price" width="100" label="服务价格"></el-table-column>
      <el-table-column prop="first" width="80" label="一级类目"></el-table-column>
      <el-table-column prop="second" width="80" label="二级类目"></el-table-column>
      <el-table-column prop="tab" label="标签"></el-table-column>
      <el-table-column prop="busName" label="商家名称"></el-table-column>
      <el-table-column prop="dd" label="商家所在地" width="100"></el-table-column>
      <el-table-column prop="loginTime" label="发布时间" width="180"></el-table-column>
      <el-table-column prop="loginstatu" label="发布状态"></el-table-column>
      <el-table-column label="管理" width="240">
        <template slot-scope="scope">
          <el-button size="mini" @click="handledetail(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleon(scope.$index, scope.row)"
          >{{scope.row.enable == 0?'启用':'下线'}}</el-button>
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
        :current-page="currentPage4"
        background
        :page-sizes="[10, 25, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { loadAllCateList } from "../service/getData";
export default {
  created() {
    this.getserviceList();
  },
  data() {
    return {
      serviceList: [],
      serviceRole: 0,
      currentPage4: 1,
      value: "",
      options: [],
      input: "",
      serviceRoles: [
        // { label: "全部", value: 0 },
        // { label: "数据采集设备", value: 1 },
        // { label: "技术服务", value: 2 },
        // { label: "工业互联网服务", value: 3 },
        // { label: "行业解决方案", value: 4 },
        // { label: "无", value: 5 }
      ],
      serviceType: 0,
      serviceTypes: [
        { label: "全部", value: 0 },
        { label: "传感器", value: 1 },
        { label: "网关", value: 2 },
        { label: "数据采集器", value: 3 },
        { label: "工业通讯模块", value: 4 },
        { label: "无", value: 5 }
      ],
      searchName: ""
    };
  },
  methods: {
    // 获取全部类目
    getserviceList() {
      loadAllCateList({}).then(res => {
        console.log(res);
        // this.serviceTypes = res.data;
      });
    },

    handledetail: function(index, row) {
      this.$store.commit("saveProviderInfo", row);
      this.$router.push({
        path: "/serviceDetail"
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // 重置成第一页, 开始展示
      this.pagenum = 1;
      // 重新渲染当前页
      this.getserviceList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      // 重新渲染
      this.getserviceList();
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

