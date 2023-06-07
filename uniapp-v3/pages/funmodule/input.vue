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
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		reactive,
		toRefs
	} from "vue";
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	
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
	onMounted(() => {

	})
	onLoad(() => {
		
	})
	const {isValue,value}=toRefs(state)
</script>

<style scoped lang="less">
	.title{
		width: 100%;
		display: block;
		font-size: 26px;
		text-align: center;
	}
</style>
