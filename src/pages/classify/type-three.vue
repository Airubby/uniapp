<template>
	<view>
		<image src="/static/images/code.png" mode="widthFix" style="width:232px;height:232px;" class="code" id="code"></image>		
		<view id="qrcode" ref="qrcode"></view>
	</view>
</template>
<style lang="less" scoped>
	.code{
		width: 160px;
		height: 160px;
	}
</style>
<script>
import html2canvas from 'html2canvas';
import Canvas2Image from 'canvas2image';
import QRCode from 'qrcodejs2'
//canvas2image.js   最后添加 export default Canvas2Image;
	export default {
		components: {Canvas2Image,html2canvas,QRCode},
		data() {
			return {
				data:[]
			}
		},
		mounted(){
			html2canvas(document.body).then(function(canvas) {
				console.log(canvas)
				document.body.appendChild(canvas);
				// 把body内包含的内容全部转化为canvas
			});
			this.$nextTick (function () {
   				this.qrcode();
			});
		},
		created() {
			
		},
		methods: {
			qrcode () {
				let qrcode = new QRCode('qrcode', {  
					width: 300,  // 设置宽度 
					height: 300, // 设置高度
					text: 'https://baidu.com'
				})  
			},
			convert2canvas() {
				// 获取需要转化的dom对象
				var cntElem = this.$el.querySelector("#code");
			
				var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
				var width = shareContent.offsetWidth; //获取dom 宽度
				var height = shareContent.offsetHeight; //获取dom 高度
			
				var canvas = document.createElement("canvas"); //创建一个canvas节点
				var scale = 2; //定义任意放大倍数 支持小数
				canvas.width = width * scale; //定义canvas 宽度 * 缩放
				canvas.height = height * scale; //定义canvas高度 *缩放
				//放大后再缩小提高清晰度
				canvas.getContext("2d").scale(scale, scale); 
				
				console.log(width)
				console.log(height)
				// 设置html2canvas方法的配置
				var opts = {
					scale: scale, // 添加的scale 参数
					canvas: canvas, //自定义 canvas
					// allowTaint: true, //允许画布上有跨域图片 不建议使用 后面详细补充
					// logging: true, //日志开关，便于查看html2canvas的内部执行流程
					width: width, //dom 原始宽度
					height: height,
					useCORS: true // 【重要】开启跨域配置
				};
				// 开始转化为canvs对象
				html2canvas(shareContent, opts).then(function(canvas) {
			
					var context = canvas.getContext('2d');
					// 【重要】关闭抗锯齿
					context.mozImageSmoothingEnabled = false;
					context.webkitImageSmoothingEnabled = false;
					context.msImageSmoothingEnabled = false;
					context.imageSmoothingEnabled = false;
			
					// 【重要】默认转化的格式为png,也可设置为其他格式
					var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
					//转化后放哪 最好放在与 .wrap 父级下
					var detail = document.getElementById("code");
					detail.appendChild(img);
					// 最后设置img标签为正常高度宽度 提高清晰度
					$(img).css({
					"width": canvas.width / 2 + "px",
					"height": canvas.height / 2 + "px",
					}).addClass('f-full');
			
				});
			}
		},
		watch:{
			
		}
	}
</script>

<style>
	
</style>
