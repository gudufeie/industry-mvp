<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple search-bar" style="text-align:right;">
                    <el-button type="primary">新增服务商</el-button>
                    <el-button type="primary">导入服务商</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>类型</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>一级类目</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>二级类目</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>提供服务</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>提供解决方案</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple search">
                    <el-input v-model="searchName" placeholder="id/联系电话/店铺名称/用户名" style="width:80%"></el-input>
                    <el-button type="primary" @click="search">搜索</el-button>
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
                        prop="date"
                        label="序号"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="服务商ID"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="店铺名称"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="类型"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="联系人"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="所在地"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="一级类目">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="二级类目">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="标签"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="服务数"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="解决方案数"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="管理"
                        width="80">
                        <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleView(scope.$index, scope.row)">查看</el-button>
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
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
        }
    },
    methods:{
        handleView(index,row){
            this.$router.push({
                path:'/userinfo',
                query:{
                    userInfo:row,
                    activeIndex:'4'
                },
            })
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
        span{
            margin-right: 10px;
            display: inline-block;
            width: 30%;
            text-align: right;
        }
    } 
    .search{
        text-align: right;
    }
    .el-input{
        width:70% !important;
    }
    .block{
        margin-top:10px;
    }
</style>

