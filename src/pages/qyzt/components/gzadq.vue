<template>
    <div>
        <div class="data-box-header">
            <div class="data-box-header-l">
                <div :class="['cp', 'header-item', showDC ? 'active' : '']" @click="showDC = true">
                    <i class="i1"></i>
                    <span>客流洞察</span>
                </div>
                <div :class="['cp', 'header-item', showDC ? '' : 'active']" @click="showDC = false">
                    <i class="i2"></i>
                    <span>客流趋势</span>
                </div>
            </div>
            <div class="data-box-header-r" v-if="showDC">
                <datePicker :range="false" :datePickerType="'date'"></datePicker>
            </div>
            <div class="data-box-header-r" v-else>
                <dateRangePicker :range="true" :datePickerType="'daterange'"></dateRangePicker>
            </div>
        </div>
        <!--客流洞察-->
        <div v-if="showDC">
            <!--<div class="data-box-title-box pt20">-->
            <!--<div class="data-box-title linear-border">-->
            <!--<i class="icon icon1"></i>-->
            <!--<span>公路口岸客流分布</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="data-box1">-->
            <!--<chart1Box></chart1Box>-->
            <!--</div>-->

            <!--<div class="data-box-title-box">-->
            <!--<div class="data-box-title linear-border">-->
            <!--<i class="icon icon2"></i>-->
            <!--<span>时点通关时长</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="data-box2">-->
            <!--<div class="data-box2-inner bgi">-->
            <!--<chart2></chart2>-->
            <!--</div>-->
            <!--</div>-->

            <div class="data-box7">
                <div class="data-box7-item mr5">
                    <div class="data-box-title-box pt20">
                        <div class="data-box-title linear-border">
                            <i class="icon icon1"></i>
                            <span>公路口岸客流分布</span>
                        </div>
                    </div>
                    <div class="data-box7-inner data-box7-inner-mg bgi">
                        <chart5></chart5>
                    </div>
                </div>
                <div class="data-box7-item">
                    <div class="data-box-title-box pl5 pt20">
                        <div class="data-box-title linear-border">
                            <i class="icon icon2"></i>
                            <span>时点通关时长</span>
                        </div>
                    </div>
                    <div class="data-box7-inner bgi">
                        <chart2></chart2>
                    </div>
                </div>
            </div>

            <div class="data-box-title-box">
                <div class="data-box-title linear-border">
                    <i class="icon icon3"></i>
                    <span>归属分析</span>
                </div>
            </div>
            <div class="data-box3">
                <div class="data-box3-box data-box3-box1">
                    <chart3 :id="1"></chart3>
                </div>
                <div class="data-box3-box data-box3-box2">
                    <chart3 :id="2"></chart3>
                </div>
            </div>
        </div>
        <!--客流趋势-->
        <div class="klqs" v-else>
            <div class="data-box-title-box">
                <div class="data-box-title linear-border">
                    <i class="icon icon4"></i>
                    <span>大桥境内段客流趋势</span>
                </div>
            </div>
            <div class="data-box4">
                <div class="data-box456-inner bgi">
                    <chart4 :id="1"></chart4>
                </div>
            </div>

            <div class="data-box-title-box">
                <div class="data-box-title linear-border">
                    <i class="icon icon1"></i>
                    <span>公路口岸客流分析</span>
                </div>
            </div>
            <div class="data-box5">
                <div class="data-box456-inner bgi">
                    <chart4 :id="2"></chart4>
                </div>
            </div>

            <div class="data-box-title-box">
                <div class="data-box-title linear-border">
                    <i class="icon icon5"></i>
                    <span>过桥游客每日平均通关时长</span>
                </div>
            </div>
            <div class="data-box6">
                <div class="data-box456-inner bgi">
                    <chart4 :id="3"></chart4>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import mixin from '@/utils/myMixin'
import chart1Box from '../components/chart1Box'
import chart2 from '../components/chart2'
import chart3 from '../components/chart3'
import chart4 from '../components/chart4'
import chart5 from '../components/chart5'
import datePicker from '@/components/datePicker'
import dateRangePicker from '@/components/dateRangePicker'

export default {
    name: '',

    mixins: [mixin],

    components: {
        chart2,
        chart3,
        chart4,
        datePicker,
        dateRangePicker,
        chart1Box,
        chart5
    },

    props: {},

    data () {
        return {
            showDC: true, // 显示客流洞察

        }
    },

    computed: {},

    watch: {},

    created () {
    },

    mounted () {
    },

    destroyed () {
    },

    methods: {}
}
</script>

<style lang='scss' scoped>
    .data-box-header {
        width: 875px;
        height: 61px;
        background: url("../assets/客流洞察背景@2x.png") no-repeat;
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
        font-size: 20px;
        /*font-family:Microsoft YaHei;*/
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("../assets/默认框@2x.png");
        @include defaultFlex;

        i {
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-right: 7px;
        }

        .i1 {
            width: 24px;
            height: 16px;
            background-image: url("../assets/客流洞察_默认_icon1@2x.png");
        }

        .i2 {
            width: 20px;
            height: 20px;
            background-image: url("../assets/客流趋势_默认_iocn@2x.png");
        }

    }

    .header-item.active {
        background-image: url("../assets/选中框@2x.png");
        font-weight: bold;
        color: rgba(255, 255, 0, 1);

        .i1 {
            background-image: url("../assets/客流洞察_选中_icon@2x.png");
        }

        .i2 {
            background-image: url("../assets/客流趋势_选中_icon@2x.png");
        }
    }

    .data-box-title-box {
        padding-left: 20px;
        width: 100%;

    }

    .data-box-title {
        width: 100%;
        font-size: 20px;
        /*font-family:Microsoft YaHei;*/
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        /*line-height:60px;*/
        border-bottom: 2px solid;
        display: flex;
        /*height: 48px;*/
        align-items: center;
        padding-bottom: 9px;
    }

    .pt20 {
        padding-top: 20px;
    }

    .the-bg2 {
        /*background: url("../assets/外框01@2x.png") no-repeat;*/
        background: url("../assets/bgkuang2.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
    }

    .the-bg {
        background: url("../assets/外框01@2xbg.png") no-repeat;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100% 100%;
    }

    .icon {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 7px;

    }

    .icon1 {
        background-image: url("../assets/公路_icon@2x.png");
        width: 20px;
        height: 19px;
    }

    .icon2 {
        background-image: url("../assets/时点通关_iocn@2x.png");
        width: 20px;
        height: 20px;
    }

    .icon3 {
        background-image: url("../assets/归属分析_icon@2x.png");
        width: 30px;
        height: 20px;
    }

    .icon4 {
        background-image: url("../assets/大桥_icon@2x.png");
        width: 30px;
        height: 20px;
    }

    .icon5 {
        background-image: url("../assets/时长_icon@2x.png");
        width: 20px;
        height: 20px;
    }

    .data-box1 {
        width: 100%;
        padding-right: 59px;
        padding-left: 20px;
        margin-bottom: 40px;
    }

    .data-box2 {
        width: 100%;
        height: 351px;
        /*background-color: #fff;*/
        padding-left: 14px;
        padding-top: 4px;
        padding-bottom: 23px;
        padding-right: 44px;
    }

    .data-box2-inner {
        width: 100%;
        height: 100%;
        background-image: url('../assets/图表背景@2x.png');
    }

    .data-box3 {
        width: 100%;
        height: 357px;
        display: flex;
        /*background-color: #fff;*/
        padding-left: 17px;
        padding-top: 9px;
    }

    .data-box4 {
        width: 100%;
        height: 267px;
        padding: 4px 46px 23px 14px;
    }

    .data-box456-inner {
        width: 100%;
        height: 100%;
        background-image: url('../assets/图表背景@2x2.png');
    }

    .data-box5 {
        width: 100%;
        height: 266px;
        padding: 4px 46px 23px 14px;
    }

    .data-box6 {
        width: 100%;
        height: 257px;
        padding: 4px 46px 23px 14px;
    }

    .data-box3-box {
        width: 419px;
        height: 334px;
        background-repeat: no-repeat;
        background-size: 100% 100%;

    }

    .data-box3-box1 {
        background-image: url("../assets/外框蓝色@2x.png");
    }

    .data-box3-box2 {
        background-image: url("../assets/外框绿色@2x.png");
    }

    .klqs {
        padding-top: 22px;
    }

    .data-box7 {
        width: 100%;
        display: flex;
    }

    .data-box7-item {
        /*width: 50%;*/

    }
    .data-box7-inner {
        width: 417px;
        height: 432px;
        background-image: url('../assets/box7bj.png');
        margin-top: 10px;
        margin-bottom: 23px;

    }
    .data-box7-inner-mg {
        margin-left: 14px;
    }
    .pl0 {
        padding-left: 0;
    }
    .pl5 {
        padding-left: 5px;
    }
    .mr5 {
        margin-right: 5px;
    }
</style>
