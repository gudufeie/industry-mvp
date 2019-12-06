<template>
    <div>
        <el-tag
            :key="index"
            v-for="(tag,index) in tagsList"
            closable
            color='#fff'
            type = 'info'
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-button class="button-new-tag" size="small" @click="showInput">新增标签 +</el-button>
        <div class="newTagWarp">
            <el-input
                class="input-new-tag" 
                v-model="tagName" 
                size="small" 
                v-show="inputVisible"
                placeholder="10个字以内"
                maxlength="10"
                show-word-limit
                @blur="getTag"
                @keyup.enter.native="getTag">
            </el-input>
            <span class="newTag"  v-show="haveTags" style="margin-left:20px;" @click="newTags">新增标签</span>
            <span class="newTag cancel" v-show="inputVisible" style="margin-left:20px;" @click="cancle">取消</span>
        </div>
        <div class="tagsExist" v-show="inputVisible">
            <el-tag
                :key="index"
                v-for="(tag,index) in tagsExist"
                color='#fff'
                type = 'info'
                :disable-transitions="false"
                @click.native="getExistTags(tag)">
                {{tag.keyWordName}}
            </el-tag>
        </div>

        <!-- 新增标签 -->
        <el-dialog
            title="请选择标签关联的类目"
            :visible.sync="tagDialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="name">
                <span>一级类目<span class="star">*</span></span>
                <el-select v-model="firstCate" placeholder="请选择一级类目" @change="getFirstCate">
                    <el-option
                    v-for="(item,index) in firstCateList"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="name">
                <span>二级类目<span class="star">*</span></span>
                <el-select v-model="secondCate" placeholder="请选择二级类目" @change="getSecondCate">
                    <el-option
                    v-for="(item,index) in secondCateList"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addTag">确 定</el-button>
                <el-button @click="tagDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { searchTag, loadAllCateList, tagsAdd} from "@//service/getData"
    export default{
        data(){
            return {
                tagsList:[],
                tagsExist:[],
                tagName:'',
                inputVisible:false,
                tagDialogVisible:false,
                firstCateList:[],
                firstCate:'',
                secondCateList:[],
                secondCate:'',
                haveTags:false,
                firstCateName:'',
                secondCateName:'',
                tagsIdList:[]
            }
        },
        props:{
            tags:String,
            tagsId:String
        },
        watch:{
            tags(){
                if(this.tags){
                    this.tagsList = this.tags.split(',');
                    for(var tag of this.tagsList){
                        if(tag == ''){
                            this.tagsList.remove(tag)
                        }
                    }
                }
                if(this.tagsId){
                    this.tagsIdList = this.tagsId.split(',')
                    for(var tagId of this.tagsIdList){
                        if(tagId == ''){
                            this.tagsIdList.remove(tagId)
                        }
                    }
                }
            },
        },
        mounted(){
            this.getAllCate();
        },
        methods:{
            handleClose(tag) {
                this.tagsList.splice(this.tagsList.indexOf(tag), 1);
                this.tagsIdList.splice(this.tagsList.indexOf(tag),1);
                var special = '';
                for(var item of this.tagsList){
                    special = item + ',' + special;
                }
                var tagsIds = "";
                for(var item of this.tagsIdList){
                    tagsIds = item + ',' + tagsIds;
                }
                this.$emit('getNewTags',special,tagsIds)
            },

            showInput() {
                this.inputVisible = true;
            },

            cancle(){
                this.inputVisible = false;
                this.haveTags = false;
                this.tagName = '';
            },

            newTags(){
                this.haveTags = true;
                this.tagDialogVisible = true;
            },
            // 查询标签
            getTag(){
                let newTag = this.tagName;
                this.haveTags = false;
                this.tagsExist  = [];
                if(!!newTag.trim()){
                    let params = {
                        categoryOneId:'',
                        categoryTwoId:'',
                        keyWordName:newTag
                    }
                    searchTag(params).then(res=>{
                        if(res.data.length > 0){
                            this.tagsExist = res.data;
                        }else{
                            this.haveTags = true;
                        }
                    })
                }
            },

            // 获取已有标签
            getExistTags(tag){
                this.tagsList.unshift(tag.keyWordName);
                this.tagsIdList.unshift(tag.id);
                var special = '';
                for(var item of this.tagsList){
                    special = item + ',' + special;
                }
                var tagsIds = "";
                for(var item of this.tagsIdList){
                    tagsIds = item + ',' + tagsIds;
                }
                this.$emit('getNewTags',special,tagsIds)
            },

            // 获取所有类目列表
            getAllCate(){
                // 获取所有类目，包括一级和二级
                loadAllCateList({}).then(res=>{
                    this.firstCateList = res.data;
                })
            },

            // 获取一级类目ID
            getFirstCate(){
                this.secondCateList = [];
                this.secondCate = '';
                for(var item of this.firstCateList){
                    if(item.id == this.firstCate){
                        this.firstCateName = item.categoryName;
                        this.secondCateList = item.childrenList;
                        break;
                    }
                }
            },

            // 获取二级类目ID
            getSecondCate(){
                this.secondCateName = '';
                for(var cate of this.secondCateList){
                    if(cate.id == this.secondCate){
                        this.secondCateName = cate.categoryName;
                    }
                }
            },


            // 新增标签
            addTag(){
                if(!!!this.firstCate || !!!this.secondCate){
                    this.$message.warning('请选择分类');
                    return false;
                }
                let params = {
                    categoryOneId: this.firstCate,
                    categoryOneName: this.firstCateName,
                    categoryTwoId: this.firstCate,
                    categoryTwoName: this.secondCateName,
                    keyWordName:this.tagName
                }
                tagsAdd(params).then(res=>{
                    if(res.code == 200){
                        this.$message.success('添加成功');
                        let params = {
                            categoryOneId:this.firstCate,
                            categoryTwoId:this.firstCate,
                            keyWordName:this.tagName
                        }
                        searchTag(params).then(res=>{
                            this.tagsExist = res.data;
                        })
                        this.tagDialogVisible = false;
                    }else{
                        this.$message.warning('添加失败')
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .el-input--small .el-input__inner{
        height: 40px !important;
    }
</style>
<style lang="less" scoped>
    .el-dialog__wrapper{
        text-align: center;
    }
    .el-dialog__wrapper /deep/  .el-dialog__footer{
        text-align: center !important;
    }
    .el-dialog__wrapper /deep/ .el-dialog__headerbtn{
        display:none;
    }
    .newTag{
        color:#0b7a75;
    }
    .newTag:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .quit{
        margin-left: 90px;
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
    .button-new-tag{
        color:#0b7a75;
    }
    .input-new-tag{
        line-height: 40px;
        margin-top: 10px;
    }
    .el-input--small .el-input__inner{
        height: 40px !important;
    }
    .el-input__inner{
        width:180px !important;
    }
    .el-tag{
        margin-right: 5px;
        background-color: #0b7a75 !important;
        color:#fff;
    }
    .el-tag.el-tag--info /deep/ .el-tag__close{
        color:#fff !important;
    }
    .star{
        color:red;
    }
    .tagsExist{
        margin-top: 10px;
      .el-tag{
          background-color: #999999 !important;
      } 
      .el-tag:hover{
          cursor: pointer;
      } 
    }
    .newTagWarp{
        .el-input{
            width:250px;
        }
    }
</style>