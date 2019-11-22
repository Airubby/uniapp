<template>
	<view>
		<view>日期选择 - 示例</view>
            {{date}}
            <button type="primary" @click="onShowDatePicker('date')">选择日期</button>
            {{time}}
            <button type="primary" @click="onShowDatePicker('time')">选择时间</button>
            {{datetime}}
            <button type="primary" @click="onShowDatePicker('datetime')">选择日期时间</button>
            {{range[0]}} - {{range[1]}}
            <button type="primary" @click="onShowDatePicker('range')">选择日期范围</button>
            {{rangetime[0]}} - {{rangetime[1]}}
            <button type="primary" @click="onShowDatePicker('rangetime')">选择日期时间范围</button>
		<ai-date-picker 
		:show="dateInfo.showPicker" 
		:type="dateInfo.type" 
		:value="dateInfo.value" 
		:show-tips="true" 
		:begin-text="'入住'" 
		:end-text="'离店'" 
		:show-seconds="true" 
		@confirm="onSelected" 
		@cancel="onSelected" />
		<view style="margin-top: 15px;">自定义base64字体图标使用</view>
		<ai-icons color="#0099cc" type="check" size="36"></ai-icons>
		<ai-steps activeColor="#ff0000" :options="list1" :active="active" @stepClick="stepClick"></ai-steps>
	</view>
</template>

<script>
	import aiDatePicker from '@/components/ai-ui/ai-date-picker/index.vue' 
	import aiIcons from "@/components/ai-ui/ai-icons/index.vue"
	import aiSteps from '@/components/ai-ui/ai-steps/index.vue'
	export default {
		components:{aiDatePicker,aiIcons,aiSteps},
		data() {
            return {
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '2019/01/01 15:00:12',
				range: ['2019/01/01','2019/01/06'],
				rangetime: ['2019/01/08 14:00','2019/01/16 13:59'],
				dateInfo:{
					showPicker: false,
					type: 'rangetime',
					value: ''
				},
				active:1,
				list1: [{
					title: '事件一'
				}, {
					title: '事件二'
				}, {
					title: '事件3'
				}],
            }
        },
		methods:{
			onShowDatePicker(type){//显示
                this.dateInfo.type = type;
                this.dateInfo.showPicker = true;
                this.dateInfo.value = this[type];
            },
            onSelected(e) {//选择
                this.dateInfo.showPicker = false;
                if(e) {
                    this[this.dateInfo.type] = e.value; 
                    //选择的值
                    console.log('value => '+ e.value);
                    //原始的Date对象
                    console.log('date => ' + e.date);
                }
			},
			stepClick:function(item){
				this.active=item.index;
			}
		}
	}
</script>

<style>
	.image{
		width: 40px;
		height: 40px;
	}
	
</style>
