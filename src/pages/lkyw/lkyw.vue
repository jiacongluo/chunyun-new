<template>
    <div class="app-view">
        <leftHeader :currentPage="'2'"></leftHeader>
        <!--<div class="fs_20">两客一危</div>-->
        <iframe style="width: 1920px;height: 1080px;position: absolute;left: 0px;top: 0px;border: none;"
                src="http://219.135.151.105:8005/Modules/Pages/Index.html"></iframe>
        <div class="iframe-bg"></div>
    </div>
</template>

<script>
    import leftHeader from '@/components/leftHeader.vue'

    export default {
        name: '',

        mixins: [],

        components: {},

        props: {},

        data() {
            return {}
        },

        computed: {},

        watch: {},

        created() {
			this.http.get('/api/terminal/getPositionInfoList', {
			
			}).then(res => {
				// if (res.code == 200) {
				// 	for (var i = 0; i < res.data.length; i++) {
				// 		if (res.data[i].postion_type == '收费站')
				// 			this.idList.push(res.data[i])
				// 	}
				// } else {
				// 	console.log(res.msg)
				// }
			})
        },

        mounted() {
        },

        destroyed() {
        },

        methods: {},

        components: {
            leftHeader
        }
    }
</script>

<style lang='scss' scoped>
    .app-view {

        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        width: 1920px;
        height: 1080px;
        background-color: #0E2850;
        /*background-image: url("assets/lwlk.jpg");*/
        background-repeat: no-repeat;
        background-size: 100% 100%;
        iframe {
            z-index: 10;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 1920px;
            height: 1080px;
        }
        .iframe-bg {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 1920px;
            height: 120px;
            background: #001a49;
            z-index: 11;
        }

    }
</style>
