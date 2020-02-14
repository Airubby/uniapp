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
<ai-img-preview :picList="picList" ref="imgPreview"></ai-img-preview>
this.$refs['imgPreview'].open();