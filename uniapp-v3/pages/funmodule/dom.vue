<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title">input聚焦提示</text>
			<view>
				<view class="input-box">
					<input class="iac-input" placeholder="placeholder" v-model="value" @focus="onFocus" @blur="onBlur"  />
					<view class="InputList" v-show="isValue">
						123456
					</view>
				</view>
			</view>
		</view>
		<view class="scan-box">
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
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, toRefs,ref } from "vue";
	import { onLoad, onReady } from '@dcloudio/uni-app'
	//input聚焦提示
	const state=reactive({
		isValue: false,
		value:""
	})
	const onFocus=()=>{
		state.isValue=true
	}
	const onBlur=()=>{
		state.isValue=false
	}
	const {isValue,value}=toRefs(state)
	
	//头部收缩及下拉
	const searchvalue=ref("")
	const onKeyInput=()=>{}
	const dropList=ref([
		{label:"全部",value:"0"},
		{label:"审核中",value:"1"},
		{label:"审核完成",value:"2"},
	])
	const selectValue=ref("0")
	const changeDrop=(data)=>{
		console.log(data,selectValue.value)
	}
	
	
</script>

<style scoped lang="less">
	.title{
		width: 100%;
		display: block;
		font-size: 26px;
		text-align: center;
	}
	//搜索下拉
	.page-head {
		height: 56px;
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding-left: 16px;
		padding-right: 16px;
		box-sizing: border-box;
		z-index: 9;
		background-color: #f4f4f8;
		.dropdown-box{
			width:100px;
			height:34px;
			background-color: #FFFFFF;
			padding: 0 12px;
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
	
</style>
