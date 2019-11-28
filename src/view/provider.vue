<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple search-bar" style="text-align:right;">
                    <el-button @click="addProviderDetail" type="primary">新增服务商</el-button>
                    <el-button type="primary">导入服务商</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>类&nbsp;&nbsp;&nbsp;型</span>
                    <el-select v-model="businessType" placeholder="请选择">
                        <el-option
                        v-for="item in businessTypeList"
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
                    <el-select v-model="categoryOneId" placeholder="请选择" clearable @change="getFirstCateId">
                        <el-option
                        v-for="item in firstCateList"
                        :key="item.id"
                        :label="item.categoryName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>二级类目</span>
                    <el-select v-model="categoryTwoId" clearable placeholder="请选择">
                        <el-option
                        v-for="item in secondCateList"
                        :key="item.id"
                        :label="item.categoryName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple search-bar">
                    <span>提供服务</span>
                    <el-select v-model="isService" placeholder="请选择">
                        <el-option
                        v-for="item in serviceList"
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
                    <el-select v-model="isSolution" placeholder="请选择">
                        <el-option
                        v-for="item in solutionList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple search">
                    <el-input v-model="businessKeyWord" placeholder="id/联系电话/店铺名称/用户名" style="width:80%"></el-input>
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
                        prop="id"
                        label="服务商ID"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="storeName"
                        label="店铺名称"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="businessType"
                        label="类型"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="联系人"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="所在地"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="categoryOneName"
                        label="一级类目">
                        </el-table-column>
                        <el-table-column
                        prop="categoryTwoName"
                        label="二级类目">
                        </el-table-column>
                        <el-table-column
                        prop="special"
                        label="标签"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="serviceCount"
                        label="服务数"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="solutionCount"
                        label="解决方案数"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        label="管理"
                        width="80">
                        <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="toProviderDetail(scope.$index, scope.row)">查看</el-button>
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
import { loadBusinessList, loadFirstCateList, loadAllCateList, searchBusiness } from "../service/getData"
export default {
    data(){
        return{
            businessKeyWord:'',      //查询搜索内容
            businessTypeList:[
                {label:'全部',value:''},
                {label:'企业',value:1},
                {label:'个人',value:2},
            ],
            businessType:'',        //服务商类型
            categoryOneId:'',       //一级类目ID
            firstCateList:[],
            categoryTwoId:'',
            secondCateList:[],
            isService:'',
            serviceList:[
                {label:'全部',value:''},
                {label:'是',value:1},
                {label:'否',value:0},
            ],
            isSolution:'',
            solutionList:[
                {label:'全部',value:''},
                {label:'是',value:1},
                {label:'否',value:0},
            ],
            pageNum:1,
            pageSize:10,
            pageTotal:1,
            value: '',
            tableData: []
        }
    },
    mounted(){
        this.getBusinessList();

        // 获取所有类目，包括一级和二级
        loadAllCateList({}).then(res=>{
            this.firstCateList = res.data;
        })
    },
    methods:{
        // 更改分页数量
        handleSizeChange(){

        },

        // 换页
        handleCurrentChange(page){
            this.pageNum = page;
            this.getBusinessList();
        },
        // 查询服务商库列表
        getBusinessList(){
            let params = {
                businessKeyWord: this.businessKeyWord,
                businessType: this.businessType,
                categoryOneId: this.categoryOneId,
                categoryTwoId: this.categoryTwoId,
                isService: this.isService,
                isSolution: this.isSolution,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            loadBusinessList(params).then(data=>{
                this.pageSize = data.data.pageSize;
                this.pageTotal = data.data.totalCount;
                this.tableData = data.data.dataList;
            })
        },  
        // 查看服务商详情
        toProviderDetail(index,row){
            this.$store.commit('saveProviderInfo',row);  //保存服务商信息
            this.$router.push({
                path:'/userinfo',
                query:{
                    activeIndex:'4'
                },
            })
        },

        // 添加服务商
        addProviderDetail(){
            this.$router.push({
                path:'/userinfo',
                query:{
                    activeIndex:'4'
                },
            })
        },
        
        // 搜索
        search(){
            this.getBusinessList();
        },

        // 获取一级类目ID
        getFirstCateId(){
            for(var item of this.firstCateList){
                if(item.id == (this.categoryOneId).toString()){
                    this.categoryTwoId = '';
                    this.secondCateList = item.childrenList;
                    break;
                }
            }
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

