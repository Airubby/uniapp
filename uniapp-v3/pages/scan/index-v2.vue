<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
			<view class="">
				<view class="title">扫码回调code：{{code}}</view>
				<view class="title">扫码回调参数：{{value}}</view>
			</view>
			<button type="small" @click="onScan">点击扫码</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textscan: '扫码',
				typescan: 'scan-listener',
				title: 'Hello-plusScan',
				value:'',
				code:""
			}
		},
		onLoad() {

		},
		onReady() {
			 uni.$on(this.typescan,(data)=>{
				 this.value=data.result
				 this.code=data.code;
			 })
		},
		methods: {
			onScan(){
				uni.navigateTo({
					url: '/pages/scan/scan?text=' + this.textscan + '&type=' + this.typescan,
				});
			},
			
		}
	}
</script>

<style>
.content{
	width: 100%;
	display: flex;
	place-content: center;
}
button{
	background-color: #DD524D;
	color: #FFFFFF;
}
</style>
