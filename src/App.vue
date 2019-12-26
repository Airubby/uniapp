<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
			// uni.removeStorage({
			// 	key: 'token',
			// 	success: function (res) {
			// 		console.log('初始化的时候删除token，但刷新就没token了');
			// 	}
			// });
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/uni.css";
	/*每个页面公共css */
	@import "./common/basic.css";

</style>
