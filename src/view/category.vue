<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4" :offset="16"><div class="grid-content bg-purple"><router-link to="/primary"><el-button type="primary">创建一级类目 </el-button></router-link></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-button type="primary" @click="sort">一级类目排序</el-button></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                 <span class="Status_type">状态</span>
                 <el-select v-model="status" placeholder="请选择">
                    <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                 </el-select>
                </div>
            </el-col>
            <el-col :span="8" >
                <div class="grid-content bg-purple">
                 <span class="Status_type">类型</span>
                 <el-select v-model="type" placeholder="请选择">
                    <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                 </el-select>
                </div>
            </el-col>
            <el-col :span="8" >
                <div class="grid-content bg-purple">
                 <el-button type="primary" @click="search">搜索</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          row-key="id"
          :expand-row-keys="expands"
          >
          <el-table-column type="expand">
            <template slot-scope="{row,$index}">
              <div style="text-align:center;padding-bottom:10px;">
                <el-button type="primary" @click="addSecondCate(row,$index)">添加二级类目</el-button>
                <el-button type="primary" @click="sortSecondCate(row,$index)">二级类目排序</el-button>
              </div>
            <el-table
              :data="row.childrenList"
              border
              style="width: 100%"
              >
              <el-table-column
              type="index"
              label="序号"
              width="60">
              </el-table-column>
              <el-table-column
              label="二级类目名"
              width="180"
              prop="categoryName">
              </el-table-column>
              <el-table-column
              prop="id"
              label="类目ID"
              width="120">
              </el-table-column>
              <el-table-column
              prop="typeName"
              label="类型"
              width="80">
              </el-table-column>
              <el-table-column
              width="80"
              label="状态">
                <template slot-scope="{row}">
                  <span>{{row.state == '1'?'启用中':'已下线'}}</span>
                </template>
              </el-table-column>
              <el-table-column
              prop="date"
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
              @click="secondCateEdit(row,$index,scope.row,scope.$index)">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleon(scope.$index, scope.row)">{{scope.row.state == '0'?'启用':'下线'}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="secondCateDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
          <!-- <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 25, 50]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div> -->
          </template>
          </el-table-column> 
          <el-table-column
          type="index"
          label="序号"
          width="60">
          </el-table-column>
          <el-table-column
          label="一级类目名"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.categoryName}}</span><span>({{scope.row.count}})</span>
          </template>
          </el-table-column>
          <el-table-column
          prop="id"
          label="类目ID">
          </el-table-column>
          <el-table-column
          prop="typeName"
          label="类型">
          </el-table-column>
          <el-table-column
          width="60"
          label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.state == '1'?'启用中':'已下线'}}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="更新时间">
            <template slot-scope="scope">
              <span>{{scope.row.updateTime | formatDate}}</span>
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
          v-show="scope.row.state == '0'"
          @click="handleon(scope.$index, scope.row)">启用</el-button>
          <el-button
          size="mini"
          v-show="scope.row.state == '1'"
          style="background:#fff;color:#000;"
          @click="handleon(scope.$index, scope.row)">下线</el-button>
         <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
      </el-table>
        <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 25, 50]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
        </div>
        <catesort-dialog :options="cateSortOptions"></catesort-dialog>
    </div>
</template>
<script>
import { loadFirstCateList, deleteCate, updateCateStatus} from '../service/getData';
import post from '../config/axios'
import CatesortDialog from './cateSortDialog.vue';
import qs from 'qs'
export default {
    data(){
        return{
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        cateSortOptions:{},
        expands:[],
        tableData: [],
            status: '0',
            type:'0',
            typeList:[
              {value: '0',label: '全部'},
              {value: '1',label: '产品'},
              {value: '2',label: '服务'},
              {value: '3',label: '解决方案'}
            ],
            statusList:[
              {value: '0',label: '全部'},
              {value: '1',label: '启用中'},
              {value: '2',label: '已下线'},
            ]
        }
    },
    components:{
      CatesortDialog
    },
    created(){
           this.init()
    },
    methods: {
        init(){
            // API.cityGuess();
            this.loadFirstCate();
        },
        handleEdit(index,row){
            this.$router.push({
              path:'/primary',
              query:row
            })
        },
        handleDelete(index,row){
            let id = (row.id).toString();
            this.$confirm('此操作将永久删除该类目以及其二级类目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteCate(id).then(res=>{
                if(res.code == 200){
                  this.$message({
                      message:'删除成功!',
                      type: "success",
                      center:true
                  })
                  let _this = this;
                  _this.tableData.splice(index,1);
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

        // 更新一级类目状态
        handleon(index,row){
          let _this = this;
          if(row.state == '0'){
            this.state = '1'
          }else{
            this.state = '0'
          }
          let params ={
            id:row.id,
            state:this.state
          }
          updateCateStatus(params).then(res=>{
            if(res.code == 200){
              _this.loadFirstCate();
            }
          })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        secondCate(value){
          console.log('数据',value)
          this.tableData.push(value)
        },
        sort: function(){
          this.cateSortOptions = {
            show:true,
            name:'一级',
            cateData:this.tableData
          }
        },

        // 二级类目排序
        sortSecondCate(row,index){
          this.cateSortOptions = {
            show:true,
            name:'二级',
            cateData:row.childrenList
          }
        },

        // 添加二级类目
        addSecondCate(row,index){
          this.$router.push({
            path:'/secondary',
            query:{
              firstCate:row
            }
          })
        },

        // 编辑二级类目
        secondCateEdit(row,index,firstRow,firstIndex){
          this.$router.push({
            path:'/secondary',
            query:{
              firstCate:row,
              secondCate:firstRow
            }
          })
        },

        // 删除二级类目
        secondCateDelete(index,row){
          let id = (row.id).toString();
          this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteCate(id).then(res=>{
                if(res.code == 200){
                  this.$message({
                      message:'删除成功!',
                      type: "success",
                      center:true
                  })
                  let _this = this;
                  _this.loadFirstCate();
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

        // 初始化获取所有类目
        loadFirstCate(){
          let params = {
            typeId:this.type,
            state:this.status,
          }
          loadFirstCateList(params).then(res=>{
            this.tableData = res.data.productCategoryList;
          });
          
        },

        // 按条件搜索类目
        search(){
          let _this = this;
          _this.loadFirstCate();
        }
    },
}
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-top: 10px;
    width: 100%;
  }
  .Status_type{
      display: inline-block;
      margin-right: 10px;
  }
  .el-select{
      width: 80%;
  }
  .el-icon-plus{
      font-weight: bolder;
      color: #0b7a75;
      font-size: 18px;
      margin-right: 10px;
      cursor: pointer;
  }
  .block{
    margin-top: 10px;
  }
</style>

