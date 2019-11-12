<template>
	<view>
		<button class="button" type="button" @click="openTip">提示框</button>
		<ai-tip :title="tipInfo.title" :content="tipInfo.content" @sure="sureTip" ref="tip"></ai-tip>
		<button class="button" type="button" @click="openPopup">弹窗信息</button>
		<ai-popup :title="popupInfo.title" ref="popup" @sure="surePopup">
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
			<view>这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</view>
		</ai-popup>
	</view>
</template>

<script>
	import aiTip from '@/components/ai-tip.vue'
	import aiPopup from '@/components/ai-popup.vue'
	export default {
		components: {
			aiTip,aiPopup
		},
		data() {
			return {
				tipInfo:{
					title:"提示11",
					content:"这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。"
				},
				popupInfo:{
					title:"弹窗标题"
				}
			}
		},
		onLoad() {

		},
		methods: {
			sureTip:function(){
				console.log("确定")
				this.tipInfo.visible=false;
			},
			openTip:function(){
				this.$refs['tip'].open();
			},
			surePopup:function(){
				console.log("确定")
				this.$refs['popup'].close();
			},
			openPopup:function(){
				this.$refs['popup'].open();
			}
		}
	}
</script>

<style>
	
</style>
