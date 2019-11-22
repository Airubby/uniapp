# API 文档

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| activeColor | 激活状态颜色 | String | - | #40a563 |
| deactiveColor | 未激活状态颜色 | String | - | #999999 |
| arrowColor | arrow的颜色 | String | - | #999999 |
| active | 当前步骤 | Number | - | 0 |
| arrowMargin | arrow左右距离 | Number | - | 10 |
| stepWidth | 步骤的宽度 | Number | - | 0 |
| iconSize | icons的大小 | Number | - | 16 |
| options | steps对象数组 [{title: '事件一'}] | Array | - | [] |



## Events

| 事件名 | 说明 | 参数 |
| ---- |-----| ----- |
| stepClick | 点击当前步骤的对象信息 | item |