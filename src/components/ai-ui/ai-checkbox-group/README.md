# API 文档

## 参数属性

| 参数 | 说明 | 类型 | 描述 |
| --- |------|:----:|-----|
| params | key匹配 | Object | 默认key为value；展示为name |
| items | 复选框列表数组 | Array | - |


## Example
items:[{
        id: 1,
        name: '美国'
    },{
        id: 2,
        name: '中国',
    }
];
params:{
        label: 'name',
        value: 'id',
    },
    
current:[]
<ai-checkbox-group :items="items" v-model="current" :params="params"></ai-checkbox-group>
