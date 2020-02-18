<template>
	<view v-if="showPopup" class="uni-popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__mask" @click="close(true)" />
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__wrapper" @click="close(true)">
			<view class="uni-popup__wrapper-box" @click="close(true)">
				<swiper @change="changeSwiper" class="my_swiper" :current="current" :circular="circular" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration">
					<swiper-item v-for="(x, y) in picList" :key="y">
						<view class="bg_img" :style="{ backgroundImage: 'url('+x.picPath+')'}"></view>
					</swiper-item>
				</swiper>
				<view class="page" v-if="picList.length>0">{{ current + 1 }} / {{ picList.length }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopup',
		props: {
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
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: true
			},
			//默认开始的展示第几个图片
			current:{
				type:Number,
				default:0,
			},
			picList:{
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				ani: '',
				showPopup: false,

				indicatorDots: false,
				autoplay: false,
				duration: 500,
				circular: true,
				isShowSwiper: false
			}
		},
		watch: {
			show(newValue) {
				if (newValue) {
					this.open()
				} else {
					this.close()
				}
			}
		},
		created() {},
		methods: {
			clear() {},
			open() {
				this.$emit('change', {
					show: true
				})
				this.showPopup = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.ani = 'uni-' + this.type
					}, 30)
				})
			},
			close(type) {
				if (!this.maskClick && type) return
				this.$emit('change', {
					show: false
				})
				this.ani = ''
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPopup = false
					}, 300)
				})
			},
			changeSwiper(e) {
				this.current = e.target.current;
			}
		}
	}
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
		background: rgba(0, 0, 0, .8);
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
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 5;
		> .my_swiper {
			width: 100%;
			height: 60vh;
			.bg_img {
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position:center;
				width: 100%;
				height: 100%;
			}
		}
		.page {
			position: fixed;
			z-index: 6;
			color: #fff;
			bottom: 20rpx;
			text-align: center;
			width: 100%;
		}
	}
	.pic_list {
		display: flex;
		flex-flow: row wrap;
		> view {
			flex: 0 0 33.3vw;
			height: 33.3vw;
			padding: 1vw;
			> image {
				width: 100%;
				height: 100%;
			}
		}
	}
	// .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
	// 	padding: 30upx;
	// }

	// .uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
	// 	position: relative;
	// 	width: 100%;
	// 	height: 100%;
	// 	overflow-y: scroll
	// }

	// .uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box,
	// .uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box {
	// 	width: 100%;
	// 	max-height: 500px;
	// 	overflow-y: scroll
	// }

	.uni-popup__wrapper.uni-bottom,
	.uni-popup__wrapper.uni-top {
		transform: translateY(0)
	}

	.uni-popup__wrapper.uni-center {
		transform: scale(1);
		opacity: 1
	}
</style>