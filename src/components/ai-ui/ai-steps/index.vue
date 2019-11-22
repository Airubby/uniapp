<template>
	<view class="ai-steps">
        <view v-for="(item,index) in options" :key="index" class="ai-step">
            <view class="step-text" @click="stepClick(item,index)" :style="{width:stepWidth<=0?'auto':stepWidth+'px'}">
                <ai-icons :color="index<active?activeColor:deactiveColor" :type="index<active?'check':'empty'" :size="iconSize"></ai-icons>
                <text class="ml5" :style="{color:index<active?activeColor:deactiveColor}">{{item.title}}</text>
            </view>
            <view class="step-arrow" v-if="index!=options.length-1" :style="{margin: '0 '+ arrowMargin + 'px' }">
                <ai-icons :color="arrowColor" type="arrowRight" :size="iconSize"></ai-icons>
            </view>
        </view>
    </view>
</template>
<style lang="less" scoped>
	.ai-steps{
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
		align-items: center;
		.ml5{
			margin-left: 5px;
		}
		.ai-step,.step-text{
			display: flex;
			align-items: center;
        }
        .step-text{
            min-width: 40px;
        }
	}
	
</style>
<script>
import aiIcons from '../ai-icons/index.vue'
	export default {
        components:{ aiIcons},
        props: {
			activeColor: {
				// 激活状态颜色
				type: String,
				default: '#40a563'
			},
			deactiveColor: {
				// 未激活状态颜色
				type: String,
				default: '#999999'
            },
            arrowColor: {
				// arrow的颜色
				type: String,
				default: '#999999'
			},
			active: {
				// 当前步骤
				type: Number,
				default: 0
            },
            arrowMargin: {
				// arrow左右距离
				type: Number,
				default: 10
            },
            stepWidth: {
				// step的宽度
				type: Number,
				default: 0
            },
            iconSize: {
				// icons大小
				type: Number,
				default: 16
			},
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据 {title: '事件一'}
		},
		created(){
			
		},
		mounted(){
			
		},
		data() {
            return {
				
            }
        },
		methods:{
			stepClick:function(item,index){
                let obj=item;
                obj["index"]=index+1;
                this.$emit("stepClick",item);
			}
		}
	}
</script>

