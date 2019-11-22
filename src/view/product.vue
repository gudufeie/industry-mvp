<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple search-bar" style="text-align:right;">
                    <el-button @click="addProduct" type="primary">新增产品</el-button>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button size="small" type="primary">导入产品</el-button>
                    </el-upload>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="5">
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
            <el-col :span="5">
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
            <el-col :span="5">
                <div class="grid-content bg-purple search-bar">
                    <span>产品来源</span>
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
            <el-col :span="4" class="origin">
                <div class="grid-content bg-purple search-bar">
                    <span>产品来源</span>
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
            <el-col :span="5">
                <div class="grid-content bg-purple search">
                    <el-input v-model="searchName" placeholder="id/名称/标签" style="width:80%"></el-input>
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
                        type="index"
                        label="序号"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="产品ID"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="产品图片"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="产品名称"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="产品价格"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="一级类目"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="二级类目">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="标签">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="产品来源"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="商家名称"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="所在地"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="发布时间"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="发布状态"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="管理"
                        width="210">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
                                <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
                                <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
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
            }],
            fileList: []
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
        },

        // 添加产品
        addProduct(){
            this.$router.push({
                name:'productDetail'
            })
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
            width: 35%;
            text-align: right;
        }
    } 
    .search{
        text-align: right;
    }
    .el-input{
        width:50% !important;
    }
    .block{
        margin-top:10px;
    }
    .el-select{
        width: 60% !important;
    }
    .origin .el-select{
        width: 50% !important;
    }
    .el-col{
        padding: 0!important;
    }
    .upload-demo{
        display: inline-block;
        .el-button{
            height: 40px;
            width: 98px;
            margin-left: 20px;
        }
    }
</style>

