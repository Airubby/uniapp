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
		<view class="content mb20">
			<view class="bgwhite uni-nav">
				<view class="uni-nav-con" v-for="(nav,index) in navList" :key="index">
					<view class="image-view">
						<image class="uni-nav-image" :src="nav.url"></image>
					</view>
					<text class="uni-nav-title">{{nav.title}}</text>
				</view>
			</view>
		</view>
		<view class="content mb20">
			<view class="title mb10">待办事项</view>
			<view v-for="(item,index) in eventList" :key="index">
				<view class="bgwhite event-box mb20">
					<view class="event-box-top">
						<view class="event-box-toptitle">{{item.title}}</view>
						<view class="type" :class="{'fontbg1':item.type=='1','fontbg':item.type=='2'}">{{item.type|nameFilter}}</view>
						<view class="alarmType" :class="{'bg1':item.alarmType=='1','bg2':item.alarmType=='2','bg3':item.alarmType=='3'}"></view>
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
					{title:'值班管理',url:'/static/icons/ic_duty.svg'},
					{title:'巡检管理',url:'/static/icons/ic_polling.svg'},
					{title:'工单管理',url:'/static/icons/ic_workorder.svg'},
					{title:'资产管理',url:'/static/icons/ic_property.svg'},
					{title:'我的关注',url:'/static/icons/ic_myfocus.svg'},
					{title:'知识管理',url:'/static/icons/ic_knowledge.svg'},
					{title:'容量管理',url:'/static/icons/ic_capacity.svg'},
					{title:'更多',url:'/static/icons/ic_more.svg'},
				],
				eventList:[
					{title:'UPS欠压排查维修',user:'张三',time:'2018-11-13 12:30',createTime:'1小时前',code:'WOT-201807130001',type:'1',alarmType:'1',content:'待审批'},
					{title:'机房001配电系统例行巡检',user:'张三',time:'2018-11-13 12:30',createTime:'1小时前',code:'WOT-201807130001',type:'1',alarmType:'2',content:'待执行'},
					{title:'机房003配电系统例行巡检',user:'张三',time:'2018-11-13 12:30',createTime:'1小时前',code:'WOT-201807130001',type:'2',alarmType:'3',content:'待通过'},
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
	.uni-swiper-msg-icon uni-image{
		width:80%;
		height:80%;
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
	.uni-nav{
		 display: flex;
		 flex-wrap:wrap;
		 justify-content:center;
		 padding-top: 15upx;
	}
	.uni-nav-con{
		width: 25%;
		text-align:center;
		margin-bottom: 15upx;
	}
	.image-view{
		width: 35%;
		height: 35%;
		margin: 10upx auto;
	}
	.event-box{
		padding: 0 20upx;
	}
	.event-box-top,
	.event-box-con{
		display:flex;
		position:relative;
	}
	.event-box-con{
		color:#666;
		padding-bottom: 20upx;
	}
	.event-box-toptitle{
		max-width: 65%;
		font-size:28upx;
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 10upx 0;
	}
	.type{
		margin: 15upx 5upx;
		padding: 0 10upx;
		border-radius: 10upx;
	}
	.event-box-conleft{
		width: 80%;
	}
	.event-box-conright{
		width: 20%;
		text-align:right;
		padding-top: 20upx;
		color:#6FD8A5;
		font-size: 28upx;
	}
	.alarmType{
		width: 30upx;
		height: 50upx;
		position:absolute;
		right:0;
		top:0;
	}
	.alarmType:after{
		content:'';
		width:0;
		height:0;
		font-size:0;
		line-height:0;
		border-left:15upx solid transparent;
		border-right: 15upx solid transparent;
		border-bottom:15upx solid #fff;
		position:absolute;
		left:0;
		bottom:0;
	}
</style>
