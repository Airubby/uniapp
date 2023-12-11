import {usePermissionStore} from "@/store"
import useWebSocket from "@/hooks/useWebSocket"
export function autority(URLPath){
	const permissionStore = usePermissionStore();
	let forcedLogin = permissionStore.forcedLogin; //模拟不需要强制登录
	let token = permissionStore.token; 
	if (!token) {
		showTip(forcedLogin,URLPath)
	}else{
		//判断token是否过期
		const { handleSendMsg } = useWebSocket((val) => {
			console.log(val)
			if(val.subData=="token"){
				showTip(forcedLogin,URLPath,"Token过期","您的登录Token过期，需要重新登录后才能继续")
			}
		});
		let json={"cmd":"subdata","data":["4010001;1;qm","21010001;1;hm","3010801;1100020001;ygstate"]}
		handleSendMsg(json)
	}
}
function showTip(forcedLogin,URLPath,title='未登录',content='您未登录，需要登录后才能继续'){
	uni.showModal({
		title,
		content,
		/**
		 * 如果需要强制登录，不显示取消按钮
		 */
		showCancel: !forcedLogin,
		success: (res) => {
			if (res.confirm) {
				/**
				 * 如果需要强制登录，使用reLaunch方式
				 */
				if (forcedLogin) {
					uni.reLaunch({
						url: "/pages/login/index?fromURL="+URLPath,
					});
				} else {
					uni.navigateTo({
						url: "/pages/login/index?fromURL="+URLPath,
					});
				}
			}
		},
	});
}

export function permission(fnArr?){
	const permissionStore = usePermissionStore();
	const limits = permissionStore.limits
	if (fnArr && fnArr instanceof Array && fnArr.length > 0) {
	  const hasPermission = limits.some(limit => {
	    return fnArr.includes(limit);
	  });
	  if (hasPermission) {
	    return true;
	  }
	}
	return false;
}

export default {
	autority,
	permission
}
	