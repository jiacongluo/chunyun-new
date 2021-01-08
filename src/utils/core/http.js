/* eslint-disable */
import theaxios from 'axios';
import cookie from './cookie.js'
import qs from 'qs'
import utils from '@/utils'

// 默认配置
const axios = theaxios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 30000,
});
const axios2 = theaxios.create({
    baseURL: '',
    timeout: 30000,
});

// 请求拦截
// theaxios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });
// 
// 请求拦截
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 在发送请求之前做某件事
    // toast.showLoading()
	let url = config.url.split('?')[0]
	// debugger
	if(url != "api/platformLogin/loginVerify"){
		// console.log(cookie.getCookie('userName'))
		// debugger
		if(!cookie.getCookie('userName')){
			window.location.href="login.html"
		}else{
			
		}
		
	}else{
		// debugger
		if (config.method === "post") {
		    // 序列化
		    config.data = qs.stringify(config.data);
		    // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
		}
	}
	
    return config;
}, function (error) {
    // Do something with request error
    // toast.hideLoading()
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

// get请求
export async function get(url, params = {}) {
    try {
        let res = await axios.get(url, params);
        return new Promise((resolve, reject) => {
            resolve(res.data);
        })
    } catch (err) {
        console.log(err);
    }
}

// get请求
export async function get2(url, params = {}) {
    try {
        let res = await axios2.get(url, params);
        return new Promise((resolve, reject) => {
            resolve(res.data);
        })
    } catch (err) {
        console.log(err);
    }
}

const os = {
    windows: /Windows/ig.test(navigator.userAgent),
    macos: /Mac OS/ig.test(navigator.userAgent)
}

// post 请求
// export async function post(url, params = {}) {
//     let theUrl = url
//     try {
//         console.log(`开始访问: ${theUrl}`)
//         let res = await theaxios.post(url, params);
//         return new Promise((resolve) => {
//             // if (data.retcode === 0) {
//             resolve(res.data);
//             // }
//         })
//     } catch (err) {
//         console.log(`请求出错: ${theUrl}`)
//         console.log(err);
//     }
// }

// 封装theaxios的post请求
export async function post(url, params = {}) {
    let theRequestUrl = url
    console.log('开始访问:' + theRequestUrl)
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(theRequestUrl + ':请求出错')
                reject(error)
            })
    })
}

export async function post2(url, params = {}) {
    let theRequestUrl = url
    console.log('开始访问:' + theRequestUrl)
    return new Promise((resolve, reject) => {
        axios2.post(url, params)
            .then(response => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(theRequestUrl + ':请求出错')
                reject(error)
            })
    })
}

export async function getData(url, params = {}) {
    var theLinkChar = "?";
    if (url && url.indexOf('?') >= 0) {
        theLinkChar = "&";
    }
    let theRequestUrl = url + theLinkChar + utils.toQuery(params)

    try {
        let res = await axios.get(theRequestUrl, {});
        return new Promise((resolve, reject) => {
            resolve(res.data);
        })
    } catch (err) {
        console.log(err);
    }
}

export async function postData(url, params = {}) {
    let api = '/api'
    let theRequestUrl = api + url + '?' + utils.toQuery(params)
    // console.log('开始访问:' + theRequestUrl)
    return new Promise((resolve, reject) => {
        axios.post(theRequestUrl, params)
            .then(response => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(theRequestUrl + ':请求出错')
                reject(error)
            })
    })
}
