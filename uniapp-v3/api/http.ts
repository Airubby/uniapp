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

import { options } from "less"

const baseURL=""

//添加拦截器
const httpInterceptor={
	invoke(options:UniApp.RequestOptions){
		//1、非http开头需要拼接地址
		if(!options.url.startsWith('http')){
			options.url=baseURL+options.url
		}
		//2、请求超时，默认60s
		options.timeout=10000
		//3、添加小程序端请求头标识
		options.header={
			...options.header,
			'source-client':'miniapp'  //小程序添加头信息，根据实际添加
		}
		//4、添加token请求头标识
		const token="从store中获取token"
		if(token){
			options.header.Authorization=token
		}
		
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
	code:string,
	msg:string,
	result:T
}
const http=<T>(options:UniApp.RequestOptions)=>{
	//1、返回 Promise 对象
	return new Promise<Data<T>>((resolve,reject)=>{
		uni.request({
			...options,
			success(res) {
				if(res.statusCode>=200&& res.statusCode<300){
					resolve(res.data as Data<T>)
				}else if(res.statusCode===401){
					//清理登录信息,然后跳转到登录页
					uni.navigateTo({
						url:"/pages/login"
					})
					reject(res)
				}else{
					uni.showToast({
						icon:'none',
						title:(res.data as Data<T>).msg||'请求错误'
					})
					reject(res)
				}
			},
			fail(err) {
				uni.showToast({
					icon:'none',
					title:'网络错误，换个网络试试'
				})
				reject(err)
			}
		})
	})
}


/**
 * 使用的地方
 * import {http} "@/utils/http"
 * const res = await http<any>({
	  method:'GET',
	  url:'/getMenu',
	  header:{}
 })
 */