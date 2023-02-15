import Request from './request'
import store from '@/store'
const service = new Request()
service.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = store.getters['app/ajaxUrl'] /* 根域名不同 */
  config.header = {
    ...config.header,
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 * 有默认，非必写
 */
service.validateStatus = (statusCode) => {
  return statusCode === 200
}

service.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  uni.getStorage({
    key: 'token',
    success: function (res) {
      config.header = {
        ...config.header,
        Authorization: "Bearer "+res.data
      }
      return config
    },
  });
  return config;
},error=>{
  return Promise.reject("异常");
})

// 必须使用异步函数，注意
service.interceptor.response(async (response) => { /* 请求之后拦截器 */
  uni.hideLoading();
  console.log(response)
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
  return response
}, (response) => { // 请求错误做点什么
  console.log(response)
  uni.hideLoading();
  if(response.data.message){
    uni.showToast({
        icon: 'none',
        title: response.data.message
    });
  }else{
    uni.showToast({
        icon: 'none',
        title: "服务器异常"
    });
  }
  return Promise.reject("异常");
})
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
  put: function (url, params, response) {
    uni.showLoading({
      title: '数据提交中...',
      mask:true
    })
    return service.put(url,params).then(res=>{
      if(response){
        response(res);
      }
    })
  },
  delete: function (url, params, response) {
    uni.showLoading({
      title: '数据提交中...',
      mask:true
    })
    return service.delete(url,{data:params}).then(res=>{
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
