<template>
    <view class="ai-boxfixed-box">
        <view :class="{isfixed:fiexdfn}" class="ai-boxfixed" :style="{height:barHeightStyles,display:barShowStyles}">
            <view class="item" 
                v-for="(item,index) in tabList"
                :key="index" 
                :class="{ 'active':index==selectedIndex }" 
                :data-index="index"
                @tap="navTap(index)"
            >{{item.text}}</view>
        </view>
        <view class="ai-boxfixed" :style="{height:barHeightStyles}" :id="'ai-boxfixed'+barId">
            <view class="item" 
                v-for="(item,index) in tabList"
                :key="index" 
                :class="{ 'active':index==selectedIndex }" 
                :data-index="index"
                @tap="navTap(index)"
            >{{item.text}}</view>
        </view>
        <view class="ai-boxfixed-con">
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    props:{
        //是否固定导航
        barFixed:{
            type:Boolean,
            default:true
        },
        //导航高度
        barHeight:{
            type:[String,Number],
            default:44
        },
        //导航距离头部多少固定
        barTop:{
            type:[String,Number],
            default:0
        },
        //多个组件的时候给不同id
        barId:{
            type:[String,Number],
            default:0
        },
        //动画效果
        transitionShow:{
            type:Boolean,
            default:true
        },
        //动画效果延时
        duration:{
            type:[String,Number],
            default:200
        },
        //导航列表
        tabList: {
            type:Array,
            default:function () {
                return [
                    // {
                    //     // text:"text",
                    //     // navTarget:"#item1",
                    // }
                ]
            }
        }
    },
    mounted(){

    },
    onPageScroll(e){
        // this.selectedTab(e.scrollTop)  //只能在父组件中滚动监听
    },
    computed:{
        fiexdfn(){
            return this.isfixed;
        },
        barHeightStyles:function () {
            return this.barHeight?this.barHeight+'px':'44px';
        },
        barShowStyles:function(){
            return !this.isfixed?'none':'';
        },
    },
    data(){
        return{
            isfixed:false,
            selectedIndex:0,  //选择的第几个  active
            listTop:[],  //初始化保存每个box距离body顶部多少
        }
    },
	methods: {
        navTap:function(i){
            this.pageScroll(i);
        },
        pageScroll:async function(i){
            const elment = await this.barInit(i);
            let scrollTop = elment["navTargetTop"][i];
            let duration = elment["duration"];
            let viewHeight = elment["viewHeight"];
            let viewScrollTop = elment["viewScrollTop"];
            if (Math.abs(scrollTop-viewScrollTop)>viewHeight) {
                if (scrollTop>viewScrollTop) {
                    await uni.pageScrollTo({
                        scrollTop:(scrollTop-viewHeight),
                        duration:0
                    });
                }else{
                    await uni.pageScrollTo({
                        scrollTop:(scrollTop+viewHeight),
                        duration:0
                    });
                }
            }
            await uni.pageScrollTo({
                scrollTop:(scrollTop+1),
                duration:duration
            });
            // #ifndef H5
            const view = await this.queryMultipleNodes();
            viewScrollTop = view[0].scrollTop;
            if (scrollTop>viewScrollTop&&duration!==0) {
                uni.pageScrollTo({
                    scrollTop:(scrollTop+1),
                    duration: 0
                })
            }
            // #endif
        },
        selectedTab:function (y) {
            this.barInit().then((res)=>{
                let itemIndex = 0;
                for (let i = 0,len=res["navTargetTop"].length; i < len; i++) {
                    if (y >=res["navTargetTop"][i]) {
                        itemIndex = i;
                    }
                }
                this.selectedIndex = itemIndex;
            });
            if (!!this.barFixed) {
                this.showBarFixed();
            }
        },
        showBarFixed:function () {
            this.queryMultipleNodes("#ai-boxfixed"+this.barId,true).then(res => {
                let tabNav = res[0];
                if(tabNav.top<=this.barTop){
                    this.isfixed=true;
                }else{
                    this.isfixed=false;
                }
            });
        },
        barInit:async function (index){
            let navTargetTop = [];
            let duration = 0;
            let viewScrollTop = 0;
            let viewHeight = 0;
            for (let i = 0,len=this.tabList.length; i < len; i++) {
                navTargetTop[i]= await this.queryMultipleNodes(this.tabList[i]["navTarget"]).then(res => {
                    let navTarget = res[0],
                        viewPort = res[1];
                    viewHeight = viewPort.height;
                    viewScrollTop = viewPort.scrollTop;
                    const scrollTop = parseInt(navTarget.top) + viewPort.scrollTop - this.barTop - this.barHeight;
                    return scrollTop;
                });
            }
            if (!!this.transitionShow) {
                duration = this.duration;
            } 
            return {
                navTargetTop:navTargetTop,
                duration:duration,
                viewHeight:viewHeight,
                viewScrollTop:viewScrollTop
            };
        },
        queryMultipleNodes:function (e,notThis) {
            return new Promise((resolve, reject) => {
                let view = uni.createSelectorQuery();
                if (!!notThis) {
                    view.in(this);
                }
                if (!!e) {
                    view.select(e).boundingClientRect();
                }
                view.selectViewport().fields({size: true,scrollOffset: true});
                view.exec(function(res) {
                    resolve(res);
                });
                
            });
        },
			
	},
    watch: {
        
    },
    
}
</script>
<style lang="less" scoped>
    .ai-boxfixed-box{
        width: 100%;
    }
    .isfixed{
        position: fixed;
        top: 0;
        left: 0;
    }
    .ai-boxfixed{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
		background: #fff;
		z-index: 9999;
		border-bottom: 1px solid #f2f3f4;
		.item{
			height: 100%;
			display: flex;
			align-items: center;
			border-bottom: 2px solid #fff;
		}
        .active{
            border-color: #FFC900;
        }
    }

</style>
