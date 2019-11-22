<template>
    <el-breadcrumb  separator="/">
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped>
   .el-breadcrumb {
      height: 10px;
      padding: 20px;
      border-radius: 0px;
      box-shadow: 0 2px 12px 0 #c0c4cc inset;
      
   }
  
   .line {
      border-left: 3px solid #31c17b;
      padding-left: 10px;
   }
</style>