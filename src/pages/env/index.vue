<template>
	<view class="content">
		<view class="tip">
            <text class="iconfont icon-shuoming"></text>提示：长按图片保存至手机相册
        </view>
        <view class="poster">
            <image :src="image" mode="widthFix" />
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                title: '能效',
                image:"",  //图片地址
			}
		},
		onLoad() {

		},
		methods: {
            //页面写上这个函数就可以微信分享
            onShareAppMessage: function () {
                return {
                    title: "帮砍价",
                    imageUrl: this.image,  //分享的图片地址
                    path: "pages/env/index",  //路由path
                    success(res) {
                        uni.showToast({
                            title: '分享成功'
                        })
                    },
                    fail(res) {
                        uni.showToast({
                            title: '分享失败',
                            icon: 'none'
                        })
                    }
                }
            },
            
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400px;
	}
    .logo{
        height: 200px;
        width: 200px;
        margin-top: 200px;
    }
	.title {
		font-size: 36px;
		color: #8f8f94;
	}
</style>
