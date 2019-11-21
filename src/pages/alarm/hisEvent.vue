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
		<view class="example-title">默认样式</view>
		<view class="example-body">
			<uni-pagination :total="50" title="标题文字" />
		</view>
		<view class="example-title">修改按钮文字</view>
		<view class="example-body">
			<uni-pagination :total="50" title="标题文字" prev-text="前一页" next-text="后一页" />
		</view>
		<view class="example-title">图标样式</view>
		<view class="example-body">
			<uni-pagination :show-icon="true" :total="50" title="标题文字" />
		</view>
		<view class="example-title">修改数据长度</view>
		<view class="example-body">
			<uni-pagination :current="current" :total="total" title="标题文字" show-icon="true" @change="change" />
		</view>
		<view class="btn-view">
			<view>
				当前页：{{ current }}，数据总量：{{ total }}条，每页数据：{{ pageSize }}
			</view>
			<button type="primary" @click="add">增加10条数据</button>
			<button type="default" @click="reset">重置数据</button>
		</view>
	</view>
</template>

<script>
	import aiTip from '@/components/ai-tip.vue'
	import aiPopup from '@/components/ai-popup.vue'
	import uniPagination from '@/components/uni-ui/uni-pagination/uni-pagination.vue'
	export default {
		components: {
			aiTip,aiPopup,uniPagination
		},
		data() {
			return {
				tipInfo:{
					title:"提示11",
					content:"这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。"
				},
				popupInfo:{
					title:"弹窗标题"
				},

				current: 1,
				total: 0,
				pageSize: 10,
				
				active: 1,
				list1: [{
					title: '事件一'
				}, {
					title: '事件二'
				}, {
					title: '事件三'
				}, {
					title: '事件四'
				}],
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
