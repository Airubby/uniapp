<template>
	<view>
		<view class="car-input-container">
			<view class="car-input-box" 
				v-for="(item,index) in inputList" :key="index" @click="plateInput(index)">
				<view class="car-input-item" 
					:class="[curInput == index?'sel-item':'',(maxNum-1) == index?'last-item':'']" >
					<view :class="curInput == index?'sel-item-line':''"></view>
					<img :src="xnyImgBase64" class="new-item-img" v-if="(maxNum-1) == index"/>
					{{item}}
				</view>
			</view>
		</view>
		
		<view class="car-number-container" v-if="showKeyPop1">
			<view class="plate-close" @click="closeKeyboard"><text class="plate-close-btn">关闭</text></view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item province-item" v-for="(item,index) in keyProvince1" :key="index" @click="tapKeyboard(item)">{{item}}</view>
			</view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item province-item" v-for="(item,index) in keyProvince2" :key="index" @click="tapKeyboard(item)">{{item}}</view>
			</view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item province-item" v-for="(item,index) in keyProvince3" :key="index" @click="tapKeyboard(item)">{{item}}</view>
			</view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item province-item" v-for="(item,index) in keyProvince4" :key="index" @click="tapKeyboard(item)">{{item}}</view>
				<!-- 删除 -->
				<view class="plate-popup-item province-item del" @click="onPlateDelTap">
				    <image :src="deleteImgBase64" />
				</view>
			</view>
		</view>
		
		<view class="car-number-container" v-if="showKeyPop2">
			<view class="plate-close" @click="closeKeyboard"><text class="plate-close-btn">关闭</text></view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item" :class="lockInput.includes(item)?'lock-item':''" 
					v-for="(item,index) in keyEnInput1" :key="index" @click="tapKeyboard(item)">
					{{item}}
				</view>
			</view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item" :class="lockInput.includes(item)?'lock-item':''" 
					v-for="(item,index) in keyEnInput2" :key="index" @click="tapKeyboard(item)">
					{{item}}
				</view>
			</view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item" :class="lockInput.includes(item)?'lock-item':''"  
					v-for="(item,index) in keyEnInput3" :key="index" @click="tapKeyboard(item)">
					{{item}}
				</view>
			</view>
			<view class="plate-popup-list">
			    <view class="plate-popup-item" :class="lockInput.includes(item)?'lock-item':''" 
					v-for="(item,index) in keyEnInput4" :key="index" @click="tapKeyboard(item)">
					{{item}}
				</view>
				<!-- 删除 -->
				<view class="plate-popup-item del" @click="onPlateDelTap">
				    <image :src="deleteImgBase64" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'car-number-input',
		emits: ['numberInputResult'],
		props: {
			defaultStr:{
				type: String,
				default: ''
			},
			plateNum: {
				type: String,
				default: ''
			},
			// maxNum: {
			// 	type: Number,
			// 	default: 8
			// },
		},
		data() {
			return {
				inputList:[" "," "," "," "," "," "," "," "],
				curInput:-1,
				maxNum:8,
				showKeyPop1:false,
				showKeyPop2:false,
				keyProvince1: ['京', '津', '晋', '冀', '蒙', '辽', '吉', '黑', '沪'],
				keyProvince2: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘'],
				keyProvince3: ['粤', '桂', '琼', '渝', '川', '贵', '云', '藏'],
				keyProvince4: ['陕', '甘', '青', '宁', '新', '台' ],
				keyEnInput1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
				keyEnInput2: ["Q", "W", "E", "R", "T", "Y", "U", "P", "学", "军"],
				keyEnInput3: ["A", "S", "D", "F", "G", "H", "J", "K", "L", "警"],
				keyEnInput4: ["Z", "X", "C", "V", "B", "N", "M", "港", "澳"],
				lockInput: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
				xnyImgBase64:"data:image/png;base64,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PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDktMTlUMTU6MDQ6NDQrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDktMTlUMTU6MDQ6NDQrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTA5LTE5VDE1OjA0OjQ0KzA4OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmNjMmVkZmYwLTk0NjktNGJhNC1hODc2LWVkYmJlZjRhYjk0MyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmJkYTBhZTk3LWFmZWYtOWI0Ni1iOGFhLWZjOTMyMmM5OTk0NCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjM1N2JlZGY2LTI5YWUtNGJmNS04YjQwLTVlMWQ5YjNlMmJmZiIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRpc3BsYXkiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTdiZWRmNi0yOWFlLTRiZjUtOGI0MC01ZTFkOWIzZTJiZmYiIHN0RXZ0OndoZW49IjIwMjItMDktMTlUMTU6MDQ6NDQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6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",
				deleteImgBase64:"data:image/png;base64,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"
			}
		},
		watch: {
			defaultStr(val) {
				if(val != "" && val != null){
					const valList = val.split("")
					for (let i in valList) {
						this.inputList[i] = valList[i]
					}
				}
			},
			curInput(val){
				this.showOrHidePop(val)
				
				this.keyEnInput2 = ["Q", "W", "E", "R", "T", "Y", "U", "O", "P", "军"]
				switch(val){
				    case 1:
				        this.lockInput = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "学", "军", "警", "港", "澳"]
						break
				    case 2:
				        this.lockInput = ["O", "学", "军", "警", "港", "澳"]
						break
					case 3:
					    this.lockInput = ["O", "学", "军", "警", "港", "澳"]
						break
					case 4:
					    this.lockInput = ["O", "学", "军", "警", "港", "澳"]
						break
					case 5:
					    this.lockInput = ["O", "学", "军", "警", "港", "澳"]
						break
					case 6:
					    this.lockInput = ["O"]
						this.keyEnInput2 = ["Q", "W", "E", "R", "T", "Y", "U", "P", "学", "军"]
						break
					case 7:
					    this.lockInput = ["O", "学", "军", "警", "港", "澳"]
						break
				    default:
				        this.lockInput = []
						break
				}
			}
		},
		created() {
			if(this.defaultStr != "" && this.defaultStr != null){
				const valList = this.defaultStr.split("")
				for (let i in valList) {
					this.inputList[i] = valList[i]
				}
			}
		},
		methods: {
			plateInput(e){
				this.curInput = e
				this.showOrHidePop(e)
			},
			showOrHidePop(val){
				if(val == -1){
					this.showKeyPop1 = false
					this.showKeyPop2 = false
				}else if(val == 0){
					this.showKeyPop1 = true
					this.showKeyPop2 = false
				}else{
					this.showKeyPop1 = false
					this.showKeyPop2 = true
				}
				
			},
			tapKeyboard(e){
				if(this.lockInput.includes(e)){
					return
				}
				
				this.inputList[this.curInput] = e
				if(this.curInput < this.maxNum-2){
					this.curInput++
				}else{
					this.curInput = -1
				}
				
				this.emitResult()
			},
			closeKeyboard(){
				this.curInput = -1
			},
			onPlateDelTap(){
				if(this.inputList[this.curInput] == " "){
					this.curInput--
				}
				// this.inputList[this.curInput] = " "
				this.inputList.splice(this.curInput,1," ")
				
				this.emitResult()
			},
			emitResult(){
				const returnResult = this.inputList.join("")
				this.$emit('numberInputResult', returnResult);
			}
		}
	};
</script>

<style scoped lang="scss">
	.car-input-container{
		position: relative;
		padding: 0 5px;
		height: 44px;
		.car-input-box{
			display: inline-block;
			width: 12.5%;
			height: 44px;
			vertical-align: middle;
			.car-input-item{
				position: relative;
				border: 1px solid #E2E2E2;
				height: 40px;
				line-height: 40px;
				width: 80%;
				margin-left: 10%;
				text-align: center;
				font-size: 17px;
				.sel-item-line{
					position: absolute;
					bottom: 3px;
					left: 15%;
					height: 2px;
					background-color: #2979ff;
					width: 70%;
				}
				.new-item-img{
					position: absolute;
					top: -6px;
					left: 50%;
					margin-left: -15px;
					height: 13px;
					width: 30px;
					z-index: 9;
				}
			}
			.sel-item{
				color: #2979ff;
			}
			.last-item{
				border: 1px solid #18bc37;
			}
		}
	}
	.car-number-container{
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 254px;
		background-color: #E3E2E7;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
		overflow: hidden;
		text-align: center;
		.plate-close{
			height: 40px;
			line-height: 40px;
			text-align: right;
			background-color: #FFF;
			.plate-close-btn{
				font-size: 13.5px;
				color: #555;
				margin-right: 15px;
			}
		}
		//键盘主体内容-单行
		.plate-popup-list {
		    margin: 0 auto;
		    overflow: hidden;
		    display: inline-block;
		    display: table;
		
		    &:last-child {
		        margin-bottom: 2px;
		    }
		}
		//键盘主体内容-单个
		.plate-popup-item {
		    float: left;
		    font-size: 16px;
		    width: 8vw;
		    margin: 0 1vw;
		    margin-top: 8px;
		    height: 40px;
		    line-height: 40px;
		    background: #FFFFFF;
		    border-radius: 5px;
		    color: #4A4A4A;
			image {
				width: 16px;
				height: 16px;
				margin: 12px auto;
			}
		}
		.plate-popup-item:active{
			background-color: #EAEAEA;
		}
		.province-item{
			width: 8.8vw;
		}
		.lock-item{
			color: #AAA;
		}
	}
</style>