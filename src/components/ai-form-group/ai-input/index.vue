<template name="booleen-x-input">
	<view class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']" v-bind:style="xstyle" v-if="type==='text'">
		<input :value="value" :placeholder="placeholder" :placeholder-style="placeholderStyle" @input="onChange" @blur='onBlur' :disabled="disabled" />
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
	<view  class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']" v-bind:style="xstyle" v-else-if="type==='password'">
		<input :value="value" :placeholder="placeholder" :placeholder-style="placeholderStyle" password @input="onChange" @blur='onBlur' :disabled="disabled" />
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
    <view  class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']" v-bind:style="xstyle" v-else-if="type==='number'">
		<input :value="value" :placeholder="placeholder" :placeholder-style="placeholderStyle" type="number" @input="onChange" @blur='onBlur' :disabled="disabled" />
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
     <view  class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']" v-bind:style="xstyle" v-else-if="type==='digit'">
		<input :value="value" :placeholder="placeholder" :placeholder-style="placeholderStyle" type="digit" @input="onChange" @blur='onBlur' :disabled="disabled" />
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
	  <view  class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']" v-bind:style="xstyle" v-else-if="type==='idcard'">
		<input :value="value" :placeholder="placeholder" :placeholder-style="placeholderStyle"  type="idcard" @input="onChange" @blur='onBlur' :disabled="disabled" />
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>
    <view  class="booleen-x-input" :class="[errorClassName,disabledClassName,successClassName,disabled?'booleen-x-input-disabled':'']" v-bind:style="xstyle" v-else>
		<input :value="value" :placeholder="placeholder" :placeholder-style="placeholderStyle" @input="onChange" @blur='onBlur' :disabled="disabled" />
		<errorTip :errorTxtClassName="errorTxtClassName" v-if="errorTxt&&errorField==prop" :errorTxt="errorTxt"></errorTip>
	</view>

</template>
<script>
	import Mixins from "../mixins.js"
	import errorTip from "../errorTip/index.vue"
	export default {
		mixins: [Mixins],
		components:{errorTip},
		name: "booleen-x-input",
		props: {
			type: {
				type: String,
				required:false
			},
			"placeholderStyle":{
               type: String
			}
		},
		created(){
			console.log("this.xstyle",this.xstyle)
		}
	}
</script>
<style lang="less">
@import url("../style.less");
</style>