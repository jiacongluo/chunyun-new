<template>
    <div class="map-box-outer2 full-div">
        <div :class="['map-box-outer',detailMode?'detail':'']">
            <mapBox ref="mapBox"></mapBox>
        </div>
        <div v-if="detailMode==false" class="page-title">
            服务区总览:<span class="number">{{zhonglan.total}}</span> <span class="unit">个</span>
        </div>
        <div v-if="detailMode" class="detail-page-title">
            <span class="name">{{detailItem}}</span> <span class="return" @click="detailMode=false"></span>
        </div>
        <div v-if="detailMode==false" class="left-part">
            <div class="up-nav" @click="downLeft">

            </div>
            <div ref="leftItems" class="item-wrap">
                <div v-for="(item,index)  in warnList" class="item" @click="detailItem= item.postion_name">
                    <div class="title">
                        {{item.postion_name}}
                    </div>
                    <div class="number-part">
                        <div class="name">当前人数:</div>
                        <div class="number color-yellow">{{item.user_cnt.toFixed(0)}}人</div>
                    </div>
                    <div class="state-part">
                        <div class="name">状&nbsp&nbsp&nbsp&nbsp态:</div>
                        <div :class="['state', lvObj[item['status']]]">{{item["status"]}}</div>

                    </div>
                </div>
            </div>

            <div class="down-nav" @click="upLeft">

            </div>
        </div>
        <div v-if="detailMode==false" class="total-part">
            <div class="item">
                拥挤<span class="number yongji">{{zhonglan.high}}</span><span class="unit">个</span>
            </div>
            <div class="item">
                适中<span class="number shizhong">{{zhonglan.medium}}</span><span class="unit">个</span>
            </div>
            <div class="item">
                舒适<span class="number shushi">{{zhonglan.low}}</span><span class="unit">个</span>
            </div>
        </div>
        <div v-if="detailMode" class="right-part">
            <div class="item item-1">
                <div class="title-part linear-border">
                    <div class="icon icon1"></div>
                    <div class="title">
                        实时客流趋势
                    </div>
                </div>
                <div class="body">
                    <ChartQuShi :data="qushiData"></ChartQuShi>
                </div>
            </div>
            <div class="item item-2">
                <div class="title-part linear-border">
                    <div class="icon icon1"></div>
                    <div class="title">
                        实时客流驻留时长分析
                    </div>
                </div>
                <div class="body">
                    <ChartShiChang :data="zhuliuData"></ChartShiChang>
                </div>
            </div>
            <div class="item item-3">
                <div class="title-part linear-border">
                    <div class="icon icon3"></div>
                    <div class="title">
                        旅客画像
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
            <div class="item item-4">
                <div class="title-part linear-border">
                    <div class="icon icon4"></div>
                    <div class="title">
                        归属分析
                    </div>
                </div>
                <div class="body">
                    <div :class="['body-content', 'selected'+guishuSelected]">
                        <div class="tab-items ">
                            <div :class="['tab-item', guishuSelected==3?'selected':'']"
                                 @click="guishuSelected=3;areaScope='省内'">
                                省内来源({{guishuData.shengnei.toFixed(1)}}%)
                            </div>
                            <div :class="['tab-item', guishuSelected==2?'selected':'']"
                                 @click="guishuSelected=2;areaScope='省外'">
                                省外来源({{guishuData.shengwai.toFixed(1)}}%)
                            </div>

                            <div :class="['tab-item', guishuSelected==1?'selected':'']"
                                 @click="guishuSelected=1;areaScope='境外'">
                                国外来源({{guishuData.jingwai.toFixed(1)}}%)
                            </div>
                        </div>
                        <div class="tab-content">
                            <chartGuiShu :data="guishulist"></chartGuiShu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div v-if="detailMode" :class="['weather-part',wcCount?'':'normal']">-->
        <!--<div class="text-line"><span class="icon icon1"></span>{{weatherData.datetime}}</div>-->
        <!--<div class="text-line"><span class="icon icon2"></span><span class="number">{{weatherData.temp}}</span>℃-->
        <!--</div>-->
        <!--<div class="text-line"><span :class="['icon', 'icon3',weatherIcon]"></span>{{weatherData.weather}}</div>-->
        <!--<div class="text-line"><span class="icon icon4"></span>{{weatherData.wind}}</div>-->
        <!--<div class="text-line" v-if="wcCount"><span class="icon icon5" ></span> 厕所{{wcCount||'未知'}}{{wcCount?'个':''}}</div>-->
        <!--</div>-->

        <div v-if="detailMode" :class="['weather-part2',wcCount?'':'normal']">
            <div class="text-line icon icon1">
                日期
                <div class="value">
                    <!--{{weatherData.datetime}}-->
                    <datePicker :noborder="true" :value.sync="currentWeatherDate"></datePicker>
                </div>
            </div>
            <div class="text-line icon icon2">
                温度
                <div class="value" v-html="">
                    {{weatherData.temp}}℃
                </div>

                <!--<span class="number">{{weatherData.temp}}</span>℃-->
            </div>
            <div :class="['icon','text-line', 'icon3',weatherData.weatherIcon]">
                天气状况
                <div class="value" v-html="weatherData.weather">
                    <!--{{weatherData.weather}}-->
                </div>
            </div>
            <div class="text-line icon icon4">
                风速
                <div class="value" v-html="weatherData.wind">
                    <!--{{weatherData.wind}}-->
                </div>
            </div>
            <div class="text-line icon icon5" style="outline:none;" v-if="wcCount" @keydown.alt="enableWc=true" @keydown.ctrl="enableWc=false" @click="wcVisible=!wcVisible" tabindex="0">
                厕所
                <div class="value">
                    {{wcCount}}个
                </div>
            </div>
        </div>
        <div v-if="detailMode&&wcVisible&&wcCount&&enableWc" class="wc-part2">
            <div class="item">
                <table>
                    <tr>
                        <td rowspan="2">
                            <div class="man-icon"></div>
                        </td>
                        <td>
                            小便器
                        </td>
                        <td>
                            大便器
                        </td>
                        <td>
                            <div class="state-name">状态</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="number">{{wcData.manUrinal}}</div>
                        </td>
                        <td>
                            <div class="number">{{wcData.manSquat}}</div>
                        </td>
                        <td>
                            <div :class="['state','s'+wcData.manLevel]">{{wcData.manLevelText}}</div>
                        </td>
                    </tr>
                </table>
                <!--<div class="part-item">-->
                    <!--<div>小便器</div>-->
                    <!--<div class="number">{{wcData.manUrinal}}</div>-->
                <!--</div>-->
                <!--<div  class="part-item">-->
                    <!--<div>大便器</div>-->
                    <!--<div class="number">{{wcData.manSquat}}</div>-->
                <!--</div>-->
                <!--<div  class="part-item">-->
                    <!--<div>状态</div>-->
                    <!--<div :class="['state','s'+wcData.manLevel]">{{wcData.manLevelText}}</div>-->
                <!--</div>-->
            </div>
            <div class="item">
                <table>
                    <tr>
                        <td rowspan="2">
                            <div class="woman-icon"></div>
                        </td>
                        <td>
                            蹲位器
                        </td>
                        <td>

                        </td>
                        <td>
                            <div class="state-name">状态</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="number">{{wcData.womanSquat}}</div>
                        </td>
                        <td>

                        </td>
                        <td>
                            <div :class="['state','s'+wcData.womanLevel]">{{wcData.womanLevelText}}</div>
                        </td>
                    </tr>
                </table>

                <!--<div  class="part-item">-->
                    <!--<div>蹲位器</div>-->
                    <!--<div class="number">{{wcData.womanSquat}}</div>-->
                <!--</div>-->
                <!--<div  class="part-item">-->
                   <!--<div>状态</div>-->
                    <!--<div :class="['state','s'+wcData.womanLevel]">{{wcData.womanLevelText}}</div>-->
                <!--</div>-->
            </div>
        </div>

        <!--总览 开始-->
        <!--<div class="box4-ul">-->
        <!--<box4Ul></box4Ul>-->
        <!--</div>-->

        <!--搜索框-->
        <div v-if="detailMode==false" :class="['box', 'box5',detailMode?'detail':'']">
            <!--<searchBox :detailItem.sync="detailItem" :stationList="stationList"></searchBox>-->
            <searchBoxDetail :detailItem.sync="detailItem" :stationList="stationList"></searchBoxDetail>
        </div>
        <div v-else :class="['box', 'box5',detailMode?'detail':'']">
            <searchBoxDetail :detailItem.sync="detailItem" :stationList="stationList"></searchBoxDetail>
        </div>

        <div class="hide-part" style="display: none">
            <div ref="detailFlow" class="detail-flow" id="detail-flow">
                <div class="item">
                    <div class="name">
                        实时人数
                    </div>
                    <div class="number">
                        {{detailFlow.totalNum.toFixed(0)}}
                    </div>
                </div>
                <div class="item">
                    <div class="name">
                        实时进入人数
                    </div>
                    <div class="number green">
                        {{detailFlow.inNum.toFixed(0)}}
                    </div>
                </div>
                <div class="item">
                    <div class="name">
                        实时离开人数
                    </div>
                    <div class="number green">
                        {{detailFlow.outNum.toFixed(0)}}
                    </div>
                </div>
                <div class="item">
                    <div class="name">
                        小时新增人数
                    </div>
                    <div class="number">
                        {{detailFlow.addNum.toFixed(0)}}
                    </div>
                </div>
            </div>
        </div>
        <div :class="['sw-btn-outer',detailMode?'selected':'']">
            <mapSWBtn @changeSatellite="clickSWBtn"></mapSWBtn>
        </div>
    </div>

</template>

<script>
    import {postData, post2, getData} from '@/utils/core/http'
    import weather from '.././../../utils/weather'
    import huanChart from './huanChart'
    import manWoman from './manWoman'
    import datePicker from '../../../components/datePickerWeather'
    import mapSWBtn from '@/components/mapSWBtn2'
    import station2018 from '@/utils/station2018'
    import placePointData from '@/utils/placePointData'
    import chartGuiShu from './ChartGuiShu'
    import ChartQuShi from './ChartQuShi'
    import ChartShiChang from './ChartShiChang'
    import chart1 from './chart1'
    import chart2 from './chart2'
    import mapBox from './mapBox'
    import searchBox from './searchBox'
    import searchBoxDetail from './searchBoxDetail'
    import leftTabBox from './leftTabBox'
    import box4Ul from './box4Ul'
    import dateUtil from '../../../utils/dateUtil'


    export default {
        name: '',

        mixins: [],

        components: {
            chart1, chart2, mapBox,
            mapSWBtn,
            // popPaiban,
            ChartShiChang,
            ChartQuShi,
            huanChart,
            chartGuiShu,
            manWoman,
            datePicker,
            searchBox,
            searchBoxDetail,
            box4Ul,
            leftTabBox
        },

        props: {},

        data() {
            var theDate=new Date();
            var theNumber=2;
            //14点30分 T+2
            if(theDate.getHours()>14||(theDate.getHours()==14&&theDate.getMinutes()>30)){
                theNumber=1;
            }
            return {
                //服务区映射
                wcCount: 0,//厕所数量
                wcData: {},//厕所详情
                weatherIcon: '',
                serviceAreaMap: {},
                guishuSelected: 3,
                currentWeatherDate: dateUtil.formateCnDate(new Date()),
                currentDate: dateUtil.formateQueryDate(dateUtil.beforeDays(new Date(), theNumber)),// '2019-01-01',
                detailMode: false,
                wcVisible: false,
                enableWc:true,
                sexPart: {
                    man: 0
                },
                guishulist: [],
                guishuData: {
                    shengnei: 0,
                    shengwai: 0,
                    jingwai: 0,
                },
                areaScope: '省内',
                agePart: [
                    // {name: "18岁以下", color: '#FFFF00', value: 0},
                    // {name: "18-24岁", color: '#18FF00', value: 0},
                    {name: "24岁以下", color: '#18FF00', value: 0},
                    {name: "25-34岁", color: '#FFFF00', value: 0},
                    {name: "35-44岁", color: '#18FF00', value: 0},
                    {name: "45-54岁", color: '#FFFF00', value: 0},
                    {name: "55岁以上", color: '#18FF00', value: 0}],
                detailItem: '',
                search: '',
                lvObj: {
                    '拥挤': 'yongji',
                    '适中': 'shizhong',
                    '舒适': 'shushi'
                },
                warnList: [],
                theMap: null,
                stationList: [],
                stationStateList: [],
                zhuliuData: [],
                qushiData: [],
                zhonglan: {},
                weatherData: {
                    datetime: dateUtil.formateCnDate(new Date()),
                    temp: '',
                    direction: '  &nbsp',
                    wind: '  &nbsp',
                    weather: '  &nbsp'
                },
                weatherDatas: {},
                //实时人口信息
                detailFlow: {
                    totalNum: 0,
                    inNum: 0,
                    outNum: 0,
                    addNum: 0
                }
            }
        },

        computed: {},

        watch: {
            async currentWeatherDate(newData, oldData) {
                this.weatherData = this.weatherDatas[newData] || {
                    datetime: '',
                    temp: '',
                    direction: '  &nbsp',
                    PREDICTION_TIME: '24',
                    wind: '  &nbsp',
                    weatherIcon: '',
                    weather: '  &nbsp'
                };
            },
            //
            async areaScope(newData, oldData) {
                this.getServiceAscriptionScope(this.areaScope, this.detailItem, this.currentDate)
            },
            //
            detailMode(newData, oldData) {
                if (!newData) {
                    this.$refs.mapBox.pointControl.hidePointMarkDetail();
                    this.$refs.mapBox.pointControl.ReturnDefualt(8);
                    this.detailItem = "";
                    this.getServiceAreaWarningList();
                }
            },
            async detailItem(newValue, oldValue) {
                if (newValue) {
                    this.detailMode = true;
                    this.$refs.mapBox.pointControl.hidePointMarkDetail();
                    this.$refs.mapBox.pointControl.MoveToPointName(newValue, 17);
                    this.$refs.mapBox.pointControl.showMarkPointDetailByName(newValue, this.$refs.detailFlow);
                    var theMap = {
                        // "勒流服务区-向西":'勒流收费站-向西'
                    };
                    var theArea = theMap[newValue] || newValue;

                    this.getServiceAreaFlow(theArea);
                    this.getServiceFlowTrend(theArea, '');

                    this.getServiceStay(theArea, '');
                    this.getServiceAscriptionType(theArea, this.currentDate);
                    this.getServiceAscriptionScope(this.areaScope, theArea, this.currentDate)
                    this.getWeathers(theArea);
                    await this.getServiceSexAge(theArea, this.currentDate);
                    this.getWcCount(theArea);
                }

            },
            id(n, o) {
                this.initEvent()
            },

        },

        created() {
        },

        mounted() {
            this.initEvent();

        },

        destroyed() {
        },

        methods: {
            async refresh() {
                console.log("开始刷新服务区");
                this.getServiceAreaWarningList();
                if (this.detailItem) {
                    this.getServiceAreaFlow(this.detailItem);
                    this.getServiceStay(this.detailItem, this.currentDate);
                    this.getServiceFlowTrend(this.detailItem, this.currentDate);
                }
            },
            clickSWBtn() {
                this.$refs.mapBox.isSatellite = !this.$refs.mapBox.isSatellite;
            },
            async upLeft() {
                var theUnit = this.$refs.leftItems.clientHeight;
                // debugger;
                for (var i = 1; i <= 10; i++) {
                    this.$refs.leftItems.scrollTop += theUnit / 10;
                    await  this.sleep(25);
                }
                var theRemain = this.$refs.leftItems.scrollTop % theUnit;
                console.log("误差上", theRemain);
                if (theRemain < theUnit / 2) {
                    this.$refs.leftItems.scrollTop += theRemain;
                }
                else {
                    this.$refs.leftItems.scrollTop += (theUnit - theRemain);
                }


            },
            async downLeft() {
                // this.$refs.leftItems.scrollTop -= 146 * 4;
                var theUnit = this.$refs.leftItems.clientHeight;
                for (var i = 1; i <= 10; i++) {
                    this.$refs.leftItems.scrollTop -= theUnit / 10;
                    await  this.sleep(25);
                }
                var theRemain = this.$refs.leftItems.scrollTop % theUnit;
                console.log("误差下", theRemain);
                if (theRemain < theUnit / 2) {
                    this.$refs.leftItems.scrollTop -= theRemain;
                } else {
                    this.$refs.leftItems.scrollTop += (theUnit - theRemain);
                }
            },
            sleep(timeout) {
                return new Promise((resolve, reject) => {
                    //这里模拟异步动作，一般来说可以放置Ajax请求, 'promise1-result'为请求成功后的返回结果
                    //注：Promise实例只能通过resolve 或 reject 函数来返回，并用then()或者catch()获取
                    //不能在里面直接return ... 这样是获取不到Promise返回值的
                    setTimeout(() => resolve('ok'), timeout)
                })
            },
            async initEvent() {
                this.detailFlowEle = this.$refs.detailFlow;
                await this.getServiceAreaList();
                this.getServiceAreaWarningList();
                var me = this;
                this.$refs.mapBox.pointControl.listeners = function (data, marker) {
                    me.onDetialClick(data, marker);
                };
            },
            ///api/serviceArea/getServiceAscriptionScope
//wcCount
            //计算厕所状态
            //  calWcState() {
            //     var theMan = 30;
            //     var theWoman = 20;
            //     var theManRate=this.sexPart.man;
            //     var theWomanRate=100-theManRate;
            //     var theManTotal=100;
            //     var theWomanTotal=100;
            //
            //     var theTotalNum = this.detailFlow.inNum;
            //     //50-80 为适中
            //     var theTotalAll=theManTotal*theMan+theWomanTotal*theWoman;
            //
            //     return 0;
            //
            // },
            async getWcCount(postionName) {
                this.wcCount = 0;
                this.wcData = {
                    manUrinal: 0,//男小便器
                    manSquat: 0,//男大便器
                    womanSquat: 0,//女尊位
                    total: 0//厕所总数
                };
                const url = 'api/serviceArea/getServiceToilet';
                let theData = await  getData(url, {
                    postionName: postionName,
                    postionID: this.serviceAreaMap[postionName]
                });
                var theWcData = {};
                theWcData = theData.data;
                if (theWcData && theWcData.total) {
                    this.wcCount = theWcData.total;
                    var theTotalNum = this.detailFlow.addNum*0.5;
                    var theManUnit = 30;
                    var theWomanUnit = 20;
                    var theTotalWoman = theWomanUnit * theWcData.womanSquat;
                    var theRealWoman = theTotalNum * (100 - parseFloat(this.sexPart.man)) / 100;
                    var theWomanRate = theRealWoman * 100 / theTotalWoman
                    var theTotalMan = theManUnit * (theWcData.manUrinal + theWcData.manSquat);
                    var theRealMan = theTotalNum * parseFloat(this.sexPart.man) / 100;
                    var theManRate = theRealMan * 100 / theTotalMan;
                    theWcData.manLevel = 0;
                    theWcData.womanLevel = 0;

                    theWcData.manLevelText = "舒适";
                    theWcData.womanLevelText = "舒适";
                    theWcData.manRate = theManRate;
                    if (theWcData.manRate > 50 && theWcData.manRate <= 80) {
                        theWcData.manLevel = 1;
                        theWcData.manLevelText = "适中";
                    }
                    if (theWcData.manRate > 80) {
                        theWcData.manLevel = 2;
                        theWcData.manLevelText = "拥挤";
                    }

                    theWcData.womanRate = theWomanRate;

                    if (theWcData.womanRate > 50 && theWcData.womanRate <= 80) {
                        theWcData.womanLevel = 1;
                        theWcData.womanLevelText = "适中";
                    }
                    if (theWcData.womanRate > 80) {
                        theWcData.womanLevel = 2;
                        theWcData.womanLevelText = "拥挤";
                    }

                }
                else{
                    // this.wcVisible=false;
                }

                this.wcData = theWcData;

            },
            ///api/gdcnymotOut/weather/{city}
            async getWeather(area) {
                this.currentWeatherDate = dateUtil.formateCnDate(new Date());
                var theAreaItem = this.serviceAreaItemMap[area];
                if (!theAreaItem) {
                    console.log("未找到城市", area);
                }
                const url = 'api/gdcnymotOut/weather/' + theAreaItem.city;
                let theData = await  getData(url, {});
                var theItem = theData.data;
                /*
         日期 DDATETIME
 最低温度 MIN_TEMP_24
 最高温度 MAX_TEMP_24
 12小时天气现象 WEATHER_TYPE_12
 12小时风向 WIND_DIRECTION_12
 12小时风速 WIND_SPEED_12
         * */
                var theIconMap = {
                    "阵雨": "小雨.png"
                };
                var theWeathData = {
                    datetime: '',
                    temp: '',
                    direction: '',
                    wind: '',
                    weather: ''
                };
                theWeathData.datetime = (dateUtil.formateCnDate(new Date()) || '');//( dateUtil.formateQueryDate(new Date(theItem['DDATETIME'])) || '');//日期
                var theMinTemp = parseFloat(theItem['MIN_TEMP_24']);
                var theMaxTemp = parseFloat(theItem['MAX_TEMP_24']);
                theWeathData.temp = (Math.floor(theMinTemp) + '-' + Math.ceil(theMaxTemp) + '' || '');//温度
                theWeathData.direction = (theItem['WIND_DIRECTION_12'] || '');//风力
                theWeathData.wind = (theItem['WIND_SPEED_12'] || '');//
                theWeathData.weather = (theItem['WEATHER_TYPE_12'] || '');//
                this.weatherData = theWeathData;
                // if (theItem['WEATHER_TYPE_12']) {
                //     var theImage = theIconMap[theItem['WEATHER_TYPE_12']];
                //     //debugger;
                //     if (!theImage) {
                //         var theImage = theItem['WEATHER_TYPE_12'];
                //         if (theImage.indexOf('-') > 0) {
                //             theNames = theImage.split('-');
                //             theImage = theNames[theImage.length - 1]
                //         }
                //         theImage += '.png';
                //         var theImageE = $(this).find('.weather-icon.change');
                //         theImageE.attr('src', theImageE.data('base') + theImage);
                //     }
                // }
                //
                // $(theFields[4]).text(theItem['WEATHER_TYPE_12'] || '暂无');//

                this.weatherIcon = weather.getIcon(theWeathData.weather);
            },
            async getWeathers(area) {
                this.currentWeatherDate = dateUtil.formateCnDate(new Date());
                var theAreaItem = this.serviceAreaItemMap[area];
                if (!theAreaItem) {
                    console.log("未找到城市", area);
                }
                const url = 'api/gdcnymotOut/sevenDaysWeather/' + theAreaItem.city;
                let theData = await  getData(url, {});
                var theItems = theData.data || [];
                var theWeathDatas = [];
                var theTempDatas = {};
                var theUnit = 24;
                var theIndex = 0;
                var theCurrentDate = new Date();
                for (var i = 0; i < theItems.length; i++) {

                    var theItem = theItems[i];
                    /*
             日期 DDATETIME
     最低温度 MIN_TEMP_24
     最高温度 MAX_TEMP_24
     12小时天气现象 WEATHER_TYPE_12
     12小时风向 WIND_DIRECTION_12
     12小时风速 WIND_SPEED_12
             * */

                    var theWeathData = {
                        datetime: '',
                        temp: '',
                        direction: '  &nbsp',
                        PREDICTION_TIME: '24',
                        wind: '  &nbsp',
                        weatherIcon: '',
                        weather: '  &nbsp'
                    };
                    theWeathData.datetime = (dateUtil.formateCnDate(new Date()) || '');//( dateUtil.formateQueryDate(new Date(theItem['DDATETIME'])) || '');//日期
                    var theMinTemp = parseFloat(theItem['MIN_TEMP_24']);
                    var theMaxTemp = parseFloat(theItem['MAX_TEMP_24']);
                    theWeathData['PREDICTION_TIME'] = theItem['PREDICTION_TIME'];
                    theWeathData.temp = (Math.floor(theMinTemp) + '-' + Math.ceil(theMaxTemp) + '' || '');//温度
                    theWeathData.direction = (theItem['WIND_DIRECTION_12'] || '');//风力
                    theWeathData.wind = (theItem['WIND_SPEED_12'] || '');//
                    theWeathData.weather = (theItem['WEATHER_TYPE_12'] || '');//
                    theWeathData.weatherIcon = weather.getIcon(theWeathData.weather);
                    // theWeathDatas.push(theWeathData);
                    var theTimeValue = parseInt(theWeathData.PREDICTION_TIME || '24');
                    var theTimeSpan = theTimeValue / 24 - 1;
                    var theTimesStr = dateUtil.formateCnDate(dateUtil.nextDays(new Date(), theTimeSpan > 0 ? theTimeSpan : 0));
                    theTempDatas[theTimesStr] = theWeathData;
                }
                // debugger;
                this.weatherDatas = theTempDatas;
                this.weatherData = this.weatherDatas[this.currentWeatherDate] || {
                    datetime: '',
                    temp: '',
                    direction: '  &nbsp',
                    PREDICTION_TIME: '24',
                    wind: '  &nbsp',
                    weatherIcon: '',
                    weather: '  &nbsp'
                };
            },
            async getServiceAscriptionScope(areaScope, postionName, countDate) {
                const url = 'api/serviceArea/getServiceAscriptionScope';
                this.guishulist = [];
                let theData = await  getData(url, {
                    postionName: postionName,
                    countDate: countDate,
                    areaScope: areaScope,
                    postionID: this.serviceAreaMap[postionName]
                });
                // this.qushiData = theData.data;
                // debugger;
                /*
                * ascriptionScope

area_name: "佛山"
area_num: 18090
area_zb: 0.4187
postion_name: "勒流服务区-向西"
                * */
                this.guishulist = theData.data.ascriptionScope;
            },

            //getServiceAscriptionType
            async getServiceAscriptionType(postionName, countDate) {
                const url = 'api/serviceArea/getServiceAscriptionType';
                var theDefaultguishuData = {
                    shengnei: 0,
                    shengwai: 0,
                    jingwai: 0
                }
                let theData = await  getData(url, {
                    postionName: postionName,
                    countDate: countDate,
                    postionID: this.serviceAreaMap[postionName]
                });
                /**
                 * categoryName: "1"
                 id: null
                 postionId: null
                 postionName: "勒流服务区-向西"
                 postionType: null
                 statDate: null
                 statTime: null
                 travelerValue: 43203
                 travelerZb: 0.8506
                 */
                    //:1省内,2省外,3境外
                    // this.qushiData = theData.data;
                var theMap = {
                        "1": "shengnei",
                        "2": "shengwai",
                        "3": "jingwai",
                    };
                // this.guishuData = {}

                (theData.data || []).map(m => {
                    theDefaultguishuData[theMap[m.categoryName]] = m.travelerZb * 100
                });
                // debugger;
                this.guishuData = theDefaultguishuData;
            },
            //实时客流趋势
            async getServiceFlowTrend(postionName, countDate) {
                const url = 'api/serviceArea/getServiceFlowTrend';
                let theData = await  getData(url, {
                    postionName: postionName,
                    countDate: countDate,
                    postionID: this.serviceAreaMap[postionName]
                });
                this.qushiData = theData.data;
                // debugger;
            },
            //查询服务区旅客画像
            async getServiceSexAge(postionName, countDate) {
                const url = 'api/serviceArea/getServiceSexAge';
                let theData = await  getData(url, {
                    postionName: postionName,
                    countDate: countDate,
                    postionID: this.serviceAreaMap[postionName]
                });
                /**
                 *  "id":null,
                 "statDate":null,
                 "statTime":null,
                 "postionType":null,
                 "postionName":"顺德服务区-向北",
                 "postionId":null,
                 "ageGroup":0,
                 "ageValue":null,
                 "ageZb":0.174
                 * */
                    // debugger;
                var service_age = theData.data.service_age;
                // var ageMap = { // 年龄
                //     18: 5,
                //     17: 5,
                //     16: 5,
                //     15: 5,
                //     14: 5,
                //     13: 5,
                //     12: 5,
                //     11: 5,
                //     10: 5,
                //     9: 5,
                //     8: 5,
                //     7: 4,
                //     6: 3,
                //     5: 2,
                //     4: 1,
                //     3: 1,
                //     2: 0,
                //     1: 0,
                //     0: 0,
                // };
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
                //service_age:年龄段分组:0为未知,1为0-17,2为18-24,3为25-34,4为35-44,5为45-54,6为55以上
                var theDefaultAgeValue = [
                    {name: "24岁以下", color: '#FFFF00', value: 0},
                    // {name: "18岁以下", color: '#FFFF00', value: 0},
                    // {name: "18-24岁", color: '#18FF00', value: 0},
                    {name: "25-34岁", color: '#FFFF00', value: 0},
                    {name: "35-44岁", color: '#18FF00', value: 0},
                    {name: "45-54岁", color: '#FFFF00', value: 0},
                    {name: "55岁以上", color: '#18FF00', value: 0}];
                // this.agePart.map(m=>m.value=0);
                var theSumTotal = 0;
                service_age.map(m => {
                    theSumTotal += m.ageValue
                });
                //ageValue
                // debugger;

                service_age.map(m => {
                    if (m.ageGroup > 0 && ageMap[m.ageGroup] >= 0) {
                        // this.$set(this.agePart[m.age_group-1],'value',(m.pass_num*100/theSumTotal).toFixed(0));
                        theDefaultAgeValue[ageMap[m.ageGroup]].value += (m.ageValue / theSumTotal);//m.ageZb;


                    }
                });
                // debugger;
                var theTotalPerVal = 0;
                theDefaultAgeValue.map(m => {
                    m.value = (m.value * 100).toFixed(1);
                    theTotalPerVal += parseFloat(m.value);
                });
                // debugger;
                if (theTotalPerVal > 0) {
                    theDefaultAgeValue[4].value = (parseFloat(theDefaultAgeValue[4].value + "") + (100 - theTotalPerVal)).toFixed(1);
                }
                this.agePart = theDefaultAgeValue;

                var service_sex = theData.data.service_sex;
                /* "id":null,
                "statDate":null,
                "statTime":null,
                "postionType":null,
                "postionName":"顺德服务区-向北",
                "postionId":null,
                "sex":1,//男
                "num":6661,
                "manZb":0.7243
                * */
                var man = 0;
                for (var i = 0; i < service_sex.length; i++) {
                    var theItem = service_sex[i];
                    if (theItem.sex == 1) {
                        man = (theItem.manZb * 100).toFixed(0);
                    }
                }

                var woman = 0;
                if (man <= 0.6 * 100) {
                    man = (0.6 * 100).toFixed(0);
                    woman = 100 - man;
                }
                else {
                    man = ((0.25 * (man / 100 - 0.6) + 0.6) * 100).toFixed(0);
                    woman = 100 - man;
                }
                this.sexPart.man = man;
                // debugger;
            },
            //查询服务区驻留时长分析_占比
            async getServiceStay(postionName, countDate) {
                const url = 'api/serviceArea/getServiceStay';
                let theData = await  getData(url, {
                    postionName: postionName,
                    countDate: countDate,
                    postionID: this.serviceAreaMap[postionName]
                });
                this.zhuliuData = theData.data;
                // debugger;
            },

            ///api/serviceArea/getServiceAreaWarningList
            async getServiceAreaWarningList() {
                this.zhonglan.medium = 0;
                this.zhonglan.low = 0;
                this.zhonglan.high = 0;
                this.zhonglan.total = this.zhonglan.medium + this.zhonglan.low + this.zhonglan.high;
                const url = '/api/serviceArea/getServiceAreaWarningList'
                const data = {}
                let theData = await  getData(url, data);
                //响应说明:warningList_low:舒适,warningList_medium:适中,warningList_high:拥挤
                this.zhonglan.medium = theData.data.warningList_medium.length;
                this.zhonglan.low = theData.data.warningList_low.length;
                this.zhonglan.high = theData.data.warningList_high.length;
                this.zhonglan.total = this.zhonglan.medium + this.zhonglan.low + this.zhonglan.high;
                this.warnList = []
                    .concat(theData.data.warningList_high.map(m => {
                        m.status = "拥挤";//"舒适";
                        return m;
                    }))
                    .concat(theData.data.warningList_medium.map(m => {
                        m.status = "适中";
                        return m;
                    }))
                    .concat(theData.data.warningList_low.map(m => {
                        m.status = "舒适";//"拥挤";
                        return m;
                    }));
                // .reverse();
                // debugger;
                this.$refs.mapBox.pointControl.showPointsByData(this.warnList);
            },
            // 服务区列表获取
            async getServiceAreaList() {
                const url = '/api/serviceArea/getServiceAreaList'
                const data = {}
                let theData = await  getData(url, data);

                this.stationList = (theData.data || []).filter(m => m.postion_type == "服务区");
                this.serviceAreaMap = {};
                this.serviceAreaItemMap = {};
                this.stationList.map(m => {
                    this.serviceAreaMap[m.postion_name] = m.postion_id;
                    this.serviceAreaItemMap[m.postion_name] = m;
                });
                this.$refs.mapBox.pointControl.setPointsData(this.stationList);

            },
            ///api/serviceArea/currentFlow
            /**
             响应说明:serviceFlow:实时人数,serviceIn:实时进入人数,serviceOut:实时离开人数,serviceHourAdd:小时新增人数
             */
            async getServiceAreaFlow(area) {
                this.detailFlow.addNum = 0;
                this.detailFlow.inNum = 0;
                this.detailFlow.outNum = 0;
                this.detailFlow.totalNum = 0;
                var theAreaId = this.serviceAreaMap[area];
                const url = '/api/serviceArea/getServiceAreaFlow';
                const data = {postionID: theAreaId, postionName: area}
                let theData = await  getData(url, data);
                if (theData && theData.data) {
                    var m = theData.data;
                    if (m['serviceHourAdd'][0] && m['serviceHourAdd'][0]['user_perhour_add']) {
                        this.detailFlow.addNum = m['serviceHourAdd'][0]['user_perhour_add'];
                    }
                    if (m['serviceOut'][0] && m['serviceOut'][0]['user_out']) {
                        this.detailFlow.outNum = m['serviceOut'][0]['user_out'];
                    }
                    if (m['serviceFlow'][0] && m['serviceFlow'][0]['user_cnt']) {
                        this.detailFlow.totalNum = m['serviceFlow'][0]['user_cnt'];
                    }
                    if (m['serviceIn'][0] && m['serviceIn'][0]['user_in']) {
                        this.detailFlow.inNum = m['serviceIn'][0]['user_in'];
                    }
                }
                this.$refs.mapBox.pointControl.drawRawReli(area, this.detailFlow.totalNum);
                // debugger;
                // this.$refs.mapBox.pointControl.showPointsByData(this.stationStateList);
            },


            async onDetialClick(data, marker) {
                if (!this.detailMode) {
                    this.$refs.mapBox.pointControl.hidePointMarkDetail();
                    // debugger;
                    this.detailMode = true;
                    this.detailItem = data.postion_name;

                }
                else {
                    this.detailItem = data.postion_name;
                    this.$refs.mapBox.pointControl.hidePointMarkDetail();
                    this.$refs.mapBox.pointControl.showMarkPointDetail(marker, this.detailFlowEle);
                    // await this.getServiceAreaList();

                }
            },

        }
    }
</script>

<style lang='scss' scoped>
    .sw-btn-outer {
        position: absolute;
        /*right: 509px;*/
        /*top: 20px;*/
        /*top: 14px;*/
        /*right: 41+80+60px;*/
        right: 41+80+40px;
        top: 12+3px;
        z-index: 11;
        &.selected {
            top: 8px;
            /*right: 41px;*/
            left: 808+30px;
        }

    }

    .hide-part {

    }

    .map-box-outer2 {
        /*margin-left: 32px;*/
        position: relative;
        z-index: 10;
        /*width: 1832px;*/
        width: 100%;
        height: 100%;
        /*padding-top: 16px;*/
        .weather-part {
            position: absolute;
            top: 8+49+8px;
            left: 808-140+10+157-20-3px;
            width: 157px;
            /*height: 164px;*/
            height: 197px;
            background-size: 100% 100%;
            background-image: url("../assets/气候bg1@2x.png");
            &.normal {
                background-image: url("../assets/气候bg@2x.png");
                height: 164px;
            }
            .text-line {
                display: inline-block;
                position: relative;
                width: 100%;
                font-size: 20px;
                /*font-family: DIN;*/
                font-weight: 500;
                height: 41px;
                line-height: 40px;
                color: rgba(254, 254, 254, 1);
                background-image: url("../assets/分割线@2x.png");
                background-size: 100% 1px;
                background-repeat: no-repeat;
                background-position: bottom center;
                padding-left: 9px;
                &:last-child {
                    background-image: none;
                    line-height: 30px !important;
                }
                .number {
                    font-size: 30px;
                    font-family: DIN;
                    font-weight: 500;
                    color: rgba(180, 255, 0, 1);
                }

                .icon {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    margin-right: 3px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    &.icon1 {
                        background-image: url("../assets/日期 (1)@2x.png");
                    }
                    &.icon2 {
                        background-image: url("../assets/温度 (1)@2x.png");
                    }
                    &.icon3 {
                        background-image: url("../assets/晴@2x.png");
                    }
                    &.icon4 {
                        background-image: url("../assets/风速@2x.png");
                    }
                    &.icon5 {
                        cursor: pointer;

                        background-image: url("../assets/WC@2x.png");
                        &:focus{
                            border: none;
                        }
                    }
                }
            }
        }

        .weather-part2 {
            position: absolute;
            left: 71-20px;
            top: 60px;
            width: 915px;
            height: 76px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            .text-line {
                border-right: 1px #00C0FF solid;
            }
            .value {
                font-size: 18px !important;
                margin-top: 11px;
            }
            background-image: url("../assets/weath2@2x.png");
            background-size: 100% 100%;
            & > div {
                display: inline-block;
                padding-left: 68px;
                padding-top: 15-10px;
                height: 76-20px;
                margin-top: 10px;
                width: 19%;
            }
            &.normal {
                & > div {
                    width: 25% !important;
                    /*icon1 {*/
                    /*padding-left: 68px;*/
                    /*width: 25%;*/
                    /*background-position: 22px center!important;*/
                    /*background-image: url("../assets/DATE@2x.png");*/
                    /*}*/
                }
            }
            .icon {
                background-size: 35px 35px;
                background-repeat: no-repeat;
                background-position: 22px center;
                &.icon1 {
                    /*padding-left: 68-20px;
                    width: 24%;*/
                    /*background-position: 10px center;*/
                    width: 24%;
                    background-image: url("../assets/DATE@2x.png");
                }
                &.icon2 {

                    background-image: url("../assets/TEMP@2x.png");
                    background-size: 23px 35px;
                }
                &.icon3 {
                    background-size: 36px 36px;
                    background-image: url("../assets/晴@2x.png");
                }
                &.icon4 {
                    background-image: url("../assets/WIND@2x.png");
                }
                &.icon5 {
                    background-image: url("../assets/WCB@2x.png");
                }
            }
        }
        .wc-part2 {
            position: absolute;
            left: 71-20+641px;
            top: 60+76+10px;
            width: 274px;
            height: 181px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            background: rgba(0, 51, 153, 0.8);
            border: 1px solid rgba(0, 255, 255, 1);

            .item {
                height: 90px;
                width: 251px;
                display: inline-block;
                margin-left: 11px;
                padding-top:10px;

                color: #FFFFFF;
                vertical-align: middle;
                &:first-child {
                    border-bottom: 1px solid rgba(0, 246, 255, 1);
                }
                table{
                    width: 226-12px;
                    table-layout: fixed;
                    height: 68px!important;
                    /*position: absolute;*/
                    td{
                        /*width: 25%;*/
                        text-align: center;
                        width: 75px;
                    }
                    tr{
                        td:first-child{
                            width: 36px;
                        }
                    }
                }
                .part-item{
                    text-align: center;
                    position: relative;
                    width: 70px!important;
                    height: 68px!important;
                    /*background-color: red;*/
                    display: inline-block;
                    line-height: 26px;
                    margin-bottom: 10px!important;
                }
                .man-icon {
                    width: 36px;
                    height: 68px;
                    background-image: url("../assets/男厕所@2x.png");
                    background-size: 100% 100%;
                }
                .woman-icon {
                    width: 36px;
                    height: 68px;
                    background-image: url("../assets/女厕所@2x.png");
                    background-size: 100% 100%;
                }
                .number {
                    font-size: 26px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    /*margin-top: 10px;*/
                    /*margin-bottom: 10px;*/
                    color: rgba(246, 255, 0, 1);
                }
                .state-name{
                    width: 57px;
                }
                .state {

                    border-radius: 10px;
                    width: 57px;
                    height: 22px;
                    line-height: 22px;
                    /*margin-top: 15px;*/
                    /*margin-bottom: 10px;*/

                    &.s0{
                        background-color: #B0FFB4;
                        color: #006705;
                    }
                    &.s1{
                        background-color: #68E8FF;
                        color: #051646;
                    }
                    &.s2{
                        background-color: #FFB0B0;
                        color: #EB0000;
                    }
                }
            }
        }
        .page-title {
            position: absolute;
            width: 432px;
            height: 66px;
            left: 59px;
            top: 12px;
            padding-left: 33px;
            padding-top: 8px;
            background-image: url("../assets/专题@2x.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            .number {
                color: #FFFF00;
                margin-left: 10px;
                font-size: 42px;
            }
            .unit {
                font-size: 14px;
            }
        }
        .detail-page-title {
            height: 40px;
            width: 228px;
            left: 69-40px;
            top: 9px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            position: absolute;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            padding-left: 32px;
            line-height: 40px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url("../assets/全省bg 拷贝@2x.png");
            .name {
                border-right: rgba(247, 250, 252, 1) solid 1px;
                padding-right: 10px;
                margin-right: 10px;
            }
            .return {
                width: 19px;
                height: 15px;
                display: inline-block;
                /*position: absolute;
                left: 239-69px;
                top: 15px;*/
                background-size: 100% 100%;
                background-repeat: no-repeat;
                cursor: pointer;
                background-image: url("../assets/fanhui.png");
            }
        }
        .total-part {
            position: absolute;
            width: 172*4px;
            height: 75px;
            /*left: 476px;*/
            right: 20px;
            /**/
            top: 12px;
            .item {
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                padding-top: 23px;
                line-height: 29px;
                padding-left: 20px;
                width: 172px;
                height: 75px;
                display: inline-block;
                background-image: url("../assets/拥挤底框@2x.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                .number {
                    font-size: 36px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255, 101, 53, 1);
                    margin-left: 12px;
                    &.yongji {
                        color: #FF6535;
                    }
                    &.shizhong {
                        color: #2EDFFF;
                    }
                    &.shushi {
                        color: #71FF39;
                    }
                }
                .unit {
                    margin-left: 5px;
                }
            }
        }
        .left-part {
            position: absolute;
            width: 336px;
            height: 712px;
            /*left: 92px;*/
            left: 59px;
            top: 137px;
            background-image: url("../assets/组 55@2x.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            .up-nav {
                position: absolute;
                width: 30px;
                height: 23px;
                left: 152px;
                top: 26px;
                cursor: pointer;
                background-image: url("../assets/翻页按钮@2x.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .item-wrap {
                position: absolute;
                left: 0px;
                top: 62px;
                /*bottom: 62px;*/
                height: 146*4px;
                right: 0px;
                cursor: pointer;
                overflow-y: hidden;
                .item {
                    height: 146px;
                    width: 302px;
                    position: relative;
                    text-align: center;
                    .title {
                        font-size: 18px;
                        height: 40px;
                        line-height: 40px;
                        width: 320px;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 1);
                        background-image: url("../assets/数据_小标题_bg@2x.png");
                    }
                    .number-part {
                        height: 48px;
                        font-size: 16px;
                        padding-left: 4px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        width: 246px;
                        display: inline-block;
                        vertical-align: bottom;
                        padding-top: 24px;
                        text-align: left;
                        /*position: relative;*/
                        background-image: url("../assets/数据分割线@2x.png");
                        background-repeat: no-repeat;
                        background-position: bottom center;
                        .number {
                            display: inline-block;
                            /*text-align: right;*/
                            /*position: relative;*/
                            margin-left: 100px;
                            font-size: 20px;
                            font-family: PingFang SC;
                            font-weight: 600;
                            color: rgba(0, 246, 255, 1);
                        }
                        .name {
                            display: inline-block;
                            /*position: relative;*/
                            margin-left: 4px;
                            text-align: left;
                        }
                    }
                    .state-part {
                        text-align: left;
                        padding-left: 4px;
                        display: inline-block;
                        height: 33px;
                        font-size: 16px;
                        margin-top: 8px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        width: 246px;
                        .name {
                            display: inline-block;
                            margin-left: 4px;
                            text-align: left;
                        }
                        .state {
                            margin-left: 106px;
                            width: 65px;
                            height: 33px;
                            line-height: 32px;
                            font-size: 16px;
                            text-align: center;
                            font-family: PingFang SC;
                            font-weight: 400;
                            display: inline-block;
                            &.yongji {
                                border: 1px solid rgba(247, 99, 59, 1);
                                color: rgba(255, 101, 53, 1);
                            }
                            &.shizhong {
                                border: 1px solid rgba(46, 223, 255, 1);
                                color: rgba(46, 223, 255, 1);
                            }
                            &.shushi {
                                border: 1px solid rgba(113, 255, 57, 1);
                                color: rgba(113, 255, 57, 1);

                            }
                        }
                    }
                    .body {
                        font-size: 16px;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                    }
                }
            }

            .down-nav {
                position: absolute;
                width: 28px;
                height: 23px;
                left: 153px;
                bottom: 27px;
                cursor: pointer;
                background-image: url("../assets/翻页按钮_下@2x.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }

        }
    }

    .map-box-outer {
        width: 100%;
        height: 100%;
        &.detail {
            width: 976px;
        }
    }

    .map-box {

    }

    .box {
        position: absolute;
        z-index: 10;

    }

    .box4 {
        width: 172px;
        height: 75px;
        /*background:rgba(4,22,69,0.8);*/
        /*border:1px solid rgba(100,178,255,1);*/
        background: url("../assets/拥挤底框@2x.png") no-repeat;
        background-size: 100% 100%;
        @include defaultFlex;
        padding: 22px 28px 23px 21px;
    }

    .box4-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .box4-ul-box {
        left: 476px;
        position: absolute;
        top: 0px;
        z-index: 10;
        display: flex;
    }

    .off-box {
        width: 20px;
        height: 20px;
        border: 1px solid rgba(255, 255, 255, 1);
        margin-right: 7px;
    }

    .on-box {
        width: 20px;
        height: 20px;
        background: url("../assets/功能选中@2x.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 7px;

    }

    .box4-name {
        font-size: 18px;
        /*font-family:PingFangSC;*/
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        /*line-height:60px;*/
    }

    .num-box {
        font-size: 16px;
        color: #ffffff;
        margin-left: 19px;
        /*font-family:Microsoft YaHei;*/
        /*line-height:60px;*/
        i {
            font-weight: bold;
            font-size: 36px;
        }
    }

    .box-title {
        font-size: 20px;
        /*font-family:Microsoft YaHei;*/
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        /*line-height:60px;*/
        padding: 18px 0 10px 27px;
        display: flex;
    }

    .box-title-icon {
        width: 20px;
        height: 22px;
        background-color: #fff;
        margin-right: 8px;
    }

    .box2-wrap {
        width: 100%;
        height: 235px;
        position: relative;
        /*background-color: #fff;*/
    }

    .box5 {
        position: absolute;
        top: 20px;
        /*right: 70+80+60px;*/
        left: 476px;
        &.detail {
            left: 349-40-30-30+150px !important;
            top: 9px !important;
        }

    }

    .box4-ul {
        left: 523px;
        position: absolute;
        top: 18px;
        z-index: 10;
    }

    .right-part {
        position: absolute;
        left: 976px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        .item {
            .title-part {
                position: absolute;
                left: 20px;
                top: 0px;
                /*right: 100px;*/
                right: 0px;
                height: 20+18px;
                border-bottom: 2px solid rgba(6, 136, 201, 1);
                /*border-image: -webkit-linear-gradient(#0688C9, #000) 90 90;*/
                /*border-image: -moz-linear-gradient(#0688C9, #000) 90 90;*/
                /*border-image: linear-gradient(#0688C9, #000) 90 90;*/
                .title {
                    font-size: 20px;
                    position: absolute;
                    top: 9px;
                    left: 22px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(253, 253, 253, 1);
                }
                .icon {
                    position: absolute;
                    left: 0px;
                    top: 9px;
                    &.icon1 {
                        background-repeat: no-repeat;
                        background-image: url("../assets/时点通关_iocn@2x.png");
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
                    &.icon3 {
                        background-repeat: no-repeat;
                        background-image: url("../assets/旅客画像_icon@2x.png");
                        width: 20px;
                        height: 20px;
                        background-size: 100% 100%;
                    }
                    &.icon4 {
                        background-repeat: no-repeat;
                        background-image: url("../assets/归属分析_icon@2x.png");
                        width: 20px;
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
                /*background: red;*/
                top: 44px;
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
            position: relative;
            width: 100%;
            height: 205+20px;
            background-size: 100% 100%;
            /*background-image: url("assets/province/旅客分析底框@2x.png");*/
            .body {
                margin-left: 14px;
                background-image: url("../assets/图表背景@2x.png");
                width: 841px;
                height: 189px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

        }
        .item-2 {
            position: relative;
            width: 100%;
            height: 229+20px;
            /*background-image: url("assets/province/实时趋势@2x.png");*/
            .item {
                display: inline-block;
                width: 43+32+43px;
                text-align: center;
                &.right-border {
                    border-right: 1px solid rgba(72, 133, 234, 1);
                }
            }
            .body {
                margin-left: 14px;
                background-image: url("../assets/图表背景@2x (1).png");
                width: 841px;
                height: 215px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

        }
        .item-3 {
            position: relative;
            width: 100%;
            height: 177px;
            .sex-part {
                position: absolute;
                left: 0px;
                top: 14px;
                bottom: 5px;
                width: 242px;
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
                left: 242px;
                top: 14px;
                bottom: 5px;
                right: 0px;
                /*background: blue;*/
                .huan-content {
                    position: relative;
                    width: 84px;
                    height: 84px;
                    /*margin-left: 15px;*/
                    margin-left: 32px;
                    display: inline-block;
                    &.huan-content:nth-child(1) {
                        /*margin-left: 25px;*/
                    }
                }
            }
            /*background-image: url("assets/province/实时趋势@2x.png");*/

        }
        .item-4 {
            position: relative;
            width: 100%;
            height: 280+19-16+9px;
            /*background-image: url("assets/province/迁徙路线底框@2x.png");*/
            .body-content {
                width: 827px;
                height: 231+9px;
                position: absolute;
                left: 20px;
                top: 5px;
                background-image: url("../assets/tab_1.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                &.selected1 {
                    background-image: url("../assets/tab_3.png");
                }
                &.selected2 {
                    background-image: url("../assets/tab_2.png");
                }
                &.selected3 {
                    background-image: url("../assets/tab_1.png");
                }
                .tab-items {
                    height: 40px;
                    width: 827px;
                    width: 100%;
                    position: relative;
                    /*border-bottom: 1px solid rgba(0,204,255,1);*/
                    .tab-item {
                        display: inline-block;
                        cursor: pointer;
                        /*width: 33%;*/
                        font-size: 16px;
                        text-align: center;
                        position: absolute;
                        width: 130px;
                        height: 40px;
                        padding-top: 5px;
                        line-height: 40px;
                        left: 100px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        /*margin-left: 109px;*/
                        &.selected {
                            /*color: rgba(0, 255, 255, 1);*/
                            color: yellow;
                            font-weight: bold;
                        }
                        &:nth-child(2) {
                            /*margin-left: 370px;*/
                            left: 370px;
                        }
                        &:nth-child(3) {
                            /*margin-left: 640px;*/
                            left: 640px;
                        }
                    }
                }
            }

        }

    }

    .markfuwu1 {
        width: 63px;
        height: 60px;
        position: absolute;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("../assets/拥挤@2x.png");
    }

    .markfuwu2 {
        width: 63px;
        height: 60px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("../assets/适中@2x.png");
    }

    .markfuwu3 {
        width: 63px;
        height: 60px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("../assets/舒适@2x.png");
    }
</style>
