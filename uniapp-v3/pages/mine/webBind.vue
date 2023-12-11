<template>
	<view class="app-content">
		<mp-html :content="html" />
	</view>
</template>

<script setup lang="ts">
	import { reactive ,ref,watch,nextTick,getCurrentInstance} from 'vue'
	import { onShow, onLoad,onReachBottom} from '@dcloudio/uni-app'
	
	const html="<p>图片上方文字</p>\n\n<p><img alt=\"\" src=\"/static/test.jpeg\" style=\"height:768px; width:1024px\" /></p>\n\n<p>图片下方文字</p>\n"
	
</script>

<style scoped lang="less">
	
</style>