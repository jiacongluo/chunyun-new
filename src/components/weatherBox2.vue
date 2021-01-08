<template>
    <!--天气-->
    <div class="weather-box">
        <ul class="full-div">
            <li v-for="(item,index) in weatherData" :key="index"
            @click="clickLi(item)">
                <div class="li-div">
                    <div class="li-l">
                        <div :class="[item.icon,'li-l-icon','bgi']"></div>
                    </div>
                    <div class="li-r">
                        <div class="li-r-line1">{{item.name}}</div>
                        <div class="li-r-line2">
                            {{item.value}}
                            <div class="d-box cp" v-if="item.name==='日期'">
                                <DatePicker
                                    v-model="value1"
                                    type="date"
                                    :picker-options="pickerOptions"
                                    :value-format="formatType"
                                    start-placeholder=""
                                    end-placeholder=""
                                ></DatePicker>

                            </div>
                        </div>
                    </div>

                </div>
            </li>

        </ul>
    </div>
</template>

<script>
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import { getData }from '@/utils/core/http'
import moment from 'moment'
import weather from '@/utils/weather'
import {DatePicker} from 'element-ui'
import  dateUtil from '../utils/dateUtil'

export default {
    name: '',

    mixins: [mapMixin,myMixin],

    components: {
        DatePicker
    },

    props: {
        formatType: {
            type: String,
            default: 'yyyy年MM月dd日' // yyyy-MM 月格式
        },
    },

    data () {
        return {
            theData: {
                DDATETIME: '',
                MIN_TEMP_24: '',
                MAX_TEMP_24: '',
                WEATHER_TYPE_12: '',
                WIND_DIRECTION_12: '',
                WIND_SPEED_12: '',
            },
            weatherData: [
                {
                    name: '日期',
                    value: '',
                    icon: 'li-l-icon1',
                },
                {
                    name: '温度',
                    value: '',
                    icon: 'li-l-icon2'
                },
                {
                    name: '天气状况',
                    value: '',
                    icon: '',
                },
                {
                    name: '风速',
                    value: '',
                    icon: 'li-l-icon4'
                },
            ],
            today: moment().format('YYYY年MM月DD日'),
            weatherIcon: '',
            value1: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date(dateUtil.formateQueryDate(new Date())+" 00:00:00").getTime()||time.getTime()>=dateUtil.nextDays(new Date(),6).getTime();
                },
            },
            resData: []
        }
    },

    computed: {
        datePickerType () {
            return 'date'
        }
    },

    watch: {
        city (n, o) {
            // debugger
            this.today = moment().format('YYYY年MM月DD日')
            this.getWeather()
            // debugger
        },
        value1 (n, o) {
            // debugger
            this.today = n
            // this.getWeather()
            this.refreshWeather(n)
        },
    },

    created () {},

    mounted () {
        // debugger
        this.getWeather()
    },

    destroyed () {},

    methods: {
        refreshWeather (dateStr) {
            this.handleData(dateStr)
        },
        clickLi (item) {
            if (item.name === '日期') {

            }
        },
        //
        getWeather () {
            // const url = `/api/gdcnymotOut/weather/${this.city}`
            const url = `/api/gdcnymotOut/sevenDaysWeather/${this.city}`
            const data = {
            }
            getData(url, data).then((res) => {
                // console.log(1
                let theTempDatas = {}
                for (const datum of res.data) {
                    var theTimeValue= parseInt(datum.PREDICTION_TIME||'24');
                    var theTimeSpan=theTimeValue/24-1;
                    var theTimesStr=dateUtil.formateCnDate( dateUtil.nextDays(new Date(),theTimeSpan>0?theTimeSpan:0));
                    theTempDatas[theTimesStr]=datum;

                }

                this.resData = theTempDatas

                this.handleData(this.today)

            })
        },
        handleData (theDate) {
            let tgtData = this.resData[theDate]||{
                DDATETIME:theDate,
                MAX_TEMP_24:"",
                MIN_TEMP_24:"",
                WEATHER_TYPE_12:"",
                WIND_DIRECTION_12:"",
                WIND_SPEED_12:""
            };
            // debugger
            for (const theDataKey in this.theData) {
                for (const dataKey in tgtData) {
                    if (dataKey === theDataKey) {
                        this.theData[theDataKey] = tgtData[dataKey]
                    }
                    if (dataKey === 'WEATHER_TYPE_12') {
                        // this.weatherIcon = this.resData[0][dataKey]
                        this.weatherIcon = weather.getIcon(tgtData[dataKey]);

                    }
                }
            }
            const theData = this.theData
            for (const item of this.weatherData) {
                if (item.name === '日期') {
                    item.value =  this.today
                }
                if (item.name === '温度') {
                    item.value = theData.MIN_TEMP_24.split('.')[0]+ '-' +theData.MAX_TEMP_24.split('.')[0]+'℃'
                }
                if (item.name === '天气状况') {
                    item.value = theData.WEATHER_TYPE_12
                    item.icon = this.weatherIcon
                }
                if (item.name === '风速') {
                    item.value = theData.WIND_DIRECTION_12+theData.WIND_SPEED_12
                }
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .weather-box {
        width: 915px;
        height: 76px;
        background-image: url("../assets/wb2bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /*position: absolute;*/
        /*top: 171px;*/
        /*left: 40px;*/
        font-size:18px;
        /*font-family:PingFang;*/
        font-weight:400;
        /*line-height:60px;*/
        color: #ffffff;

    }
    ul {
        display: flex;
        justify-content: space-between;
        .li-div {
            justify-content: center;
        }
        li {
            flex: 1;
        }
        li:nth-last-child(1) {
            .li-div {
                border-right: none;
            }
        }
        li:nth-child(1) {
            /*padding-left: 22px;*/
            .li-div {
                /*padding-right: 33px;*/
            }
        }
        li:nth-child(2) {
            /*padding-left: 35px;*/
            .li-div {
                /*padding-right: 33px;*/
            }

        }
        li:nth-child(3) {
            /*padding-left: 23px;*/
            .li-div {
                /*padding-right: 19px;*/
            }
            .li-l-icon {
                width: 35px;
                height: 35px;
            }
        }
        li:nth-child(4) {
            /*padding-left: 15px;*/
            /*padding-right: 13px;*/
            .li-div {
                /*padding-right: 13px;*/
            }
        }
    }
    li {
        padding: 19px 0 15px 0;

    }
    .li-div {
        width: 100%;
        height: 100%;
        border-right: 1px solid #00C0FF;
        display: flex;
        position: relative;
    }
    .li-l-icon {
        margin-right: 10px;
    }
    .li-l-icon1 {
        width: 34px;
        height: 34px;
        background-image: url('../assets/wb2icon1.png');
    }
    .li-l-icon2 {
        width: 23px;
        height: 40px;
        background-image: url('../assets/wb2icon2.png');
    }
    .li-l-icon3 {
        width: 35px;
        height: 34px;
        /*background-image: url('../assets/wb2icon2.png');*/
    }
    .li-l-icon4 {
        width: 32px;
        height: 34px;
        background-image: url('../assets/wb2icon4.png');
    }
    .li-l {
        /*flex: 1;*/
        display: flex;
        align-content: center;
    }
    .li-r {

    }
    .li-r-line1 {
        font-size: 20px;
        margin-bottom: 10px;
        margin-top: -5px;
    }
    .li-r-line2 {
        position: relative;
    }
    .d-box {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
