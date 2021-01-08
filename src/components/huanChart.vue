<template>
    <!--环形图-->
    <div class="full-div">
        <div class="full-div the-box" ref="chart1"></div>
        <div class="the-name">
            {{name}}
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import mixin from '@/utils/myMixin'
export default {
    name: '',

    mixins: [mixin],

    components: {},

    props: {
        color: {
            type: String,
            default: '#FFFF00'
        },
        name: {
            type: String,
            default: ''
        },
        percent: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            chart1: null,

        }
    },

    computed: {},

    watch: {
        percent () {
            this.initEvent()

        }
    },

    created () {},

    mounted () {
        this.initEvent()

    },

    destroyed () {},

    methods: {
        // 刷新
        initEvent () {
            this.initChart1()
        },
        initChart1 (sData) {
            //            debugger
            if (!this.chart1) {
                this.chart1 = echarts.init(this.$refs['chart1'])
            }
            let me = this
            let theFontSize = this.htmlFontSize()
            //            console.log(me.color)
            //            debugger
            var dataStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowBlur: 0,
                    shadowColor: '#FFE349'
                }
            }
            let theOption = {
                color: me.color,
                legend: {
                    show: false,
                    data: ['市内'],
                    right: '33%',
                    bottom: '5%',
                    textStyle: {
                        color: '#FEFEFE',
                        fontSize: me.utils.calSize(16, theFontSize),
                        fontFamily: 'Microsoft YaHei'
                    },
                    icon: 'circle',
                    itemHeight: me.utils.calSize(13, theFontSize),
                    itemWidth: me.utils.calSize(13, theFontSize)
                },
                series: [
                    {
                        name: '市内',
                        type: 'pie',
                        clockWise: true,
                        // radius: ['63%', '78%'],
                        radius: ['83%', '98%'],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        center: ['50%', '51%'],
                        zlevel: 10, // 大的环在上层,更好触发动画效果
                        data: [{
                            value: me.percent,
                            label: {
                                normal: {
                                    rich: {
                                        a: {
                                            color: me.color,
                                            align: 'center',
                                            fontSize: me.utils.calSize(28, theFontSize),
                                            fontWeight: 'bold'
                                        },
                                        b: {
                                            color: me.color,
                                            align: 'center',
                                            fontSize: me.utils.calSize(16, theFontSize)
                                        }
                                    },
                                    formatter: function (params) {
                                        return "{a|"+params.value+"}"+"{b|%}"
                                    },
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'normal',
                                        color: '#fff'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: me.color,
                                    shadowColor: me.color,
                                    shadowBlur: 0
                                }
                            }
                        },
                            {
                                value: 100 - me.percent,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: 'transparent'
                                    },
                                    emphasis: {
                                        color: '#747047'
                                    },
                                }
                            }
                        ]
                    },
                    {
                        name: '市内',
                        type: 'pie',
                        clockWise: true,
                        // radius: ['74%', '78%'],
                        radius: ['94%', '98%'],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        center: ['50%', '51%'],
                        data: [{
                            value: me.percent,
                            label: {
                                normal: {
                                    rich: {
                                        a: {
                                            color: 'rgba(204, 161, 32, 1)',
                                            align: 'center',
                                            fontSize: me.utils.calSize(30, theFontSize),
                                            fontWeight: 'bold'
                                        },
                                        b: {
                                            color: 'rgba(204, 161, 32, 1)',
                                            align: 'center',
                                            fontSize: me.utils.calSize(22, theFontSize)
                                        }
                                    },
                                    formatter: function (params) {
                                        return "{a|"+params.value+"}"+"{b|%}"
                                    },
                                    position: 'center',
                                    show: false,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'normal',
                                        color: '#fff'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#FFE349',
                                    shadowColor: '#FFE349',
                                    shadowBlur: 0
                                }
                            }
                        },
                            {
                                value: 100 - me.percent,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(25, 163, 197, 0.5)'
                                    },
                                    emphasis: {
                                        color: 'rgba(25, 163, 197, 0.5)'
                                    },
                                }
                            }
                        ]
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
.the-box {
    width: 100%;
    height: 124px;
}
    .the-name {
        font-size:18px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(253,253,253,1);
        /*line-height:60px;*/
        text-align: center;
    }
</style>
