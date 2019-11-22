<template>
    <div class="userinfo_detail">
        <div class='keyword_search'>
            <div class="content_title">关键词搜索<span style="float:right;margin-right:20px;">共计10个</span></div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="搜索关键词">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="搜索次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='scan_serve'>
            <div class="content_title">浏览服务<span style="float:right;margin-right:20px;">共计10个</span></div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="浏览ID">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="浏览名称">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="一级类目">
                    </el-table-column>
                    <el-table-column
                    prop="job"
                    label="二级类目">
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="类型">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="服务商ID">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="服务商名称">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="浏览次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='scan_case'>
            <div class="content_title">浏览案例<span style="float:right;margin-right:20px;">共计10个</span></div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="案例ID">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="关联服务">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="服务类目">
                    </el-table-column>
                    <el-table-column
                    prop="job"
                    label="供应商">
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="浏览次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='scan_page'>
            <div class="content_title">浏览页面<span style="float:right;margin-right:20px;">共计10个</span></div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="页面名">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="页面地址">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="浏览次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='collection'>
            <div class="content_title">收藏<span style="float:right;margin-right:20px;">共计10个</span></div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="收藏ID">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="收藏名称">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="一级类目">
                    </el-table-column>
                    <el-table-column
                    prop="job"
                    label="二级类目">
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="类型">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="服务商ID">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="服务商名称">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='user_login'>
            <div class="content_title">用户登录<span style="float:right;margin-right:20px;">共计10个</span></div>
            <div class="contact_table" style="margin-top:10px;">
                <el-table
                    :header-cell-style="{background:'#f6f6f6',color:'#000'}"
                    :data="contactList"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                    <el-table-column
                    prop="name"
                    label="登陆时间">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="登陆渠道">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="本次浏览页面">
                    </el-table-column>
                    <el-table-column
                    prop="job"
                    label="本次停留时长">
                    </el-table-column>
                    <el-table-column
                    prop="wechat"
                    label="跳出页面">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
    export default({
        data(){
            return{
                contactList:[]
            }
        }
    })
</script>
<style lang="less" scoped>
    .userinfo_detail{
        font-size: 14px;
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
</style>