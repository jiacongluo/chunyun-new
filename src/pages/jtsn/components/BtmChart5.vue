<template>
    <!--航班 趋势-->
    <!--曲线图-->
    <div ref="chart1" class="full-div"></div>

</template>

<script>
import echarts from 'echarts'
import mixin from '@/utils/myMixin'
import mapMixin from '@/utils/mapMixin'
import { getData }from '@/utils/core/http'
import airportUtil from '@/utils/airportUtil'
import moment from 'moment'
export default {
    name: '',

    mixins: [mixin, mapMixin],

    components: {},

    props: {
        id: {
            type: Number,
            default: -1 // 1:大桥境内段客流趋势, 2:公路口岸客流分析 3:过桥游客每日平均通关时长 4:琼州海峡的客流趋势
        }
    },

    data () {
        return {
            chart1: null,
            airName: '', // 机场3字码
            mapObj: { // 不同id对应的series
                1: [{
                    name: '出发航班',
                    key: 'outList',
                },{
                    name: '到达航班',
                    key: 'inList',
                }]
            }
        }
    },

    computed: {},

    watch: {
    },

    created () {},

    mounted () {
        this.init()
    },

    destroyed () {},

    methods: {
        initChart1 (sData,lData,xData) {
            // console.log(sData)
            // debugger
            if (!this.chart1) {
                this.chart1 = echarts.init(this.$refs['chart1'])
            }
            //            debugger
            let theFontSize = this.htmlFontSize()
            let me = this
            let right = 9
            let left = 3
            let itemGap = 27
            let yAxisName = '(单位:班次)'
            let xAxisName = '(时间)'
            // let theLen = xData.length
            if (this.id === 4) {
                right = 14
                left = 6
                itemGap = 20
                xAxisName = ''
            }
            if (this.id === 3) {
                right = 11
                yAxisName = '(时长/分钟)'
            }

            let option = {
                color: ['#00FFFF', '#FFFF00', '#FF66FF'],
                tooltip: {
                    trigger: 'axis',
                    //                    formatter:function (params, ticket, callback) { // 格式化tooltip
                    //                        // debugger;
                    //                        var theStr=params[0].name+"<br/>";
                    //                        var theHash={};
                    //                        //                         debugger;
                    //                        for(var i=0;i<params.length;i++){
                    //                            var theItem=params[i];
                    //                            if(!theHash[theItem.seriesName]){
                    //                                theHash[theItem.seriesName]=true;
                    //                                theStr+= theItem.marker+theItem.seriesName+":"+theItem.value[1]+"<br/>"
                    //                            }
                    //                        }
                    //                        return theStr;//params[0].name+"<br/>"+params[0].marker+params[0].seriesName+":"+params[0].value;
                    //                    }
                },
                grid: {
                    left: left + '%',
                    right: right + '%',
                    bottom: '8%',
                    top: '18%',
                    containLabel: true
                },
                legend: {
                    // data: ['每日客流', '香港--港珠澳', '港珠澳--香港'],
                    show: me.id!==3,
                    data: lData,
                    textStyle: {
                        color: me.axisFontColor,
                        fontSize: this.utils.calSize(16, theFontSize),
                        fontFamily: 'Microsoft YaHei'
                    },
                    icon: 'circle',
                    right: '8%',
                    top: '5%',
                    itemGap: this.utils.calSize(itemGap, theFontSize),
                    itemWidth: this.utils.calSize(10, theFontSize),
                    // itemWidth: me.isLabtop ? 25 : 29,
                    itemHeight: this.utils.calSize(10, theFontSize)
                    // itemHeight: me.isLabtop ? 11 : 13,
                },
                xAxis: [
                    {
                        type: 'category',
                        //                        axisPointer: {
                        //                            type: 'shadow'
                        //                        },
                        // 轴 样式
                        name: xAxisName,
                        boundaryGap: false,
                        nameTextStyle: {
                            color: me.axisFontColor,
                            fontSize: this.utils.calSize(14, theFontSize),
                            // fontSize: 14,
                            padding: [0, 25, 0, 0]
                        },
                        axisLine: {
                            // onZero: false,
                            lineStyle: {
                                color: me.axisColor
                            }
                        },
                        axisLabel: {
                            fontSize: this.utils.calSize(14, theFontSize),
                            // fontSize: 14,
                            /*fontFamily: 'MicrosoftYaHei',*/
                            color: me.axisFontColor,
                            interval: 1

                        },
                        axisTick: { // 刻度对齐突出的线
                            alignWithLabel: false,
                            interval: 0,
                            show: false
                        },
                        // data: ['8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月']
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: yAxisName,
                        // nameGap: this.utils.calSize(10, theFontSize),
                        nameTextStyle: {
                            color: me.axisFontColor,
                            fontSize: this.utils.calSize(14, theFontSize),
                            // fontSize: 14,
                            padding: [0, 25, 0, 0]
                        },
                        // // 轴 样式
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: me.axisColor
                            }
                        },
                        axisTick: { // 刻度对齐突出的线
                            alignWithLabel: true,
                            interval: 0,
                            show: false
                        },
                        axisLabel: {
                            fontSize: this.utils.calSize(14, theFontSize),
                            // fontSize: 14,
                            /*fontFamily: 'MicrosoftYaHei',*/
                            color: me.axisFontColor,
                        },
                        splitLine: {
                            show: false,
                            // lineStyle: {
                            //     // 使用深浅的间隔色
                            //     color: [me.splitLineColor],
                            //     type: 'solid'
                            // }
                        }
                    }
                ],
                series: sData
                // series: [
                //     {
                //         name: '每日客流',
                //         type: 'line',
                //         areaStyle: areaStyle,
                //         smooth: true,
                //         symbol: 'none', // 不显示数据线上的点
                //         data: me.handleData()
                //         // data: sData
                //     },
                //     {
                //         name: '香港--港珠澳',
                //         type: 'line',
                //         areaStyle: areaStyle,
                //         smooth: true,
                //         symbol: 'none', // 不显示数据线上的点
                //         data: me.handleData()
                //         // data: sData
                //     },
                //     {
                //         name: '港珠澳--香港',
                //         type: 'line',
                //         areaStyle: areaStyle,
                //         smooth: true,
                //         symbol: 'none', // 不显示数据线上的点
                //         data: me.handleData()
                //         // data: sData
                //     },
                // ]
            }
            this.chart1.setOption(option)
            this.chart1.resize()

        },
        randomData () {
            let arr = []
            for (let i = 0; i < 12; i++) {
                arr.push(this.utils.randomNum(10,100))
            }
            return arr
        },
        // 处理数据
        handleData (data) {
            let seriesItemArr = this.mapObj[this.id]
            // debugger
            let seriesArr = [] // series的数据
            let seriesNameArr = [] // seriesd的名字
            let xArr = [] // 横坐标数据
            let me = this
            let areaStyle = {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(0,255,255,0.3)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(27,199,120,0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }

            for (const item of seriesItemArr) {
                seriesNameArr.push(item.name)
                let sObj = {
                    name: item.name,
                    type: 'line',
                    areaStyle: areaStyle,
                    smooth: true,
                    symbol: 'none', // 不显示数据线上的点
                    data: []
                    // data: sData
                }
                for (const dataKey in data) {
                    if (dataKey === item.key) {
                        for (const datumElement of data[dataKey]) {
                            const theTime = parseInt(datumElement['fplt'].split(' ')[1])
                            // debugger
                            // if (theTime%2!==0) {
                            //     continue
                            // }
                            sObj.data.push([theTime, datumElement['count']])
                            // sObj.data.push(datumElement['count'])
                        }
                    }
                }
                // 补上没有的数据
                for (let i = 0; i < 24; i++) {
                    let have = false
                    for (const datum of sObj.data) {
                        if (datum[0] == i) {
                            have = true
                            break
                        }
                    }
                    if (!have) {
                        sObj.data.splice(i,0,[i,0])
                    }
                }
                seriesArr.push(sObj)
            }
            // for (const obj of data['sendTrendList']) {
            //     let xData = parseInt(obj['countTime'])
            //     xArr.push(xData)
            // }
            // for (let i = 0; i < 24; i++) {
                // if (i%2===0) {
                //     xArr.push(i)
                // }
            // }
            xArr = this.utils.getHours(':00')
            this.initChart1(seriesArr, seriesNameArr, xArr)
        },
        fetchData (url) {
            // const theDate = this.isDebug?'2020-01-01':this.curDate
            const theDate = this.curDate
            const airName = this.airName
            const theData = {
                date: theDate,
                airName: airName
            }
            getData(url, theData).then((res) => {
                // console.log(res)
                // debugger
                this.handleData(res.data)
            })
        },
        init () {
            let me = this
            let url = ''
            let postionName = this.postionName
            // this.airName = this.isDebug?'CAN':airportUtil.getCodeByName(this.postionName)
            this.airName = airportUtil.getCodeByName(this.postionName)
            switch (this.id) {
                case 1:
                    url = `/api/air/flyTrend`
                    if (postionName === '宝安国际机场') {
                        url = '/api/baoAnAirPort/baoAnFlyTrend'
                    }
                    me.fetchData(url)

            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .c-div {
        width: 100%;
        /*height: 351px;*/
        height: 100%;
    }
</style>
