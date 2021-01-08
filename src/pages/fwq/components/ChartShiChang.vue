<template>
    <div ref="chartView" class="chartView">

    </div>
</template>

<script>
    import echarts from 'echarts';
    import moment from 'moment'
    import chartUtil from '../../../utils/chartUtil'

    export default {
        name: 'ChartTotal',
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

                var zhuliuMap= { // 驻留时长
                    0: '0-1',
                    1: '1-2',
                    2: '2-3',
                    3: '3-4',
                    4: '4-5',
                    5: '5-6',
                    6: '6-7',
                    7: '7以上',
                    8: '8-24',
                };
                /**
                 *     {
      "id": 38229,
      "statDate": "20190522",
      "statTime": null,
      "postionType": "1",
      "postionName": "电白服务区-向东",
      "postionId": null,
      "timeGroup": "0",
      "timeValue": 6932,
      "sourceScope": null,
      "timeZb": 0.885
    }
                 * */


                // debugger;
                var theDefaultOption = this.getDefaultOption();

                var theColors = ['#00FFFF', '#0036FF', '#0090FF', '#00F0FF'];
                var theDatas=(datas||[]).filter(m=>m.timeGroup!=8);
                var theValuesList=[];
                var theXDatas=[];
                var theNames=["驻留时长","","",""];
                var theDefaultOption = this.getDefaultOption();
                // debugger;
                if(theDatas){
                    theValuesList.push(theDatas.map(m=>(m.timeZb).toFixed(2)));
                    theXDatas=theDatas.map(m=>zhuliuMap[m.timeGroup]);
                }
                // debugger;

                theDefaultOption.xAxis[0].data=theXDatas;
                for(var i=0;i<theValuesList.length;i++){
                    theDefaultOption.series.push(
                        {
                        name: theNames[i],
                        type: 'bar',
                        // stack: '运力',
                        barWidth: 30,
                        color: theColors[i],
                        data: theValuesList[i]
                    })
                }

                this.chartView.setOption(theDefaultOption,true);

            },
            getDefaultOption() {
                var me=this;
                let theFontSize = this.utils.htmlFontSize();
                var theColors = ['#54FFAD', '#0036FF', '#0090FF', '#00F0FF'];
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
                    //     top:10,
                    // },
                    formatter:me.utils.tooltipFormatter,
                    grid: {
                        left: 40,
                        right: 80,
                        bottom: 10,
                        top: 30+10,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            name:'(小时)',
                            nameTextStyle: {
                                color: '#B4D9FF',
                                fontSize: this.utils.calSize(14, theFontSize),
                            },
                            axisLine: {
                                onZero: false,
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
                            type: 'value',
                            name:'(单位:%)',
                            splitLine: {
                                show: false,
                                // lineStyle: {
                                //     // 使用深浅的间隔色
                                //     color: [me.splitLineColor],
                                //     type: 'solid'
                                // }
                            },
                            axisLine: {
                                onZero: false,
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