<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title">蓝牙传输数据</text>
			<view class="scan">
				
			</view>
		</view>
		<view class="caozuo">
			<view class="chongqian" @tap='openBlue'>
				点击搜索蓝牙
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
		title: 'Hello',
		msg: '还未开始',
		log: '',
		deviceList: [],
		deviceMap: {},
		toBottom: ''
	})
	const openBlue = () => {
		uni.openBluetoothAdapter({
			success(res) {
				searchBlue()
			},
			fail(res) {
				console.log("当前蓝牙不可用，请确认蓝牙是否已打开",res)
				if(res.code==10001){
					uni.showToast({
						title: '当前蓝牙不可用，请确认蓝牙是否已打开',
						icon: "none",
						duration: 2000
					});
				}
				
			}
		})
	}
	const searchBlue=()=>{
		//开始搜寻附近的蓝牙外围设备，此操作比较耗费系统资源，请在搜索并连接到设备后调用 uni.stopBluetoothDevicesDiscovery 方法停止搜索。
		uni.startBluetoothDevicesDiscovery({
			success(res){
				console.log(res)
			},
			fail(res){
				console.log(res)
			}
		})
	}

	onMounted(() => {

	})
	onLoad(() => {
		uni.onBluetoothDeviceFound(function (devices) {
		  console.log('new device list has founded')
		  console.dir(devices)
		  // console.log(ab2hex(devices[0].advertisData))
		})
	})
	const {
		msg,
		toBottom,
		log,
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
