<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title">打印信息</text>
			<!-- #ifdef MP-WEIXIN -->
			<view class="show{{''}}" style="position:fixed;">
			  <canvas type="2d" canvas-id="printId" style="width:{{canvasWidth}}px; height:{{canvasHeight}}px;" />
			</view>
			<!-- #endif -->
		</view>
		<view class="caozuo">
			<view class="chongqian" @tap='printData'>
				打印
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, toRefs } from "vue";
	import { onLoad, onReady } from '@dcloudio/uni-app'
	
	// #ifdef MP-WEIXIN
	var lpapi = require('../../utils/LPAPI/LPAPI.js');
	var tempIndex = 0;
	// #endif
	
	const state = reactive({
		title: "打印信息",
		canvasWidth:1,
		canvasHeight:1
	})
	const {canvasWidth, canvasHeight}=toRefs(state)
	
	console.log(lpapi)
	
	//打印
	const printData=()=>{
		// #ifdef MP-WEIXIN
		tempIndex = 3;
		printLabel("文本信息","二维码");
		// #endif
	}
	const printLabel=(content,code)=>{
		
		lpapi.openPrinter('');
		
		const width = 56
		const height = 86
	  
		lpapi.setPrintPageGapType(0);
		lpapi.startDrawLabel('printId', this, width, height, 0);
		//矩形框(左上角水平位置,左上角垂直位置,水平宽度,垂直高度,线宽,是否内部填充)
	    lpapi.drawRectangle(1,2,54,84,1,false);
		lpapi.setItemOrientation(90);
		lpapi.setItemHorizontalAlignment(1); //水平居中
		lpapi.setItemVerticalAlignment(1);  //垂直居中
		// 绘制文本(_,框左上角水平位置,左上角垂直位置,水平宽度默认0,垂直高度默认0,文字大小） 旋转是中心点
		lpapi.drawText(content, 47, 42, 6);
		lpapi.drawText("资产编码", 35, 13, 5);
		lpapi.drawText("资产名称", 25, 13, 5);
		lpapi.drawText("使用部门", 15, 13, 5);
		lpapi.drawText("使用人员", 5, 13, 5);

		lpapi.setItemHorizontalAlignment(0);  //居上  2居下
		lpapi.drawText("MY-7852444DSDF85S8D", 35, 27, 5);
		lpapi.drawText("服务器机柜", 25, 27, 5);
		lpapi.drawText("研发部", 15, 27, 5);
		lpapi.drawText("小呆", 5, 27, 5);

		//绘制线(线起点水平位置，垂直位置，终点水平位置，垂直位置,线宽）
		lpapi.drawLine(40,2,40,85,1);
		lpapi.drawLine(30,2,30,85,1);
		lpapi.drawLine(20,2,20,85,1);
		lpapi.drawLine(10,2,10,65,1);

		lpapi.drawLine(1,25,40,25,1);
		lpapi.drawLine(1,65,20,65,1);


		// 绘制二维码 (_,左上角水平位置,左上角垂直位置,宽度,高度)旋转是中心点
		lpapi.drawQRCode(code, 3, 67, 15,15);

		// 结束绘图任务提交打印
		lpapi.endDrawLabel(function () {
		  lpapi.print(()=> {
			printNextLabel(content,code);
		  })
		})
	}
	const printNextLabel=(content,code)=>{
		tempIndex--;
		if (tempIndex <= 0) {
		  uni.showToast({
			title: '打印成功',
			icon: 'none',
			image: '',
			duration: 2000,
			mask: true,
		  })
		}else{      
		  printLabel(content,code);
		}
	}
	//连接打印机
	const openPrinter=()=>{
		lpapi.openPrinter('', function () {
		  uni.showToast({
			title: '连接打印机成功',
			icon: 'none',
			image: '',
			duration: 2000,
			mask: true,
			success: function (res) { 
			},
			fail: function (res) { },
			complete: function (res) { },
		  })
		}, function () {
		  uni.showToast({
			title: '打印机连接断开',
			icon: 'none',
			image: '',
			duration: 2000,
			mask: true,
			success: function (res) { },
			fail: function (res) { },
			complete: function (res) { },
		  })
		})
	}
	onMounted(() => {

	})
	onLoad(() => {

	})
</script>

<style scoped lang="less">
	.contents {
		width: 100%;
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
		font-size: 16px;
		
	}
	.scan-box{
		padding: 100upx 30upx;
		.title{
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24px;
			text-align: center;
			color: #0599D7;
			margin-bottom: 20upx;
		}
	}
	
	.caozuo {
		display: flex;
		height: 100upx;
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
		font-size: 20px;
	
		view {
			width: 750upx;
			text-align: center;
			height: 100upx;
			line-height: 100upx;
			color: #FFFFFF;
		}
	
		view:active {
			background-color: #CCCCCC;
			color: #333333;
		}
	}
	
	.chongqian {
		background-color: #FF8F58;
	}
</style>
