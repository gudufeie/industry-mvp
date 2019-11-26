<template>
    <div class="navbar">
        <div class="header_title">百工联运营后台</div>
        <div>   
            <el-row class="tac">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            >
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>基础管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="category">类目管理</el-menu-item>
                <el-menu-item index="keyword">关键词管理</el-menu-item>
                <el-menu-item index="association">关联关键词</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
        <el-row class="tac">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            >
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>用户管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="userlist">用户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
        <el-row class="tac">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            >
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>供应链管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="provider">服务商库</el-menu-item>
                <el-menu-item index="product">产品库</el-menu-item>
                 <el-menu-item index="service">服务库</el-menu-item>
                 <el-menu-item index="solve">解决方案库</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
        <el-row class="tac">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>内容管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="home">首页管理</el-menu-item>
                <el-menu-item index="search">热搜词管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
        <el-row class="tac">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>数据管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="dataManage">行为轨迹</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
        <el-row class="tac" v-show="false">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>需求管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="demand">需求管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
        <el-row class="tac" v-show="false">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>投放管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="serving">投放管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
        <el-row class="tac" v-show="false">
        <el-col :span="24">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>系统设置</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="system">系统设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        handleOpen(){

        },
        handleClose(){

        }
    }
}
</script>
<style>
.header_title{
     height: 50px;
     line-height: 50px;
     color: #0b7a75;
     font-weight: 800;
     border-bottom: 1px solid #f3eeee;
     text-align: center;
}

    .navbar_title,.navbar_body li{
        height: 50px;
        line-height: 50px;
        padding-left: 10%;
        color:#1a1a1a;
    }
   .navbar_body li{
           background: #b1b0b0;
   }
   .el-menu{
       border: none;
   }
   i.el-submenu__icon-arrow.el-icon-arrow-down {
    color: #0b7a75;
    font-size: 17px;
}
.el-submenu__title:hover,.el-menu-item:hover{
  background-color: #0b7a75 !important;
  color: #fff!important;
}

.el-menu-item.is-active {
  background: #fff;
  
}
.el-menu-item:hover{
  background-color: #0b7a75 !important;
}
</style>

