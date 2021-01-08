<template>
    <!--天气-->
    <div class="weather-box bgi">
        <div class="line line1">
            <i class="icon line1-icon bgi"></i>
            <!--<div class="data date">{{theData.DDATETIME.split(' ')[0]}}</div>-->
            <div class="data date">{{today}}</div>
        </div>
        <div class="line" v-if="theData.MIN_TEMP_24">
            <i class="icon line2-icon bgi"></i>
            <div class="data">
                <span class="temp">{{theData.MIN_TEMP_24.split('.')[0]}}-{{theData.MAX_TEMP_24.split('.')[0]}}</span><span>℃</span>
            </div>

        </div>
        <div class="line" v-if="theData.WEATHER_TYPE_12">
            <i :class="['icon', 'line3-icon', 'bgi', weatherIcon]"></i>
            <div class="data">{{theData.WEATHER_TYPE_12}}</div>
        </div>
        <div class="line" v-if="theData.WIND_DIRECTION_12">
            <i class="icon line4-icon bgi"></i>
            <div class="data">{{theData.WIND_DIRECTION_12}}{{theData.WIND_SPEED_12}}</div>
        </div>
    </div>
</template>

<script>
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import { getData }from '@/utils/core/http'
import moment from 'moment'
import weather from '@/utils/weather'

export default {
    name: '',

    mixins: [mapMixin,myMixin],

    components: {},

    props: {

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
            today: moment().format('YYYY-MM-DD'),
            weatherIcon: ''

        }
    },

    computed: {},

    watch: {
        city (n, o) {
            this.getWeather()
            // debugger
        }
    },

    created () {},

    mounted () {
        // debugger
        this.getWeather()
    },

    destroyed () {},

    methods: {
        // 枢纽列表获取
        getWeather () {
            const url = `/api/gdcnymotOut/weather/${this.city}`
            const data = {
            }
            getData(url, data).then((res) => {
                // console.log(1)
                for (const theDataKey in this.theData) {
                    for (const dataKey in res.data) {
                        if (dataKey === theDataKey) {
                            this.theData[theDataKey] = res.data[dataKey]
                        }
                        if (dataKey === 'WEATHER_TYPE_12') {
                            // this.weatherIcon = res.data[dataKey]
                            this.weatherIcon = weather.getIcon(res.data[dataKey]);

                        }
                    }
                }

            })
        },
    }
}
</script>

<style lang='scss' scoped>
    .weather-box {
        width: 157px;
        height: 164px;
        background-image: url("../assets/气候bg@2x.png");
        position: absolute;
        top: 64px;
        left: 804px;
        font-size:16px;
        /*font-family:PingFang;*/
        font-weight:400;
        color:rgba(254,254,254,1);
        /*line-height:60px;*/
        .date {
            font-size: 20px;
            white-space: nowrap;
        }
        .line {
            height: 41px;
            width: 100%;
            padding-left: 13px;
            padding-right: 13px;
            /*line-height: 41px;*/
            display: flex;
            align-items: center;
        }
        .icon {
            margin-right: 8px;
        }
        .temp {
            color: #B4FF00;
            font-size: 30px;
            white-space: nowrap;
        }
    }
    .line1-icon {
        min-width: 16px;
        height: 16px;
        background-image: url("../assets/weather/日期(1)@2x.png");
    }
    .line2-icon {
        width: 18px;
        height: 18px;
        background: url("../assets/weather/温度(1)@2x.png");
        margin-right: 3px!important;

    }
    .line3-icon {
        width: 19px;
        height: 19px;
        /*background: url("../assets/weather/晴@2x.png");*/

    }
    .line4-icon {
        width: 18px;
        height: 16px;
        background: url("../assets/weather/风速@2x.png");

    }
</style>
