<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title">网络信息</text>
			<view class="scan">
				<view>名称：{{name}}</view>
				<view>信号：{{signal}}</view>
			</view>
			<div v-for="item in deviceList">
				{{item.name}}--{{item.signal}}
			</div>
		</view>
		<view class="caozuo">
			<view class="chongqian" @tap='getNetwork'>
				获取网络信息
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		reactive,
		toRefs
	} from "vue";
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'

	const state = reactive({
		name: "",
		signal: "",
		deviceList: [],
	})
	const getNetwork = () => {
		uni.getNetworkType({
			success: function(res) {
				console.log(res)
				if (res.networkType != "wifi") {
					uni.showToast({
						icon: 'none',
						duration: 2000,
						title: "未连接WiFi",
					})
				} else {
					//判断获取的WiFi是否为机型WiFi
					// 主窗体  
					var MainActivity = plus.android.runtimeMainActivity()
					// 上下文  
					var Context = plus.android.importClass('android.content.Context')
					// 导入WIFI管理 和 WIFI 信息 的class  
					plus.android.importClass("android.net.wifi.WifiManager")
					plus.android.importClass("android.net.wifi.WifiInfo")
					plus.android.importClass("android.net.wifi.ScanResult")
					plus.android.importClass("java.util.ArrayList")
					// 获取 WIFI 管理实例  
					var wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE)
					//开启WIFI
					// wifiManager.setWifiEnabled(true);
					// 获取当前连接WIFI的信息  
					var wifiInfo = wifiManager.getConnectionInfo()
					//获取当前WIFI的信号强度
					var wifiRssi = wifiInfo.getRssi();
					// 获取当前 WIFI 连接的 SSID (WIFI 名称)  
					var ssid = wifiInfo.getSSID()
					// 这里的 获取到的名称 是 带 双引号的 如 "cmcc"    
					// 所以我们这里处理一下  
					ssid = ssid.replace(/(^\"*)|(\"*$)/g, "")
					//获取当前WiFi的IP地址
					var ip= wifiInfo.getIpAddress()
					//获取MAC地址
					var mac=wifiInfo.getMacAddress();
					//获取连接速度
					var speed=wifiInfo.getLinkSpeed()
					//获取客户端的具体信息
					var supplicant=wifiInfo.getSupplicantState()
					
					state.name=ssid;
					state.signal=100+wifiRssi
					console.log("名称", ssid, "强度", wifiRssi,"ip",ip,"mac",mac,"speed",speed,"supplicant",supplicant)
					
					//getConnectionInfo和getScanResults的区别
					//扫码获取WiFi信号集合
					var resultList = wifiManager.getScanResults(),
						len = resultList.size()
					var wifiArray = []
					for (var i = 0; i < len; i++) {
						console.log(resultList.get(i).plusGetAttribute('SSID'))
						//将每一个ssid都添加到wifiArray数组中，用于绑定显示，根据个人业务取舍 wifiArray=[{name:WiFi的SSID}]
						let oneWiFi = {
							name: resultList.get(i).plusGetAttribute('SSID'),
							signal: 100 + resultList.get(i).plusGetAttribute('level')
						}
						wifiArray.push(oneWiFi);
					}
					state.deviceList=wifiArray;
				}
			}
		});
	}
	onMounted(() => {

	})
	onLoad(() => {

	})
	const {
		name,
		signal,
		deviceList
	} = toRefs(state)
</script>

<style scoped lang="less">
	.contents {
		width: 100%;
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
		font-size: 16px;
		
	}
	.scan-box{
		padding: 100upx 30upx;
		.title{
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24px;
			text-align: center;
			color: #0599D7;
			margin-bottom: 20upx;
		}
	}
	
	.caozuo {
		display: flex;
		height: 100upx;
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
		font-size: 20px;
	
		view {
			width: 750upx;
			text-align: center;
			height: 100upx;
			line-height: 100upx;
			color: #FFFFFF;
		}
	
		view:active {
			background-color: #CCCCCC;
			color: #333333;
		}
	}
	
	.chongqian {
		background-color: #FF8F58;
	}
</style>
