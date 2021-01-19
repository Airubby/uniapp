//import tabBarBadgeSync from @/xxx/xxx/tabBarBadgeSync";
//在每个tabBar页面的onShow中 引入   tabBarBadgeSync.call(this)
export default function tabBarBadgeSync() {
    const cartCount = this.$store.getters["cart/cartCount"];
    const isLogined = this.$store.state.user.isLogin;
    if (isLogined) {
        if (cartCount < 1) {
            return uni.removeTabBarBadge({index: 2});
        }
        uni.setTabBarBadge({index: 2,text: cartCount + "" });
    }
}