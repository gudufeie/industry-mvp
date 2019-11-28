<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple search-bar" style="text-align:right;">
                    <el-button @click="addsloution" type="primary">发布解决方案</el-button>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">导入解决方案</el-button>
                    </el-upload>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple search-bar">
                    <span>二级类目</span>
                    <el-select v-model="secondCate" placeholder="请选择">
                        <el-option
                        v-for="item in secondCateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple search-bar">
                    <span>发布来源</span>
                    <el-select v-model="publishOrigin" placeholder="请选择">
                        <el-option
                        v-for="item in publishOriginList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12">
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
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="方案ID"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="solutionName"
                        label="方案名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="solutionPrice"
                        label="方案报价"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="categoryTwoName"
                        label="二级类目"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="keyWordName"
                        label="标签"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="solutionSource"
                        label="发布来源">
                        </el-table-column>
                        <el-table-column
                        prop="releaseId"
                        label="发布人ID">
                        </el-table-column>
                        <el-table-column
                        prop="releaseName"
                        label="发布人"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="releaseAddress"
                        label="所在地"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="releaseTime"
                        label="发布时间"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        label="发布状态"
                        width="80">
                            <template slot-scope="{row}">
                                <span>{{row.enabled == 1?'启用':'下线'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="管理"
                        width="210">
                            <template slot-scope="{row}">
                                <el-button size="mini" @click="handleView(row)">编辑</el-button>
                                <el-button size="mini" @click="solutionOnOrOut(row)">{{row.enabled == 1?'下线':'启用'}}</el-button>
                                <el-button size="mini" @click="deleteSolution(row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
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
import { loadSolutionList, solutionOnOutline, solutionDelete } from "@/service/getData"
export default {
    data(){
        return{
            secondCateOptions: [
                {
                value: "",
                label: '全部'
                },{
                value: 1,
                label: '新能源'
                }, {
                value: 2,
                label: '能源'
                }, {
                value: 3,
                label: '制造'
                }, {
                value: 4,
                label: '矿山'
                }, {
                value: 5,
                label: '汽车'
                },{
                value: 6,
                label: '电气'
                }, {
                value:7,
                label: '交通'
                }, {
                value: 8,
                label: '电子'
                }, {
                value: 9,
                label: '纺织'
                }, {
                value: 10,
                label: '农业'
                }, {
                value: 11,
                label: '物流'
                }, {
                value: 12,
                label: '家居'
                }, {
                value: 13,
                label: '园区'
                }, {
                value: 14,
                label: '健身'
                }, {
                value: 15,
                label: '游戏'
                }
            ],
            secondCate:"",
            tableData: [],   //解决方案列表
            fileList: [],
            publishOrigin:1,
            publishOriginList:[
                {
                value: 1,
                label: '全部'
                }, {
                value: 2,
                label: '人工采编'
                }, {
                value: 3,
                label: '服务商发布'
                }
            ],
            pageNum:1,
            pageSize:10,
            pageTotal:1,
            searchName:''            
        }
    },
    mounted(){
        this.getSolutionList();
    },
    methods:{
        // 获取解决方案列表
        getSolutionList(){
            let params ={
                businessId: "",
                categoryTwoId: this.secondCate,
                keyWordName: this.searchName,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                publish: 1
            }
            loadSolutionList(params).then(res=>{
                if(res.data.dataList){
                    this.tableData = res.data.dataList;
                    this.pageTotal = res.data.totalCount;
                }
            })
        },

        // 改变分页数量
        handleSizeChange(pagesize){
            this.pageSize = pagesize;
            this.getSolutionList();
        },
        // 点击页面跳转
        handleCurrentChange(page){
            this.pageNum = page;
            this.getSolutionList();
        },
        
        // 搜索
        search(){
            this.getSolutionList();
        },

        // 编辑解决方案
        handleView(row){
            this.$store.commit('saveSolutionInfo',row)
            this.$router.push({
                path:'/sloveDetail',
            })
        },
        
        // 解决方案上下线
        solutionOnOrOut(row){
            let enabled = Math.abs(row.enabled-1);
            let params = {
                id: row.id,
                enabled:enabled
            }
            solutionOnOutline(params).then(res=>{
                if(res.code == 200){
                    this.getSolutionList();
                }
            })
        },

        deleteSolution(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                solutionDelete({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功')
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')         
            });
        },

        // 添加产品
        addsloution(){
            this.$router.push({
                path:'/sloveDetail'
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
            width: 126px;
            margin-left: 20px;
        }
    }
</style>

