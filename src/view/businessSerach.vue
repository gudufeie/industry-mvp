<template>
    <div style="with:100%">
        <el-autocomplete
            v-model="businessName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入名称"
            @input="getName"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-autocomplete>
        <span class="newBusiness" @click="dialogVisible = true">新增商家</span>
        <!-- 新增商家 -->
        <el-dialog
            title="新增商家"
            :visible.sync="dialogVisible"
            width="30%">
            <div class="name">
                <span>商家名称<span class="star">*</span></span>
                <el-input 
                v-model="name"
                placeholder="30个字以内"
                maxlength="30"
                show-word-limit></el-input>
            </div>
            <div class="name">
                <span>联系电话<span class="star">*</span></span>
                <el-input v-model="phone" placeholder="请输入内容" @input="getPhone"></el-input>
                <span class="tips">{{phoneTip}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addBusiness">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { searchBusiness, businessAdd } from "@/service/getData"
export default{
    data(){
        return {
            dialogVisible:false,
            businessList:[],
            phone:'',
            name:'',
            phoneTip:''
        }
    },
    props:{
        businessName:String
    },
    methods:{
        // 按名称查询
        getName(){
            this.businessList = [];
            this.$emit('getName',this.businessName)
            let params = {
                id:'',
                businessName:this.businessName
            }
            searchBusiness(params).then(res=>{
                let businessList = [];
                for(var item of res.data){
                    let dict ={}
                    dict={
                        value:item.businessName,
                        id:item.id
                    }
                    businessList.push(dict);
                }
                this.businessList = businessList;
                this.querySearchAsync(queryString, cb);
            })
        },

        // 向父组件传递选择的商家信息
        handleSelect(item){
            this.$emit('getBusiness',item)
        },

        querySearchAsync(queryString, cb) {
            cb(this.businessList);
        },
        
        // 验证手机号
        getPhone(){
            this.$rules.validateMobilePhone(this.phone,(res)=>{
                this.phoneTip = res;
            })
        },

        addBusiness(){
            if(!!!this.name.trim()){
                this.$message.warning('商家名称不能为空');
                return false;
            }
            if(!!!this.phone.trim()){
                this.$message.warning('联系电话不能为空');
                return false;
            }
            let params = {
                businessName: this.name,
                contact: this.phone,
                id: ""
            }
            businessAdd(params).then(res=>{
                if(res.code == 200){
                    this.$message.success('添加成功')
                    this.businessName = this.name;
                    this.businessList = [];
                    this.$emit('getName',this.businessName)
                    let params = {
                        id:'',
                        businessName:this.businessName
                    }
                    searchBusiness(params).then(res=>{
                        let data = {
                            value:(res.data)[0].businessName,
                            id:(res.data)[0].id
                        }
                        this.$emit('getBusiness',data)
                    })
                    this.dialogVisible = false;
                }else{
                    this.$message.success(res.msg)
                }
            })
        }
    }
}
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
        position: relative;
        span{
            margin-right: 10px;
        }
        .el-input{
            width:70%;
        }
        .tips{
            position: absolute;
            left: 100px;
            top: 35px;
            color:red;
        }   
    }
    .el-autocomplete{
        width:100%;
    }
    .star{
        display: inline-block;
        color:red;
        line-height: 60px;
    }
</style>