<template>
    <div class="main-wrap">
        <div class="block">
            <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="getDateTime()">
            </el-date-picker>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户搜索" name="first">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purplp-left">
                            <el-input v-model="keyWord" placeholder="关键词"></el-input>
                            <el-button @click="search" type="primary">搜索</el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-right">
                            <el-button type="primary">导出明细</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                             <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                prop="date"
                                label="日期">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="搜索关键词">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="搜索次数">
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
                                <el-pagination
                                background
                                @size-change="searchSizeChange"
                                @current-change="searchPageChange"
                                :current-page="searchPageNum"
                                :page-sizes="[10, 25, 50]"
                                :page-size="searchPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="searchDataTotal"
                                prev-text="上一页"
                                next-text="下一页">
                                </el-pagination>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="浏览页面" name="second">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purplp-left">
                            <el-input v-model="pageUrl" placeholder="URL"></el-input>
                            <el-button type="primary">搜索</el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-right">
                            <el-button type="primary">导出明细</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                             <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                prop="date"
                                label="日期">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="页面名称">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="URL">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="浏览次数">
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
                                <el-pagination
                                background
                                @size-change="browseSizeChange"
                                @current-change="browsePageChange"
                                :current-page="browsePageNum"
                                :page-sizes="[10, 25, 50]"
                                :page-size="browsePageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="browseDataTotal"
                                prev-text="上一页"
                                next-text="下一页">
                                </el-pagination>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="浏览服务" name="third" class="third">
                <el-row :gutter="20">
                    <el-col :span="15">
                        <div class="grid-content bg-purplp-left">
                            <span class="title">类型</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="title">一级类目</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="title">二级类目</span>
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
                    <el-col :span="9">
                        <div class="grid-content bg-purple-right">
                            <el-input
                                placeholder="关键词">
                            </el-input>
                            <el-button type="primary">搜索</el-button>
                            <el-button type="primary">导出明细</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                             <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                prop="date"
                                label="日期">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="浏览类型">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="浏览ID">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="浏览名称">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="一级类目">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="二级类目">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="服务商ID">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="服务商名称">
                                </el-table-column>
                                <el-table-column
                                prop="count"
                                label="浏览次数"
                                width="80">
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
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
            </el-tab-pane>
            <el-tab-pane label="用户收藏" name="fourth" class="fourth">
                <el-row :gutter="20">
                    <el-col :span="15">
                        <div class="grid-content bg-purplp-left">
                            <span class="title">类型</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="title">一级类目</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="title">二级类目</span>
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
                    <el-col :span="9">
                        <div class="grid-content bg-purple-right">
                            <el-input
                                placeholder="关键词">
                            </el-input>
                            <el-button type="primary">搜索</el-button>
                            <el-button type="primary">导出明细</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                             <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                prop="date"
                                label="日期">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="收藏类型">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="收藏ID">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="收藏名称">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="一级类目">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="二级类目">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="服务商ID">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="服务商名称">
                                </el-table-column>
                                <el-table-column
                                prop="count"
                                label="收藏数"
                                width="80">
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { userSearchList,userPageList,userServiceList,userCollectionList } from "@/service/getData"
export default {
    data(){
        return{
            activeName: 'first',
            time: '',         //查询时间
            value2: '',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                count:10
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                count:10
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                count:10
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                count:10
            }],

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
            startTime:'',
            endTime:'',
            keyWord:'',
            searchPageSize:10,
            searchPageNum:1,
            searchDataTotal:0,
            pageUrl:'',
            browsePageNum:1,
            browsePageSize:10,
            browseDataTotal:0,
        }
    },
    mounted(){
        this.getUserSearch();
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },

        search(){
            console.log('时间段',this.time)
        },

        // 获取时间
        getDateTime(time){
            this.startTime = time[0];
            this.endTime = time[1];
        },

        // 用户搜索列表
        getUserSearch(){
            let params = {
                createTime:'2019-12-10 00:00:00',
                key: this.keyWord,
                pageNum: this.searchPageNum,
                pageSize: this.searchPageSize
            }
            userSearchList(params).then(res=>{

            })
        },

        // 用户浏览页面列表
        getBrowsePageList(){
            let params = {
                pageSize: this.browsePageSize,
                pageNum: this.browsePageNum,
                pageUrl: this.pageUrl,
                createTime:''
            }
            userPageList(params).then(res=>{

            })
        },

        searchSizeChange(pageSize){

        },

        searchPageChange(pageNmu){

        },

        browsePageChange(pageNum){

        },

        browseSizeChange(pageSize){

        }
    }
}
</script>
<style lang="less">
    .el-table td,.el-table th{
        text-align: center !important;
    }
</style>
<style lang="less" scoped>
    .main-wrap{
        font-size: 14px;
        .block{
            text-align: right;
            z-index: 999;
            width: 50%;
            float: right;
        }
        .el-date-editor{
            z-index: 999;
        }
        .el-row{
            margin-bottom: 20px;
            .bg-purplp-left{
                .el-input{
                    width: 50%;
                }
            }
            .bg-purple-right{
                text-align: right;
            }
        }
        .pagination{
            margin-top:10px;
        }

        .third,.fourth{
            .el-row{
                .el-col{
                    .bg-purplp-left{
                        span{
                            margin-right: 10px;
                        }
                        .el-select{
                            width:20%;
                            margin-right: 15px;
                        }
                    }
                    .bg-purple-right{
                        .el-input{
                            width: 49%;
                        }
                    }
                }
            }
        }
    }
</style>
