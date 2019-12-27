<template>
	<checkbox-group @change="checkboxChange" class="checkbox-group">
		<label v-for="item in items" :key="item[params.value]" class="checkbox-lable">
			<view class="checkbox-group-btn">
				<checkbox :value="item[params.value].toString()" :checked="value.map(String).indexOf(item[params.value].toString())!=-1" />
			</view>
			<view class="checkbox-group-text" :class="{'checkbox-active':value.map(String).indexOf(item[params.value].toString())!=-1}">{{item[params.label]}}</view>
		</label>
	</checkbox-group>
</template>

<script>
    export default {
        props: {
            value: {
				type: [Array,Number],
				default: []
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
            checkboxChange(evt) {
                this.$emit('input', evt.target.value);
			}
        }
    }
</script>
<style scoped>
	.checkbox-group{
		display:flex;
		flex-wrap:wrap;
		--color:#007AFF;
	}
	.checkbox-lable{
		margin-right:5px;
		margin-bottom: 5px;
	}
	.checkbox-group-btn{
		display:none;
	}
	.checkbox-group-text{
		border: 1px solid #ccc;
		padding: 5px 12px;
		border-radius: 3px;
		font-size: 14px;
		cursor: pointer;
	}
	.checkbox-group-text:hover{
		border-color: var(--color);
		color: var(--color);
	}
	.checkbox-active.checkbox-group-text{
		border-color: var(--color);
		background: var(--color);
		color: #fff;
	}
	.checkbox-active.checkbox-group-text:hover{
		background: var(--color);
	}
</style>
