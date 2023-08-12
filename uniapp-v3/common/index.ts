import {usePermissionStore} from "@/store"
export function autority(URLPath){
	const permissionStore = usePermissionStore();
	let forcedLogin = permissionStore.forcedLogin; //模拟不需要强制登录
	let hasLogin = permissionStore.hasLogin; //模拟没有登录
	if (!hasLogin) {
		uni.showModal({
			title: "未登录",
			content: "您未登录，需要登录后才能继续",
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
}

export default {
	autority
}
	