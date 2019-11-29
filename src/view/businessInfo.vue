<template>
    <div class="userinfo_detail">
        <div class="userinfo_top">
            <div class="detail_title">店铺信息</div>
            <div class="detail_content">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <span class="title">店铺名称 : </span>
                        <span class="tip-wrap">
                            <el-input 
                                @input="getShopName" 
                                v-model="storeName" 
                                placeholder="30个字以内"
                                maxlength="30"
                                show-word-limit></el-input>
                            <span class="tip">{{shopNameTip}}</span>
                        </span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <span class="title">入驻平台：</span>
                        <span>
                            <el-select v-model="settlein" placeholder="请选择">
                                <el-option
                                v-for="item in settleinList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </div>
                </el-col>
            </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="24">
                    <div class="grid-content bg-purple business-cate">
                        <span class="title">经营类目 : </span>
                        <el-button type="primary" size='mini' style="float:right;" @click="dialogVisible = true">编辑</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between" v-for="item in allCateList">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <span style="margin-right:20px;">{{item.categoryOneName}}(一级类目) : </span>
                        <span v-for="secondCate in item.childCategorys">{{secondCate.categoryOneName}}、</span>
                        <span>(二级类目)</span>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <p>
                            <span class="title">擅长 : </span>
                            <tags-add @getNewTags="getNewTags" :tags="special" :tagsId="special" style="display:inline-block;margin-left:28px;"></tags-add>
                        </p>
                    </div>
                </el-col>
            </el-row>
            <!-- <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <span class="title">联系方式 : </span>
                        <span>
                            <el-input 
                                class="phone-input"
                                placeholder="请输入手机号"
                                v-for="(phone,index) in phoneList" 
                                :key="index"   
                                v-model="phoneList[index]" >
                            </el-input>
                            <span @click="addPhone" class="phoneAdd_btn">新增</span>
                        </span>
                        <p class="phone-wrap" v-show="phoneShow">
                            <el-input class="phoneAdd-input" v-model="newPhone" placeholder="请输入手机号" @input="getPhone"></el-input>
                            <span class="phoneTip">{{phoneTip}}</span>
                            <span @click="determine" class="phoneAdd_btn" style="margin-right:10px;">确定</span>
                            <span @click="quitPhone" class="phoneAdd_btn">取消</span>
                        </p>
                    </div>
                </el-col>
            </el-row> -->
            <el-row  class="row-bg" justify="space-between">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <span class="title" style="line-height:120px;">店铺介绍 : </span> 
                        <el-input type="textarea" placeholder="请输入" cols="30" rows="5" v-model="storeProfile"></el-input>
                    </div>
                </el-col>
            </el-row>
            </div>
        </div>
        <!-- 发布的产品 -->
        <div class='keyword_search'>
            <div class="content_title">发布的产品
                <span style="float:right;margin-right:20px;">
                    <span>总量:&nbsp;{{productTotal}}&nbsp;;</span>
                    <span>出售中:&nbsp;{{productSell}}&nbsp;;</span>
                    <span>已下架:&nbsp;{{productOutline}}</span>
                </span>
            </div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="productList"
                    style="width: 100%"
                    border
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="id"
                    label="商品ID">
                    </el-table-column>
                    <el-table-column
                    label="商品图片">
                        <template slot-scope="{row,$index}">
                            <img v-if="!!!productShow[$index]" :src="row.productPic" alt="" style="height:100%;width:100%;">
                            <el-input v-if="!!productShow[$index]" v-model="row.productPic"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="商品标题">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!productShow[$index]">{{row.productName}}</span>
                            <el-input v-if="!!productShow[$index]" v-model="row.productName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="商品品牌">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!productShow[$index]">{{row.productSource}}</span>
                            <el-input v-if="!!productShow[$index]" v-model="row.productSource"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="商品描述">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!productShow[$index]">{{row.productDetail}}</span>
                            <el-input v-if="!!productShow[$index]" v-model="row.productDetail"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="商品价格">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!productShow[$index]">{{row.productPrice}}</span>
                            <el-input v-if="!!productShow[$index]" v-model="row.productPrice" @input="validatePrice(row.productPrice)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="发布时间">
                        <template slot-scope="{row}">
                            <span>{{row.releaseTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="管理"
                    width="210">
                        <template slot-scope="{row,$index}">
                            <el-button size="mini" @click="productEdit(row,$index)" v-if="!!!productBtnShow[$index]">编辑</el-button>
                            <el-button size="mini" @click="productEditOk(row,$index)" v-if="!!productBtnShow[$index]">确定</el-button>
                            <el-button size="mini" type="success" v-show="row.enabled == '0'" @click="productOnOutline(row,$index)">启用</el-button>
                            <el-button size="mini" v-show="row.enabled == '1'" style="background:#fff;color:#000;" @click="productOnOutline(row,$index)">下线</el-button>
                            <el-button size="mini" type="danger" @click="productDelete(row,$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 发布的服务 -->
        <div class='scan_serve'>
            <div class="content_title">发布的服务
                <span style="float:right;margin-right:20px;">
                    <span>总量:{{serviceTotal}};</span>
                    <span>出售中:{{serviceSell}};</span>
                    <span>已下架:{{serviceOutline}}</span>
                </span>
            </div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="serviceList"
                    style="width: 100%"
                    border
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="id"
                    label="服务ID">
                    </el-table-column>
                    <el-table-column
                    label="服务名称">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!serviceShow[$index]">{{row.serviceName}}</span>
                            <el-input v-if="!!serviceShow[$index]" v-model="row.serviceName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="服务描述">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!serviceShow[$index]">{{row.serviceDetail}}</span>
                            <el-input v-if="!!serviceShow[$index]" v-model="row.serviceDetail"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="价格">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!serviceShow[$index]">{{row.servicePrice}}</span>
                            <el-input v-if="!!serviceShow[$index]" v-model="row.servicePrice" @input="validatePrice(row.servicePrice)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="发布时间">
                        <template slot-scope="{row}">
                            <span>{{row.releaseTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="管理"
                    width="210">
                    <template slot-scope="{row,$index}">
                        <el-button size="mini" v-if="!!!serviceShow[$index]" @click="serviceEdit(row,$index)">编辑</el-button>
                        <el-button size="mini" v-if="!!serviceShow[$index]" @click="serviceEditOk(row,$index)">确定</el-button>
                        <el-button size="mini" type="success" v-show="row.enabled == '1'" @click="serviceOnOrOut(row,$index)">下线</el-button>
                        <el-button size="mini" v-show="row.enabled == '0'" style="background:#fff;color:#000;" @click="serviceOnOrOut(row,$index)">启用</el-button>
                        <el-button size="mini" type="danger" @click="serviceDelete(row,$index)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='scan_case'>
            <div class="content_title">发布的解决方案
                <span style="float:right;margin-right:20px;">
                    <span>总量:{{solutionTotal}};</span>
                    <span>出售中:{{solutionSell}};</span>
                    <span>已下架:{{solutionOutline}}</span>
                </span>
            </div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="solutionList"
                    style="width: 100%"
                    border
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="id"
                    label="方案ID">
                    </el-table-column>
                    <el-table-column
                    label="方案名称">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!solutionShow[$index]">{{row.solutionName}}</span>
                            <el-input v-if="!!solutionShow[$index]" v-model="row.solutionName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="方案描述">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!solutionShow[$index]">{{row.solutionDescription}}</span>
                            <el-input v-if="!!solutionShow[$index]" v-model="row.solutionDescription"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="方案报价">
                        <template slot-scope="{row,$index}">
                            <span v-if="!!!solutionShow[$index]">{{row.solutionPrice}}</span>
                            <el-input v-if="!!solutionShow[$index]" v-model="row.solutionPrice" @input="validatePrice(row.solutionPrice)"></el-input>
                            <span v-if="!!solutionShow[$index]">{{priceTip}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="发布时间">
                        <template slot-scope="{row}">
                            <span>{{row.releaseTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="管理"
                    width="210">
                        <template slot-scope="{row,$index}">
                            <el-button size="mini" v-if="!!!solutionBtnShow[$index]" @click="solutionEdit(row,$index)">编辑</el-button>
                            <el-button size="mini" v-if="!!solutionBtnShow[$index]" @click="solutionEditOk(row,$index)">确定</el-button>
                            <el-button size="mini" type="success" v-show="row.enabled == '1'" @click="solutionOnOrOut(row,$index)">启用</el-button>
                            <el-button size="mini" v-show="row.enabled == '0'" style="background:#fff;color:#000;" @click="solutionOnOrOut(row,$index)">下线</el-button>
                            <el-button size="mini" type="danger" @click="deleteSolution(row,$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="button_wrapper">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="backPrePage">取消</el-button>
        </div>

        <!-- 类目修改弹框 -->
        <el-dialog
            title="编辑类目"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="transfer">
                <div class="first-cate">
                    <p>一级类目</p>
                    <div>
                        <ul v-for="(firstCate,index) in firstCateList" :key=index>
                            <li>
                                <el-checkbox v-model="firstCheckedList[index]" @change="getFirstChecked(index)">{{firstCate.categoryName}}</el-checkbox>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="middle">
                    <i class="el-icon-caret-right"></i>
                </div>
                <div class="second-cate">
                    <p>二级类目</p>
                    <div>
                        <ul v-for="(secondCate,index) in secondCateList" :key=index>
                            <li>
                                <el-checkbox v-model="secondCheckedList[index]" @change="getSecondChecked(index)">{{secondCate.categoryName}}</el-checkbox>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitCate">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import TagsAdd from "./tagsAdd";
import { getBusinessInfo, getProductCount, updateProduct, loadPublishProduct,
        productOnOrOutline, productDelete, addStore, loadAllCateList, loadServiceList,
        getServiceCount, serviceOnOutline, deleteService, solutionOnOutline,
        solutionDelete, solutionCount, loadSolutionList, solutionUpdate, serviceUpdate,
        updateStore } from "../service/getData"

export default{
    data(){
        return{
            storeName:'',  //店铺名称
            shopNameTip:'',
            phoneTip:'',
            settlein:1, //是否入驻平台
            settleinList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            oldPhone:'',
            phoneList:['15222222222','15111111111','15633333333'],
            newPhone:'',   //手机号,
            phoneShow:false,    //添加手机号输入框是否显示
            storeProfile:'',   //店铺介绍
            contactList:[],
            dialogVisible:false,
            checked: true,
            firstCateList:[],
            secondCateList:[],
            firstCheckedList:[],
            secondCheckedList:[],
            firstSelected:[],
            secondSelected:[],
            productList:[],      //发布的产品
            serviceList:[],     //发布的服务
            solutionList:[],
            businessId:'',
            special:'',
            productShow:[],
            productBtnShow:[],
            serviceShow:[],
            serviceBtnShow:[],
            solutionShow:[],
            solutionBtnShow:[],
            productTotal:0,
            productSell:0,
            productOutline:0,
            serviceSell:0,
            serviceOutline:0,
            serviceTotal:0,
            solutionTotal:0,
            solutionSell:0,
            solutionOutline:0,
            priceTip:'',
            allCateList:[],
            parentCategorys:[],
            shopId:''
        }
    },
    props:{
        businessInfo:Object
    },
    mounted(){
        for(var i = 0; i < this.firstCateList.length; i ++) {
            this.firstCheckedList[i] = false;
        }

        // 获取供应商详细信息
        if(this.businessInfo){
            this.businessId = this.businessInfo.id;
            this.shopId = this.businessInfo.shopId;
            let params = {
                businessId: this.businessId,
                shopId: this.businessInfo.shopId
            }
            getBusinessInfo(params).then(res=>{
                if(!!res.data[0]){
                    this.storeName = res.data[0].storeName;
                    this.settlein =res.data[0].settlein;
                    this.storeProfile = res.data[0].storeProfile;
                    this.special = res.data[0].special;
                    this.allCateList = res.data[0].parentCategorys;
                }

            })
            this.getProductList();
            this.getProductCount();
            this.getServiceList();
            this.loadServiceCount();
            this.loadSolutionCount();
            this.getSolutionList();
            this.$store.commit('saveProviderInfo',"")
        }

        // 产品列表显示初始化
        for(var i = 0; i < this.productList.length; i ++) {
            this.productShow[i] = false;
            this.productBtnShow[i] = false;
        }

        // 服务列表显示初始化
        for(var i = 0; i < this.serviceList.length; i ++) {
            this.serviceShow[i] = false;
            this.serviceBtnShow[i] = false;
        }

        // 解决方案列表显示初始化
        for(var i = 0; i < this.serviceList.length; i ++) {
            this.solutionShow[i] = false;
            this.solutionBtnShow[i] = false;
        }

        this.getAllCate();
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },

        getAllCate(){
            // 获取所有类目，包括一级和二级
            loadAllCateList({}).then(res=>{
                this.firstCateList = res.data;
            })
        },

        // 产品出售/下架数量
        getProductCount(){
            getProductCount({businessId:this.businessId}).then(res=>{
                if(!!res.data){
                    this.productTotal = res.data.outCount + res.data.sellCount;
                    this.productSell = res.data.sellCount;
                    this.productOutline = res.data.outCount;
                }
            })
        },

        // 查询发布的产品列表
        getProductList(){
            let params = {
                businessId: this.businessId,
                publish:1,
                pageSize:10,
                pageNum:1
            }
            loadPublishProduct(params).then(res=>{
                if(res.data.dataList){
                    this.productList = res.data.dataList;
                }
            })
        },

        // 选择一级类目
        getFirstChecked(index){
            if(this.firstCheckedList[index] == true){
                this.firstSelected.push(this.firstCateList[index]);
                this.secondCateList = this.secondCateList.concat(this.firstCateList[index].childrenList)

            }else{
                var newList = [];
                for(var i in this.secondCateList){
                    if(this.secondCateList[i].parentId != this.firstCateList[index].id){
                        newList.push(this.secondCateList[i])
                    }
                }
                this.secondCateList = newList;
                for(let i in  this.firstSelected){
                    if(this.firstCateList[index] == this.firstSelected[i]){
                        this.firstSelected.splice(i,1)
                    }
                } 
            }
        },

        // 选择二级类目
        getSecondChecked(index){
            if(this.secondCheckedList[index] == true){
                this.secondSelected.push(this.secondCateList[index])
            }else{
                for(let i in  this.secondSelected){
                    if(this.secondCateList[index] == this.secondSelected[i]){
                        this.secondSelected.splice(i,1)
                    }
                } 
            }

        },
        
        // 提交类目
        submitCate(){
            for(var item of this.firstSelected){
                var firstCate = {
                    businessId: this.businessId,
                    bussinessShopId: this.shopId,
                    categoryOneId: item.id,
                    categoryOneName: item.categoryName,
                    childCategorys:[]
                }
                for(var secondCate of this.secondSelected){
                    var cateDict = {};
                    if(item.id == secondCate.parentId){
                        cateDict['categoryTwoId'] = secondCate.id;
                        cateDict['categoryOneName'] = secondCate.categoryName;
                        firstCate.childCategorys.push(cateDict);
                    }

                }
                this.parentCategorys.push(firstCate)
            }
            this.allCateList = this.parentCategorys;
            this.dialogVisible = false;
        },

        // 新增电话
        addPhone(){
            this.phoneShow = true;
        },

        // 取消添加联系方式
        quitPhone(){
            this.phoneShow = false;
        },

        // 确定添加联系方式
        determine(){
            this.phoneList.push(this.newPhone)
        },

        // 验证店铺名称
        getShopName(){
            if(!!!this.storeName.trim()){
                this.shopNameTip = "请输入店铺名称"
            }
        },
        
        // 保存修改信息
        save(){
            let params = {
                businessId: '1',
                id: this.shopId,
                parentCategorys: this.parentCategorys,
                settlein: this.settlein,
                special: this.special,
                storeName: this.storeName,
                storeProfile: this.storeProfile
            }
            if(!!this.businessId){
                 updateStore(params).then(res=>{
                    if(res.code == 200){
                        this.$message.success('修改成功');
                        this.getSolutionList();
                    }
                    else{
                        this.$message.warning('修改失败')
                    }
                })
            }else{
                 addStore(params).then(res=>{
                    if(res.code == 200){
                        this.$message.success('添加成功');
                        this.getSolutionList();
                    }
                    else{
                        this.$message.warning('添加失败')
                    }
                })
            }
        },

        // 取消返回上一页
        backPrePage(){
            this.$router.go(-1)
        },

        // 产品编辑
        productEdit(row,index){
            this.productShow[index] = true;
            this.productBtnShow[index]= true;
            this.$set(this.productShow,index,true)
            this.$set(this.productBtnShow,index,true)
        },

        //  产品确定添加
        productEditOk(row,index){
            this.productShow[index] = false;
            this.productBtnShow[index]= false;
            this.$set(this.productShow,index,false)
            this.$set(this.productBtnShow,index,false)
            row.productPic = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            updateProduct(row).then(res=>{
                if(res.code == 200){
                    this.$message.success('修改成功');
                    this.getProductList();
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },
        
        // 产品上下线
        productOnOutline(row,index){
            var enabled = 1;
            if(row.enabled == 1){
                enabled = 0;
            }else{
                enabled = 1;
            }
            productOnOrOutline({id:row.id,enabled:enabled}).then(res=>{
                if(res.code == 200){
                    row.enabled = enabled;
                    this.getProductCount();
                }
            })
        },

        // 产品删除
        productDelete(row,index){
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                productDelete({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getProductList();
                        this.getProductCount();
                    }else{
                        this.$message.warning('删除失败');
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        },

        // 服务编辑
        serviceEdit(row,index){
            this.serviceShow[index] = true;
            this.serviceBtnShow[index]= true;
            this.$set(this.serviceShow,index,true)
            this.$set(this.serviceBtnShow,index,true)
        },

        //  服务确定修改
        serviceEditOk(row,index){
            this.serviceShow[index] = false;
            this.serviceBtnShow[index]= false;
            this.$set(this.serviceShow,index,false)
            this.$set(this.serviceBtnShow,index,false)
            serviceUpdate(this.serviceList[index]).then(res=>{
                if(res.code && res.code == 200){
                    this.$message.success('修改成功');
                    this.getServiceList();
                }else{
                    this.$message.warning('修改失败')
                }
            })
        },
        
        // 服务上下线
        serviceOnOrOut(row,index){
            let params = {
                id: row.id,
                enabled: Math.abs(parseInt(row.enabled)-1)
            }
            serviceOnOutline(params).then(res=>{
                if(res.code == 200){
                    this.loadServiceCount();
                    this.getServiceList();
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },

        // 服务删除
        serviceDelete(row,index){
            this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteService({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getProductList();
                        this.getProductCount();
                    }else{
                        this.$message.warning('删除失败');
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        },

        // 获取解决方案列表
        getSolutionList(){
            let params ={
                businessId: this.businessId,
                pageNum: 1,
                pageSize:10,
                publish:1
            }
            loadSolutionList(params).then(res=>{
                if(res.data.dataList){
                    this.solutionList = res.data.dataList;
                }
            })
        },

        // 发布的解决方案数量统计
        loadSolutionCount(){
            solutionCount({businessId: this.businessId}).then(res=>{
                if(res.data){
                    this.solutionTotal = res.data.sellCount + res.data.outCount;
                    this.solutionSell = res.data.sellCount;
                    this.solutionOutline = res.data.outCount;
                }
            })
        },
   
        // 解决方案编辑
        solutionEdit(row,index){
            this.solutionShow[index] = true;
            this.solutionBtnShow[index]= true;
            this.$set(this.solutionShow,index,true)
            this.$set(this.solutionBtnShow,index,true)
        },

        //  解决方案确定修改
        solutionEditOk(row,index){
            this.solutionShow[index] = false;
            this.solutionBtnShow[index]= false;
            this.$set(this.solutionShow,index,false)
            this.$set(this.solutionBtnShow,index,false)
            solutionUpdate(this.solutionList[index]).then(res=>{
                if(res.code == 200){
                    this.$message.success('修改成功');
                    this.getSolutionList();
                }
                else{
                    this.$message.warning('修改失败')
                }
            })
        },
        
        // 解决方案上下线
        solutionOnOrOut(row,index){
            let params = {
                id: row.id,
                enabled: Math.abs(parseInt(row.enabled)-1)
            }
            solutionOnOutline(params).then(res=>{
                if(res.code == 200){
                    this.getSolutionList();
                    this.loadSolutionCount();
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },

        // 解决方案删除
        deleteSolution(row,index){
            this.$confirm('此操作将永久删除该解决方案, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                solutionDelete({id:row.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getProductList();
                        this.getProductCount();
                    }else{
                        this.$message.warning('删除失败');
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        },

        // 验证联系方式
        getPhone(){
            this.$rules.validateMobilePhone(this.newPhone.trim(),(data)=>{
                this.phoneTip = data;
            })
        },

        // 查询发布服务列表
        getServiceList(){
            let params = {
                businessId: this.businessId,
                pageSize:10,
                pageNum:1
            }
            loadServiceList(params).then(res=>{
                if(res.data.dataList){
                    this.serviceList = res.data.dataList;
                }
            })
        },

        // 查询发布服务的数量统计
        loadServiceCount(){
            getServiceCount({businessId: this.businessId}).then(res=>{
                if(res.data){
                    this.serviceTotal = res.data.outCount + res.data.sellCount;
                    this.serviceSell = res.data.sellCount;
                    this.serviceOutline = res.data.outCount;
                }
            })
        },

        // 验证价格
        validatePrice(price){
            this.$rules.validatePrice(price).then(res=>{
                this.priceTip = res;
            })
        },

        getNewTags(newTags,id){
            this.special = newTags;
            if(this.special.length > 0){
                this.special = this.special.substring(0,this.special.length - 1);
            }
        }
    },
    components:{
        TagsAdd
    }
}
</script>
<style lang="less" scoped>
    .userinfo_detail{
        font-size: 14px;
        .business-cate{
            margin-top: 10px;
        }
    }
    .keyword_search,.scan_serve,.scan_case,.scan_page,.collection,.user_login{
        background-color: #fff;
        padding: 15px 20px;
        margin-top: 20px;
    }
    .content_title{
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 8px;
        span{
            margin-left: 20px;
        }
    }
    .userinfo_top,.userinfo_middle{
    background: #fff;
    padding: 15px 20px;
    }
    .userinfo_middle{
    margin-top: 12px;
    }
    .detail_content {
        .el-row--flex{
            align-items: center;
            margin: 10px 0;
        }
        .el-input,.el-select{
            width: 70%;
        }
    }
    .detail_title {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 8px;
    }

    .button_wrapper{
        margin-top: 40px;
        text-align: center;
        .el-button{
            width: 120px;
        }
    }
    .el-dialog__wrapper /deep/ .el-dialog{
        width:50% !important;
    }
    .el-dialog__wrapper /deep/  .el-dialog__footer{
        text-align: center !important;
    }
    .el-dialog__wrapper /deep/ .el-dialog__headerbtn{
        display:none;
    }
    .el-dialog__wrapper /deep/ .el-dialog__header{
        text-align: center;
        border-bottom: 1px solid #cccccc !important;
        background-color: #f6f6f6;
    }
    .el-dialog__wrapper /deep/ .el-transfer-panel{
        width:42% !important;
    }
    .transfer{
        display: flex;
        .first-cate,.second-cate{
            flex:5;
            height: 300px;
            border:1px solid #cccccc;
            p{
                font-size:20px;
                line-height: 40px;
                font-weight: 600;
                background-color: #f6f6f6;
                text-align: center;
            }
            div{
                height: 240px;
                overflow-y:auto; 
                text-align: left;
                padding: 10px 20px;
                ul li{
                    line-height: 30px;
                }
            }
        }
        .middle{
            flex:1;
            display: flex;
            align-items: center;
            justify-content:center;
            font-size: 28px;
        }
    }
    .phone-input{
        width:20% !important;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .phoneAdd_btn{
        color:#0b7a75;
    }
    .phoneAdd_btn:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .phoneAdd-input{
        margin-left:67px;
        margin-top: 10px;
        width:50% !important;
        margin-right: 10px;
    }

    .tip-wrap{
        position:relative;
        .tip{
            position: absolute;
            right:0;;
            top: 30px;
            color:red;
            font-size: 12px;
            width:100%;
        }
    }
    .el-textarea{
        width:90%;
    }
    .phone-wrap{
         display:inline-block;
         position:relative;
         margin-bottom:20px;
    }
    .phoneTip{
        position: absolute;
        right: 40%;
        top: 95%;
        color:red;
    }
    .title{
        color:#999999;
    }
</style>
<style lang="less">

</style>