<template name="booleen-x-picker">
	<view  class="booleen-x-input booleen-form-item" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'',xclass]" >
			<slot></slot>
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
</template>

<script>
//改组件扮演xForm和xInput的中间角色
	import Mixins from "./mixins.js"
	import Event from "./watch.js"
	export default {
		mixins:[Mixins],
		name: "booleen-x-form-item",
		props: {
			prop: {
				type: String,
				required:true
			},
			xclass:{
				type:String
			},
			watch:{
				type:[String,Number],
				required:true
			}
		},
// 		watch:{
// 			"watch"(newV,oldV){
// 				console.log("newV:",newV)
// 				this.onChange(newV);
// 			}
// 		},
		created(){
		},
		methods:{
			onCancel(){
				//先该组件应用的父组件传递事件
				this.$emit("cancel",false);
			},
			onChange(val) {
				Event.$emit("change", {
					val: val,
					prop: this.prop
				})
			}
		}
	}
</script>

<style lang="less">
@import url("./style.less");
</style>