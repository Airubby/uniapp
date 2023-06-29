<template>
	<view @click="toggle" class="evan-switch" :class="{'evan-switch--disabled':disabled}" 
	:style="{width:2*size+'px',height:switchHeight,borderRadius:size+'px',backgroundColor:currentValue===activeValue?activeColor:inactiveColor}">
		<view class="evan-switch__circle" :style="{width:size+'px',height:size+'px',transform:currentValue===activeValue?`translateX(${size}px)`:`translateX(0)`}"></view>
	</view>
</template>

<script setup lang="ts">
	/**
	 * <custom-switch class="switch-btn" @change="change($event)" v-model="acceptValue" :activeValue="1" :inactiveValue="0" inactiveColor="#FF3C3B" activeColor="#00AB6F" :size="16"></custom-switch>
	 */
	import { reactive, toRefs, ref, computed, onMounted, nextTick, watch } from 'vue'
	const props = defineProps({
		modelValue: {
			type:[String, Boolean, Number],
			default:false
		},
		activeColor: {
			type: String,
			default: '#108ee9'
		},
		inactiveColor: {
			type: String,
			default: '#fff'
		},
		size: {
			type: Number,
			default: 30
		},
		disabled: {
			type: Boolean,
			default: false
		},
		activeValue: {
			type: [String, Number, Boolean],
			default: true
		},
		inactiveValue: {
			type: [String, Number, Boolean],
			default: false
		},
		beforeChange: {
			type: Function,
			default: null
		},
		extraData: null,
		contextLevel: {
			type: Number,
			default: 1
		}
	});
	const emit = defineEmits(["change","update:modelValue"]);
	
	const currentValue=ref<any>(false);
	const switchHeight= computed(()=>{
		// #ifdef APP-NVUE
		return props.size + 2 + 'px'
		// #endif
		// #ifndef APP-NVUE
		return props.size + 'px'
		// #endif
	})
		
	const toggle=()=>{
		if (!props.disabled) {
			if (props.beforeChange && typeof props.beforeChange === 'function') {
				const result = props.beforeChange(currentValue.value === props.activeValue ? props.inactiveValue : props.activeValue, props.extraData)
				if (typeof result === 'object') {
					result.then(() => {
						toggleValue()
					}).catch(() => {})
				} else if (typeof result === 'boolean' && result) {
					toggleValue()
				}
			} else {
				toggleValue()
			}
		}
	}
	
	const toggleValue=()=>{
		currentValue.value = currentValue.value === props.activeValue ? props.inactiveValue : props.activeValue
		emit('update:modelValue', currentValue.value)
		emit('change', currentValue.value)
	}
	
	watch(()=>props.modelValue,(value:any)=>{
		currentValue.value = value
	},{ immediate: true })
	
	defineExpose({
		
	});
</script>
<style lang="less" scoped>
	@charset "UTF-8";
	.evan-switch {
		position: relative;
		border-width: 1px;
		border-color: rgba(0, 0, 0, 0.1);
		border-style: solid;
		transition: background-color 0.3s;
		/* #ifndef APP-NVUE */
		box-sizing: content-box;
		/* #endif */
	}
	
	.evan-switch--disabled {
		opacity: 0.3;
	}
	
	.evan-switch__circle {
		position: absolute;
		left: 0;
		top: 0;
		background-color: #fff;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
		/* #endif */
		/* #ifdef APP-NVUE */
		box-shadow: 1px 0 0px 0 rgba(0, 0, 0, 0.05);
		/* #endif */
		transition: transform 0.3s;
	}
</style>
