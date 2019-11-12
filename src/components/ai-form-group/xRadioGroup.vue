<template >
	<view class="booleen-x-input booleen-x-error-input-no-border" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']">
		<radio-group @change="onChange">
			<slot></slot>
		</radio-group>
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
</template>

<script>
	import Mixins from "./mixins.js"
	import Event from "./watch.js"
	export default {
		mixins:[Mixins],
		name: "x-radio-group",//这个name很重要不能喝现有uniapp的冲突,否者会死循环
		props: {
			value: {
				type: [String, Number],
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
			onChange(e) {
				if(!e.detail){
					return;
				}
				this.inputValue = e.detail.value;
	
				let _this = this;
				Event.$emit("change", {
					val: _this.inputValue,
					prop: this.prop
				})
				this.$emit('update:value',_this.inputValue)
			},
		}
	}
</script>

<style lang="less">
@import url("./style.less");
</style>