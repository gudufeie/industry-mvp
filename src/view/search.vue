<template>
  <div class="main-wrap">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple search-bar">
          <router-link to="hotKeywordDetail">
            <el-button type="primary">新增热词</el-button>
          </router-link>
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
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="hotWord" label="热搜词" width="120"></el-table-column>
            <el-table-column prop="remark" label="备注" width="120"></el-table-column>
            <el-table-column label="上线时间">
              <template slot-scope="{row}">
                <span>{{row.onlineTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="offlineTime" label="下线时间">
              <template slot-scope="{row}">
                <span v-if="!!!row.offlineTime">/</span>
                <span v-else>{{row.offlineTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" width="80"></el-table-column>
            <el-table-column label="发布状态" width="100">
              <template slot-scope="{row}">
                <span>{{row.enable == 1?'启用':'下线'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="管理" width="210">
              <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  @click="outline(scope.$index, scope.row)"
                >{{scope.row.enable == 0?'启用':'下线'}}</el-button>
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
              next-text="下一页"
            ></el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { hotWord, delhotword, updateHotWordEnable } from "../service/getData";
export default {
  data() {
    return {
      tableData: [
        {
          index: "",
          hotWord: "",
          remark: "",
          onlineTime: "",
          offlineTime: "",
          sort: "",
          enable: ""
        }
      ],
      currentPage: 1,
      pageNum: 1,
      pageTotal: 1,
      pageSize: 10
    };
  },
  created() {
    this.getserviceList();
  },
  methods: {
    //   获取全部热搜词
    getserviceList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      hotWord(params).then(res => {
        this.tableData = res.data.dataList;
        this.pageTotal = res.data.totalCount;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getserviceList();
    },

    handleCurrentChange(page) {
      this.pageNum = page;
      this.getserviceList();
    },

    // 编辑
    edit() {
      this.$router.push({
        path: "/hotKeywordDetail"
      });
    },

    // 下线
    outline(index, row) {
      let enable = Math.abs(row.enable - 1);
      let params = {
        enable: enable,
        id: row.id
      };
      updateHotWordEnable(params).then(res => {
        if (res.code == 200) {
          this.getserviceList();
        } else {
          this.$message.warning(res.msg);
        }
      });
    },

    deleteKeyword(index, row) {
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delhotword({ id: row.id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getserviceList();
            } else {
              this.$message.warning(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.main-wrap {
  font-size: 14px;
  padding: 10px;
}
.el-row {
  margin-bottom: 20px;
}
.search-bar {
  text-align: right;
  padding-right: 10px;
}
.block {
  margin-top: 10px;
}
.el-col {
  padding: 0 !important;
}
</style>

