<template>
	<div class="app-view">
		<iframe :src="href" frameborder=”no” border=”0″ marginwidth=”0″ marginheight=”0″ scrolling=”no” allowtransparency=”yes”></iframe>
		<RightHeader :currentPage = "'3'"></RightHeader>
		<!--<div class="fs_20">协调联动</div>-->

	</div>
</template>

<script>
	import leftHeader from '@/components/leftHeader.vue'
    import RightHeader from "../../components/rightHeader";
	export default {
		name: '',

		mixins: [],

        components:{
            RightHeader,
            leftHeader
        },
		props: {},

		data() {
			return {
				href:'http://219.136.133.169:8096/safeguard/login/loginManage/train?suser=mingj01&spwd=mingj168',
			}
		},

		computed: {},

		watch: {},

		created() {},

		mounted() {},

		destroyed() {},

		methods: {},

	}
</script>

<style lang='scss' scoped>
	.app-view{

		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0px;
		top: 0px;
		width: 1920px;
		height: 1080px;
		background-color: 	#0E2850;
		iframe{
			position: absolute;
			left: 0px;
			right: 0px;
			bottom: 0px;
			top: 0px;
			width: 1920px;
			height: 1080px;

		}
	}
</style>
