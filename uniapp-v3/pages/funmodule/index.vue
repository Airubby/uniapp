<template>
	<view class='app-content'>
		<view class="status_bar"></view>
		<view class="contenter">
			<text class="title">功能列表</text>
			<view>
				<view class="list" @tap='listClick(item.navPath)' v-for="(item,index) in List" :key="index">
				{{item.name}}
				<uni-icons type="forward" size="30" color="#fff" customPrefix="" @click="listClick(item.navPath)"></uni-icons>
				</view>
			</view>
		</view>
		<popup ></popup>
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
	
	const state=reactive({
		List:[
			{name:"扫描码",navPath:"/pages/scan/index"},
			{name:"Dom-Show",navPath:"/pages/funmodule/dom"},
			{name:"蓝牙传输数据",navPath:"/pages/funmodule/bluetooth"},
			{name:"网络信息",navPath:"/pages/funmodule/network"},
			{name:"拨打电话",navPath:"/pages/funmodule/telphone"},
			{name:"打印信息",navPath:"/pages/funmodule/printDataInfo"},
		]
	})
	
	const listClick = (path) => {
		uni.navigateTo({
			url: path+"?key=1&value=2",
		});
	}
	const {List} = toRefs(state)
	onMounted(() => {

	})
	onLoad(() => {
		
	})
</script>

<style scoped lang="less">
	.contenter{
		overflow: hidden;
	}
	.title{
		width: 100%;
		display: block;
		font-size: 26px;
		text-align: center;
	}
	.list{
		width: 100%;
		padding: 15rpx;
		background: #09c;
		color: #fff;
		display: block;
		text-align: center;
		margin: 20rpx 0;
	}
</style>
