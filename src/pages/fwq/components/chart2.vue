<template>
    <div ref="chart1" class="full-div"></div>

</template>

<script>
import echarts from 'echarts'
import mixin from '@/utils/myMixin'
import { postData }from '@/utils/core/http'
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

    destroyed () {},

    methods: {
        // 刷新
        init () {
            this.getData()
        },
        getData () {
            const url = '/qz/qzFlowStay'
            const data = {
                date: '2019-12-10'
                // date: this.checkDate
            }
            postData(url, data).then((res) => {
                // let resData = _.sortBy(res.data, (item) => { // 排序
                //     return parseInt(item.ttime)
                // })
                let sData = []
                let xData = []
                for (const datum of res.data) {
                    // debugger
                    sData.push(this.utils.tofixed(datum.qzStayPercentage*100))
                    xData.push(this.zhuliuMap[datum.qzStayTime])
                }
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
                    // formatter:function (params, ticket, callback) { // 格式化tooltip
                    //    // debugger;
                    //    var theStr=params[0].name+"<br/>";
                    //    var theHash={};
                    //    //                         debugger;
                    //    for(var i=0;i<params.length;i++){
                    //        var theItem=params[i];
                    //        if(!theHash[theItem.seriesName]){
                    //            theHash[theItem.seriesName]=true;
                    //            theStr+= theItem.marker+theItem.seriesName+":"+theItem.value+"<br/>"
                    //        }
                    //    }
                    //    return theStr;//params[0].name+"<br/>"+params[0].marker+params[0].seriesName+":"+params[0].value;
                    // },
                    // position: function (point, params, dom, rect, size) {
                    //     // 固定在顶部
                    //     debugger
                    //     return [point[0], '0%'];
                    // }
                },
                grid: {
                    left: '4%',
                    right: '12%',
                    bottom: '8%',
                    top: '18%',
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
                        name: '(时长)',
                        // boundaryGap: false,
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
                            interval: 0

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
                        name: '(%)',
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
                //                series: sData
                series: [
                    {
                        name: '驻留时长',
                        type: 'bar',
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
                        barWidth: 30,
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
