<template>
	<view>
		<uni-top-nav title="工单详情"></uni-top-nav>
		<view>
			<p>详情</p>
			<p>id:{{detail.id}}</p>
			<p>title:{{detail.title}}</p>
			<view class="swipe">
				<tableviews-with-swipe>
					<block slot="sliderLeft">
						<a class="uni-btn uni-btn-red" style="padding:0 10px;">删除</a>
					</block>
					<block slot="content">
						<view>3321344444444421</view>
					</block>
					<block slot="sliderRight">
						<a class="uni-btn uni-btn-red">删除</a>
					</block>
				</tableviews-with-swipe>
				<tableviews-with-swipe>
					<block slot="sliderLeft">
						<a class="uni-btn uni-btn-red" style="padding:0 10px;">新增</a>
					</block>
					<block slot="content">
						<view>新增新增新增新增新增</view>
					</block>
					<block slot="sliderRight">
						<a class="uni-btn uni-btn-red">新增</a>
					</block>
				</tableviews-with-swipe>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTopNav from '@/components/uni-top-nav.vue'
	import tableviewsWithSwipe from '@/components/tableviews-with-swipe/index.vue'
	export default {
		components: {uniTopNav,tableviewsWithSwipe},
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
			// console.log(window)
      // console.log(1111111)
			// window.addEventListener("touchstart",function(){
      //   console.log(1111111111111)
      // })
		},
		methods: {

		}
	}
</script>

<style>
	.swipe{
		border-bottom:1px solid #ccc;
	}
</style>
