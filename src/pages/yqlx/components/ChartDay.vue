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
                var theDatas = datas || [];
                var theDefaultOption = this.getDefaultOption();

                var theValuesList = theDatas.map(m => m.value.num);
                var theXDatas = theDatas.map(m => m.date);
                // debugger;
                theDefaultOption.xAxis[0].interval = 1;
                // theDefaultOption.xAxis[0].splitNumber=7;
                var theShowLabels=theXDatas.map(m => moment(m).format('MM-DD'));
                theDefaultOption.xAxis[0].data = theShowLabels;
                 var theModNumber =1;
                if (theXDatas.length <= 20) {
                    theModNumber = 0;
                }
                else{
                    theModNumber=Math.ceil(theShowLabels.length/20);
                }
                // debugger;
                // var theShowNumbers = [];
                theDefaultOption.xAxis[0].axisLabel = {
                    interval: theModNumber,
                    color:'#B4D9FF',
                    formatter: function (value, idx) {
                        if (theModNumber <= 0) {
                            return value;
                        }
                        if (idx%theModNumber== 0) {
                            debugger;
                            return value;
                        }
                        else {
                            return "";
                        }
                    }
                };

                // theDefaultOption.xAxis[0].interval=Math.floor(theXDatas.length/7);
                theDefaultOption.series[0].data = [100,200,300];
                var theDatas=theValuesList.map(m => (m / 10000).toFixed(2));
                if(theDatas.length>0){
                    theDefaultOption.series[0].data =theDatas;
                }
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
                        right: 45,
                        bottom: 10,
                        top: 50,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            nameTextStyle: {
                                color: '#B4D9FF',
                                fontSize: this.utils.calSize(14, theFontSize),
                            },
                            name:'(日期)',
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
                            name: '(单位:万人)',
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
                            // name: '每日发送量',
                            type: 'line',
                            areaStyle: areaStyle,
                            symbol: 'none', // 不显示数据线上的点
                            smooth: true,
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