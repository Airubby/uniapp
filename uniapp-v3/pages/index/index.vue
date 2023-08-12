<template>
	<view class="contenter">
		<view class="top bgwhite" id="fixed-box">
			<view class="ic_image ic_search fl" @click="scroll">
				<image src="/static/icons/ic_search.svg" />
			</view>
			<view class="ic_image ic_message fr">
				<image src="/static/icons/ic_message.svg" />
			</view>
			<view class="ic_image ic_signin fr">
				<image src="/static/icons/ic_signin.svg" />
			</view>
			<view class="ic_logo" @click="getScrollTop">
				<image src="/static/images/index/logo.png" />
			</view>
		</view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="uni-slide">
			<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" indicator-color="#ffffff"
				indicator-active-color="#42B983">
				<swiper-item v-for="(item,index) in itemList" :key="index">
					<image :src="item.url" :alt="item.title" mode="aspectFill" style="width: 100%; height: 100%" />
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-swiper-msg bgwhite mb20">
			<view class="uni-swiper-msg-icon">
				<image src="/static/icons/ic-notification.svg"></image>
			</view>
			<view class="uni-swiper-msg-box">
				<swiper vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item v-for="(item, index) in msg" :key="index" class="uni-swiper-msg-con">
						<navigator>{{item}}</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="content mb20">
			<view class="bgwhite uni-nav">
				<view class="uni-nav-con" v-for="(nav,index) in navList" :key="index">
					<navigator :url="nav.path">
						<view class="image-view">
							<image class="uni-nav-image" :src="nav.url"></image>
						</view>
						<text class="uni-nav-title">{{nav.title}}</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="content mb20">
			<view class="title mb10">待办事项</view>
			<view v-for="(item,index) in eventList" :key="index">
				<view class="bgwhite event-box mb20">
					<view class="event-box-top">
						<view class="event-box-toptitle" @click="goDetail(item)">{{item.title}}</view>
						<view class="type" :class="{'fontbg1':item.type=='1','fontbg':item.type=='2'}">
							<text v-if="item.type=='1'">巡检</text>
							<text v-if="item.type=='2'">其它</text>
						</view>
						<view class="alarmType"
							:class="{'bg1':item.alarmType=='1','bg2':item.alarmType=='2','bg3':item.alarmType=='3'}">
						</view>
					</view>
					<view class="event-box-con">
						<view class="event-box-conleft">
							<text>{{item.code}}</text>
							<view>
								<text class="mr10">{{item.user}}</text><text>{{item.time}}</text>
							</view>
							<text class="fontcolor999">{{item.createTime}}</text>
						</view>
						<view class="event-box-conright">
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content mb20" id="mubiao">
			<view class="title mb10">其它事项</view>
			<view v-for="(item,index) in eventList" :key="index">
				<view class="bgwhite event-box mb20">
					<view class="event-box-top">
						<view class="event-box-toptitle" @click="goDetail(item)">{{item.title}}</view>
						<view class="type" :class="{'fontbg1':item.type=='1','fontbg':item.type=='2'}">
							<text v-if="item.type=='1'">巡检</text>
							<text v-if="item.type=='2'">其它</text>
						</view>
						<view class="alarmType"
							:class="{'bg1':item.alarmType=='1','bg2':item.alarmType=='2','bg3':item.alarmType=='3'}">
						</view>
					</view>
					<view class="event-box-con">
						<view class="event-box-conleft">
							<text>{{item.code}}</text>
							<view>
								<text class="mr10">{{item.user}}</text><text>{{item.time}}</text>
							</view>
							<text class="fontcolor999">{{item.createTime}}</text>
						</view>
						<view class="event-box-conright">
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	// import testApi from "@/api/modules/test"
	import {testApi} from "@/api"
	import {usePermissionStore} from "@/store"
	import { Encrypto } from "@/utils/AEScrypto"
	const permissionStore = usePermissionStore();
	
	onLoad(() => {
		let forcedLogin = false; //模拟不需要强制登录
		let hasLogin = false; //模拟没有登录
		if (!hasLogin) {
			uni.showModal({
				title: "未登录",
				content: "您未登录，需要登录后才能继续",
				/**
				 * 如果需要强制登录，不显示取消按钮
				 */
				showCancel: !forcedLogin,
				success: (res) => {
					if (res.confirm) {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						if (forcedLogin) {
							uni.reLaunch({
								url: "/pages/login/login",
							});
						} else {
							uni.navigateTo({
								url: "/pages/login/login",
							});
						}
					}
				},
			});
		}
		
		
		test();
		
	})
	
	const test=()=>{
		//测试post
		testApi.login({username:"admin",password:"Loncom@2022#"}).then((res:any)=>{
			if(res.errorCode=="0"){
				permissionStore.setToken(res.responseContent.token)
				testApi.getPage({userid:"99999999999999999",bu:"home"}).then(res=>{
					
				})
			}
		})
		//测试get
		testApi.getCode().then(res=>{
			
		})
		
	}
	
	const state = reactive({
		fixedboxHeight:"",
		itemList: [{
				title: "img1",
				url: "/static/images/index/slide.jpg"
			},
			{
				title: "img2",
				url: "/static/images/index/slide.jpg"
			},
		],
		msg: [
			"uni-app行业峰会频频亮相，开发者反响热烈",
			"DCloud完成B2轮融资，uni-app震撼发布",
			"36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章",
		],
		navList: [{
				title: "分享操作",
				url: "/static/icons/ic_duty.svg",
				path: "/pages/env/index",
			},
			{
				title: "巡检管理",
				url: "/static/icons/ic_polling.svg",
				path: "/pages/env/index",
			},
			{
				title: "工单管理",
				url: "/static/icons/ic_workorder.svg",
				path: "/pages/env/index",
			},
			{
				title: "资产管理",
				url: "/static/icons/ic_property.svg",
				path: "/pages/env/index",
			},
			{
				title: "我的关注",
				url: "/static/icons/ic_myfocus.svg",
				path: "/pages/env/index",
			},
			{
				title: "知识管理",
				url: "/static/icons/ic_knowledge.svg",
				path: "/pages/env/index",
			},
			{
				title: "容量管理",
				url: "/static/icons/ic_capacity.svg",
				path: "/pages/env/index",
			},
			{
				title: "更多",
				url: "/static/icons/ic_more.svg",
				path: "/pages/env/index",
			},
		],
		eventList: [{
				id: "1",
				title: "UPS欠压排查维修",
				user: "张三",
				time: "2018-11-13 12:30",
				createTime: "1小时前",
				code: "WOT-201807130001",
				type: "1",
				alarmType: "1",
				content: "待审批",
			},
			{
				id: "2",
				title: "机房001配电系统例行巡检",
				user: "张三",
				time: "2018-11-13 12:30",
				createTime: "1小时前",
				code: "WOT-201807130001",
				type: "1",
				alarmType: "2",
				content: "待执行",
			},
			{
				id: "3",
				title: "机房003配电系统例行巡检",
				user: "张三",
				time: "2018-11-13 12:30",
				createTime: "1小时前",
				code: "WOT-201807130001",
				type: "2",
				alarmType: "3",
				content: "待通过",
			},
		],
	})
	const scroll = () => {}
	const getScrollTop = () => {}
	const goDetail = (item) => {
		uni.navigateTo({
			url: "/pages/workOrder/detail?detail=" + encodeURIComponent(JSON.stringify(item)),
		});
	}
	const {
		itemList,
		msg,
		navList,
		eventList
	} = toRefs(state)
</script>

<style scoped lang="less">
	.status_bar {
		/* #ifdef APP-PLUS */
		height: calc(80upx + var(--status-bar-height));
		/* #endif */

		/* #ifndef APP-PLUS */
		height: 80upx;
		/* #endif */
		width: 100%;
	}

	.top {
		width: calc(100% - 40upx);
		/* #ifdef APP-PLUS */
		height: 40upx;
		padding-top: calc(20upx + var(--status-bar-height));
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
		/* #endif */

		/* #ifndef APP-PLUS */
		height: 40upx;
		padding: 20upx;
		/* #endif */

		top: 0;
		left: 0;
		position: fixed;
		z-index: 999;
	}

	.ic_image,
	.ic_image image {
		width: 40upx;
		height: 40upx;
	}

	.ic_message {
		margin-left: 25upx;
	}

	.ic_logo {
		position: absolute;
		left: 50%;
		margin-left: -110upx;
		width: 220upx;
		height: 40upx;
	}

	.ic_logo image {
		width: 100%;
		height: 40upx;
	}

	.uni-slide,
	.uni-slide uni-swiper {
		width: 750upx;
		height: 450upx;
	}

	.uni-slide image {
		width: 100%;
		height: 100%;
	}

	.uni-swiper-msg {
		width: auto;
		height: 60upx;
		display: flex;
		padding: 10upx 20upx;

		uni-swiper {
			height: 100%;
		}

		.uni-swiper-msg-icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			align-items: center;

			image {
				width: 80%;
				height: 80%;
			}
		}

		.uni-swiper-msg-box {
			width: 100%;
			height: 100%;

			.uni-swiper-msg-con {
				height: 100%;
				overflow: hidden;
				display: flex;
				align-items: center;
				color: #6fd8a5;
			}
		}
	}

	.uni-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding-top: 15upx;

		.uni-nav-con {
			width: 25%;
			text-align: center;
			margin-bottom: 15upx;
		}

		.image-view {
			width: 60upx;
			height: 60upx;
			margin: 10upx auto;
		}

		.image-view image {
			width: 100%;
			height: 100%;
		}
	}



	.event-box {
		padding: 0 20upx;
	}

	.event-box-top,
	.event-box-con {
		display: flex;
		position: relative;
	}

	.event-box-con {
		color: #666;
		padding-bottom: 20upx;
	}

	.event-box-toptitle {
		max-width: 65%;
		font-size: 28upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 10upx 0;
	}

	.type {
		margin: 15upx 5upx;
		padding: 0 10upx;
		border-radius: 10upx;
	}

	.event-box-conleft {
		width: 80%;
	}

	.event-box-conright {
		width: 20%;
		text-align: right;
		padding-top: 20upx;
		color: #6fd8a5;
		font-size: 28upx;
	}

	.alarmType {
		width: 30upx;
		height: 50upx;
		position: absolute;
		right: 0;
		top: 0;
	}

	.alarmType:after {
		content: "";
		width: 0;
		height: 0;
		font-size: 0;
		line-height: 0;
		border-left: 15upx solid transparent;
		border-right: 15upx solid transparent;
		border-bottom: 15upx solid #fff;
		position: absolute;
		left: 0;
		bottom: 0;
	}
</style>
