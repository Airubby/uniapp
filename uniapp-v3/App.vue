<script lang="ts">
	export default	{
		//获取：getApp().globalData
		//设置：getApp().globalData.userInfo={name:"admin"}
		globalData:{
		    userInfo: null,
		    currentPrinter: {
		      factory: '',        // 打印机生产厂家
		      name: '',           // 打印机名称
		      UUID: '',           // 打印机标识码
		      MAC: '',            // 打印机MAC地址
		      printerType: 0,     // 打印机类型
		      DPI: 203,           // 打印机DPI
		      width: 384,         // 打印机能打印的宽度
		      softVersion: '',    // 打印机软件版本号
		      hardVersion: '',    // 打印机硬件版本号
		      seriesName: '',     // 产品系列名称，如 DT20
		      devIntName: '',     // 内部型号名称，如 DT20S
		    }
		}
	}
</script>
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
	import { onMounted, getCurrentInstance  } from "vue"
	
	onLaunch(() => {
		console.log('App Launch 初始化完成时（全局只触发一次）')
		
		// 标签中： <!-- #ifdef APP-PLUS -->  <!-- #endif -->  
		// CSS中： /* #ifdef APP-PLUS */  /* #endif */
		
		// #ifdef APP-PLUS
		console.log("仅出现在 App 平台下的代码")
		// #endif
		
		// #ifndef H5
		console.log("除了 H5 平台，其它平台均存在的代码")
		// #endif
		
		// #ifdef H5 || MP-WEIXIN
		console.log("在 H5 平台或微信小程序平台存在的代码（这里只有||，不可能出现&&，因为没有交集）")
		// #endif
		
		
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
	onLoad((option) => {
		//option是对象{fromURL:"/pages/home/index"} url: "/pages/login/index?fromURL=/pages/home/index",
		uni.showToast({
		    title: '提示',
		    //将值设置为 success 或者直接不用写icon这个参数
		    icon: 'none',  //success,error,none,loading   success,error最多7个字符，none两行字符
		    //显示持续时间为 2秒  默认：1500
		    duration: 2000
		})
		uni.hideToast()
		uni.showLoading({
		    title: '加载中...'
		});
		// 数据从后端接口返回后，提示弹框关闭
		uni.hideLoading();
		
		uni.setNavigationBarTitle({
			title: "动态设置title"
		})
		console.log('App Load 第一次更新 每个页面的参数获取的地方,子页面返回不更新')
	})
	onReady(()=>{
		console.log("监听页面初次渲染完成。获取dom元素在此生命周期。注意如果渲染速度快，会在页面进入动画完成前触发")
		// let query = uni.createSelectorQuery();
		// query.select("#fixed-box").boundingClientRect((data:any) => {
		// 	console.log("得到布局位置信息",JSON.stringify(data))
		// }).exec();
	})
	onHide(() => {
		//由A页面进入B页面会执行A页面的onHide()；当前页面依旧在 页面栈 中，但小程序要离开此页面
		console.log('App Hide 页面隐藏,与onShow相反')
	})
	onUnload(() => {
		//由A页面进入B页面会执行A页面的onHide(), 再由B页面返回A页面会执行B页面的onUnload()
		console.log('App Unload 销毁执行')
	})
	onBackPress((event) => {
		console.log(event, "点击返回按钮,原生头部返回及手机返回")
		if (event.from == 'backbutton') {
		    uni.showModal({
		        title: '提示',
		        content: '是否保存？',
		        success: function (res) {
		            if (res.confirm) {
		                uni.showToast({
		                    title: '用户点击确定',
		                    duration: 1000
		                })
		            } else if (res.cancel) {
		                uni.showToast({
		                    title: '用户点击取消',
		                    duration: 1000
		                })
		            }
		            uni.navigateBack({
		                delta: 1
		            });
		        }
		    });
		    return true; //阻止默认返回行为
		}
		
		// 暂不支持直接在自定义组件中配置该函数
		// Android 实体返回键 (from = backbutton) 
		// 顶部导航栏左边的返回按钮 (from = backbutton) 
		// 返回 API，即 uni.navigateBack() (from = navigateBack) 
		// event = {from: backbutton | navigateBack}
		// 只有在该函数中返回值为 true 时，才表示不执行默认的返回，自行处理此时的业务逻辑。
	})
	onReachBottom(() => {
		console.log("上拉加载更多");
	})
	onPullDownRefresh(() => {
		console.log("下拉加载刷新");
	})
	onNavigationBarButtonTap((event) => {
		if(event.index == 0){
			console.log("点击了第一个按钮")
			uni.navigateBack()
		}
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
	
	onMounted(()=>{
		// this.$mp.getAppWebview()     v2
		// v3
		// let pages = getCurrentPages();
		// let page: any = pages[pages.length - 1];
		// let ws = page.$getAppWebview();
	})
	
	// const props = defineProps({
	//     dialogInfo: {
	// 	    type: Object,
	// 		default: () => {
	// 			return {
	// 			   visible: false,
	// 			   data: null
	// 			};
	// 		}
	//     },
	// });
	// const emit = defineEmits(["handleBack"])
	// const fn=()=>{}  //thisRef.value.fn();
	// defineExpose({
	//     fn,
	// });
</script>
<style lang="less">
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "@/common/css/uni.css";
	// @import url("@/common/css/uni.css");
	/*每个页面公共css */
	@import "./common/css/basic.css";
	// @import "./common/css/myapp.css";
</style>
