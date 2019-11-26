<template>
    <div>
        <el-tag
            :key="tag"
            v-for="tag in tagsList"
            closable
            color='#fff'
            type = 'info'
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-button class="button-new-tag" size="small" @click="showInput">新增标签 +</el-button>
        <el-input 
            class="input-new-tag" 
            v-model="tagName" 
            size="small" 
            v-if="inputVisible"
            placeholder="10个字以内"
            maxlength="10"
            show-word-limit
            @blur="getTag">
        </el-input>
        <span class="newTag" v-if="inputVisible" style="margin-left:20px;" @click="tagDialogVisible = true">新增标签</span>
        <span class="newTag cancel" v-if="inputVisible" style="margin-left:20px;" @click="inputVisible = false">取消</span>

        <!-- 新增标签 -->
        <el-dialog
            title="请选择标签关联的类目"
            :visible.sync="tagDialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="name">
                <span>一级类目<span class="star">*</span></span>
                <el-select v-model="firstCate" placeholder="请选择一级类目">
                    <el-option
                    v-for="item in firstCateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="name">
                <span>二级类目<span class="star">*</span></span>
                <el-select v-model="firstCate" placeholder="请选择二级类目">
                    <el-option
                    v-for="item in firstCateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tagDialogVisible = false">确 定</el-button>
                <el-button @click="tagDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tagsList:['1','2','3'],
                tagName:'',
                inputVisible:false,
                tagDialogVisible:false,
                firstCateList:[],
                firstCate:''
            }
        },
        props:{
            tags:String
        },
        mounted(){

        },
        methods:{
            handleClose(tag) {
                this.relateKeywordList.splice(this.relateKeywordList.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
            },

            // 查询标签
            getTag(){

            },
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
        line-height: 60px;
        position: absolute;
    }
    .cancel{
        margin-left: 90px !important;
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
</style>