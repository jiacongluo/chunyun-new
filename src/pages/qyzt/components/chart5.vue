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

    computed: {

    },

    watch: {

    },

    created () {},

    mounted () {
        this.init()

    },

    destroyed () {},

    methods: {
        init () {
            this.getData()
        },

        getData () {
            const url = '/bridge/bridgeFlowStay'
            const data = {
                date: this.checkDate
            }
            postData(url, data).then((res) => {
                // console.log(res)
                this.handleData(res.data)
            })
        },
        handleData (data) {
            let sData = []
            let lgData = []
            var flowTypeMap = {
                '口岸观光': '口岸客流',
                '上桥去香港': '往香港',
                '下桥去珠海澳门': '往珠澳'

            }
            for (let obj of data) {
                sData.push({
                    name: flowTypeMap[obj.flowType] || '',
                    value: this.utils.toPercent(obj.percent,2)
                })
                // lgData.push(obj.name)
            }
            this.initChart1(sData,lgData)
        },
        initChart1 (sData,lgData) {
            //            debugger
            if (!this.chart1) {
                this.chart1 = echarts.init(this.$refs['chart1'])
            }
            let me = this
            let theFontSize = this.htmlFontSize()

            let theOption = {
                color: ['#FFF600', '#00C0FF', '#0232FF'],
                tooltip: {
                    show: true,
                    formatter: '{b0}: {c0}%'
                },
                legend: {
                                       // data: ['无污染', '轻微', '轻度'],
                    data: lgData,
                    left: '7%',
                    bottom: '5%',
                    textStyle: {
                        color: '#FEFEFE',
                        fontSize: this.utils.calSize(16, theFontSize),
                        fontFamily: 'Microsoft YaHei'
                    },
                    icon: 'circle',
                    itemHeight: this.utils.calSize(13, theFontSize),
                    itemWidth: this.utils.calSize(13, theFontSize),
                    itemGap: this.utils.calSize(42, theFontSize),
                    show:false
                },
                series: [
                    { // 外环
                        name: '客流分布',
                        type: 'pie',
                        clockWise: true,
                        //                        radius: ['50%', '67%'],
                        radius: ['34%', '48%'],
                        label: {
                            //                            formatter: function (params) {
                            //                                debugger
                            //                                console.log(params)
                            //                            },
                            // normal: {
                                // show: true,
                                // formatter: '{b}:<br/>{c}%',
                                // color: '#FAFBFB',

                                // fontSize: this.utils.calSize(14, theFontSize),
                            // },
                            emphasis: {
                                show: true
                            },
                            textStyle: { //数值样式
                                color: '#EBF0F4',
                                fontSize: 18
                            },
                            rich: {
                                a: {
                                    color: '#01FFE4',
                                    verticalAlign: 'bottom',
                                    fontSize: this.utils.calSize(18, theFontSize),
                                    fontWeight: 'bold'
                                },
                                b: {
                                    color: '#FEFEFE',
                                    verticalAlign: 'bottom',
                                    fontSize: this.utils.calSize(16, theFontSize)
                                }
                            },
                            formatter: function (params) {
                                //                                console.log(params)
                                //                                debugger
                                return "{a|" + params.value + "%}\n" + "{b|"+ params.name +"}"
                            },
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: '#fff'
                                },
                                length: 8,
                                length2: 8,
                            },
                            // emphasis: {
                            //     show: true
                            // },

                        },
                        hoverAnimation: true,
                        //                        center: ['50%', '45%'],
                        center: ['49%', '50%'],
                        data: sData,
                                               // data: [
                                               //     {
                                               //         value: 20,
                                               //         name:'无污染',
                                               //         label: {},
                                               //     },
                                               //     {
                                               //         value: 30,
                                               //         name:'轻微',
                                               //         label: {},
                                               //     },
                                               //     {
                                               //         value: 50,
                                               //         name:'轻度',
                                               //         label: {},
                                               //     },
                                               // ]
                    },

                ]
            }
            this.chart1.setOption(theOption)
            this.chart1.resize()

        },

    }
}
</script>

<style lang='scss' scoped>
    .c-div {
        @include center;
        top: 58%;
        width: 141px;
        height: 141px;
        border-radius: 50%;
        background-color: #fff;
    }
    .chart2 {
        position: absolute;
        top: 0;
        left: 0;
    }
    .span {
        @include center;
        top: 40%;
    }
</style>
