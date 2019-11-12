<template name="booleen-x-checkbox">
	<label class="booleen-x-input" :class="[disabled?'booleen-x-input-disabled':'']">
	 <checkbox :value="value" :checked="checked" :disabled="disabled" color="color" /><text class="booleen-x-input-label">{{label}}</text>
	</label>
</template>

<script>
	export default {
		name:"booleen-x-checkbox",
		props:{
			checked:{
				required: false,
				type:[Boolean],
				default:()=>{
					return false;
				}
			},
			value: {
				required: false,
				type: [String, Number]
			},
			disabled: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			color:{
				type:String
			},
			label:{
				type:[String,Number],
				default:()=>{
					return ";"
				}
			}
		}
	}
</script>

<style lang="less">
@import url("./style.less");
</style>