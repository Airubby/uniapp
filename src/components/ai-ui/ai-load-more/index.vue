<template>
    <view>
        <view>{{contentText.contentnoinfo}}</view>
		<slot />
        <view class="ai-load-more" v-show="showLoading">
            <view v-if="iconType==='circle' || iconType==='auto' && platform === 'android'" v-show="status === 'loading' && showIcon" class="ai-load-more__img">
                <view :style="{borderColor : color}" class="loader-android" />
            </view>
            <view v-else v-show="status === 'loading' && showIcon" class="ai-load-more__img">
                <view class="load1 load">
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                </view>
                <view class="load2 load">
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                </view>
                <view class="load3 load">
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                    <view :style="{ background: color }" class="ai-load-view_wrapper" />
                </view>
            </view>
            <text :style="{ color: color }" class="ai-load-more__text">
                {{ status === 'more' ? contentText.contentdown : status === 'loading' ? contentText.contentrefresh : contentText.contentnomore }}
            </text>
        </view>
    </view>
</template>

<script>
	const platform = uni.getSystemInfoSync().platform
	export default {
		name: 'AiLoadMore',
		props: {
			// status: {
			// 	// 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
			// 	type: String,
			// 	default: 'more'
			// },
			type:{
				type:String,
				default:"local"  //remote，local
			},
			url:{
				type:String,
				default:""  
			},
			showIcon: {
				type: Boolean,
				default: true
			},
			iconType: {
				type: String,
				default: 'auto'
			},
			color: {
				type: String,
				default: '#777777'
			},
			contentText: {
				type: Object,
				default () {
					return {
						contentdown: '上拉显示更多',
						contentrefresh: '正在加载...',
                        contentnomore: '没有更多数据了',
                        contentnoinfo:"暂无数据信息"
					}
				}
			}
        },
        // 下拉刷新
		onPullDownRefresh() {
			if(this.type==="remote"){
				this.showLoading=false;
				this.totalData=[];
				this.initParams={
					page:1,
					limit:10,
					productCategoryId:"", 
				}
				this.getList();
			}
		},
		// 上拉加载
		onReachBottom() {
			if(this.type==="remote"){
				this.showLoading=true;
				this.status = 'loading'
				uni.showNavigationBarLoading()
				this.initParams.page+=1;
				this.getList("fresh");
			}
			
		},
		data() {
			return {
                platform: platform,
                status:'more',
                showLoading:false,
                totalData:[],
			}
        },
        methods:{
            getList:function(fresh){
				this.$r.get('/product/search', pagination, r => {
					if(fresh){
						if(r.data.length>0){
							this.totalData=this.totalData.concat(r.data);
						}else{
							this.status = 'noMore'
						}
						// this.showLoading=false;
						uni.hideNavigationBarLoading()
					}else{
						this.totalData=r.data;
						uni.stopPullDownRefresh(); //关闭下拉状态
					}
					if(r.total==0&&this.totalData.length==0){
						this.show=true;
					}else{
						this.show=false;
					}
				});
			},
        }
	}
</script>

<style scoped>
	@charset "UTF-8";

	.ai-load-more {
		display: flex;
		flex-direction: row;
		height: 30px;
		align-items: center;
		justify-content: center
	}

	.ai-load-more__text {
		font-size: 14px;
		color: #999
	}

	.ai-load-more__img {
		position: relative;
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.ai-load-more__img>.load {
		position: absolute
	}

	.ai-load-more__img>.load .ai-load-view_wrapper {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load .96s ease infinite
	}

	.ai-load-more__img>.load .ai-load-view_wrapper:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.ai-load-more__img>.load .ai-load-view_wrapper:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.ai-load-more__img>.load .ai-load-view_wrapper:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.ai-load-more__img>.load .ai-load-view_wrapper:nth-child(4) {
		top: 11px;
		left: 0
	}

	.ai-load-more__img>.loader-android {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		box-sizing: border-box;
		border: solid 2px #777;
		border-radius: 50%;
		border-bottom-color: transparent !important;
		animation: loader-android 1s 0s linear infinite
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 .ai-load-view_wrapper:nth-child(1) {
		animation-delay: 0s
	}

	.load2 .ai-load-view_wrapper:nth-child(1) {
		animation-delay: 80ms
	}

	.load3 .ai-load-view_wrapper:nth-child(1) {
		animation-delay: .16s
	}

	.load1 .ai-load-view_wrapper:nth-child(2) {
		animation-delay: .24s
	}

	.load2 .ai-load-view_wrapper:nth-child(2) {
		animation-delay: .32s
	}

	.load3 .ai-load-view_wrapper:nth-child(2) {
		animation-delay: .4s
	}

	.load1 .ai-load-view_wrapper:nth-child(3) {
		animation-delay: .48s
	}

	.load2 .ai-load-view_wrapper:nth-child(3) {
		animation-delay: .56s
	}

	.load3 .ai-load-view_wrapper:nth-child(3) {
		animation-delay: .64s
	}

	.load1 .ai-load-view_wrapper:nth-child(4) {
		animation-delay: .72s
	}

	.load2 .ai-load-view_wrapper:nth-child(4) {
		animation-delay: .8s
	}

	.load3 .ai-load-view_wrapper:nth-child(4) {
		animation-delay: .88s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}

	@-webkit-keyframes loader-android {
		0% {
			transform: rotate(0)
		}

		100% {
			transform: rotate(360deg)
		}
	}
</style>