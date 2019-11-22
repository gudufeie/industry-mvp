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
    }
}
