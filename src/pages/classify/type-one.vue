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
			console.log(233333333333333)
			this.$api.get("/getData",{showLoading: true},r=>{
				console.log(r)
			});
			this.$api.post("/postData",{
				showLoading: true,
				name:"123123",
				dataqe:[{
					"name":"123",user:"222"
				}],
				obj:{
					sdd:"23"
				}
			},r=>{
				console.log(r)
			});
		},
	
		data() {
			return {
				Info:"admin",
				aesInfo:"admin",
				backInfo:""
			}
		},
		
		methods: {
			
		},
		watch:{
			
		}
	}
</script>

<style>
	
</style>
