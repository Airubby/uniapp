<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title">Hello-plusScan</text>
			<view class="scan">
				<view>扫码回调code：{{code}}</view>
				<view>扫码回调参数：{{value}}</view>
			</view>
		</view>
		<view class="caozuo">
			<view class="chongqian" @tap='scanClick'>
				点击扫码
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
		textscan: '扫码',
		typescan: 'scan-listener',
		title: 'Hello-plusScan',
		value: '',
		code: ""
	})

	const scanClick = () => {
		uni.navigateTo({
			url: '/pages/scan/scan?type=' + state.typescan,
		});
	}

	onMounted(() => {

	})
	onLoad(() => {
		uni.$on(state.typescan, (data) => {
			state.value = data.result
			state.code = data.code;
		})
	})
	const {
		value,
		code
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
