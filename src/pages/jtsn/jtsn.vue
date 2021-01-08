<template>
	<div class="full-div app">
		<rightHeader :currentPage = "'0'"></rightHeader>
        <!--<div class="left-bg pen"></div>-->

        <div class="the-bg"></div>
        <!--iframe box-->
        <div class="main-box2" v-show="href">
            <iframe :src="href" frameborder=”no” border=”0″ marginwidth=”0″ marginheight=”0″ scrolling=”no” allowtransparency=”yes”></iframe>
        </div>
        <div class="main-box" v-show="!href">
            <!--<div class="the-bg2 pen"></div>-->
            <div class="right-bg pen"></div>

            <div class="map-box-outer">
                <mainBox></mainBox>
            </div>
        </div>


        <popPaidan
            :showDialog.sync="showDialog"
            v-if="showDialog"
            :href="paibanHref"
        ></popPaidan>
    </div>
</template>

<script>
	import rightHeader from '@/components/rightHeader.vue'
    import mixin from '@/utils/myMixin'
    import mapMixin from '@/utils/mapMixin'
    import mainBox from './components/mainBox'
    import popPaidan from '@/components/popPaidan'

    export default {
		name: '',

		mixins: [mixin,mapMixin],

        components:{
            rightHeader,
            mainBox,
            popPaidan
        },

		props: {},

		data() {
			return {
                // showDialog: false,

            }
		},

		computed: {
            href () {
                const tabName = this.tabName
                const positionName = this.postionName
                if (tabName === '周边运力' && positionName === '广州火车站') {
                    return 'http://219.136.133.169:8096/safeguard/login/loginManage/train?suser=mingj01&spwd=mingj168'
                }
                if (tabName === '周边运力' && positionName === '广州南站') {
                    return 'http://219.136.133.169:8096/safeguard/login/loginManage/shtation?suser=mingj01&spwd=mingj168'
                }
                if (tabName === '周边运力' && positionName === '广州东站') {
                    return 'http://219.136.133.169:8096/safeguard/login/loginManage/eastStation?suser=mingj01&spwd=mingj168'
                }
                if (tabName === '周边运力' && positionName === '广州白云国际机场') {
                    return 'http://219.136.133.169:8096/safeguard/login/loginManage/byAirport?suser=mingj01&spwd=mingj168'
                }
                if (tabName === '应急预案' && positionName === '广州火车站') {
                    return 'http://219.136.133.169:8096/safeguard/login/loginManage/pedestrianSimulation?suser=mingj01&spwd=mingj168'
                }
                return ''
            }
        },

		watch: {},

		created() {},

		mounted() {
            window.pageName = 'jtsn'

            // if (process.env.NODE_ENV === 'production') {
                this.addListener()
            // }
            // console.log(process.env.NODE_ENV)
            // debugger
        },

		destroyed() {},

		methods: {
            init () {

            },
            addListener () {
                var me =this
                window.addEventListener('message', function(messageEvent) {
                    // console.log('执行')
                    var data = messageEvent.data
                    if (data.source === 'vue-devtools-backend') {
                        return
                    }
                    // debugger
                    if (me.utils.isEmpty(data)) { // 周边运力的返回
                        me.$store.dispatch('tabName', '') // 隐藏iframe
                    }
                },false)
            }
        },

	}
</script>

<style lang='scss' scoped>
    .app {
        background-color: #0C2449;
        height: 1080px;
    }
    .main-box, .main-box2 {
        position: absolute;
        z-index: 90;
        top: 0;
        left: 0;
        height: 1080px;
        width: 100%;
        display: flex;

    }

    .main-box2 {
        /*height: 994px;*/
        iframe {
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            top: 0px;
            width: 1920px;
            height: 1080px;

        }
    }
    .the-bg2 {
        background: url("./assets/bgqudiaoxian.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        /*height: 994px;*/
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
    }
    .map-box-outer {
        width: 100%;
        /*margin-top: 86px;*/
        padding-left: 24px;
        /*padding-right: 26px;*/
        padding-right: 10px;
        /*margin-top: 16px;*/
        padding-bottom: 16px;
        padding-top: 17px;
        position: absolute;
        left: 0;
        top: 86px;
        z-index: 10;
        height: 994px;

    }
    .right-bg {
        z-index: 11;
    }
</style>
