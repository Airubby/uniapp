<template>
	<view>
		<view class="uni-padding-wrap">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" styleType="text" activeColor="#007aff"></uni-segmented-control>
		</view>
		<view class="content">
			<view>公共展示</view>
			<now-event v-if="current === 0"></now-event>
			<his-event v-if="current === 1"></his-event>
			<threshold v-if="current === 2"></threshold>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/index.vue';
	import nowEvent from './nowEvent.vue';
	import hisEvent from './hisEvent.vue';
	import threshold from './threshold.vue';
	export default {
		components: { nowEvent,hisEvent,threshold,uniSegmentedControl},
		data() {
			return {
				current:0,
				items: [
					'实时事件',
					'历史事件',
					'阀值设置'
				],
			}
		},
		onLoad() {

		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
		}
	}
</script>

<style>
	
</style>
