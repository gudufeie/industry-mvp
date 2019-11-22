<template>
    <div>
        <!-- <Header></Header> -->
        <Navbar></Navbar>
        <Main></Main>
    </div>
</template>
<script>
import Header from './Header'
import Navbar from './Navbar'
import Main from './Main'
export default {
    components:{Header,Navbar,Main},
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b;
    line-height: 50px;
    background-color: #fffcf9;
    color: #0b7a75;
    padding: 0 20px;
    font-weight: 700;
}
.navbar {
    position: absolute;
    width: 230px;
    top: 0px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    /* background-color: #fffcf9; */
   border-right: 1px solid #f3eeee;
}
.main {
    position: absolute;
    top: 0px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    /* padding: 0px 0px 0px 1px; */
    overflow-y: auto;
   
    /* background-color: red; */
}
</style>

