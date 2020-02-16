# API 文档

## example
onPageScroll: function(e) {
    this.$refs.fiexedbox.selectedTab(e.scrollTop);
},

tabList: [{
    text: "图文介绍",
    navTarget: "#item1",
}, {
    text: "线路详情",
    navTarget: "#item2",
}, {
    text: "线路推荐",
    navTarget: "#item3",
}],
<ai-scroll-navfixed :tabList="tabList" ref="fiexedbox">
    <view id="item1" style="height:700px;">1菜单234234</view>
    <view id="item2" style="height:800px;">2菜单2534</view>
    <view id="item3" style="height:800px;">3菜单45345345</view>
</ai-scroll-navfixed>

id和navTarget对应