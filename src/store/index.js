import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)
const state = {
	changeNetwork:true,
	shopDetail:'',
	keywordInfo:{},   //关键字详情
	relationKeyword:{},  //关联关键字详情
	userInfo:{},
	providerInfo:{}

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})