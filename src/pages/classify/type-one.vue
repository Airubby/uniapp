<template>
	<view>
		<view>原文本：{{Info}}</view>
		<view>AES加密文本：{{aesInfo}}</view>
		<view>AES解密文本：{{backInfo}}</view>
		<view style="width:200px;height:150px;">
			<ai-upload-image :src="baseUrl+imgUrl" :action="$ajaxUrl+'/posts/'" iconSize="36" iconColor="#0099cc" @success="success" @fail="fail"></ai-upload-image>
		</view>
		{{imgUrl}}
		{{resultInfo}}
		<view @tap="toggleTab('picker')">弹出picker</view>
		<view>
			<ai-picker
			mode="region" 
			:hideArea="false"
			:areaCode="['130000','130200','130204']"
			@confirm="onConfirm"
			ref="picker" 
			themeColor="#f00"></ai-picker>
		</view>
		<view @tap="toggleTab('selector')" style="margin: 10px 0;">弹出selector</view>
		<view>
			<ai-picker
				v-if="selectList.length!=0"
				mode="selector" 
				:defaultVal="['2']" 
				@confirm="onConfirm" 
				ref="selector" 
				themeColor="#f00"
				:params="{label: 'name',
						value: 'id',}"
				:selectList='selectList'
			></ai-picker>
		</view>
		<view>百度ip定位：</view>
		<view style="margin-top:10px;">
			<ai-input v-model="input" placeholder="请输入" type="password" placeholderStyle="color:#999;"></ai-input>
			<text>双向绑定input的值：{{input}}</text>
			<ai-input v-model="textarea" placeholder="请输入" :autoHeight="true" type="textarea" placeholderStyle="color:#999;"></ai-input>
			<text>双向绑定textarea的值：{{textarea}}</text>
		</view>
	</view>
</template>

<script>
	import aiUploadImage from '@/components/ai-ui/ai-upload-image/index.vue'
	import aiPicker from '@/components/ai-ui/ai-picker/index.vue'
	import aiInput from '@/components/ai-ui/ai-input/index.vue'
	export default {
		components: {aiUploadImage,aiPicker,aiInput},
		created(){
			this.aesInfo=this.$util.Encrypt(this.Info);
			this.backInfo=this.$util.Decrypt(this.aesInfo);
			this.$api.get("/getData",{},r=>{
				console.log(r)
			});
			this.$api.post("/postData",{
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
				baseUrl:"https://img.cdn.aliyun.dcloud.net.cn",
				imgUrl:"/stream/plugin_screens/bbe77c00-83c2-11e9-ad53-2fc4ad63c7cf_0.jpg?v=1576120713",
				resultInfo:"",
				input:"",
				textarea:"",
				selectList:[{id:"1",name:"男"},{id:"2",name:"女"}]
			}
		},
		
		methods: {
			toggleTab(item){
				this.$refs[item].show();
			},
			onConfirm(val){
				console.log(val);
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				this.resultInfo=val;
			},
			success:function(response){
				
			},
			fail:function(response){

			},
		},
		watch:{
			
		}
	}
</script>

<style>
	
</style>
