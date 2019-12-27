<template>
    <radio-group @change="radioChange" class="radio-group" ref="radio">
        <label v-for="(item, index) in items" :key="item[params.value]" class="radio-label">
            <view class="radio-group-btn">
                <radio :value="item[params.value].toString()" :checked="item[params.value].toString() === value.toString()" />
            </view>
            <view class="radio-group-text" :class="{'radio-active':item[params.value].toString() === value.toString()}">{{item[params.label]}}</view>
        </label>
    </radio-group>
</template>

<script>
    export default {
        props: {
            value: {
				type: [String,Number],
				default: ""
			},
			params:{
				type:Object,
				default(){
					return {
						label: 'label',
						value: 'value',
					}
				}
			},
			items: {
				type: Array,
				default () {
					return [];
				}
			},
        },
        mounted(){
			// this.$refs.radio.style.setProperty("--color",'#ff0000');
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
			}, 
        }
    }
</script>
<style scoped lang="less">
	.radio-group{
		display:flex;
		flex-wrap:wrap;
		--color:#007AFF;
	}
	.radio-label{
		margin-right:5px;
		margin-bottom: 5px;
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
		border-color: var(--color);
		color: var(--color);
	}
	.radio-active.radio-group-text{
		border-color: var(--color);
		background-color: var(--color);
		color: #fff;
	}
	.radio-active.radio-group-text:hover{
		background-color: var(--color);
	}
</style>
