<template>
	<view class='contents'>
		<view class="status_bar"></view>
		<view class='scan-box'>
			<text class="title">蓝牙传输数据</text>
			<view>
				<view class="row">
					<text>扫描状态：</text>
					<text>{{msg}}</text>
				</view>
				<!-- <view class="btn" @click="openBlue()">点击搜索蓝牙</view> -->
				<view class="row">
					<button class="button" size="mini" @click="startScan()">开始扫描</button>
					<button class="button" @click="stopScan()" size="mini">停止扫描</button>
					<button class="button" size="mini" @click="getAllScan()">获取所有</button>
					<button class="button" size="mini" @click="getConnected()">获取已连</button>
					<button class="button" size="mini" @click="getStatus()">获取状态</button>
				</view>
				<view class="row">
					<text>日志</text>
				</view>
				<scroll-view class="border list" scroll-y="true" :scroll-into-view="toBottom"
					:style="{width:'93vw',height:'25vh'}">
					<text class="log" selectable="true">{{log}}</text>
					<view id="bottomId" class="log-bottom"></view>
				</scroll-view>
				<view class="row">
					<text>设备列表</text>
					<text>({{deviceList.length}})</text>
				</view>
				<scroll-view class="border list" scroll-y="true" :style="{width:'93vw',height:'38vh'}">
					<view v-for="(item,index) in deviceList" :key="index" class="list-item">
						<view class="column">
							<text class="text">{{item.name}}</text>
							<view class="row">
								<text class="text">{{item.advertisServiceUUIDs.length}}</text>
								<text class="text">个主服务</text>
								<text class="text">信号强度</text>
								<text class="text">{{item.RSSI}}</text>
								<button v-if="!item.connected" size="mini" class="button"
									@click="toConnect(item.deviceId)">连接</button>
								<button v-if="item.connected" size="mini"
									@click="disConnect(item.deviceId)">断开连接</button>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		reactive,
		toRefs
	} from "vue";
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'

	const ble = uni.requireNativePlugin('sand-plugin-bluetooth');

	const state = reactive({
		title: 'Hello',
		msg: '还未开始',
		log: '',
		deviceList: [],
		deviceMap: {},
		toBottom: ''
	})
	const openBlue = () => {
		uni.openBluetoothAdapter({
			success(res) {
				console.log(res)
			},
			fail(res) {
				console.log("当前蓝牙不可用，请确认蓝牙是否已打开")
				uni.showToast({
					title: '当前蓝牙不可用，请确认蓝牙是否已打开',
					icon: "none",
					duration: 2000
				});
			}
		})
	}
	const initListener = () => {
		console.log(ble)
		//适配器监听
		ble.onBluetoothAdapterStateChange({}, (res) => {
			console.log('适配器状态变化', res);
			state.msg = res.message;
			addLog(res.message);
		});
		//发现设备监听
		ble.onBluetoothDeviceFound({}, (res) => {
			console.log('发现了设备', res);
			if (res.status == '2500') {
				let devices = JSON.parse(res.devices);
				addFindDevice(devices);
			}
		});
		//监听设备连接监听
		ble.onBLEConnectionStateChange({}, (res) => {
			let deviceId = res.deviceId;
			let connected = res.connected;
			let list = [...state.deviceList];
			let dev = list[state.deviceMap[deviceId]];
			dev.connected = connected;
			state.deviceList = list;
			addLog(dev.name + "连接状态=" + connected);
			console.log(dev.name + "连接状态=" + connected);
			//连接成功，获取服务和订阅特征
			if (connected == true) {
				notify(deviceId);
			}
		});
		//监听特征数据
		ble.onBLECharacteristicValueChange({}, (res) => {
			addLog('十六进制值:' + res.value);
			console.log('十六进制值:' + res.value);
			let value = res.value;
			addLog('解析后的值:' + JSON.stringify(hex2Bytes(value)));
			console.log('解析后的值:' + JSON.stringify(hex2Bytes(value)));
		});
		//打开适配器
		ble.openBluetoothAdapter({}, (res) => {
			console.log(res);
			state.msg = res.message;
			addLog(res.message);
		});

	}
	//启动扫描
	const startScan = () => {
		ble.startBluetoothDevicesDiscovery({}, (res) => {
			state.msg = res.message;
		});
	}
	//停止扫描
	const stopScan = () => {
		ble.stopBluetoothDevicesDiscovery({}, (res) => {
			state.msg = res.message;
			addLog(res.message);
		});
	}
	//连接设备
	const toConnect = (deviceId) => {
		//停止扫描
		ble.stopBluetoothDevicesDiscovery({}, (res) => {
			addLog(res.message);
		});
		//开始连接
		ble.createBLEConnection({
			deviceId: deviceId
		}, (res) => {
			addLog(res.message);
			//加入自动重连
			ble.addAutoReconnect({
				deviceId: deviceId
			}, (res2) => {
				addLog(res2.message);
			});
		});
	}
	//断开连接
	const disConnect = (deviceId) => {
		ble.removeAutoReconnect({
			deviceId: deviceId
		}, (res) => {
			addLog(res.message);
			ble.closeBLEConnection({
				deviceId: deviceId
			}, (res2) => {
				addLog(res2.message);
			});
		});
	}
	const notify = (deviceId) => {
		let timeout = 0;
		setTimeout(() => {
			//获取服务列表
			ble.getBLEDeviceServices({
				deviceId: deviceId
			}, (res) => {
				console.log(res);
				if (res.status == '2500') {
					let services = JSON.parse(res.services);
					addLog(res.message + "," + res.services);
					//由于是异步方法，采用递归进行遍历
					var diguiServices = function(serArr, index) {
						ble.getBLEDeviceCharacteristics({
							deviceId: deviceId,
							serviceId: serArr[index].uuid
						}, (res2) => {
							addLog(res2.message + "," + res2.characteristics);
							let characteristics = JSON.parse(res2.characteristics);
							//订阅设备特征
							if (serArr[index].uuid.indexOf('1905') >= 0) {
								for (let j = 0; j < characteristics.length; j++) {
									let characteristic = characteristics[j];
									if (characteristic.properties.notify == true) {
										ble.notifyBLECharacteristicValueChange({
											deviceId: deviceId,
											serviceId: serArr[index].uuid,
											characteristicId: characteristic.uuid
										}, (res3) => {
											addLog(res3.message);
										});
									}
									//读特征值
									if (characteristic.properties.read == true) {
										ble.readBLECharacteristicValue({
											deviceId: deviceId,
											serviceId: serArr[index].uuid,
											characteristicId: characteristic.uuid
										}, (res3) => {
											addLog(res3.message);
										});
									}
									//写一个值过去
									if (characteristic.properties.write == true) {
										ble.writeBLECharacteristicValue({
											deviceId: deviceId,
											serviceId: serArr[index].uuid,
											characteristicId: characteristic.uuid,
											value: "01" //十六进制数据
										}, (res3) => {
											addLog(res3.message);
										});
									}
								}
							}


							let index2 = index + 1;
							if (index2 >= serArr.length) {
								return;
							} else {
								// console.log("递归下一个服务的特征值");
								diguiServices(serArr, index2);
							}
						});
					};
					//开始遍历服务
					diguiServices(services, 0);
				} else {
					addLog(res.message);
				}
			});
		}, timeout);
	}

	const getAllScan = () => {
		//获取已经扫描到的所有设备
		ble.getBluetoothDevices({}, (res) => {
			addLog('获取所有:' + res.devices);
			let arr = JSON.parse(res.devices);
			addFindDevice(arr);
			for (let i = 0; i < arr.length; i++) {
				let dev = arr[i];
				if (dev.restore) {
					addLog('准备恢复这台设备' + dev.name);
					toConnect(dev.deviceId);
				}
			}
		});
	}
	const getConnected = () => {
		//获取已连接的所有设备
		ble.getConnectedBluetoothDevices({}, (res) => {
			addLog('获取已连:' + res.devices);
		});
	}
	const getStatus = () => {
		//获取当前适配器状态
		ble.getBluetoothAdapterState({}, (res) => {
			addLog('获取状态:' + JSON.stringify(res));
		});
	}
	const addLog = (msg) => {
		state.log = state.log + new Date().toLocaleString() + ":" + msg + "\r\n";
		state.toBottom = '';
		setTimeout(() => {
			state.toBottom = "bottomId";
		}, 200);
	}
	const addFindDevice = (devices) => {
		let list = [...state.deviceList];
		for (let i = 0; i < devices.length; i++) {
			let dev = devices[i];
			//去重
			if (state.deviceMap[dev.deviceId] >= 0) {
				let index = state.deviceMap[dev.deviceId];
				//更新
				list.splice(index, 1, dev);
			} else {
				//新增
				list.push(dev);
				state.deviceMap[dev.deviceId] = list.length - 1;
			}
		}
		state.deviceList = list;
	}
	//十六进制字符串转数组
	const hex2Bytes = (hexStr) => {
		var pos = 0;
		var len = hexStr.length;
		if (len % 2 != 0) {
			return null;
		}
		len /= 2;
		var hexA = new Array();
		for (var i = 0; i < len; i++) {
			var s = hexStr.substr(pos, 2);
			var v = parseInt(s, 16);
			hexA.push(v);
			pos += 2;
		}
		return hexA;
	}

	onMounted(() => {

	})
	onLoad(() => {
		initListener();
	})
	const {
		msg,
		toBottom,
		log,
		deviceList
	} = toRefs(state)
</script>

<style scoped lang="less">
	.title {
		width: 100%;
		display: block;
		font-size: 26px;
		text-align: center;
	}

	.btn {
		width: 100%;
		display: block;
		font-size: 26px;
		text-align: center;
		background: #09c;
		color: #fff;
		margin-top: 20px;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-content: flex-start;
		align-items: flex-start;
		margin: 15px 10px;
		padding: 5px;

		.button {
			width: 100px;
			font-size: 11px;
			background-color: #003366;
			color: white;
		}
	}

	.border {
		border: solid 1px gray;
	}

	.list {
		padding-left: 3vw;
		padding-right: 3vw;
		padding-top: 3vw;

		.list-item {
			background-color: #f8f8f8;
			border: solid 1px darkgray;
			box-shadow: 1px 1px 3px;
			margin-bottom: 3vw;

			.text {
				height: 30px;
				line-height: 30px;
				margin-left: 5px;
			}

			.row {
				margin: 3px 10px !important;
				padding: 0 !important;
			}
		}
	}

	.log {
		width: 87vw;
		font-size: 13px;
		color: #003366;

		.log-bottom {
			height: 10vw;
		}
	}
</style>
