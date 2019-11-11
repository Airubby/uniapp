import Event from "./watch.js"
import errorTip from "./errorTip/index"
export default {
	components:{errorTip},
	data() {
		return {
			inputValue: "",
			errorTxt: "",
			errorField: "",
			isSuccess:"",
			validProp:"",//form提供的校验prop的属性
			errClass:"",//错误class
			succClass:""//成功class
		}
	},
	props:{
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
		errorClass:{
			type:String,
			default:""
		},
		successClass:{
			type:String,
			default:""
		},
		//app和小程序不支持全局修改封装好的组件的样式
		xstyle:{
			type:Object,
			default(){
				return {}
			}
		}
		
	},
	computed:{
		errorClassName(){
			let t=!this.isSuccess&&this.errorField==this.prop?(this.errClass?this.errClass:'booleen-x-error-input'):'';
		
			return t;
		},
		errorTxtClassName(){
			return this.errClass?this.errClass:'booleen-x-error';
		},
		disabledClassName(){
			return this.disabled?'booleen-x-input-disabled':'';
		},
		successClassName(){
			return this.validProp==this.prop&&this.isSuccess&&this.succClass?this.succClass:"";
		}
	},
	created() {
		//同步错误和成功class
 		this.errorClass?(this.errClass=this.errorClass):"";
 		this.successClass?(this.succClass=this.successClass):"";
		//校验
 		Event.$on("valid", (data) => {
			console.log("valid=====",data)
 			this.snycClass(data);
			if(data.reset){
				this.isSuccess="";
				this.errorTxt = "";
				this.errorField = "";
				return;
			}
 			if(data.prop!==this.prop){
 				return;
			} 			
			let t = data.error;
 			if (data.p) {
 				this.errorTxt = '';
 				this.isSuccess=true;
 				return;
 			}
 			if (!t) {
 				return;
 			}
 			if (t[0] && this.prop !== t[0].field) {
 				return;
 			}
 			if (t && t[0]) {
 				this.errorTxt = t[0].message;
 				this.errorField = t[0].field;
 				this.isSuccess=false;
 			}
 		});

		//重置
 		Event.$on("reset", (e) => {
 			this.inputValue="";
 			this.isSuccess="";
			this.errorTxt = "";
			this.errorField = "";
 			//不需要通知Form
 			//通知本组件
 			//this.$emit("input",this.inputValue)
			 //更新绑定的值,
			this.$emit('update:value',this.inputValue)
 		});

	},
	methods: {
		snycClass(data){
			//修改错误或者正常的class
			this.validProp=data.prop;
			if(!this.errClass&&data.errorClass){
				this.errClass=data.errorClass;
			}
			if(!this.succClass&&data.successClass){
				this.succClass=data.successClass;
			};
		},
		onChange(e) {
			if(!e.detail){
				return;
			}
			this.inputValue = e.detail.value;
			Event.$emit("change", {
				val: this.inputValue,
				prop: this.prop
			})
			//通知本组件
			this.$emit("input",this.inputValue)
		},
		onBlur(e) {
			if(!e.detail){
				return;
			}
			this.inputValue = e.detail.value;
			Event.$emit("blur", {
				val: this.inputValue,
				prop: this.prop
			});
		}
		
	}
};
