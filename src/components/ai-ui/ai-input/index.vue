<template>
    <view class="input-area">
		<textarea class="area" :focus="focus_"  :value="inputValue" @input="onInput" :placeholder="placeholder" :disabled="disabled" 
		:maxlength="maxlength"  :placeholder-style="placeholderStyle" @focus="onFocus" @blur="onBlur" 
		:auto-height="autoHeight" v-if="type==='textarea'" />
        <input class="input" :focus="focus_" :type="inputType" :value="inputValue" @input="onInput" :placeholder="placeholder" :disabled="disabled" 
		:maxlength="maxlength"  :placeholder-style="placeholderStyle"
		 :password="type==='password'&&!showPassword" @focus="onFocus" @blur="onBlur" v-else />
    </view>
</template>
<style lang="less" scoped>
    .input-area{
        margin-bottom: 15px;
        border: 1px solid #DCDFE6;
        display: flex;
        justify-content: space-between;
		border-radius: 5px;
		width: 100%;
		box-sizing: border-box;
		font-size: 14px;
		.input{
			height: 30px;
			line-height: 30px;
			padding: 5px 10px;
		}
		.area{
			padding: 5px 10px;
			min-height: 80px;
			width: 100%;
		}
    }
</style>
<script>
	export default {
		components: {
			
		},
		props: {
			//输入类型,只支持text,password,textarea,
			type: {
				type:String,
				default:'text'  
			},
			//值
			value: {
				type: [String,Number],
				default: ""
			},
			//是否禁用
			disabled:{
				type: Boolean,
				default:false, 
			},
			//最大输入长度，-1表示不限制长度
			maxlength:{
				type:Number,
				default:-1
			},
			//占位符
            placeholder: String,
            // 占位符样式
            placeholderStyle:{
				type:String,
				default:"color:#999;"
			},
			//是否显示密码可见
			showPassword: {
				type: Boolean,
				default: false
			},
			//textarea时，是否自动增高；
			autoHeight:{
				type:Boolean,
				default:false,
			},
			//自动获取焦点
			focus: {
				type: [Boolean, String],
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {
				/**
				 * 是否获取焦点
				 */
				isFocus: false
			}
		},
		computed: {
			inputType() {
				const type = this.type;
				return type === 'password'||type==='textarea' ? 'text' : type
			},
			inputValue(){
				const value=this.value;
				return value===null?"":value;
				
			},
			focus_() {
				return String(this.focus) !== 'false'
			}
		},
		methods: {
			onFocus() {
				this.isFocus = true
			},
			onBlur() {
				this.$nextTick(() => {
					this.isFocus = false
				})
			},
			onInput(e) {
				this.$emit('input', e.target.value)
			}
		}
	}
</script>
