<template>
	<view v-if="isShow" class="picker">
		<!-- 日期选择器 -->
		<view v-if="type!='time'" class="picker-modal">
			<view class="picker-modal-header">
				<view class="picker-icon picker-icon-zuozuo" :hover-stay-time="100" hover-class="picker-icon-active" @click="onSetYear('-1')"></view>
				<view class="picker-icon picker-icon-zuo" :hover-stay-time="100" hover-class="picker-icon-active" @click="onSetMonth('-1')"></view>
				<text class="picker-modal-header-title">{{title}}</text>
				<view class="picker-icon picker-icon-you" :hover-stay-time="100" hover-class="picker-icon-active" @click="onSetMonth('+1')"></view>
				<view class="picker-icon picker-icon-youyou" :hover-stay-time="100" hover-class="picker-icon-active" @click="onSetYear('+1')"></view>
			</view>
			<swiper class="picker-modal-body" :circular="true" :duration="200" :skip-hidden-item-layout="true" :current="calendarIndex" @change="onSwiperChange">
				<swiper-item class="picker-calendar" v-for="(calendar,calendarIndex2) in calendars" :key="calendarIndex2">
					<view class="picker-calendar-view" v-for="(week,index) in weeks" :key="index - 7">
						<view class="picker-calendar-view-item">{{week}}</view>
					</view>
					<view class="picker-calendar-view" v-for="(date,dateIndex) in calendar" :key="dateIndex" @click="onSelectDate(date)">
						<!-- 背景样式 -->
						<view v-show="date.bgStyle.type" :class="'picker-calendar-view-'+date.bgStyle.type" :style="{background: date.bgStyle.background}"></view>
						<!-- 正常和选中样式 -->
						<view class="picker-calendar-view-item" :style="{opacity: date.statusStyle.opacity, color: date.statusStyle.color, background: date.statusStyle.background}">
							<text>{{date.title}}</text>
						</view>
						<!-- 小圆点样式 -->
						<view class="picker-calendar-view-dot" :style="{opacity: date.dotStyle.opacity, background: date.dotStyle.background}"></view>
						<!-- 信息样式 -->
						<view v-show="date.tips" class="picker-calendar-view-tips">{{date.tips}}</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="picker-modal-footer">
				<view class="picker-modal-footer-info">
					<block v-if="isMultiSelect">
						<view class="picker-display">
							<text>{{beginText}}日期</text>
							<text class="picker-display-text">{{BeginTitle}}</text>
							<view v-if="isContainTime" class="picker-display-link" :hover-stay-time="100" hover-class="picker-display-link-active"
							 :style="{color}" @click="onShowTimePicker('begin')">{{BeginTimeTitle}}</view>
						</view>
						<view class="picker-display">
							<text>{{endText}}日期</text>
							<text class="picker-display-text">{{EndTitle}}</text>
							<view v-if="isContainTime" class="picker-display-link" :hover-stay-time="100" hover-class="picker-display-link-active"
							 :style="{color}" @click="onShowTimePicker('end')">{{EndTimeTitle}}</view>
						</view>
					</block>
					<block v-else>
						<view class="picker-display">
							<text>当前选择</text>
							<text class="picker-display-text">{{BeginTitle}}</text>
							<view v-if="isContainTime" class="picker-display-link" :hover-stay-time="100" hover-class="picker-display-link-active"
							 :style="{color}" @click="onShowTimePicker('begin')">{{BeginTimeTitle}}</view>
						</view>
					</block>
				</view>
				<view class="picker-modal-footer-btn">
					<view class="picker-btn" :hover-stay-time="100" hover-class="picker-btn-active" @click="onCancel">取消</view>
					<view class="picker-btn" :style="{color}" :hover-stay-time="100" hover-class="picker-btn-active" @click="onConfirm">确定</view>
				</view>
			</view>
		</view>
		<!-- 时间选择器 -->
		<view v-if="showTimePicker" class="picker">
			<view class="picker-modal picker-time">
				<view class="picker-modal-header">
					<text class="picker-modal-header-title">选择日期</text>
				</view>
				<picker-view class="picker-modal-time" indicator-class="picker-modal-time-item" :value="timeValue" @change="onTimeChange">
					<picker-view-column>
						<view v-for="(v,i) in 24" :key="i">{{i<10?'0'+i:i}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view v-for="(v,i) in 60" :key="i">{{i<10?'0'+i:i}}分</view>
					</picker-view-column>
					<picker-view-column v-if="showSeconds">
						<view v-for="(v,i) in 60" :key="i">{{i<10?'0'+i:i}}秒</view>
					</picker-view-column>
				</picker-view>
				<view class="picker-modal-footer">
					<view class="picker-modal-footer-info">
						<view class="picker-display">
							<text>当前选择</text>
							<text class="picker-display-text">{{PickerTimeTitle}}</text>
						</view>
					</view>
					<view class="picker-modal-footer-btn">
						<view class="picker-btn" :hover-stay-time="100" hover-class="picker-btn-active" @click="onCancelTime">取消</view>
						<view class="picker-btn" :style="{color}" :hover-stay-time="100" hover-class="picker-btn-active" @click="onConfirmTime">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 工具函数库
	 */
	const DateTools = {
		/**
		 * 获取公历节日
		 * @param date Date对象
		 */
		getHoliday(date) {
			let holidays = {
				'0101': '元旦',
				'0214': '情人',
				'0308': '妇女',
				'0312': '植树',
				'0401': '愚人',
				'0501': '劳动',
				'0504': '青年',
				'0601': '儿童',
				'0701': '建党',
				'0801': '建军',
				'0903': '抗日',
				'0910': '教师',
				'1001': '国庆',
				'1031': '万圣',
				'1224': '平安',
				'1225': '圣诞'
			};
			let value = this.format(date, 'mmdd');
			if (holidays[value]) return holidays[value];
			return false;
		},
		/**
		 * 解析标准日期格式
		 * @param s 日期字符串
		 * @return 返回Date对象
		 */
		parse: s => new Date(s.replace(/(年|月|-)/g, '/').replace(/(日)/g, '')),
		/**
		 * 比较日期是否为同一天
		 * @param a Date对象
		 * @param b Date对象
		 * @return Boolean
		 */
		isSameDay: (a, b) => a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear() && a.getDate() == b.getDate(),
		/**
		 * 格式化Date对象
		 * @param d 日期对象
		 * @param f 格式字符串
		 * @return 返回格式化后的字符串
		 */
		format(d, f) {
			var o = {
				"m+": d.getMonth() + 1,
				"d+": d.getDate(),
				"h+": d.getHours(),
				"i+": d.getMinutes(),
				"s+": d.getSeconds(),
				"q+": Math.floor((d.getMonth() + 3) / 3),
			};
			if (/(y+)/.test(f))
				f = f.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(f))
					f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return f;
		},
		/**
		 * 用于format格式化后的反解析
		 * @param s 日期字符串
		 * @param f 格式字符串
		 * @return 返回Date对象
		 */
		inverse(s, f) {
			var o = {
				"y": '',
				"m": '',
				"d": '',
				"h": '',
				"i": '',
				"s": '',
			};
			let d = new Date();
			if (s.length != f.length) return d;
			for (let i in f)
				if (o[f[i]] != undefined) o[f[i]] += s[i];
			if (o.y) d.setFullYear(o.y.length < 4 ? (d.getFullYear() + '').substr(0, 4 - o.y.length) + o.y : o.y);
			o.m && d.setMonth(o.m - 1, 1);
			o.d && d.setDate(o.d - 0);
			o.h && d.setHours(o.h - 0);
			o.i && d.setMinutes(o.i - 0);
			o.s && d.setSeconds(o.s - 0);
			return d;
		},
		/**
		 * 获取日历数组（42天）
		 * @param date 日期对象或日期字符串
		 * @param proc 处理日历(和forEach类似)，传递一个数组中的item
		 * @return Array
		 */
		getCalendar(date, proc) {
			let it = new Date(date),
				calendars = [];
			it.setDate(1);
			it.setDate(it.getDate() - ((it.getDay() == 0 ? 7 : it.getDay()) - 1)); //偏移量
			for (let i = 0; i < 42; i++) {
				let tmp = {
					dateObj: new Date(it),
					title: it.getDate(),
					isOtherMonth: it.getMonth() < date.getMonth() || it.getMonth() > date.getMonth()
				};
				calendars.push(Object.assign(tmp, proc ? proc(tmp) : {}));
				it.setDate(it.getDate() + 1);
			}
			return calendars;
		},
		/**
		 * 获取日期到指定的月份1号(不改变原来的date对象)
		 * @param d Date对象
		 * @param v 指定的月份
		 * @return Date对象
		 */
		getDateToMonth(d, v) {
			let n = new Date(d);
			n.setMonth(v, 1);
			return n;
		},
		/**
		 * 把时间数组转为时间字符串
		 * @param t Array[时,分,秒]
		 * @param showSecinds 是否显示秒
		 * @return 字符串 时:分[:秒]
		 */
		formatTimeArray(t, s) {
			let r = [...t];
			if (!s) r.length = 2;
			r.forEach((v, k) => r[k] = ('0' + v).slice(-2));
			return r.join(':');
		}
	};

	export default {
		props: {
			//颜色
			color: {
				type: String,
				default: '#409eff'
			},
			//是否显示秒 针对type为datetime或time时生效
			showSeconds: {
				type: Boolean,
				default: false
			},
			//初始的值
			value: [String, Array],
			//类型date time datetime range rangetime
			type: {
				type: String,
				default: 'range'
			},
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			//初始格式
			format: {
				type: String,
				default: ''
			},
			//显示公历节日
			showHoliday: {
				type: Boolean,
				default: true
			},
			//显示提示
			showTips: {
				type: Boolean,
				default: false
			},
			//开始文案 针对type为范围选择时生效
			beginText: {
				type: String,
				default: '开始'
			},
			//结束文案 针对type为范围选择时生效
			endText: {
				type: String,
				default: '结束'
			}
		},
		data() {
			return {
				isShow: false, //是否显示
				isMultiSelect: false, //是否为多选
				isContainTime: false, //是否包含时间
				date: {}, //当前日期对象
				weeks: ["一", "二", "三", "四", "五", "六", "日"],
				title: '初始化', //标题
				calendars: [[],[],[]], //日历数组
				calendarIndex: 1, //当前日历索引
				checkeds: [], //选中的日期对象集合
				showTimePicker: false, //是否显示时间选择器
				timeValue: [0, 0, 0], //时间选择器的值
				timeType: 'begin', //当前时间选择的类型
				beginTime: [0, 0, 0], //当前所选的开始时间值
				endTime: [0, 0, 0], //当前所选的结束时间值
			};
		},
		methods: {
			//设置值
			setValue(value) {
				this.date = new Date();
				this.checkeds = [];
				this.isMultiSelect = this.type.indexOf('range') >= 0;
				this.isContainTime = this.type.indexOf('time') >= 0;
				//将字符串解析为Date对象
				let parseDateStr = (str) => (this.format ? DateTools.inverse(str, this.format) : DateTools.parse(str));
				if (value) {
					if (this.isMultiSelect) {
						Array.isArray(value) && value.forEach((dateStr, index) => {
							let date = parseDateStr(dateStr);
							let time = [date.getHours(), date.getMinutes(), date.getSeconds()];
							if (index == 0) this.beginTime = time;
							else this.endTime = time;
							this.checkeds.push(date);
						});
					} else {
						if (this.type == 'time') {
							let date = parseDateStr('2019/1/1 ' + value);
							this.beginTime = [date.getHours(), date.getMinutes(), date.getSeconds()];
							this.onShowTimePicker('begin');
						} else {
							this.checkeds.push(parseDateStr(value));
							if (this.isContainTime) this.beginTime = [
								this.checkeds[0].getHours(),
								this.checkeds[0].getMinutes(),
								this.checkeds[0].getSeconds()
							];
						}
					}
					if (this.checkeds.length) this.date = new Date(this.checkeds[0]);
				} else {
					if (this.isContainTime) {
						this.beginTime = [this.date.getHours(), this.date.getMinutes(), this.date.getSeconds()];
						if (this.isMultiSelect) this.endTime = [...this.beginTime];
					}
					this.checkeds.push(new Date(this.date));
				}
				if (this.type != 'time') this.refreshCalendars(true);
				else this.onShowTimePicker('begin');
			},
			//改变年份
			onSetYear(value) {
				this.date.setFullYear(this.date.getFullYear() + parseInt(value));
				this.refreshCalendars(true);
			},
			//改变月份
			onSetMonth(value) {
				this.date.setMonth(this.date.getMonth() + parseInt(value));
				this.refreshCalendars(true);
			},
			//时间选择变更
			onTimeChange(e) {
				this.timeValue = e.detail.value;
			},
			//设置时间选择器的显示状态
			onShowTimePicker(type) {
				this.showTimePicker = true;
				this.timeType = type;
				this.timeValue = type == 'begin' ? [...this.beginTime] : [...this.endTime];
			},
			//处理日历
			procCalendar(item) {
				//定义初始样式
				item.statusStyle = {
					opacity: 1,
					color: item.isOtherMonth ? '#ddd' : '#000',
					background: 'transparent'
				};
				item.bgStyle = {
					type: '',
					background: 'transparent'
				};
				item.dotStyle = {
					opacity: 1,
					background: 'transparent'
				};
				item.tips = "";
				//标记今天的日期
				if (DateTools.isSameDay(new Date(), item.dateObj)) {
					item.statusStyle.color = this.color;
					if (item.isOtherMonth) item.statusStyle.opacity = 0.3;
				}
				//标记选中项
				this.checkeds.forEach(date => {
					if (DateTools.isSameDay(date, item.dateObj)) {
						item.statusStyle.background = this.color;
						item.statusStyle.color = '#fff';
						item.statusStyle.opacity = 1;
						if (this.isMultiSelect && this.showTips) item.tips = this.beginText;
					}
				});
				//节假日或今日的日期标点
				if (item.statusStyle.background != this.color) {
					let holiday = this.showHoliday ? DateTools.getHoliday(item.dateObj) : false;
					if (holiday || DateTools.isSameDay(new Date(), item.dateObj)) {
						item.title = holiday || item.title;
						item.dotStyle.background = this.color;
						if (item.isOtherMonth) item.dotStyle.opacity = 0.2;
					}
				} else {
					item.title = item.dateObj.getDate();
				}
				//有两个日期
				if (this.checkeds.length == 2) {
					if (DateTools.isSameDay(this.checkeds[0], item.dateObj)) { //开始日期
						item.bgStyle.type = 'bgbegin';
					}
					if (DateTools.isSameDay(this.checkeds[1], item.dateObj)) { //结束日期
						if (this.isMultiSelect && this.showTips) item.tips = item.bgStyle.type ? this.beginText + ' / ' + this.endText : this.endText;
						if (!item.bgStyle.type) { //开始日期不等于结束日期
							item.bgStyle.type = 'bgend';
						} else {
							item.bgStyle.type = '';
						}
					}
					if (!item.bgStyle.type && (+item.dateObj > +this.checkeds[0] && +item.dateObj < +this.checkeds[1])) { //中间的日期
						item.bgStyle.type = 'bg';
						item.statusStyle.color = this.color;
					}
					if (item.bgStyle.type) {
						item.bgStyle.background = this.color;
						item.dotStyle.opacity = 1;
						item.statusStyle.opacity = 1;
					}
				}
			},
			//刷新日历
			refreshCalendars(refresh = false) {
				let date = new Date(this.date);
				let before = DateTools.getDateToMonth(date, date.getMonth() - 1);
				let after = DateTools.getDateToMonth(date, date.getMonth() + 1);
				if (this.calendarIndex == 0) {
					if(refresh) this.calendars.splice(0, 1, DateTools.getCalendar(date, this.procCalendar));
					this.calendars.splice(1, 1, DateTools.getCalendar(after, this.procCalendar));
					this.calendars.splice(2, 1, DateTools.getCalendar(before, this.procCalendar));
				} else if (this.calendarIndex == 1) {
					this.calendars.splice(0, 1, DateTools.getCalendar(before, this.procCalendar));
					if(refresh) this.calendars.splice(1, 1, DateTools.getCalendar(date, this.procCalendar));
					this.calendars.splice(2, 1, DateTools.getCalendar(after, this.procCalendar));
				} else if (this.calendarIndex == 2) {
					this.calendars.splice(0, 1, DateTools.getCalendar(after, this.procCalendar));
					this.calendars.splice(1, 1, DateTools.getCalendar(before, this.procCalendar));
					if(refresh) this.calendars.splice(2, 1, DateTools.getCalendar(date, this.procCalendar));
				}
				this.title = DateTools.format(this.date, 'yyyy年mm月');
			},
			//滑块切换
			onSwiperChange(e) {
				this.calendarIndex = e.detail.current;
				let calendar = this.calendars[this.calendarIndex];
				this.date = new Date(calendar[22].dateObj); //取中间一天，保证是当前的月份
				this.refreshCalendars();
			},
			//选中日期
			onSelectDate(date) {
				if (~this.type.indexOf('range') && this.checkeds.length == 2) this.checkeds = [];
				else if (!(~this.type.indexOf('range')) && this.checkeds.length) this.checkeds = [];
				this.checkeds.push(new Date(date.dateObj));
				this.checkeds.sort((a, b) => a - b); //从小到大排序
				this.calendars.forEach(calendar => {
					calendar.forEach(this.procCalendar); //重新处理
				});
			},
			//时间选择取消
			onCancelTime() {
				this.showTimePicker = false;
				this.type == 'time' && this.onCancel();
			},
			//时间选择确定
			onConfirmTime() {
				if (this.timeType == 'begin') this.beginTime = this.timeValue;
				else this.endTime = this.timeValue;
				this.showTimePicker = false;
				this.type == 'time' && this.onConfirm();
			},
			//取消
			onCancel() {
				this.$emit('cancel', false);
			},
			//确定
			onConfirm() {
				let result = {
					value: null,
					date: null
				};
				//定义默认格式
				let defaultFormat = {
					'date': 'yyyy/mm/dd',
					'time': 'hh:ii' + (this.showSeconds ? ':ss' : ''),
					'datetime': ''
				};
				defaultFormat['datetime'] = defaultFormat.date + ' ' + defaultFormat.time;
				let fillTime = (date, timeArr) => {
					date.setHours(timeArr[0], timeArr[1]);
					if (this.showSeconds) date.setSeconds(timeArr[2]);
				};
				if (this.type == 'time') {
					let date = new Date();
					fillTime(date, this.beginTime);
					result.value = DateTools.format(date, this.format ? this.format : defaultFormat.time);
					result.date = date;
				} else {
					if (this.isMultiSelect) {
						let values = [],
							dates = [];
						if (this.checkeds.length < 2) return uni.showToast({
							icon: 'none',
							title: '请选择两个日期'
						});
						this.checkeds.forEach((date, index) => {
							let newDate = new Date(date);
							if (this.isContainTime) {
								let time = [this.beginTime, this.endTime];
								fillTime(newDate, time[index]);
							}
							values.push(DateTools.format(newDate, this.format ? this.format : defaultFormat[this.isContainTime ?
								'datetime' : 'date']));
							dates.push(newDate);
						});
						result.value = values;
						result.date = dates;
					} else {
						let newDate = new Date(this.checkeds[0]);
						if (this.isContainTime) {
							newDate.setHours(this.beginTime[0], this.beginTime[1]);
							if (this.showSeconds) newDate.setSeconds(this.beginTime[2]);
						}
						result.value = DateTools.format(newDate, this.format ? this.format : defaultFormat[this.isContainTime ?
							'datetime' : 'date']);
						result.date = newDate;
					}
				}
				this.$emit('confirm', result);
			}
		},
		computed: {
			BeginTitle() {
				let value = '未选择';
				if (this.checkeds.length) value = DateTools.format(this.checkeds[0], 'yy/mm/dd');
				return value;
			},
			EndTitle() {
				let value = '未选择';
				if (this.checkeds.length == 2) value = DateTools.format(this.checkeds[1], 'yy/mm/dd');
				return value;
			},
			PickerTimeTitle() {
				return DateTools.formatTimeArray(this.timeValue, this.showSeconds);
			},
			BeginTimeTitle() {
				return this.BeginTitle != '未选择' ? DateTools.formatTimeArray(this.beginTime, this.showSeconds) : '';
			},
			EndTimeTitle() {
				return this.EndTitle != '未选择' ? DateTools.formatTimeArray(this.endTime, this.showSeconds) : '';
			}
		},
		watch: {
			show(newValue, oldValue) {
				newValue && this.setValue(this.value);
				this.isShow = newValue;
			},
			value(newValue, oldValue) {
				setTimeout(()=>{
					this.setValue(newValue);
				}, 0);
			}
		}
	}
</script>

<style lang="less" scoped>
	@z-index: 100;
	@cell-spacing: 20upx;
	@calendar-size: 630upx;
	@calendar-item-size: 90upx;

	.picker {
		position: fixed;
		z-index: @z-index;
		background: rgba(255, 255, 255, 0);
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		font-size: 28upx;

		&-btn {
			padding: @cell-spacing*0.5 @cell-spacing;
			border-radius: 12upx;
			color: #666;

			&-active {
				background: rgba(0, 0, 0, .1);
			}
		}

		&-display {
			color: #666;

			&-text {
				color: #000;
				margin: 0 @cell-spacing*0.5;
			}

			&-link {
				display: inline-block;

				&-active {
					background: rgba(0, 0, 0, .1);
				}
			}
		}

		&-time {
			width: @calendar-size - 80upx !important;
			left: ((750upx - @calendar-size) / 2 + 40upx) !important;
		}

		&-modal {
			background: #fff;
			position: absolute;
			top: 50%;
			left: (750upx - @calendar-size) / 2;
			width: @calendar-size;
			transform: translateY(-50%);
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
			border-radius: 12upx;

			&-header {
				text-align: center;
				line-height: 80upx;
				font-size: 32upx;

				&-title {
					display: inline-block;
					width: 40%;
				}

				.picker-icon {
					display: inline-block;
					line-height: 50upx;
					width: 50upx;
					height: 50upx;
					border-radius: 50upx;
					text-align: center;
					margin: 10upx;
					background: #fff;
					font-size: 36upx;

					&-active {
						background: rgba(0, 0, 0, .1);
					}
				}
			}

			&-body {
				width: @calendar-size !important;
				height: @calendar-size !important;
				position: relative;
			}

			&-time {
				width: 100%;
				height: 180upx;
				text-align: center;
				line-height: 60upx;
			}

			&-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: @cell-spacing;

				&-info {
					flex-grow: 1;
				}

				&-btn {
					flex-shrink: 0;
					display: flex;
				}
			}
		}

		&-calendar {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			&-view {
				position: relative;
				width: @calendar-item-size;
				height: @calendar-item-size;
				text-align: center;

				&-bgbegin,
				&-bg,
				&-bgend,
				&-item,
				&-dot,
				&-tips {
					position: absolute;
					transition: .2s;
				}

				&-bgbegin,
				&-bg,
				&-bgend {
					opacity: .15;
					height: 80%;
				}

				&-bg {
					left: 0;
					top: 10%;
					width: 100%;
				}

				&-bgbegin {
					border-radius: @calendar-item-size 0 0 @calendar-item-size;
					top: 10%;
					left: 10%;
					width: 90%;
				}

				&-bgend {
					border-radius: 0 @calendar-item-size @calendar-item-size 0;
					top: 10%;
					left: 0%;
					width: 90%;
				}

				&-item {
					left: 5%;
					top: 5%;
					width: 90%;
					height: 90%;
					border-radius: @calendar-item-size;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				&-dot {
					right: 10%;
					top: 10%;
					width: 12upx;
					height: 12upx;
					border-radius: 12upx;
				}

				&-tips {
					bottom: 100%;
					left: 50%;
					transform: translateX(-50%);
					background: #4E4B46;
					color: #fff;
					border-radius: 12upx;
					padding: 10upx 20upx;
					font-size: 24upx;
					width: max-content;
					margin-bottom: 5px;
					pointer-events: none;

					&:after {
						content: "";
						position: absolute;
						top: 100%;
						left: 50%;
						transform: translateX(-50%);
						width: 0;
						height: 0;
						border-style: solid;
						border-width: 5px 5px 0 5px;
						border-color: #4E4B46 transparent transparent transparent;
					}
				}
			}
		}
	}

	@font-face {
		font-family: "mxdatepickericon";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMYAAsAAAAACBgAAALMAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDIgqDRIJiATYCJAMUCwwABCAFhG0HSRvfBsg+QCa3noNAyAQ9w6GDvbwpNp2vloCyn8bD/x+y+/5qDhtj+T4eRVEcbsCoKMFASzCgLdDkmqYDwgxkWQ6YH5L/YnppOlLEjlnter43YRjU7M6vJ3iGADVAgJn5kqjv/wEii23T86UsAQT+04fV+o97VTMx4PPZt4DlorLXwIQiGMA5uhaVrBWqGHfQXcTEiE+PE+g2SUlxWlLVBHwUYFMgrgwSB3wstTKSGzqF1nOyiGeeOtNjV4An/vvxR58PSc3AzrMViyDvPo/7dVEUzn5GROfIWAcU4rLXfMFdhte56y4We9gGNEVIezkBOOaQXUrbTf/hJVkhGpDdCw7dSOEzByMEn3kIic98hMxnAfeFPKWCbjRcA148/HxhCEkaA94eGWFaGolsblpaWz8/Po2WVuNHh1fmBpZHIpqal9fOjizhTteY+RZ9rv02I/pq0W6QVH3pSncBz3m55r9ZIPycHfmenvxe4uyutIgfT5u4bgkDusl9gcF0rnfnz+b2NpSaQWBFeu8GIL1xQj5AH/6FAsEr/50F28e/gA9ny6KjLrxIp0TE+UucmQOl5AFNLXkzZufWamWHYEI39PEP2If97CMdm51N6DSmIekwAVmneXTBr0PVYx+aTgfQbU3p+R4jKHdRurBq0oEw6AKSfm+QDbpGF/w3VOP+oBnMHbqdx409FjP4RRHHkAj5IWgQiBUjHfMTuQ1Icpg5avI4sQVRu8EHdWptM1aKrIjuscfeL+kZwxBTYoElztOQ2UygjRIjEphaZsyWodHgvm9SC8QC/JygEA6DiCDeEMhAQFhhOpvxa/18A0TiYMahIy0L2hYIZWeYH9JR085Al4qts1re5St2/SR6DINBGEVYQCWOETHDMAHZ+pcZIQJGTV4RtMmg8UbhuWL1+VLLA2RFHYC71kiRo0SNpjwQh8pj2EFU3oTNmS1WqgIA') format('woff2');
	}

	.picker-icon {
		font-family: "mxdatepickericon" !important;
	}

	.picker-icon-you:before {
		content: "\e63e";
	}

	.picker-icon-zuo:before {
		content: "\e640";
	}

	.picker-icon-zuozuo:before {
		content: "\e641";
	}

	.picker-icon-youyou:before {
		content: "\e642";
	}
</style>
