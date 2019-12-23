# API 文档


## 参数属性

| 参数 | 说明 | 类型 | 描述 |
| --- |------|:----:|-----|
| type | 输入的类型 | String | 默认text;支持text,password,textarea |
| disabled | 是否禁用输入 | Boolean | 默认false |
| maxlength | 输入的长度限制 | Number | 默认-1，表示不限制输入长度 |
| placeholder | 占位符 | String | - |
| placeholderStyle | 占位符样式 | String | 默认color:#999; |
| showPassword | 输入密码是否可见 | Boolean | 当type为password时有效 |
| autoHeight | 输入域的高度自动增高 | Boolean | 默认为false，不自动增高 |


## Example

<ai-input v-model="input" placeholder="请输入" type="password" placeholderStyle="color:#999;"></ai-input>