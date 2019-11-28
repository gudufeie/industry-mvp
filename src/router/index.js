import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import("@/view/login")
const Layout = () => import("@/components/Layout")
const category = () => import("@/view/category")
const keyword = () => import("@/view/keyword")
const association = () => import("@/view/association")
const userlist = () => import("@/view/userlist")
const provider = () => import("@/view/provider")
const product = () => import("@/view/product")
const service = () => import("@/view/service")
const solve = () => import("@/view/solve")
const home = () => import("@/view/home")
const search = () => import("@/view/search")
const demand = () => import("@/view/demand")
const serving = () => import("@/view/serving")
const system = () => import("@/view/system")
const primary = () => import("@/view/primary")
const secondary = () => import("@/view/secondary")
const increase = () => import("@/view/increase")
const associationKeyAdd = () => import("@/view/associationKeyAdd")
const userinfo = () => import("@/view/userinfo")
const productDetail = () => import("@/view/productDetail")
const sloveDetail = () => import("@/view/sloveDetail")
const topFloorDetail = () => import("@/view/topFloorDetail")
const distributeFloorDetail = () => import("@/view/distributeFloorDetail")
const solutionDetail = () => import("@/view/solutionDetail")
const hotKeywordDetail = () => import("@/view/hotKeywordDetail")
const dataManage = () => import('@/view/dataManage')
const serviceDetail = () => import('@/view/serviceDetail')

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/category',
      children: [{
        path: '/category',
        component: category,
        meta: ['基础管理', '类目管理'],
      }, {
        path: '/primary',
        component: primary,
        meta: ['基础管理', '类目管理', '编辑一级类目'],
      }, {
        path: '/secondary',
        component: secondary,
        meta: ['基础管理', '类目管理', '编辑二级类目'],
      }, {
        path: '/keyword',
        component: keyword,
        meta: ['基础管理', '关键词管理'],
      }, {
        path: '/increase',
        component: increase,
        meta: ['基础管理', '关键词管理', '关键词详情'],
      }, {
        path: '/association',
        component: association,
        meta: ['基础管理', '关联关键词'],
      }, {
        path: '/addAssociationKey',
        component: associationKeyAdd,
        meta: ['基础管理', '关键词管理', '关联关键词详情'],
      }, {
        path: '/userlist',
        component: userlist,
        meta: ['用户管理', '用户列表'],
      }, {
        path: '/userinfo',
        component: userinfo,
        name: userinfo,
        meta: ['用户管理', '用户列表', '用户信息'],
      }, {
        path: '/provider',
        component: provider,
        meta: ['供应链管理', '服务商库'],
      }, {
        path: '/product',
        component: product,
        meta: ['供应链管理', '产品库'],
      }, {
        path: '/productDetail',
        component: productDetail,
        name: 'productDetail',
        meta: ['供应链管理', '产品库', '产品信息'],
      }, {
        path: '/service',
        component: service,
        meta: ['供应链管理', '服务库'],
      }, {
        path: '/serviceDetail',
        component: serviceDetail,
        meta: ['供应链管理', '服务库', '服务详情'],
      }, {
        path: '/solve',
        component: solve,
        meta: ['供应链管理', '解决方案库'],
      }, {
        path: '/sloveDetail',
        component: sloveDetail,
        meta: ['供应链管理', '解决方案库', '解决方案详情'],
      }, {
        path: '/home',
        component: home,
        meta: ['内容管理', '首页管理'],
      }, {
        path: '/topFloorDetail',
        component: topFloorDetail,
        meta: ['内容管理', '首页管理', '顶部楼层详情'],
      }, {
        path: '/distributeFloorDetail',
        component: distributeFloorDetail,
        meta: ['内容管理', '首页管理', '分发楼层详情'],
      }, {
        path: '/solutionDetail',
        component: solutionDetail,
        meta: ['内容管理', '首页管理', '解决方案楼层详情'],
      }, {
        path: '/search',
        component: search,
        meta: ['内容管理', '热搜词管理'],
      }, {
        path: '/hotKeywordDetail',
        component: hotKeywordDetail,
        meta: ['内容管理', '热搜词管理', '热搜词详情'],
      }, {
        path: '/dataManage',
        component: dataManage,
        meta: ['数据管理', '行为轨迹'],
      }, {
        path: '/demand',
        component: demand,
        meta: ['需求管理'],
      }, {
        path: '/serving',
        component: serving,
        meta: ['投放管理'],
      }, {
        path: '/system',
        component: system,
        meta: ['系统设置'],
      }],
    }
  ]
})