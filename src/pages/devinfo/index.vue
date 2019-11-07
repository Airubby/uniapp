<template>
	<view class="devinfo">
		<view class="top pd60">{{title}}</view>
		<view class="content">
			<view class="topbox">
				<view class="topbox_title"><img src="static/images/ic-addr.png">位置名称</view>
				<view class="topbox_con">
					<view>
						<view class="topbox_text">最新告警</view>
						<view class="topbox_img"><img src="static/images/ic-lev4.png">温湿度过高告警</view>
						<view>2018-12-24 11:12:33</view>
					</view>
					<view>
						<view class="topbox_text">型号</view>
						<view class="topbox_img">pc1232131232</view>
					</view>
				</view>
			</view>
			<view class="uni-tab">
				<uni-swiper-tab :tabBars="tabBars">
					<block slot="content0">
						<power></power>
					</block>
					<block slot="content1">
						<air></air>
					</block>
					<block slot="content2">
						<env></env>
					</block>
				</uni-swiper-tab>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperTab from '@/components/uni-swiper-tab/index.vue';
	import air from './air.vue';
	import env from './env.vue';
	import power from './power.vue';
	export default {
		components: {uniSwiperTab,power,env,air},
		data() {
			return {
				title: '一体化机柜',
				tabBars: [{
					name: '配电',
					img: 'static/images/ic-power.png',
					activeImg:'static/images/ic-power-avtivity.png'
				}, {
					name: '制冷',
					id: 'zhileng'
				}, {
					name: '环境',
					id: 'huanjing'
				}]
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style>
	
	.top{
		color:#fff;
		height:40px;
		text-align: center;
	}
	.devinfo{
		background:#0096BA;
		color:#A3F0FF;
		height: 100%;
	}
	
	.topbox{
		background: #01738E;
		padding: 20px;
		height: 170px;
		border-radius: 10px;
	}
	.content{
		height: calc(100% - 100px);
	}
	.uni-tab{
		height: calc(100% - 210px); 
	}
	@import "./style/devinfo.css";
	@media ( min-width : 750px) {
		.top{color:#f00}
	}
</style>
