import uni_request from './uni_request.js'
import store from '@/store'

const service = uni_request({ // 有效配置项只有三个
  // baseURL: 'https://www.fastmock.site/mock/b5aeba034aac038de76b613109a5cce7/test', //baseURL
    baseURL:store.getters['app/ajaxUrl'],
    timeout: 1111, // 超时时间
    headers: {
		'Content-Type': 'application/json'
	}
})

service.interceptors.request.use(config => { // 请求拦截器（可以设置多个）
    console.log('请求拦截器')
    console.log(config)
    uni.getStorage({
      key: 'token',
      success: function (res) {
        config.headers['Authorization'] ="Bearer "+res.data;
        return config
      },
    });
	  return config
})

service.interceptors.response.use(response => { // 响应拦截器（可以设置多个）
  console.log(response)
  uni.hideLoading();
	if (response.statusCode === 200) {
    return response.data;
  }else{
    if(response.data.message){
        uni.showToast({
            icon: 'none',
            title: response.data.message
        });
    }
  }
})


service.overtime = (...args) => { // 超时钩子函数（可以设置多个）
  uni.hideLoading();
  console.log('超时了')
}

service.onerror = (...args) => { // 请求失败统一处理方法（可以设置多个）
  uni.hideLoading();
  console.log('网络请求失败了', `url为${args[1]}`)
  
}
function serialize(obj, prefix){
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
export default {
    get: function (url, params, response) {
      uni.showLoading({
          title: '数据加载中...',
          mask:true
      })
      return service.get(url,params).then(res=>{
        if(response){
          response(res);
        }
      })
    },
    post: function (url, params, response) {
      uni.showLoading({
          title: '数据提交中...',
          mask:true
      })
      return service.post(url,params).then(res=>{
        if(response){
          response(res);
        }
      })
    },
    postQuery: function (url, params, response) {
      uni.showLoading({
          title: '数据提交中...',
          mask:true
      })
      let newurl=url+"?"+serialize(params);
      return service.post(newurl,null).then(res=>{
        if(response){
          response(res);
        }
      })
    },
    service:service
}

// service.get('/').then(res => {
// 	console.log(res)
// }).catch(e => console.error(e))

// // 取消一个请求
// const task = request.get('/cancel') // 如果想要取消某个请求，需要在 then 之前将 request.get 方法返回的 promise 对象保存在一个变量里
// task.then(res => {
// 	console.log(res)
// }).catch(e => console.error(e)) // 网络请求失败：主动取消
// task.cancel() // 在需要的时候调用 cancel 方法，会使当前网络请求取消并且使 request.get 方法返回的 promise 进入 reject 状态，可被 catch 捕获，错误信息为 【网络请求失败：主动取消】