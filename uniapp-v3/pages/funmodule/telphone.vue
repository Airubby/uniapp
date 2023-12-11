<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title">拨打电话</text>
		</view>
		<view class="caozuo">
			<view class="chongqian" @tap='telPhone(15222222222)'>
				点击拨打电话
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, toRefs } from "vue";
	import { onLoad, onReady } from '@dcloudio/uni-app'

	const state = reactive({
		name: "",
		signal: "",
		deviceList: [],
	})
	const telPhone = (phone) => {
		let platform=uni.getSystemInfoSync().platform;
		if(platform=="android"){
			//从底部向上弹出操作菜单
			uni.showActionSheet({
				itemList: [phone,'呼叫'],
				success:function(res){
					if(res.tapIndex==1){
						plus.device.dial(phone,false)
					}
				},
				fail: function(res) {
					console.log("安卓失败",res)
				},
			});
		}else if(platform=="ios"){
			uni.makePhoneCall({
				phoneNumber: phone,
			})
		}
	}
	onMounted(() => {

	})
	onLoad(() => {

	})
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
