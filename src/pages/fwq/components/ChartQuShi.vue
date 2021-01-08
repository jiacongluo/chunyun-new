<template>
    <div ref="chartView" class="chartView">

    </div>
</template>

<script>
    import echarts from 'echarts';
    import moment from 'moment'
    import chartUtil from '../../../utils/chartUtil'

    export default {
        name: 'ChartDay',
        mixins: [],
        components: {},
        props: {
            data: {type: [Array, String, Number]},
            type: [String, Number]
        },
        data() {
            return {}
        },
        computed: {},

        watch: {
            async data(newData, oldData) {
                this.loadData(newData);
            }
        },

        created() {
        },

        async mounted() {
            this.initChart();
            this.loadData(this.data);

        },

        destroyed() {
        },

        methods: {
            /**
             * 图形大小更改
             * */
            async refresh() {
                this.chartView.resize();
            },
            /***
             * 初始化图表
             */
            async initChart() {

                this.chartView = echarts.init(this.$refs.chartView);


            },

            async loadData(datas) {
                var theDatas=datas||[];
                var theDefaultOption = this.getDefaultOption();

                var theValuesList=theDatas.map(m=>m.user_cnt);
                var theXDatas=theDatas.map(m=>m.countTime.substr(m.countTime.length-2,2)+":00");
                // debugger;

                /*
                * countTime: "2019-01-21-00"
postion_id: "80201"
postion_name: "顺德服务区-向北"
user_cnt: 289
                * */
                theDefaultOption.xAxis[0].data=theXDatas;//.map(m=>moment(m).format('DD日'));
                theDefaultOption.series[0].data=theValuesList;
                this.chartView.setOption(theDefaultOption);

            },
            getDefaultOption() {
                let theFontSize = this.utils.htmlFontSize();
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
                var theColors = ['#00FFF0', '#0036FF', '#0090FF', '#00F0FF'];
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    // formatter:this.utils.tooltipFormatter,
                    // legend: {
                    //     data: [{
                    //         name: '公路',
                    //         color: theColors[0],
                    //         textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                    //     },
                    //         {
                    //             name: '铁路',
                    //             color: theColors[1],
                    //             textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                    //         },
                    //         {
                    //             name: '水路',
                    //             color: theColors[2],
                    //             textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                    //         },
                    //         {
                    //             name: '民航',
                    //             color: theColors[3],
                    //             textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                    //         }
                    //     ],
                    //     itemWidth: this.utils.calSize(11, theFontSize),
                    //     itemHeight: this.utils.calSize(4, theFontSize),
                    // },
                    grid: {
                        left: 40,
                        right: 90,
                        bottom: 10,
                        top: 30+10,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                         name:'(时间)',
                            boundaryGap:false,
                            nameTextStyle: {
                                color: '#B4D9FF',
                                fontSize: this.utils.calSize(14, theFontSize),
                            },
                            axisLine: {
                                onZero: true,
                                lineStyle: {
                                    color: '#0066FF'
                                }
                            },
                            splitLine: {
                                show: false,
                                // lineStyle: {
                                //     // 使用深浅的间隔色
                                //     color: [me.splitLineColor],
                                //     type: 'solid'
                                // }
                            },
                            axisLabel: {
                                fontSize: this.utils.calSize(14, theFontSize),
                                // fontSize: 14,
                                /*fontFamily: 'MicrosoftYaHei',*/
                                color: '#B4D9FF',
                                interval: 1

                            },
                            axisTick: { // 刻度对齐突出的线
                                alignWithLabel: false,
                                interval: 0,
                                show: false
                            },
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            name:'(单位:人)',
                            type: 'value',
                            splitLine: {
                                show: false,
                                // lineStyle: {
                                //     // 使用深浅的间隔色
                                //     color: [me.splitLineColor],
                                //     type: 'solid'
                                // }
                            },
                            axisLine: {
                                onZero: true,
                                lineStyle: {
                                    color: '#0066FF'
                                }
                            },
                            nameTextStyle: {
                                color:'#B4D9FF',
                                fontSize: this.utils.calSize(14, theFontSize)
                            },
                            axisLabel: {
                                fontSize: this.utils.calSize(14, theFontSize),
                                // fontSize: 14,
                                /*fontFamily: 'MicrosoftYaHei',*/
                                color: '#B4D9FF',
                                interval: 0

                            },
                            axisTick: { // 刻度对齐突出的线
                                alignWithLabel: false,
                                // interval: 0,
                                show: false
                            },
                        }
                    ],
                    series: [
                        {
                            name: '实时客流',
                            type: 'line',
                            areaStyle: areaStyle,
                            symbol: 'none', // 不显示数据线上的点
                            smooth:true,
                            stack: '运力',
                            barWidth: 18,
                            color: theColors[0],
                            data: []
                        }

                    ]
                };

                return option;
            }

        }
    }
</script>

<style lang='scss' scoped>
    .chartView {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        /*background: red;*/
        .chart-panel {
            position: absolute;
            top: 48px;
            left: 0px;
            right: 0px;
            bottom: 0px;

        }
        .chart-title {
            position: absolute;
            left: 35px;
            top: 13px;
            font-size: 18px;
            right: 0px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(0, 255, 255, 1);
        }
    }

</style>