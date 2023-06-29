<template>
	<view class='contents'>
		<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)'
			@touchend='end' @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
		</canvas>
		<view class="caozuo">
			<view class="chongqian" @tap='clearClick'>
				重签
			</view>
			<view class="over" @tap="overSign">
				完成签名
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		reactive
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app'

	let content = null;
	let touchs = [];
	let canvasw = 0;
	let canvash = 0;
	let signImage = '';
	let isEnd = false // 是否签名

	const overSign = () => {
		if (isEnd) {
			uni.canvasToTempFilePath({
				canvasId: 'firstCanvas',

				success: function(res) {
					//打印图片路径
					console.log(res.tempFilePath)
					console.log('完成签名')
					//设置图片
					signImage = res.tempFilePath
					uni.showToast({
						title: "提交成功",
						icon: "none",
						duration: 1500,
						mask: true
					})
					//tempFilePath是临时路径，_doc/uniapp_temp_1673009888663/canvas/16730099775860.png 
					//如果需要文件保存到本地
					uni.saveFile({
						tempFilePath: res.tempFilePath, //临时路径
						success: function(res) {
							console.log(res);
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '文件已保存：' + res.savedFilePath, //保存路径
								duration: 3000
							});
							setTimeout(() => {
								//打开文档查看
								uni.openDocument({
									filePath: res.savedFilePath,
									success: function(res) {
										console.log('打开文档成功');
									},
									fail: function() {
										console.log('打开失败');
									}
								});
							}, 3000);
						},
						fail: function() {
							console.log('保存失败');
						}
					});
				}
			})
		} else {
			uni.showToast({
				title: '请先完成签名',
				icon: "none",
				duration: 1500,
				mask: true
			})
		}
	}
	// 画布的触摸移动开始手势响应
	const start = (event) => {
		// console.log(event)
		console.log("触摸开始" + event.changedTouches[0].x)
		console.log("触摸开始" + event.changedTouches[0].y)
		//获取触摸开始的 x,y
		let point = {
			x: event.changedTouches[0].x,
			y: event.changedTouches[0].y
		}
		// console.log(point)
		touchs.push(point);
	}
	// 画布的触摸移动手势响应
	const move = (e) => {
		let point = {
			x: e.touches[0].x,
			y: e.touches[0].y
		}
		// console.log(point)
		touchs.push(point)
		if (touchs.length >= 2) {
			draw(touchs)
		}
	}
	// 画布的触摸移动结束手势响应
	const end = (e) => {
		console.log("触摸结束" + e)
		// 设置为已经签名
		isEnd = true
		// 清空轨迹数组
		for (let i = 0; i < touchs.length; i++) {
			touchs.pop()
		}
	}
	// 画布的触摸取消响应
	const cancel = (e) => {
		console.log("触摸取消" + e)
	}
	// 画布的长按手势响应
	const tap = (e) => {
		console.log("长按手势" + e)
	}
	const error = (e) => {
		console.log("画布触摸错误" + e)
	}
	//绘制
	const draw = (touchs) => {
		console.log(touchs[0], touchs[1])
		let point1 = touchs[0]
		let point2 = touchs[1]
		touchs.shift()
		content.moveTo(point1.x, point1.y)
		content.lineTo(point2.x, point2.y)
		content.stroke()
		content.draw(true)
	}
	//清除操作
	const clearClick = () => {
		// 设置为未签名
		isEnd = false
		//清除画布
		content.clearRect(0, 0, canvasw, canvash)
		content.draw(true)
	}
	onMounted(() => {
		//获取系统信息
		uni.getSystemInfo({
			success: function(res) {
				canvasw = res.windowWidth;
				canvash = res.windowHeight;
			},
		})
		document.addEventListener("plusready",function(){
			//其它功能问题
			//注意：url是你要下载的文件路径，  xlsName（变量，随便命名） 是文件的后缀名，用于文件命名和格式修改
			let dtask = plus.downloader.createDownload("url",{
				//1.本地路径开头使用file://;
				//2.Android平台本地绝对路径为"storage/emulated/0",就是用户文件管理器能看到的了;
				//3.创建"xxx"作为文件夹名称，后缀是用于文件命名和格式修改，大家可以使用变量。
				filename: 'file://storage/emulated/0/xxx/' + "xlsName" //利用保存路径，实现下载文件的重命名
				},function(d, status) {//d为下载的文件对象;status下载状态
					console.log(d)
					if (status == 200) {//下载成功
						console.log("下载成功")
						//d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
						let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
						plus.runtime.openFile(d.filename); //选择软件打开文件
					} else {//下载失败
						console.log("下载失败")
						plus.downloader.clear(); //清除下载任务
					}
				}
			);
			// dtask.start();//启用
		});
		
	})
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(() => {
		//获得Canvas的上下文
		content = uni.createCanvasContext('firstCanvas')
		//设置线的颜色
		content.setStrokeStyle("#000")
		//设置线的宽度
		content.setLineWidth(5)
		//设置线两端端点样式更加圆润
		content.setLineCap('round')
		//设置两条线连接处更加圆润
		content.setLineJoin('round')
	})
</script>

<style scoped lang="less">
	.contents {
		width: 100%;
		height: 100%;
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
	}

	canvas {
		background-color: #DDDDDD;
		width: 700upx;
		margin: 0 25upx;
		height: calc(100vh - 140upx);
	}

	.caozuo {
		display: flex;
		height: 100upx;
		width: 750upx;
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 30upx;
		view {
			width: 375upx;
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

	.over {
		background-color: #0599D7;
	}
</style>
