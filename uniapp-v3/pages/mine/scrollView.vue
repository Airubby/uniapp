<template>
	<view class="app-content">
		<view class="app-content">
		<view class="page-head">
			<view class="search">
				<view class="search-view">
					<input class="uni-input search-view-input color-normal txt-size-normal" type="text"
						@input="onKeyInput" placeholder-class="color-tips" placeholder="请输入应用名称关键字"
						v-model="searchvalue" />
						<image src="/static/images/visitor/ic_devInfo_search.png" class="searchimg" @click="getSearch()"></image>
				</view>
			</view>
			<view class="classify" @click="toedit">
				<text class="color-36435b title"> 我的应用</text>
				<scroll-view scroll-x class="scrollimg">
					<view class="imgs">
						<block v-for="(item,index) in myClassify" :key="index">
							<image class="imgsmall" :src="item.img" @click="tolist(item)"></image>
						</block>
					</view>
				</scroll-view>
				<view class="txt-size-normal color-36435b edit">编辑</view>
			</view>
		</view>
		<view class="scrollcontent">
			<scroll-view scroll-y class="scrolllist" :scroll-top="scrollTop">
				<view class="scrolllist-con" v-show="dataFlag">
					<block v-for="(item,index) in dataarry" :key="index">
						<view class="list-cell">
							<view class="list-cell-title">{{item.name}}</view>
							<view class="list-cell-con">
								<view class="cell-box" @click="tolist(initem)" v-for="(initem,inindex) in item.data">
									<image class="img" :src="initem.img"></image>
									<view>{{initem.name}}</view>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view class="scrolllist-con" v-show="!dataFlag">
					<block v-for="(item,index) in searchData" :key="index">
						<view class="list-cell" @click="tolist(item)">
							<view class="list-cell-title">
								<image class="img" :src="item.img"></image>
								<view class="info">{{item.name}}</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive ,ref,watch} from 'vue'
	import { onShow, onLoad} from '@dcloudio/uni-app'
	
	
	//我的应用
	const myClassify=ref([
		{img:"/static/images/classify/my_about.png"},
		{img:"/static/images/classify/my_datasync.png"},
		{img:"/static/images/classify/my_feedback.png"},
		{img:"/static/images/classify/my_serversettings.png"},
		{img:"/static/images/classify/my_signin.png"},
		{img:"/static/images/classify/my_wipecache.png"},
		{img:"/static/images/classify/my_about.png"},
		{img:"/static/images/classify/my_datasync.png"},
		{img:"/static/images/classify/my_feedback.png"},
		{img:"/static/images/classify/my_serversettings.png"},
		{img:"/static/images/classify/my_signin.png"},
		{img:"/static/images/classify/my_wipecache.png"},
	])
	const toedit=()=> {
		uni.navigateTo({
			url: '/pages/mine/editClassify'
		})
	}
	
	const dataarry=ref([
		{name:"人员进出",data:[
			{img:"/static/images/classify/my_about.png",name:"人员进出申请"},
		]},
		{name:"设备进出",data:[
			{img:"/static/images/classify/my_datasync.png",name:"设备移入"},
			{img:"/static/images/classify/my_serversettings.png",name:"设备移出"},
		]},
		{name:"审计报告",data:[
			{img:"/static/images/classify/my_wipecache.png",name:"审计报告"},
		]},
		{name:"审计报告",data:[
			{img:"/static/images/classify/my_wipecache.png",name:"审计报告"},
		]},
		{name:"审计报告",data:[
			{img:"/static/images/classify/my_wipecache.png",name:"审计报告"},
		]},
		{name:"审计报告",data:[
			{img:"/static/images/classify/my_wipecache.png",name:"审计报告"},
		]},
		{name:"审计报告",data:[
			{img:"/static/images/classify/my_wipecache.png",name:"审计报告"},
		]}
	])
	
	//搜索
	const searchvalue=ref("")
	const dataFlag=ref(true) 
	const scrollTop=ref(0)
	const searchData=ref([
		{img:"/static/images/classify/my_about.png",name:"人员进出申请"},
		{img:"/static/images/classify/my_serversettings.png",name:"设备移出"},
	])
	
	const onKeyInput=(event)=>{
		searchvalue.value = event.detail.value.replace(/ /g, '');
	}
	const getSearch=()=>{
		dataFlag.value=false
	}
	watch(()=>searchvalue.value,(value)=>{
		if(!value){
			dataFlag.value=true
		}
	})
	
	const tolist=(item)=>{
		
	}
</script>

<style scoped lang="less">
	.page-head {
		height: 100px;
		width: 100%;
		background-color: #464c5b;
		.search{
			width: 100%;
			height: 56px;
			padding: 10px 12px 0;
			box-sizing: border-box;
			.search-view {
				height: 34px;
				border-radius: 4px;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 12px;
				box-sizing: border-box;
				background-color: #FFFFFF;
			}
			.search-view-input {
				height: 32px !important;
				padding: 0 !important;
				line-height: 32px;
				box-sizing: border-box;
				background-color: #FFFFFF;
			}
			.searchimg {
				width: 16px;
				height: 16px;
			}
		}
		.classify{
			width: 100%;
			height: 44px;
			background: #fff;
			height: 44px;
			width: 100%;
			padding: 0 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			.title{
				width: 65px;
			}
			.scrollimg{
				width: calc(100% - 140px);
				height: 100%;
				.imgs {
					height: 100%;
					display: flex;
					align-items: center;
					.imgsmall {
						width: 18px;
						height: 18px;
						flex-shrink: 0;
						margin: 0 8px;
					}
				}
			}
			
			.edit {
				line-height: 24px;
				border: 1px solid #E3E3E3;
				border-radius: 4px;
				width: 50px;
				height: 24px;
				text-align: center;
			}
		}
	}
	
	.scrollcontent {
		width: 100%;
		height: calc(100% - 100px);
		.scrolllist{
			width: 100%;
			height: 100%;
			.scrolllist-con{
				padding: 12px 12px 4px;
				box-sizing: border-box;
			}
		}
	}
	.list-cell{
		background-color:  #fff;
		border-radius: 4px;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 8px;
		.list-cell-title{
			width: 100%;
			height: 44px;
			line-height: 44px;
			border-bottom: 1px solid #f4f4f8;
			padding-left: 12px;
			font-weight: bold;
			display: flex;
			align-items: center;
			.img{
				width: 22px;
				height: 22px;
				margin-right: 10px;
			}
			.info{
				font-weight: normal;
			}
		}
		.list-cell-con{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 12px;
			.cell-box{
				height: 65px;
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.img{
					width: 22px;
					height: 22px;
					margin-bottom: 8px;
				}
			} 
			
		}
	}
	
</style>