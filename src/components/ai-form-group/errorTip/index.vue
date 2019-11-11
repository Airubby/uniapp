<template>
     <view class="boolean-x-error-tip" :class="[errorTxtClassName] ">{{errorTxt}}</view>
</template>

<script>
    export default {
        name:"errorTip",
        props:{
            errorTxt:{
                type:String,
				required:true
            },
			errorTxtClassName:{
				type:String,
				required:true
			}
        }
    }
</script>
<style scoped>
</style>