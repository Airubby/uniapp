<template>
	<popup :type="'center'" :mask-click="true" ref="popupRef">
		<view class="uni-tip-title">{{ title }}</view>
		<view class="uni-tip-content">
			<slot></slot>
		</view>
		<view class="uni-tip-group-button">
			<view class="uni-tip-button" @click="close()">取消</view>
			<view class="uni-tip-button" @click="sure()">确定</view>
		</view>
	</popup>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		ref,
		computed,
		onMounted,
		nextTick,
		watch
	} from 'vue'
	import popup from "./popup.vue"
	const props = defineProps({
		title: {
			type: String,
			default: "提示",
		},
		visible: {
			type: Boolean,
			default: false,
		},
	});
	const emit = defineEmits(["sure"]);
	const popupRef = ref < any > (null)

	const sure = () => {
		emit("sure")
	}
	const open = () => {
		popupRef.value.open()
	}
	const close = () => {
		popupRef.value.close()
	}
	defineExpose({
		open,
		close,
	});
</script>
<style>
	.uni-tip {
		padding: 15px;
		width: 100%;
		height: 100%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		max-height: 80%;
		padding: 15px;
		font-size: 14px;
		color: #666;
		text-align: left;
	}

	.uni-tip-group-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-tip-button {
		width: 50%;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
</style>
