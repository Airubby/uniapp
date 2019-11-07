<template>
    <radio-group @change="radioChange" class="radio-group">
        <label v-for="(item, index) in items" :key="item.value">
            <view class="radio-group-btn">
                <radio :value="item.value" :checked="item.value === value" />
            </view>
            <view class="radio-group-text" :class="{'radio-active':item.value === value}">{{item.name}}</view>
        </label>
    </radio-group>
</template>

<script>
    export default {
        props: {
            value: {
				type: String,
				default: ""
			},
			items: {
				type: Array,
				default () {
					return []; //{value:"value",name:"name"}
				}
			},
        },
        mounted(){
        },  
        computed: {
            
        },
        data() {
			return {
				
			}
		},
        methods: {
            radioChange(evt) {
                this.$emit('input', evt.target.value);
			}
        }
    }
</script>
<style scoped>
	.radio-group{
		display:flex;
	}
	.radio-group-btn{
		display:none;
	}
	.radio-group-text{
		border: 1px solid #ccc;
		padding: 5px 12px;
		border-radius: 3px;
		font-size: 14px;
		cursor: pointer;
	}
	.radio-group-text:hover{
		border-color: #007AFF;
		color: #007AFF;
	}
	.radio-active.radio-group-text{
		border-color: #007AFF;
		background: #007AFF;
		color: #fff;
	}
	.radio-active.radio-group-text:hover{
		background: #007AFF;
	}
</style>
