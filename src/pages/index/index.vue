<template>
	<view>
		<view class="top bgwhite">
			<view class="ic_image ic_search fl"><image src="/static/icons/ic_search.svg"></image></view>
			<view class="ic_image ic_message fr"><image src="/static/icons/ic_message.svg"></image></view>
			<view class="ic_image ic_signin fr"><image src="/static/icons/ic_signin.svg"></image></view>
			<view class="ic_logo"><image src="/static/images/index_logo.png"></image></view>
		</view>
        <view class="uni-slide">
			<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000">
				<swiper-item v-for="(item,index) in itemList" :key="index">
					<image :src="item.url" :alt="item.title"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-swiper-msg bgwhite mb20">
			<view class="uni-swiper-msg-icon">
				<image src="/static/icons/ic-notification.svg"></image>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index" class="uni-swiper-msg-con">
					<navigator>{{item}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="bgwhite uni-nav">
				<view class="uni-nav-con" v-for="(nav,index) in navList" :key="index">
					<view class="image-view">
						<image class="uni-nav-image" :src="nav.url"></image>
					</view>
					<text class="uni-nav-title">{{nav.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [
					{title:'img1',url:'/static/images/slide.jpg'},
					{title:'img2',url:'/static/images/slide.jpg'},
				],
				msg : [
					'uni-app行业峰会频频亮相，开发者反响热烈',
					'DCloud完成B2轮融资，uni-app震撼发布',
					'36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章'
				],
				navList:[
					{title:'值班管理',url:'/static/images/ic_duty.svg'},
					{title:'巡检管理',url:'/static/images/ic_polling.svg'},
					{title:'工单管理',url:'/static/images/ic_workorder.svg'},
					{title:'资产管理',url:'/static/images/ic_property.svg'},
					{title:'我的关注',url:'/static/images/ic_myfocus.svg'},
					{title:'知识管理',url:'/static/images/ic_knowledge.svg'},
					{title:'容量管理',url:'/static/images/ic_capacity.svg'},
					{title:'更多',url:'/static/images/ic_more.svg'},
				]
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
		height: 40upx;
		padding: 20upx 40upx;
		position:relative;
	}
	.ic_image{
		width: 40upx;
		height: 40upx;
	}
	.ic_message{
		margin-left: 25upx;
	}
	.ic_logo{
		position:absolute;
		left: 50%;
		margin-left: -110upx;
		width: 220upx;
		height: 40upx;
	}
	.uni-slide uni-swiper{
		height: 400upx;
	}
	uni-image{
		width:100%;
		height:100%;
	}
	.uni-swiper-msg{
		width: auto;
		height: 60upx;
		padding-left: 20upx;
		padding-right: 20upx;
	}
	.uni-swiper-msg-con{
		overflow:hidden;
	}
	.uni-nav-con{
		width: 25%;
	}
</style>
