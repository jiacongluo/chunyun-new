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

                // debugger;
                var theDefaultOption = this.getDefaultOption();

                // var theColors = ['#54FFAD', '#0036FF', '#0090FF', '#00F0FF'];
                // var theColors = ['#00FCFF', '#0036FF', '#FCFF00', '#FF79E7'];
                var theColors = ['#00FCFF', '#FCFF00', '#0036FF', '#FF79E7'];
                var theDatas=datas||[];
                var theValuesList=[];
                var theXDatas=[];
                // var theNames=["公路","铁路","水路","民航"];
                var theNames=["公路","水路","铁路","民航"];
                var theDefaultOption = this.getDefaultOption();
                // debugger;
                if(theDatas){
                    theValuesList.push(theDatas.map(m=>(m.value.busCount/10000).toFixed(2)));
                    theValuesList.push(theDatas.map(m=>(m.value.waterCount/10000).toFixed(2)));
                    theValuesList.push(theDatas.map(m=>(m.value.trainCount/10000).toFixed(2)));
                    theValuesList.push(theDatas.map(m=>(m.value.flyCount/10000).toFixed(2)));
                    theXDatas=theDatas.map(m=>m.date);
                }
                // debugger;

                theDefaultOption.xAxis[0].data=theXDatas.map(m=>moment(m).format('MM-DD'));
                for(var i=0;i<theValuesList.length;i++){
                    theDefaultOption.series.push(
                        {
                        name: theNames[i],
                        type: 'bar',
                        // stack: '运力',
                        barWidth: 18/2,
                        color: theColors[i],
                        data: theValuesList[i]&&theValuesList[i].length>0?theValuesList[i]:[100,200,300]
                    })
                }

                this.chartView.setOption(theDefaultOption,true);

            },
            getDefaultOption() {
                let theFontSize = this.utils.htmlFontSize();
                // var theColors = ['#54FFAD', '#0036FF', '#0090FF', '#00F0FF'];
                // var theColors = ['#00FCFF', '#0036FF', '#FCFF00', '#FF79E7'];
                var theColors = ['#00FCFF', '#FCFF00', '#0036FF', '#FF79E7'];
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: [{
                            name: '公路',
                            color: theColors[0],
                            textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                        },
                            {
                                name: '水路',
                                color: theColors[2],
                                textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                            },
                            {
                                name: '铁路',
                                color: theColors[1],
                                textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                            },

                            {
                                name: '民航',
                                color: theColors[3],
                                textStyle: {color: "#D9D9D9", fontSize: this.utils.calSize(14, theFontSize)}
                            }
                        ],
                        itemWidth: this.utils.calSize(11, theFontSize),
                        itemHeight: this.utils.calSize(4, theFontSize),
                        top:10,
                    },
                    grid: {
                        left: 10,
                        right: 100,
                        bottom: 10,
                        top: 50,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            name:'(日期)',
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
                            name:'(单位:万人)',
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