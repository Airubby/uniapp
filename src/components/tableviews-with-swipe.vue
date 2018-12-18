<template>
	<view class="uni-table-view-cell">
    <view class="uni-slider-left">
      <slot name="sliderLeft"></slot>
    </view>
    <view class="uni-slider-handle uni-table">
      <view class="uni-table-cell">
        <slot name="content"></slot>
      </view>
    </view>
    <view class="uni-slider-right">
      <slot name="sliderRight"></slot>
    </view>
  </view>
</template>

<script>
	export default {
		name: 'tableviews-with-swipe',
		props: {
			
		},
    mounted() {
      let cell,a,CLASS_ACTIVE="uni-active";
      let timer,translateX = 0;
      let lastTranslateX = 0 ;
      let sliderActionLeftWidth = 0;
      let sliderActionRightWidth = 0;
      let toggleActive=function(isActive) {
        
      };
      window.addEventListener("touchstart",function(event){
        if(event.target.offsetParent.className=='uni-table-view-cell'){
          this.sliderLeft=event.target.offsetParent.firstElementChild.offsetWidth;
          this.sliderRight=event.target.offsetParent.lastElementChild.offsetWidth;
          this.targetTouches=event.targetTouches[0].clientX;
        }
        // console.log(event)
      })
      window.addEventListener("touchmove", function(event) {
        console.log(event)
        console.log(this.targetTouches)
        if(this.sliderLeft!=0&&this.targetTouches<event.targetTouches[0].clientX){
          event.target.style.transform="translateX("+this.sliderLeft+"px)";
          event.target.offsetParent.firstElementChild.style.transform="translateX(0)";
        }
        if(this.sliderRight!=0&&this.targetTouches>event.targetTouches[0].clientX){
          event.target.style.transform="translateX(-"+this.sliderLeft+"px)";
          event.target.offsetParent.lastElementChild.style.transform="translateX(0)";
        }
        
      });
    },
		data() {
			return {
				sliderLeft:0,
        sliderRight:0,
        targetTouches:0,
			}
		},
    onLoad: function () {
     
		},
		watch: {
			
		},
		computed: {
			
		},
		methods: {
			
		},
	}
</script>

<style>
	.uni-table-view-cell{
    position: relative;
    overflow: hidden;
    padding: 11upx 15upx;
    -webkit-touch-callout: none;
  }
  .uni-table-view-cell>.uni-slider-left, .uni-table-view-cell>.uni-slider-right {
    position: absolute;
    top: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 100%;
  }
  .uni-table-view-cell>.uni-slider-left {
      left: 0;
      -webkit-transition: -webkit-transform 0ms ease;
      transition: transform 0ms ease;
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
  }
  .uni-table-view-cell>.uni-slider-right {
      right: 0;
      -webkit-transition: -webkit-transform 0ms ease;
      transition: transform 0ms ease;
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
  }
  .uni-table-view-cell>.uni-slider-handle, 
  .uni-table-view-cell>.uni-slider-left, 
  .uni-table-view-cell>.uni-slider-right {
      -webkit-transition: -webkit-transform 300ms ease;
      transition: transform 300ms ease;
  }
</style>
