//import tabBarBadgeSync from "@/utils/tabBarBadgeSync"
//在每个tabBar页面的onShow中 引入   tabBarBadgeSync.call(this)
export default function tabBarBadgeSync() {
	const cartCount = parseInt(Math.random() * 10 - 5+""); //模拟购物车数量
	const isLogined = true; //vuex获取是否已经登录
	if (isLogined) {
		if (cartCount < 1) {
			return uni.removeTabBarBadge({
				index: 2
			});
		}
		uni.setTabBarBadge({
			index: 2,
			text: cartCount + ""
		});
	}
}
