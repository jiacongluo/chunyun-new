<template>
    <div ref="chartView" class="chartView">

    </div>
</template>

<script>
    import echarts from 'echarts';
    import chartUtil from '../../../utils/chartUtil'
    import moment from 'moment'

    export default {
        name: 'ChartQuShi',
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
            },
            async type(){
                this.loadData(this.data);
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
                // var theColors = ['#4CE233', '#0693FF', '#F2BB0F', '#00F0FF'];
                // var theColors = ['#4CE233', '#0693FF', '#F2BB0F', '#00F0FF'];
                var theColors = ['#00FCFF',  '#FCFF00', '#FF79E7'];
                var theDatas=datas||[];
                var theValuesList=[];
                var theXDatas=[];
                var theNames=["发送","到达","延误"];
                var theDefaultOption = this.getDefaultOption();
                // debugger;
                if(this.type=="航班"&&theDatas){
                    theValuesList.push(theDatas.map(m=>m.value.sendFlight));
                    theValuesList.push(theDatas.map(m=>m.value.reachFlight));
                    theValuesList.push(theDatas.map(m=>m.value.delayFlight));
                    theXDatas=theDatas.map(m=>m.date);
                }
                if(this.type=="列车"&&theDatas){
                    theValuesList.push(theDatas.map(m=>m.value.sendTrain));
                    theValuesList.push(theDatas.map(m=>m.value.reachTrain));
                    theValuesList.push(theDatas.map(m=>m.value.delayTrain));
                    theXDatas=theDatas.map(m=>m.date);
                }
                if(this.type=="高铁"&&theDatas){
                    theValuesList.push(theDatas.map(m=>m.value.sendHighTrain));
                    theValuesList.push(theDatas.map(m=>m.value.reachHighTrain));
                    theXDatas=theDatas.map(m=>m.date);
                    // theValuesList.push(theDatas.trainReceivesendTrendList.map(m=>m.delayFlight));
                }
                // debugger;

                theDefaultOption.xAxis[0].data=theXDatas.map(m=>moment(m).format('MM-DD'));
                for(var i=0;i<theValuesList.length;i++){
                    theDefaultOption.series.push( {
                        name: theNames[i],
                        // type: 'line',
                        type: 'bar',
                        smooth: true,
                        symbol: 'none', // 不显示数据线上的点
                        areaStyle: areaStyle,
                        stack: '运力',
                        barWidth: 18,
                        color: theColors[i],
                        data:theValuesList[i]&&theValuesList[i].length>0?theValuesList[i]:[100,200,300]
                    })
                }
                theDefaultOption.series.reverse();

                this.chartView.setOption(theDefaultOption,true);

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
                // var theColors = ['#4CE233', '#0693FF', '#F2BB0F', '#00F0FF'];
                var theColors = ['#00FCFF',  '#FCFF00', '#FF79E7'];
                // var theColors = ['#00FCFF', '#0036FF', '#FCFF00', '#FF79E7'];
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: [{
                            name: '发送',
                            color: theColors[0],
                            textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                        },
                            {
                                name: '到达',
                                color: theColors[1],
                                textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                            },
                            {
                                name: '延误',
                                color: theColors[2],
                                textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                            }
                        ],
                        itemWidth: this.utils.calSize(11, theFontSize),
                        itemHeight: this.utils.calSize(4, theFontSize),
                        top: 0,
                        right: 10,
                    },
                    grid: {
                        left: 10,
                        right: 70,
                        bottom: 20,
                        top: 50,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,//从0 开始
                            name:'(日期)',
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
                            name:'(单位:次)',
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