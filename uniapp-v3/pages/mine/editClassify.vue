<template>
	<view class="app-content">
		<view class="app-content">
		<view class="scrollcontent">
			<scroll-view scroll-y class="scrolllist">
				<view class="scrolllist-con">
					<view class="list-cell">
						<view class="list-cell-title">我的应用</view>
						<view class="list-cell-con">
							<block v-for="(item,index) in mydata">
								<view class="cell-box" v-if="item.ismy">
									<view class="cell-item" @click="meauedit(item)">
										<image class="img" :src="item.img"></image>
										<view>{{item.name}}</view>
										<view class="optionview bgcolor-ffa100">-</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<view class="list-cell">
						<view class="list-cell-title">全部应用</view>
						<view class="list-cell-con">
							<view class="cell-box" v-for="(item,index) in dataarry">
								<view class="cell-item" @click="meauedit(item)">
									<image class="img" :src="item.img"></image>
									<view>{{item.name}}</view>
									<view class="optionview" :class="[item.ismy?'bgcolor-ffa100':'bgcolor-00ab6f']">{{item.ismy?'-':'+'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive ,ref,watch} from 'vue'
	import { onShow, onLoad,onNavigationBarButtonTap} from '@dcloudio/uni-app'
	onNavigationBarButtonTap((event) => {
		if(event.index == 0){
			console.log("点击了第一个按钮")
			saveEdit()
		}
	})
	
	//我的应用
	const mydata=ref([])
	
	const dataarry=ref([
		{img:"/static/images/classify/my_about.png",name:"人员进出申请",ismy:false,value:"1"},
		{img:"/static/images/classify/my_datasync.png",name:"设备移入",ismy:false,value:"2"},
		{img:"/static/images/classify/my_serversettings.png",name:"设备移出",ismy:false,value:"3"},
		{img:"/static/images/classify/my_wipecache.png",name:"审计报告",ismy:false,value:"4"},
	])
	
	const saveEdit=()=>{
		console.log("保存")
		uni.navigateBack()
	}
	
	const meauedit=(opitem)=> {
		let ismy = opitem.ismy;
		if (!ismy && mydata.value.length >= 5) {
			uni.showToast({title: '最大支持5个',icon:"none"})
			return;
		}
		if (ismy) {
			for (let i = 0; i < mydata.value.length; i++) {
				let item = mydata.value[i];
				if (item.value == opitem.value) {
					mydata.value.splice(i, 1);
					break;
				}
			}
			opitem.ismy = false;
		} else {
			opitem.ismy = true;
			mydata.value.push(opitem);
		}
	}
	
</script>

<style scoped lang="less">
	
	.scrollcontent {
		width: 100%;
		height: calc(100% - 100px);
		.scrolllist{
			width: 100%;
			height: 100%;
			.scrolllist-con{
				padding: 12px 12px 4px;
				box-sizing: border-box;
			}
		}
	}
	.list-cell{
		background-color:  #fff;
		border-radius: 4px;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 8px;
		.list-cell-title{
			width: 100%;
			height: 44px;
			line-height: 44px;
			border-bottom: 1px solid #f4f4f8;
			padding-left: 12px;
			font-weight: bold;
			display: flex;
			align-items: center;
		}
		.list-cell-con{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 2px;
			.cell-box{
				height: 70px;
				width: 25%;
				padding: 2px;
				box-sizing: border-box;
				.cell-item{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					background: #f4f4f8;
					position: relative;
					width: 100%;
					height: 100%;
					font-weight: normal;
					color: #36435b;
					font-size: 12px;
					.img{
						width: 22px;
						height: 22px;
						margin-bottom: 8px;
					}
					.bgcolor-ffa100{
						background-color: #ffa100;
					}
					.bgcolor-00ab6f{
						background-color: #00ab6f;
					}
					.optionview{
						width: 12px;
						height: 12px;
						border-radius: 6px;
						display: flex;
						justify-content: center;
						align-items: center;
						position: absolute;
						top: 4px;
						right: 4px;
						color: #fff;
					}
				}
				
			} 
			
		}
	}
	
</style>