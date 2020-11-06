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
	},
	onHide: function () {
		console.log('App Hide')
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
