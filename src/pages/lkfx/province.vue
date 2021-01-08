<template>
    <div class="province-view">
        <!--<div class="bgimage-1">-->

        <!--</div>-->
        <!--<div class="bgimage-2">-->

        <!--</div>-->
        <div class="left-part">
            <!--<div id="container">-->

            <!--</div>-->
            <provinceView :data="hotRoads" @onRegionChnage="onRegionChange"></provinceView>
        </div>
        <div class="right-part">
            <div class="item item-1">
                <div class="title-part linear-border">
                    <div class="icon icon1"></div>
                    <div class="title">
                        人口分析
                    </div>
                </div>
                <div class="body">
                    <div class="sex-part">
                        <div class="manwomanContent">
                            <manWoman :man="sexPart.man"></manWoman>
                        </div>

                    </div>
                    <div class="age-part">
                        <div class="huan-content" v-for="item in agePart" style="display: inline-block">
                            <huan-chart :name="item.name" :percent="item.value" :color="item.color"></huan-chart>
                        </div>

                    </div>
                </div>
            </div>
            <div class="item item-2">
                <div class="title-part linear-border">
                    <div class="icon icon2"></div>
                    <div class="title">
                        实时趋势
                    </div>
                    <!--<div class="unit">（人数/万）</div>-->
                </div>
                <div class="body">
                    <div class="content">
                        <!--<day-trend1 v-if="dayView==1" :data="migrantCurrentTrend"></day-trend1>-->
                        <!--<day-trend2 v-if="dayView==2" :data="migrantCurrentTrend"></day-trend2>-->
                        <day-trend2  :data="migrantCurrentTrend"></day-trend2>
                    </div>

                    <!--<div class="page">-->
                        <!--<div :class="['page-item',dayView==1?'select':'']" @click="dayView=1"></div>-->
                        <!--<div :class="['page-item',dayView==2?'select':'']" @click="dayView=2"></div>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="item item-3">
                <div class="title-part linear-border">
                    <div class="icon icon2"></div>
                    <div class="title">
                        迁徙趋势
                    </div>
                    <!--<div class="unit">（人数/万）</div>-->
                </div>
                <div class="data-box-header-r">
                    <dateRangePicker :value.sync="range" :range="true" :datePickerType="'daterange'"></dateRangePicker>
                </div>
                <div class="body">
                    <div class="content">
                        <week-trend1 v-if="weekView==1" :data="migrantHistoricalTrend"></week-trend1>
                        <week-trend2 v-if="weekView==2" :data="migrantHistoricalTrend"></week-trend2>
                    </div>

                    <div class="page">
                        <div :class="['page-item',weekView==1?'select':'']" @click="weekView=1"></div>
                        <div :class="['page-item',weekView==2?'select':'']" @click="weekView=2"></div>
                    </div>
                </div>
            </div>
            <div class="item item-4">
                <div class="title-part linear-border">
                    <div class="icon icon2"></div>
                    <div class="title">
                        热门迁徙线路TOP10
                    </div>
                </div>
                <div class="body">
                    <tableView :data="hotRoads"></tableView>
                </div>
            </div>
        </div>

        <div class="number-part">
            <div class="number-item">
                <div class="title">实时人口</div>
                <div class="number-value"><span class="number yellow">{{utils.formatNumAuto(numPart.total)}}</span><span
                        class="unit">万人</span>
                </div>
            </div>
            <div class="number-item">
                <div class="title">实时人口变化<span :class="[numPart.change>0?'up-icon':'down-icon']"></span></div>
                <div class="number-value"><span
                        class="number yellow">{{ utils.formatNumAuto(numPart.change)}}</span><span
                        class="unit">万人</span>
                </div>
            </div>
            <div class="number-item" style="display: none;">
                <div class="title">省内迁徙人口</div>
                <div class="number-value"><span
                        class="number yellow">{{utils.formatNumAuto(numPart.provinceMigrant)}}</span><span
                        class="unit">万人</span>
                </div>
            </div>
        </div>
        <div class="page-title">
            <span class="icon"></span>
            <span class="name1">{{currentArea}}</span>
            <!--<span class="name2">（旅客分析）</span>-->

        </div>
        <!--<div class="bgimage-1">-->

        <!--</div>-->
    </div>
</template>

<script>

    import provinceView from './components/provinceView'
    import dayTrend1 from './components/province/dayTrend1'
    import weekTrend1 from './components/province/weekTrend1'
    import dayTrend2 from './components/province/dayTrend2'
    import weekTrend2 from './components/province/weekTrend2'
    import dateRangePicker from '@/components/dateRangePicker3'
    import huanChart from './components/huanChart'
    import manWoman from './components/manWoman'
    import './style/common.scss'
    import dateUtil from '../../utils/dateUtil'
    import transform from './transform'
    import tableView from './components/province/tableView'
    import {get, post, getData} from '../../utils/core/http'

    export default {
        name: 'province',//省内旅客分析

        mixins: [],

        components: {
            provinceView,
            tableView,
            dayTrend1,
            weekTrend1,
            dayTrend2,
            weekTrend2,
            huanChart,
            manWoman,
            dateRangePicker
        },

        props: {
            currentDate: [String]
        },

        data() {
            return {
                // currentDate: new Date('2019-03-03 15:00:00'),
                // currentDate: dateUtil.formateQueryDate(dateUtil.beforeDays(new Date(), 3)),
                currentArea: '广东省',
                range: [],
                viewType: 1,
                dayView: 1,
                weekView: 1,
                numPart: {
                    total: 0,
                    change: 0,
                    provinceMigrant: 0
                },
                sexPart: {
                    man: 0
                },
                //实时变化趋势
                migrantCurrentTrend: [],
                //春运迁徙趋势
                migrantHistoricalTrend: [],
                hotRoads: [],
                agePart: [
                    {name: "24岁以下", color: '#FFFF00', value: 0},
                    // {name: "18-24岁", color: '#18FF00', value: 0},
                    {name: "25-34岁", color: '#FFFF00', value: 0},
                    {name: "35-44岁", color: '#18FF00', value: 0},
                    {name: "45-54岁", color: '#FFFF00', value: 0},
                    {name: "55岁以上", color: '#18FF00', value: 0}],
            }
        },

        computed: {},

        watch: {
            async currentDate(n, o) {
                this.loadData(this.currentDate, this.currentArea);
            },
            async range(newDate, oldDate) {
                // debugger;
                // this.loadByRangDate(this.range[0], this.range[1]);
                // this.loadRangeData();
                this.getMigrantHistoricalTrend(this.currentArea, this.range[0], this.range[1]);
            }
        },

        created() {
            // window['onRender'] = () => this.refresh();
        },

        mounted() {
            this.range = [dateUtil.formateQueryDate(dateUtil.beforeDays(dateUtil.parserDate(this.currentDate), 6)), dateUtil.formateQueryDate(this.currentDate)]
            this.initMap();
            this.loadData(this.currentDate, this.currentArea);
        },

        destroyed() {
        },

        methods: {
            onRegionChange(regionName) {
                this.currentArea = regionName || "广东省";
                var area = this.currentArea;
                var theEndTime = dateUtil.parserDate(this.currentDate);
                var theBeginTime = dateUtil.beforeDays(theEndTime, 6);
                var theCurrentQueryStr = dateUtil.formateQueryDate(theEndTime);
                var theStartQueryStr = dateUtil.formateQueryDate(theBeginTime);
                // this.getHotRoad(theCurrentQueryStr);
                this.getMigrantCurrent(theCurrentQueryStr, area);
                this.getMigrantCurrentTrend(area, theCurrentQueryStr);
                this.getMigrantHistoricalTrend(area, this.range[0], this.range[1]);
                // this.getMigrantHistoricalTrend(area, theStartQueryStr, theCurrentQueryStr);
                this.getMigrantPortrait(area, theCurrentQueryStr);
            },
            /**
             * 热门迁徙路线Top10
             * @returns {Promise<void>}
             * 响应说明: 渠道类型:1公路，2民航，3水路，4铁路
             */
            async getHotRoad(date) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/lkfx/getHotRoad", {date: date});
                /*dpercentage: null
                fromCity: "GZ"
                id: null
                migChannel: "4"
                migNum: 150067
                opercentage: 0.3197
                statDate: "20190301"
                toCity: "FS"
                * */
                var theItems = theData.data;
                this.hotRoads = transform.transformProvinceLine(theItems);

            },
            /**
             * getMigrantCurrent
             旅客分析-实时人口/实时人口变化/省内迁徙人口
             * 响应说明:total:实时人口, change:实时人口变化, provinceMigrant 省内迁徙人口
             */
            async getMigrantCurrent(date, area) {
                //date 日期格式 2019-12-09

                let theData = await getData("/api/lkfx/getMigrantCurrent", {
                    date: date,
                    area: transform.getCityName(area)
                });
                var theAvgValue = transform.getProvinceValue(area, date);
                var theDefaultValue= theData.data;
                var theTotalData= theDefaultValue.total;
                if(theTotalData<=theAvgValue*8/10){
                    console.log("getMigrantCurrent","chang");
                    theDefaultValue.total=theAvgValue+(theDefaultValue.total%100000);//theDefaultValue.change;
                }
                this.numPart =theDefaultValue;

            },
            /**
             *
             实时趋势
             area 省市：广东省、广州、深圳
             * 响应说明:stat_date:当前时点，province_city:省市，population_gd:当前总人口，population_in:当前进入人口，population_out:当前出去人口
             */
            async getMigrantCurrentTrend(area, date) {
                //date 日期格式 2019-12-09
                // debugger;
                let theData = await getData("/api/lkfx/getMigrantCurrentTrend", {
                    date: date,
                    area: transform.getCityName(area)
                });
                /***
                 * population_gd: 98144219
                 population_in: 453906
                 population_out: 806132
                 province_city: "广东省"
                 stat_date: "2019-03-01 00:00:00"
                 */
                var theDateStrDate = dateUtil.formateQueryDate(new Date());
                var theFromDate = new Date(theDateStrDate + " 00:00:00");
                // var theDateStrDate=dateUtil.formateQueryDate(new Date());
                var theEndDate = new Date();//dateUtil.parserDate( theDateStrDate+" 23:59:59");
                // debugger;


                var theMaxTime = 0;
                var theExistDataMap = {};
                var theMinValue = -1;
                var theMaxValue = 0;
                var theAvgValue = 0;
                var theTotalValue = 0;
                var theTotalNum = theData.data&&theData.data.length||0;
                (theData.data||[]).map(m => {
                    var theCurrentDate = new Date(m.stat_date);
                    theExistDataMap[theCurrentDate.getTime()] = m;
                    theMaxValue = Math.max(theMaxValue, m.population_gd);
                    if (theMinValue < 0) {
                        theMinValue = m.population_gd;
                    }
                    else {
                        theMinValue = Math.min(theMinValue, m.population_gd);
                    }
                    theTotalValue += m.population_gd;
                    if (theMaxTime < theCurrentDate.getTime()) {
                        theMaxTime = theCurrentDate.getTime();
                    }
                });
                if (theTotalNum > 0) {
                    theAvgValue = theTotalValue / theTotalNum;
                }
                console.log("统计结果展示", theMinValue, theMaxValue, theAvgValue);

                debugger;
                theAvgValue = transform.getProvinceValue(area, date);
                // debugger;
                var theDefaultList = dateUtil.genMinuteData(theFromDate, theEndDate, 5*12, {
                    population_gd: theAvgValue||0,
                    population_in: 0,
                    population_out: 0
                });
                theDefaultList.map(m => {
                    // debugger;
                    if (theExistDataMap[m.date.getTime()]) {
                        // debugger;
                        var theExistValue = theExistDataMap[m.date.getTime()];
                        var theCurrentMinValue = m.value.population_gd *8/ 10;
                        if(theExistValue.population_gd<=theCurrentMinValue){
                            theExistValue.population_gd=m.value.population_gd+(theExistValue.population_gd%100000)//;(theExistValue.population_in-theExistValue.population_out);
                            theExistValue.population_gd=m.value.population_gd+(theExistValue.population_gd%100000)//;(theExistValue.population_in-theExistValue.population_out);
                            console.log("数据不正常!");
                        }
                        m.value = theExistValue;// theExistDataMap[m.date.getTime()];
                        // debugger;
                        m.value.stat_date = new Date(m.value.stat_date);
                    }
                    else {
                        m.value.stat_date = m.date;
                    }

                });
                // debugger;
                this.migrantCurrentTrend = theDefaultList.filter(m => m.date.getTime() <= theMaxTime);//;

            },
            /***
             * 春运迁徙趋势
             * @param areaNo 地市编号：全省、GZ、SZ
             * @param startDate
             * @param endDate
             * @returns {Promise<void>} 响应说明:total:总人口，resident:常驻人口，mig_in:迁入量，mig_out:迁出量，flow:流动人口
             */
            async getMigrantHistoricalTrend(areaNo, startDate, endDate) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/lkfx/getMigrantHistoricalTrend", {
                    areaNo: transform.getCityCodeByName(areaNo),
                    startDate: startDate,
                    endDate: endDate
                });
                /*
             flow: 26204114
             mig_in: 1846932
             mig_out: 1281068
             province_city: "全省"
             resident: 81095797
             stat_date: "20190301"
             total: 107137697
             * */
                var theDefaultList = dateUtil.genDayData(new Date(startDate + " 00:00:00"), new Date(endDate + " 00:00:00"), 1, {
                    flow: 0,
                    mig_in: 0,
                    mig_out: 0,
                    // province_city: "全省",
                    resident: 0,
                    stat_date: "",
                    total: 0
                });
                // debugger;
                var theExistDataMap = {};
                theData.data.map(m => {
                    theExistDataMap[dateUtil.parserDate(m.stat_date).getTime()] = m;
                });
                theDefaultList.map(m => {
                    let theDate = m.date;
                    if (theExistDataMap[theDate.getTime()]) {
                        m.value = theExistDataMap[theDate.getTime()];
                    }
                    m.value.stat_date = theDate;
                });

                this.migrantHistoricalTrend = theDefaultList;
            },

            /**
             *人口分析
             * @param area 省市：广东省、广州、深圳
             * @param date
             * @returns {Promise<void>} 响应说明:ratio:男性占比，age_list:年龄段
             */
            async getMigrantPortrait(area, date) {
                //date 日期格式 2019-12-09
                let theData = await getData("/api/lkfx/getMigrantPortrait", {
                    area: transform.getCityName(area),
                    date: date
                });
                var theAgeList = theData.data.age_list;
                /**
                 * age_group: 1  0-6 取 1 到6
                 date_time: "2019-03-01"
                 pass_num: 687199
                 province: "广东省"
                 */
                var ageMap = { // 年龄
                    // 18: 5,
                    // 17: 5,
                    // 16: 5,
                    // 15: 5,
                    // 14: 5,
                    // 13: 5,
                    // 12: 5,
                    // 11: 5,
                    // 10: 5,
                    // 9: 5,
                    // 8: 5,
                    // 7: 4,
                    6: 4,
                    5: 3,
                    4: 2,
                    3: 1,
                    2: 0,
                    1: 0,
                    0: 0,
                };
                var theDefaultAgeValue = [
                    {name: "24岁以下", color: '#FFFF00', value: 0},
                    // {name: "18-24岁", color: '#18FF00', value: 0},
                    {name: "25-34岁", color: '#FFFF00', value: 0},
                    {name: "35-44岁", color: '#18FF00', value: 0},
                    {name: "45-54岁", color: '#FFFF00', value: 0},
                    {name: "55岁以上", color: '#18FF00', value: 0}];
                // this.agePart.map(m=>m.value=0);
                var theSumTotal = 0;
                theAgeList.map(m => {
                    if (m.age_group > 0) {
                        theSumTotal += m.pass_num;
                    }
                });
                var theTotalPerVal=0;
                theAgeList.map(m => {
                    if (m.age_group > 0) {
                        // this.$set(this.agePart[m.age_group-1],'value',(m.pass_num*100/theSumTotal).toFixed(0));
                        // theDefaultAgeValue[m.age_group - 1].value = Math.floor(m.pass_num * 100 / theSumTotal);
                        theDefaultAgeValue[ageMap[m.age_group]].value += Math.floor(m.pass_num * 100 / theSumTotal);
                        theTotalPerVal+=Math.floor(m.pass_num * 100 / theSumTotal);

                    }
                });
                if(theTotalPerVal>0){
                    theDefaultAgeValue[4].value+=(100-theTotalPerVal);
                }
                this.agePart = theDefaultAgeValue;
                this.sexPart.man = 0;
                // debugger;
                if (theData.data.ratio) {
                    var theRatio = theData.data.ratio[0].ratio;
                    this.sexPart.man = theRatio * 100;
                }

                /**
                 * date_time: "2019-03-01"
                 province: "广东省"
                 ratio: 0.54
                 */
            },
            async loadData(date, area) {
                var theEndTime = date;
                var theBeginTime = dateUtil.beforeDays(dateUtil.parserDate(theEndTime), 6);
                var theCurrentQueryStr = dateUtil.formateQueryDate(theEndTime);
                var theStartQueryStr = dateUtil.formateQueryDate(theBeginTime);
                this.getHotRoad(theCurrentQueryStr);
                this.getMigrantCurrent(theCurrentQueryStr, area);
                this.getMigrantCurrentTrend(area, theCurrentQueryStr);
                // this.getMigrantHistoricalTrend(area, theStartQueryStr, theCurrentQueryStr);
                this.getMigrantPortrait(area, theCurrentQueryStr);
            },
            async refresh() {
//todo 更新数字
//                 this.currentDate, this.currentArea
//                 this.currentArea = this.currentArea || "广东省";
                var area = this.currentArea|| "广东省";
                var theEndTime = dateUtil.parserDate(this.currentDate);
                var theBeginTime = dateUtil.beforeDays(theEndTime, 6);
                var theCurrentQueryStr = dateUtil.formateQueryDate(theEndTime);
                // this.getHotRoad(theCurrentQueryStr);
                this.getMigrantCurrent(theCurrentQueryStr, area);
            },
            async initMap() {
                // var satellite = new AMap.TileLayer.Satellite();
                // var roadNet = new AMap.TileLayer.RoadNet();
                // let id = this.id
                // //创建地图
                // var map = new AMap.Map('container', {
                //     pitch: 0,
                //     // mapStyle: 'amap://styles/9f47a75c5a80f716945988ccbc61aeb7',
                //     // viewMode: '3D',// 地图模式
                //     center: id == 1 ? [114.067447, 22.33259] : [110.432232, 20.225891],//港珠澳大桥
                //
                //     //center:[110.322391,20.146053 ],//琼州海峡 //lat: 20.146053  lng: 110.322391
                //
                //     //center: [113.275824, 22.994826],
                //     // features: ['bg'],//, 'building', 'point', 'road'],//['all'],// ['bg', 'building','point'],
                //     // zoom: id == 1 ? 11 : 11.5,// 11.78,
                //     // zooms: [10, 20],
                //     zoom: 4,
                //     keyboardEnable: false,
                //     layers:
                //         [
                //             satellite,
                //             // building,
                //             //roadNet
                //         ]
                // });
                // this.theMap = map;

            },
            async navigate() {

            },
            async onAreaChange(area) {
                this.getMigrantCurrent(theCurrentQueryStr, area);
                this.getMigrantCurrentTrend(area, theCurrentQueryStr);
                this.getMigrantHistoricalTrend(area, theStartQueryStr, theCurrentQueryStr);
                this.getMigrantPortrait(area, theCurrentQueryStr);
            }
        },


    }
</script>

<style lang='scss' scoped>
    .province-view {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        .bgimage-1 {
            position: absolute;
            left: 16px;
            right: 8px;
            bottom: 16px;
            top: 0px;
            /*background-image: url("assets/world/背景@2x.png");*/
            /*background-size: 2345px 962px;*/
            background-repeat: no-repeat;
            background-size: 100% 100%;
            /*background-position: 16px 0px;*/
        }
        .bgimage-2 {
            position: absolute;
            /*left: 45px;*/
            /*right: 45px;*/
            /*bottom: 16px;*/
            /*top:0px;*/
            height: 882px;
            left: 32px;
            right: 23px;
            bottom: 16px;
            /*top:0px;*/

            background-image: url("assets/world/地图下方背景线@2x.png");
            /*background-size: 2345px 962px;*/
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .left-part {
            position: absolute;
            width: 847+5px;
            left: 0px;
            top: 10px;
            height: 961px;
            /*bottom: 0px;*/
            #container {
                position: absolute;
                left: 0px;
                top: 6px;
                bottom: 0px;
                right: 0px;
            }
        }

        .right-part {
            position: absolute;
            left: 847px;
            right: 0px;
            top: 10px;
            bottom: 0px;
            .item {
                .title-part {
                    position: absolute;
                    left: 28px;
                    top: 0px;
                    /*right: 100px;*/
                    right: 0px;
                    height: 54px;
                    border-bottom: 2px solid rgba(6, 136, 201, 1);
                    /*border-image: -webkit-linear-gradient(#0688C9, #000) 90 90;*/
                    /*border-image: -moz-linear-gradient(#0688C9, #000) 90 90;*/
                    /*border-image: linear-gradient(#0688C9, #000) 90 90;*/
                    .title {
                        font-size: 20px;
                        position: absolute;
                        top: 27px;
                        left: 58-28px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(253, 253, 253, 1);
                    }
                    .icon {
                        position: absolute;
                        left: 28-28px;
                        top: 27px;
                        &.icon1 {
                            background-repeat: no-repeat;
                            background-image: url("assets/province/旅客分析icon@2x.png");
                            width: 20px;
                            height: 20px;
                            background-size: 100% 100%;
                        }
                        &.icon2 {
                            background: #00FFFF;
                            width: 9px;
                            height: 20px;
                            background-size: 100% 100%;
                        }
                    }
                    .unit {
                        position: absolute;
                        top: 23px;
                        right: 43px;
                        width: 100px;
                        height: 15px;
                        text-align: right;
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(254, 254, 254, 1);
                    }
                }
                .body {
                    position: absolute;
                    top: 54px;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    .content {
                        position: absolute;
                        bottom: 41px;
                        left: 0px;
                        top: 0px;
                        right: 0px;
                    }
                    .page {
                        position: absolute;
                        bottom: 20px;
                        left: 0px;
                        height: 8px;
                        right: 0px;
                        text-align: center;
                        .page-item {
                            display: inline-block;
                            width: 68px;
                            height: 8px;
                            cursor: pointer;
                            background: rgba(155, 163, 167, 1);
                            margin-right: 8px;
                            margin-left: 8px;
                            &.select {
                                background: rgba(21, 184, 251, 1);
                            }
                        }
                    }
                }

            }
            .item-1 {
                position: absolute;
                left: 0px;
                top: 0+2px;
                width: 1011px;
                height: 201px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                /*background-image: url("assets/province/旅客分析底框@2x.png");*/
                .sex-part {
                    position: absolute;
                    left: 0px;
                    top: 14px;
                    bottom: 5px;
                    width: 323px;
                    border-right: 1px solid rgba(21, 141, 211, 1);
                    /*background: red;*/
                    .manwomanContent {
                        position: absolute;
                        left: 19px;
                        top: 21px;
                        right: 34px;
                        bottom: 10px;
                    }

                }
                .age-part {
                    position: absolute;
                    left: 324px;
                    top: 14px;
                    bottom: 5px;
                    right: 0px;
                    /*background: blue;*/
                    .huan-content {
                        position: relative;
                        width: 84px;
                        height: 84+16+10px;
                        /*margin-right: 22px;*/
                        margin-left: 41px;
                        display: inline-block;
                        &.huan-content:nth-child(1) {
                            /*margin-left: 41px;*/
                        }
                    }
                }

            }
            .item-2 {
                position: absolute;
                left: 0px;
                top: 204+3px;
                width: 501px;
                height: 375px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-image: url("assets/province/实时趋势@2x.png");
                .item {
                    display: inline-block;
                    width: 43+32+43px;
                    text-align: center;
                    &.right-border {
                        border-right: 1px solid rgba(72, 133, 234, 1);
                    }
                }

            }
            .item-3 {
                position: absolute;
                left: 510px;
                top: 204+3px;
                width: 501px;
                height: 375px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-image: url("assets/province/实时趋势@2x.png");
                .data-box-header-r{
                    position: absolute;
                    right: 42px;
                    top:10px;
                    width: 236px;
                    height: 40px;
                    background: #091F6C;
                }

            }
            .item-4 {
                position: absolute;
                width: 1011px;
                height: 379px;
                top: 588+1px;
                left: 0px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-image: url("assets/province/迁徙路线底框@2x.png");

            }

        }

        .number-part {
            /*left: 101px;*/
            /*top: 54px;*/
            left: 72px;
            top: 87px;
        }
        .page-title {
            position: absolute;
            top: 38px;
            left: 76-4px;
            background-image: url("assets/province/bj_title@2x.png");
            width: 489px;
            height: 40px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            line-height: 40px;
            color: rgba(254, 254, 254, 1);
            text-align: left;
            .name1 {
                font-weight: bold;
            }
            .name2 {
                font-size: 16px;
                font-weight: normal;
            }
            .icon {
                display: inline-block;
                margin-left: 10px;
                margin-right: 10px;
                width: 4px;
                height: 14px;
                background: rgba(0, 252, 255, 1);
            }
        }
        .nav-bar {
            position: absolute;
            bottom: 10px;
            left: 10px;
            div {
                display: inline-block;
                cursor: pointer;
                margin: 10px;
            }
        }

        .bgimage-1 {
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            top: 0px;
            pointer-events: none;
            /*background: #0C2449;*/
            background-image: url("assets/province/bg.png");
            /*background-size: 2345px 962px;*/
            background-repeat: no-repeat;
            background-size: 100% 100%;
            /*background-position: 16px 0px;*/
        }
    }

</style>
