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
                    <el-select v-model="categoryOneId" clearable placeholder="请选择" @change="getFirstCateId">
                        <el-option            
                        v-for="item in firstCateList"
                        :key="item.id"
                        :label="item.categoryName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple search-bar">
                    <span>二级类目</span>
                    <el-select v-model="categoryTwoId" placeholder="请选择" clearable>
                        <el-option
                        v-for="item in secondCateList"
                        :key="item.id"
                        :label="item.categoryName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple search-bar">
                    <span>产品来源</span>
                    <el-select v-model="productOrigin" placeholder="请选择">
                        <el-option
                        v-for="item in productOriginList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="9">
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
                        prop="id"
                        label="产品ID"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        label="产品图片"
                        width="100">
                            <template slot-scope="{row}">
                                <img style="width:100%;height:100%" :src="row.productPic" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="productName"
                        label="产品名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="productPrice"
                        label="产品价格"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="categoryOneName"
                        label="一级类目"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="categoryTwoName"
                        label="二级类目">
                        </el-table-column>
                        <el-table-column
                        prop="keyWordName"
                        label="标签">
                        </el-table-column>
                        <el-table-column
                        prop="productSource"
                        label="产品来源"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="businessName"
                        label="商家名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        label="所在地"
                        width="120">
                            <template slot-scope="{row}">
                                {{row.province | getAddress}}{{row.city | getAddress}}{{row.area | getAddress}}{{row.address}}
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="releaseTime"
                        label="发布时间"
                        width="120">
                         <template slot-scope="{row}">
                             <span>{{row.releaseTime | formatDate}}</span>
                         </template>
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
                                <el-button size="mini" @click="handleOnOrOut(row)">{{row.enabled == 1?'下线':'启用'}}</el-button>
                                <el-button size="mini" @click="handleDelete(row)">删除</el-button>
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
import { CodeToText } from 'element-china-area-data';
import { loadAllCateList, loadProductList, productOnOrOutline, productDelete} from "@/service/getData"
export default {
    data(){
        return{
            pageNum:1,
            pageSize:10,
            pageTotal:1,
            searchName:'',
            value: '',
            tableData: [],
            fileList: [],
            firstCateList:[],
            secondCateList:[],
            categoryOneId:'',
            categoryTwoId:'',
            productOrigin:'',
            productOriginList:[{
                value: '',
                label: '全部'
                },{
                value: 1,
                label: '外部'
                }, {
                value: 2,
                label: '服务商发布'
                }, {
                value: 3,
                label: '人工采编'
                }]
        }
    },
    mounted(){
        this.getAllCate();
        this.getProductList();
    },
    filters:{
        getAddress(code){
            let address = '';
            if(code){
                address = CodeToText[code];
            }
            return address;
        }
    },
    methods:{
        // 改变分页页数
        handleSizeChange(){

        },
        
        // 跳转点击的页面
        handleCurrentChange(page){
            this.pageNum = page;
            this.getProductList();
        },

        // 搜索
        search(){
            let params = {
                categoryOneId: this.categoryOneId,
                categoryTwoId: this.categoryTwoId,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                productSource: this.productOrigin,
                proudctKeyWord: this.searchName
            }
            loadProductList(params).then(res=>{
                if(res.data.dataList){
                    this.tableData = res.data.dataList;
                    this.pageTotal = res.data.totalCount;
                }
            })
        },

        // 获取所有类目，包括一级和二级
        getAllCate(){
            loadAllCateList({}).then(res=>{
                this.firstCateList = res.data;
            })
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
        },

        // 查询产品库列表
        getProductList(){
            let params = {
                categoryOneId: "",
                categoryTwoId: "",
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                productSource: "",
                proudctKeyWord: ""
            }
            loadProductList(params).then(res=>{
                if(res.data.dataList){
                    this.tableData = res.data.dataList;
                    this.pageTotal = res.data.totalCount;
                }
            })
        },

        // 编辑跳转
        handleView(row){
            this.$store.commit('saveProductInfo',row);
            this.$router.push({
                path:'/productDetail',
            })
        },

        // 产品上下线
        handleOnOrOut(row){
            let enabled = Math.abs(row.enabled-1);
            let params ={
                id: row.id,
                enabled:enabled
            }
            productOnOrOutline(params).then(res=>{
                if(res.code == 200){
                    this.getProductList();
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },

        handleDelete(row){
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                productDelete({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getProductList();
                    }else{
                        this.$message.warning(res.msg)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        // 添加产品
        addProduct(){
            this.$router.push({
                name:'productDetail'
            })
        },

        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePreview(file) {
            // console.log(file);
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
     .el-table td, .el-table th{
         text-align: center !important;
    }
</style>

