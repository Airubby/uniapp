<template>
    <view>
        <view class="uni-navbar uni-navbar-fixed">
            <view class="uni-navbar-header">
                <view class="uni-navbar-header-btns" @tap="onClickLeft">
                    <view>
                        <view class="uni-icon uni-icon-back" @click="onClick()"></view>
                    </view>
                    <slot name="left"></slot>
                </view>
                <view class="uni-navbar-container">
                    <view v-if="title.length" class="uni-navbar-container-title">{{title}}</view>
                    <!-- 标题插槽 -->
                    <slot></slot>
                </view>
                <view class="uni-navbar-header-btns">
                </view>
            </view>
        </view>
        <view style="height:60px;">...</view>
    </view>
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
        },
        computed: {
            
        },
        methods: {
            onClickLeft() {
                uni.navigateBack({
					delta: 1
				})
            },
        }
    }
</script>

<style>
    .uni-navbar {
        display: block;
        position: relative;
        width: 100%;
        background-color: #FFFFFF;
        overflow: hidden;
    }
	
	.uni-navbar view{
		line-height:60px;
	}

    .uni-navbar-shadow {
        box-shadow: 0 1px 6px #ccc;
    }

    .uni-navbar.uni-navbar-fixed {
        position: fixed;
        z-index: 998;
    }

    .uni-navbar-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        height:60px;
        line-height:60px;
        font-size: 16px;
    }
	
	.uni-navbar-header .uni-navbar-header-btns{
		display:inline-flex;
		flex-wrap:nowrap;
		flex-shrink:0;
		width: 120px;
		padding:0 12px;
	}
	
	.uni-navbar-header .uni-navbar-header-btns:first-child{
		padding-left:0;
	}
	.uni-navbar-header .uni-navbar-header-btns:last-child{
		width: 60px;
	}
	.uni-navbar-container{
		width:100%;
		margin:0 10px;
	}
	.uni-navbar-container-title{
		font-size:30px;
		text-align:center;
		padding-right: 60px;
	}
</style>
