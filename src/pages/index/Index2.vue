<template>
    <div class="app-view">
        <leftHeader :currentPage="'0'"></leftHeader>
        <!--<div class="fs_20">运力概况</div>-->
        <!--整体运力-->
        <div class=" part part-1">
            <div class="title-part">
                <div class="icon yunli">

                </div>
                <div class="title">
                    整体运力
                </div>
            </div>
            <div class="item">
                <div class="name">当日<br/>发送</div>
                <div class="number-1"><span>{{utils.formatNumAuto(part1.sendCount)}}</span><span class="unit">万</span>
                </div>
                <div class="percent-part">
                    去年同比:<span :class="['percent', part1.sendCountZb>0?'up':'down']">{{(Math.abs(part1.sendCountZb)*100).toFixed(2)}}%</span><span
                        :class="['icon' ,part1.sendCountZb>0?'up':'down']"></span>
                </div>
            </div>
            <div class="item-line">

            </div>
            <div class="item item-2">
                <div class="name">累计<br/>发送</div>
                <div class="number-1"><span>{{utils.formatNumAuto(part1.totalCount)}}</span><span class="unit">万</span>
                </div>
                <div class="percent-part">
                    去年同比:<span :class="['percent',part1.totalCountZb>0?'up':'down']">{{(Math.abs(part1.totalCountZb)*100).toFixed(2)}}%</span><span
                        :class="['icon' ,part1.totalCountZb>0?'up':'down']"></span>
                </div>
            </div>
        </div>
        <!--每日发送量趋势-->
        <div class="part part-2">
            <div class="title-part">
                <div class="icon quxian">

                </div>
                <div class="title">
                    每日发送量趋势
                </div>

            </div>
            <div class="data-box-header-r">
                <dateRangePicker :value.sync="range" :range="true" :datePickerType="'daterange'" ></dateRangePicker>
            </div>
            <div class="part-content">
                <ChartDay :data="part2"></ChartDay>
            </div>
        </div>
        <!--累计发送趋势-->
        <div class="part part-3">
            <div class="title-part">
                <div class="icon zhuzhuang">

                </div>
                <div class="title">
                    累计发送趋势
                </div>
            </div>
            <div class="part-content">
                <ChartTotal :data="part3"></ChartTotal>
            </div>
        </div>
        <!--列车信息-->
        <div class="part part-4 info-part">
            <div class="title-part xinxi">
                <div class="icon xinxi">

                </div>
                <div class="title">
                    列车信息
                </div>
            </div>
            <div class="part-content">
                <table>
                    <tr>
                        <td>
                            <div class="info-item">
                                <div class="title">发送列次 <span class="number">{{part4.trainReceivesendTrend&&part4.trainReceivesendTrend.sendTrain}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="info-item">
                                <div class="title">高铁 <span class="number">{{part4.trainReceivesendTrend&&part4.trainReceivesendTrend.sendHighTrain}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="info-item">
                                <div class="title">到达列次 <span class="number">{{part4.trainReceivesendTrend&&part4.trainReceivesendTrend.reachTrain}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="info-item">
                                <div class="title">高铁 <span class="number">{{part4.trainReceivesendTrend&&part4.trainReceivesendTrend.reachHighTrain}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="info-item">
                                <div class="title">延误列次 <span class="number">{{part4.trainReceivesendTrend && part4.trainReceivesendTrend.delayTrain}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="info-item">
                                <div class="title">延误旅客 <span class="number">{{part4.trainReceivesendTrend && utils.formatNumAuto (part4.trainReceivesendTrend.delayGd)}}</span> 万</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>


            </div>
        </div>
        <!--航班信息-->
        <div class="part  part-5 info-part">
            <div class="title-part xinxi">
                <div class="icon xinxi">

                </div>
                <div class="title">
                    航班信息
                </div>
            </div>

            <div class="part-content">
                <table>
                    <tr>
                        <td>
                            <div class="info-item">
                                <div class="title">发送航班 <span class="number">{{part4.flyReceivesendTrend&&part4.flyReceivesendTrend.sendFlight}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="info-item">
                                <div class="title">到达航班 <span class="number">{{part4.flyReceivesendTrend&&part4.flyReceivesendTrend.reachFlight}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="info-item">
                                <div class="title">延误航班 <span class="number">{{part4.flyReceivesendTrend&&part4.flyReceivesendTrend.delayFlight}}</span> 次</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="info-item">
                                <div class="title">延误旅客 <span class="number">{{part4.flyReceivesendTrend&&utils.formatNumAuto(part4.flyReceivesendTrend.delayGd)}}</span> 万</div>
                                <div class="process-part">
                                    <Progress :percentage="10" :show-text="false"></Progress>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>


            </div>
        </div>
        <!--航班发送趋势-->
        <div class="part  part-6">
            <div class="title-part">
                <div class="icon quxian">

                </div>
                <div class="title">
                    航班发送趋势
                </div>
            </div>
            <div class="part-content">
                <ChartQuShi :data="part6.flyReceivesendTrendList" :type="'航班'"></ChartQuShi>
            </div>
        </div>
        <!--列车发送趋势-->
        <div class="part-7">
            <div class="tab-titles">
                <div :class="['tab-title', qushiType=='列车'?'selected':'']" @click="qushiType='列车'">
                    列车发送趋势
                </div>
                <div :class="['tab-title', qushiType=='高铁'?'selected':'']" @click="qushiType='高铁'">
                    高铁发送趋势
                </div>
            </div>
            <div class="part-content">
                <ChartQuShi :data="part6.trainReceivesendTrendList" :type="qushiType"></ChartQuShi>
            </div>
        </div>
        <div class="part-header">
            <div :class="['icon', 'tielu',yunliType=='铁路'?'selected':'']"
                 @click="yunliType='铁路';yunliSelected='selected1'">

            </div>
            <div :class="['icon', 'minhang',yunliType=='民航'?'selected':'']"
                 @click="yunliType='民航';yunliSelected='selected2'">

            </div>
            <div :class="['icon', 'shuilu',yunliType=='水路'?'selected':'']"
                 @click="yunliType='水路';yunliSelected='selected3'">

            </div>
            <div :class="['icon', 'gonglu',yunliType=='公路'?'selected':'']"
                 @click="yunliType='公路';yunliSelected='selected4'">

            </div>
        </div>
        <!--中间部分数据-->
        <div :class="['part-8',yunliSelected]">
            <div class="title-part">
                <div class="icon"></div>
                <div class="title">{{yunliType}}运力</div>
            </div>
            <div :class="['part-content']">
                <div class="part-left">
                    <div class="day-current">
                        <div class="name">当日发送</div>
                        <div class="icon up">

                        </div>
                        <div class="num">{{this.part8.passengerSendTrend&&utils.formatNumAuto(this.part8.passengerSendTrend.sendCount)}}<span class="unit">万</span></div>
                        <div class="percent"> 同比{{this.part8.passengerSendTrend&&(this.part8.passengerSendTrend.sendCountZb*100).toFixed(2)}}%</div>

                    </div>
                    <div class="day-total day-current">
                        <div class="name">累计发送</div>
                        <div class="icon down">

                        </div>
                        <div class="num">{{this.part8.passengerSendTrend&&utils.formatNumAuto(this.part8.passengerSendTrend.totalCount)}}<span class="unit">万</span></div>
                        <div class="percent"> 同比{{this.part8.passengerSendTrend&&(this.part8.passengerSendTrend.totalCountZb*100).toFixed(2)}}%</div>
                    </div>
                </div>
                <div class="part-right">
                    <ChartYunLi :data="part8.passengerSendTrendList&& part8.passengerSendTrendList"></ChartYunLi>
                </div>
            </div>
        </div>
        <div class="time-part">
            <div class="begin-point">

            </div>
            <div class="end-point">

            </div>
            <div class="time-base">

            </div>

            <div v-for="item in dateList" :class="['date-point-wrap',item==selectDate?'selected':'']">
                <div class="date-point">

                </div>
                <div class="date-text" @click="selectDate=item">
                    {{item}}
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import leftHeader from '@/components/leftHeader.vue'
    import dateRangePicker from '@/components/dateRangePicker2'
    import dateUtil from '../../utils/dateUtil'
    import {Progress} from 'element-ui'
    import {get, post, getData} from '../../utils/core/http'
    import ChartQuShi from './components/ChartQuShi'
    import ChartDay from './components/ChartDay'
    import ChartTotal from './components/ChartTotal'
    import ChartYunLi from './components/ChartYunLi'

    export default {
        name: '',

        mixins: [],

        props: {},

        data() {
            return {
                pageDate: '',
                selectDate: '2019-01-28',
                dateList: [],
                qushiType: '列车',
                yunliType: '铁路',
                yunliSelected: 'selected1',
                part1: {},
                part2:[],
                part4: {},
                part6:{},//航班 列车发送趋势
                part3:[],//累计
                part8:[],
                range:['2019-01-21','2019-01-28'],
            }
        },

        computed: {},

        watch: {
            async yunliType(newDate,oldDate){
                var theEndDate=dateUtil.parserDate(this.selectDate);
                var theBeginDate=dateUtil.beforeDays(theEndDate,6);
                var theBeginStr=dateUtil.formateQueryDate(theBeginDate);
                var theEndStr=dateUtil.formateQueryDate(theEndDate);
                this.getChannelSendTrend(this.yunliType,theBeginStr,theEndStr)
            },
            async range(newDate,oldDate){
                // debugger;
                this.loadByRangDate(this.range[0],this.range[1]);
            },
            async selectDate(newDate,oldDate){
                this.loadByDate(newDate);
            }
        },

        created() {
        },

        async mounted() {
            this.genDates(this.selectDate);
            this.loadByDate(this.selectDate);
            this.loadByRangDate(this.range[0],this.range[1]);
        },

        destroyed() {
        },

        methods: {
            searchTime() {
                debugger;
                if (this.range && this.range[0] && this.range[1]) {
                    this.dateObj.startTime = timestamp(this.range[0])
                    this.dateObj.endTime = timestamp(this.range[1])
                } else {
                    this.dateObj = {
                        startTime: '',
                        endTime: ''
                    }
                }
               debugger;
            },
            //part2
            async loadByRangDate(startDate,endDate){

                let theData= await  this.getDayVolumeTrend(startDate,endDate);

                /**
                 * {
      "id": 1,
      "postionType": "全部",
      "sendCount": 5121725,
      "sendCountZb": 0.0964,
      "statDate": "2019-01-21",
      "totalCount": 5121725,
      "totalCountZb": 0.0964
    },
                 * @type {{}}
                 */
                var flyReceivesendTrendListMap={};
                var flyReceivesendTrendList=dateUtil.genDayData(dateUtil.parserDate(startDate),dateUtil.parserDate(endDate),1,{
                    "sendCount": 0,
                    "sendCountZb": 0,
                    // "statDate": "2019-01-21",
                    "totalCount": 0,
                    "totalCountZb": 0
                });
                theData.data.map(m=>{

                    flyReceivesendTrendListMap[dateUtil.parserDate(m.statDate).getTime()]=m;
                });

                flyReceivesendTrendList.map(m=>{
                    if(flyReceivesendTrendListMap[m.date.getTime()]){
                        m.value=flyReceivesendTrendListMap[m.date.getTime()];
                    }
                    m.statDate=dateUtil.formateQueryDate(m.date);
                });

                debugger;
                this.part2=flyReceivesendTrendList;

            },
            async loadByDate(date) {
                var theEndDate=dateUtil.parserDate(date);
                var theBeginDate=dateUtil.beforeDays(theEndDate,6);
                var theBeginStr=dateUtil.formateQueryDate(theBeginDate);
                var theEndStr=dateUtil.formateQueryDate(theEndDate);
                //part-8
                this.getChannelSendTrend(this.yunliType,theBeginStr,theEndStr);
                //part1
                this.getOverAllcapacity(date);
                //part3
                this.getTotalSendtrend(theBeginStr,theEndStr);
                //part6-part7
                this.getTrainAndFlySendTrend(theBeginStr,theEndStr);
                //part4-5 done
                this.getTrainAndFlyMessage(theEndStr);

            },
            genDates(selectDate) {
                var theDate = dateUtil.parserDate(selectDate);
                var theDateList = [];

                for (var i = 0; i <= 10; i++) {
                    theDateList.push(dateUtil.formateQueryDate(dateUtil.beforeDays(theDate, i)));
                }
                this.dateList = theDateList.reverse();
            },
            /***
             * 渠道发送趋势
             * @param position_type 运输类型 :公路/水路/铁路/民航
             * @param startDate 开始日期 格式yyyy-MM-dd
             * @param endDate 开始日期 格式yyyy-MM-dd
             * @returns {Promise<void>}
             */
            async getChannelSendTrend(postion_type, startDate , endDate) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/cw/channelSendTrend", {
                    postion_type: postion_type,
                    startDate : startDate ,
                    endDate: endDate
                });
                /***
                 * "passengerSendTrend": {
      "id": 65,
      "postionType": "公路",
      "sendCount": 4165820,
      "sendCountZb": 0.0676,
      "statDate": "2019-01-28",
      "totalCount": 31633020,
      "totalCountZb": 0.0557
    }
                 "passengerSendTrendList": [
                 {
                   "id": 58,
                   "postionType": "公路",
                   "sendCount": 3681420,
                   "sendCountZb": 0.0403,
                   "statDate": "2019-01-21",
                   "totalCount": 3681420,
                   "totalCountZb": 0.0403
                 },
                 {

                            * passengerSendTrendList : 渠道日期区间内的列表数据 , passengerSendTrend: 某渠道的发送量sendCount和累计发送量totalCount
                            */
                var flyReceivesendTrendListMap={};
                var flyReceivesendTrendList=dateUtil.genDayData(dateUtil.parserDate(startDate),dateUtil.parserDate(endDate),1,{
                    "sendCount": 0,
                    "sendCountZb": 0,
                    // "statDate": "2019-01-21",
                    "totalCount": 0,
                    "totalCountZb": 0
                });
                // debugger;
                theData.data.passengerSendTrendList.map(m=>{

                    flyReceivesendTrendListMap[dateUtil.parserDate(m.statDate).getTime()]=m;
                });

                flyReceivesendTrendList.map(m=>{
                    if(flyReceivesendTrendListMap[m.date.getTime()]){
                        m.value=flyReceivesendTrendListMap[m.date.getTime()];
                    }
                    m.statDate=dateUtil.formateQueryDate(m.date);
                });

                // debugger;
                this.part8={
                    passengerSendTrend:theData.data.passengerSendTrend,
                    passengerSendTrendList:flyReceivesendTrendList
                };
            },
            /***
             *每日发送量趋势
             * @param startDate 开始日期 格式yyyy-MM-dd
             * @param endDate 开始日期 格式yyyy-MM-dd
             * @returns {Promise<void>}
             */
            async getDayVolumeTrend(startDate, endDate) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/cw/dayVolumeTrend", {
                    startDate: startDate,
                    endDate: endDate
                });
                return theData;
            },

            /**
             *
             整体运力
             * @param date
             * @returns {Promise<void>}
             */
            async getOverAllcapacity(date) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/cw/overAllcapacity", {
                    date: date,
                });
                /**
                 *"postionType": "全部",
                 "sendCount": 5896012,
                 "sendCountZb": 0.0846,
                 "statDate": "2019-01-28",
                 "totalCount": 44229156,
                 "totalCountZb": 0.083
                 * */
                this.part1 = theData.data;
            },

            /***
             * 累计发送趋势
             * @param startDate
             * @param endDate
             * @returns {Promise<void>}
             */
            async getTotalSendtrend(startDate, endDate) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/cw/totalSendtrend", {
                    startDate: startDate,
                    endDate: endDate,
                });
                /**
                 {
        "busCount": 3681420,
        "waterCount": 111243,
        "stat_date": "2019-01-21",
        "flyCount": 222176,
        "trainCount": 1106886
      },
                 * @type {{}}
                 */
                //var theDefualtList=dateUtil

                var flyReceivesendTrendListMap={};
                var flyReceivesendTrendList=dateUtil.genDayData(dateUtil.parserDate(startDate),dateUtil.parserDate(endDate),1,{
                    "busCount": 0,
                    "waterCount": 0,
                    "flyCount": 0,
                    "trainCount": 0
                });
                theData.data.map(m=>{

                    flyReceivesendTrendListMap[dateUtil.parserDate(m.stat_date).getTime()]=m;
                });
                flyReceivesendTrendList.map(m=>{
                    if(flyReceivesendTrendListMap[m.date.getTime()]){
                        m.value=flyReceivesendTrendListMap[m.date.getTime()];
                    }
                    m.statDate=dateUtil.formateQueryDate(m.date);
                });
                // debugger;
                this.part3=flyReceivesendTrendList;
            },

            /***
             *
             列车和航班信息
             * @param date
             * @returns {Promise<void>}
             */
            async getTrainAndFlyMessage(date) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/cw/trainAndFlyMessage", {
                    date: date,
                });
                /*trainReceivesendTrend: 列车信息 , flyReceivesendTrend: 航班信息
                 "flyReceivesendTrend": {
      "id": 8,
      "delayFlight": 0,
      "delayGd": 0,
      "reachFlight": 1516,
      "sendFlight": 1529,
      "statDate": "2019-01-28"
    },
    "trainReceivesendTrend": {
      "id": 8,
      "delayGd": 0,
      "delayTrain": 0,
      "reachHighTrain": 1028,
      "reachTrain": 1162,
      "sendHighTrain": 1032,
      "sendTrain": 1247,
      "statDate": "2019-01-28"
    }
                * */
                this.part4=theData.data;
            },

            /***
             * 列车和航班发送趋势
             * @param startDate
             * @param endDate
             * @returns {Promise<void>}
             */
            async getTrainAndFlySendTrend(startDate, endDate) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/cw/trainAndFlySendTrend", {
                    startDate: startDate,
                    endDate: endDate,
                });
                /**
                 * trainReceivesendTrendList : 列车发送趋势
                 *   {
        "id": 1,
        "delayGd": 0,
        "delayTrain": 0,
        "reachHighTrain": 950,
        "reachTrain": 1080,
        "sendHighTrain": 951,
        "sendTrain": 1098,
        "statDate": "2019-01-21"
      }
                 * flyReceivesendTrendList 航班发送趋势
                 * {
        "id": 1,
        "delayFlight": 0,
        "delayGd": 0,
        "reachFlight": 1444,
        "sendFlight": 1468,
        "statDate": "2019-01-21"
      },
                 * */
                // debugger;
                var flyReceivesendTrendListMap={};
                var flyReceivesendTrendList=dateUtil.genDayData(dateUtil.parserDate(startDate),dateUtil.parserDate(endDate),1,{
                    "delayFlight": 0,
                    "delayGd": 0,
                    "reachFlight": 0,
                    "sendFlight": 0,
                });
                theData.data.flyReceivesendTrendList.map(m=>{

                    flyReceivesendTrendListMap[dateUtil.parserDate(m.statDate).getTime()]=m;
                });
                flyReceivesendTrendList.map(m=>{
                    if(flyReceivesendTrendListMap[m.date.getTime()]){
                        m.value=flyReceivesendTrendListMap[m.date.getTime()];
                    }
                    m.statDate=dateUtil.formateQueryDate(m.date);
                });
                var trainReceivesendTrendListMap={};
                var trainReceivesendTrendList=dateUtil.genDayData(dateUtil.parserDate(startDate),dateUtil.parserDate(endDate),1,{
                    "delayGd": 0,
                    "delayTrain": 0,
                    "reachHighTrain": 0,
                    "reachTrain": 0,
                    "sendHighTrain": 0,
                    "sendTrain": 0,
                });
                theData.data.trainReceivesendTrendList.map(m=>{trainReceivesendTrendListMap[dateUtil.parserDate(m.statDate).getTime()]=m;});
                trainReceivesendTrendList.map(m=>{
                    if(trainReceivesendTrendListMap[m.date.getTime()]){
                        m.value=trainReceivesendTrendListMap[m.date.getTime()];
                    }
                    m.statDate=dateUtil.formateQueryDate(m.date);
                });

                this.part6={
                    flyReceivesendTrendList:flyReceivesendTrendList,
                    trainReceivesendTrendList:trainReceivesendTrendList
                };
            },
        },

        components: {
            leftHeader,
            Progress,
            dateRangePicker,
            ChartDay,
            ChartQuShi,
            ChartTotal,
            ChartYunLi
        }
    }
</script>

<style lang='scss' scoped>
    .app-view {
        * {
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        width: 1920px;
        height: 1080px;
        background-color: #0E2850;
        /*background-image: url("assets/bg_page.png");*/
        background-image: url("assets/背景@2x.png");
        background-size: 100% 100%;
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
            bottom: 0px;
            left: 0px;
            height: 83-19px;
            /*background: red;*/
            padding-left: 229px !important;
            /*background: blue;*/
            .begin-point {
                position: absolute;
                background-image: url("assets/椭圆 828@2x.png");
                width: 6px;
                height: 6px;
                left: 109px;
                bottom: 65-19px;
            }
            .end-point {
                position: absolute;
                background-image: url("assets/椭圆 828@2x.png");
                width: 6px;
                height: 6px;
                right: 90px;
                bottom: 65-19px;
            }
            .date-point-wrap {
                position: relative;
                display: inline-block;
                text-align: center;
                width: 85+58px;
                height: 83-19px;
                cursor: pointer;
                /*background: red;*/
                .date-point {
                    background-image: url("assets/椭圆 828 拷贝 12@2x.png");
                    width: 12px;
                    height: 12px;
                    bottom: 62-19px;
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
                        bottom: 53-19px;
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
                bottom: 67-19px;
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
            /*top: 108px;*/
            top: 127px;
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
                            color: #FF66CC;/*rgba(245, 41, 41, 1);*/
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
            /*top: 108px;*/
            top: 127px;
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
            /*top: 108px;*/
            top: 127px;
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
                height: 21px;
                width: 432/2px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                vertical-align: bottom;
                .right {
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
            /*left: 112px;*/
            left: 74px;
            top: 419+19px;
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
            /*left: 112px;*/
            left: 74px;
            bottom: 133-19px;
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
            /*right: 112px;*/
            right: 64px;
            bottom: 407-19px;
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
            /*right: 112px;*/
            right: 64px;
            bottom: 133-19px;
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
            /*width: 776px;*/
            width: 860px;
            height: 390px;
            position: absolute;
            /*left: 563px;*/
            left: 526px;
            bottom: 133-19px;
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
            /*left: 621px;*/
            left: 600px;
            top: 429+19px;
            height: 113px;
            width: 700px;
            position: absolute;
            .icon {
                width: 132px;
                height: 132px;
                /*width: 137px;*/
                /*height: 135px;*/
                margin-right: 55px;
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
</style>
