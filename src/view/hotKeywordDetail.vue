<template>
    <div class="main-wrap">
        <el-row :gutter="20">
            <el-col :span="6" :offset="4">
                <div class="grid-content bg-purple-left">热搜词
                    <span class="star">*</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-input
                        placeholder="10个字以内"
                        maxlength="10"
                        show-word-limit>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" :offset="4">
                <div class="grid-content bg-purple-left">排序
                    <span class="star">*</span>:
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-input></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" :offset="4">
                <div class="grid-content bg-purple-left">是否启用
                    <span class="star">*</span>:
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" :offset="4">
                <div class="grid-content bg-purple-left">备注
                    <span class="star">*</span>:
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-input 
                        type="textarea" 
                        :rows="5"
                        placeholder="请输入">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" :offset="6">
                <div class="grid-content bg-purple-left">
                    <el-button type="primary">保存</el-button>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-button @click="back">取消</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default{
    data(){
        return{
             options: [{
                value: 1,
                label: '是'
                }, {
                value: 0,
                label: '否'
                }],
            value: 1
            }
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
    .el-row {
        margin-bottom: 20px;
        .star{
            color:red;
        }
        .bg-purple-left{
            text-align: right;
            padding-right: 20px;
            line-height: 40px;
        }
        .bg-purple{
            .el-select{
                width:100%;
            }
        }
        .el-button{
            width: 120px;
            margin-top: 20px;
        }
    }
</style>