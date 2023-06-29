<template>
	<view class="app-content">
		<view class="page-head">
			<view class="dropdown-box">
				<dropdown dropWidth="120px" :data="dropList" v-model="selectValue" @change="changeDrop"></dropdown>
			</view>
			<view class="search-view">
				<input class="uni-input search-view-input color-normal txt-size-normal" type="text"
					@input="onKeyInput" placeholder-class="color-tips" placeholder="请输入关键字"
					v-model="searchvalue" />
					<image src="/static/images/visitor/ic_devInfo_search.png" class="searchimg" @click="getList"></image>
			</view>
		</view>
		<view class="scrollcontent">
			<block v-for="(item,index) in dataarry" :key="index">
				<view class="list-cell" @click.stop="tolist(item)">
					<view class="list-cell-left">
						<view class="cell-box">
							<view class="cell-box-con">
								<text class="color-second">名称：</text>
								<text class="color-36435b font_weight">{{item.name}}</text>
							</view>
						</view>
					</view>
					<text class="list-cell-right color-active">
						详情
						<!-- <uni-icons class="arrimg" type="forward" size="30" size="18" color="#9aa1ad"></uni-icons> -->
					</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive ,ref} from 'vue'
	import { onShow, onLoad} from '@dcloudio/uni-app'
	
	const dropList=ref([
		{label:"全部",value:"0"},
		{label:"审核中",value:"1"},
		{label:"审核完成",value:"2"},
	])
	const selectValue=ref("0")
	const changeDrop=(data)=>{
		console.log(data,selectValue.value)
	}
	
	const dataarry=ref([
		{name:"表单车牌日期",path:"/pages/mine/carTime"},
	])
	const searchvalue=ref("")
	
	
	
	const onKeyInput=()=>{
		
	}
	const getList=()=>{
		
	}
	const tolist=(item)=>{
		uni.navigateTo({
			url: item.path,
		});
	}
</script>

<style scoped lang="less">
	.page-head {
		height: 56px;
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding-left: 12px;
		padding-right: 12px;
		box-sizing: border-box;
		z-index: 9;
		background-color: #f4f4f8;
		border-bottom: 1px solid #e7e7e7;
		.dropdown-box{
			width:100px;
			height:34px;
			background-color: #FFFFFF;
			border-radius: 4px 0 0 4px;
			border-right: 1px solid #dcdcdc;
		}
		.search-view {
			height: 34px;
			border-radius: 0 4px 4px 0;
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
	
	.scrollcontent {
		width: 100%;
		padding: 66px 12px 0;
		box-sizing: border-box;
	}
	.list-cell{
		background-color:  #fff;
		border-radius: 4px;
		padding: 20px 12px 12px;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		cursor: pointer;
	}
	.list-cell-left{
		width: calc(100% - 50px);
	}
	.list-cell-right{
		width: 50px;
		text-align: right;
	}
	.cell-box{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
	.cell-box .cell-box-con{
		width: 100%;
		display: flex;
		margin-bottom: 8px;
	}
	.cell-box .cell-box-con .color-second{
		flex-shrink: 0;
	}
</style>