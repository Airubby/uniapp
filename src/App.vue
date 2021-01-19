<script>
import Vue from 'vue'
import request from './service/request/index'
export default {
	onLaunch: function () {
		console.log('App Launch')
		// uni.removeStorage({
		// 	key: 'token',
		// 	success: function (res) {
		// 		console.log('初始化的时候删除token，但刷新就没token了');
		// 	}
		// });
		request.service.config.baseUrl=this.$store.getters['app/ajaxUrl']
		Vue.prototype.$api = request
	},
	onShow: function () {
        console.log('App Show')
        //只有在tabBar页面才行；所以要在每个tabBar的onShow中设置
        uni.setTabBarBadge({index: 2,text: '5'})
        // uni.removeTabBarBadge({index:2})	//移除
        // uni.showTabBarRedDot({index: 2 })  //给点
        // uni.hideTabBarRedDot({index:2})
	},
	onHide: function () {
		console.log('App Hide')
    },
    onLoad(options) {
		console.log("每个页面的参数获取的地方")
	},
    methods:{
        // 获取系统栏高度
        async setAppInfo() {
            let that = this;
            return new Promise((resolve, reject) => {
                uni.getSystemInfo({
                    success: function (e) {
                        Vue.prototype.StatusBar = e.statusBarHeight;
                        // #ifdef H5
                        Vue.prototype.CustomBar = e.statusBarHeight + 45;
                        // #endif

                        // #ifdef APP-PLUS
                        if (e.platform == "android") {
                        Vue.prototype.CustomBar = e.statusBarHeight + 50;
                        } else {
                        Vue.prototype.CustomBar = e.statusBarHeight + 45;
                        }
                        // #endif

                        // #ifdef MP-WEIXIN
                        let custom = wx.getMenuButtonBoundingClientRect();
                        Vue.prototype.Custom = custom;
                        Vue.prototype.CustomBar =
                        custom.bottom + custom.top - e.statusBarHeight;
                        // #endif
                    },
                });
            });
        },
    }
}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/uni.css";
	/*每个页面公共css */
	@import "./common/basic.css";

</style>
