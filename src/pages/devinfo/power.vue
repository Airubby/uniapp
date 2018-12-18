<template>
	<view class="content">
		<view>
			<view class="topbox">
				<view class="topbox_title"><img src="static/images/ic-sd.png">市电</view>
				<view class="topbox_con content">
					<view>
						<view class="topbox_text">功率</view>
						<view class="echarts" ref="myChart" id="myChart">
							
						</view>
					</view>
					<view>
						<view class="topbox_text">负载</view>
						<view class="echarts" ref="pieChar" id="pieChar"></view>
					</view>
				</view>
			</view>
			<view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		created () {
        
    },
		data() {
			return {
				screenWidth:0,
			}
		},
		onLoad() {

		},
		computed:{
        
    },
		mounted() {
			uni.getSystemInfo({
				success:function(result){
					console.log(result)
					this.screenWidth=result.screenWidth;
				}
			})
			this.drawLine("myChart");
			this.pieChar("pieChar")
		},
		methods: {
			drawLine(ID){
				var value=1.53;
				var all=4;
				var title=""
				var color=color?color:["#00AB6F","#E4E5ED"];
				var myChart = this.$echarts.init(this.$refs[ID].$el);
				var option = {
						title:{
								text:title,  
								bottom: 15,
								x:'center',
								textStyle:{
										color:"#999",
										fontSize:'16'
								},
						},
						series: [
								{
										name: title,
										type: 'gauge',
										radius:'70%',
										min:1,
										max:all,
										splitNumber:0,
										axisLine:{
												lineStyle:{
														color:[[value/all, color[0]],[1, color[1]]],
														width:'10',
												}
										},
										splitLine:{
												show:false
										},
										axisTick:{
												show:false
										},
										axisLabel:{
												show:false
										},
										pointer:{
												length:'75%',
												width:'0.1%'
										},
										itemStyle:{
												normal:{
														color:'transparent'
												}
										},
										detail: {
														show: true,
								textStyle: {
									fontSize: 16,
									color:'#fff',
								},
														formatter: '{value}',
														offsetCenter: ['0%', '0%'],
														

												},
										data: [{value: value}]
								}
						]
				};
				myChart.setOption(option, true);
				return myChart; 
				
			},
			pieChar(ID) {
				var myChart = this.$echarts.init(this.$refs[ID].$el);
				var option = {
						color:["#1c79c2","#234591"],
						grid: {
								top:'20%',
								bottom: '0',
								containLabel: true
						},
						series: [
								{
										type:'pie',
										radius: ['50%', '70%'],
										center: ['50%', '40%'],
										avoidLabelOverlap: false,
										hoverAnimation:false,
										silent:true,
										label: {
												normal: {
														show: true,
														position: 'center',
														formatter:function(){
																return '73%'
														},
														textStyle: {
																fontSize: '16',
																fontWeight: 'bold',
																color:"#fff"
														},
														
												},
										},
										labelLine: {
												normal: {
														show: false
												}
										},
										data:[
												{   
														itemStyle:{
																normal:{
																		color: new this.$echarts.graphic.LinearGradient(
																				0, 0, 0, 1,
																				[
																						{offset: 0, color: '#2b84d6'},
																						{offset: 0.5, color: '#00b2eb'},
																						{offset: 0.99, color: '#00e8e8'}
																				]
																		)
																}
														},
														label:{
																normal:{
																		color:'#fff'
																}
														},
														value:73, 
														name:'使用',
														
												},
												{
														itemStyle:{
																normal:{
																		color:'#234591'
																}
														},
														value:27, 
														name:'剩余'
												},
										]
								}
						]
				};
				myChart.setOption(option, true);
				
				return myChart; 
			},
		}
	}
</script>

<style>
	.echarts{
		width: 100%;
		height: 250upx;
	}
</style>
