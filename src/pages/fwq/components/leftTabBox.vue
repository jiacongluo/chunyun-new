<template>
    <!--左切换box-->
    <div class="full-div">
        <div class="box1-l">
            <ul v-if="stationTypeList.length">
                <li v-for="(item,index) in stationTypeList" :key="index"
                    :class="{'active':active===index}" @click="clickType(index)">
                    <div :class="['cp',item.div,'li-div',`box1-l-bg${index+1}`, {'mt-5': index!==0}]">
                        <div class="li-div-l">
                            <div :class="['li-div-l-icon', item.icon, 'box1Ul-icon']"></div>
                            <div class="li-div-l-name">{{item.name}}</div>
                        </div>
                        <div class="li-div-r">
                            <i>{{item.num}}</i>个
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="box1-r">
            <div class="box1-r-page-btn cp box1-r-page-btn1" @click="clickUp"></div>
            <div class="box1-r-page-btn cp box1-r-page-btn2" @click="clickDown"></div>
            <div class="box1-r-inner">
                <el-carousel
                    indicator-position="none"
                    :height="`2.65rem`"
                    direction="vertical"
                    ref="carousel"
                    :autoplay="false">
                    <el-carousel-item v-for="(item,index) in box1ShowData" :key="index">
                        <div class="item" v-for="(item2,index2) in item" :key="index2">
                            <div class="title">{{item2.name}}</div>
                            <div class="">
                                <div class="item-line item-line1">
                                    <div class="item-line-l">
                                        实时人数
                                    </div>
                                    <div class="item-line-r">
                                        {{item2.people}}<i class="danwei">人</i>
                                    </div>
                                </div>
                                <div class="item-line item-line2">
                                    <div class="item-line-l">
                                        实时人数增长率
                                    </div>
                                    <div class="item-line-r">
                                        {{item2.per1}}<i class="danwei">%</i>
                                    </div>
                                </div>
                                <div class="item-line item-line3">
                                    <div class="item-line-l">
                                        站场饱和度
                                    </div>
                                    <div class="item-line-r">
                                        <div :class="['item-line-r-status', lvObj[item2.lv]]">{{item2.lv}}</div>
                                        <span :class="['spanr',lvObj[item2.lv]]">{{item2.per2}}<i :class="['danwei',lvObj[item2.lv]]">%</i></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>

        </div>
    </div>
</template>

<script>
import { postData, post2, getData } from '@/utils/core/http'
import * as underscore from 'underscore'
export default {
    name: '',

    mixins: [],

    components: {},

    props: {
        stationList: {
            type: Array,
            default: []
        },
    },

    data () {
        return {
            active: 0, // 当前的
            stationTypeList: [
                {
                    name: '机场',
                    num: 0,
                    on: true,
                    icon: 'box1Ul-icon1',
                    juxing: false, // 是不是矩形的背景
                    div: 'li-div1',
                    postion_type: '机场'
                },
                {
                    name: '铁路',
                    num: 0,
                    on: false,
                    icon: 'box1Ul-icon2',
                    juxing: true, // 是不是矩形的背景
                    div: 'li-div2',
                    // postion_type: '火车站'
                    postion_type: '铁路'


                },
                {
                    name: '客运站',
                    num: 0,
                    on: false,
                    icon: 'box1Ul-icon3',
                    juxing: true, // 是不是矩形的背景
                    div: 'li-div3',
                    postion_type: '客运站'

                },
                {
                    name: '水路',
                    num: 0,
                    on: false,
                    icon: 'box1Ul-icon4',
                    juxing: false, // 是不是矩形的背景
                    div: 'li-div4',
                    postion_type: '水路'

                },
            ],
            box1ShowData: [
                // {
                //     name: '广州白云机场',
                //     people: 100000,
                //     per1: 10,
                //     per2: 20,
                //     lv: '拥挤'
                // },
                // {
                //     name: '广州白云机场',
                //     people: 100000,
                //     per1: 10,
                //     per2: 20,
                //     lv: '适中'
                // },
                // {
                //     name: '广州白云机场',
                //     people: 100000,
                //     per1: 10,
                //     per2: 20,
                //     lv: '舒适'
                // },
            ],
            lvObj: {
                '拥挤': 'yongji',
                '适中': 'shizhong',
                '舒适': 'shushi'
            },
        }
    },

    computed: {},

    watch: {},

    created () {
    },

    mounted () {
        this.getTerminalTypeAndCount()
        this.getTerminalInfoByType()
    },

    destroyed () {
    },

    methods: {
        clickUp () {
            // debugger
            this.$refs['carousel'].prev()
        },
        clickDown () {
            this.$refs['carousel'].next()
        },
        clickType (index) {
            this.active = index
            this.getTerminalInfoByType()
        },
        // 枢纽概览——查询交通枢纽类型及个数
        getTerminalTypeAndCount () {
            const url = '/api/terminal/getTerminalTypeAndCount'
            const data = {}
            getData(url, data).then((res) => {
                for (const stationTypeListElement of this.stationTypeList) {
                    for (const dataElement of res.data) {
                        if (stationTypeListElement.postion_type === dataElement.postion_type) {
                            stationTypeListElement.num = dataElement['typeCount']
                        }
                    }
                }
            })
        },
        // 枢纽概览——根据类型查询枢纽列表
        getTerminalInfoByType () {
            const url = '/api/terminal/getTerminalInfoByType'
            const data = {
                postionType: this.stationTypeList[this.active]['postion_type']
            }
            debugger
            let me = this
            getData(url, data).then((res) => {
                let tempArr = []
                let showNum = 3 // 要显示3个
                // debugger
                for (const datum of res.data) {
                    for (const item of this.stationList) {
                        if (datum.postion_name === item.postion_name) {
                            const mid = item.warning_medium
                            const high = item.warning_high
                            const user_cnt = datum.user_cnt
                            const lv = me.calLv(user_cnt, mid, high)
                            let theObj = {
                                name: datum.postion_name,
                                people: user_cnt,
                                per1: me.utils.tofixed(datum.ratio * 100),
                                per2: me.utils.tofixed((user_cnt / item.warning_high)*100),
                                lv: lv
                            }
                            tempArr.push(theObj)
                        }
                    }
                }
                tempArr = underscore.sortBy(tempArr, (item) => { // 排序
                    return -parseInt(item.people)
                })
                // this.theData = temp
                let newArr = []
                let resultArr = []
                const numPerPage = 3 // 每页3条
                for (let i = 0; i < tempArr.length; i++) {
                    let obj = tempArr[i];
                    newArr.push(obj)
                    if (newArr.length===numPerPage || i===tempArr.length-1) { // 满3个或者到最后一个就加进去,(每次展示3个
                        resultArr.push(newArr)
                        newArr = []
                    }
                }
                this.box1ShowData = resultArr
                // for (let i = 0; i < showNum; i++) {
                //     this.box1ShowData.push(tempArr[i])
                // }
            })
        },
        // 计算拥挤等级  人数,中等阈值,拥挤阈值
        calLv (num, mid, high) {
            if (num > high) {
                return '拥挤'
            } else if (num > mid) {
                return '适中'
            } else {
                return '舒适'
            }
        }

    }
}
</script>

<style lang='scss' scoped>

    .box1-l {
        width: 99px;
        /*padding-top: 62px;*/
        /*padding-left: 7px;*/
        position: absolute;
        top: 62px;
        left: 7px;

        ul {
            width: 100%;
        }

        li {
            /*width: 100%;*/
        }

        li.active {
            .box1Ul-icon1 {
                background: url("../assets/飞机(1)@2x.png");
                background-size: 100% 100%;

            }

            .box1Ul-icon2 {
                background: url("../assets/火车@2x(1).png");
                background-size: 100% 100%;

            }

            .box1Ul-icon3 {
                background: url("../assets/火车@2x(1).png");
                background-size: 100% 100%;

            }

            .box1Ul-icon4 {
                background: url("../assets/轮船拷贝@2x.png");
                background-size: 100% 100%;

            }

            .box1-l-bg1 {
                background: url("../assets/矩形7@2x.png");
                background-size: 100% 100%;
                transform: none;
            }

            .box1-l-bg2 {
                background: url("../assets/矩形7拷贝5@2x.png");
                background-size: 100% 100%;
                margin-left: 2px;
            }

            .box1-l-bg3 {
                background: url("../assets/矩形7拷贝5@2x.png");
                background-size: 100% 100%;
                margin-left: 2px;

            }

            .box1-l-bg4 {
                background: url("../assets/矩形7@2x2.png");
                background-size: 100% 100%;
                /*transform: rotateX(180deg);*/

            }

            .li-div {
                color: rgba(255, 255, 0, 1);
            }
        }

    }

    .mt-5 {
        margin-top: -12px;
    }

    .box1-l-bg1 {
        width: 99px;
        height: 127px;
        background: url("../assets/水路底框@2x.png");
        background-size: 100% 100%;
        /*transform: rotateX(180deg);*/
    }

    .box1-l-bg2 {
        width: 99px;
        height: 146px;
        background: url("../assets/矩形7拷贝@2x.png");
        background-size: 100% 100%;
        /*transform: rotateY(180deg);*/
        margin-left: -2px;
    }

    .box1-l-bg3 {
        width: 99px;
        height: 146px;
        background: url("../assets/矩形7拷贝@2x.png");
        background-size: 100% 100%;
        /*transform: rotateY(180deg);*/
        margin-left: -2px;
        position: relative;
        top: -3px;
    }

    .box1-l-bg4 {
        width: 99px;
        height: 127px;
        background: url("../assets/水路底框@2x2.png");
        background-size: 100% 100%;
        position: relative;
        top: -3px;
    }

    .box1Ul-icon {
        width: 35px;
        height: 35px;
        background-size: 100% 100%;
    }

    .box1Ul-icon1 {
        background: url("../assets/飞机(1)拷贝2@2x.png");
        background-size: 100% 100%;

    }

    .box1Ul-icon2 {
        background: url("../assets/火车@2x.png");
        background-size: 100% 100%;

    }

    .box1Ul-icon3 {
        background: url("../assets/客运站@2x.png");
        background-size: 100% 100%;

    }

    .box1Ul-icon4 {
        background: url("../assets/轮船@2x.png");
        background-size: 100% 100%;

    }

    .li-div {

        display: flex;
        font-size: 20px;
        /*font-family:Microsoft YaHei;*/
        font-weight: 400;
        color: rgba(0, 240, 255, 1);
    }

    .li-div1 {
        padding-top: 34px;
        padding-left: 12px;
        /*padding-right: 15px;*/
        .li-div-r {
            padding-top: 33px;
        }
    }

    .li-div2 {
        padding-top: 22px;
        padding-left: 12px;

        .li-div-r {
            padding-top: 40px;
        }
    }

    .li-div3 {
        padding-top: 22px;
        padding-left: 12px;

        .li-div-r {
            padding-top: 40px;
        }
    }

    .li-div4 {
        padding-top: 17px;
        padding-left: 9px;

        .li-div-r {
            padding-top: 20px;
        }
    }

    .li-div-l {
        text-align: center;
    }

    .li-div-r {
        font-size: 14px;
        /*padding-right: 8px;*/
        white-space: nowrap;
        width: 50px;
        text-align: right;
        margin-left: -8px;
        i {
            font-size: 34px;

        }
    }

    .li-div-l-name {
        writing-mode: vertical-rl;
        position: relative;
        left: 5px;
        font-size: 20px;
    }

    .item-line-r-status {
        width: 52px;
        height: 24px;
        border: 1px solid #5AE91A;
        line-height: 24px;
        text-align: center;
        color: #5AE91A;
        font-size: 16px;
        white-space: nowrap;
    }

    .yongji {
        color: #FF3600 !important;
        border-color: #FF3600 !important;
    }

    .shizhong {
        color: #00F6FF !important;
        border-color: #00F6FF !important;

    }

    .shushi {
        color: #5AE91A !important;
        border-color: #5AE91A !important;

    }

    .box1-r {
        width: 351px;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        /*background-color: #fff;*/
    }

    .box1-r-page-btn {
        position: absolute;
        right: 175px;
        width: 28px;
        height: 23px;
    }

    .box1-r-page-btn1 {
        background: url("../assets/翻页按钮_下@2x 拷贝@2x.png") no-repeat;
        background-size: 100% 100%;
        top: 22px;
    }

    .box1-r-page-btn2 {
        background: url("../assets/翻页按钮_下@2x 拷贝@2x.png") no-repeat;
        background-size: 100% 100%;
        bottom: 25px;
        transform: rotateX(180deg);
    }

    .box1-r-inner {
        width: 295px;
        /*height: 507px;*/
        position: absolute;
        top: 56px;
        right: 38px;
        /*background-color: #fff;*/
        .item {
            height: 169px;
            width: 100%;
            font-size: 16px;
            /*font-family:Microsoft YaHei;*/
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            /*line-height:32px;*/
            border-bottom: 1px solid #089EE4;
            padding: 0px 37px 0px 21px;
            margin-bottom: 3px;
        }

        .item:nth-child(3) {
            margin-bottom: 0;
        }

        .item-line {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .danwei {
                font-size: 14px;
            }

            .item-line-l {
                flex: 1;
                line-height: 26px;
            }

            .item-line-r {
                flex: 1;
                text-align: right;
                color: $activeColor;
                font-size: 26px;
            }
        }

        .item-line1 {
            margin-top: 15px;

            .danwei {

            }
        }

        .item-line2 {
            margin-top: 16px;

            .item-line-r {
                color: #5AE91A;
            }
        }

        .item-line3 {
            margin-top: 17px;

            .item-line-r {
                width: 117px;
                display: flex;
                justify-content: space-between;
            }

            .spanr {

            }
        }

        .title {
            font-size: 20px;
            /*font-family:Microsoft YaHei;*/
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            /*line-height:32px;*/
            @include defaultFlex;
            background: url("../assets/矩形1178@2x.png") no-repeat;
            background-size: 100% 100%;
            width: 255px;
            height: 40px;
            position: relative;
            /*left: 16px;*/
        }
    }
</style>
