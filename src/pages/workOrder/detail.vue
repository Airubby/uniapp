<template>
	<view>
		<uni-top-nav title="工单详情"></uni-top-nav>
		<view>
            <p>详情</p>
			<p>id:{{detail.id}}</p>
			<p>title:{{detail.title}}</p>
        </view>
	</view>
</template>

<script>
	import uniTopNav from '@/components/uni-top-nav.vue'
	export default {
		components: {uniTopNav},
		data() {
			return {
				detail:{}
			}
		},
		onLoad(e) {
			this.detail = JSON.parse(decodeURIComponent(e.detail));
			// uni.setNavigationBarTitle({
			// 	title: this.detail.title
			// })
		},
		methods: {

		}
	}
</script>

<style>

</style>
