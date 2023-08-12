<template>
	<view class="app-content">
		<!-- #ifdef H5 || MP-WEIXIN -->
		<web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view>
		<!-- #endif -->
	</view>
</template>

<script setup lang="ts">
	import { reactive ,ref,watch,nextTick,getCurrentInstance} from 'vue'
	import { onShow, onLoad,onReachBottom} from '@dcloudio/uni-app'
	
	
	const webviewStyles={
		progress: {
			color: '#FF3333'
		}
	}
	
	// #ifdef APP-PLUS
	// plus.webview.create( url, id, styles, extras );  其它页面：getWebviewById(id) extras json格式扩展参数
	//此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
	// const currentWebview = this.$scope.$getAppWebview();   //v2
	let pages = getCurrentPages();
	let page: any = pages[pages.length - 1];
	let currentWebView = page.$getAppWebview();
	
	// let url=""
	const webView=plus.webview.create( "https://uniapp.dcloud.io/static/web-view.html", "webViewId", {
		plusrequire:"none", //
		top:"100px",
		bottom:"0px",
		left:"0px",
		right:"0px",
		margin: "10px", //设置了left、right、top、bottom则对应的边距值失效。
		background: "transparent",
		webviewBGTransparent: true, //ture透明
		// errorPage: "/html/error.html",
		errorPage: "none",
		hardwareAccelerated:true,  //开启硬件加速
	});
	
	webView.addEventListener(("loading"),(e)=>{
		uni.showLoading({
			title: '页面加载中...',
			mask: true
		})
	},false)
	webView.addEventListener(("loaded"),(e)=>{
		uni.hideLoading()
	},false)
	
	// webView.loadURL(url)  //如果创建时url给空，这个地方就要主动loadURL
	currentWebView.append(webView);  //loadUrl后需在此页面append上嵌入的webView
	
	// webView.show()
	// webView.hide()
	
	// #endif
	
</script>

<style scoped lang="less">
	
</style>