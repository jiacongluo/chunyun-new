<template>
	<div @click="buttonClick" class="button bgi fs_16 tac csp" :class="[{'color-yellow':this.ifYellow},{'shadow':this.shadowUrl}]" :style="'background-image: url('+ this.shadowUrl +');'">
		{{text}}
	</div>
</template>

<script>
	export default{
		props:{
			//按钮文字
			text:{
				type:String,
				default:'',
			},
			//是否有阴影
			shadowUrl:{
				type:String,
				default:'',
			},
			//字体颜色是否是黄色
			ifYellow:{
				type:Boolean,
				default:false,
			},
		},
		methods:{
			buttonClick () {
			    this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.shadow{
		// background-image: url(../pages/bxdx/assets/chaxun.png);
		border: 0 !important;
	}
	.button{
		width: 100%;
		height: 100%;
		color: white;
		border: 1px solid #00F9FA;
		border-radius:15px;
		@include defaultFlex;
	}
</style>
