<template>
	<view class="contenter">
		<view class="register-box">
			<view class="header">
				<image src="/static/images/login/logo.png"></image>
			</view>

			<view class="list">
				<view class="list-call">
					<input class="sl-input" v-model="initparam.username" placeholder="用户名" />
				</view>
				<view class="list-call">
					<input class="sl-input" v-model="initparam.phone" type="number" maxlength="11" placeholder="手机号" />
				</view>
				<view class="list-call">
					<input class="sl-input" v-model="initparam.password" type="text" maxlength="32" placeholder="登录密码"
						:password="!showPassword" />
				</view>
				<view class="list-call">
					<input class="sl-input" v-model="initparam.code" type="number" maxlength="4" placeholder="验证码" />
					<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
				</view>

			</view>

			<view class="button-login" hover-class="button-hover" @tap="register()">
				<text>注册</text>
			</view>

			<view class="agreement">
				<image @tap="agreementSuccess"
					:src="agreement==true?'/static/images/login/ty1.png':'/static/images/login/ty0.png'"></image>
				<text @tap="agreementSuccess"> 同意</text>
				<view @tap="agreementShow">《软件用户协议》</view>
			</view>
		</view>
		<popup-sure ref="popupRef" title="软件用户协议" @sure="surePopup">
			<h3>1.知识产权保护</h3>
			<view>
				该软件(_________)的著作权和所有权由_________有限公司所有。该软件受_________国著作权法和国际条约条款的保护。商标的使用应符合商标惯例，包括和商标所有人名称的一致。商标可以仅用于对该软件产品的识别。对于任何商标的该种使用都不会导致对该商标使用权的拥有。除上述以外，该协议不授予你该软件上的任何知识产权。
			</view>
			<h3>2.软件的使用</h3>
			<view>你可以：

				　　(1)根据该协议条款使用该软件;

				　　(2)复制和备份;

				　　(3)不对文档作任何增加或修改以文档下载的最初形式将此软件拷贝给他人;

				　　(4)在网址上通过email或者其他任何物理媒体分发该软件。

				　　你不可以：

				　　(1)对本系统进行逆向工程、反汇编、解体拆卸或任何试图发现该软件工作程序获源代码的行为;

				　　(2)未经_________有限公司的书面许可出售租赁该程序;

				　　(3)创造派生性产品包括含有该系统的更大的系统或另外的程序和包裹;

				　　(4)将该软件和与_________没有分离授权协议的产品或山版物捆绑销售;

				　　(5)使用和拷贝没有_________授权的包含在_________之中的icons，1ogosorartwork;

				　　(6)改变_________广告图案内部程序的运行，改变广告及其内容、广告出现的时间或使其他功能丧失的行为;

				　　(7)使用该软件改进其他产品和服务;

				　　(8)任何反相工程、反相编译和反汇编以及其他任何试图发现由该内程旗帜广告和该软件中网络共享功能所使用的协议的行为;

				　　(9)在任何图像中使用该软件在任何情况下以任何方式对任何个人和商业实体的诋毁行为;或暗示由软件、软件供应商、软件许可商或其他在该软件中描绘的实体任何形式的认可;

				　　(10)因软件拷贝控诉媒体和运输超过了合理成本。</view>
				<h3>3.条款</h3>
				<view>只要你使用该软件，该授权协议就持续有效，除非由于你不遵守该协议的条款而被终止使用权利。一旦协议终止，你必须同意毁掉你所有的该软件的所有拷贝。</view>
		</popup-sure>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		ref,
		computed,
		onMounted,

	} from 'vue'
	import {
		onShow,
		onLoad,
		onUnload
	} from '@dcloudio/uni-app'

	import popupSure from "@/components/popup/popup-sure.vue"

	onUnload(() => {
		clearTimer()
	})
	let timer: any;
	let popupRef = ref < any > (null)
	const state = reactive({
		initparam: {
			username: '',
			phone: '',
			password: '',
			code: ""
		},
		second: 0,
		agreement: true,
		showPassword: true,
	})
	const yanzhengma = computed(() => {
		if (state.second == 0) {
			return '获取验证码';
		} else {
			if (state.second < 10) {
				return '重新获取0' + state.second;
			} else {
				return '重新获取' + state.second;
			}
		}
	})
	const getcode = () => {
		if (state.initparam.phone.length != 11) {
			uni.showToast({
				icon: 'none',
				title: '手机号不正确'
			});
			return;
		}
		if (state.second > 0) {
			return;
		}
		state.second = 60;
		//请求业务
		timer = setInterval(() => {
			state.second--;
			if (state.second == 0) {
				clearTimer()
			}
		}, 1000)
	}
	const clearTimer = () => {
		clearInterval(timer)
		timer = null
		state.second = 0
	}
	const toipset = () => {}
	const changePassword = () => {
		state.showPassword = !state.showPassword;
	}
	const agreementSuccess = () => {
		state.agreement = !state.agreement;
	}
	const agreementShow = () => {
		popupRef.value.open()
	}
	const change = () => {}
	const register = () => {}
	const surePopup = () => {
		popupRef.value.close()
	}
	onLoad((e) => {

	})
	const {
		initparam,
		showPassword,
		agreement,
		second
	} = toRefs(state)
</script>

<style scoped lang="less">
	.contenter {
		display: flex;
		justify-content: center;
	}

	.register-box {
		width: 70%;
	}

	.header {
		width: 500upx;
		height: 80upx;
		margin-bottom: 30upx;
		padding-top: 80upx;
		display: flex;
		justify-content: center;
	}

	.header image {
		width: 100%;
		height: 100%;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}



	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		margin-left: 16upx;
	}

	.yzm {
		color: #FF7D13;
		font-size: 24upx;
		line-height: 60upx;
		padding-left: 15upx;
		padding-right: 15upx;
		width: auto;
		height: 60upx;
		border: 1upx solid #FF7D13;
		border-radius: 30upx;
	}

	.yzms {
		color: #999999 !important;
		border: 1upx solid #999999;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34upx;
		width: 470upx;
		height: 100upx;
		line-height: 100upx;
		background: linear-gradient(-90deg, rgba(193, 25, 32, 1), rgba(238, 38, 38, 1));
		border-radius: 50upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(193, 25, 32, 0.8), rgba(238, 38, 38, 0.8));
	}

	.agreement {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.agreement image {
		width: 40upx;
		height: 40upx;
	}
</style>
