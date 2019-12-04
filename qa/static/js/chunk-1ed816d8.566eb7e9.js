(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ed816d8"],{4570:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-wrap"},[n("div",{staticClass:"top-floor"},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("div",{staticClass:"grid-content bg-purple title"},[t._v("顶部楼层")])]),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"grid-content bg-purple search-bar",staticStyle:{"text-align":"right"}},[n("el-button",{attrs:{type:"primary"},on:{click:t.toTopFloor}},[t._v("新增楼层")])],1)])],1),n("el-row",[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"grid-content bg-purple-dark"},[n("el-table",{staticStyle:{width:"100%"},attrs:{"header-cell-style":{color:"#000"},data:t.topdata,border:""}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"60"}}),n("el-table-column",{attrs:{prop:"navigationTitle",label:"配置词",width:"120"}}),n("el-table-column",{attrs:{prop:"typeName",label:"跳转类型",width:"120"}}),n("el-table-column",{attrs:{prop:"description",label:"内容"}}),n("el-table-column",{attrs:{prop:"sort",label:"排序",width:"80"}}),n("el-table-column",{attrs:{label:"发布状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s("1"==e.row.enable?"已下线":"已上线")+" ")]}}])}),n("el-table-column",{attrs:{label:"最近更新时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("formatDate")(e.row.updateTime))+" ")]}}])}),n("el-table-column",{attrs:{prop:"name",label:"管理",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleTopEdit(e.$index,e.row)}}},[t._v("编辑")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleTopOffline(e.$index,e.row)}}},[t._v("下线")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleTopDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1)])],1)],1),n("div",{staticClass:"distribution-floor"},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("div",{staticClass:"grid-content bg-purple title"},[t._v("分发楼层")])]),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"grid-content bg-purple search-bar",staticStyle:{"text-align":"right"}},[n("el-button",{attrs:{type:"primary"},on:{click:t.toDistributeDetail}},[t._v("新增楼层")])],1)])],1),n("el-row",[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"grid-content bg-purple-dark"},[n("el-table",{staticStyle:{width:"100%"},attrs:{"header-cell-style":{color:"#000"},data:t.dispenseContent,border:""}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"60"}}),n("el-table-column",{attrs:{prop:"navigationTitle",label:"配置词",width:"120"}}),n("el-table-column",{attrs:{prop:"description",label:"描述"}}),n("el-table-column",{attrs:{prop:"sort",label:"排序",width:"80"}}),n("el-table-column",{attrs:{prop:"name",label:"发布状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(1==a.enable?"启用":"下线"))])]}}])}),n("el-table-column",{attrs:{label:"最近更新时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t._f("formatDate")(a.updateTime)))])]}}])}),n("el-table-column",{attrs:{prop:"name",label:"管理",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row,i=e.$index;return[n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.dispenseUpdate(a,i)}}},[t._v("编辑")]),n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.dispenseOnOrOut(a,i)}}},[t._v(t._s(1==a.enable?"下线":"启用"))]),n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.dispenseDelete(a,i)}}},[t._v("删除")])]}}])})],1)],1)])],1)],1),n("div",{staticClass:"solution"},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"grid-content bg-purple title"},[t._v("行业解决方案")])])],1),n("el-row",[n("el-col",{attrs:{span:24}},[n("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"解决方案",name:"first"}},[n("div",{staticClass:"search-nav"},[n("span",[t._v("导航")]),n("el-select",{attrs:{placeholder:"请选择",clearable:""},on:{change:t.filterSolution},model:{value:t.navigationId,callback:function(e){t.navigationId=e},expression:"navigationId"}},t._l(t.navigationList,(function(t,e){return n("el-option",{key:e,attrs:{label:t.navigationName,value:t.id}})})),1),n("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:t.toSolutionDetail}},[t._v("新增解决方案")])],1),n("div",{staticClass:"grid-content bg-purple-dark"},[n("el-table",{staticStyle:{width:"100%"},attrs:{"header-cell-style":{color:"#000"},data:t.industrySolutionList,border:""}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"60"}}),n("el-table-column",{attrs:{prop:"id",label:"解决方案ID",width:"100"}}),n("el-table-column",{attrs:{prop:"solutionName",label:"解决方案名称"}}),n("el-table-column",{attrs:{prop:"categoryName",label:"二级类目",width:"120"}}),n("el-table-column",{attrs:{label:"是否推荐",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(1==a.recommend?"人工推荐":2==a.recommend?"系统推荐":"否"))])]}}])}),n("el-table-column",{attrs:{prop:"sort",label:"排序",width:"80"}}),n("el-table-column",{attrs:{label:"发布状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(1==a.enable?"已上线":"已下线"))])]}}])}),n("el-table-column",{attrs:{label:"最近更新时间",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t._f("formatDate")(a.updateTime)))])]}}])}),n("el-table-column",{attrs:{label:"管理",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.solutionEdit(e.$index,e.row)}}},[t._v("编辑")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.solutionOnOrOut(e.$index,e.row)}}},[t._v("下线")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.solutionDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{background:"","current-page":t.solutionPageNum,"page-sizes":[10,25,50],"page-size":t.solutionPageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.solutionTotal,"prev-text":"上一页","next-text":"下一页"},on:{"size-change":t.solutionSizeChange,"current-change":t.solutionCurrentChange}})],1)],1)]),n("el-tab-pane",{attrs:{label:"导航排序",name:"second"}},[n("div",{staticClass:"add-nav"},[n("el-button",{attrs:{type:"primary"},on:{click:t.addNavigation}},[t._v("新增导航")])],1),n("div",{staticClass:"grid-content bg-purple-dark"},[n("el-table",{staticStyle:{width:"100%"},attrs:{"header-cell-style":{color:"#000"},data:t.navigationList,border:""}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"60"}}),n("el-table-column",{attrs:{label:"导航名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row,i=e.$index;return[t.showEdit[i]?n("el-input",{staticClass:"nav-input",model:{value:a.navigationName,callback:function(e){t.$set(a,"navigationName",e)},expression:"row.navigationName"}}):t._e(),t.showEdit[i]?t._e():n("span",[t._v(t._s(a.navigationName))])]}}])}),n("el-table-column",{attrs:{label:"二级类目",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row,i=e.$index;return[t.showEdit[i]&&"0"!=a.categoryTwoId?n("el-select",{staticClass:"nav-input",attrs:{placeholder:"请选择"},model:{value:a.categoryTwoId,callback:function(e){t.$set(a,"categoryTwoId",e)},expression:"row.categoryTwoId"}},t._l(t.cateTwoKeywords,(function(t,e){return n("el-option",{key:e,attrs:{label:t.categoryName,value:t.id}})})),1):t._e(),"0"==a.categoryTwoId?n("span",[t._v("/")]):t._e(),t.showEdit[i]||"0"==a.categoryTwoId?t._e():n("span",[t._v(t._s(a.categoryName))])]}}])}),n("el-table-column",{attrs:{label:"排序",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row,i=e.$index;return[t.showEdit[i]?n("el-input",{staticClass:"nav-input",model:{value:a.sort,callback:function(e){t.$set(a,"sort",e)},expression:"row.sort"}}):t._e(),t.showEdit[i]?t._e():n("span",[t._v(t._s(a.sort))])]}}])}),n("el-table-column",{attrs:{label:"发布状态",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(2==a.publishState?"已上线":3==a.publishState?"已下线":"未上线"))])]}}])}),n("el-table-column",{attrs:{label:"最近更新时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t._f("formatDate")(a.lastUpdateTime)))])]}}])}),n("el-table-column",{attrs:{label:"管理",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.$index,i=e.row;return[t.showBtn[a]?t._e():n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.navEdit(a,i)}}},[t._v("编辑")]),t.showBtn[a]?n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.navSubmit(a,i)}}},[t._v("保存")]):t._e(),n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.navOnOrout(a,i)}}},[t._v(t._s(2==i.publishState?"下线":"上线"))]),n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.navDelete(a,i)}}},[t._v("删除")])]}}])})],1)],1)])],1)],1)],1)],1)])},i=[],o=(n("a4d3"),n("e01a"),n("d28b"),n("4e82"),n("d3b7"),n("3ca3"),n("ddb0"),n("1273")),l={data:function(){return{topdata:"",topCategory:{},dispenseContent:{},options:[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}],value:"",tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"}],fileList:[],activeName:"first",firstCateList:[],industrySolutionList:[],solutionPageNum:1,solutionPageSize:10,solutionTotal:1,navigationList:[],navigation:{},navigationId:"",showEdit:[],showBtn:[],addFlag:!1,cateTwoKeywords:[],mode:"add",categoryTwoId:""}},created:function(){this.init()},mounted:function(){for(var t=this,e=0;e<this.navigationList.length;e++)this.showEdit[e]=!1,this.showBtn[e]=!1;Object(o["M"])({}).then((function(e){if(e.data){t.firstCateList=e.data;var n=!0,a=!1,i=void 0;try{for(var o,l=e.data[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var s=o.value;if("行业解决方案"==s.categoryName){t.cateTwoKeywords=s.childrenList;break}}}catch(r){a=!0,i=r}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}}}))},methods:{init:function(){var t=this,e={};Object(o["I"])(e).then((function(e){t.topdata=e.data})),Object(o["E"])(e).then((function(e){t.dispenseContent=e.data})),this.getIndustrySolution(),this.getAllNav()},handleTopEdit:function(t,e){this.$local.clear("topEditData"),this.$local.set("topEditData",JSON.stringify(e)),this.$router.push({path:"/topFloorDetail",query:{id:1}})},handleTopOffline:function(t,e){var n=this,a=e.enable;a=1==a?0:1;var i={id:e.id,enable:a};Object(o["n"])(i).then((function(t){n.init()}))},handleTopDelete:function(t,e){var n=this;this.$confirm("此操作将永久删除该楼层, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["w"])({id:e.id}).then((function(t){200==t.code&&(n.$message.success("删除成功"),n.init())}))})).catch((function(){n.$message.info("已取消删除")}))},dispenseOnOrOut:function(t,e){var n=this,a=Math.abs(t.enable-1),i={id:t.id,enable:a};Object(o["n"])(i).then((function(t){n.init()}))},dispenseDelete:function(t,e){var n=this;this.$confirm("此操作将永久删除该楼层, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["w"])({id:t.id}).then((function(t){200==t.code&&(n.$message.success("删除成功"),n.init())}))})).catch((function(){n.$message.info("已取消删除")}))},handleSizeChange:function(){},handleClick:function(t,e){console.log(t,e)},toTopFloor:function(){this.$router.push({path:"/topFloorDetail",query:{id:2}})},toDistributeDetail:function(){this.$router.push({path:"/distributeFloorDetail"})},toSolutionDetail:function(){this.$router.push({path:"/solutionDetail"})},dispenseUpdate:function(t,e){this.$store.commit("saveDispenseDetail",t),this.$router.push({path:"/distributeFloorDetail"})},getIndustrySolution:function(){var t=this,e={categoryTwoId:this.categoryTwoId,pageNum:this.solutionPageNum,pageSize:this.solutionPageSize};Object(o["S"])(e).then((function(e){200==e.code&&(t.industrySolutionList=e.data.dataList,t.solutionTotal=e.data.totalCount,t.solutionPageNum>e.data.totalPage&&e.data.totalPage>1?(t.solutionPageNum=e.data.totalPage-1,t.getIndustrySolution()):t.solutionPageNum>e.data.totalPage&&1==e.data.totalPage&&(t.solutionPageNum=1,t.getIndustrySolution()))}))},solutionSizeChange:function(t){this.solutionPageSize=t,this.getIndustrySolution()},solutionCurrentChange:function(t){this.solutionPageNum=t,this.getIndustrySolution()},getAllNav:function(){var t=this;Object(o["N"])({}).then((function(e){t.navigationList=e.data}))},solutionEdit:function(t,e){this.$store.commit("saveSolutionInfo",e),this.$router.push("/solutionDetail")},filterSolution:function(){var t=!0,e=!1,n=void 0;try{for(var a,i=this.navigationList[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value;this.navigationId==o.id&&(this.categoryTwoId=o.categoryTwoId)}}catch(l){e=!0,n=l}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}this.getIndustrySolution()},solutionOnOrOut:function(t,e){var n=this,a=Math.abs(e.enable-1),i={id:e.id,enable:a};Object(o["Fb"])(i).then((function(t){200==t.code&&n.getIndustrySolution()}))},solutionDelete:function(t,e){var n=this;this.$confirm("此操作将永久删除该解决方案, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["v"])({id:e.id}).then((function(t){200==t.code&&(n.$message.success("删除成功"),n.getIndustrySolution())}))})).catch((function(){n.$message.info("已取消删除")}))},navEdit:function(t,e){this.showEdit[t]=!0,this.showBtn[t]=!0,this.$set(this.showEdit,t,!0),this.$set(this.showBtn,t,!0),this.mode="edit"},navSubmit:function(t,e){var n=this;if(this.showEdit[t]=!1,this.showBtn[t]=!1,this.$set(this.showEdit,t,!1),this.$set(this.showBtn,t,!1),!e.navigationName)return this.$message.warning("请输入导航名称"),!1;if(!e.categoryTwoId)return this.$message.warning("选择二级类目"),!1;if(!e.sort)return this.$message.warning("请输入排序"),!1;var a={id:e.id,navigationName:e.navigationName,categoryTwoId:e.categoryTwoId,sort:e.sort};Object(o["g"])(a).then((function(t){200==t.code?("add"==n.mode?n.$message.success("添加成功"):n.$message.success("修改成功"),n.getAllNav()):n.$message.warning(t.msg)}))},navOnOrout:function(t,e){var n=this;2==e.publishState?e.publishState=3:(e.publishState,e.publishState=2);var a={id:e.id,publishState:e.publishState};Object(o["Bb"])(a).then((function(t){200==t.code?n.getAllNav():n.$message.warning(t.msg)}))},navDelete:function(t,e){var n=this;this.$confirm("此操作将永久删除该导航, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["s"])({id:e.id}).then((function(t){200==t.code&&(n.$message.success("删除成功"),n.getAllNav())}))})).catch((function(){n.$message.info("已取消删除")}))},addNavigation:function(){this.mode="add",this.addFlag=!0,this.navigationList.push({id:"",categoryTwoId:"",navigationName:"",sort:"",publishState:1}),this.showEdit[this.navigationList.length-1]=!0,this.showBtn[this.navigationList.length-1]=!0,this.$set(this.showEdit,this.navigationList.length-1,!0),this.$set(this.showBtn,this.navigationList.length-1,!0)}}},s=l,r=(n("bba8"),n("e48d"),n("2877")),u=Object(r["a"])(s,a,i,!1,null,"39a4e718",null);e["default"]=u.exports},"4e82":function(t,e,n){"use strict";var a=n("23e7"),i=n("1c0b"),o=n("7b0b"),l=n("d039"),s=n("b301"),r=[].sort,u=[1,2,3],c=l((function(){u.sort(void 0)})),d=l((function(){u.sort(null)})),h=s("sort"),p=c||!d||h;a({target:"Array",proto:!0,forced:p},{sort:function(t){return void 0===t?r.call(o(this)):r.call(o(this),i(t))}})},bba8:function(t,e,n){"use strict";var a=n("f94e"),i=n.n(a);i.a},e48d:function(t,e,n){"use strict";var a=n("f42b"),i=n.n(a);i.a},f42b:function(t,e,n){},f94e:function(t,e,n){}}]);