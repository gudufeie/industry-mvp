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
                            {{scope.row.enable == '1' ? '已上线' : '已下线'}}
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
                                    <el-button size="mini" @click="handleTopOffline(scope.$index, scope.row)">{{scope.row.enable == '1'?'下线':'上线'}}</el-button>
                                    <el-button size="mini" @click="handleTopDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
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
                            :data="dispenseContent"
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
                            prop="description"
                            label="描述">
                            </el-table-column>
                            <el-table-column
                            prop="sort"
                            label="排序"
                            width="80">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="发布状态"
                            width="100">
                                <template slot-scope="{row}">
                                    <span>{{row.enable == 1?'已上线':'已下线'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="最近更新时间"
                            width="180">
                                <template slot-scope="{row}">
                                    <span>{{row.updateTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="管理"
                            width="220">
                                <template slot-scope="{row,$index}">
                                    <el-button size="mini" @click="dispenseUpdate(row,$index)">编辑</el-button>
                                    <el-button size="mini" @click="dispenseOnOrOut(row,$index)">{{row.enable == 1?'下线':'上线'}}</el-button>
                                    <el-button size="mini" @click="dispenseDelete(row,$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
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
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="解决方案" name="first">
                            <div class="search-nav">
                                <span>导航</span>
                                <el-select v-model="navigationId" placeholder="请选择" @change="filterSolution" clearable>
                                    <el-option
                                    v-for="(item,index) in navigationList"
                                    :key="index"
                                    :label="item.navigationName"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button style="float:right;" @click="toSolutionDetail" type="primary">新增解决方案</el-button>
                            </div>
                            <div class="grid-content bg-purple-dark">
                                <el-table
                                    :header-cell-style="{color:'#000'}"
                                    :data="industrySolutionList"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="60">
                                    </el-table-column>
                                    <el-table-column
                                    prop="id"
                                    label="解决方案ID"
                                    width="100">
                                    </el-table-column>
                                    <el-table-column
                                    prop="solutionName"
                                    label="解决方案名称"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    prop="categoryName"
                                    label="二级类目"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    label="是否推荐"
                                    width="80">
                                        <template slot-scope="{row}">
                                            <span>{{row.recommend == 1?'人工推荐':row.recommend == 2?'系统推荐':'否'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="sort"
                                    label="排序"
                                    width="80">
                                    </el-table-column>
                                    <el-table-column
                                    label="发布状态"
                                    width="80">
                                        <template slot-scope="{row}">
                                            <span>{{row.enable == 1?'已上线':'已下线'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    label="最近更新时间"
                                    width="120">
                                        <template slot-scope="{row}">
                                            <span>{{row.updateTime | formatDate}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    label="管理"
                                    width="210">
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="solutionEdit(scope.$index, scope.row)">编辑</el-button>
                                            <el-button size="mini" @click="solutionOnOrOut(scope.$index, scope.row)">{{scope.row.enable == 1?'下线':'上线'}}</el-button>
                                            <el-button size="mini" @click="solutionDelete(scope.$index, scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                    background
                                    @size-change="solutionSizeChange"
                                    @current-change="solutionCurrentChange"
                                    :current-page="solutionPageNum"
                                    :page-sizes="[10, 25, 50]"
                                    :page-size="solutionPageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="solutionTotal"
                                    prev-text="上一页"
                                    next-text="下一页">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="导航排序" name="second">
                            <div class="add-nav">
                                <el-button @click="addNavigation" type="primary">新增导航</el-button>
                            </div>
                            <div class="grid-content bg-purple-dark">
                                <el-table
                                    :header-cell-style="{color:'#000'}"
                                    :data="navigationList"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="60">
                                    </el-table-column>
                                    <el-table-column
                                    label="导航名称">
                                        <template slot-scope="{row,$index}">
                                            <el-input class="nav-input" v-if="!!showEdit[$index]  && !!row.categoryTwoId" v-model="row.navigationName"></el-input>
                                            <span v-if="!!!row.categoryTwoId">{{row.navigationName}}</span>
                                            <span v-if="!!!showEdit[$index] && !!row.categoryTwoId">{{row.navigationName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    label="二级类目"
                                    width="120">
                                        <template slot-scope="{row,$index}">
                                            <el-select class="nav-input" v-if="!!showEdit[$index] && !!row.categoryTwoId" v-model="row.categoryTwoId" placeholder="请选择">
                                                <el-option
                                                    v-for="(item,index) in cateTwoKeywords"
                                                    :key="index"
                                                    :label="item.categoryName"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                            <span v-if="!!!row.categoryTwoId">/</span>
                                            <span v-if="!!!showEdit[$index] && !!row.categoryTwoId">{{row.categoryName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    label="排序"
                                    width="120"> 
                                        <template slot-scope="{row,$index}">
                                            <el-input class="nav-input" v-if="!!showEdit[$index] && !!row.categoryTwoId" v-model="row.sort"></el-input>
                                            <span v-if="!!!row.categoryTwoId">/</span>
                                            <span v-if="!!!showEdit[$index] && !!row.categoryTwoId">{{row.sort}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    label="发布状态"
                                    width="120">
                                        <template slot-scope="{row}">
                                            <span>{{row.publishState == 2?'已上线':row.publishState == 3?'已下线':'未上线'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    label="最近更新时间"
                                    width="180">
                                        <template slot-scope="{row}">
                                            <span>{{row.lastUpdateTime | formatDate}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    label="管理"
                                    width="210">
                                        <template slot-scope="{$index,row}">
                                            <el-button size="mini" class="disable_btn" v-if="!!!showBtn[$index] && !!!row.categoryTwoId" disabled="true">编辑</el-button>
                                            <el-button size="mini" @click="navEdit($index,row)" v-if="!!!showBtn[$index] && !!row.categoryTwoId">编辑</el-button>
                                            <el-button size="mini" @click="navSubmit($index,row)" v-if="!!showBtn[$index] && !!row.categoryTwoId">保存</el-button>
                                            <el-button size="mini" @click="navOnOrout($index,row)">{{row.publishState == 2?'下线':'上线'}}</el-button>
                                            <el-button size="mini" @click="navDelete($index,row)" v-if="!!row.categoryTwoId">删除</el-button>
                                            <el-button size="mini" class="disable_btn" v-if="!!!row.categoryTwoId" disabled="true">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {getTopdata,changeTopstatus,deleteTop,getDispenseContent,
        loadIndustrySolution,loadAllNav,updateSolutionEnable,
        deleteSolution,addOrUpdateNav,loadAllCateList,updateNavEnable,
        deleteNav} from '@/service/getData'
export default {
    data(){
        return{
            topdata:'',
            topCategory:{},
            dispenseContent:{},
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
            firstCateList:[],
            industrySolutionList:[],
            solutionPageNum:1,
            solutionPageSize:10,
            solutionTotal:1,
            navigationList:[],
            navigation:{},
            navigationId:'',
            showEdit: [],
            showBtn: [],
            addFlag:false,
            cateTwoKeywords:[],
            mode:'add',
            categoryTwoId:'0',
        }
    },
    created(){
        this.init()
    },
    mounted(){
         for(var i = 0; i < this.navigationList.length; i ++) {
            this.showEdit[i] = false;
            this.showBtn[i] = false;
        }
        // 初始化行业解决方案二级类目
        loadAllCateList({}).then(res=>{
            if(res.data){
                this.firstCateList = res.data;
                for(var item of res.data){
                    if(item.categoryName == '行业解决方案'){
                        this.cateTwoKeywords = item.childrenList;
                        if(this.cateTwoKeywords.length > 0){
                            this.categoryTwoId = this.cateTwoKeywords[0]
                        }
                        break;
                    }
                }
            }
        })
    },
    methods:{
        // 初始化
        init(){
            let that=this
            let params={}
            getTopdata(params).then(res =>{
                that.topdata=res.data;
            }) 

            getDispenseContent(params).then(res =>{
                that.dispenseContent = res.data;
            })
            this.getIndustrySolution();
            this.getAllNav();
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
            this.$confirm('此操作将永久删除该楼层, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteTop({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.init()
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')         
            });
        },

        // 分发楼层上下线
        dispenseOnOrOut(row,index){
            let enable = Math.abs(row.enable-1);
            let params={
                id:row.id,
                enable:enable
            }
            changeTopstatus(params).then(res =>{
                this.init()
            })
        },

        // 分发楼层删除
        dispenseDelete(row,index){
            this.$confirm('此操作将永久删除该楼层, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteTop({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.init()
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')         
            });
        },

        // 改变分页显示数量
        handleSizeChange(){

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
        },

        // 分发楼层编辑
        dispenseUpdate(row,index){
            this.$store.commit('saveDispenseDetail',row)
            this.$router.push({
                path:'/distributeFloorDetail'
            })
        },

        // 查询行业解决方案列表
        getIndustrySolution(){
            let params = {
                categoryTwoId:this.categoryTwoId,
                pageNum:this.solutionPageNum,
                pageSize:this.solutionPageSize
            }
            loadIndustrySolution(params).then(res=>{
                if(res.code == 200){
                    this.industrySolutionList = res.data.dataList;
                    this.solutionTotal = res.data.totalCount;
                    if(this.solutionPageNum > res.data.totalPage && res.data.totalPage >1){
                        this.solutionPageNum = res.data.totalPage -1;
                        this.getIndustrySolution();
                    }else if(this.solutionPageNum > res.data.totalPage && res.data.totalPage == 1){
                        this.solutionPageNum = 1;
                        this.getIndustrySolution();
                    }
                }
            })
        },
        
        // 解决方案分页数量改变
        solutionSizeChange(pageSize){
            this.solutionPageSize = pageSize;
            this.getIndustrySolution();
        },

        // 解决方案跳转页数
        solutionCurrentChange(page){
            this.solutionPageNum = page;
            this.getIndustrySolution();
        },

        // 获取所有导航
        getAllNav(){
            loadAllNav({}).then(res=>{
                this.navigationList = res.data;
            })
        },

        // 解决方案编辑跳转
        solutionEdit(index,row){
            this.$store.commit('saveSolutionInfo',row);
            this.$router.push('/solutionDetail')
        },

        // 搜索解决方案
        filterSolution(){
            this.categoryTwoId = "0";
            for(var item of this.navigationList){
                if(this.navigationId == item.id){
                    this.categoryTwoId = item.categoryTwoId;
                }
            }
            this.getIndustrySolution();
        },

        // 解决方案上下线
        solutionOnOrOut(index,row){
            let enable = Math.abs(row.enable-1);
            let params = {
                id: row.id,
                enable: enable
            }
            updateSolutionEnable(params).then(res=>{
                if(res.code == 200){
                    this.getIndustrySolution();
                }
            })
        },

        // 解决方案删除
        solutionDelete(index,row){
            this.$confirm('此操作将永久删除该解决方案, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteSolution({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getIndustrySolution();
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')         
            });
        },
    
        navEdit(index,row){
            this.showEdit[index] = true;
            this.showBtn[index] = true;
            this.$set(this.showEdit,index,true)
            this.$set(this.showBtn,index,true)
            this.mode = 'edit';
        },

        // 保存导航
        navSubmit(index,row){
            if(!!!row.navigationName){
                this.$message.warning('请输入导航名称');
                return false;
            }
            if(!!!row.categoryTwoId){
                this.$message.warning('选择二级类目');
                return false;
            }
            if(!!!row.sort){
                this.$message.warning('请输入排序');
                return false;
            }
            let params = {
                id: row.id,
                navigationName:row.navigationName,
                categoryTwoId:row.categoryTwoId,
                sort: row.sort
            }
            addOrUpdateNav(params).then(res=>{
                if(res.code == 200){
                    if(this.mode == 'add'){
                        this.$message.success('添加成功')
                    }else{
                        this.$message.success('修改成功')
                    }
                    this.showEdit[index] = false;
                    this.showBtn[index] = false;
                    this.$set(this.showEdit,index,false)
                    this.$set(this.showBtn,index,false)
                    this.getAllNav();
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },

        // 导航上下线
        navOnOrout(index,row){
            if(row.publishState == 2){
                row.publishState = 3
            }else
            if(row.publishState == 3){
                row.publishState = 2
            }else{
                row.publishState = 2
            }
            let params = {
                id: row.id,
                publishState: row.publishState
            }
            updateNavEnable(params).then(res=>{
                if(res.code == 200){
                    this.getAllNav();
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },

        // 导航删除
        navDelete(index,row){
            this.$confirm('此操作将永久删除该导航, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteNav({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getAllNav();
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')         
            });
        },

         // 添加产品
        addNavigation(){
            this.mode = 'add';
            this.addFlag = true;
            this.navigationList.push(
                {
                    id:'',
                    categoryTwoId:this.categoryTwoId,
                    navigationName:'',
                    sort:'',
                    publishState:1
                })
            this.showEdit[this.navigationList.length-1] = true;
            this.showBtn[this.navigationList.length-1] = true;
            this.$set(this.showEdit,this.navigationList.length-1,true)
            this.$set(this.showBtn,this.navigationList.length-1,true)
        },
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
    .nav-input{
        width:100% !important;
    }
    .disable_btn{
        background:#999999!important;
        border:none!important;
    }
</style>

