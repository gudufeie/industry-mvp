<template>
    <div class="userinfo">
        <div class="userinfo_title">
            <div class="user_left">
                <div class="user_img"></div>
                <div class="company"><span>重庆浪腾科技有限公司</span><span>企业</span><br> <span>ID：1234567</span></div>
                <div class="roleSelect">
                    <el-button type="primary">客户视角</el-button>
                    <el-button type="primary">供应商视角</el-button>
                </div>
            </div>
            <div class="right">
            </div>
        </div>
         <div class="userinfo_content">
             <div class="userinfo_left">
                 <div class="userinfo_nav">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">用户信息</el-menu-item>
                    <el-menu-item index="2" disabled>交易信息</el-menu-item>
                    <el-menu-item index="3" disabled>跟进信息</el-menu-item>
                    <el-menu-item index="4">经营信息</el-menu-item>
                    <el-menu-item index="5">行为轨迹</el-menu-item>
                    </el-menu>
                    <div class="line"></div>
                 </div>
                 <div class="userinfo_detail" v-show="activeIndex == '1'">
                     <div class="userinfo_top">
                       <div class="detail_title">账号信息</div>
                        <div class="detail_content">
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="8"><div class="grid-content bg-purple"><span>用户ID : </span><span>1234567</span></div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple-light"><span>用户名 ：</span><span>XXXXXXXX</span></div></el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <span>绑定手机
                                        <span class="star">*</span>：
                                        </span><span class="tip-wrap">
                                            <el-input @input="getPhone" v-model="phone" placeholder="请输入手机号"></el-input>
                                            <span class="tip">{{phoneTip}}</span>
                                        </span>
                                    </div>
                            </el-col>
                        </el-row>
                            <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <span>绑定邮箱 : </span>
                                    <span class="tip-wrap">
                                        <el-input @input="getEmail" v-model="email" placeholder="请输入邮箱"></el-input>
                                        <span class="tip">{{emailTip}}</span>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple-light">
                                    <span>QQ ：</span>
                                    <span class="tip-wrap">
                                        <el-input @input="getQqAccount" v-model="qqAccount" placeholder="请输入QQ"></el-input>
                                        <span class="tip">{{qqAccountTip}}</span>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <span>微信 ：</span>
                                    <span class="tip-wrap">
                                        <el-input @input="getWechat" v-model="wechat" placeholder="请输入微信"></el-input>
                                        <span class="tip">{{wechatTip}}</span>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                            <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="8"><div class="grid-content bg-purple"><span>微信昵称 : </span><span>无</span></div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple-light"><span>注册时间 ：</span><span>2019-10-09 15:46:34</span></div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple"><span>注册渠道 ：</span><span>PC/微信</span></div></el-col>
                        </el-row>
                            <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="8"><div class="grid-content bg-purple"><span>注册来源 : </span><span>https://baigonglian.com</span></div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple-light"><span>最近登录时间 ：</span><span>2019-10-09 15:46:34</span></div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple"><span>最近登录地区 ：</span><span>四川 成都</span></div></el-col>
                        </el-row>
                            <el-row  class="row-bg" justify="space-between">
                            <el-col :span="24"><div class="grid-content bg-purple"><span>备注 : </span> <textarea name="" id="" cols="30" rows="10" placeholder="请输入"></textarea></div></el-col>
                        </el-row>
                        </div>
                     </div>
                     <div class="userinfo_middle">
                       <div class="detail_title">企业信息</div>
                        <div class="detail_content">
                            <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <span>企业名 : </span>
                                    <span>
                                        <el-input 
                                            v-model="companyName" 
                                            placeholder="请输入名称"
                                            maxlength="30"
                                            show-word-limit>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="8"><div class="grid-content bg-purple-light"><span>企业类型 : </span><span>
                                  <el-select v-model="companyType" placeholder="请选择">
                                    <el-option
                                    v-for="item in companyTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </span></div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple"><span>企业规模 ：</span><span>
                                  <el-select v-model="companySize" placeholder="请选择">
                                    <el-option
                                    v-for="item in companySizeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </span></div></el-col>
                        </el-row>
                            <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="8"><div class="grid-content bg-purple"><span>经营状态 : </span><span>
                                  <el-select v-model="companyState" placeholder="请选择">
                                    <el-option
                                    v-for="item in companyStateList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </span></div></el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple-light">
                                    <span>营业期限 ：</span>
                                    <span class="tip-wrap">
                                        <el-input @input="getBusinessTerm" v-model="businessTerm" placeholder="请输入"></el-input>
                                        <span class="tip">{{businessTermTip}}</span>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="8"><div class="grid-content bg-purple"><span>成立日期 ：</span><span>
                                    <el-date-picker
                                    v-model="createDate"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </span></div></el-col>
                        </el-row>
                            <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <span>注册资本(万元) : </span>
                                    <span>
                                        <el-input oninput = "value=value.replace(/[^0-9.?]/g,'')" v-model="register" placeholder="请输入"></el-input>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="8"><div class="grid-content bg-purple-light"><span>法人代表  ：</span><span><el-input v-model="legalPerson" placeholder="请输入"></el-input></span></div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple"><span>企业行业 ：</span><span>
                                  <el-select v-model="industry" placeholder="请选择">
                                    <el-option
                                    v-for="item in industryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </span></div></el-col>
                        </el-row>
                            <el-row  :gutter="20" class="row-bg">
                            <el-col :span="2"><div class="grid-content bg-purple"><span style="line-height:40px;">所在地 : </span></div></el-col>
                          <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span>
                                    <el-cascader
                                        size="large"
                                        :options="option"
                                        v-model="selectedOptions"
                                        @change="handleChange">
                                    </el-cascader>
                                </span>
                            </div>
                            </el-col>
                            <el-col :span="15">
                                <div class="grid-content bg-purple">
                                    <span>
                                        <el-input class="address" v-model="input" placeholder="请输入内容"></el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row  class="row-bg" justify="space-between" style="margin-top:20px;">
                            <el-col :span="24">
                                <div class="grid-content bg-purple">
                                    <span>备注 : </span> 
                                    <textarea name="" id="" cols="30" rows="10" placeholder="请输入内容"></textarea>
                                </div>
                            </el-col>
                        </el-row>
                        </div>
                     </div>
                     <div class="userinfo_bottom">
                         <div class="contact">
                             <span>联系人</span>
                             <el-button style='float:right;' type="primary" @click="addNewContact">新增联系人</el-button>
                        </div>
                        <div class="contact_table" style="margin-top:10px;">
                            <el-table
                                :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                                :data="contactList"
                                style="width: 100%"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                >
                                <el-table-column
                                label="姓名"
                                width="80">
                                    <template slot-scope="{row,$index}">
                                        <el-input v-if="!!showEdit[$index]" v-model="row.name"></el-input>
                                        <span v-if="!!!showEdit[$index]">{{row.name}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="性别"
                                width="80">
                                    <template slot-scope="{row,$index}">
                                        <el-select v-if="!!showEdit[$index]" v-model="row.sex" placeholder="请选择">
                                            <el-option
                                            v-for="item in sexList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span v-if="!!!showEdit[$index]">{{row.sex}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="手机号"
                                width="120">
                                    <template slot-scope="{row,$index}">
                                        <el-input v-if="!!showEdit[$index]" v-model="row.phone"></el-input>
                                        <span v-if="!!!showEdit[$index]">{{row.phone}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="职位"
                                width="100">
                                    <template slot-scope="{row,$index}">
                                        <el-select v-if="!!showEdit[$index]" v-model="row.job" placeholder="请选择">
                                            <el-option
                                            v-for="item in jobList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span v-if="!!!showEdit[$index]">{{row.job}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="微信"
                                width="80">
                                    <template slot-scope="{row,$index}">
                                        <el-input v-if="!!showEdit[$index]" v-model="row.wechat"></el-input>
                                        <span v-if="!!!showEdit[$index]">{{row.wechat}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="邮箱"
                                width="150">
                                    <template slot-scope="{row,$index}">
                                        <el-input v-if="!!showEdit[$index]" v-model="row.email"></el-input>
                                        <span v-if="!!!showEdit[$index]">{{row.email}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="management"
                                label="管理">
                                    <template slot-scope="{row,$index}">
                                        <el-button size="mini" @click="handleEdit($index,row)" v-if="!!!showBtn[$index]">编辑</el-button>
                                        <el-button size="mini" @click="handleSubmit($index,row)" v-if="!!showBtn[$index]">确定</el-button>
                                        <el-button size="small" @click.native="handleCancel($index, row)" v-if="!!showBtn[$index]">取消</el-button>
                                        <el-button size="mini" type="danger" @click="handleDelete($index,row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                     </div>
                    <div class="button_wrapper">
                        <el-button type="primary" @click="save">保存</el-button>
                        <el-button @click="backPrePage">取消</el-button>
                    </div>
                 </div>
                 <behavior-track v-show="activeIndex == '5'"></behavior-track>
                 <business-info :businessInfo='providerInfo' v-show="activeIndex == '4'"></business-info>
             </div>
             <div class="userinfo_right">
                 <span>操作</span>
                 <div>
                     <el-button type="primary"  size="mini">完善信息</el-button>
                     <el-button type="primary"  size="mini">代发需求</el-button>
                 </div>
                 <div>
                     <el-button type="primary"  size="mini">添加商机</el-button>
                     <el-button type="primary"  size="mini">跟进记录</el-button>
                 </div>
             </div>
         </div>
    </div>
</template>
<script>
import { regionDataPlus,CodeToText } from 'element-china-area-data';
import BehaviorTrack from "./behaviorTrack.vue";
import BusinessInfo from "./businessInfo.vue";
export default {
    data(){
        return{
            phone:'',
            email:'',
            wechat:'',
            value:null,
            options:[],
            createDate:'',
            activeIndex:'1',
            input:'',
            option: regionDataPlus,
            selectedOptions: [],
            userId:'',
            showEdit: [],
            showBtn: [],
            addFlag:false,
            contactList:[
                {
                    name:'赵子龙',
                    sex:'男',
                    phone:11100000000,
                    job:'董事长',
                    wechat:'8888888',
                    email:'1101110@163.com'
                }
            ],
            jobList:[
                {label:'老板',value:0},
                {label:'销售',value:1},
                {label:'人事/财务/行政',value:2},
                {label:'运营',value:3},
                {label:'市场',value:4},
                {label:'技术',value:5},
                {label:'其他',value:6}
            ],
            sexList:[
                {label:'男',value:0},
                {label:'女',value:1}
            ],
            phoneTip:'',
            emailTip:'',
            wechatTip:'',
            qqAccountTip:'',
            qqAccount:'',
            businessTerm:'',
            businessTermTip:'',
            companyName:'',    //公司名称
            companyTypeList:[
                {label:'其他',value:1},
                {label:'国有',value:2},
                {label:'合作',value:3},
                {label:'合资',value:4},
                {label:'独资',value:5},
                {label:'集体',value:6},
                {label:'私营',value:7},
                {label:'个体工商户',value:8},
                {label:'报关',value:9},
            ],
            companyType:1,   //企业类型
            companySize:3,   //企业规模
            companySizeList:[
                {label:'大型企业',value:1},
                {label:'中型企业',value:2},
                {label:'小型企业',value:3},
                {label:'微型企业',value:4},
            ],
            companyState:1,  //经营状态
            companyStateList:[
                {label:'存续',value:1},
                {label:'在业',value:2},
                {label:'吊销',value:3},
                {label:'注销',value:4},
                {label:'迁入',value:5},
                {label:'迁出',value:6},
                {label:'停业',value:7},
                {label:'清算',value:8},
            ],
            register:'',    //注册资金
            legalPerson:'',   //法人代表
            industry:7,     //企业行业
            industryList:[
                {label:'制造业',value:1},
                {label:'电力、燃气及水的生产和供应业',value:2},
                {label:'建筑业',value:3},
                {label:'交通运输、仓储和邮政业',value:4},
                {label:'信息传输、计算机服务和软件业',value:5},
                {label:'批发和零售业',value:6},
                {label:'其他',value:7},
            ]
        }
    },
    components:{
        BehaviorTrack,
        BusinessInfo
    },
    computed:{
        userInfo(){
            return this.$store.state.userInfo;
        },
        providerInfo(){
            return this.$store.state.providerInfo;
        }
    },
    mounted(){
        this.getUserInfo();
        for(var i = 0; i < this.contactList.length; i ++) {
            this.showEdit[i] = false;
            this.showBtn[i] = false;
        }
    },
    methods:{
        // 获取用户信息
        getUserInfo(){
            this.activeIndex = this.$route.query.activeIndex;
            if(!!this.userInfo){
                console.log('ddddddd',this.userInfo)
                this.userId = this.userInfo.id;              
            }
            this.$store.commit('saveUserInfo','');
            this.$local.clear('providerInfo')
        },

        addressChange(arr) {

        },
        handleSelect(key, keyPath) {
            this.activeIndex = key;
        },

        //   取消返回上一页
        backPrePage(){
            this.$router.go(-1);
        },
        handleEdit(index,row){
            this.showEdit[index] = true;
            this.showBtn[index] = true;
            this.$set(this.showEdit,index,true)
            this.$set(this.showBtn,index,true)
        },
        handleCancel(index,row){
            if(!!this.addFlag){
                this.contactList.splice(index,1);
                this.addFlag = false;
            }else{
                this.showEdit[index] = false;
                this.showBtn[index] = false;
                this.$set(this.showEdit,index,false)
                this.$set(this.showBtn,index,false)
            }
        },
        handleDelete(index,row){
            this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.contactList.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        handleSubmit(){

        },
        addNewContact(){
            this.addFlag = true;
            this.contactList.push({
                name:'',
                sex:'',
                phone:'',
                job:'',
                wechat:'',
                email:''
            })
            this.showEdit[this.contactList.length-1] = true;
            this.showBtn[this.contactList.length-1] = true;
            this.$set(this.showEdit,this.contactList.length-1,true)
            this.$set(this.showBtn,this.contactList.length-1,true)
        },

        handleChange(value){
            console.log('地区',value,CodeToText[value[0]])
            console.log('地区',value,CodeToText[value[1]])
            console.log('地区',value,CodeToText[value[2]])
        },

        // 保存页面修改
        save(){
            console.log('dddddddddd',this.contactList)
        },

        // 验证手机号
        getPhone(){
            this.$rules.validateMobilePhone(this.phone.trim(),(data)=>{
                this.phoneTip = data;
            })
        },
        // 验证邮箱
        getEmail(){
            this.$rules.validateEmail(this.email.trim(),(data)=>{
                this.emailTip = data;
            })
        },

        // 验证微信号
        getWechat(){
            this.$rules.validateWeixin(this.wechat.trim(),(data)=>{
                this.wechatTip = data;
            })
        },

        // qq验证
        getQqAccount(){
            this.$rules.validateQQ(this.qqAccount.trim(),(data)=>{
                this.qqAccountTip = data;
            })
        },

        // 营业期限验证
        getBusinessTerm(){
            this.$rules.validateDate(this.businessTerm.trim(),(data)=>{
                this.businessTermTip = data
            })
        }
    }
}
</script>
<style scoped lang="less">
.userinfo{
    font-size: 14px;
}
textarea{
    vertical-align: middle;
    width: 93%;
    outline: none;
    resize: none;
}
.detail_title {
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
    margin: 20px 0;
  }
   .el-input,.el-select{
    width: 52%;
  }
  .address{
      width: 89%;
  }
}
.userinfo_left{
    margin: 12px 0;
    width: 80%;
    vertical-align: top;
}
.userinfo_nav {
    height: 60px;
    .el-menu-item{
      color: #1a1a1a!important;
      height: 50px;
      line-height: 50px;
    }
    .el-menu-item.is-active{
      border-bottom: 2px solid #0b7a75;
   }
}
.userinfo_left,.userinfo_right{
    display: inline-block;
}
.userinfo_right{
    width: 19%;
    background: #fff;
    height: 120px;
    margin: 12px 0 0 1%;
    padding-top: 10px;
    span{
        margin-left: 10px;
        padding-left: 5px;
        border-left: 3px solid #0b7a75;
    }
    div{
        text-align: center;
        margin-top: 15px;
    }
}
.userinfo_title {
    padding: 13px;
    background-color: #fff;
}
.user_img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid;
}
.user_left div,.user_left span{
     display: inline-block;
     font-size: 13px;
}
.company span:nth-child(2){
    background: #1a1a1a;
    color: #fff;
    padding: 2px;
    box-sizing: border-box;
}
.company span:nth-child(1),.company span:last-child{
    line-height: 1.6;
    margin: 0 10px;
}
.el-menu-item:hover{
    background: #fff!important;
}
.userinfo_bottom{
    margin-top: 20px;
    background: #fff;
    padding: 15px 20px;
    .contact{
        padding-bottom: 20px;
    }
}
.button_wrapper{
    margin-top: 40px;
    text-align: center;
    .el-button{
        width: 120px;
    }
}
.roleSelect{
    position: absolute;
    right: 40px;
}
.star{
    color:red;
    line-height: 40px;
}
.tip-wrap{
    position:relative;
    .tip{
        position: absolute;
        right:0;;
        top: 30px;
        color:red;
        font-size: 12px;
        width:100%;
    }
}
</style>
<style>
 /* .detail_content  .el-input__inner{
    line-height: 32px;
    height: 32px;
} */
</style>


