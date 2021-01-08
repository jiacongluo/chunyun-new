<template>
    <!--曲线图-->
    <!--时点通关时长-->
    <div ref="chart1" class="full-div"></div>

</template>

<script>
import echarts from 'echarts'
import mixin from '@/utils/myMixin'
import { postData }from '@/utils/core/http'
import * as _ from 'underscore'
export default {
    name: '',

    mixins: [mixin],

    components: {},

    props: {},

    data () {
        return {
            chart1: null,
        }
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {
        this.init()
    },

    destroyed () {
    },

    methods: {
        // 刷新
        init () {
            this.getData()

        },

        getData () {
            // window._ = _
            const url = '/bridge/bridgeInsightPassTime'
            const data = {
                date: this.checkDate
            }
            postData(url, data).then((res) => {
                let resData = _.sortBy(res.data, (item) => { // 排序
                    return parseInt(item.ttime)
                })
                let sData = []
                let xData = []
                let str = ':00'
                for (const datum of resData) {
                    // debugger
                    // if (datum.ttime < 6) { // 1-5小时的不要
                    //     continue
                    // }
                    let ttimePass = datum.ttimePass
                    if (datum.ttime<=6) {
                        ttimePass = ttimePass%20+10
                    }
                    sData.push([datum.ttime+str,ttimePass])
                    // xData.push(datum.ttime)
                }
                xData = this.utils.getHours(str)
                // debugger
                this.initChart1(sData, xData)
            })
        },
        initChart1 (sData,xData) {
            // debugger
            if (!this.chart1) {
                this.chart1 = echarts.init(this.$refs['chart1'])
            }
            //            debugger
            let theFontSize = this.htmlFontSize()
            let me = this
            // let theLen = xData.length
            let option = {
                color: ['#00FFFF'],
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
                    // left: '4%',
                    // right: '12%',
                    // bottom: '8%',
                    // top: '18%',
                    left: '6%',
                    right: '6%',
                    bottom: '8%',
                    top: '10%',
                    containLabel: true
                },
                // legend: {
                //     //                    data: ['蒸发量', '降水量', '平均温度']
                //     show: false,
                //     data: [],
                //     textStyle: {
                //         color: '#BDD0F1',
                //         fontSize: this.utils.calSize(16, theFontSize),
                //         fontFamily: 'Microsoft YaHei'
                //     },
                //     right: '0%',
                //     itemGap: this.utils.calSize(30, theFontSize),
                //     //                    itemWidth: this.utils.calSize(32, theFontSize),
                //     itemWidth: me.isLabtop ? 25 : 29,
                //     //                    itemHeight: this.utils.calSize(13, theFontSize)
                //     itemHeight: me.isLabtop ? 11 : 13,
                // },
                xAxis: [
                    {
                        type: 'category',
                        //                        axisPointer: {
                        //                            type: 'shadow'
                        //                        },
                        // 轴 样式
                        name: '(时间)',
                        boundaryGap: false,
                        nameTextStyle: {
                            color: me.axisFontColor,
                            fontSize: this.utils.calSize(14, theFontSize),
                            // fontSize: 14,
                            padding: [0, 0, 30, -60]
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
                            interval: 3

                        },
                        axisTick: { // 刻度对齐突出的线
                            alignWithLabel: true,
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
                        name: '(单位: 分钟)',
                        // nameGap: this.utils.calSize(10, theFontSize),
                        nameTextStyle: {
                            color: me.axisFontColor,
                            fontSize: this.utils.calSize(14, theFontSize),
                            // fontSize: 14,
                            padding: [0, 0, 0, 10]
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
                //                series: sData
                series: [
                    {
                        name: '时长',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0,255,255,0.5)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(27,199,120,0)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        smooth: true,
                        symbol: 'none', // 不显示数据线上的点
                        // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        data: sData
                    }
                ]
            }
            this.chart1.setOption(option)
            this.chart1.resize()

        }
    }
}
</script>

<style lang='scss' scoped>

</style>
