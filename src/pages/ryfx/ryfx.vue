<template>
    <div class="app-view">
        <rightHeader :currentPage="'3'"></rightHeader>

        <iframe style="width: 1920px;height: 1080px;position: absolute;left: 0px;top: 0px;border: none;"
                src="https://xtbg.digitalgd.com.cn/zwdsj_yhbi/yhbi/v1/bi/?userId=jtt_pc2&resourceId=交通厅大屏对接31楼&timestamp=1592187367316&signature=bc31217692c0dff5101a0f504f254082"></iframe>
        <div class="iframe-bg"></div>
    </div>
</template>
</div>

<script>
    import rightHeader from '@/components/rightHeader.vue'

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
            rightHeader
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
            /*padding-top: 18px;*/
            /*background: #001a49;*/
        }
        .iframe-bg {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 1920px;
            height: 120px;
            /*background: #001a49;*/
            z-index: 11;
        }

    }
</style>
