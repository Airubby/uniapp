<script setup lang="ts">
	import {
		onLaunch,
		onShow,
		onHide,
		onLoad,
		onUnload,
		onReady,
		onBackPress,
		onNavigationBarButtonTap,
		onTabItemTap,
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app'

	onLaunch(() => {
		console.log('App Launch 初始化完成时（全局只触发一次）')
		// uni.removeStorage({
		// 	key: 'token',
		// 	success: function (res) {
		// 		console.log('初始化的时候删除token，但刷新就没token了');
		// 	}
		// });
	})
	onShow(() => {
		console.log('App Show 每次更新')
		//只有在tabBar页面才行；所以要在每个tabBar的onShow中设置
		uni.setTabBarBadge({
			index: 2,
			text: '5'
		})
		// uni.removeTabBarBadge({index:2})	//移除
		// uni.showTabBarRedDot({index: 2 })  //给点
		// uni.hideTabBarRedDot({index:2})
	})
	//再次切换 tabbar 页面，只会触发每个页面的onShow，不会再触发onLoad ,onTabItemTap监听点击了tabbar
	/** tab点击 */
	onTabItemTap((item) => {
		console.log(item);
	})
	onLoad(() => {
		uni.showToast({
		    title: '提示',
		    //将值设置为 success 或者直接不用写icon这个参数
		    icon: 'none',
		    //显示持续时间为 2秒
		    duration: 2000
		})
		uni.showLoading({
		    title: '加载中...'
		});
		// 数据从后端接口返回后，提示弹框关闭
		uni.hideLoading();
		console.log('App Load 第一次更新 每个页面的参数获取的地方,子页面返回不更新')
	})
	onUnload(() => {
		console.log('App Unload 销毁执行')
	})
	onReady(()=>{
		console.log("监听页面初次渲染完成。获取dom元素在此生命周期。注意如果渲染速度快，会在页面进入动画完成前触发")
		// let query = uni.createSelectorQuery();
		// query.select("#fixed-box").boundingClientRect((data:any) => {
		// 	console.log("得到布局位置信息",JSON.stringify(data))
		// }).exec();
	})
	onHide(() => {
		console.log('App Hide 页面隐藏,与onShow相反')
	})
	onBackPress((event) => {
		console.log(event, "点击返回按钮")
		// 暂不支持直接在自定义组件中配置该函数
		// Android 实体返回键 (from = backbutton) 
		// 顶部导航栏左边的返回按钮 (from = backbutton) 
		// 返回 API，即 uni.navigateBack() (from = navigateBack) 
		// event = {from: backbutton | navigateBack}
		// 只有在该函数中返回值为 true 时，才表示不执行默认的返回，自行处理此时的业务逻辑。
	})
	onReachBottom(() => {
		console.log("上拉加载刷新");
	})
	onPullDownRefresh(() => {
		console.log("下拉加载刷新");
	})
	onNavigationBarButtonTap(() => {
		console.log("监听原生标题栏按钮点击事件,在pages.json中配置的导航按钮")
		// {
		//     "path": "pages/xxx/xxx",
		//     "style": {
		//         "navigationBarTitleText": "礼品上交",
		//         "app-plus": {
		//             "titleNView": {
		//                 "buttons": [{
		//                     "text": "返回",
		//                     "fontSrc": "/static/iconfont.ttf",
		//                     "fontSize": "16px",
		//                     "color": "#000000",
		//                     "float": "left"
		//                 }]
		//             }
		//         }
		//     }
		// }
	})
</script>
<style lang="less">
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/css/uni.css";
	/*每个页面公共css */
	@import "./common/css/basic.css";
	// @import "./common/css/myapp.css";
</style>
