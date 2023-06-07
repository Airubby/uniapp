<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title" @click="back()">点击返回上一页刷新上页数据</text>
			<view class="">
				点击事件抛出事件监听及返回：
			</view>
			<view class="">
				<view>
					uni.$emit("refreshData");
				</view>
				<view>
					uni.navigateBack()
				</view>
			</view>
			<view class="">
				返回的页面中监听抛出的事件：
				uni.$on("refreshData",()=>{
					console.log("执行刷新数据")
				})
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
	const back=()=>{
		uni.$emit("refreshData");
		uni.navigateBack()
		// uni.navigateBack({
		// 	delta: 1   //1表示上一页，2表示上上一页
		// });
		//在返回的页面的 onLoad()函数中监听refreshData,执行刷新数据函数
		// uni.$on("refreshData",()=>{
		// 	console.log("执行刷新数据")
		// })
	}
	onMounted(() => {

	})
	onLoad(() => {
		
	})
</script>

<style scoped lang="less">
	.title{
		width: 100%;
		display: block;
		font-size: 26px;
		text-align: center;
	}
</style>
