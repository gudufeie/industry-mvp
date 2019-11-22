import {post, postList} from '../config/axios'
import {baseUrl} from '../config/env'

export const cityGuess = () => {
    return post(baseUrl+'common?source=xw&weather_type=forecast_1h|forecast_24h|index|alarm|limit|tips', {})
};

// 添加一级类目
export const addFirstCate = (params) =>{
    return post(baseUrl+'/product/insertOrUpdate', params);
}

// 获取所有类目
export const loadFirstCateList = (params) => {
    return post(baseUrl+'/product/getAllProduct',params);
} 

// 删除类目
export const deleteCate = (id) => {
    return post(baseUrl+'/product/delete', {id:id});
}

// 更新类目状态
export const updateCateStatus = (params) => {
    return post(baseUrl+'/product/editState', params);
}
// 添加二级类目
export const addSecondCate = (params) => {
    return post(baseUrl+'/product/insertOrUpdateTwoCategory', params);
}

// 更新类目排序
export const updateCateSort = (params) => {
    return postList(baseUrl+'/product/updateSort', params);
}

// 关键词列表查询
export const loadKeyword = (params) =>{
    return post(baseUrl + '/keyword/list', params)
}

// 添加关键词
export const addKeywork = (params) =>{
    return postList(baseUrl + '/keyword/save', params)
}

// 关键词添加关联关键词
export const addKeywordRelation = (params) =>{
    return postList(baseUrl + '/keywordrelation/save_keyWordRelations', params)
}

// 编辑关键词
export const updateKeyword = (params) =>{
    return postList(baseUrl + '/keyword/edit', params)
}

// 关键词下关联关键词添加
export const addRelation = (params) =>{
    return postList(baseUrl + '/keywordrelation/list', params)
}

// 查询关键字详情
export const loadKeywordDetail = (params) =>{
    return post(baseUrl + '/keyword/info', params)
}

// 关键字删除
export const deleteKeyword = (params) =>{
    return post(baseUrl + '/keyword/delete', params)
}

// 修改关键词状态
export const updateKeyStatus = (params) =>{
    return post(baseUrl + '/keyword/start', params)
}

// 查询关联关键词列表
export const loadRelationKeyList = (params) =>{
    return post(baseUrl + '/keywordrelation/list', params)
}

// 查询关联关键词详情
export const loadRelationKeyDetail = (params) =>{
    return post(baseUrl + '/keywordrelation/info', params)
}

// 添加关联关键词
export const addRelationKeyword = (params) =>{
    return postList(baseUrl + '/keywordrelation/save', params)
}

// 修改关联关键词
export const updateRelationKeyword = (params) =>{
    return postList(baseUrl + '/keywordrelation/edit', params)
}

// 删除关联关键词
export const deleteRelationKeyword = (params) =>{
    return post(baseUrl + '/keywordrelation/delete', params)
}


