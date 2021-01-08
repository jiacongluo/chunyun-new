<template>
    <div>
        <div class="data-box-header">
            <div class="data-box-header-l">
                <div :class="['header-item']">
                    <i class="i1"></i>
                    <span>客流洞察</span>
                </div>
            </div>

            <div class="data-box-header-r">
                <datePicker :range="false" :datePickerType="'date'"></datePicker>
            </div>
        </div>

        <div class="data-box-title-box pt20">
            <div class="data-box-title linear-border">
                <i class="icon icon2"></i>
                <span>实时客流驻留时长分析</span>
            </div>
        </div>
        <div class="data-box1">
            <div class="data-box1-inner bgi">
                <chart1QZ></chart1QZ>
            </div>
        </div>

        <div class="data-box-title-box">
            <div class="data-box-title linear-border">
                <i class="icon icon3"></i>
                <span>旅客画像</span>
            </div>
        </div>
        <div class="data-box2">
            <chart2QZBox></chart2QZBox>
        </div>

        <div class="data-box3">
            <div class="data-box3-box data-box3-box1">
                <chart3 :id="3"></chart3>
            </div>
            <div class="data-box3-box data-box3-box2">
                <div class="full-div">
                    <div class="data-box3-box2-header">
                        <span>客流趋势</span>
                    </div>
                    <div class="data-box3-box2-c">
                        <chart4 :id="4"></chart4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import datePicker from '@/components/datePicker'
import chart3 from '../components/chart3'
import chart4 from '../components/chart4'
import chart1QZ from '../components/chart1QZ'
import chart2QZBox from '../components/chart2QZBox'
export default {
    name: '',

    mixins: [],

    components: {
        datePicker,
        chart3,
        chart4,
        chart1QZ,
        chart2QZBox,
    },

    props: {},

    data () {
        return {}
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {}
}
</script>

<style lang='scss' scoped>
    .data-box-header {
        width: 875px;
        height: 61px;
        background: url("../assets/客流洞察背景@2x.png") no-repeat;
        background-size: 100% 100%;
        padding-left: 20px;
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
        margin-top: 5px;
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /*background-image: url("../assets/默认框@2x.png");*/
        display: flex;
        align-items: center;
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

    .data-box-title-box {
        padding-left: 20px;
        width: 100%;

    }
    .data-box-title {
        width: 100%;
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(254,254,254,1);
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
    .icon {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 7px;

    }
    .icon2 {
        background-image: url("../assets/时点通关_iocn@2x.png");
        width: 20px;
        height: 20px;
    }
    .icon3 {
        background-image: url("../assets/旅客画像_icon@2x.png");
        width: 24px;
        height: 19px;
    }
    .data-box1 {
        width: 100%;
        height: 292px;
        /*background-color: #fff;*/
        padding: 4px 46px 12px 13px;
    }
    .data-box1-inner {
        width: 100%;
        height: 100%;
        background-image: url('../assets/图表背景@2x3.png');
    }
    .data-box2 {
        width: 100%;
        height: 181px;
        /*background-color: #fff;*/
    }
    .data-box3 {
        width: 100%;
        height: 357px;
        display: flex;
        /*background-color: #fff;*/
        padding-left: 17px;
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
    .data-box3-box2-header {
        display: flex;
        padding-left: 22px;
        align-items: center;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:bold;
        color:rgba(255,255,255,1);
        height: 46px;
        padding-top: 7px;
        /*line-height:60px;*/
        i {
            width: 28px;
            height: 7px;
            background: url("../assets/箭头_icon@2x.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 6px;
        }
        span {
            margin-right: 6px;
        }
    }
    .data-box3-box2-c {
        width: 100%;
        height: 285px;
    }
</style>
