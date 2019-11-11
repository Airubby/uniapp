<template name="booleen-x-textarea">
	<view class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']">
		<textarea :placeholder="placeholder" style="width: 100%;" :value="value" @input="onChange" @blur='onBlur' :disabled="disabled" />
		<view class="boolean-x-error-tip" :class="[errorTxtClassName] ">{{errorTxt}}</view>
	</view>
</template>
<script>
	import Mixins from "../mixins.js"
	export default {
		mixins: [Mixins],
		name: "booleen-x-textarea",
		props: {
			value: {
				type: [String, Number],
			},
			prop: {
				type: String
			},
			placeholder: {
				type: String,
				default: "请输入"
			},
			disabled: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			"adjust-position":{
				type: Boolean,
				default: () => {
					return false;
				}
			},
			"selection-end":{
				type: [String,Number],
				default: () => {
					return -1;
				}
			},
			"selection-start":{
				type: [String,Number],
				default: () => {
					return -1;
				}
			},
			"show-confirm-bar":{
				type: Boolean,
				default: () => {
					return true;
				}
			},
			"cursor":{
				type: Number
			},
			"cursor-spacing":{
				type: Number,
				default: () => {
					return 0;
				}
			},
			"fixed":{
				type: Boolean,
				default: () => {
					return false;
				}
			},
			"auto-height":{
				type: Boolean,
				default: () => {
					return false;
				}
			},
			"focus":{
				type: Boolean,
				default: () => {
					return false;
				}
			},
			"maxlength":{
				type: Number,
				default: () => {
					return 140;
				}
			},
			"placeholder-class":{
				type:String
			},
			"placeholder-style":{
				type:String
			}
		}
	}
</script>
<style lang="less">
@import url("../style.less");
</style>
