<template>
	<view>
		
	</view>
</template>

<script>
	import amap from '@/common/amap-wx.js'
	export default {
		components: {},
		onLoad(){
			// 首先在高德开放平台，注册账号并且申请相关的 key 等信息；
			// 然后下载它的微信小程序版 SDK：微信小程序 SDK。放在@/common/amap-wx.js；
			this.amapPlugin = new amap.AMapWX({  
				key: "8123318faef792d4004dba6df6dbf2ca"  
			});  
			this.getRegeo();
		},
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			getRegeo() {    
				let _this=this;
				this.amapPlugin.getRegeo({  
					success: (data) => {  
						let city=data[0].regeocodeData.addressComponent.city;
						// _this.$store.dispatch('setLocation',city);
					},
					fail:function(res){
						uni.showToast({
							icon: 'none',
							title: "定位失败，请手动选择城市"
						});
					}  
				});  
			}, 
		},
		watch:{
			
		}
	}
</script>

<style>
	
</style>
