<template>
    <div>
      <el-row :gutter="20">
         <el-col :span="3">
             <div class="grid-content bg-purple">
                 <span>类型</span>
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
         <el-col :span="3">
             <div class="grid-content bg-purple">
                 <span>一级类目</span>
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
         <el-col :span="3">
             <div class="grid-content bg-purple">
                 <span>二级类目</span>
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
         <el-col :span="3">
             <div class="grid-content bg-purple">
                 <span>提供服务</span>
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
         <el-col :span="3">
             <div class="grid-content bg-purple">
                 <span>提供解决方案</span>
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
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                    <el-button type="primary">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="3" ><div class="grid-content bg-purple"><el-button type="primary">一级类目排序</el-button></div></el-col>
            <el-col :span="3" ><div class="grid-content bg-purple"><el-button type="primary">一级类目排序</el-button></div></el-col>
       </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style scoped>

</style>

