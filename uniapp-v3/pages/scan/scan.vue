<template>
	<view class='contents'>
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
	onLoad((data) => {
		state.type = data.type;
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(true); //全屏
		let currentWebview = page.$getAppWebview();
		createBarcode(currentWebview); //创建二维码窗口
		createView(currentWebview); //创建操作按钮及tips界面
		// #endif
	})
	let barcode = null;
	const state = reactive({
		name: "",
		type: "", //定义的监听事件key
		flash: false //是否打开摄像头
	})
	const onmarked = (code, result) => {
		plus.navigator.setFullscreen(false);
		//兄弟传参
		// this.$eventHub.$emit(this.type, {
		// 	result: result
		// });				

		uni.$emit(state.type, {
			code,
			result
		})
		uni.navigateBack({
			delta: 1
		});
		barcode.close();
	}
	const createBarcode = (currentWebview) => {
		//自定义窗口大小
		// QR: QR二维码，数值为0 一般二维码就只用这个
		// EAN13: EAN条形码标准版，数值为1
		// EAN8: EAN条形码简版，数值为2
		// AZTEC: Aztec二维码，数值为3 中间正方形条周围正方形块的二维码
		// DATAMATRIX: Data Matrix二维码，数值为4
		// UPCA: UPC条形码标准版，数值为5
		// UPCE: UPC条形码缩短版，数值为6
		// CODABAR: Codabar条形码，数值为7
		// CODE39: Code39条形码，数值为8
		// CODE93: Code93条形码，数值为9
		// CODE128: Code128条形码，数值为10
		// ITF: ITF条形码，数值为11
		// MAXICODE: MaxiCode二维码，数值为12 中间圆圈周围圆点的二维码
		// PDF417: PDF 417二维条码，数值为13 类似于条形的二维码
		// RSS14: RSS 14条形组合码，数值为14
		// RSSEXPANDED: 扩展式RSS条形组合码，数值为15
		//条码类型常量数组，默认情况支持QR、EAN13、EAN8类型。 通过此参数可设置扫码识别支持的条码类型（注意：设置支持的条码类型越多，扫描识别速度可能将会降低）
		barcode = plus.barcode.create('barcode', [plus.barcode.QR, plus.barcode.CODE128, plus.barcode.EAN13, plus.barcode.EAN8
		], {
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			scanbarColor: '#1DA7FF',
			position: 'static',
			frameColor: '#1DA7FF'
		});
		barcode.onmarked = onmarked;
		barcode.setFlash(state.flash);
		currentWebview.append(barcode);
		barcode.start();
	}
	const createView = (currentWebview) => {
		// 创建返回原生按钮
		var backVew = new plus.nativeObj.View('backVew', {
				top: '0px',
				left: '0px',
				height: '40px',
				width: '10%'
			},
			[{
				tag: 'img',
				id: 'backBar',
				src: 'static/images/backBar.png',
				position: {
					top: '2px',
					left: '3px',
					width: '35px',
					height: '35px'
				}
			}]);
		// 创建打开手电筒的按钮
		var scanBarVew = new plus.nativeObj.View('scanBarVew', {
				top: '60%',
				left: '40%',
				height: '10%',
				width: '20%'
			},
			[{
					tag: 'img',
					id: 'scanBar',
					src: 'static/images/scanBar.png',
					position: {
						width: '28%',
						left: '36%',
						height: '30%'
					}
				},
				{
					tag: 'font',
					id: 'font',
					text: '轻触照亮',
					textStyles: {
						size: '10px',
						color: '#ffffff'
					},
					position: {
						width: '80%',
						left: '10%'
					}
				}
			]);
		// 创建展示类内容组件
		var content = new plus.nativeObj.View('content', {
				top: '0px',
				left: '0px',
				height: '10%',
				width: '100%'
			},
			[{
					tag: 'font',
					id: 'scanTitle',
					text: '相册',
					textStyles: {
						size: '18px',
						color: '#ffffff'
					},
					position: {
						top: '0px',
						left: '0px',
						width: '100%',
						height: '40px'
					}
				},
				{
					tag: 'font',
					id: 'scanTips',
					text: state.name,
					textStyles: {
						size: '14px',
						color: '#ffffff',
						whiteSpace: 'normal'
					},
					position: {
						top: '90px',
						left: '10%',
						width: '80%',
						height: 'wrap_content'

					}
				}

			]);
		var tips = new plus.nativeObj.View('tips', {
				bottom: '0px',
				left: '0px',
				height: '10%',
				width: '100%'
			},
			[{
				tag: 'font',
				id: 'tipsTitle',
				text: '将二维码/条形码置于扫码框中即可扫描',
				textStyles: {
					size: '12px',
					color: '#999'
				},
				position: {
					bottom: '0px',
					left: '0px',
					width: '100%',
					height: '40px'
				}
			}]);

		// backVew.interceptTouchEvent(true);
		scanBarVew.interceptTouchEvent(true);
		content.interceptTouchEvent(true);
		currentWebview.append(content);
		currentWebview.append(scanBarVew);
		// currentWebview.append(backVew);
		currentWebview.append(tips);
		backVew.addEventListener("click", function(e) { //返回按钮
			console.log(e)
			uni.navigateBack({
				delta: 1
			});
			barcode.close();
			plus.navigator.setFullscreen(false);

		}, false);
		scanBarVew.addEventListener("click", function(e) { //点亮手电筒
			state.flash = !state.flash;
			if (state.flash) {
				scanBarVew.draw([{
						tag: 'img',
						id: 'scanBar',
						src: 'static/images/yellow-scanBar.png',
						position: {
							width: '28%',
							left: '36%',
							height: '30%'
						}
					},
					{
						tag: 'font',
						id: 'font',
						text: '轻触关闭',
						textStyles: {
							size: '10px',
							color: '#F4EA2A'
						},
						position: {
							width: '80%',
							left: '10%'
						}
					}
				]);
			} else {
				scanBarVew.draw([{
						tag: 'img',
						id: 'scanBar',
						src: 'static/images/scanBar.png',
						position: {
							width: '28%',
							left: '36%',
							height: '30%'
						}
					},
					{
						tag: 'font',
						id: 'font',
						text: '轻触照亮',
						textStyles: {
							size: '10px',
							color: '#ffffff'
						},
						position: {
							width: '80%',
							left: '10%'
						}
					}
				])
			}
			if (barcode) {
				barcode.setFlash(state.flash);
			}
		}, false)
		content.addEventListener("click", function(e) { //打开相册
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					console.log(res)
					let path = res.tempFilePaths[0];
					const barcodeModule = uni.requireNativePlugin('barcodeScan');
					barcodeModule.scan(path, (e) => {
						console.log(e)
						if (e.detail.type == 'success' && e.detail.message) {
							this.onmarked(e.detail.code, e.detail.message)
						} else {
							uni.showToast({
								title: '失败'
							})
						}
					});
				},
				fail: function() {
					uni.showToast({
						title: '选择失败'
					})
				}
			});
		}, false)

	}
	onMounted(() => {

	})
</script>

<style scoped lang="less">
	.contents {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.caozuo {
		display: flex;
		height: 100upx;
		width: 750upx;
		position: fixed;
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
