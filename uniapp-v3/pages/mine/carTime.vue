<template>
	<view class="app-content">
		<view class="scrollcontent">
			<view class="txt-size-big listtitle">基本信息</view>
			<view class="inforcontent">
				<view class="inforitem border-bottom">
					<text class="list-title">访问区域</text>
					<text class="list-con"></text>
					<uni-icons type="forward" size="16" color="#9aa1ad"></uni-icons>
				</view>
				<view class="inforitem border-bottom" @click="selectType()">
					<text class="list-title">访问类型</text>
					<text class="list-con">内部维护</text>
					<uni-icons type="forward" size="16" color="#9aa1ad"></uni-icons>
				</view>
				<view class="inforitem border-bottom" @click="selectTime('inTime')">
					<text class="list-title">预约来访时间</text>
					<text class="list-con">{{initParams.inTime}}</text>
					<uni-icons type="forward" size="16" color="#9aa1ad"></uni-icons>
				</view>
				<view class="inforitem border-bottom" @click="selectTime('outTime')">
					<text class="list-title">预约离访时间</text>
					<text class="list-con">{{initParams.outTime}}</text>
					<uni-icons type="forward" size="16" color="#9aa1ad"></uni-icons>
				</view>
			</view>
			<view class="txt-size-big listtitle">人员陪同信息</view>
			<view class="inforcontent">
				<view class="inforitem">
					<text class="list-title">是否需要人员陪同</text>
					<text class="list-con">
						<custom-switch class="switch-btn" @change="change" v-model="acceptValue" :activeValue="1" :inactiveValue="0" 
						inactiveColor="#797979" activeColor="#00AB6F" :size="22"></custom-switch>
					</text>
				</view>
				<view class="table">
					<view class="table-box border-bottom">
						<view class="table-info">人员</view>
						<view class="table-info">车辆</view>
						<view class="table-info">是否驾车</view>
						<view class="table-info">操作</view>
					</view>
					<view class="table-box border-bottom" v-for="(item,index) in userList">
						<view class="table-info">{{item.user}}</view>
						<view class="table-info">{{item.carInfo}}</view>
						<view class="table-info">
							<custom-switch class="switch-btn" v-model="item.useCar" :activeValue="true" :inactiveValue="false"
							inactiveColor="#797979" activeColor="#00AB6F" :size="18"></custom-switch>
						</view>
						<view class="table-info table-info-btn" @click="removeTable(index)">移除</view>
					</view>
					<view class="table-btn" @click="addTable">新增</view>
				</view>
			</view>
			<view class="txt-size-big listtitle">备注信息</view>
			<view class="inforcontent">
				<textarea class="area" :maxlength="-1" :value="inputValue" @input="onInput" placeholder="其它注意事项" />
			</view>
		</view>
		<popup ref="popupRef" type="center" @sure="sureTable">
			<view class="inforcontent">
				<view class="inforitem border-bottom">
					<text class="list-title">姓名</text>
					<view class="list-con">
						<input class="iac-input" placeholder="输入姓名" v-model="addInfo.user" />
					</view>
				</view>
				<view class="inforitem border-bottom">
					<text class="list-title">是否驾车</text>
					<view class="list-con">
						<custom-switch class="switch-btn" @change="change" v-model="addInfo.useCar" :activeValue="true" :inactiveValue="false"
						inactiveColor="#797979" activeColor="#00AB6F" :size="16"></custom-switch>
					</view>
				</view>
				<view class="carInfo">
					<car-number-input v-show="addInfo.useCar" @numberInputResult="numberInputResult" :defaultStr="addInfo.carInfo"></car-number-input>
				</view>
			</view>
		</popup>
		<date-picker ref="showPicker" type="datetime" @confirm="confirmTime" format="yyyy-mm-dd hh:ii"></date-picker>
	</view>
</template>

<script setup lang="ts">
	import { reactive ,ref} from 'vue'
	import { onShow, onLoad} from '@dcloudio/uni-app'
	
	const initParams=ref({
		area:"松花江数据中心>1楼>2机房>A101机柜",
		type:"",
		inTime:"",
		outTime:""
	})
	//类型
	const selectType=()=>{
		
	}
	//日历信息
	const pickerType=ref("")
	const showPicker=ref<any>(null)
	const selectTime=(type)=>{
		console.log(type)
		showPicker.value.open()
		pickerType.value=type
	}
	const confirmTime=(e)=>{
		console.log(e,pickerType.value)
		initParams.value[pickerType.value]=e.value
	}
	
	//是否人员陪同
	const acceptValue=ref<any>(null)
	const change=(event)=>{
		console.log(event,acceptValue.value)
	}
	const userList=ref([])
	const addInfo=ref({
		user:"",
		carInfo:"",
		useCar:true
	})
	const popupRef=ref<any>(null)
	const addTable=()=>{
		addInfo.value.user=""
		addInfo.value.carInfo=""
		addInfo.value.useCar=true
		popupRef.value.open()
	}
	const sureTable=()=>{
		if(!addInfo.value.user){
			uni.showToast({title:"请填写姓名",icon:"error"})
			return
		}
		if(addInfo.value.useCar&&!addInfo.value.carInfo){
			uni.showToast({title:"请填写车牌信息",icon:"error"})
			return
		}
		popupRef.value.close()
		userList.value=userList.value.concat(JSON.parse(JSON.stringify(addInfo.value)))
	}
	const numberInputResult=(info)=>{
		addInfo.value.carInfo=info
	}
	const removeTable=(index)=>{
		uni.showModal({
		    title: '提示',
		    content: '确定删除？',
		    success: function (res) {
		        if (res.confirm) {
		            userList.value.splice(index,1)
		        }
		    }
		});
	}
	//备注信息
	const inputValue=ref("")
	const onInput=()=>{
		
	}
</script>

<style scoped lang="less">
	
	.scrollcontent {
		width: 100%;
		padding: 0 12px 0;
		box-sizing: border-box;
	}
	.listtitle {
		height: 44px;
		line-height: 32px;
		color: #697284;
		padding-left: 10px;
		padding-top: 12px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.inforcontent {
		border-radius: 4px;
		padding: 12px 16px;
		width: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		.inforitem {
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.list-title{
				color: #36435b;
				flex-shrink: 0;
				padding-right: 10px;
			}
			.list-con{
				color: #858585;
				width: 100%;
				text-align: right;
				display: flex;
				justify-content: flex-end;
			}
			.iac-input{
				width: 100%;
			}
		}
		.carInfo{
			padding: 20px 0;
		}
		.area{
			width: 100%;
		}
		.border-bottom{
			border-bottom: 1px solid #e3e3e3;
		}
		.table{
			margin-top: 10px;
			.table-box{
				display: flex;
				width: 100%;
				height: 40px;
				align-items: center;
				.table-info{
					width: 25%;
					height: 100%;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.table-info-btn{
					color: #169bd5;
				}
			}
			.table-btn{
				border: 1px solid #6db2cf;
				margin-top: 10px;
				height: 35px;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				color:#169bd5;
				border-radius: 5px;
			}
		}
		
	}
</style>