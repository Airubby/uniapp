# API 文档

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| show | 是否显示 | Boolean | true, false | false |
| type | 日期格式选择,可选值：date（日期）、time（时间）、datetime（日期时间）、range（日期范围）、rangetime（日期时间范围） | String | date,time,datetime,range,rangetime | date |
| color | 选择控件的颜色 | String | - | #409eff |
| format | 自定义格式(y年、m月、d日、h时、i分、s秒) | String | - | - |
| value | 设置显示的值（如果用了format需要个format格式一致，否则需要标准的能被Date解析的字符串（time除外）） | String, Array | - | - |
| showSeconds | 是否显示秒（type为datetime/time时生效） | Boolean | true, false | false |
| showHoliday | 是否显示公历节日 | Boolean | true, false | true |
| showTips | 是否显示提示文字（type为range/rangetime时生效） | Boolean | true, false | false |
| beginText | 开始文案（type为datetime/time时生效） | String | - | 开始 |
| endText | 结束文案（type为datetime/time时生效） | String | - | 结束 |


## Events

| 事件名 | 说明 | 参数 |
| ---- |-----| ----- |
| confirm | 确认选择事件 ConfirmObject型 | e |
| cancel | 取消选择事件(接收一个false) Boolean型 | e |