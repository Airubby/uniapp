<template>
    <view style="height:100%">
        <view class="uni-swiper-tab">
            <view v-for="(tab,index) in tabBars" :key="'tab'+index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
            :id="'tab'+index" :data-current="index" @tap="tapTab">
            <img :src="tab.activeImg" v-if="tab.activeImg&&tabIndex==index">
            <img :src="tab.img" v-if="tab.img&&tabIndex!=index">
            {{tab.name}}
            </view>
            </view>
            <swiper :current="tabIndex" class="swiper-box" :duration="duration" @change="changeTab">
                <swiper-item class="swiper-item" v-for="(tab,index) in tabBars" :key="index">
                    <scroll-view scroll-y class="heightFull">
                        <slot :name="'content'+index"></slot>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>

    export default {
        props: {
            tabIndex: {
				type: Number,
				default: 0
			},
            duration: {
				type: Number,
				default: 300
			},
			tabBars: {
				type: Array,
				default () {
					return [];
				}
			},
        },
        computed: {
            
        },
        data() {
			return {
				
			}
		},
        methods: {
            async changeTab(e) {
                let index = e.target.current;
                this.tabIndex = index; //一旦访问data就会出问题
            },
			async tapTab(e) { //点击tab-bar
                if (this.tabIndex === e.target.dataset.current) {
                    return false;
                } else {
                    this.tabIndex = e.target.dataset.current
                }
            },
        }
    }
</script>

<style>
    .uni-swiper-tab{
		height: 60px;
		line-height: 60px;
		border: none;
		color:#fff;
		text-align: center;
	}
	.uni-swiper-tab .swiper-tab-list{
		color:#fff;
		line-height: 55px;
        padding: 0 20px;
        width: auto;
	}
    .swiper-tab-list img{
        vertical-align: middle;
        margin-right:5px;
    }
	.uni-swiper-tab .active{
		color:#0FFFFF;
		border-bottom: 5px solid #0fffff;
	}
	.uni-tab .swiper-box{
		height: calc(100% - 60px);
	}
	.swiper-item{
		background:#045F76;
		border-radius: 10px;
	}
</style>
