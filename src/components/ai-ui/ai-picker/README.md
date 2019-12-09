# API 文档

## mode属性

| 参数 | 说明 | 类型 |
| --- |------|:----:|
| half | 年月日上/下午 | String |
| date | 年月日 | String |
| dateTime | 年月日时分秒 | String |
| yearMonth | 年月 | String |
| region | 省市区 | String |
| linkage | 动态数据多级联动 | String |
| selector | 单列选择 | String |
| limitHour | 短期日期上下午时段 | String |
| limit | 短期日期时间段 | String |
| range | 日期区间 | String |



## 参数属性

| 参数 | 说明 | 类型 | 描述 |
| --- |------|:----:|-----|
| startYear | 开始年份 | Number | 默认1970，对half、date、yearMonth、dateTime、range生效 |
| endYear | 结束年份 | Number | 默认当前年份，对half、date、yearMonth、dateTime、range生效 |
| step | 分钟间隔步长 | Number | 默认为1，仅对dateTime、time生效 |
| defaultVal | 选择初始值 | Array | defaultVal="['2018','12','31']",mode=range::defaultVal="['2017','12','31','-','2019','12','31']" |
| areaCode | 省市区三级联动地区代码默认值 | Array | :areaCode="['33','3301','330108']",传此参数defaultVal不生效 |
| hideArea | 隐藏三级联动地区列 | Boolean | 仅mode=region省市区三级联动生效，隐藏三级联动地区列 |
| @confirm | 点击确认的回调获取picker结果 | Function | 输出选择的值、对应值的下标、结果 |
| @cancel | 点击取消的回调 | Function | - |
| timeout | 是否开启点击确定延迟500ms | Boolean | 默认false不开启，当快速滚动picker还未完成滚动，点击确定会出现获取不到最新值的情况 |
| themeColor | 确认按钮的主题颜色 | String | 默认值#f5a200 |
| current | 是否默认选中当前时间 | Boolean | 使用该字段defaultVal不起效，仅对mode等于half、date、yearMonth、dateTime、time、range生效 |
| disabledAfter | 是否禁用当前之后的日期 | Boolean | 仅对mode等于half、date、yearMonth3个mode生效 |
| level | 表示几级联动 | Number | 默认为2,仅mode=linkage生效 |
| linkList | 多级联动数据源 | Array | 值格式arr=[{label:"aaa",value:"10",children:[{label:"aaa",value:"10"}]}] |
| value | 动态多级联动默认值 | Array | 仅mode=linkage生效，例如默认根据id值匹配 :value="['33','3301','330108']",传此参数defaultVal不生效 |



## Events

| 事件名 | 说明 | 参数 |
| ---- |-----| ----- |
| show | 显示插件 | - |
| hide | 隐藏插件 | - |