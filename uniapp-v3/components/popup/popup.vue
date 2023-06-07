<template>
	<view v-if="showPopup" class="uni-popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__mask"
			@click="close(true)" />
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__wrapper"
			@click="close(true)">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<slot />
			</view>
		</view>
	</view>
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
		show: {
			type: Boolean,
			default: true
		}
	});
	const emit = defineEmits(["change"]);
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
<style>
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
		box-sizing: border-box
	}

	.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
		padding: 30upx;
		background: #fff
	}

	.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
		position: relative;
		max-width: 80%;
		max-height: 80%;
		overflow-y: scroll
	}

	.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box,
	.uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box {
		width: 100%;
		max-height: 500px;
		overflow-y: scroll
	}

	.uni-popup__wrapper.uni-bottom,
	.uni-popup__wrapper.uni-top {
		transform: translateY(0)
	}

	.uni-popup__wrapper.uni-center {
		transform: scale(1);
		opacity: 1
	}
</style>
