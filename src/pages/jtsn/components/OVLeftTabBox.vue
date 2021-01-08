<template>
    <!--左切换box-->
    <div class="full-div">
        <div class="box1-l">
            <ul v-if="stationTypeList.length">
                <li v-for="(item,index) in stationTypeList" :key="index"
                    :class="{'active':active===index}" @click="clickType(index)">
                    <div :class="['cp',item.div,'li-div',`box1-l-bg${index+1}`, {'mt-5': index!==0}]">
                        <!--<div class="li-div-l">-->
                            <!--<div :class="['li-div-l-icon', item.icon, 'box1Ul-icon']"></div>-->
                            <!--<div class="li-div-l-name">{{item.name}}</div>-->
                        <!--</div>-->
                        <!--<div class="li-div-r">-->
                            <!--<i>{{item.num}}</i>个-->
                        <!--</div>-->
                        <div class="li-div-line1">
                            <div :class="['li-div-l-icon', item.icon, 'box1Ul-icon']"></div>
                        </div>
                        <div class="li-div-line2">
                            <div>{{item.name}}</div>
                        </div>
                        <div class="li-div-line3">
                            <div>{{item.num}}</div>
                            <i>个</i>
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
                    :height="720/192+`rem`"
                    direction="vertical"
                    ref="carousel"
                    :autoplay="false">
                    <el-carousel-item v-for="(item,index) in box1ShowData" :key="index">
                        <div class="item cp" v-for="(item2,index2) in item"
                             @click="clickItem(item2)"
                             :key="index2">
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
                                        状态
                                    </div>
                                    <div class="item-line-r">
                                        <div :class="['item-line-r-status', lvObj[item2.lv]]">{{item2.lv}}</div>
                                        <!--<span :class="['spanr',lvObj[item2.lv]]">{{item2.per2}}<i :class="['danwei',lvObj[item2.lv]]">%</i></span>-->
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
import mapMixin from '@/utils/mapMixin'

export default {
    name: '',

    mixins: [mapMixin],

    components: {},

    props: {
        stationList: {
            type: Array,
            default: []
        },
        terminalInfoList: {
            type: Array,
            default: []
        }
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
                    postion_type: '机场',
                    active: false
                },
                {
                    name: '铁路',
                    num: 0,
                    on: false,
                    icon: 'box1Ul-icon2',
                    juxing: true, // 是不是矩形的背景
                    div: 'li-div2',
                    // postion_type: '火车站',
                    postion_type: '铁路',
                    active: false
                },
                {
                    name: '客运站',
                    num: 0,
                    on: false,
                    icon: 'box1Ul-icon3',
                    juxing: true, // 是不是矩形的背景
                    div: 'li-div3',
                    postion_type: '客运站',
                    active: false
                },
                // {
                //     name: '水路',
                //     num: 0,
                //     on: false,
                //     icon: 'box1Ul-icon4',
                //     juxing: false, // 是不是矩形的背景
                //     div: 'li-div4',
                //     postion_type: '水路'
                //
                // },
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
        if (this.pointType === '机场') {
            this.active = 0
        } else if (this.pointType === '铁路') {
            this.active = 1
        } else {
            this.active = 2
        }
        // for (let i = 0; i < this.stationTypeList.length; i++) {
        //     let argumentElement = this.stationTypeList[i];
        //     argumentElement.active = this.active === i
        // }
        // debugger
        this.getTerminalTypeAndCount()
        // this.getTerminalInfoByType()
        this.handleData()
    },

    destroyed () {
    },

    methods: {
        moveToPoint (name) {
            let theName = name
            let me =this
            for (let obj of this.terminalInfoList) {
                if (theName === obj.postion_name) {

                    this.handleMoveToPoint(me,obj)
                }
            }
        },
        clickItem (item) {
            this.moveToPoint(item.name)
            // console.log(item)
            // debugger
        },
        clickUp () {
            // debugger
            this.$refs['carousel'].prev()
        },
        clickDown () {
            this.$refs['carousel'].next()
        },
        // 点击类型
        clickType (index) {
            this.active = index
            this.$store.dispatch('pointType', this.stationTypeList[this.active]['postion_type'])
            // this.getTerminalInfoByType()
            this.handleData()
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
        handleData () {
            let tempArr = []
            // debugger
            let have = false
            let temp = []
            let me = this
            const theType = this.pointType
            for (const datum of this.terminalInfoList) {
                if (datum.postion_type === theType) {
                    have = false
                    for (const item of this.stationList) {
                        if (datum.postion_name === item.postion_name) {
                            have = true
                            const mid = item.warning_medium
                            const high = item.warning_high
                            const user_cnt = datum.user_cnt
                            const baohedu = me.utils.tofixed((user_cnt / high)*100,1)
                            // debugger
                            const lv = me.utils.calLv(user_cnt / high)
                            let theObj = {
                                name: datum.postion_name,
                                people: user_cnt,
                                per1: me.utils.tofixed(datum.ratio * 100,1),
                                per2: baohedu,
                                lv: lv.level,
                                rank: lv.rank
                            }
                            tempArr.push(theObj)
                        }
                    }
                    if (!have) {
                        temp.push(datum.postion_name)
                    }
                }
            }
            // console.log(temp)
            tempArr = underscore.sortBy(tempArr, (item) => { // 排序
                return -parseInt(item.per2)
            })
            // 重要枢纽排序,广州白云国际机场排第一, 后面的排第一
            var specialArr0 = ['湛江机场','金湾机场','潮汕国际机场','宝安国际机场','广州白云国际机场']
            var specialArr1 = ['广州火车站', '广州东站','广州南站']
            var specialArr2 = ['天河汽车客运站', '广州汽车客运站']
            var specialArrMap = {
                '机场': specialArr0,
                '铁路': specialArr1,
                '客运站': specialArr2,
            }
            var specialArr = specialArrMap[theType]
            for (const specialArrElement of specialArr) {
                for (let i = 0; i < tempArr.length; i++) {
                    let resultArrElement = tempArr[i];
                    if (resultArrElement['name'] === specialArrElement) {
                        // debugger
                        let temp = resultArrElement
                        tempArr.splice(i,1)
                        tempArr.unshift(temp)
                    }
                }
            }

            let newArr = []
            let resultArr = []
            const numPerPage = 4 // 每页4条
            for (let i = 0; i < tempArr.length; i++) {
                let obj = tempArr[i];
                newArr.push(obj)
                if (newArr.length===numPerPage || i===tempArr.length-1) { // 满3个或者到最后一个就加进去,(每次展示3个
                    resultArr.push(newArr)
                    newArr = []
                }
            }

            this.box1ShowData = resultArr
        },
        // 枢纽概览——根据类型查询枢纽列表
        getTerminalInfoByType () {
            const url = '/api/terminal/getTerminalInfoByType'
            const data = {
                postionType: this.stationTypeList[this.active]['postion_type']
                // postionType: ''
            }
            let me = this
            getData(url, data).then((res) => {
                let tempArr = []
                // debugger
                let have = false
                let temp = []
                for (const datum of res.data) {
                    have = false
                    for (const item of this.stationList) {
                        if (datum.postion_name === item.postion_name) {
                            have = true
                            const mid = item.warning_medium
                            const high = item.warning_high
                            const user_cnt = datum.user_cnt
                            const baohedu = me.utils.tofixed((user_cnt / high)*100,1)
                            // debugger
                            const lv = me.utils.calLv(user_cnt / high)
                            let theObj = {
                                name: datum.postion_name,
                                people: user_cnt,
                                per1: me.utils.tofixed(datum.ratio * 100,1),
                                per2: baohedu,
                                lv: lv.level,
                                rank: lv.rank
                            }
                            tempArr.push(theObj)
                        }
                    }
                    if (!have) {
                        temp.push(datum.postion_name)
                    }
                }
                // console.log(temp)
                tempArr = underscore.sortBy(tempArr, (item) => { // 排序
                    return -parseInt(item.per2)
                })
                let newArr = []
                let resultArr = []
                const numPerPage = 4 // 每页4条
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

    }
}
</script>

<style lang='scss' scoped>

    .box1-l {
        width: 86px;
        /*padding-top: 62px;*/
        /*padding-left: 7px;*/
        position: absolute;
        top: 145px;
        left: 16px;

        ul {
            width: 100%;
        }

        li {
            width: 100%;
            margin-bottom: 21px;
        }
        li:nth-last-child(1) {
            margin-bottom: 0;
        }

        li.active {
            .box1Ul-icon1 {
                background: url("../assets/飞机02@2x.png");
                background-size: 100% 100%;

            }

            .box1Ul-icon2 {
                background: url("../assets/火车02@2x.png");
                background-size: 100% 100%;

            }

            .box1Ul-icon3 {
                background: url("../assets/客运站02@2x.png");
                background-size: 100% 100%;

            }

            .box1Ul-icon4 {
                background: url("../assets/轮船拷贝@2x.png");
                background-size: 100% 100%;

            }

            .box1-l-bg1 {
                background: url("../assets/选框01-2@2x.png");
                background-size: 100% 100%;
                transform: none;
            }

            .box1-l-bg2 {
                background: url("../assets/选框02-2@2x.png");
                background-size: 100% 100%;
                /*margin-left: 2px;*/
            }

            .box1-l-bg3 {
                background: url("../assets/选框03-2@2x.png");
                background-size: 100% 100%;
                /*margin-left: 2px;*/

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
        width: 100%;
        height: 172px;
        background: url("../assets/选框01@2x.png");
        background-size: 100% 100%;
        /*transform: rotateX(180deg);*/
    }

    .box1-l-bg2 {
        width: 100%;
        height: 157px;
        background: url("../assets/选框02@2x.png");
        background-size: 100% 100%;
        /*transform: rotateY(180deg);*/
    }

    .box1-l-bg3 {
        width: 100%;
        height: 172px;
        background: url("../assets/选框03@2x.png");
        background-size: 100% 100%;
        /*transform: rotateY(180deg);*/

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
        background: url("../assets/飞机01@2x.png");
        background-size: 100% 100%;
        width: 60px;
        height: 33px;
    }

    .box1Ul-icon2 {
        background: url("../assets/火车01@2x.png");
        background-size: 100% 100%;
        width: 34px;
        height: 40px;
        margin-left: 12px;
    }

    .box1Ul-icon3 {
        background: url("../assets/客运站01@2x.png");
        background-size: 100% 100%;
        width: 40px;
        height: 38px;
        margin-left: 10px;
    }

    .box1Ul-icon4 {
        background: url("../assets/轮船@2x.png");
        background-size: 100% 100%;

    }

    .li-div {

        /*display: flex;*/
        font-size: 20px;
        /*font-family:Microsoft YaHei;*/
        font-weight: 400;
        color: rgba(0, 240, 255, 1);
    }

    .li-div1 {
        padding-top: 50px;
        padding-left: 13px;
        /*padding-right: 15px;*/
        .li-div-r {
            padding-top: 33px;
        }
    }

    .li-div2 {
        padding-top: 26px;
        padding-left: 13px;

        .li-div-r {
            padding-top: 40px;
        }
    }

    .li-div3 {
        padding-top: 22px;
        padding-left: 13px;

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
        /*color: #00F6FF !important;*/
        /*border-color: #00F6FF !important;*/
        color: #FFFF00 !important;
        border-color: #FFFF00 !important;

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
        bottom: 43px;
        transform: rotateX(180deg);
    }

    .box1-r-inner {
        width: 295px;
        /*height: 507px;*/
        position: absolute;
        top: 65px;
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
            margin-bottom: 12px;
        }

        .item:nth-child(4) {
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
            margin-top: 13px;

            .danwei {

            }
        }

        .item-line2 {
            margin-top: 13px;

            .item-line-r {
                color: #5AE91A;
            }
        }

        .item-line3 {
            margin-top: 13px;

            .item-line-r {
                width: 117px;
                display: flex;
                justify-content: flex-end;
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
    .li-div-line1 {
        margin-bottom: 14px;
        display: flex;
        /*justify-content: center;*/
    }
    .li-div-line3 {
        font-size: 34px;
        display: flex;
        align-items: baseline;
        /*justify-content: center;*/
        i {
            font-size: 14px;
        }
    }
</style>
