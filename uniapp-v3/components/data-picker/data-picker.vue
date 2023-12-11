<template>
	<picker class="picker" :style="{'justify-content':textAlign}" @change="changeClick" @cancel="cancelClick" :value="index" :range="data" :range-key="keyName">
		<slot></slot>
	</picker>
</template>

<script setup lang="ts">
	/**
	 * <data-picker @change="locationChange" textAlign="right" :index="locationIndex" :data="locationList">
			<view class="list-con">{{initParams.location}}</view>
		</data-picker>
	 */
	// import { reactive, toRefs, ref, computed, onMounted, nextTick, watch } from 'vue'
	const props = defineProps({
		// 当前index
		index: {
			type: [Number, String],
			default: 0
		},
		//Array＜Object＞时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容	
		keyName:{
			type:String,
			default:""
		},
		disabled:{
			type: Boolean,
			default: false
		},
		// 数据源
		data: {
			type: Array,
			default: ()=> {
				return [];
			}
		},
		textAlign:{
			type:String,
			default: "left"
		},
	})
	const emit = defineEmits(["change","cancel"]);
	
	const changeClick=(e) =>{
		emit("change", {index:e.detail.value,value:props.data[e.detail.value]});
	}
	const cancelClick=()=>{
		emit("cancel")
	}
</script>

<style scoped>
	.picker {
		margin: 0px;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>