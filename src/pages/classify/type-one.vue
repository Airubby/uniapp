<template>
	<view>
		<view>原文本：{{Info}}</view>
		<view>AES加密文本：{{aesInfo}}</view>
		<view>AES解密文本：{{backInfo}}</view>
	</view>
</template>

<script>
	
	export default {
		components: {},
		created(){
			this.aesInfo=this.$util.Encrypt(this.Info);
			this.backInfo=this.$util.Decrypt(this.aesInfo);
		},
		data() {
			return {
				Info:"admin",
				aesInfo:"admin",
				backInfo:""
			}
		},
		onLoad() {

		},
		methods: {
			
		},
		watch:{
			
		}
	}
</script>

<style>
	
</style>
