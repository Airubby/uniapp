# API 文档

## example

picList : [
    {
        picPath: '/static/images/hotel1.png'
    },
    {
        picPath: '/static/images/hotel2.png'
    },
    {
        picPath: '/static/images/hotel3.png'
    },
]
current:0   默认展示第几个
<ai-img-preview :picList="picList" :current="current" ref="imgPreview"></ai-img-preview>
this.$refs['imgPreview'].open();