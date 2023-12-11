import { reactive ,ref,watch,onBeforeUnmount} from 'vue'
import serverConfig from '@/utils/serverConfig';
import {usePermissionStore} from "@/store"
/**
 * APP初始化连接websocket
  import webSocket from "@/utils/webSocket";
  const { initWebSocket } = webSocket();
  initWebSocket();  //APP中初始化
 * @returns 
 */
export default function(){
	const permissionStore = usePermissionStore();
	const state = reactive({
	    socketTask: null as any,
	    connectionNumber: 5, //最多连接5次不成功就不再连接了，需手动刷新连接
	    counter: 0, //计数器
	    timeout: 5000, //每隔1秒发送一次数据
	});
	const initWebSocket = () => {
		console.log("初始化")
	    wsConnection();
	};
	//0正在连接；1连接成功可以通信；2连接正在关闭；3连接关闭或连接失败
	const wsConnection = () => {
	    state.socketTask && state.socketTask.readyState==1 && state.socketTask.close();
	    try {
			state.socketTask = uni.connectSocket({
				url: serverConfig.wsURL,
				header: {
					'content-type': 'application/json'
				},
				complete: () => {}
			});
			state.socketTask.onOpen = (event: any) => {
				state.counter = 0;
				onopenWS(event);
			};
			state.socketTask.onMessage = (event: any) => {
				//这个监听不到返回的数据
				onmessageWS(event);
			};
			state.socketTask.onClose = (event: any) => {
				oncloseWS(event);
			};
			state.socketTask.onError = (event: any) => {
				onerrorWS(event);
			};
			uni.onSocketMessage((res)=>{
				onmessageWS(res);
			})
			uni.onSocketError( (res) =>{
			  onerrorWS(res);
			});
			uni.onSocketClose((res)=>{
				oncloseWS(res);
			})
	    } catch (ex) {
	      console.log(ex);
	    }
	};
	const onopenWS = (event: any) => {
		console.log(state.socketTask)
		if (permissionStore.sendMsg != "") {
			if(state.socketTask.readyState==1){
			  try {
				console.log("发送")
			    state.socketTask.send({
					data:permissionStore.sendMsg,
					success:(res)=>{
						permissionStore.setSendMsg("")
					},
					fail:(res)=>{console.log(res)}
				});
			  } catch (error) {
				uni.showToast({
				  	icon: 'none',
				  	title: 'webSocket通讯异常'
				});
			  }
			}else{
				if(state.socketTask.readyState==3){
					wsConnection();
				}
				setTimeout(()=>{
					onopenWS(event)
				}, 500)
			}
		}
	    
	};
	
	const onmessageWS = (event: any) => {
	    console.log("返回数据操作！");
	    permissionStore.setWsData(JSON.parse(event.data));
	};
	
	const oncloseWS = (event: any) => {
		console.log("关闭重连！");
	    if (state.socketTask && state.socketTask.readyState !== 2) {
	      if (state.counter < state.connectionNumber) {
	        state.socketTask = null;
	        state.counter++;
	        setTimeout(() => {
	          wsConnection();
	        }, state.timeout);
	      }
	    }
	};
	
	const onerrorWS = (event: any) => {
		console.log("连接异常！");
	    if (state.socketTask && state.socketTask.readyState !== 3) {
	      state.socketTask = null;
	      wsConnection();
	    }
	};
	
	watch(() => permissionStore.sendMsg, onopenWS);
	
	return {
	    initWebSocket,
	};
}