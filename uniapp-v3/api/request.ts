
// import usePermissionStore from "@/store/modules/permissionStore"
import {usePermissionStore} from "@/store/index"

const baseConfig = { // 有效配置项只有三个
	// baseURL: 'https://www.fastmock.site/mock/b5aeba034aac038de76b613109a5cce7/test', //baseURL
	baseURL: "http://ymk.loncomip.com:3310",
	timeout: 5000, // 超时时间
}

let acitveAxios = 0;
let timer: any = null;
const showLoading = (config) => {
	if (!config||!config.noLoading) {
		acitveAxios++;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			if (acitveAxios > 0) {
				uni.showLoading({
					title: '数据加载中...',
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
function request(method, url, data , config) {
	const permissionStore = usePermissionStore();
	let reqtimer;
	let timeout = baseConfig.timeout;
	if(config && config.timeout){
		timeout = config.timeout
	}
	
	let header= {
		"Content-Type": "application/json;charset=utf-8",
		"Token":permissionStore.token
	}
	if(config&&config.header){
		header={
			...header,
			...config.header
		}
	}
	let _watcher={abort:null}
	let requestTask:any
	return new Promise((resolve, reject) => {
		requestTask = uni.request({
			url: baseConfig.baseURL + url,
			data,
			method,
			header,
			timeout,
			success: res => {
				clearTimeout(reqtimer)
				res.statusCode === 200 ? resolve(res.data) : reject(res.data)
			},
			fail: res => {
				clearTimeout(reqtimer)
				_watcher.abort ? reject({errorCode:-1,message:'网络请求失败：主动取消'}) : reject({errorCode:-1,message:'网络请求失败：（URL无效|无网络|DNS解析失败|请求时间过长）'})
			}
		})
		reqtimer = setTimeout(() => {
			requestTask.abort()
			reject({errorCode:-1,message:'网络请求时间超时'})
		}, timeout)
	})
}
function response(res,reject?){
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
function serialize(obj, prefix?){
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      //为数组或者对象
      str.push((v !== null && typeof v === "object") ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
const service = {
	get: function (url, data?, config?) {
		showLoading(config)
		return new Promise((resolve, reject) => {
			request("GET", url, data, config).then((res:any)=>{
				closeLoading(config)
				if(res.errorCode=="-1"){
					response(res)
				}
				resolve(res)
			}).catch(err=>{
				closeLoading(config)
				response(err,reject)
			})
		})
	},
	post: function (url, data?, config?) {
		showLoading(config)
		return new Promise((resolve, reject) => {
			request("POST", url, data, config).then((res:any)=>{
				closeLoading(config)
				if(res.errorCode=="-1"){
					response(res)
				}
				resolve(res)
			}).catch(err=>{
				closeLoading(config)
				response(err,reject)
			})
		})
	},
	//post请求，参数放地址栏
	postQuery: function (url, data?, config?) {
		showLoading(config)
		let newurl=url+"?"+serialize(data);
		return new Promise((resolve, reject) => {
			request("POST", newurl, null, config).then((res:any)=>{
				closeLoading(config)
				if(res.errorCode=="-1"){
					response(res)
				}
				resolve(res)
			}).catch(err=>{
				closeLoading(config)
				response(err,reject)
			})
		})
	},
}

export default service