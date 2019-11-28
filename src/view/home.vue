<template>
    <div class="main-wrap">
        <div class="top-floor">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple title">顶部楼层</div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple search-bar" style="text-align:right;">
                        <el-button @click="toTopFloor" type="primary">新增楼层</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-table
                            :header-cell-style="{color:'#000'}"
                            :data="topdata"
                            border
                            style="width: 100%">
                            <el-table-column
                            type="index"
                            label="序号"
                            width="60">
                            </el-table-column>
                            <el-table-column
                            prop="navigationTitle"
                            label="配置词"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="typeName"
                            label="跳转类型"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="description"
                            label="内容">
                            </el-table-column>
                            <el-table-column
                            prop="sort"
                            label="排序"
                            width="80">
                            </el-table-column>
                            <el-table-column
                           
                            label="发布状态"
                            width="100"
                            >
                            <template slot-scope="scope">
                            {{scope.row.enable == '1' ? '已下线' : '已上线'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="最近更新时间"
                            width="180">
                              <template slot-scope="scope">
                            {{scope.row.updateTime| formatDate}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="管理"
                            width="210">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleTopEdit(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" @click="handleTopOffline(scope.$index, scope.row)">下线</el-button>
                                    <el-button size="mini" @click="handleTopDelete(scope.$index, scope.row)">删除</el-button>
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
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="distribution-floor">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple title">分发楼层</div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple search-bar" style="text-align:right;">
                        <el-button @click="toDistributeDetail" type="primary">新增楼层</el-button>
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
                            label="配置词"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="描述">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="排序"
                            width="80">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="发布状态"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="最近更新时间"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="管理"
                            width="210">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleView(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" @click="handleView(scope.$index, scope.row)">下线</el-button>
                                    <el-button size="mini" @click="handleView(scope.$index, scope.row)">删除</el-button>
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
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="solution">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple title">行业解决方案</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="solution-btn">
                        <el-button @click="addProduct" type="primary">新增菜单</el-button>
                        <el-button @click="toSolutionDetail" type="primary">新增解决方案</el-button>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="解决方案" name="first">
                            <div class="search-nav">
                                <span>导航</span>
                                <el-select v-model="firstCate" placeholder="请选择一级类目">
                                    <el-option
                                    v-for="item in firstCateList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
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
                                    label="解决方案ID"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="解决方案名称"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="二级类目">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="是否推荐">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="排序"
                                    width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="发布状态"
                                    width="100">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="最近更新时间"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="管理"
                                    width="210">
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">编辑</el-button>
                                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">下线</el-button>
                                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">删除</el-button>
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
                        </el-tab-pane>
                        <el-tab-pane label="导航排序" name="second">
                            <div class="add-nav">
                                <el-button @click="addProduct" size="mini">新增</el-button>
                            </div>
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
                                    label="导航名称"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="二级类目">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="排序"
                                    width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="发布状态"
                                    width="100">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="最近更新时间"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="管理"
                                    width="210">
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">编辑</el-button>
                                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">下线</el-button>
                                            <el-button size="mini" @click="handleView(scope.$index, scope.row)">删除</el-button>
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
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {getTopdata,changeTopstatus,deleteTop} from '@/service/getData'
export default {
    data(){
        return{
            topdata:'',
            topCategory:{},
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
            fileList: [],
            activeName: 'first',
            firstCateList:[
                {label:'推荐',value:1}
            ],
            firstCate:1,
            currentPage4:1
        }
    },
    created(){
        this.init()
    },
    methods:{
        // 初始化
        init(){
            let that=this
            let params={}
            getTopdata(params).then(res =>{
                that.topdata=res.data
            }) 
        },
        // 编辑顶部楼层
        handleTopEdit(index,row){
            // 保存编辑的内容
            // this.$store.commit("saveTopEditData",row)
            this.$local.clear("topEditData");  
            this.$local.set("topEditData",JSON.stringify(row));
            this.$router.push({
                path:'/topFloorDetail',
                query:{id:1}
            })
        },
        // 改变顶部楼层状态
        handleTopOffline(index,row){
            let enable=row.enable
            if(enable == 1){
                enable=0
            }else{
                enable=1
            }
            let params={
                id:row.id,
                enable:enable
            }
            changeTopstatus(params).then(res =>{
                this.init()
            })
        },
        // 删除顶部楼层
        handleTopDelete(index,row){
            let params={
                id:row.id,
            }
            deleteTop(params).then(res =>{
                  this.init()
            })
        },
        // 改变分页显示数量
        handleSizeChange(){

        },
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
        },

        handleClick(tab, event) {
            console.log(tab, event);
        },

        // 跳转顶部楼层详情
        toTopFloor(){
            this.$router.push({
                path:'/topFloorDetail',
                query:{id:2}
            })
        },

        // 跳转分发楼层详情
        toDistributeDetail(){
            this.$router.push({
                path:'/distributeFloorDetail'
            })
        },

        // 跳转解决方案楼层详情
        toSolutionDetail(){
            this.$router.push({
                path:'/solutionDetail'
            })
        }
    }
}
</script>
<style lang="less">
   .solution #tab-first{
        border: 1px solid rgba(0,0,0,0.2);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background: #fff;
        color: #000;
        line-height: 35px;
        height: 35px;
        padding-left: 20px;
    }
    .solution #tab-second{
        border: 1px solid rgba(0,0,0,0.2);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background: #fff;
        color: #000;
        line-height: 35px;
        height: 35px;
        padding-left: 20px;
    }
    .main-wrap #tab-second{
        padding-right: 20px;
    }
    .solution .el-tabs__active-bar{
        background-color: unset;
    }
    .solution .el-tabs__item.is-active{
        background: #0b7a75!important;
        color: #fff!important;
    }
</style>
<style lang="less" scoped>
    .main-wrap{
        font-size: 14px;
        padding:10px;
    }
    .el-row{
        margin-bottom: 10px;
    }
    .search-bar{
        padding-right: 10px;
        span{
            display: inline-block;
            width: 35%;
            text-align: right;
        }
    } 
    .search{
        text-align: right;
    }
    .el-input{
        width:50%;
        line-height: 35px;
    }
    .block{
        margin-top:10px;
    }
    .el-select{
        width: 20% !important;
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
    .title{
        text-align:left;
        padding-left:10px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 600;
    }
    .distribution-floor{
        margin-top: 40px;
        margin-bottom: 40px;
    }
    
    .solution-btn{
        width: 50%;
        text-align: right;
        position: relative;
        left:50%;
        top:30px;
        z-index: 999;
    }
    .search-nav{
        margin-bottom: 10px;
        span{
            margin-right: 10px;
        }
    }
    .add-nav{
        margin-bottom: 10px;
        text-align: right;
    }
</style>

