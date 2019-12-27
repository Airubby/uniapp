<template>
	<view>
		单选按钮组
		<ai-radio-group :items="items" v-model="current" :params="params"></ai-radio-group>
		复选按钮组
		<ai-checkbox-group :items="items" v-model="checkbox_current" :params="params"></ai-checkbox-group>
		<ai-form :rules="rules" :model="form" ref="ruleForm" @submit="customerSubmit" :toast="false">
		
			<ai-input type="text" v-model="form.input" placeholder="我第二个校验" prop="input"></ai-input>
			<ai-input type="text" v-model="form.input2" placeholder="我先校验" prop="input2"></ai-input>
			<ai-textarea v-model="form.input3" prop="input3"></ai-textarea>
			<picker mode="selector" :range-key="'text'"  :range="arrays" :value="'id'" @change="test">
				<view>{{arrays[index]['text']}}</view>
			</picker>
			<button @tap="customerSubmit">不使用Submit提交</button>
			<!-- <button formType="submit">使用Submit</button> -->
		</ai-form>
	</view>
</template>

<script>
	import aiRadioGroup from '@/components/ai-ui/ai-radio-group/index.vue'
	import aiCheckboxGroup from '@/components/ai-ui/ai-checkbox-group/index.vue'
	import {aiForm,aiInput,aiTextarea,aiPicker} from '@/components/ai-form-group/index.js'
	export default {
		components: {aiRadioGroup,aiCheckboxGroup,aiForm,aiInput,aiTextarea,aiPicker},
		data() {
			return {
				current:1,
				checkbox_current:[1],
				items: [{
						id: 1,
						name: '美国'
					},{
						id: 2,
						name: '中国',
					}
				],
				params:{
					label: 'name',
					value: 'id',
				},
				arrays: [{
						id: 'USA',
						text: '美国'
					},{
						id: 'CHN',
						text: '中国'
					},
					{
						id: 'JP',
						text: '日本'
					}
				],
				index:0,
				form:{
					input:"",
					input2:"",
					input3:"",
					input4:""
				},
				rules:{
					input: [{
						required: true,
						message: '请输入txt',
                        trigger: 'change',
                        sort:3,
					}],
					input2: [{
						required: true,
						message: '请输入input2',
                        trigger: 'blur',
                        sort:2
					}],
					input3: [{
						required: true,
						message: '请输入input3',
                        trigger: 'blur',
					}],
					input4: [{
						required: true,
						message: '请输入input4',
                        trigger: 'change',
					}]
				},
			}
		},
		onLoad() {

		},
		methods: {
			customerSubmit:function(){
				console.log(123213)
				this.$refs['ruleForm'].validate((valid,result) => {
					console.log(result)
					console.log(valid)
					if (valid) {

					}
				});
			},
			test(e){
				console.log(this.userlist[e.detail.value].id);
			}
		},
		watch:{
			checkbox_current:function(val){
				console.log(val)
			}
		}
	}
</script>

<style>
	
</style>
