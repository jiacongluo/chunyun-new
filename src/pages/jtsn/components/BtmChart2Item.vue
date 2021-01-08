<template>
    <!--列车表/航班表 表格-->
    <div class="full-div">
        <div class="header">
            <div class="h-name">{{headerName}}</div>
            <div class="time-box-outer">
                <timePicker @changeTime="getTime"></timePicker>
            </div>
        </div>
        <div class="body-outer">
            <table v-if="theShowList.length" class="body" border="1" style="border-color: #48B8FF">
                <tr>
                    <th>{{thName0}}</th>
                    <th>{{thName1}}</th>
                    <th>{{thName2}}</th>
                </tr>
                <tr v-for="(item, index) in theShowList" :key="index">
                    <td>{{item[tdName0]}}</td>
                    <td>{{id===3||id===4?item[tdName1].split(' ')[1]:item[tdName1]}}</td>
                    <td>{{item[tdName2]}}</td>
                </tr>
                <!--<tr>-->
                <!--<td>January</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<td>January</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<td>January</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--</tr>-->
            </table>
        </div>

        <footer>
            <ul v-if="pageNum">
                <li :class="['cp', {'active': activeIdx===item}]" v-for="item in pageNum" @click="clickPag(item)">
                    {{item}}
                </li>
            </ul>
        </footer>
    </div>

</template>
<script>
import timePicker from '@/components/timePicker'
import { getData }from '@/utils/core/http'
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import airportUtil from '@/utils/airportUtil'
export default {
    name: '',

    mixins: [mapMixin, myMixin],

    components: {
        timePicker
    },

    props: {
        id: {
            type: Number,
            default: -1 // 1出发列车  2到达列车 3出发航班 4到达航班
        }
    },

    data () {
        return {
            activeIdx: 1, // 当前第几页
            pageNum: 0, // 一共几页
            numPerPage: 4, // 每页显示几条
            url: '',
            startTime: '',
            endTime: '',
            startTime2: '',
            endTime2: '',
            theData: [],
            theShowList: [], // 显示的
            headerName: '',
            thName0: '',
            thName1: '',
            thName2: '',
            tdName0: '',
            tdName1: '',
            tdName2: '',
            params: {},
            airName: '',
            inOutKey: '', // 航班的key 出发/到达
        }
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {
        // this.init()
    },

    destroyed () {},

    methods: {
        clickPag (num) {
            this.theShowList = this.theData.slice(num * this.numPerPage - this.numPerPage, num * this.numPerPage);
            this.activeIdx = num
        },
        // 子组件初始化就改变时间 触发此方法
        getTime (timeRange) {
            let timeArr = timeRange.split('-')
            // let theDay = this.isDebug?'2020-01-03':this.curDate
            let theDay = this.curDate
            this.startTime = timeArr[0].split(':')[0]
            this.endTime = timeArr[1].split(':')[0]

            this.startTime2 = theDay + ' ' + timeArr[0]
            this.endTime2 = theDay + ' ' + timeArr[1]
            this.init()
        },
        init () {
            let postionName = this.postionName
            if (this.id === 1) {
                this.headerName = '发送列车'
                this.thName0 = '列车号'
                this.thName1 = '开点'
                this.thName2 = '目的地'

                this.tdName0 = 'SFCC'
                this.tdName1 = 'SFSJ'
                this.tdName2 = 'ZDZ'
                this.url = `/api/gdcnymotOut/train/sfzInfo/${this.postionName}/${this.startTime}/${this.endTime}`
            } else if (this.id === 2) {
                this.headerName = '到达列车'
                this.thName0 = '列车号'
                this.thName1 = '到点'
                this.thName2 = '出发地'

                this.tdName0 = 'SFCC'
                this.tdName1 = 'ZDSJ'
                this.tdName2 = 'SFZ'
                this.url = `/api/gdcnymotOut/train/zdzInfo/${this.postionName}/${this.startTime}/${this.endTime}`
            } else if (this.id === 3) {
                this.headerName = '发送航班'
                this.thName0 = '航班号'
                this.thName1 = '开点'
                this.thName2 = '目的地'
                this.inOutKey = 'outList'
                this.tdName0 = 'plegFltno'
                this.tdName1 = 'fptt'
                this.tdName2 = 'nextStation'
                this.url = `/api/air/flyList`
                if (postionName === '宝安国际机场') {
                    this.url = '/api/baoAnAirPort/baoAnFlyList'
                }
                // this.airName = this.isDebug?'SZX':airportUtil.getCodeByName(this.postionName)
                this.airName = airportUtil.getCodeByName(this.postionName)
                this.params = {
                    startTime: this.startTime2,
                    endTime : this.endTime2,
                    airName : this.airName,
                }
            } else if (this.id === 4) {
                this.headerName = '到达航班'
                this.thName0 = '航班号'
                this.thName1 = '到点'
                this.thName2 = '出发地'
                this.inOutKey = 'inList'

                this.tdName0 = 'plegFltno'
                this.tdName1 = 'fplt'
                this.tdName2 = 'previousStation'
                this.url = `/api/air/flyList`
                if (postionName === '宝安国际机场') {
                    this.url = '/api/baoAnAirPort/baoAnFlyList'
                }
                // this.airName = this.isDebug?'SZX':airportUtil.getCodeByName(this.postionName)
                this.airName = airportUtil.getCodeByName(this.postionName)

                this.params = {
                    startTime: this.startTime2,
                    endTime : this.endTime2,
                    airName : this.airName,
                }
            }
            this.fetchData(this.url)
        },
        fetchData (url) {
            let postionName = this.postionName
            getData(url, this.params).then((res) => {
                if (this.id === 3 || this.id === 4) {
                    this.theData = res.data[this.inOutKey]
                } else {
                    this.theData = res.data
                }
                if(postionName !== '金湾机场') {
                    for (const theShowListElement of this.theData) {
                        const temp = theShowListElement[this.tdName1].split(':')
                        theShowListElement[this.tdName1] = temp[0] + ':' + temp[1]
                    }
                }
                if(postionName !== '宝安国际机场') {
                    for (const theShowListElement of this.theData) {
                        theShowListElement[this.tdName2] = airportUtil.getCityByCode(theShowListElement[this.tdName2])||theShowListElement[this.tdName2]
                    }
                }
                try {
                    this.pageNum = Math.ceil(this.theData.length / this.numPerPage)
                    this.theShowList = this.theData.slice(1 * this.numPerPage - this.numPerPage, 1 * this.numPerPage);

                } catch (e) {
                    console.log(e)
                }
            })
        },
    }
}
</script>

<style lang='scss' scoped>
.time-box-outer {
    width: 155px;
    height: 36px;
}
    .header {
        display: flex;
        font-size:20px;
        /*font-family:PingFangSC;*/
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:36px;
        margin-bottom: 8px;
    }
    .h-name {
        margin-right: 13px;
    }
    .body-outer {
        width: 435px;
        height: 154px;

    }

    .body {
        width: 435px;
        /*height: 154px;*/
        font-size:16px;
        /*font-family:PingFangSC;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        text-align: center;
    }
    th {
        font-size:16px;
        /*font-family:PingFangSC;*/
        font-weight:600;
        color:rgba(0,255,255,1);
        /*line-height:60px;*/
        padding-top: 6px;
        padding-bottom: 6px;

    }
    td {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    footer {
        width: 100%;
        @include defaultFlex;
        font-size:16px;
        /*font-family:PingFangSC;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        margin-top: 9px;
        li {
            margin-right: 9px;
            width: 24px;
            height: 24px;
            /*border:1px solid rgba(72,184,255,1);*/
            border-radius:50%;
            line-height: 24px;
            text-align: center;
            border: 1px solid #52c7fd;
            color: #52c7fd;
        }
        li.active {
            border: 1px solid #28eefb;
            color: #FFFFFF;
        }
        li:nth-last-child(1) {
            margin-right: 0px;
        }
        ul {
            display: flex;
        }
    }
</style>
