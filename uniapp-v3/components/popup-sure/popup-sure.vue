<template>
	<view v-if="showPopup" class="uni-popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__mask" @click="maskClose()" />
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__wrapper" @click="close(true)">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<view class="uni-tip-title" v-if="title">{{ title }}</view>
				<scroll-view scroll-y="true" class="uni-tip-content">
					<slot></slot>
					<!-- #ifndef H5 -->
					<view class="tbheight"></view>
					<!-- #endif -->
				</scroll-view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="close()" v-show="btnType=='both'||btnType=='cancel'">{{cancelBtn}}</view>
					<view class="uni-tip-button sure" @click="sure()" v-show="btnType=='both'||btnType=='sure'">{{sureBtn}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	/**
	 * <popup ref="popupRef" type="center" @sure="sureTable"></popup>
	 */
	import { reactive, toRefs, ref, computed, onMounted, nextTick, 	watch } from 'vue'
	const props = defineProps({
		// 开启动画
		animation: {
			type: Boolean,
			default: true
		},
		// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
		type: {
			type: String,
			default: 'center'
		},
		// 是否开启自定义
		custom: {
			type: Boolean,
			default: false
		},
		// isMaskClick
		isMaskClick: {
			type: Boolean,
			default: true
		},
		maskFun:{
			type:Function,
		},
		show: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: "",
		},
		btnType:{
			type:String,
			default:"both",  //cancel,sure,both
		},
		cancelBtn:{
			type:String,
			default:"取消"
		},
		sureBtn:{
			type:String,
			default:"确定"
		}
	});
	const emit = defineEmits(["change","sure"]);
	const showPopup = ref < boolean > (false)
	const ani = ref < string > ("")

	const clear = () => {}
	const open = () => {
		emit("change", {
			show: true
		})
		showPopup.value = true
		nextTick(() => {
			setTimeout(() => {
				ani.value = 'uni-' + props.type
			}, 30)
		})
	}
	const close = (type ? : any) => {
		if (!props.isMaskClick && type) return
		emit("change", {
			show: false
		})
		ani.value = ''
		nextTick(() => {
			setTimeout(() => {
				showPopup.value = false
			}, 300)
		})
	}
	const handleLoading=ref(false)
	const sure = () => {
		if(handleLoading.value){
			return
		}
		handleLoading.value = true;
		nextTick(() => {
		  emit("sure")
		  setTimeout(() => {
			handleLoading.value = false;
		  }, 2000);
		})
		
	}
	const maskClose=()=>{
		if ( props.maskFun) return;
		close()
	}
	watch(
		() => props.show,
		val => {
			if (val) {
				open()
			} else {
				close()
			}
		}
	);
	defineExpose({
		open,
		close,
	});
</script>
<style lang="less" scoped>
	@charset "UTF-8";
	.uni-popup {
		position: fixed;
		top: 0;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		overflow: hidden
	}

	.uni-popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background: rgba(0, 0, 0, .4);
		opacity: 0
	}

	.uni-popup__mask.ani {
		transition: all .3s
	}

	.uni-popup__mask.uni-bottom,
	.uni-popup__mask.uni-center,
	.uni-popup__mask.uni-top {
		opacity: 1
	}

	.uni-popup__wrapper {
		position: absolute;
		z-index: 999;
		box-sizing: border-box
	}

	.uni-popup__wrapper.ani {
		transition: all .3s
	}

	.uni-popup__wrapper.top {
		top: 0;
		left: 0;
		width: 100%;
		transform: translateY(-100%)
	}

	.uni-popup__wrapper.bottom {
		bottom: 0;
		left: 0;
		width: 100%;
		transform: translateY(100%)
	}

	.uni-popup__wrapper.center {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: scale(1.2);
		opacity: 0
	}

	.uni-popup__wrapper-box {
		position: relative;
		box-sizing: border-box;
	}

	.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
		background: #fff
	}

	.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
		position: relative;
		max-width: 100%;
		max-height: 90%;
		overflow: hidden;
	}

	.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box,
	.uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box {
		width: 100%;
		max-height: 50vh
	}

	.uni-popup__wrapper.uni-bottom,
	.uni-popup__wrapper.uni-top {
		transform: translateY(0)
	}

	.uni-popup__wrapper.uni-center {
		transform: scale(1);
		opacity: 1
	}
	
	.uni-tip-title {
		width: 100%;
		height: 48px;
		position: absolute;
		top: 0;
		font-size: 16px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		z-index: 9;
	}
	
	.uni-tip-content {
		max-width: 100%;
		max-height: 90vh;
		padding: 48px 0;
		overflow: auto;
		box-sizing: border-box;
	}
	.uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box .uni-tip-content,
	.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box .uni-tip-content{
		max-width: 100vw;
		max-height: 50vh;
	}
	.tbheight{
		width: 100%;
		height: 96px;
	}
	.uni-tip-group-button {
		width: 100%;
		display: flex;
		position: absolute;
		bottom: 0;
		align-items: center;
		font-size: 18px;
		height: 48px;
		justify-content: space-between;
		border-top: 1px solid #e9e9e9;
		background-color: #fff;
	}
	
	.uni-tip-button {
		width: 50%;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
	.uni-tip-button.sure{
		color: #146AFB;
		border-left: 1px solid #e9e9e9;
		height: 100%;
		align-items: center;
		display: flex;
		justify-content: center;
	}
</style>
