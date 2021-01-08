<template>
	<div class="titleList flex">
		<div v-for="(item,i) in titleList" @click="changeTitle(i)" class="titleItem fs_20 tac csp" :class="currentTitle == i?'chooseTitle':''" :key='i'>
			{{item}}
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			currentTitle:{
				type:String,
				default:'',
			}
		},
		data(){
			return{
				titleList:['单个站点概览','周边运力概览','应急预案','视频监控点'],
				pageList:['solo.html','around.html','emergency.html','video.html']
			}
		},
		methods:{
			changeTitle(i){
				if(i == this.currentTitle){
					return
				}
				window.location.href = this.pageList[i]
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.chooseTitle{
		background-color: yellowgreen;
	}
	.titleList{
		flex-direction: column;
		>.titleItem{
			border: 1px solid black;
			width: 70px;
			margin-top: 20px;
		}
	}
</style>
