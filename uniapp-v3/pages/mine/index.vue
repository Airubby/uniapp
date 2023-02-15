<template>
	<view>

	</view>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue'
	import {
		onShow,
		onLoad,
	} from '@dcloudio/uni-app'
	import tabBarBadgeSync from "@/utils/tabBarBadgeSync"
	const pages = reactive([{
			title: '首页',
			url: '/pages/index/index'
		},
		{
			title: '我的',
			url: '/pages/mine/index'
		},
	])
	onShow(() => {
		tabBarBadgeSync.call(this)
	})
</script>

<style scoped lang="less">

</style>
