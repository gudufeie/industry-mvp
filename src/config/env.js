// 环境的切换

let baseUrl = ''; 

if (process.env.VUE_APP_CURRENTMODE == 'development') {    
    // baseUrl = 'http://10.234.16.69:10004';
    baseUrl = 'http://10.234.19.98:10004';
} else if (process.env.VUE_APP_CURRENTMODE == 'qa') {    
    baseUrl = 'http://106.15.199.37:10004/';
} else if (process.env.VUE_APP_CURRENTMODE == 'production') {    
    baseUrl = 'http://api.123dailu.com/';
}

export {
	baseUrl
}