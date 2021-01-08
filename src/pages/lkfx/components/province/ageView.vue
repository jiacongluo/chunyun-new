<template>
    <div ref="chartView" class="chart-panel">
        <div class="circle-part">

        </div>
        <div class="name-part">
            {{name}}
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: 'ageView',

        mixins: [],

        components: {},

        props: {
            value: {type: [Number]},
            name: [String],
            color: [String]
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
                        left: '4%',
                        right: '12%',
                        bottom: '8%',
                        top: '18%',
                        containLabel: true
                    },

                    xAxis: [
                        {
                            type: 'category',
                            //                        axisPointer: {
                            //                            type: 'shadow'
                            //                        },
                            // 轴 样式
                            name: '(时点)',
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
                                fontFamily: 'MicrosoftYaHei',
                                color: me.axisFontColor,
                                interval: 0

                            },
                            axisTick: { // 刻度对齐突出的线
                                alignWithLabel: true,
                                interval: 0,
                                show: false
                            },
                            data: ['8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月']
                            // data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(时长:分钟)',
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
                                fontFamily: 'MicrosoftYaHei',
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
                            name: '转移联单数量统计',
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
                            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                            // data: sData
                        }
                    ]
                };
                this.chartView.setOption(option);
            },

        }
    }
</script>

<style lang='scss' scoped>
    .chart-panel {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        .circle-part {
            width: 84px;
            height: 84px;
        }
        .name-part {
            font-size: 16px;
            width: 84px;
            text-align: center;
            font-family: PingFang SC;
            font-weight: 400;
            top: 11+84px;
            color: rgba(253, 253, 253, 1);
        }
    }
</style>