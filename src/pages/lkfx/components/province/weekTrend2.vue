<template>
    <div class="chartView">
        <div class="chart-title">
            迁入迁出
        </div>
        <div ref="chartView" class="chart-panel">

        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import moment from 'moment'
    import  chartUtil from  '../../../../utils/chartUtil'
    // import mixin from '@/utils/myMixin'
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
        flow: 26204114 //流动人口
        mig_in: 1846932 //迁入
        mig_out: 1281068 //迁出
        province_city: "全省"
        resident: 81095797 //常驻人口
        stat_date: "20190301"
        total: 107137697 //总人口
        * */
                var theXData=datas.map(m=>m.value.stat_date.getTime());

                var theTotalValues=datas.map(m=>m.value.mig_in);
                var theResidentValues=datas.map(m=>m.value.mig_out);
                // var theFlowValues=datas.map(m=>m.value.flow);

                var theColors = ['#17EC08',
                    '#00F4F7','#FFFF00'];
                let theFontSize = this.utils.htmlFontSize();
                var me=this;
                var theLegends = [
                    {name: '迁入',height:me.utils.calSize(7, theFontSize), width:me.utils.calSize(22, theFontSize),itemHeight:me.utils.calSize(7, theFontSize), itemWidth:me.utils.calSize(22, theFontSize), textStyle: {color: "#D9D9D9", fontSize: me.utils.calSize(14, theFontSize)},icon:'rect'},
                    {name: '迁出',height:me.utils.calSize(7, theFontSize), width:me.utils.calSize(22, theFontSize),itemHeight:me.utils.calSize(7, theFontSize), itemWidth:me.utils.calSize(22, theFontSize), textStyle: {color: "#D9D9D9", fontSize: me.utils.calSize(14, theFontSize)},icon:'rect'},
                ];
                var theName1 = "迁入";
                var theName2 = "迁出";


                var option = {
                    tooltip: {
                        trigger: 'axis',
                        //show:true,
                        axisPointer: {
                            type: 'line',
                            show: true,
                            label: {
                                // show: true
                            }
                        },
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: function (point, params, dom, rect, size) {
                            // 固定在顶部
                            return [point[0], '10%'];
                        },
                        formatter: function (params) {
                            var theIndex = 0;
                            var theDatas = [];
                            //var theText = "";
                            if (params.length >= 4) {
                                for (var i = 0; i < params.length; i = i + 2) {

                                    var theColorText = "<span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + params[i].color + ";\"></span>";
                                    theDatas.push(theColorText + params[i].seriesName + ':' + (params[i].data || params[i + 1].data) + '万');
                                }
                            }
                            else {
                                for (var i = 0; i < params.length; i = i + 1) {
                                    // debugger;
                                    var theColorText = "<span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" + params[i].color + ";\"></span>";
                                    theDatas.push(theColorText + params[i].seriesName + ':' + (params[i].data || params[i + 1].data) + '万');
                                }
                            }
                            var theDate = new Date();
                            theDate.setTime(params[0].name);
                            var theNameText = theDate.getMonth() + 1 + "月" + theDate.getDate() + "日";
                            //debugger;
                            return theNameText + "<br/>" + theDatas.join('<br />');
                        }
                    },

                    legend: {
                        //align:'right',//
                        top: 0,
                        right:17,
                        itemHeight:me.utils.calSize(7, theFontSize), itemWidth:me.utils.calSize(22, theFontSize),
                        // left: 600,
                        data: theLegends
                    },
                    color: theColors,
                    grid: {
                        left: 20,
                        right: 70,
                        top: 30,
                        bottom: 0,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick:{show:false},
                        nameTextStyle: {
                            color: '#B4D9FF',
                            fontSize: this.utils.calSize(14, this.utils.htmlFontSize())
                        },
                        name: '(日期)',
                        axisLine: {
                            lineStyle: {
                                color: '#0066FF'// '#557398'
                            }
                        },
                        /*axisPointer: {
                            label: {
                                color: '#05cffa',
                                formatter: function (arg) {
                                    //debugger;
                                    var theDate = new Date();
                                    theDate.setTime(arg.value);
                                    return theDate.getMonth() + 1 + "月" + theDate.getDate() + "日";
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
                        axisLabel: {
                            // rotate: 30,
                            color:'#FEFEFE',
                            formatter: function (value, idx) {
                                var theDate = new Date();
                                theDate.setTime(value);
                                // return theDate.getMonth() +  '月' + theDate.getDate() + "日";
                                return moment(theDate).format('MM-DD');
                                // return  theDate.getDate() + "日";
                            }
                        },
                        data: theXData
                    },
                    yAxis: {
                        type: 'value',
                        axisTick:{show:false},
                        // name: '(人数/万)',
                        nameTextStyle: {
                            color: '#B4D9FF',
                            fontSize: this.utils.calSize(14, this.utils.htmlFontSize())
                        },
                        name: '(单位:万人)',
                        axisLabel:{ color:'#FEFEFE',},
                        min:0,// theCallAreaId == "广东省" ? 5000 : 0,
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#0066FF'// '#557398'
                            }
                        }
                    },
                    series: [

                        {
                            name: theName1,
                            type: 'line',
                            symbol: 'none',
                            //stack: '总量',
                            color:theColors[0] ,
                            smooth:false,
                            data: theTotalValues.map(function (item) {
                                return (item / 10000).toFixed(2)
                            }),
                            lineStyle: {
                                normal: {
                                    //rgba(66,147,242
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: chartUtil.formateRgba('#32ff4b', 0.3)//'rgba(66,147,242,0.3)'
                                        }, {
                                            offset: 0.5, color: chartUtil.formateRgba('#32ff4b', 0.15)//'rgba(66,147,242,0.15)'
                                        }, {
                                            offset: 1, color: chartUtil.formateRgba('#32ff4b', 0)// 'rgba(66,147,242,0)'
                                        }]
                                    }
                                }
                            },
                        },
                        {
                            name: theName2,
                            type: 'line',
                            symbol: 'none',
                            z: 1,
                            color: theColors[1] ,
                            //stack: '总量',
                            smooth:false,
                            data: theResidentValues.map(function (item) {
                                return (item / 10000).toFixed(2)
                            }),
                            lineStyle: {
                                normal: {
                                    //rgba(55,255,75
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: chartUtil.formateRgba('#4293f2', 0.3)// 'rgba(55,255,75,0.3)'
                                        }, {
                                            offset: 0.5, color: chartUtil.formateRgba('#4293f2', 0.15)// 'rgba(55,255,75,0.15)'
                                        }, {
                                            offset: 1, color: chartUtil.formateRgba('#4293f2', 0)// 'rgba(55,255,75,0)'
                                        }]
                                    }
                                }
                            },
                        },
                    ]
                };
                this.chartView.setOption(option);

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