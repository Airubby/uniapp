<template>
	<view>
		单选按钮组
		<radio-group-btn :items="items" v-model="current"></radio-group-btn>
		复选按钮组
		<checkbox-group-btn :items="items" v-model="checkbox_current"></checkbox-group-btn>
	</view>
</template>

<script>
	import radioGroupBtn from '@/components/radio-group-btn/index.vue'
	import checkboxGroupBtn from '@/components/checkbox-group-btn/index.vue'
	export default {
		components: {radioGroupBtn,checkboxGroupBtn},
		data() {
			return {
				current:"USA",
				checkbox_current:["USA"],
				items: [{
						value: 'USA',
						name: '美国'
					},{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			
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
