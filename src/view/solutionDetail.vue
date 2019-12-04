<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6" v-if="mode == 'edit'">
                <div class="grid-content bg-purple-dark solutionID" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">解决方案ID:</span>
                    <span>{{solutionDetail.id}}</span>
                    <router-link to="sloveDetail"><span @click="toSloveDetail" class='viewDetail'>查看详情</span></router-link>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">解决方案名称<span class="star">*</span>:</span>
                    <el-input
                        ref='name' 
                        class="status_type" 
                        v-model="solutionDetail.solutionName" 
                        placeholder="30个字以内"
                        maxlength="30"
                        show-word-limit
                        @blur="getName">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">封面<span class="star">*</span>:</span>
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="solutionDetail.solutionPic"
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
                    <el-select v-model="solutionDetail.navigationMenu" placeholder="请选择" @change="getNavId">
                        <el-option
                        v-for="(item,index) in navigationList"
                        :key="index"
                        :label="item.navigationName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">是否推荐<span class="star">*</span>:</span>
                    <el-select v-model="solutionDetail.recommend" placeholder="请选择">
                        <el-option
                        v-for="item in recommendList"
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
                    <el-select v-model="solutionDetail.enable" placeholder="请选择">
                        <el-option
                        v-for="item in enableList"
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
                        v-model="solutionDetail.sort" >
                    </el-input>
                </div>
            </el-col>
            <el-col :span="12" :offset="6" v-if="solutionDetail.id">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">最近更新时间:</span>
                    <span>{{updateTime}}</span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6" v-if="solutionDetail.id">
                <div class="grid-content bg-purple-dark" style="display:flex;justify-content:flex-start">
                    <span class="status_type title">概述:</span>
                    <span>{{solutionDetail.description}}</span>
                </div>
            </el-col>
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple-dark" style="text-align:center">
                    <el-button @click="save" type="primary">保存</el-button>
                    <el-button @click="back">取消</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {addSolution,loadAllNav,updateSolution,loadNavSort} from '@/service/getData'

export default{
    data(){
        return{
            fit:'',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            enableList:[
                {label:'是',value:1},
                {label:'否',value:0}
            ],
            recommendList:[
                {label:'人工推荐',value:1},
                {label:'系统推荐',value:2},
                {label:'否',value:0}
            ],
            imageUrl:'',
            solutionDetail:{
                description: '',
                enable:'',
                id: '',
                navigationMenu: '',
                recommend: '',
                solutionName: '',
                solutionPic:'',
                sort: '',
                categoryTwoId:'',
                solutionSortId:''
            },
            mode:'add',
            navigationList:[],
            updateTime:'',
            navigationName:''
        }
    },
    computed:{
        solutionInfo(){
            return this.$store.state.solutionInfo;
        }
    },
    mounted(){
        if(this.solutionInfo.id){
            this.mode = 'edit';
            this.solutionDetail = {
                description:this.solutionInfo.description,
                enable:this.solutionInfo.enable,
                id: this.solutionInfo.id,
                navigationMenu: this.solutionInfo.navigationMenu,
                recommend: this.solutionInfo.recommend,
                solutionName: this.solutionInfo.solutionName,
                solutionPic:this.solutionInfo.solutionPic,
                sort: this.solutionInfo.sort
            }
            this.updateTime = this.solutionInfo.createTime;
             this.$store.commit('saveSolutionInfo','');
        }
        this.getAllNav();
    },
    methods:{
        // 获取所有导航
        getAllNav(){
            loadNavSort({}).then(res=>{
                this.navigationList = res.data;
            })
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

        getName(){
            if(!!!this.solutionDetail.solutionName){
                this.$message.warning('请填写解决方案名称');
                this.$refs.name.blur();
                return false;
            }
        },

        // 新增或修改解决方案
        save(){
            if(!!!this.solutionDetail.navigationMenu){
                this.$message.warning('请选择导航菜单');
                return false;
            }
            this.solutionDetail.solutionPic = this.url;
            if(this.mode == 'edit'){
                updateSolution(this.solutionDetail).then(res=>{
                    if(res.code == 200){
                        this.$message.success('修改成功')
                        this.$router.push('/home');
                    }
                    else{
                        this.$message.warning('修改失败')
                    }
                })
            }else{
                addSolution(this.solutionDetail).then(res=>{
                    if(res.code == 200){
                        this.$message.success('添加成功')
                        this.$router.push('/home');
                    }
                    else{
                        this.$message.warning('添加失败')
                    }
                })
            }
        },

        toSloveDetail(){
            this.$store.commit('saveSolutionInfo',this.solutionDetail)
        },

        // 通过选择导航获取相应二级类目ID
        getNavId(){
            for(var item of this.navigationList){
                if(item.id == this.solutionDetail.navigationMenu){
                    this.solutionDetail.solutionSortId = this.solutionDetail.navigationMenu;
                    this.solutionDetail.navigationMenu = item.navigationName;
                    this.solutionDetail.categoryTwoId = item.categoryTwoId;
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
            line-height: 40px;
            display: inline-block;
            width: 40%;
        }
        .viewDetail{
            color:#0b7a75;
        }
        span:hover{
            text-decoration:underline;
        }
        a{
            width:30%;
            text-align:right;
        }
    }
</style>