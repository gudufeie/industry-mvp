<template>
    <div class="main-wrap">
        <form action=""  method="post" enctype="multipart/form-data">
            <el-row :gutter="20">
                <el-col :span="12" :offset="6" v-if="idShow">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">服务ID:</span>
                        <span>{{serviceDetailInfo.id}}</span>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">服务首图<span class="star">*</span>:</span>
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="serviceDetailInfo.servicePic"
                            :fit="fit">
                        </el-image>
                        <el-upload
                            ref = 'upload'
                            class="avatar-uploader"
                            action="no"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :on-change="addFile"
                            :http-request="uploadOk"
                            :auto-upload="false">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">服务名称<span class="star">*</span>:</span>
                        <el-input 
                            class="status_type" 
                            v-model="serviceDetailInfo.serviceName" 
                            placeholder="30个字以内"
                            maxlength="30"
                            show-word-limit>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark price">
                        <span class="status_type title">服务价格<span class="star">*</span>:</span>
                        <el-input class="status_type" v-model="serviceDetailInfo.servicePrice" placeholder="请输入价格" @input="getPrice"></el-input>
                        <span class="tipSpan">{{priceTip}}</span>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">一级类目<span class="star">*</span>:</span>
                        <el-select v-model="serviceDetailInfo.categoryOneId" placeholder="请选择一级类目" @change="getFirstCateId">
                            <el-option
                            v-for="(item,index) in firstCateList"
                            :key="index"
                            :label="item.categoryName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">二级类目<span class="star">*</span>:</span>
                        <el-select v-model="serviceDetailInfo.categoryTwoId" placeholder="请选择二级类目" @change="getSecondCate">
                            <el-option
                            v-for="(item,index) in secondCateList"
                            :key="index"
                            :label="item.categoryName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">标签:</span>
                        <span class="status_type" style="width:80%">
                            <tags-add @getNewTags="getNewTags" :tags="serviceDetailInfo.keyWordName" :tagsId="serviceDetailInfo.keyWordId"></tags-add>
                        </span>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">商家ID:</span>
                        <el-input 
                            class="status_type" 
                            v-model="serviceDetailInfo.businessId" 
                            @blur="getbusiness" 
                            @keyup.enter.native="getbusiness"
                            placeholder="请输入内容">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">商家名称<span class="star">*</span>:</span>
                        <business-search @getName="getName" @getBusiness='businessSelect' :businessName="serviceDetailInfo.businessName" style="width:80%;"></business-search>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">所在地:</span>
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader><br/>
                    </div>
                    <div class="grid-content bg-purple-dark" style="text-align:right;">
                        <span class="status_type title"></span>
                        <el-input style="width:77%" v-model="serviceDetailInfo.address" placeholder="请输入详细地址"></el-input>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type title">发布时间:</span>
                        <span class="status_type">{{serviceDetailInfo.releaseTime}}</span>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark status">
                        <span class="status_type title">是否启用:</span>
                        <el-select v-model="serviceDetailInfo.enabled" placeholder="请选择二级类目">
                            <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark hrefType">
                        <span class="status_type title">跳转类型:</span>
                        <span class="status_type">
                            <el-select v-model="serviceDetailInfo.forwardType" style="width:30%" @change="linkChange">
                                <el-option
                                v-for="item in hrefTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-show="serviceDetailInfo.forwardType == 2" v-model="serviceDetailInfo.forwardUrl" placeholder="请填写html地址"></el-input>
                        </span>
                    </div>
                </el-col>
                <el-col :span="18" :offset="6">
                    <div class="grid-content bg-purple-dark">
                        <span class="status_type detail">服务详情:</span>
                        <span class="status_type">
                            <vue-editor v-model="serviceDetailInfo.serviceDetail" @blur="getDetail"></vue-editor>
                        </span>
                    </div>
                </el-col>
                <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple-dark" style="text-align:center">
                        <el-button type="primary" @click="save">保存</el-button>
                        <el-button type="primary" @click="publish">确认发布</el-button>
                        <el-button @click="back">取消</el-button>
                        <el-button v-if="mode == 'edit'" @click="serviceDelete">删除</el-button>
                    </div>
                </el-col>
            </el-row>
        </form>
    </div>
</template>
<script>
import { regionData } from 'element-china-area-data';
import { VueEditor, Quill } from "vue2-editor";
import BusinessSearch from "./businessSerach";
import TagsAdd from "./tagsAdd";
import { loadAllCateList, searchBusiness, loadServiceDetail, serviceAdd,
        serviceEdit, uploadPicture } from "@/service/getData"

export default{
    data(){
        return{
            serviceDetailInfo:{
                address: "",
                area: "",
                businessId: "",
                businessName: "",
                categoryOneId: "",
                categoryOneName: "",
                categoryTwoId: "",
                categoryTwoName: "",
                city: "",
                enabled: 0,
                forwardType: "",
                forwardUrl: "",
                id: "",
                keyWordId: "",
                keyWordName: "",
                province: "",
                publish: 0,
                releaseTime: "",
                serviceDetail: "",
                serviceName: "",
                servicePic: "",
                servicePrice: ''
            },
            priceTip:'',
            content: "",
            fit:'',
            input:'',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            name: '',
            status:1,
            relateKeywordList:[],
            inputVisible: false,
            inputValue: '',
            firstCateList:[],
            secondCateList:[],
            updateTime:'',
            statusList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            relationName:'',
            keyWordRelationname:[],
            keyworkId:'',
            key:{},
            hrefTypeList:[
                {label:'固定链接',value:1},
                {label:'默认(有联系方式跳转详情,无联系方式跳转站外)',value:2}
            ],
            options: regionData ,
            selectedOptions: [],
            imageUrl:'',
            defaultLink:false,
            tagDialogVisible:false,
            idShow:false,
            mode:'add'
        }
    },
    components:{
        VueEditor,
        BusinessSearch,
        TagsAdd
    },
    computed:{
        serviceInfo(){
            return this.$store.state.serviceInfo;
        }
    },
    mounted(){
        if(!!this.serviceInfo.id){
            this.mode = 'edit';
            this.idShow = true;
            this.getServiceDetail(this.serviceInfo.id);
            this.$store.commit('saveServiceInfo','')
        }
        this.getAllCate();
    },
    methods:{
        // 获取选择的地区
        handleChange (value) {
            this.serviceDetailInfo.province = value[0];
            this.serviceDetailInfo.city = value[1]
            this.serviceDetailInfo.area = value[2]
        },
        // 获取所有类目，包括一级和二级
        getAllCate(){
            loadAllCateList({}).then(res=>{
                this.firstCateList = res.data;
                if(!!this.serviceDetailInfo.categoryOneId){
                    for(var item of this.firstCateList){
                        if(item.id == (this.serviceDetailInfo.categoryOneId).toString()){
                            this.secondCateList = item.childrenList;
                            break;
                        }
                    }
                }
            })
        },

        // 获取一级类目ID
        getFirstCateId(){
            for(var item of this.firstCateList){
                if(item.id == this.serviceDetailInfo.categoryOneId){
                    this.serviceDetailInfo.categoryOneName = item.categoryName;
                    this.serviceDetailInfo.categoryTwoId = '';
                    this.secondCateList = item.childrenList;
                    break;
                }
            }
        },

        // 获取二级类目
        getSecondCate(){
            for(var item of this.secondCateList){
                if(item.id == this.serviceDetailInfo.categoryTwoId){
                    this.serviceDetailInfo.categoryTwoName = item.categoryName;
                    break;
                }
            }
        },

        getServiceDetail(id){
            loadServiceDetail({id:id}).then(res=>{
                this.serviceDetailInfo = res.data;
                this.selectedOptions=[this.serviceDetailInfo.province,this.serviceDetailInfo.city,this.serviceDetailInfo.area]
            })
        },

        // 获取富文本框内容
        getDetail(){
            // console.log('ooooo',this.content)
        },

        // 返回上一页
        back(){
            this.$router.go(-1);
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 < 30;

            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 30k!');
            }
            return isJPG && isLt2M;
        },
        linkChange(){
            this.defaultLink = this.hrefType
        },

        // 查询标签
        getTag(){

        },

        // 修改和删除服务
        save(){
            if(!this.serviceDetailInfo.servicePic){
                this.serviceDetailInfo.servicePic = this.url;
            }
            if(this.serviceDetailInfo.id){
                serviceEdit(this.serviceDetailInfo).then(res=>{
                    if(res.code == 200){
                        this.$message.success('修改成功');
                        this.$router.push({
                            path:'/service'
                        })
                    }else{
                        this.$message.warning(res.msg)
                    }
                })
            }else{
                serviceAdd(this.serviceDetailInfo).then(res=>{
                    if(res.code == 200){
                        this.$message.success('添加成功');
                        this.$router.push({
                            path:'/service'
                        })
                    }else{
                        this.$message.warning(res.msg)
                    }
                })
            }
        },
        
        // 确认发布
        publish(){
            this.serviceDetailInfo.publish = 1;
            this.save();
        },

        serviceDelete(){
            this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteService({id:this.serviceDetailInfo.id}).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.$router.push('/service')
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')         
            });
        },

        // 验证价格
        getPrice(){
            this.$rules.validatePrice(this.serviceDetailInfo.servicePrice,(data)=>{
                this.priceTip = data;
            })
        },

        // 利用商户ID获取商户信息
        getbusiness(){
            let params ={
                id:this.serviceDetailInfo.businessId,
                businessName:''
            }
            searchBusiness(params).then(res=>{
                this.serviceDetailInfo.businessName = res.data[0].businessName;
            })
        },

        getName(name){
            this.serviceDetailInfo.businessName = name;
        },

        // 服务商选择
        businessSelect(business){
            this.serviceDetailInfo.businessName = business.value;
            this.serviceDetailInfo.businessId = business.id;
        },

        // 获取标签
         getNewTags(newTags,id){
            this.serviceDetailInfo.keyWordName = newTags;
            this.serviceDetailInfo.keyWordId = id;
            if(this.serviceDetailInfo.keyWordName.length > 0){
                this.serviceDetailInfo.keyWordName = this.serviceDetailInfo.keyWordName.substring(0,this.serviceDetailInfo.keyWordName.length - 1);
                this.serviceDetailInfo.keyWordId = this.serviceDetailInfo.keyWordId.substring(0,this.serviceDetailInfo.keyWordId.length - 1);
            }
        },

        addFile(file){
            this.$refs.upload.submit();
        },

        uploadOk(val){
            let formData = new FormData();
            formData.append('excelFile',val.file);
            formData.append('mark',2);
            formData.append('oldpath',this.serviceDetailInfo.servicePic);
            uploadPicture(formData).then(res=>{
                if(res.code == 200){
                    this.$message.success('上传成功');
                    this.serviceDetailInfo.servicePic = res.data;
                }else{
                    this.$message.warning(res.msg)
                }
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
    .grid-content{
        display:flex;
        justify-content:flex-start;
    }
    .price{
        position:relative;
        .tipSpan{
            position:absolute;
            top: 48px;
            left: 120px;
            color:red;
        }
    }
    .status_type{
        display: inline-block; 
    }
    .grid-content{
        padding-top: 10px;
        padding-bottom: 10px;
        .title{
            text-align: right;
        }
        .el-input,.el-select{
            width:80%;
        }
        .title{
            width: 20%;
            margin-right:20px;
            display: flex;
            align-items: center;
            
        }
        .detail{
            width: 20%;
            display: flex;
            align-items: center;
        }
        .quillWrapper{
            background-color: #fff;
        }
    }
    .hrefType .el-select{
        width:40% !important;
    }
    .hrefType .el-input{
        width:60% !important;
    }
    .newBussiness{
        width: 80px;
        position: absolute;
        right: 17%;
        line-height: 40px;
        color: #0b7a75;
    }
    .newBussiness:hover{
        cursor: pointer;
    }
    .el-dialog__wrapper{
        text-align: center;
    }
    .el-dialog__wrapper /deep/  .el-dialog__footer{
        text-align: center !important;
    }
    .el-dialog__wrapper /deep/ .el-dialog__headerbtn{
        display:none;
    }
    .el-link{
        color:#0b7a75;
    }
    .el-dialog__wrapper /deep/ .el-dialog__header{
        border-bottom: 1px solid #cccccc !important;
    }
    .name{
        line-height: 60px;
        span{
            margin-right: 10px;
        }
        .el-input{
            width:70%;
        }
    }
    .el-cascader{
        width:80%;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: #fff;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .star{
        color:red;
        position: relative;
        top:2px;
    }
    
</style>