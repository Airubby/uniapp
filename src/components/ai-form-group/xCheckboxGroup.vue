<template name="x-checkbox-group">
	<view class="booleen-x-input booleen-x-error-input-no-border" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']">
		<checkbox-group @change="onChange" :disabled="disabled">
			<slot></slot>
		</checkbox-group>
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
</template>

<script>
import Mixins from './mixins.js';
import Event from "./watch.js"
export default {
	mixins: [Mixins],
	name: 'x-checkbox-group',
	props: {
		value: {
			type: Array,
			 required:true
		},
// 		prop: {
// 			type: String,
// 			required:true
// 		},
		disabled: {
			type: Boolean,
			default: () => {
				return false;
			}
		}
	},
	created() {
	},
	methods: {
		onChange(e) {
			if (!e.detail) {
				return;
			}
		    this.inputValue = e.detail.value;
			//this.value=e.detail.value;
		//	this.$emit('update:value', e.detail.value)
			let _this = this;
			Event.$emit('change', {
				val: _this.inputValue,
				prop: this.prop
			});
			 //更新绑定的值
			this.$emit('update:value',_this.inputValue)
		}
	}
};
</script>

<style lang="less">
@import url('./style.less');
</style>
