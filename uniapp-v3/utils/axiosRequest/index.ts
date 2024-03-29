
import axios from 'axios'

// import { getFullURL } from './getFullURL'

const service = axios.create({
	// Web 侧可以通过 vite.config.js 中的 proxy 配置，指定代理
	// 小程序APP里需写完整路径，如 https://service-rbji0bev-1256505457.cd.apigw.tencentcs.com/release
	// 可使用条件编译,详见 https://uniapp.dcloud.io/tutorial/platform.html#preprocessor
	// #ifdef H5
	baseURL: "",
	// #endif
	// #ifndef H5
	// @ts-ignore
	baseURL: '',
	// #endif
	adapter(config) {
		console.log('request adapter ↓↓')
		console.log(config)
		const { url, method, data, params, headers, baseURL, paramsSerializer } = config
		var buildURL = require('axios/lib/helpers/buildURL');
		return new Promise((resolve, reject) => {
			uni.request({
				method: method!.toUpperCase() as any,
				// url: getFullURL(baseURL || '', url!, params, paramsSerializer),
				url: baseURL + buildURL(url, params, paramsSerializer),
				header: headers,
				data,
				dataType: 'json',
				responseType: config.responseType,
				success: (res: any) => {
					console.log('request success ↓↓')
					console.log(res)
					resolve(res)
				},
				fail: (err: any) => {
					reject(err)
				}
			})
		})
	}
})

/**
 * 请求拦截
 */
service.interceptors.request.use((config) => {
	const { method, params } = config
	// 附带鉴权的token
	const headers: any = {
		token: uni.getStorageSync('token')
	}
	// 不缓存get请求
	if (method === 'get') {
		headers['Cache-Control'] = 'no-cache'
	}
	// delete请求参数放入body中
	if (method === 'delete') {
		headers['Content-type'] = 'application/json;'
		Object.assign(config, {
			data: params,
			params: {}
		})
	}

	return {
		...config,
		headers
	}
})

/**
 * 响应拦截
 */
service.interceptors.response.use((res) => {
	if (res.data?.code === 401) {
		uni.removeStorageSync('token')
		// alert('即将跳转登录页。。。', '登录过期')
		// setTimeout(redirectHome, 1500)
		return res.data
	}

	// @ts-ignore
	if ((res.status || res.statusCode) === 200) {
		return res.data
	}
	// alert(res.statusText, '网络错误')
	return Promise.reject(res)
})

export default service
