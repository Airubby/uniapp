<template>
	<view>
		<view>原文本：{{Info}}</view>
		<view>AES加密文本：{{aesInfo}}</view>
		<view>AES解密文本：{{backInfo}}</view>
		<view style="width:200px;height:150px;">
			<ai-upload-image v-model="imgUrl" action="127.0.0.1" @success="success" @fail="fail"></ai-upload-image>
		</view>
		{{imgUrl}}
	</view>
</template>

<script>
	import aiUploadImage from '@/components/ai-ui/ai-upload-image/index.vue'
	export default {
		components: {aiUploadImage},
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
				backInfo:"",
				imgUrl:"",
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
