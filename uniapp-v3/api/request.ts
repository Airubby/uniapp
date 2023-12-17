
import {usePermissionStore} from "@/store"
import serverConfig from '@/utils/serverConfig';
import { autority } from "@/common"
const baseConfig = { // 有效配置项只有三个
	// baseURL: 'https://www.fastmock.site/mock/b5aeba034aac038de76b613109a5cce7/test', //baseURL
	baseURL: serverConfig.baseSite,
	timeout: 5000, // 超时时间
}

let acitveAxios = 0;
let timer: any = null;
const showLoading = (config) => {
	console.log(config)
	if (!config||!config.noLoading) {
		acitveAxios++;
		if (timer) {
			clearTimeout(timer);
		}
		console.log(acitveAxios)
		timer = setTimeout(() => {
			if (acitveAxios > 0) {
				uni.showLoading({
					title: config.loadingMsg||'数据加载中...',
					mask: true
				})
			}
		}, 400);
	}
};
const closeLoading = (config) => {
	if(!config||!config.noLoading){
		acitveAxios--;
		if (acitveAxios <= 0) {
			clearTimeout(timer);
			uni.hideLoading()
		}
	}
};
const response=(res,reject?)=>{
	if(res.message){
	  uni.showToast({
	      icon: 'none',
	      title: res.message
	  });
	}else{
	  uni.showToast({
	      icon: 'none',
	      title: "服务器异常"
	  });
	}
	reject && reject(res)
}
const permissionStore = usePermissionStore();
/**
 * 添加拦截器
 * 拦截request请求
 * 拦截uploadFile文件上传
 * 
 * todo
 * 1、非http开头需拼接地址
 * 2、请求超时
 * 3、添加小程序端请求头标识
 * 4、添加token请求头标识
 */
//添加拦截器
const httpInterceptor={
	invoke(options:UniApp.RequestOptions){
		//1、非http开头需要拼接地址
		if(!options.url.startsWith('http')){
			options.url=baseConfig.baseURL+options.url
		}
		//2、请求超时，默认60s
		options.timeout=options.timeout||baseConfig.timeout
		//3、添加小程序端请求头标识
		options.header={
			...options.header,
			"Content-Type": "application/json;charset=utf-8",
			"Token":permissionStore.token,  //Authorization
			'source-client':'miniapp'  //小程序添加头信息，根据实际添加
		}
		//responseType:text,arraybuffer  默认text
	}
}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 * 1、返回 Promise 对象
 * 2、请求成功
 *  提取核心数据res.data
 * 	添加类型，支持泛型
 * 3、请求失败
 *  网络错误-提示用户换网络
 *  401错误-清理用户信息，跳转到登录页
 *  其它错误-根据后端错误信息提示
 */

interface Data<T>{
	errorCode:string,
	message:string,
	result:T
}
const service=<T>(options:UniApp.RequestOptions)=>{
	showLoading(options.header)
	//1、返回 Promise 对象
	return new Promise<Data<T>>((resolve,reject)=>{
		uni.request({
			...options,
			success(res) {
				console.log(res)
				if(res.statusCode>=200&& res.statusCode<300){
					if((res.data as Data<T>).errorCode=="-1"){
						response(res.data)
					}
					resolve(res.data as Data<T>)
				}else if(res.statusCode===401){
					response({message:"Token过期,请重新登录"})
					permissionStore.setToken("")
					let routes:any = getCurrentPages(); // 获取当前打开过的页面路由数组
					let curRoute = routes[routes.length - 1].$page.fullPath
					autority(curRoute)
					reject(res)
				}else{
					response({message:(res.data as Data<T>).message||'请求错误'})
					reject(res)
				}
			},
			fail(err) {
				response({message:'网络请求失败：（URL无效|无网络|DNS解析失败|请求时间过长）'})
				reject(err)
			},
			complete:(res)=>{
				closeLoading(options.header)
			}
		})
	})
}

export default service