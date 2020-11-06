import Vue from 'vue'
import store from '@/store/index'
export default {
	created () {
		// #ifndef MP-WEIXIN
		this.wsConnection();
		// #endif
		// #ifdef MP-WEIXIN
		this.wxWsConnection();
		// #endif
    },
	data() {
        return {
			//"ws://echo.websocket.org"
			sendMsg:null,
			ws:null,
       }
	},
	methods:{
		//0正在连接；1连接成功可以通信；2连接正在关闭；3连接关闭或连接失败
		wsConnection() {
			let _this=this;
			this.ws&&this.ws.close();
			try {
				this.ws = new WebSocket(this.$VUE_APP_WEBSOCKET);
				this.ws.onopen = function (event) {
					_this.onopenWS(event)
				};
				this.ws.onmessage = function(event){
					_this.onmessageWS(event)
				};
				this.ws.onclose = function (event) {
					_this.oncloseWS(event)
				};
				this.ws.onerror = function(event){
					_this.onerrorWS(event)
				};
				Vue.prototype.$ws=this.ws;
			} catch (ex) {
				console.log(ex);
			}
		},
		onopenWS:function(event){
			console.log("创建连接成功！");
			if(this.sendMsg!=""&&this.sendMsg!=null){
				this.ws.send(sendMsg);
			}
		},
		onmessageWS:function(result){
			console.log("返回数据操作！")
			store.dispatch('setRecommend',JSON.parse(result.data));
		},
		oncloseWS:function(event){
			console.log("连接关闭！")
			if(this.ws&&this.ws.readyState!==2){
				this.ws=null;
				this.wsConnection();
			}
		},
		onerrorWS:function(event){
			console.log("连接异常！")
			if(this.ws&&this.ws.readyState!==3){
				this.ws=null;
				this.wsConnection();
			}
		},
		
		wxWsConnection(){
			let _this = this
			//创建websocket 连接
			this.ws = wx.connectSocket({
				  url: this.$VUE_APP_WEBSOCKET,
				  header:{
					'content-type': 'application/json',
				  },
				  timeout:5000,//超时时间，单位为毫秒
				  success:(e)=>{//接口调用成功的回调函数
					console.log("正在打开...")
					Vue.prototype.$ws=_this.ws;
				  },
				  fail:(e)=>{//接口调用失败的回调函数
					// console.log(e)
				  },
				  complete:(e)=>{//接口调用结束的回调函数（调用成功、失败都会执行）
					// console.log(e)
				  }
			})
			//连接打开事件
			this.ws.onOpen(()=>{
				console.log("打开")
				if(this.sendMsg!=""&&this.sendMsg!=null){
					this.ws.send({
						data:`{"Data":"我发送消息给你"}`,//需要发送的内容
						success:(e)=>{//接口调用成功的回调函数
						  // console.log(e)
						},
						fail:(e)=>{//接口调用失败的回调函数
						  // console.log(e)
						},
						complete:(e)=>{//接口调用结束的回调函数（调用成功、失败都会执行）
						  // console.log(e)
						}
					})
				}
			})
			//接受消息
			this.ws.onMessage((result) =>{
				store.dispatch('setRecommend',JSON.parse(result.data));
			})
			//监听 WebSocket 连接关闭事件
			this.ws.onClose((e) =>{
				if(_this.ws&&_this.ws.readyState==3){
					_this.ws=null;
					_this.wxWsConnection();
				}
			})
			 //监听 WebSocket 错误事件
			this.ws.onError((e) =>{
				console.log("失败了会自动关闭")
			})
			
		}
	},
	destroyed() {
		this.ws&&this.ws.close();
		this.ws=null;
		Vue.prototype.$ws=this.ws;
    },
}