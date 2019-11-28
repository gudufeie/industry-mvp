import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import store from './store/';
import moment from 'moment';
import local from './config/mUtils'
Vue.prototype.$local = local

import rules from "./config/rules"
Vue.prototype.$rules = rules;


// 时间戳转换为时间
Vue.filter('formatDate', (time) => {
  let formatTime;
  if (time) {
    const date = new Date(time);
    formatTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
  } else {
    formatTime = '';
  }
  return formatTime;
});

Vue.config.productionTip = false
// 使用 ElementUI
Vue.use(ElementUI);
  router.beforeEach((to, from , next) =>{
    if(localStorage.getItem("password") == null && localStorage.getItem("username") == null){
      if(to.path !== '/login'){
        next({path:'/login'})
      }else {
        next()
      }
    }else{
      next()
    }
  })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
