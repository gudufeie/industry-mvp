import {ADD_CART} from './mutation-types.js'

import local from '../config/mUtils'

export default{
    [ADD_CART](state, detail) {
        state.shopDetail = detail;
        local.set('buyCart', state.shopDetail);
    },
    
    saveKeyword(state, keyword) {
        // 保存关键字信息
        state.keywordInfo = keyword;
        local.set('keyword', JSON.stringify(keyword));
    },

    saveRelationKey(state, relationKey) {
        // 保存关联关键字信息
        state.relationKeyword = relationKey;
        local.set('relationKeyword', JSON.stringify(relationKey));
    },

    saveUserInfo(state,userInfo){
        // 保存用户信息
        state.userInfo =userInfo;
        local.set('userInfo',JSON.stringify(userInfo))
    },

    saveProviderInfo(state,providerInfo){
        //保存服务商详情
        state.providerInfo = providerInfo;
        local.set('providerInfo',JSON.stringify(providerInfo))
    },

    saveProductInfo(state,productInfo){
        // 保存产品信息
        state.productInfo = productInfo;
    },

    saveSolutionInfo(state,solutionInfo){
        // 保存解决方案信息
        state.solutionInfo = solutionInfo;
    },
    // 保存顶部楼层目信息
    saveTopEditData(state,topEdit){
        state.topEditData=topEdit;
    },

    // 保存服务信息
    saveServiceInfo(state,serviceInfo){
        state.serviceInfo = serviceInfo;
    },

    // 保存分发楼层信息
    saveDispenseDetail(state,dispenseDetail){
        state.dispenseDetail = dispenseDetail;
    },

    // 保存分发楼层信息
    saveDispenseDetail(state,dispenseDetail){
        state.dispenseDetail = dispenseDetail;
    },

    // 保存分发楼层信息
    saveHotKeyDetail(state,hotKeyInfo){
        state.hotKeyInfo = hotKeyInfo;
    },
}
