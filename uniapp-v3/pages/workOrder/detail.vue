<template>
	<view>
		<p>详情</p>
		<p>id:{{detail.id}}</p>
		<p>title:{{detail.title}}</p>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs
	} from 'vue'
	import {
		onShow,
		onLoad,
	} from '@dcloudio/uni-app'
	const state = reactive({
		detail: {
			title: ""
		}
	})
	onLoad((e) => {
		state.detail = JSON.parse(decodeURIComponent(e.detail));
		uni.setNavigationBarTitle({
			title: state.detail.title
		})
	})
	const {
		detail
	} = toRefs(state)
</script>

<style scoped lang="less">

</style>
