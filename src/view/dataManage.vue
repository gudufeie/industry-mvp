<template>
    <div class="main-wrap">
        <div class="block">
            <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purplp-left">
                            <el-input
                                placeholder="关键词">
                            </el-input>
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
            <el-tab-pane label="配置管理" name="second">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purplp-left">
                            <el-input
                                placeholder="关键词">
                            </el-input>
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
            <el-tab-pane label="角色管理" name="third" class="third">
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
            <el-tab-pane label="定时任务补偿" name="fourth" class="fourth">
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
export default {
    data(){
        return{
            activeName: 'first',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value1: '',
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
            value: ''
        }
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
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
