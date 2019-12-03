# API 文档

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| action | 上传的服务器地址 | String | - | - |
| autoUpload | 是否自动上传 | Boolean | true,false | true |
| data | 上传的附加参数 | Object | - | {} |
| name | 上传文件字段名 | String | - | file |



## Events

| 事件名 | 说明 | 参数 |
| ---- |-----| ----- |
| submit | 手动上传图片 | 图片地址路径 |


## Example

| 事件名 |
| --------- |
| <ai-upload-image v-model="imgUrl" action="127.0.0.1" @success="success" @fail="fail"></ai-upload-image> |