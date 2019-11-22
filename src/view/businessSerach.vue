<template>
    <div style="with:100%">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <span class="newBusiness" @click="dialogVisible = true">新增商家</span>
        <!-- 新增商家 -->
        <el-dialog
            title="新增商家"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="name">
                <span>商家名称<span class="star">*</span></span>
                <el-input 
                v-model="input"
                placeholder="30个字以内"
                maxlength="30"
                show-word-limit></el-input>
            </div>
            <div class="name">
                <span>联系电话<span class="star">*</span></span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default({
    data(){
        return {
            input3: '',
            input:'',
            dialogVisible:false
        }
    }
})
</script>
<style lang="less" scoped>
    .input-with-select {
        background-color: #fff;
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
    .newBusiness{
        color:#0b7a75;
        margin-left:20px;
        position: absolute;
        line-height: 40px;
    }
    .newBusiness:hover{
        text-decoration: underline;
        cursor: pointer;
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
</style>