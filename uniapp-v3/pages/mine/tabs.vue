<template>
	<view class="app-content">
		<view class="app-content">
			<view class="page-head">
				<view class="menuview">
					<block v-for="(item,index) in menuarray" :key="index">
						<view class="menuitem" :class="[pagination.type==item.key?'menuitemact':'menuitemnor']" @click="tomenu(item)">
							{{item.name}}
						</view>
					</block>
				</view>
			</view>
			<view class="scrollcontent">
				<scroll-view scroll-y class="scrolllist" enable-back-to-top >
					<view class="scrolllist-con">
						<block v-for="(item,index) in dataarry" :key="index">
							<view class="list-cell">
								<view class="list-cell-title">
									{{item.name}}
									<view class="title-code">| {{item.code}}</view>
								</view>
								<view class="list-cell-con">
									<view class="list-cell-left" @click="tolist(item)">
										<view class="cell-box">
											<view class="cell-box-con">
												<text class="color-second">{{infotitle}}：</text>
												<text class="color-36435b">{{item.info}}</text>
											</view>
										</view>
									</view>
									<text class="list-cell-right color-active">
										<uni-icons type="forward" size="18" color="#9aa1ad"></uni-icons>
									</text>
								</view>
							</view>
						</block>
						<view class="load-more" @click="loadMore">{{loadInfo}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive ,ref,watch,nextTick} from 'vue'
	import { onShow, onLoad,onReachBottom} from '@dcloudio/uni-app'
	
	const menu2Arr=ref([
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"2#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"3#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"2#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"3#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"2#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"3#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"2#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"3#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"2#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"3#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"2#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"3#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
		{name:"1#线路",code:"XL1630001",info:"数据中心->楼层1->101机房"},
	])
	const dataarry=ref([])
	
	const loadInfo=ref("加载更多")
	const infotitle=ref("位置")
	const menuarray=ref([
		{name:"机柜信息",key:1,infotitle:"位置"},
		{name:"线路信息",key:2,infotitle:"装机地址"},
		{name:"设备信息",key:3,infotitle:"完成时间"},
	])
	const pagination=ref({
		pageIndex: 1,
		pageCount: 20,
		type:1  //1机柜 2线路 3设备记录
	})
	const tomenu=(item)=>{
		dataarry.value=[]
		pagination.value.pageIndex=1;
		pagination.value.type=item.key
		infotitle.value=item.infotitle;
		setTimeout(()=>{
			getList()
		},300)
	}
	
	const getList=()=>{
		loadInfo.value="加载中..."
		dataarry.value=dataarry.value.concat(menu2Arr.value)
		loadInfo.value="加载更多"
	}
	getList()
	
	const loadMore=()=>{
		//这里需要判断是否下一个分页有数据回来，没有就不用再++ getList
		pagination.value.pageIndex++;
		getList()
	}
	
	
	const tolist=(item)=>{
		uni.navigateTo({
			url: "/pages/classify/edit",
		});
	}
	const goTop=()=>{
		uni.pageScrollTo({
			scrollTop:0,
			duration:300
		})
	}
	
	onReachBottom(() => {
		console.log("上拉加载刷新,scroll-view不支持,仅原生页面支持");
		loadMore()
	})
</script>

<style scoped lang="less">
	.page-head {
		height: 40px;
		width: 100%;
		background-color: #f4f4f8;
		border-bottom: 1px solid #e7e7e7;
		.menuview{
			height: 40px;
			width: 100%;
			display: flex;
			.menuitem {
				width: 33%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
			.menuitemact {
				color: #1ABC9C;
				border-bottom: 2px solid #1ABC9C;
			}
			.menuitemnor {
				color: #36435B;
				border-bottom: 2px solid transparent;
			}
		}
	}
	
	.scrollcontent {
		width: 100%;
		height: calc(100% - 42px);
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
		padding: 12px;
		.list-cell-title{
			width: 100%;
			font-weight: bold;
			display: flex;
			align-items: center;
			margin-bottom: 12px;
			.title-code{
				font-weight: normal;
				padding-left: 10px;
			}
		}
		.list-cell-con{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			color: #999;
			.list-cell-left{
				width: calc(100% - 50px);
			}
			.list-cell-right{
				width: 50px;
				text-align: right;
			}
		}
	}
	
	.load-more{
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		cursor: pointer;
		color: #999;
		letter-spacing: 5px;
	}
</style>