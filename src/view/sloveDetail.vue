<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">解决方案ID:</span>
                    <span class="status_type">123456</span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">方案首图:<span class="star">*</span>:</span>
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="url"
                        :fit="fit">
                    </el-image>
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">方案名称:<span class="star">*</span>:</span>
                    <el-input 
                        class="status_type" 
                        v-model="input" 
                        placeholder="30个字以内"
                        maxlength="30"
                        show-word-limit>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">方案报价:<span class="star">*</span>:</span>
                    <el-input class="status_type" v-model="input" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">二级类目<span class="star">*</span>:</span>
                    <el-select v-model="firstCate" placeholder="请选择二级类目">
                        <el-option
                        v-for="item in firstCateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">标签:</span>
                    <span class="status_type">
                        <tags-add></tags-add>
                    </span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">产品来源:</span>
                    <el-select v-model="productOrigin">
                        <el-option
                        v-for="item in originList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12" :offset="6" v-if="productOrigin == 1">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">发布人:</span>
                    <el-input class="status_type" v-model="input" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6" v-if="productOrigin == 2">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">商家ID:</span>
                    <el-input class="status_type" v-model="input" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6" v-if="productOrigin == 2">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">商家名称<span class="star">*</span>:</span>
                    <business-search style="width:80%;"></business-search>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">发布人所在地:</span>
                    <el-cascader
                        size="large"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader><br/>
                </div>
                <div class="grid-content bg-purple-dark" style="text-align:right;">
                    <el-input style="width:77%" v-model="input" placeholder="请输入详细地址"></el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">真实浏览数:</span>
                    <span style="width:80%;line-height:40px;">
                        <span style="width: 35%;display: inline-block;">123</span>
                        <span>前台浏览数:</span>
                        <el-input style="width:40%;float:right" v-model="input" placeholder="请输入"></el-input>
                    </span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">发布时间:</span>
                    <span class="status_type">123456</span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark status" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">是否启用:</span>
                    <el-select v-model="status" placeholder="请选择二级类目">
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
                <div class="grid-content bg-purple-dark hrefType" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">跳转类型:</span>
                    <span class="status_type">
                        <el-select v-model="hrefType" placeholder="请选择二级类目" style="width:30%" @change="linkChange">
                            <el-option
                            v-for="item in hrefTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-show="defaultLink == 2" v-model="input" placeholder="请填写html地址"></el-input>
                    </span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">方案概述:</span>
                    <el-input 
                        class="status_type" 
                        type="textarea" 
                        :rows='6' 
                        v-model="input" 
                        placeholder="100个字以内"
                        maxlength="100"
                        show-word-limit>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="18" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type detail">产品详情:</span>
                    <span class="status_type">
                        <vue-editor v-model="content" @blur="getDetail"></vue-editor>
                    </span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="text-align:center">
                    <el-button type="primary">保存</el-button>
                    <el-button type="primary">确认发布</el-button>
                    <el-button @click="back">取消</el-button>
                    <el-button>删除</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { regionData } from 'element-china-area-data';
import { VueEditor, Quill } from "vue2-editor";
import BusinessSearch from "./businessSerach";
import TagsAdd from "./tagsAdd";

export default{
    data(){
        return{
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
            firstCate:'',
            secondCate:'',
            updateTime:'',
            statusList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            relationName:'',
            keyWordRelationname:[],
            relateKeywordList:[],
            keyworkId:'',
            firstCateId:'',
            secondCateId:'',
            key:{},
            hrefType:1,
            hrefTypeList:[
                {label:'固定链接',value:1},
                {label:'默认(有联系方式跳转详情,无联系方式跳转站外)',value:2}
            ],
            dialogVisible:false,
            options: regionData ,
            selectedOptions: [],
            productOrigin:1,    //产品来源
            originList:[
                {label:'服务商发布',value:1},
                {label:'人工采编',value:2}
            ],
            imageUrl:'',
            defaultLink:false,
            tagDialogVisible:false
        }
    },
    components:{
        VueEditor,
        BusinessSearch,
        TagsAdd
    },
    methods:{
        handleClose(tag) {
            this.relateKeywordList.splice(this.relateKeywordList.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.relateKeywordList.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        handleChange (value) {
            console.log(value)
        },

        // 获取富文本框内容
        getDetail(){
            console.log('ooooo',this.content)
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
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
            // }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        linkChange(){
            console.log('00000000')
            this.defaultLink = this.hrefType
        },

        // 查询标签
        getTag(){

        }
    }
}
</script>
<style lang="less" scoped>
    .main-wrap{
        font-size: 14px;
        padding:10px;
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
        .el-input,.el-select,.el-textarea{
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
    .button-new-tag{
        color:#0b7a75;
    }
</style>