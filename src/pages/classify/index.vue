<template>
	<view class="content">
		<view>
            <text class="title">{{title}}</text>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '设备分类'
			}
		},
		onLoad() {

		},
		methods: {

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
