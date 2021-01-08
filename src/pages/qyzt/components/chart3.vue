<template>
    <!--归属分析-->
    <div class="full-div">
        <div class="header" v-if="id===1">
            <span>香港</span>
            <i></i>
            <span>珠海澳门</span>
        </div>
        <div class="header" v-if="id===2">
            <span>珠海澳门</span>
            <i></i>
            <span>香港</span>
        </div>
        <div class="header" v-if="id===3">
            <span>归属分析</span>
        </div>

        <div class="tab-box">
            <div class="ul-box">
                <div :class="['ul-box-line', 'ul-box-line-l', id===1?'ul-box-line1':'ul-box-line2']"></div>
                <div :class="['ul-box-line', 'ul-box-line-r', id===1?'ul-box-line1':'ul-box-line2']"></div>
                <ul :class="[id===1 ? 'ul1' : 'ul2', 'tab-box-ul']">
                    <li class="tab-box-li1 cp" v-for="(item, index) in tabList" :key="index"
                        :class="activeIdx===index ? [activeCls, 'active'] : ''"
                        @click="clickTab(index)"
                    >
                        {{item.name}}({{item.percent}}%)
                    </li>
                </ul>
            </div>
            <div class="tab-data-box">
                <ul v-if="tabList.length">
                    <li class="tab-box-li2" v-for="(item, index) in tabList[activeIdx]['rankList']" :key="index">
                        <div class="line1">
                            <div class="line1-div">
                                <!--<i class="line1-div-i" :class="'i' + (index+1)">{{index + 1}}</i>-->
                                <i class="line1-div-i">{{index + 1}}</i>
                                <span>{{item[theKeyMap[activeIdx]]}}</span>
                            </div>
                            <div>
                                <div class="data-span">{{item['theNum']}}<i>%</i></div>
                            </div>
                        </div>
                        <div class="line2">
                            <div class="line2-bg" :style="{'width': item['theNum'] + '%'}"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import mixin from '@/utils/myMixin'
import { postData }from '@/utils/core/http'
export default {
    name: '',

    mixins: [mixin],

    components: {},

    props: {
        id: {
            type: Number,
            default: 1 // 1 香港去珠海澳门  2 珠海澳门去香港 3归属分析
        }
    },

    data () {
        return {
            theKeyMap3: { // 琼州海峡 归属分析
                0: 'qzBelongArea',
                1: 'qzBelongArea',
                2: 'qzBelongArea',
            },
            theKeyMap2: {
                0: 'province',
                1: 'nation',
                2: 'city',
            },
            theKeyMap1: {
                0: 'province',
                1: 'nation',
                2: 'city',
            },
            theKeyMap: {},
            tabList: [],
            tabList1: [ // 香港去珠海澳门
                {
                    name: '省外来源',
                    percent: 0,
                    rankList: [],
                    key: 'provinceOutDataListToZh',
                    fromType: '省外',
                    key2: 'province'

                },
                {
                    name: '国外来源',
                    percent: 0,
                    rankList: [],
                    key: 'nationDataListToZh',
                    fromType: '国际',
                    key2: 'international'

                },
                {
                    name: '省内来源',
                    percent: 0,
                    rankList: [],
                    key: 'provinceInDataListToZh',
                    fromType: '省内',
                    key2: 'city'

                },
            ],
            tabList2: [ // 珠海澳门去香港

                {
                    name: '省外来源',
                    percent: 0,
                    rankList: [],
                    key: 'provinceOutDataListToHk',
                    fromType: '省外',
                    key2: 'province'

                },
                {
                    name: '国外来源',
                    percent: 0,
                    rankList: [],
                    key: 'nationDataListToHk',
                    fromType: '国际',
                    key2: 'international'

                },
                {
                    name: '省内来源',
                    percent: 0,
                    rankList: [],
                    key: 'provinceInDataListToHk',
                    fromType: '省内',
                    key2: 'city'

                },
            ],
            tabList3: [ // 归属分析
                {
                    name: '省外来源',
                    percent: 0,
                    rankList: [],
                    key: 'provinceOrder',
                    fromType: '2',
                    key2: 'province'

                },
                {
                    name: '国外来源',
                    percent: 0,
                    rankList: [],
                    key: 'internationalOrder',
                    fromType: '1',
                    key2: 'international'
                },

                {
                    name: '省内来源',
                    percent: 0,
                    rankList: [],
                    key: 'cityOrder',
                    fromType: '3',
                    key2: 'city'

                },
            ],
            activeIdx: 0, // 默认激活第一个
            url: '',
            testDate: '' // 测试用日期
        }
    },

    computed: {
        activeCls () {
            return this.id === 1 ? 'active1' : 'active2'
        }
    },

    watch: {
        activeIdx (n, o) {
            // this.init()
        }
    },

    created () {},

    mounted () {
        this.init()
    },

    destroyed () {},

    methods: {
        clickTab (idx) {
            this.activeIdx = idx
        },
        init () {
            if (this.id === 1) {
                this.tabList = this.tabList1
                this.theKeyMap = this.theKeyMap1
                this.url = '/bridge/attributeTypeToZh'
                this.theNumKey = 'stayNum'
                this.testDate = '2019-03-01'
            }
            if (this.id === 2) {
                this.tabList = this.tabList2
                this.theKeyMap = this.theKeyMap2
                this.url = '/bridge/attributeTypeToHk'
                this.theNumKey = 'stayNum'
                this.testDate = '2019-03-01'

            }
            if (this.id === 3) {
                this.tabList = this.tabList3
                this.theKeyMap = this.theKeyMap3
                this.url = '/qz/qzBelongTo'
                this.theNumKey = 'qzNum'
                this.testDate = '2019-12-10'

            }
            this.getData()
        },
        getData () {
            // debugger
            const url = this.url
            const data = {
                // date: this.testDate
                date: this.checkDate
            }
            postData(url, data).then((res) => {
                // console.log(res)
                for (const dataKey in res.data) {
                    for (const tabListElement of this.tabList) { // 排名前六的数组
                        if (tabListElement.key === dataKey) {
                            tabListElement.rankList = res.data[dataKey]
                        }
                    }
                }
                for (const tabListElement of this.tabList) { // 排名前六的数组
                    for (const tabListElementElement of tabListElement['rankList']) {
                        tabListElementElement['theNum'] = this.utils.tofixed(tabListElementElement[this.theNumKey]*100)
                        // debugger
                    }

                }

                // console.log(this.tabList)
                // debugger
                const delNum = 1 // 保留小数
                for (const dataKey in res.data) {
                    if (dataKey === 'typeDataListToZh') { // 各种来源的百分比
                        // debugger
                        // for (const item of res.data[dataKey]) {
                        //     for (const tabListElement of this.tabList) {
                        //         if (tabListElement.fromType === item.fromType) {
                        //             tabListElement.percent = this.utils.tofixed(item.percent*100,delNum)
                        //             // debugger
                        //         }
                        //     }
                        // }
                        for (const dataKey1 in res.data[dataKey]) {
                            for (const tabListElement of this.tabList) {
                                if (tabListElement.key2 === dataKey1) {
                                    tabListElement.percent = this.utils.tofixed(res.data[dataKey][dataKey1]*100,delNum)

                                }
                            }
                        }
                    }
                    if (dataKey === 'typeDataListToHk') { // 各种来源的百分比
                        // for (const item of res.data[dataKey]) {
                        //     for (const tabListElement of this.tabList) {
                        //         if (tabListElement.fromType === item.fromType) {
                        //             tabListElement.percent = this.utils.tofixed(item.percent*100,delNum)
                        //             // debugger
                        //         }
                        //     }
                        // }
                        for (const dataKey1 in res.data[dataKey]) {
                            for (const tabListElement of this.tabList) {
                                if (tabListElement.key2 === dataKey1) {
                                    tabListElement.percent = this.utils.tofixed(res.data[dataKey][dataKey1]*100,delNum)

                                }
                            }
                        }
                    }
                    if (dataKey === 'belongType') { // 各种来源的百分比
                        // debugger
                        // for (const item of res.data[dataKey]) {
                        //     for (const tabListElement of this.tabList) {
                        //         // debugger
                        //         if (tabListElement.fromType === item.qzBelong) {
                        //             tabListElement.percent = this.utils.tofixed(item.qzBelongPercentage*100,delNum)
                        //             // debugger
                        //         }
                        //
                        //     }
                        // }
                        for (const dataKey1 in res.data[dataKey]) {
                            for (const tabListElement of this.tabList) {
                                if (tabListElement.key2 === dataKey1) {
                                    tabListElement.percent = this.utils.tofixed(res.data[dataKey][dataKey1]*100,delNum)

                                }
                            }
                        }
                    }
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .header {
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
            width: 168px;
            height: 48px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .tab-box-li2:nth-child(3n) {
            margin-bottom: 0;
        }
        .data-span {
            font-size:24px;
            /*font-family:Microsoft YaHei;*/
            font-weight:bold;
            /*color:rgba(0,255,255,1);*/
            color: $activeColor;
            /*line-height:60px;*/
            white-space: nowrap;
            i {
                font-size: 13px;
            }
        }
        .line1-div-i {
            font-size:16px;
            /*font-family:Microsoft YaHei;*/
            font-weight:bold;
            color:rgba(0,0,51,1);
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
            background: url("../assets/排名1_icon@2x.png") no-repeat;
            background-size: 100% 100%;
            border-radius: unset;
            padding-top: 5px;

        }
        .i2 {
            height: 22px;
            padding-top: 5px;

            background-color: transparent;
            background: url("../assets/排名2_icon@2x.png") no-repeat;
            background-size: 100% 100%;
        }
        .i3 {
            height: 22px;
            padding-top: 5px;

            background-color: transparent;
            background: url("../assets/排名3_icon@2x.png") no-repeat;
            background-size: 100% 100%;
        }
        .line1 {
            font-size:16px;
            /*font-family:Microsoft YaHei;*/
            font-weight:400;
            color:rgba(255,255,255,1);
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
            width: 164px;
            height: 4px;
            background: url("../assets/进度bg@2x.png") no-repeat;
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
            font-size:14px;
            /*font-family:Microsoft YaHei;*/
            font-weight:400;
            color:rgba(255,255,255,1);
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
            font-size:16px;
            /*font-family:Microsoft YaHei;*/
            font-weight:bold;
            /*color:rgba(0,255,255,1);*/
            color: $activeColor;
            /*line-height:60px;*/
            /*border: 1px solid;*/
            border-radius:6px 6px 0px 0px;
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
