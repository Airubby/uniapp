<template>
	<view class="content">
		<view class="uni-padding-wrap">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" activeColor="#007aff"></uni-segmented-control>
		</view>
		<view class="content">
			<now-event v-if="current === 0"></now-event>
			<his-event v-if="current === 1"></his-event>
			<threshold v-if="current === 2"></threshold>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/index.vue';
	import nowEvent from './type-one.vue';
	import hisEvent from './type-two.vue';
	import threshold from './type-three.vue';
	export default {
		components: { nowEvent,hisEvent,threshold,uniSegmentedControl},
		data() {
			return {
				current:0,
				items: [
					'分类一',
					'分类二',
					'分类三'
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

