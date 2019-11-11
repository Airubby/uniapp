<template name="ai-form">
	<form @submit="onSubmit" @reset="onReset">
		<slot @change="change"></slot>
	</form>
</template>

<script>
let schema = require('async-validator').default;
import Event from "../watch.js"
	export default {
		name: "ai-form",
		data() {
			return {
				validKey: "",
				validVal: "",
				copyRules: {},
				SortRulesArray:[],//排序后的规则
			};
		},
		props: {
			rules: {
				required: false,
				type: Object
			},
			model: {
				type: Object,
				required: false,
				default: () => {
					return {};
				}
			},
			toast:{
				required:false,
				default:false
			},
			errorClass:{
				type:String,
				default:""
			},
			successClass:{
				type:String,
				default:""
			}
		},
		created() {
			Event.$on("change", (val) => {
				this.onChange(val);
			});
			Event.$on("blur", (val) => {
				this.onBlur(val);
			});
			//需要排序规则
			if(this.toast){
				this.SortRulesArray=this.sortRules();
			}
			else{
				//监听数据改变
				this.watchModel();
			}
		},
		watch:{
			rules(){
				//新增或者减少规则的时候，排序规则
				if(this.toast){
				  this.SortRulesArray=this.sortRules();
		     	}
			}
		},
		methods: {
			watchModel(){
				for (let [key, value] of Object.entries(this.model)) {
					 this.$watch("model."+key,(newV,oldV)=>{
						 Event.$emit("change", {
						 	val: newV,
						 	prop: key
						 });
					 },{
						 immediate:false//刚绑定的时候不触发
					 })
				 }
			},
			onSubmit() {
				this.validate();
				this.$emit("submit")
			},
			onReset() {
				Event.$emit("reset");
				this.resetFields();
			},
			onChange(data) {
				if(!this.rules[data.prop]){
					return;
				}
				let filterArray = this.rules[data.prop].filter((item) => {
					return String(item.trigger).trim().toLowerCase() === 'change' || !item.trigger;
				});
				this.beforeValid(data.prop, data.val, filterArray);
			},
			onBlur(data) {
				if(!this.rules[data.prop]){
					return;
				}
				let filterArray = this.rules[data.prop].filter((item) => {
					return String(item.trigger).trim().toLowerCase() === 'blur';
				});
				this.beforeValid(data.prop, data.val, filterArray);
			},
			/*
				验证当个表单,可以通过当前form组件调用
				prop {string} 对应表单的prop和rules的prop
				func {function} 回调函数或者字符串
			*/
			async validateField(prop,func){
				 let t=await this.beforeValid(prop,this.model[prop]);
				 if(typeof func=="function"){
					 func(t.pass,t.result);
				 }
				 else{
					 return t;
				 }
			},
			/*
				验证from下的所有表单，,可以通过当前form组件调用
				func  {function} 回调函数
			*/
			async validate(func) {
				let pass = true;
				let promiseArray = [];
				//是否按照顺序只校验排在最前未通过的表单,并且不高亮表单
				let toastPass=true;
				let toastEnd={};
				if(this.toast){
					 for(let i=0;i<this.SortRulesArray.length;i++){
						  toastEnd=await this.validateField(this.SortRulesArray[i].prop);
						 if(!toastEnd.pass){
							 toastPass=false;
							 break;
						 }
					 }
					 //不管是否全部通过都必须回调
					if (typeof func == "function") {
						func(toastEnd.pass,toastEnd.result);
					}
					 return;
				};
				//讲每个表单的校验放到promise里面
				for (let k of Object.keys(this.rules)) {
					let t = this.rules[k];
					if (t && Array.isArray(t)) {
						promiseArray.push(this.beforeValid(k, this.model[k]));
					}
				};
				//封装所有promise，到all里面等待所有结果
				const pAll = await Promise.all(promiseArray);
				let endArray = pAll.filter(item => !item.pass);
				if (endArray.length) {
					pass = false;
				} else {
					pass = true;
				}
				if (typeof func == "function") {
					func(pass);
				}
			},
			//排序规则，如果form携带toast同时规则第一条规则好吧order
			//返回的是一个排序的数组
			sortRules(){
				let t={...this.rules};
				for(let v in t){
					if(t[v][0]&&!t[v][0]){
						let arr=[...t[v][0]];
						arr.sort=0;
						t[v]=arr;
					}
					else if(isNaN(Number(t[v][0].sort))){
						console.warn("规则排序的sort应是一个有效的number")
					}
				}
				//排序规则
				 function sortId(a,b){ 
					 if(!a[0]||!b[0]){
						 console.warn("校验规则要求是个数组")
					 } 
					return a[0].sort-b[0].sort;  
				};

				let arrs=[];
				for (let k of Object.keys(t)) {
					t[k].prop=k;
					arrs.push(t[k]);
				};

				arrs.sort(sortId);
				return arrs;

			},
			/*
			清空form下的所有表单，可以同from组件调用
				prop {string} 对应表单标签的prop以及rules的key
			*/
			resetFields(prop) {
				//清空单一表单状态
				if (prop) {
					Event.$emit("valid", {
						p: true,
						prop: prop,
						reset:true
					});
					return;
				}
				//清空所有表单状态
				for (let k of Object.keys(this.rules)) {
					Event.$emit("valid", {
						p: true,
						prop: k,
						reset:true
					});
				};
				
			},
			/*
			  validator {object} validator
			  prop {string} prop
			  val {string} val
			*/
			valid(validator, prop, val) {
				return new Promise((reslove, reject) => {
					validator.validate({
						[prop]: val
					}, (errors, fields) => {
						console.log("errors",errors,fields)
						if (errors) {

							reslove({
								p: false,
								error: errors,
								fields: fields,
								prop: prop,
								errorClass:this.errorClass,
							});
						} else {
							reslove({
								p: true,
								prop: prop,
								successClass:this.successClass
							});
						}
					});
				})

			},
			/*
				prop {string} 对应表单的prop和rules的Key
				val {string} 对应表单的值
				rules {Array} 响应触发方式匹配到的规则
			*/
			async beforeValid(prop, val, rules) {
				if (!(this.rules[prop])) {
					return true;
				};
				let pass = true;
				//匹配到的规则数组
				let matchRules = Array.isArray(rules) ? rules : this.rules[prop];
				//没通过的规则以及提示
				let result;
				for (let i = 0; i < matchRules.length; i++) {
					let descriptor={};
					if(matchRules[i]&&!matchRules[i].validator){
						//非自定义规则
						descriptor = {
							[prop]: matchRules[i]
						}
					}
					else{
						//自定义规则
						if(typeof matchRules[i].validator!="function"){
							console.error(`${prop}的自定义校验规则validator不是一个有效函数`)
							break;
						}
						descriptor = {
							[prop]:matchRules[i].validator
						}
					}
					let validator = new schema(descriptor);
					result = await this.valid(validator, prop, val);
					//console.log("result:",result)
					//非toast类型的才通知表单
					if(!this.toast){
                        Event.$emit("valid", { ...result
					   });
					}
					//某表单只要有其中一个规则不过就终止循环
					if (!result.p) {
						pass = false;
						break;
					}
					

				}
				return Promise.resolve({pass:pass,"result":result});

			}
			
		}
	}
</script>

