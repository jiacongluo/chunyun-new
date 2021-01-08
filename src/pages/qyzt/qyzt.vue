<template>
	<div class="full-div app" v-if="isInit">
        <leftHeader :currentPage = "'4'"></leftHeader>
        <div class="the-bg"></div>
        <div class="main-box">
            <div class="map-box-outer">
                <mapBox :id="id"></mapBox>
                <div class="map-box-title">{{placeName}}</div>
                <boxUl :id="id"></boxUl>
                <div class="wbbox">
                    <weatherBox2></weatherBox2>
                </div>
                <!--摄像头-->
                <div class="cam-box-outer">
                    <CamBox :id="id"></CamBox>
                </div>
                <!--底部切换-->
                <div class="the-tab">
                    <div :class="['cp', 'the-tab-item', id===1?'active':'']" @click="clickBtmTab(1)">港珠澳大桥专题</div>
                    <div :class="['cp', 'the-tab-item', id===2?'active':'']" @click="clickBtmTab(2)">琼州海峡专题</div>
                </div>

                <!--琼州海峡-实时客流趋势-->
                <chartRealTime v-if="id===2&&showCRT" :showCRT.sync="showCRT"></chartRealTime>
                <!--琼州海峡-实时客流趋势 小窗-->
                <div class="s-box cp" @click="clickSW" v-if="id===2&&!showCRT">
                    <div class="s-box-l">
                        <i class="i1"></i>
                        <span>实时...</span>
                    </div>
                    <div class="i2"></div>
                </div>
            </div>
            <!--<div class="the-bg2 pen"></div>-->
            <div class="left-bg pen"></div>

            <div class="data-box" v-if="id===1">
                <gzadq></gzadq>
            </div>
            <div class="data-box" v-if="id===2">
                <qzhx></qzhx>
            </div>
            <iframeBox v-if="showUAVIframe"></iframeBox>
        </div>

    </div>
</template>

<script>
    import iframeBox from './components/iframeBox'
    import chartRealTime from './components/chartRealTime'
	import leftHeader from '@/components/leftHeader.vue'
    import boxUl from './components/boxUl'
    import gzadq from './components/gzadq'
    import qzhx from './components/qzhx'
    import mapBox from './components/mapBox'
    import CamBox from './components/CamBox'
    import mixin from '@/utils/myMixin'
    import moment from 'moment'
    import weatherBox2 from '@/components/weatherBox2'
    export default {
		name: '',

		mixins: [mixin],

		props: {},

        components:{
            leftHeader,
            gzadq,
            qzhx,
            boxUl,
            chartRealTime,
            mapBox,
            iframeBox,
            CamBox,
            weatherBox2
        },
		data() {
			return {
                id: 1, // 1'港珠澳大桥' , 2'琼州海峡'
                showDC: true, // 显示客流洞察
                showCRT: true, // 实时客流趋势图表 显示
			}
		},

		computed: {
            placeName () {
                return this.id === 1 ? '港珠澳大桥' : '琼州海峡'
            },
        },

		watch: {
            id (n, o) {

            }
        },

		created() {},

		mounted() {
		    window.moment = moment
            window.pageName = 'qyzt'
            window['onRender'] = () => this.initEvent();
        },

		destroyed() {},

		methods: {
		    initEvent () {
                // const param = this.utils.getUrlParams()
                // if (param && param.id) {
                //     this.id = parseInt(param.id)
                // }
                let temp = localStorage.theId
                if (temp) {
                    this.id  = JSON.parse(temp)
                }

		        this.isInit = true
            },
            clickSW () {
                this.showCRT = true

            },
            clickBtmTab (id) {
                localStorage.theId = id
                this.id = id
            }
        },

	}
</script>

<style lang='scss' scoped>
    #container {
        /*width: 100%;*/
        /*height: 100%;*/
        /*margin: 0px;*/
    }
    .app {
        background-color: #0C2449;
        height: 1080px;
    }
    .map-box-outer {
        position: relative;
        /*z-index: 10;*/
    }
    .left-bg {
        z-index: 11;
    }

    .data-box {
        width: 904px;
        position: relative;
        z-index: 10;
    }
    .data-box-header {
        width: 875px;
        height: 61px;
        background: url("./assets/客流洞察背景@2x.png") no-repeat;
        background-size: 100% 100%;
        padding-left: 17px;
        display: flex;
        justify-content: space-between;
    }
    .data-box-header-l {
        display: flex;
    }
    .data-box-header-r {
        padding: 10px 38px 0 0;
    }
    .header-item {
        width: 166px;
        height: 51px;
        /*background-color: #FFF;*/
        margin-right: 20px;
        margin-top: 13px;
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("./assets/默认框@2x.png");
        @include defaultFlex;
        i {
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-right: 7px;
        }
        .i1 {
            width: 24px;
            height: 16px;
            background-image: url("./assets/客流洞察_默认_icon1@2x.png");
        }
        .i2 {
            width: 20px;
            height: 20px;
            background-image: url("./assets/客流趋势_默认_iocn@2x.png");
        }

    }
    .header-item.active {
        background-image: url("./assets/选中框@2x.png");
        font-weight:bold;
        color:rgba(255,255,0,1);
        .i1 {
            background-image: url("./assets/客流洞察_选中_icon@2x.png");
        }
        .i2 {
            background-image: url("./assets/客流趋势_选中_icon@2x.png");
        }
    }

    .the-bg2 {
        /*background: url("./assets/外框01@2x.png") no-repeat;*/
        /*background: url("./assets/bgkuang2.png") no-repeat;*/
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
    /*.main-box {*/
        /*!*width: 1895px;*!*/
        /*!*width: 1920px;*!*/
        /*!*width: 100%;*!*/
        /*!*height: 965px;*!*/
        /*height: 994px;*/
        /*!*background: url("./assets/外框01@2x.png") no-repeat;*!*/
        /*!*background-size: 100% 100%;*!*/
        /*!*margin: 16px auto 0;*!*/
        /*margin: 0px auto 0;*/
        /*position: relative;*/
        /*z-index: 90;*/
        /*display: flex;*/
        /*padding-top: 17px;*/

    /*}*/
    .main-box {
        position: absolute;
        z-index: 90;
        top: 0;
        left: 0;
        height: 1080px;
        width: 100%;
        display: flex;
        padding-top: 103px;
    }
    .the-bg {
        background: url("assets/外框01@2xbg.png") no-repeat;
        width: 100%;
        height: 100%;
        /*height: 1080px;*/
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100% 100%;
    }

    .map-box-title {
        width: 432px;
        height: 66px;
        background: url("./assets/专题@2x.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 59px;
        top: 13px;
        z-index: 11;
        font-size:32px;
        /*font-family:Microsoft YaHei;*/
        font-weight:bold;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        padding-left: 33px;
        padding-top: 19px;
    }

    .the-tab {
        position: absolute;
        z-index: 11;
        bottom: 45px;
        left: 321px;
        display: flex;
        .the-tab-item {
            width: 187px;
            height: 55px;
            background: url("./assets/按钮默认@2x.png") no-repeat;
            background-size: 100% 100%;
            font-size:20px;
            /*font-family:Microsoft YaHei;*/
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:55px;
            text-align: center;
            margin-right: 35px;
        }
        .the-tab-item.active {
            background: url("./assets/按钮选中@2x.png") no-repeat;
            font-size:20px;
            /*font-family:Microsoft YaHei;*/
            font-weight:bold;
            color:rgba(255,255,0,1);
            /*line-height:60px;*/
            background-size: 100% 100%;

        }
    }

    .s-box {
        width: 150px;
        height: 50px;
        background:rgba(0,66,132,1);
        border:1px solid $bdColor;
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(254,254,254,1);
        line-height:60px;
        position: absolute;
        z-index: 11;
        bottom: 48px;
        left: 81px;
        display: flex;
        justify-content: space-between;
        .i1 {
            width: 20px;
            height: 22px;
            background: url("./assets/时长_icon@2x.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 8px;
            margin-left: 15px;
        }
        .i2 {
            width: 14px;
            height: 12px;
            background: url("./assets/放大_icon@2x.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 10px;
            margin-top: 10px;
        }
    }
    .s-box-l {
        display: flex;
        align-items: center;
    }
    .cam-box-outer {
        position: absolute;
        top: 295px;
        left: 75px;
        z-index: 11;

    }
    .wbbox {
        position: absolute;
        top: 208px;
        left: 76px;
        z-index: 11;

    }
</style>
