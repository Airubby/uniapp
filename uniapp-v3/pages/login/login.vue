<template>
	<view class="contenter bgwhite">
		<view class="status_bar"></view>
		<view class="topview">
			<text class="txt-size-normal color-697284">{{offline?"离线模式":""}}</text>
			<image src="/static/images/login/ipset.png" mode="aspectFit" class="ipsetimg" @click="toipset"></image>
		</view>
		<view class="content">
			<view>
				<image src="/static/images/login/logo.png" class="logoimg"></image>
				<view class="inputrow" :class="nameline">
					<image src="/static/images/login/account.png" class="inputimg"></image>
					<view class="uni-input-wrapper">
						<input class="uni-input txt-size-big" placeholder="请输入帐号" v-model="initparam.username"
							@input="clearInput" @focus="onFocus(0)" @blur="onBlur(0)" />
						<text class="uni-icon txt-size-big" style="padding: 12upx 8upx;" v-if="showClearIcon"
							@click="clearIcon">&#xe434;</text>
					</view>
				</view>
				<view class="inputrow" :class="psline">
					<image src="/static/images/login/password.png" class="inputimg"></image>
					<view class="uni-input-wrapper">
						<input class="uni-input txt-size-big" placeholder="请输入密码" :password="showPassword"
							v-model="initparam.password" @focus="onFocus(1)" @blur="onBlur(1)" />
						<text class="uni-icon txt-size-big" style="padding: 12upx 8upx;"
							:class="[!showPassword ? 'color-4a78ff' : 'color-9aa1ad']"
							@click="changePassword">&#xe568;</text>
					</view>
				</view>
				<text class="infor color-ffa100 txt-size-small">{{infor}}</text>
				<button class="btn-login color-white" @click="login()">登录</button>
				<view class="agreenment">
					<navigator url="/pages/login/forget" open-type="navigate">忘记密码</navigator>
					<text>|</text>
					<navigator url="/pages/login/register" open-type="navigate">注册账户</navigator>
				</view>
			</view>
		</view>

		<view class="bottomview">
			<!-- #ifdef APP-PLUS -->
			<text class="txt-size-small color-tips">本机唯一识别码</text>
			<!-- #endif -->
			<text :selectable="true" class="txt-size-small color-normal"
				style="height: 32upx;line-height: 32upx;">uniapp-demo</text>
			<image src="/static/images/login/ymk.png"></image>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		ref
	} from 'vue'
	import {
		onShow,
		onLoad,
	} from '@dcloudio/uni-app'
	const state = reactive({
		initparam: {
			username: '',
			password: ''
		},
		offline: false,
		infor: "",
		nameline: "border_bottom_line",
		psline: "border_bottom_line",
		showClearIcon: false,
		showPassword: true,
	})
	const toipset = () => {}
	const clearInput = (event) => {
		state.initparam.username = event.detail.value;
		if (event.detail.value.length > 0) {
			state.showClearIcon = true;
		} else {
			state.showClearIcon = false;
		}
	}
	const clearIcon = () => {
		state.initparam.username = '';
		state.showClearIcon = false;
	}
	const changePassword = () => {
		state.showPassword = !state.showPassword;
	}
	const onFocus = (option) => {
		if (state.infor) {
			state.infor = null;
			state.psline = 'border_bottom_line';
			state.nameline = 'border_bottom_line';
		}
		if (option == 1) {
			state.psline = 'border_bottom_line_focus';
		} else {
			state.nameline = 'border_bottom_line_focus';
		}
	}
	const onBlur = (option) => {
		if (option == 1) {
			state.psline = 'border_bottom_line';
		} else {
			state.nameline = 'border_bottom_line';
		}
	}
	const login = () => {
		uni.showToast({
			icon: 'none',
			title: '登录成功'
		});
		uni.reLaunch({
			url: '/pages/index/index',
		});
	}
	onLoad((e) => {

	})
	const {
		initparam,
		infor,
		nameline,
		psline,
		showClearIcon,
		showPassword,
		offline
	} = toRefs(state)
</script>

<style scoped lang="less">
	.top-view {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.topview {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.ipsetimg {
		height: 80upx;
		width: 80upx;
		padding: 16upx;
		box-sizing: border-box;

	}

	.content {
		padding: 200upx 100upx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #ffffff;
	}

	.btn-login {
		width: 100%;
		height: 44px;
		font-size: 16px;
		border-radius: 4px;
		background-color: #146AFB;
		margin: 30upx 0 80upx;
	}

	.logoimg {
		width: 500upx;
		height: 80upx;
		margin-bottom: 80upx;
	}

	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 0 10upx;
		flex-direction: row;
		align-items: center;
		width: calc(100% - 72upx);
	}

	.uni-input {
		height: 110upx;
		padding: 0;
		line-height: 110upx;
	}

	.inputrow {
		display: flex;
		height: 112upx;
		width: 100%;
		align-items: center;
	}

	.inputimg {
		width: 48upx;
		margin-left: 24upx;
		height: 40upx;
	}

	.infor {
		height: 80upx;
		width: 100%;
		line-height: 80upx;
		text-align: center;
	}

	.bottomview {
		position: absolute;
		bottom: 0upx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 8upx;
		box-sizing: border-box;
	}

	.bottomview image {
		height: 36upx;
		width: 96upx;
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.agreenment text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
