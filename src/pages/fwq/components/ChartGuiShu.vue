<template>
    <!--归属分析-->
    <div class="full-div">
        <div class="tab-data-box">
            <ul >
                <li class="tab-box-li2" v-for="(item, index) in data" :key="index" v-if="index<6">
                    <div class="line1">
                        <div class="line1-div">
                            <!--<i class="line1-div-i" :class="'i' + (index+1)">{{ index + 1}}</i>-->
                            <i class="line1-div-i" >{{index + 1}}</i>
                            <span>{{item.area_name}}</span>
                        </div>
                        <div>
                            <div class="data-span color-yellow">{{(item.area_zb*100).toFixed(2)}}<i>%</i></div>
                        </div>
                    </div>
                    <div class="line2">
                        <div class="line2-bg" :style="{'width': item.area_zb*100 + '%'}"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import mixin from '@/utils/myMixin'
    import {postData} from '@/utils/core/http'

    /**
     *
     * area_name: "佛山"
     area_num: 18090
     area_zb: 0.4187
     postion_name: "勒流服务区-向西"
     * */
    export default {
        name: '',

        mixins: [mixin],

        components: {},

        props: {
            data: {
                type: Array
            },
            id: {

                type: Number,
                default: 1 // 1 香港去珠海澳门  2 珠海澳门去香港 3归属分析
            }
        },

        data() {
            return {

            }
        },

        computed: {
            activeCls() {
                return this.id === 1 ? 'active1' : 'active2'
            }
        },

        watch: {
            guishulist(n,o){

            },
            activeIdx(n, o) {
                // this.init()
            }
        },

        created() {
        },

        mounted() {
            this.init()
        },

        destroyed() {
        },

        methods: {
            init() {
                this.getData()
            },
            getData() {
            }
        }
    }
</script>

<style lang='scss' scoped>
    .header {
        display: flex;
        padding-left: 22px;
        align-items: center;
        font-size: 16px;
        /*font-family:Microsoft YaHei;*/
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
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

    .ul-box {
        padding-left: 6px;
        padding-right: 10px;
        position: relative;
    }

    .ul-box-line {
        position: absolute;
        bottom: 0;
        height: 1px;
    }

    .ul-box-line-l {
        width: 9px;
        left: 6px;
    }

    .ul-box-line1 {
        background-color: #00CCFF;
    }

    .ul-box-line2 {
        background-color: #00FF66;
    }

    .ul-box-line-r {
        width: 3px;
        right: 10px;
    }

    .tab-data-box {
        padding-left: 22px;
        height: 231px;
        ul {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            height: 100%;
            padding-top: 15px;
        }
        .tab-box-li2 {
            /*width: 168px;*/
            width: 256px;
            height: 48px;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .tab-box-li2:nth-child(3n) {
            margin-bottom: 0;
        }
        .data-span {
            font-size: 24px;
            /*font-family:Microsoft YaHei;*/
            font-weight: bold;
            color: rgba(0, 255, 255, 1);
            /*line-height:60px;*/
            white-space: nowrap;
            i {
                font-size: 13px;
            }
        }
        .line1-div-i {
            font-size: 16px;
            /*font-family:Microsoft YaHei;*/
            font-weight: bold;
            color: rgba(0, 0, 51, 1);
            /*line-height:60px;*/
            min-width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #00FFFF;
            margin-right: 9px;
            text-align: center;
            @include defaultFlex;
        }
        .i1 {
            height: 22px;
            background-color: transparent;
            background: url("../assets/1@2x.png") no-repeat;
            background-size: 100% 100%;
            border-radius: unset;
            padding-top: 5px;

        }
        .i2 {
            height: 22px;
            padding-top: 5px;

            background-color: transparent;
            background: url("../assets/2@2x.png") no-repeat;
            background-size: 100% 100%;
        }
        .i3 {
            height: 22px;
            padding-top: 5px;

            background-color: transparent;
            background: url("../assets/3@2x.png") no-repeat;
            background-size: 100% 100%;
        }
        .line1 {
            font-size: 16px;
            /*font-family:Microsoft YaHei;*/
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            /*line-height:60px;*/
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 18px;
        }
        .line1-div {
            display: flex;
            align-items: center;
            span {
                white-space: nowrap;
            }
        }
        .line2 {
            /*width: 164px;*/
            width: 256px;
            height: 4px;
            background: url("../assets/进度BG@2x.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
        }
        .line2-bg {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: url("../assets/进度@2x.png") no-repeat;
            background-size: 100% 100%;
            width: 50px;
        }
    }

    .tab-box {
        .tab-box-ul {
            padding-left: 8px;
            padding-top: 15px;
            /*border-bottom: 1px solid;*/
            font-size: 14px;
            /*font-family:Microsoft YaHei;*/
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            /*line-height:60px;*/
            display: flex;
            position: relative;
        }
        .ul1 .tab-box-li1 {
            border-color: #00CCFF;
        }
        .ul2 .tab-box-li1 {
            border-color: #00FF66;
        }
        .tab-box-li1 {
            width: 131px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            white-space: nowrap;
            border-bottom: 1px solid;
        }
        .tab-box-li1.active {
            font-size: 16px;
            /*font-family:Microsoft YaHei;*/
            font-weight: bold;
            color: rgba(0, 255, 255, 1);
            /*line-height:60px;*/
            /*border: 1px solid;*/
            border-radius: 6px 6px 0px 0px;
        }
        .tab-box-li1.active1 {
            border: 1px solid;
            border-color: #00CCFF;
            border-bottom-color: transparent;
            /*background: url("../assets/选中框@2x(1).png") no-repeat;*/
        }
        .tab-box-li1.active2 {
            border: 1px solid;
            border-color: #00FF66;
            border-bottom-color: transparent;
            /*background: url("../assets/选中框@2x(1).png") no-repeat;*/

        }
    }

    .c-box {
        width: 100%;
        height: 285px;
        padding-left: 8px;
        padding-top: 15px;
        /*background-color: #fff;*/
    }
</style>
