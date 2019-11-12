<template>
	<uni-popup :type="'center'" :mask-click="true" @change="change" ref="popup">
		<view class="uni-tip-title">{{title}}</view>
		<view class="uni-tip-content">
			<slot></slot>
		</view>
		<view class="uni-tip-group-button">
			<view class="uni-tip-button" @click="close()">取消</view>
			<view class="uni-tip-button" @click="sure()">确定</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
        props: {
            title: {
				type: String,
				default: "提示"
            },
            visible:{
                type: Boolean,
                default: false,
            }
        },
		data() {
			return {
				
			}
		},
		methods: {
			change:function(e){
                console.log(e)
            },
			sure:function(){
                this.$emit("sure");
			},
			open:function(){
				this.$refs['popup'].open();
			},
			close:function(){
				this.$refs['popup'].close();
			}
		},
	}
</script>

<style>
	.uni-tip {
		padding: 15px;
		width: 100%;
		height: 100%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		max-height: 80%;
		padding: 15px;
		font-size: 14px;
		color: #666;
		text-align: left;
	}

	.uni-tip-group-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-tip-button {
		width: 50%;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
</style>
