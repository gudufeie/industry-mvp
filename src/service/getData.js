import { post, postList } from '../config/axios'
import { baseUrl } from '../config/env'
import { stringify } from 'querystring';

export const cityGuess = () => {
    return post(baseUrl + 'common?source=xw&weather_type=forecast_1h|forecast_24h|index|alarm|limit|tips', {})
};

// 获取所有类目类型
export const loadCateTypes = (params) => {
    return post(baseUrl + '/product/getAllType', params);
}

// 添加一级类目
export const addFirstCate = (params) => {
    return post(baseUrl + '/product/insertOrUpdate', params);
}

// 获取所有一级类目
export const loadFirstCateList = (params) => {
    return post(baseUrl + '/product/getAllProduct', params);
}

// 获取所有类目
export const loadAllCateList = (params) => {
    return post(baseUrl + '/product/getAllChildren', params);
}

// 删除类目
export const deleteCate = (id) => {
    return post(baseUrl + '/product/delete', { id: id });
}

// 更新类目状态
export const updateCateStatus = (params) => {
    return post(baseUrl + '/product/editState', params);
}
// 添加二级类目
export const addSecondCate = (params) => {
    return post(baseUrl + '/product/insertOrUpdateTwoCategory', params);
}

// 更新类目排序
export const updateCateSort = (params) => {
    return postList(baseUrl + '/product/updateSort', params);
}

// 关键词列表查询
export const loadKeyword = (params) => {
    return post(baseUrl + '/keyword/list', params)
}

// 添加关键词
export const addKeywork = (params) => {
    return postList(baseUrl + '/keyword/save', params)
}

// 关键词添加关联关键词
export const addKeywordRelation = (params) => {
    return postList(baseUrl + '/keywordrelation/save_keyWordRelations', params)
}

// 编辑关键词
export const updateKeyword = (params) => {
    return postList(baseUrl + '/keyword/edit', params)
}

// 关键词下关联关键词添加
export const addRelation = (params) => {
    return postList(baseUrl + '/keywordrelation/list', params)
}

// 查询关键字详情
export const loadKeywordDetail = (params) => {
    return post(baseUrl + '/keyword/info', params)
}

// 关键字删除
export const deleteKeyword = (params) => {
    return post(baseUrl + '/keyword/delete', params)
}

// 修改关键词状态
export const updateKeyStatus = (params) => {
    return post(baseUrl + '/keyword/start', params)
}

// 查询关联关键词列表
export const loadRelationKeyList = (params) => {
    return post(baseUrl + '/keywordrelation/list', params)
}

// 查询关联关键词详情
export const loadRelationKeyDetail = (params) => {
    return post(baseUrl + '/keywordrelation/info', params)
}

// 添加关联关键词
export const addRelationKeyword = (params) => {
    return postList(baseUrl + '/keywordrelation/save', params)
}

// 修改关联关键词
export const updateRelationKeyword = (params) => {
    return postList(baseUrl + '/keywordrelation/edit', params)
}

// 删除关联关键词
export const deleteRelationKeyword = (params) => {
    return post(baseUrl + '/keywordrelation/delete', params)
}


//---------------------------------服务商库----------------------------------
// 查询所有服务商
export const loadBusinessList = (params) => {
    return postList(baseUrl + '/business/list', params)
}

// 服务商模糊查询
export const searchBusiness = (params) => {
    return post(baseUrl + '/business/search', params)
}

// 查询服务商详情
export const getBusinessInfo = (params) => {
    return post(baseUrl + '/business/info', params)
}

// 查询出售中/已下架产品数量
// params ={
//     businessId:string  服务商ID
// }
export const getProductCount = (params) => {
    return post(baseUrl + '/businessproudct/getcount', params)
}

// 编辑产品信息
// params ={
//   "businessId": "string",
//   "id": "string",
//   "productDetail": "string",
//   "productName": "string",
//   "productPic": "string",
//   "productPrice": 0,
// }
export const updateProduct = (params) => {
    return postList(baseUrl + '/businessproudct/edit', params)
}

// 查询服务商发布的产品列表
// params = {
//     businessId :string,
//     pageNum :int,
//     pageSize :int,
//     publish :0/1  0-未发布，1-发布
// }
export const loadPublishProduct = (params) => {
    return post(baseUrl + '/businessproudct/publishbusiness', params)
}

// 产品上下线
// params ={
//     enabled :0/1   0-下线，1-上线
//     id:string     产品ID
// }
export const productOnOrOutline = (params) => {
    return post(baseUrl + '/businessproudct/upline', params)
}

// 产品删除
// params ={
//     id:string     产品ID
// }
export const productDelete = (params) => {
    return post(baseUrl + '/businessproudct/delete', params)
}

// 产品详情
// params ={
//     id:string     产品ID
// }
export const loadProductDetail = (params) => {
    return post(baseUrl + '/businessproudct/info', params)
}


// 新增产品
// params ={
//     id:string     产品ID
// }
export const productAdd = (params) => {
    return postList(baseUrl + '/businessproudct/save', params)
}


// 新增产品
// params ={
//     id:string     产品ID
// }
export const productEdit = (params) => {
    return postList(baseUrl + '/businessproudct/edit', params)
}


// ----------------------------------------------商家店铺-------------------------------------------------
// 服务商店铺添加
// params ={
//     
// }
export const addStore = (params) => {
    return postList(baseUrl + '/businessshop/save', params)
}

// 服务商店铺修改
// params ={
//     
// }
export const updateStore = (params) => {
    return postList(baseUrl + '/businessshop/edit', params)
}


// -----------------------------------------------商家发布的服务---------------------------------------------
// 发布的服务列表查询
// params = {
//     businessId:string,   服务商ID
//     pageNum:int,
//     pageSize:int
// }
export const loadServiceList = (params) => {
    return post(baseUrl + '/businessService/publishservicelist', params)
}

// 服务删除
export const deleteService = (params) => {
    return post(baseUrl + '/businessService/delete', params)
}

// 服务数量统计
// params = {
//     businessId:string,   服务商ID
// }
export const getServiceCount = (params) => {
    return post(baseUrl + '/businessService/getCount', params)
}

// 服务上下线
// params = {
//     businessId:string,   服务商ID
//     enabled:0/1  
// }
export const serviceOnOutline = (params) => {
    return post(baseUrl + '/businessService/upline', params)
}

// 发布的服务修改
// params = object
export const serviceUpdate = (params) => {
    return postList(baseUrl + '/businessService/edit', params)
}

// 服务库列表查询
// params = object
export const loadBusiServiceList = (params) => {
    return postList(baseUrl + '/businessService/list', params)
}

// 服务详情
// params = {
//     id:'string'
// }
export const loadServiceDetail = (params) => {
    return post(baseUrl + '/businessService/info', params)
}

// 服务新增
// params = object
export const serviceAdd = (params) => {
    return postList(baseUrl + '/businessService/save', params)
}

// 服务修改
// params = object
export const serviceEdit = (params) => {
    return postList(baseUrl + '/businessService/edit', params)
}


// -----------------------------------------------------发布的解决方案------------------------------
// 解决方案上下线
// params = {
//     businessId:string,   服务商ID
//     enabled:0/1  
// }
export const solutionOnOutline = (params) => {
    return post(baseUrl + '/businesssolution/upline', params)
}

// 解决方案删除
// params = {
//     id:string,   解决方案ID 
// }
export const solutionDelete = (params) => {
    return post(baseUrl + '/businesssolution/delete', params)
}

// 解决方案数量统计
// params = {
//     businessId:string,   解决方案ID 
// }
export const solutionCount = (params) => {
    return post(baseUrl + '/businesssolution/getcount', params)
}

// 解决方案列表查询
// params = {
//     businessId:string,   解决方案ID 
//       pageNum: int,
//       pageSize: int,
//       publish: 0/1     0-未发布，1-已发布
// }
export const loadSolutionList = (params) => {
    return postList(baseUrl + '/businesssolution/list', params)
}

// 解决方案修改
// params = {
//       id:string,   解决方案ID 
//       solutionName: string,
//       solutionPrice: string,
//       solutionDescription:string
// }
export const solutionUpdate = (params) => {
    return postList(baseUrl + '/businesssolution/edit', params)
}

// 解决方案新增
// params = {
//       id:string,   解决方案ID 
//       solutionName: string,
//       solutionPrice: string,
//       solutionDescription:string
// }
export const solutionAdd = (params) => {
    return postList(baseUrl + '/businesssolution/save', params)
}

// 解决方案详情
// params = {
//       id:string,   解决方案ID 
// }
export const loadSolutionDetail = (params) => {
    return post(baseUrl + '/businesssolution/info', params)
}

// -------------------------------------------产品库--------------------------------------
// 产品库查询
// params = {}
export const loadProductList = (params) => {
    return postList(baseUrl + '/businessproudct/list', params)
}


// -----------------------------------------关键词-------------------------------------------
// -------------------------------------------产品库--------------------------------------
// 标签快速新增
// params = {
//     {
//         categoryOneId: "string",
//         categoryOneName: "string",
//         categoryTwoId: "string",
//         categoryTwoName: "string",
//         keyWordName: "string"
//     }
// }
export const tagsAdd = (params) => {
    return postList(baseUrl + '/keyword/add', params)
}

// 标签快速新增
// params = {
// categoryOneId:'',
// categoryTwoId:'',
//     keyWordName:string
//     }
export const searchTag = (params) => {
    return post(baseUrl + '/keyword/findkeyword', params)
}


// ------------------------------------------服务商--------------------------------
// 新增商家
// params = {
// businessName: "string",
// contact: "string",
// id: "string"
//     }
export const businessAdd = (params) => {
    return postList(baseUrl + '/business/save', params)
}
// --------------------首页管理----------------------

// 获取顶部楼层内容

export const getTopdata = (params) => {
    return post(baseUrl + '/contentManager/findTopContent', params)
}
// 编辑新增顶部楼层
export const editTopdata = (params) => {
    return post(baseUrl + '/contentManager/saveOrUpdateTopContent', params)
}
// 更改顶部楼层状态
export const changeTopstatus = (params) => {
    return post(baseUrl + '/contentManager/updateTopContentEnable', params)
}
// 删除顶部楼层和分发层内容
export const deleteTop = (params) => {
    return post(baseUrl + '/contentManager/deleteTop', params)
}
// 获取顶部楼层二级内容
export const editSecondary = (params) => {
    return post(baseUrl + '/contentManager/findTwoTopContent', params)
}
// 获取顶部楼层二级内容的跳转类型
export const getSecondarytype = (params) => {
    return post(baseUrl + '/product/getAllType', params)
}
// 获取顶部楼层二级内容的所有二级类目
export const getTwoProduct = (params) => {
    return post(baseUrl + '/product/getAllTwoProduct', params)
}
// 编辑或新增顶部楼层中二级内容
export const getTwoTopContent = (params) => {
    return post(baseUrl + '/contentManager/saveOrUpdateTwoTopContent', params)
}
// 删除顶部楼层和分发楼层二级内容
export const getDeleteTopContent = (params) => {
    return post(baseUrl + '/contentManager/delete', params)
}

// --------------------------------分发楼层--------------------------------
// 获取分发楼层内容
export const getDispenseContent = (params) =>{
    return post(baseUrl + '/contentManager/findDispenseContent', params)
}

//添加或更新分发楼层
export const addDispense = (params) =>{
    return post(baseUrl + '/contentManager/saveOrUpdateDispenseContent', params)
}

// 获取分发楼层二级内容
export const loadDispenseTwo = (params) =>{
    return post(baseUrl + '/contentManager/findTwoDispenseContent', params)
}

// 添加或编辑关键词明细
export const addEditKeywordDetail = (params) =>{
    return post(baseUrl + '/contentManager/saveOrUpdateKeyWord', params)
}

// 删除分发楼层二级内容
export const configKeyDelete = (params) =>{
    return post(baseUrl + '/contentManager/delete', params)
}

// 查询二级类目下的关键词
export const getCateTwoKeyword = (params) =>{
    return post(baseUrl + '/contentManager/findAllKeyWordByTwoCategoryId', params)
}

// 查询所有配置词
export const getAllKey = (params) =>{
    return post(baseUrl + '/contentManager/findAllKey', params)
}

// 新增或修改配置词
export const addOrUpdateConfigKey = (params) =>{
    return post(baseUrl + '/contentManager/saveOrUpdateKey', params)
}

// 删除配置词
export const deleteConfigKey = (params) =>{
    return post(baseUrl + '/contentManager/deleteKey', params)
}


// ------------------------------------行业解决方案------------------------------------

// 查询解决方案列表
export const loadIndustrySolution = (params) =>{
    return post(baseUrl + '/contentManager/findSolutionBySolutionSortId', params)
}

// 新增解决方案
export const addSolution = (params) =>{
    return post(baseUrl + '/contentManager/insertSolution', params)
}

// 修改解决方案
export const updateSolution = (params) =>{
    return post(baseUrl + '/contentManager/updateSolutionById', params)
}

// 更改解决方案状态
export const updateSolutionEnable = (params) =>{
    return post(baseUrl + '/contentManager/updateSolutionEnableById', params)
}

// 删除解决方案
export const deleteSolution = (params) =>{
    return post(baseUrl + '/contentManager/deleteSolutionById', params)
}



// ----------------------------------热搜词--------------------------------------
// 获取所有热搜词
export const hotWord = (params) => {
    return post(baseUrl + '/contentManager/findAllHotWord', params)
}
// 下线热搜词
export const updateHotWordEnable = (params) => {
    return post(baseUrl + '/contentManager/updateHotWordEnable', params)
}
// 编辑新增编辑热搜词
export const addhotWord = (params) => {
    return post(baseUrl + '/contentManager/saveOrUpdateHotWord', params)
}
// 删除热搜关键词
export const delhotword = (params) => {
    return post(baseUrl + '/contentManager/deleteHotWord', params)
}


// ----------------------------------导航排序------------------------------------------
// 查询导航列表
export const loadAllNav = (params) => {
    return post(baseUrl + '/contentManager/solutionSort', params)
}

// 修改或新增导航
export const addOrUpdateNav = (params) => {
    return post(baseUrl + '/contentManager/saveOrUpdateSolutionSort', params)
}

// 导航修改状态
export const updateNavEnable = (params) => {
    return post(baseUrl + '/contentManager/UpdateSolutionSortEnable', params)
}

// 导航删除
export const deleteNav = (params) => {
    return post(baseUrl + '/contentManager/deleteSolutionSort', params)
}

// 查询除推荐之外所有的导航
export const loadNavSort = (params) => {
    return post(baseUrl + '/contentManager/findAllSolutionSort', params)
}


// ------------------------------------------用户管理------------------------------------------
// 查询用户列表
export const loadUserList = (params) => {
    return post(baseUrl + '/usersManager/findPage', params)
}

// 查询用户详细信息
export const loadUserInfo = (params) => {
    return post(baseUrl + '/usersManager/findUserInfoById', params)
}

// 修改用户信息
export const updateUser = (params) => {
    return post(baseUrl + '/usersManager/updateUserInfo', params)
}

// 查询用户企业信息
export const loadEnterpriseInfo = (params) => {
    return post(baseUrl + '/businessManager/findBusinessInfoById', params)
}

// 修改用户企业信息
export const updateEnterpriseInfo = (params) => {
    return postList(baseUrl + '/businessManager/updateBusinessInfo', params)
}

// 查询联系人
export const loadContactList = (params) => {
    return post(baseUrl + '/businessContact/findContactInfoById', params)
}

// 新增或修改联系人
export const addOrupdateContact = (params) => {
    return postList(baseUrl + '/businessContact/insertOrUpdateContact', params)
}

// 删除联系人
export const deleteContact = (params) => {
    return post(baseUrl + '/businessContact/deleteContact', params)
}