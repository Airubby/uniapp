<template name="booleen-x-picker">
	<view  class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']" >
		 <picker class="picker-item" :value="value" :mode="mode" :start="start" :end="end" @change="onChange" @cancel="onCancel" :disabled="disabled">
			<view  class="uni-input" type="text" :prop="prop" :disabled="disabled">
				{{value?value:placeholder}}
			</view>
         </picker>
		 <view class="booleen-x-error" v-if="errorTxt&&errorField==prop">{{errorTxt}}</view>
	</view>
</template>

<script>
	import Mixins from "../mixins.js"
	export default {
		mixins:[Mixins],
		name: "booleen-x-picker",
		props: {
			placeholder:{
				type:String,
				default:()=>{
					return "请选择"
				}
			},
			start: {
				type: String,
				default:()=>{
					return "请选择"
				},
			},
			end: {
				type: String,
				default:()=>{
					return "请选择"
				},
			},
			mode: {
				type: String,
				default:"selector",
			},
			range:{
				type:Array
			},
			"range-key":{
			    type:String,
				default:"text"
			},
			value: {
				type: String
			},
			prop: {
				type: String
			},
			disabled: {
				type: Boolean,
				default: () => {
					return false;
				}
			}
		},
		methods:{
			onCancel(){
				//先该组件应用的父组件传递事件
				this.$emit("cancel",false);
			}
		}
	}
</script>

<style lang="less">
@import url("../style.less");
</style>