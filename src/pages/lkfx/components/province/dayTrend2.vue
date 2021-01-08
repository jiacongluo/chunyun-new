<template>
    <div class="chartView">
        <div class="chart-title">
            实时总人口
        </div>
        <div ref="chartView" class="chart-panel">

        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import  chartUtil from  '../../../../utils/chartUtil'
    export default {
        name: 'dayTrend',
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
                /*
                * population_gd: 0,
                    population_in: 0,
                    population_in: 0
                * */
                var theDefaultOption = this.getDefaultOption();
                var theXDates=datas.map(m=>m.stat_date);
                var theValues=datas.map(m=>m.value.population_gd);

                theDefaultOption.yAxis.axisLine.onZero = true;
                theDefaultOption.series = [

                    {
                        // name: '搜索引擎',
                        type: 'line',
                        //stack: '总量',
                        smooth: true,
                        color: '#FFFF00',
                        symbol: 'none',
                        data: theValues.map(function (item) {
                            return (item / 10000).toFixed(2);
                        }),
                        lineStyle: {
                            normal: {
                                // color: '#4293f2' //rgba(66,147,242
                            }
                        },
                        // areaStyle: {
                        //     normal: {
                        //         color: {
                        //             type: 'linear',
                        //             x: 0,
                        //             y: 0,
                        //             x2: 0,
                        //             y2: 1,
                        //             // colorStops: [{
                        //             //     offset: 0, color: formateRgba('#13ffff', 0.3),// 'rgba(66,147,242,0.3)'
                        //             // }, {
                        //             //     offset: 0.5, color: formateRgba('#13ffff', 0.15),//
                        //             // }, {
                        //             //     offset: 1, color: formateRgba('#13ffff', 0),//
                        //             // }]
                        //         }
                        //     }
                        // },
                    },
                ];
                this.chartView.setOption(theDefaultOption);

            },
            getDefaultOption(){
                var theXData = [];
                //var theTodayDate=new Date();
                for (var i = 0; i < 24; i++) {
                    theXData.push(i);
                }
                //debugger;
                /*一类图表基本设置*/
                var theOptions = {
                    /*title: {
                        text: '折线图堆叠'
                    },*/

                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: function (point, params, dom, rect, size) {
                            // 固定在顶部
                            return [point[0], '10%'];
                        },
                        formatter: function (params) {
                            //debugger;
                            var theTimeValue = parseInt(params[params.length - 1].name);
                            // var theHours = Math.floor(theTimeValue / 12) + "点" + (theTimeValue % 12) * 5 + '分';
                            var theHours = Math.floor(theTimeValue) + "点";// + (theTimeValue % 12) * 5 + '分';
                            //debugger;
                            var theColorText = "<span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + params[params.length - 1].color + ";\"></span>";

                            //var theDate = new Date();
                            //theDate.setTime(arg.value);
                            //return theHours;//theDate.getMonth() + 1 + "月" + theDate.getDate() + "日";
                            return theHours + '<br/>' + theColorText + params[params.length - 1].data + '万';
                        }
                    },
                    grid: {
                        left: 20,
                        right: 75,
                        top: 30,
                        bottom: 0,
                        // width: 480,
                        // height: 175,
                        containLabel: true
                    },
                    /*toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },*/
                    xAxis: {
                        type: 'category',
                        name: '(时间)',
                        nameLocation: 'end',
                        nameTextStyle: {
                            color: '#B4D9FF',
                            fontSize: this.utils.calSize(14, this.utils.htmlFontSize())
                        },
                        //interval:12,
                        //splitNumber: 24,
                        axisLabel: {
                            interval: 0,
                            color:'#FEFEFE',
                            formatter: function (value, idx) {
                                //debugger;
                                //return value;
                                if (idx % ( 4) == 0) {
                                    //console.log('x2:'+value/12);
                                    //console.log('x:'+value/(60/5));
                                    console.log("value",value);
                                    return value+":00";
                                }
                                else {
                                    return "";
                                }
                            }
                        },
                        /*axisPointer: {
                            label: {
                                show: true,
                                color: '#05cffa',
                                formatter: function (arg) {
                                    var theTimeValue = parseInt(arg.value);
                                    var theHours = Math.floor(theTimeValue / 12) + "点" + (theTimeValue % 12) * 5 + '分';
                                    //debugger;
                                    //var theDate = new Date();
                                    //theDate.setTime(arg.value);
                                    return theHours;//theDate.getMonth() + 1 + "月" + theDate.getDate() + "日";
                                }
                            },
                            lineStyle: {
                                color: '#05cffa',
                                shadowBlur: {
                                    shadowColor: '#05cffa',
                                    shadowBlur: 10
                                }
                            }
                        },*/
                        boundaryGap: false,
                        splitLine: {show: false},
                        axisTick:{show:false},
                        axisLine: {
                            lineStyle: {
                                color: '#0066FF'// '#557398'
                            }
                        },
                        data: theXData
                    },
                    yAxis: {
                        type: 'value',
                        // name: '(人数/万)',
                        name: '(单位:万人)',
                        nameLocation: 'end',
                        splitLine: {show: false},
                        axisLabel: {
                            color:'#FEFEFE'
                        },
                        nameTextStyle: {
                            color: '#B4D9FF',
                            fontSize: this.utils.calSize(14, this.utils.htmlFontSize())
                        },
                        axisTick:{show:false},
                        axisLine: {
                            lineStyle: {
                                color: '#0066FF'// '#557398'
                            }
                        }
                    }

                };

                return theOptions;
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