/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui';
import QS from 'qs';
import store from '../store'


/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {    
    Message({        
        message: msg,        
        duration: 1000,        
        showClose: true,    
    });
}
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',        
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            // store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在'); 
            break;
        case 500:
            tip(other); 
            break;
        default:
            console.log(other);   
        }}
// 环境的切换
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = '/api/v2/';
// } else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'http://api.123dailu.com/';
// }
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// // 请求超时时间
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(    
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;        
        // token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    })

// 响应拦截器
axios.interceptors.response.use(    
    response => {        
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error => {        
        if (error.response.status) {            
            errorHandle(error.response.status, error.response.data.message);
            return Promise.reject(error.response);        
        } else{
            // 处理断网的情况
            // store.commit('changeNetwork', false);
        }       
    }
);
/*
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

/*
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, data = {}) {    
    return new Promise((resolve, reject) => {         
        axios.post(url,QS.stringify(data))        
        .then(res => {         
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

// 参数类型json
export function postList(url, data = {}) {    
    return new Promise((resolve, reject) => {         
        axios.post(
            url,
            JSON.stringify(data),
            {
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }
        )        
        .then(res => {         
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

// 参数类型json
export function postForm(url, data = {}) {    
    return new Promise((resolve, reject) => {         
        axios.post(
            url,
            data,
            // {
            //     headers:{'Content-Type': 'multipart/form-data; charset=utf-8'}
            // }
        )        
        .then(res => {         
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}



