<template>
	<checkbox-group @change="checkboxChange" class="checkbox-group">
		<label v-for="item in items" :key="item.value">
			<view class="checkbox-group-btn">
				<checkbox :value="item.value" :checked="value.indexOf(item.value)!=-1" />
			</view>
			<view class="checkbox-group-text" :class="{'checkbox-active':value.indexOf(item.value)!=-1}">{{item.name}}</view>
		</label>
	</checkbox-group>
</template>

<script>
    export default {
        props: {
            value: {
				type: Array,
				default: []
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
		border-color: #007AFF;
		color: #007AFF;
	}
	.checkbox-active.checkbox-group-text{
		border-color: #007AFF;
		background: #007AFF;
		color: #fff;
	}
	.checkbox-active.checkbox-group-text:hover{
		background: #007AFF;
	}
</style>
