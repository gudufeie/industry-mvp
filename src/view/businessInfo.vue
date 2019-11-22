<template>
    <div class="userinfo_detail">
        <div class="userinfo_top">
            <div class="detail_title">店铺信息</div>
            <div class="detail_content">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="12"><div class="grid-content bg-purple"><span>店铺名称 : </span><span><el-input v-model="input" placeholder="请输入内容"></el-input></span></div></el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <span>入驻平台：</span>
                        <span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
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
                        <span>经营类目 : </span>
                        <el-button type="primary" size='mini' style="float:right;" @click="dialogVisible = true">编辑</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <span>数据采集设备 : </span>
                        <span>传感器、网关、数据采集卡、工业通讯录模块、传感器、网关、数据采集卡、工业通讯录模块、数据采集卡、工业通讯录模块（二级类目）</span>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <span>数据采集设备 : </span>
                        <span>传感器、网关、数据采集卡、工业通讯录模块、传感器、网关、数据采集卡、工业通讯录模块、数据采集卡、工业通讯录模块（二级类目）</span>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <p>
                            擅长 : <tags-add style="display:inline-block;margin-left:10px;"></tags-add>
                        </p>
                    </div>
                </el-col>
            </el-row>
            <el-row  class="row-bg" justify="space-between">
                <el-col :span="24"><div class="grid-content bg-purple"><span>店铺介绍 : </span> <textarea name="" id="" cols="30" rows="10"></textarea></div></el-col>
            </el-row>
            </div>
        </div>
        <div class='keyword_search'>
            <div class="content_title">发布的产品
                <span style="float:right;margin-right:20px;">
                    <span>总量:1;</span>
                    <span>出售中:2;</span>
                    <span>已下架:3</span>
                </span>
            </div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="商品ID">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="商品图片">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="商品标题">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="商品品牌">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="商品描述">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="商品价格">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="发布时间">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="管理">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="success"
                            v-show="scope.row.state == '1'"
                            @click="handleon(scope.$index, scope.row)">启用</el-button>
                            <el-button
                            size="mini"
                            v-show="scope.row.state == '0'"
                            style="background:#fff;color:#000;"
                            @click="handleon(scope.$index, scope.row)">下线</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='scan_serve'>
            <div class="content_title">发布的服务
                <span style="float:right;margin-right:20px;">
                    <span>总量:1;</span>
                    <span>出售中:2;</span>
                    <span>已下架:3</span>
                </span>
            </div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="服务ID">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="服务名称">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="服务名称">
                    </el-table-column>
                    <el-table-column
                    prop="job"
                    label="服务价格">
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="发布时间">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="管理">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="success"
                        v-show="scope.row.state == '1'"
                        @click="handleon(scope.$index, scope.row)">启用</el-button>
                        <el-button
                        size="mini"
                        v-show="scope.row.state == '0'"
                        style="background:#fff;color:#000;"
                        @click="handleon(scope.$index, scope.row)">下线</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='scan_case'>
            <div class="content_title">发布的解决方案<span style="float:right;margin-right:20px;">共计10个</span></div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="方案ID">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="方案名称">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="方案描述">
                    </el-table-column>
                    <el-table-column
                    prop="job"
                    label="方案报价">
                    </el-table-column>
                    <el-table-column
                    prop="job"
                    label="发布时间">
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="管理">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="success"
                            v-show="scope.row.state == '1'"
                            @click="handleon(scope.$index, scope.row)">启用</el-button>
                            <el-button
                            size="mini"
                            v-show="scope.row.state == '0'"
                            style="background:#fff;color:#000;"
                            @click="handleon(scope.$index, scope.row)">下线</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                                <el-checkbox v-model="firstCheckedList[index]" @change="getFirstChecked(index)">{{firstCate.label}}</el-checkbox>
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
                                <el-checkbox v-model="secondCheckedList[index]" @change="getSecondChecked(index)">{{secondCate.label}}</el-checkbox>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import TagsAdd from "./tagsAdd";

export default{
    data(){
        return{
            contactList:[],
            dialogVisible:false,
            checked: true,
            firstCateList:[
                {label:'待选1',value:1},
                {label:'待选2',value:1},
                {label:'待选3',value:1},
                {label:'待选4',value:1},
                {label:'待选5',value:1},
                {label:'待选6',value:1},
                {label:'待选7',value:1},
                {label:'待选8',value:1},
            ],
            secondCateList:[
                {label:'待选1',value:1},
                {label:'待选2',value:1},
                {label:'待选3',value:1},
                {label:'待选4',value:1},
                {label:'待选5',value:1},
                {label:'待选6',value:1},
                {label:'待选7',value:1},
                {label:'待选8',value:1},
            ],
            firstCheckedList:[],
            secondCheckedList:[],
            firstSelected:[],
            secondSelected:[]
        }
    },
    mounted(){
        for(var i = 0; i < this.firstCateList.length; i ++) {
            this.firstCheckedList[i] = false;
        }
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },

        // 选择一级类目
        getFirstChecked(index){
            if(this.firstCheckedList[index] == true){
                this.firstSelected.push(this.firstCateList[index])
            }else{
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
            console.log('tttt',this.secondSelected)
        },

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
</style>
<style lang="less">

</style>