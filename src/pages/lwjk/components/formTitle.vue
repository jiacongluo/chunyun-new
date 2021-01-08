<template>
	<div class="formTitle">
		<div class="flex">
			<div class="colorBlock">
				
			</div>
			<div class="fs_20 color-white">
				{{title}}
			</div>
		</div>
		<div class="titleLine"></div>
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'',
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.formTitle{
		width: 100%;
		>div:first-child{
			padding: 19px 0 9px 27px;
			.colorBlock{
				width: 9px;
				height: 20px;
				background:rgba(0, 255, 255, 1);
				margin-right: 15px;
			}
		}
		.titleLine{
			width: 778px;
			height: 2px;
			margin-left: 6px;
			background-image: linear-gradient(to right, rgba(6, 136, 201, 1), rgba(6, 136, 201, 0));
		}
	}
</style>
