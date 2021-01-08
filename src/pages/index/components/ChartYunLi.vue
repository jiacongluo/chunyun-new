<template>
    <div class="chartView">
        <div class="name-part">
            <!--(单位:万人)-->
        </div>
        <div ref="chartView" class="chart-panel">

        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import moment from 'moment'
    import chartUtil from '../../../utils/chartUtil'

    export default {
        name: 'ChartYunLi',
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
                // debugger;
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

                var theDatas = datas || [];
                var theDefaultOption = this.getDefaultOption();

                var theValuesList = theDatas.map(m => m.value.totalCount);
                var theXDatas = theDatas.map(m => m.date);
                // debugger;

                theDefaultOption.xAxis[0].data = theXDatas.map(m => moment(m).format('MM-DD'));
                theDefaultOption.series[0].data = theValuesList.map(m => (m / 10000).toFixed(2));
                if (theDefaultOption.series[0].data.length <= 0) {
                    theDefaultOption.series[0].data = [100, 200, 300];
                }


                this.chartView.setOption(theDefaultOption, true);

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
                            color: 'rgba(255,216,0,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(255,216,0,0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
                var theColors = ['#FFD800', '#0036FF', '#0090FF', '#00F0FF'];
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
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
                        left: 10,
                        right: 70,
                        bottom: 10,
                        top: 40,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            name:'(日期)',
                            nameTextStyle: {
                                color: '#B4D9FF',
                                fontSize: this.utils.calSize(14, theFontSize),
                            },
                            axisLine: {
                                onZero: true,
                                lineStyle: {
                                    color: '#6C5D0C'
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
                                interval: 0

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
                            type: 'value',
                            name:'(单位:万人)',
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    // 使用深浅的间隔色
                                    color: ['#6C5D0C'],
                                    type: 'dotted'
                                }
                            },
                            axisLine: {
                                onZero: true,
                                // show: false,
                                lineStyle: {
                                    color: '#6C5D0C'
                                }
                            },
                            nameTextStyle: {
                                color: '#B4D9FF',
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
                            // name: '公路',
                            type: 'line',
                            barWidth: 18,
                            smooth: true,
                            areaStyle: areaStyle,
                            symbol: 'none', // 不显示数据线上的点
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
        .name-part {
            position: absolute;
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(180, 217, 255, 1);
            right: 49px;
            bottom: 293px;
            width: 100px;
            top: 9px;
            text-align: right;
        }
        .chart-panel {
            position: absolute;
            /*top: 34px;*/
            top: 0px;
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