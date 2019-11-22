<template>
    <div class="main">
        <div class="mian_header"> <span><i class="el-icon-user-solid"></i></span> <span>Admin</span> <span @click="handleLogout()" class="logout">退出 </span></div>
        <applink></applink>
        <div class="mian_bady">
            
           <router-view></router-view>
        </div>

    </div>
</template>
<script>
import applink from './link.vue'
export default {
    components: {applink},
    data(){
        return{

        }
    },
    methods: {
        handleLogout(){
            localStorage.removeItem("username")
            localStorage.removeItem("password")
             this.$router.push('/login')
        }
    },
}
</script>
<style scoped>
.mian_header{
    height: 50px;
    line-height: 50px;
    text-align: right;
    margin-right: 38px;
}
.mian_header span:nth-child(2){
    margin-right: 18px;
}
.mian_header a{
    color: #303133;
}
.mian_bady{
     /* box-shadow: 2px 2px 7px #86b2af inset; */
     padding: 20px;
     background: #f6f6f6;
     min-height: 77%;
}
.el-icon-user-solid{
    font-size: 20px;
}
.logout{
    cursor: pointer;
}
</style>

