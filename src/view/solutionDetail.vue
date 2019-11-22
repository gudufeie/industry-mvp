<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark solutionID" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">解决方案ID:</span>
                    <el-input class="status_type" v-model="input" placeholder="请输入内容"></el-input>
                    <router-link to="sloveDetail"><span>查看详情</span></router-link>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">解决方案名称<span class="star">*</span>:</span>
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
                    <span class="status_type title">封面<span class="star">*</span>:</span>
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
                    <span class="status_type title">导航菜单<span class="star">*</span>:</span>
                    <el-select v-model="firstCate" placeholder="请选择">
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
                    <span class="status_type title">是否推荐<span class="star">*</span>:</span>
                    <el-select v-model="firstCate" placeholder="请选择">
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
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">排序:</span>
                    <el-input 
                        class="status_type" 
                        v-model="input" >
                    </el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">最近更新时间:</span>
                    <span>111111</span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">概述:</span>
                    <span>111111</span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="text-align:center">
                    <el-button type="primary">保存</el-button>
                    <el-button @click="back">取消</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { regionData } from 'element-china-area-data';
import { VueEditor, Quill } from "vue2-editor";
import BusinessSearch from "./businessSerach";
import TagsAdd from "./tagsAdd"

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
            keyworkId:'',
            firstCateId:'',
            secondCateId:'',
            key:{},
            options: regionData ,
            selectedOptions: [],
            imageUrl:'',
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
    .el-button{
        width:120px;
    }
    .solutionID{
        .el-input{
            width:50%;
            margin-right: 20px;
        }
        span{
            color:#0b7a75;
            line-height: 40px;
        }
        span:hover{
            text-decoration:underline;
        }
    }
</style>