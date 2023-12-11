import { reactive ,ref,watch,onBeforeUnmount} from 'vue'
import serverConfig from '@/utils/serverConfig';
import {usePermissionStore} from "@/store"
/**
 * 需要订阅的界面引入,首先得初始化的时候引入utils下的webSocket
  import useWebSocket from "@/hooks/useWebSocket"
  const { handleSendMsg } = useWebSocket((val) => {
    handleData(val)  //页面自定义的handleData处理数据的方法
  });
  handleSendMsg(sendInfo) //订阅
 * @param handleData 
 * @returns 
 */
export default function(handleData?){
	const permissionStore = usePermissionStore();

	//运行订阅处理
	const awaitNumber = ref(0)
	const destoryMsg = ref<any>([])
	
	  // sendInfo: {
	  //   subscribeType: "monitor",
	  //   status: true,  //true订阅，false取消订阅
	  //   param: {}
	  // }
	  //如果一个页面多个订阅的情况，得异步延时订阅
	const handleSendMsg = async (sendInfo) => {
	    console.log("ws订阅:" + JSON.stringify(sendInfo))
	    if (awaitNumber.value == 0) {
	      awaitNumber.value++;
	      await permissionStore.setSendMsg("<json>"+JSON.stringify(sendInfo)+"</json>");
	      awaitNumber.value--
	      if (destoryMsg.value.findIndex((item: any) => item.subscribeType === sendInfo.subscribeType) < 0) {
	        //如果页面有缓存的情况，且后端只能推送一种类型的数据时，进入页面的时候需要重新订阅，
	        let info = JSON.parse(JSON.stringify(sendInfo))
	        info.status = false //取消订阅
	        destoryMsg.value.push(info);
	      }
	    } else {
	      setTimeout(() => {
	        handleSendMsg(sendInfo)
	      }, 500)
	    }
	}
	
	  //销毁订阅
	const handleDestoryMsg = async () => {
	    console.log(destoryMsg)
	    for (let i = 0; i < destoryMsg.value.length; i++) {
	      await permissionStore.setSendMsg(JSON.stringify(destoryMsg.value[i]));
	    }
	}
	onBeforeUnmount(() => {
	    handleDestoryMsg();
	})
	
	watch(() => permissionStore.wsData, val => {
	  handleData && handleData(val);
	});
	
	return {
		handleSendMsg
	};
}