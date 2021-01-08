<template>
    <div class="app-warp bg-base">
        <leftHeader :currentPage="'4'"></leftHeader>
        <div class="app-view">
            <div class="part-title-all">
                武汉疫情迁移专题
            </div>
            <div class="content-part">
                <div class="part-item">
                    <div class="part-title">
                        <div class="icon"></div>
                        <div class="title">
                            武汉迁入广东人数
                        </div>
                    </div>
                    <div class="part-content">
                        <chart-day :data="part1"></chart-day>
                    </div>
                </div>
                <div class="part-item">
                    <div class="part-title">
                        <div class="icon"></div>
                        <div class="title">
                            广东迁出武汉人数
                        </div>
                    </div>
                    <div class="part-content">
                        <chart-day :data="part2"></chart-day>
                    </div>
                </div>
                <div class="part-item">
                    <div class="part-title">
                        <div class="icon"></div>
                        <div class="title">
                            武汉迁入广东各地人数排名
                        </div>
                    </div>
                    <div class="part-content">
                        <table-view :direction="0" :data="part3"></table-view>
                    </div>
                </div>
                <div class="part-item">
                    <div class="part-title">
                        <div class="icon"></div>
                        <div class="title">
                            广东各地迁出武汉人数排名
                        </div>
                    </div>
                    <div class="part-content">
                        <table-view :direction="1" :data="part4"></table-view>
                    </div>
                </div>
            </div>
            <div class="time-part">
                <div class="left-nav" @click="beforeDate()"></div>
                <div class="right-nav" @click="nextDate()"></div>
                <div class="begin-point">

                </div>
                <div class="end-point">

                </div>
                <div class="time-base">

                </div>

                <div v-for="item in dateList" :class="['date-point-wrap',item==selectDate?'selected':'']"
                     @click="selectDate=item">
                    <div class="date-point">

                    </div>
                    <div class="date-text">
                        {{item}}
                    </div>
                </div>

            </div>

        </div>
        <div class="left-bg"></div>
    </div>

</template>

<script>
    import leftHeader from '@/components/leftHeader.vue'
    import dateRangePicker from '@/components/dateRangePicker2'
    import dateUtil from '../../utils/dateUtil'
    import {Progress} from 'element-ui'
    import {get, post, getData} from '../../utils/core/http'

    import ChartDay from './components/ChartDay'
    import tableView from './components/tableView'

    export default {
        name: '',

        mixins: [],

        props: {},

        data() {
            var theDate = new Date();
            var theNumber = 2;
            //14点30分 T+2
            // if (theDate.getHours() > 14 || (theDate.getHours() == 14 && theDate.getMinutes() > 30)) {
            //     theNumber = 1;
            // }
            return {
                pageDate: '',
                selectDate: dateUtil.formateQueryDate(dateUtil.beforeDays(new Date(), theNumber)),// '2019-01-28',
                showDate: dateUtil.formateQueryDate(dateUtil.beforeDays(new Date(), theNumber)),
                // selectDate:  '2019-01-28',
                dateList: [],
                qushiType: '列车',
                yunliType: '公路',
                yunliSelected: 'selected1',
                part1: [],
                part2: [],
                part3: [],
                part4: [],
                range: [],
                isRunning: false,
            }
        },

        computed: {},

        watch: {
            async yunliType(newDate, oldDate) {
                var theEndDate = dateUtil.parserDate(this.selectDate);
                var theBeginDate = dateUtil.beforeDays(theEndDate, 6);
                var theBeginStr = dateUtil.formateQueryDate(theBeginDate);
                var theEndStr = dateUtil.formateQueryDate(theEndDate);
                this.getChannelSendTrend(this.yunliType, theBeginStr, theEndStr)
            },
            async range(newDate, oldDate) {
                // debugger;
                this.loadByRangDate(this.range[0], this.range[1]);
            },
            async selectDate(newDate, oldDate) {
                this.loadByDate(newDate);
            }
        },

        created() {
        },

        async mounted() {
            // console.log("DEN",  airportUtil.getCityByCode("DEN"));
            //   console.log("XNT",  airportUtil.getCityByCode("XNT"));
            this.range = [dateUtil.formateQueryDate(dateUtil.beforeDays(dateUtil.parserDate(this.selectDate), 6)), dateUtil.formateQueryDate(this.selectDate)]
            this.genDates(this.selectDate);
            // this.loadByDate(this.selectDate);
            this.isRunning = true;
            this.run();
            // this.loadByRangDate(this.range[0],this.range[1]);
        },

        destroyed() {
            this.isRunning = false;
        },

        methods: {
            async run() {
                this.loadByDate(this.selectDate);
                // while (true) {
                //     if (this.isRunning) {
                //         console.log("开始刷新运输概况");
                //         this.loadByDate(this.selectDate);
                //     }
                //     await this.sleep(1000 * 10);
                // }

            },
            sleep(timeout) {
                return new Promise((resolve, reject) => {
                    //这里模拟异步动作，一般来说可以放置Ajax请求, 'promise1-result'为请求成功后的返回结果
                    //注：Promise实例只能通过resolve 或 reject 函数来返回，并用then()或者catch()获取
                    //不能在里面直接return ... 这样是获取不到Promise返回值的
                    setTimeout(() => resolve('ok'), timeout)
                })
            },
            nextDate() {
                var theNextDate = dateUtil.nextDays(dateUtil.parserDate(this.showDate), 1);
                var theTDate = dateUtil.nextDays(dateUtil.parserDate(dateUtil.formateQueryDate(new Date())), 1);
                if (theNextDate.getTime() >= theTDate.getTime()) {
                    theNextDate = new Date();
                }
                this.showDate = dateUtil.formateQueryDate(theNextDate);
                this.genDates(this.showDate);
                var hasExists = false;
                for (var i = 0; i < this.dateList.length; i++) {
                    if (this.dateList[i] == this.selectDate) {
                        hasExists = true;
                    }
                }
                if (hasExists == false) {
                    this.selectDate = this.dateList[0];
                }
            },
            beforeDate() {
                this.showDate = dateUtil.formateQueryDate(dateUtil.beforeDays(dateUtil.parserDate(this.showDate), 1));
                this.genDates(this.showDate);
                var hasExists = false;
                for (var i = 0; i < this.dateList.length; i++) {
                    if (this.dateList[i] == this.selectDate) {
                        hasExists = true;
                    }
                }
                if (hasExists == false) {
                    this.selectDate = this.dateList[this.dateList.length - 1];
                }
            },
            searchTime() {
                // debugger;
                if (this.range && this.range[0] && this.range[1]) {
                    this.dateObj.startTime = timestamp(this.range[0])
                    this.dateObj.endTime = timestamp(this.range[1])
                } else {
                    this.dateObj = {
                        startTime: '',
                        endTime: ''
                    }
                }
                // debugger;
            },
            //part2
            async loadByRangDate(startDate, endDate) {

                try {

                }
                catch (e) {
                    console.log(e);
                }


            },
            async loadByDate(date) {

                var theEndDate = dateUtil.parserDate(date);
                var theBeginDate = dateUtil.beforeDays(theEndDate, 6);
                var theBeginStr = dateUtil.formateQueryDate(theBeginDate);
                var theEndStr = dateUtil.formateQueryDate(theEndDate);
                try {
                    this.getWhGuangdongInOutRanking(date);
                    this.getWhGuangdongInOutTrend(theBeginStr, theEndStr);
                }
                catch (e) {
                    console.log(e);
                }


            },
            /**
             *
             武汉广东各地市迁入迁出人数排名
             * @param date
             * @returns {Promise<void>}
             */
            async getWhGuangdongInOutRanking(date) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/qxzt/getWhGuangdongInOutRanking", {
                    date: date,
                });
                //inRanking  //outRanking
                /**
                 {
          "from_area": "深圳",
          "to_area": "武汉",
          "stat_date": "20200119",
          "num": 6467
        }
                 * */
                this.part3 = (theData.data.inRanking || []).map(m => {
                    m['area'] = m.to_area;
                    return m;
                });
                this.part4 = (theData.data.outRanking || []).map(m => {
                    m['area'] = m.from_area;
                    return m;
                });
            },
            async getWhGuangdongInOutTrend(startDate, endDate) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/qxzt/getWhGuangdongInOutTrend", {
                    endDate: endDate,
                    startDate: startDate
                });
                //inTrend  //outTrend
                /**
                 {
          "from_area": "深圳",
          "to_area": "武汉",
          "stat_date": "20200119",
          "num": 6467
        }
                 * */
                var theTemp1 = (theData.data.inTrend || []).map(m => {
                    m['area'] = m.from_area;
                    return m;
                });
                var theResultList1 = dateUtil.genDayDataAndMerge(dateUtil.parserDate(startDate), dateUtil.parserDate(endDate), 1, {

                    "num": 0
                }, theTemp1 || [], m => dateUtil.formateQueryDate(dateUtil.parserDate(m.stat_date)));
                this.part1 = theResultList1;
                var theTemp2 = (theData.data.outTrend || []).map(m => {
                    m['area'] = m.to_area;
                    return m;
                });
                var theResultList2 = dateUtil.genDayDataAndMerge(dateUtil.parserDate(startDate), dateUtil.parserDate(endDate), 1, {
                    "num": 0
                }, theTemp2 || [], m => dateUtil.formateQueryDate(dateUtil.parserDate(m.stat_date)));
                this.part2 = theResultList2;
            },
            genDates(selectDate) {
                var theDate = dateUtil.parserDate(selectDate);
                var theDateList = [];

                for (var i = 0; i <= 10; i++) {
                    theDateList.push(dateUtil.formateQueryDate(dateUtil.beforeDays(theDate, i)));
                }
                this.dateList = theDateList.reverse();
            },

        },

        components: {
            leftHeader,
            Progress,
            dateRangePicker,
            ChartDay,
            tableView
        }
    }
</script>

<style lang='scss' scoped>
    .app-warp {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        width: 1920px;
        height: 1080px;
        /*background-color: #0E2850;*/
    }

    .app-view {
        * {
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 10px;
        width: 1920px;
        height: 1080-10px;
        /*background-color: #0E2850;*/
        /*background-image: url("assets/bg_page.png");*/
        /*background-image: url("../../assets/bg/运力概览@2x.png");*/
        /*background-image: url("assets/bg_page.png");*/
        background-size: 1920px 1080px !important;
        background-position: left top;
        background-repeat: no-repeat;

        .part {
            position: relative;
            .title-part {
                position: relative;
                line-height: 20px;
                top: 13px;
                left: 0px;
                &.xinxi {
                    line-height: 22px !important;
                }
                .icon {
                    width: 20px;
                    height: 20px;
                    margin-left: 24px;
                    display: inline-block;
                    &.yunli {
                        background-image: url("assets/整体铺贴@2x.png");
                    }
                    &.quxian {
                        background-image: url("assets/曲线对比@2x.png");
                    }
                    &.zhuzhuang {
                        background-image: url("assets/图表 柱状图@2x.png");
                    }
                    &.xinxi {
                        background-image: url("assets/信息@2x.png");
                        width: 22px !important;
                        height: 22px !important;
                    }

                }
                .title {
                    margin-left: 17px;
                    display: inline-block;
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(253, 253, 253, 1);
                }
            }
            .part-content {
                position: absolute;
                bottom: 0px;
                left: 0px;
                right: 0px;
            }
        }
        .time-part {
            position: absolute;
            width: 1920px;
            bottom: 35px;
            left: 0px;
            height: 83-30px;
            padding-left: 229-20px !important;
            /*background: blue;*/
            .left-nav {
                position: absolute;
                background-image: url("assets/箭头左@2x.png");
                width: 26px;
                height: 50px;
                top: -10px;
                left: 76-10px;
                cursor: pointer;
                background-size: 100% 100%;
                &:hover {
                    background-image: url("assets/箭头左02@2x.png");
                }
            }
            .right-nav {
                position: absolute;
                cursor: pointer;
                background-image: url("assets/箭头右@2x.png");
                width: 26px;
                top: -10px;
                height: 50px;
                right: 50+10px;
                background-size: 100% 100%;
                &:hover {
                    background-image: url("assets/箭头右02@2x.png");
                }
            }
            .begin-point {
                position: absolute;
                background-image: url("assets/椭圆 828@2x.png");
                width: 6px;
                height: 6px;
                left: 109px;
                bottom: 65-30px;
            }
            .end-point {
                position: absolute;
                background-image: url("assets/椭圆 828@2x.png");
                width: 6px;
                height: 6px;
                right: 90px;
                bottom: 65-30px;
            }
            .date-point-wrap {
                position: relative;
                display: inline-block;
                text-align: center;
                width: 85+58px;
                height: 83-35px;
                cursor: pointer;
                /*background: red;*/
                .date-point {
                    background-image: url("assets/椭圆 828 拷贝 12@2x.png");
                    width: 12px;
                    height: 12px;
                    bottom: 62px;
                    margin-left: 12px;
                    margin-top: 9px;
                }
                .date-text {
                    position: absolute;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    margin-left: -28px;
                    font-weight: 400;
                    color: rgba(8, 158, 228, 1);
                    margin-top: 9px;
                }
                &.selected {
                    .date-point {
                        margin-top: 0px !important;
                        margin-left: 0px !important;
                        background-image: url("assets/组 44@2x.png");
                        width: 30px;
                        height: 30px;
                        bottom: 53px;
                    }
                    .date-text {
                        margin-top: 3px !important;
                        color: #F4AD02;
                    }
                }
            }

            .time-base {
                position: absolute;
                left: 109px;
                bottom: 67-30px;
                width: 1720px;
                height: 2px;
                background: rgba(10, 124, 177, 1);
            }

        }

        .part-1 {
            background-image: url("assets/组 41@2x(1).png");
            width: 305px;
            height: 239px;
            position: absolute;
            left: 109px;
            top: 108+30px;
            .item {
                position: absolute;
                left: 0px;
                right: 0px;
                height: 61px;
                top: 63px;
                .name {
                    position: absolute;
                    left: 24px;
                    top: 0px;
                    width: 115px;
                    height: 61px;
                    line-height: 22px;
                    text-align: left;
                    background-image: url("assets/bg@2x(1).png");
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    padding-left: 18px;
                    padding-top: 8px;
                }
                .number-1 {
                    position: absolute;
                    font-size: 26px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    width: 160px;
                    color: rgba(0, 222, 255, 1);
                    /*left: 99px;*/
                    left: 144px;
                    top: 5px;
                    .unit {
                        display: inline-block;
                        font-size: 14px;
                        color: white;
                    }
                }
                .percent-part {
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 16px;
                    color: rgba(255, 255, 255, 1);
                    display: inline-block;
                    /*left: 99px;*/
                    left: 144px;
                    top: 41px;
                    position: absolute;
                    text-align: left;
                    .percent {
                        margin-left: 7px;
                        &.down {
                            color: #FF66CC; /*rgba(245, 41, 41, 1);*/
                        }
                        &.up {
                            color: rgba(89, 223, 24, 1);
                        }
                    }
                    .icon {
                        width: 11px;
                        height: 14px;
                        display: inline-block;
                        margin-left: 3px;
                        &.up {
                            background-image: url("assets/上升@2x.png");
                        }
                        &.down {
                            background-image: url("assets/下降@2x.png");
                        }
                    }
                }
            }
            .item-2 {
                top: 160px !important;
            }
            .item-line {
                position: absolute;
                background-image: url("assets/fenge@2x.png");
                width: 248px;
                height: 2px;
                left: 26px;
                top: 142px;
            }
        }
        .part-2 {
            background-image: url("assets/组 41@2x.png");
            width: 695px;
            height: 239px;
            position: absolute;
            left: 439px;
            top: 108+30px;
            .data-box-header-r {
                position: absolute;
                padding-right: 38px;
                right: 0px;
                top: 0px;
                height: 39px;
                width: 235+25px;
                padding-top: 5px;
                .dapick2 {
                    width: 235+25px !important;
                    border: none !important;
                    line-height: 39px;
                }
            }
            .part-content {
                position: absolute;
                bottom: 0px;
                right: 0px;
                left: 0px;
                top: 39px;
            }
        }
        .part-3 {
            background-image: url("assets/组 41@2x(2).png");
            width: 692px;
            height: 239px;
            position: absolute;
            left: 1157px;
            top: 108+30px;
            .part-content {
                position: absolute;
                bottom: 0px;
                right: 0px;
                left: 0px;
                top: 39px;
            }
        }

        .info-item {
            position: relative;
            .title {
                position: absolute;
                left: 21px;
                font-size: 16px;
                height: 21+15px;
                line-height: 21+15px;
                /*width: 432/2px;*/
                width: 194px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                vertical-align: bottom;
                background-image: url("assets/分割线@2x.png");
                background-position: bottom center;
                background-repeat: no-repeat;
                padding-bottom: 15px;
                background-size: 194px 2px;
                .right {
                    position: absolute;
                    padding-bottom: 15px;
                    top: 0px;
                    right: 0px;
                    bottom: 0px;
                    left: 0px;
                    padding-right: 22px;
                    text-align: right;
                }
                .number {
                    font-size: 24px;
                    font-family: PingFangSC;
                    font-weight: 600;
                    color: rgba(33, 241, 204, 1);
                }
            }
            .process-part {
                position: absolute;
                left: 21px;
                top: 16+21px;
                width: 173px;
                height: 12px;
            }
        }
        .part-4 {
            background-image: url("assets/组 41@2x(3).png");
            width: 432px;
            height: 254px;
            position: absolute;
            /*left: 112px;
            top: 419+30px;*/
            left: 112px;
            bottom: 133-30px;
            .part-content {
                position: absolute;
                bottom: 0px;
                right: 0px;
                left: 0px;
                height: 185px;
            }
            table {
                width: 100%;
                height: 100%;
                td {
                    vertical-align: top;
                }
            }
        }
        .part-5 {
            background-image: url("assets/组 41@2x(4).png");
            width: 432px;
            height: 254px;
            position: absolute;
            /*left: 112px;
            bottom: 133-30px;*/
            left: 112px;
            top: 419+30px;
            .part-content {
                position: absolute;
                bottom: 0px;
                right: 0px;
                left: 0px;
                height: 185px;
            }
            table {
                width: 100%;
                height: 100%;
                td {
                    vertical-align: top;
                }
            }
        }
        .part-6 {
            background-image: url("assets/组 43@2x.png");
            width: 450px;
            height: 254px;
            position: absolute;
            right: 112px;
            bottom: 399-30px;
            .part-content {
                position: absolute;
                bottom: 0px;
                right: 0px;
                left: 0px;
                top: 41px;
            }
        }
        .part-7 {

            background-image: url("assets/组 42@2x.png");
            width: 450px;
            height: 254px;
            position: absolute;
            right: 112px;
            bottom: 133-30px;
            .tab-titles {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(253, 253, 253, 1);
                height: 41px;
                width: 448px;
                line-height: 41px;
                text-align: center;
                border-bottom: solid 1px #3292FF;
                .tab-title {
                    width: 50%;
                    display: inline-block;
                    cursor: pointer;
                    &.selected {
                        background: #3292FF;
                    }
                }
            }
            .part-content {
                position: absolute;
                bottom: 0px;
                right: 0px;
                left: 0px;
                top: 41px;
            }
        }
        .part-8 {
            background-image: url("assets/运力背景框@2x.png");
            /*background: red;*/
            width: 776px;
            height: 390px;
            position: absolute;
            left: 563px;
            bottom: 133-30px;
            &.selected1 {
                background-image: url("assets/运力背景框-01@2x.png") !important;
            }
            &.selected2 {
                background-image: url("assets/运力背景框-02@2x.png") !important;
            }
            &.selected3 {
                background-image: url("assets/运力背景框-03@2x.png") !important;
            }
            &.selected4 {
                background-image: url("assets/运力背景框-04@2x.png") !important;
            }
            .title-part {
                font-size: 22px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 22+19+22px;
                margin-top: 22px;
                height: 22+19+22px;
                margin-left: 3px;
                width: 770px;
                /*border-bottom: 1px solid rgba(108, 93, 12, 1);*/
                /*border-right: 1px solid rgba(108, 93, 12, 1);*/
                /*border-top: 1px solid rgba(108, 93, 12, 1);*/
                * {
                    display: inline-block;
                }
                color: rgba(255, 255, 255, 1);
                .icon {
                    width: 16px;
                    height: 16px;
                    margin-left: 15px;
                    margin-right: 13px;
                    background-image: url("assets/组 26@2x.png");
                }
            }
            .part-content {
                /*border: 1px solid rgba(255, 216, 0, 1);*/
                height: 313px;
                top: 76px;
                width: 776px;
                left: 0px;
                position: absolute;
                .day-current, .day-total {
                    width: 322px;
                    height: 110px;
                    left: 15px;
                    top: 32px;
                    position: absolute;
                    border: 1px solid rgba(108, 93, 12, 1);
                    .icon {
                        width: 28px;
                        height: 28px;
                        top: 21px;
                        right: 17px;
                        position: absolute;
                        &.up {
                            background-image: url("assets/箭头@2x.png");
                        }
                        &.down {
                            background-image: url("assets/箭头@2x(1).png");
                        }
                    }
                    .name {
                        font-size: 22px;
                        left: 21px;
                        top: 20px;
                        width: 100px;
                        height: 22px;
                        position: absolute;
                        text-align: left;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }
                    .num {
                        font-size: 30px;
                        font-family: PingFangSC;
                        font-weight: 600;
                        color: rgba(244, 173, 2, 1);
                        position: absolute;
                        left: 21px;
                        bottom: 22px;
                        text-align: left;
                        width: 190px;
                        height: 26px;
                        .unit {
                            font-size: 21px;
                            margin-left: 10px;
                        }
                    }
                    .percent {
                        position: absolute;
                        right: 17px;
                        bottom: 22px;
                        width: 120px;
                        text-align: right;
                        height: 19px;
                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(0, 192, 255, 1);
                    }
                }
                .day-total {
                    top: 175px;
                }
                .chart-part {
                    top: 0px;
                    bottom: 0px;
                    right: 0px;
                    left: 322+15px;
                }
                .part-right {
                    /*background: red;*/
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    width: 442px;
                    top: 9px;
                }

            }

        }
        .part-header {
            left: 621px;
            top: 429-10+30px;
            height: 113px;
            width: 700px;
            position: absolute;
            .icon {
                /*width: 132px;*/
                /*height: 113px;*/
                width: 137px;
                height: 135px;
                margin-right: 40px;
                display: inline-block;
                background-size: 100% 100%;
                cursor: pointer;
                &.tielu {
                    background-image: url("assets/01@2x.png");
                    &.selected {
                        background-image: url("assets/01-2@2x.png");
                    }

                }
                &.shuilu {
                    background-image: url("assets/03@2x.png");
                    &.selected {
                        background-image: url("assets/03-2@2x.png");
                    }

                }
                &.gonglu {
                    background-image: url("assets/04@2x.png");
                    &.selected {
                        background-image: url("assets/04-2@2x.png");
                    }
                }
                &.minhang {
                    background-image: url("assets/02@2x.png");
                    &.selected {
                        background-image: url("assets/02-2@2x.png");
                    }
                }
                &:nth-last-child(1) {
                    margin-right: 0px;
                }
            }

        }
    }

    .part-title-all {
        background-image: url("assets/专题背景@2x.png");
        width: 1762px;
        height: 66px;
        line-height: 66px;
        padding-left: 33px;
        font-size: 32px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-left: 55+2px;
        margin-top: 27+86px;
    }

    .content-part {
        margin-left: 55px;
        margin-top: 9px;
        .part-item {

            .part-title {
                width: 886px;
                height: 40px;
                line-height: 40px;
                padding-top: 5px;
                font-size: 18px;
                padding-left: 14px;
                .icon {
                    width: 3px;
                    height: 16px;
                    display: inline-block;
                    background: rgba(0, 252, 255, 1);
                }
                .title {
                    margin-left: 8px;
                    display: inline-block;
                }
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(253, 253, 253, 1);
            }
            background-image: url("assets/背景@2x (2).png");
            width: 898px;
            height: 391px;
            background-size: 100% 100%;
            display: inline-block;
            &:nth-child(even) {
                margin-left: 16px !important;
            }
            .part-content {
                width: 886px;
                height: 391-45px;
                /*background-color: red;*/
                margin-left: 5px;
                position: relative;
            }
        }

    }
</style>
