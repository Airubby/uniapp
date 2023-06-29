<template>
	<view class="dropdown" :style="{padding: `0 ${paddingWidth}`}">
		<view class="dropdown-con">
			<view class="dropdown-item" @tap.stop="itemClick()">
				<view class="item-text">
					<view class="text">{{showitem}}</view>
				</view>
				<image class="image" :src="arrBase64" :style="{'transform': show? 'rotate(180deg)':'rotate(0)'}"></image>
			</view>
			<view class="dropdown-box" :style="{backgroundColor:bgcolor,display:show?'block':'none',width:dropWidth?dropWidth:'auto',left:`-${paddingWidth}`}">
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="box-item" v-for="(item,index) in data" :key="index" @tap.stop="subItemClick(item)" 
					:style="{color:modelValue==item[key]?activeColor:color}">
						{{item[tag]}}
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="bg-mask" :class="[show?'bg-mask-show':'']" @tap="maskClose" @touchmove="maskClose"></view>
	</view>
</template>

<script setup lang="ts">
	/**
	 * <dropdown dropWidth="120px" :data="dropList" v-model="selectValue" @change="changeDrop" paddingWidth="15px"></dropdown>
	 */
	import { reactive, toRefs, ref, computed, onMounted, nextTick, watch } from 'vue'
	const props = defineProps({
		modelValue: [String, Boolean, Number],
		key:{
			type:String,
			default:"value"
		},
		// 需要展示的字段，比如你的数据是item.name 这里填的就是name
		tag: {
			type: String,
			default: 'label'
		},
		//背景颜色
		bgcolor: {
			type: String,
			default: '#fff'
		},
		//下拉文字颜色
		color:{
			type: String,
			default: '#000'
		},
		// 当前文字活跃颜色
		activeColor: {
			type: String,
			default: '#0377fc'
		},
		//左右padding宽度
		paddingWidth:{
			type:String,
			default:"12px"
		},
		//下拉框的宽度
		dropWidth:{
			type:String,
			default:""
		},
		data:{
			type: Array,
			default: () => {
				return [
					{ label: '全部', value: "0" },
				]
			}
		}
	});
	const emit = defineEmits(["change","update:modelValue"]);
	
	const arrBase64 = ref < string > ("data:image/png;base64,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")
	const showitem=ref("")
	const show=ref(false)
	
	const showName=(key)=>{
		for(let item of props.data){
			if(item[props.key]==key){
				showitem.value=item[props.tag]
				break;
			}
		}
	}
	
	const itemClick=()=>{
		show.value=!show.value
	}
	const subItemClick=(item)=>{
		show.value=false
		emit("update:modelValue", item[props.key]);
		showitem.value=item[props.tag]
		emit("change",item)
	}
	
	const maskClose=()=>{
		show.value=false
	}
	
	if(props.modelValue!=undefined&&props.modelValue!=""&&props.modelValue!=null){
		showName(props.modelValue)
	}
	
	defineExpose({
		
	});
</script>
<style lang="less" scoped>
	@charset "UTF-8";
	.dropdown{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		.dropdown-con{
			position: relative;
			width: 100%;
			height: 100%;
			z-index: 99;
		}
		.dropdown-item{
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.item-text{
				width: 100%;
				overflow: hidden;
				display: flex;
				.text{
					flex-shrink: 0;
				}
			}
			.image {
				width: 24rpx;
				height: 24rpx;
				display: block;
				margin-left: 12rpx;
				transition: all .3s;
				flex-shrink: 0;
			}
		}
		.dropdown-box{
			position: absolute;
			border: 1px solid #dcdcdc;
			padding: 8px;
			border-radius: 5px;
			background: #fff;
			.box-item{
				padding: 5px;
				cursor: pointer;
			}
		}
		.bg-mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 98;
			transition: all 0.3s ease-in-out;
			opacity: 0;
			visibility: hidden;
		}
		
		.bg-mask-show {
			visibility: visible;
		}
	}
</style>
