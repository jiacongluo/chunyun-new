<template>
    <!--实时客流趋势-->
    <div :class="['rt-box-outer']">
        <div :class="['rt-box']">
            <div class="title">
                <div class="title-l">
                    <i></i>
                    <span>实时客流趋势</span>
                </div>
                <div class="title-r cp" @click="clickClose">
                    <div class="close"></div>
                </div>
            </div>
            <div class="c-box">
                <div ref="chart1" class="full-div"></div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import mixin from '@/utils/myMixin'
import { postData }from '@/utils/core/http'
export default {
    name: '',

    mixins: [mixin],

    components: {},

    props: {
        showCRT: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            // showCRT: true,
            chart1: null,
            mapObj: {
                1: [{
                    name: '海安港及新港',
                    key: 'hagList',
                    type: 'hag'
                },{
                    name: '海安港及新港',
                    key: 'hagPredictList',
                    pre: true,
                    type: 'hag'
                },{
                    name: '粤海铁路北港',
                    key: 'tlbgList',
                    type: 'tlbg'
                },{
                    name: '粤海铁路北港',
                    key: 'tlbgPredictList',
                    pre: true,
                    type: 'tlbg'
                }]
            }
        }
    },

    computed: {},

    watch: {
    },

    created () {},

    mounted () {
        this.$nextTick(() => {
            this.init()
        })
    },

    destroyed () {},

    methods: {
        clickClose () {
            this.chart1 = null
            this.$emit('update:showCRT', false)
        },

        getData () {
            const url = '/qz/qzFlowTrend'
            const data = {
            }
            postData(url, data).then((res) => {
                // console.log(res)
                let theData = res.data
                // let theData = [res.data.hagList, res.data.tlbgList, res.data.hagPredictList, res.data.tlbgPredictList]
                // debugger
                this.handleData(theData)

            })
        },
        init () {
            this.getData()
        },
        // 处理数据
        handleData (data) {
            let seriesItemArr = this.mapObj[1]
            // debugger
            let seriesArr = [] // series的数据
            let temp = [] //
            let seriesNameArr = [] // seriesd的名字
            let xArr = [] // 横坐标数据
            let me = this
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

            for (const item of seriesItemArr) {
                if (!item.pre) { // 预测的不加入
                    seriesNameArr.push(item.name)
                }
                let sObj = {
                    name: item.name,
                    type: 'line',
                    areaStyle: areaStyle,
                    lineStyle: {
                        color: item.type==='tlbg'? '#FFFF00':'#00FFFF',
                        type: item.pre? 'dashed':'solid',
                    },
                    smooth: false,
                    symbol: 'none', // 不显示数据线上的点
                    data: []
                    // data: sData
                }
                // debugger
                for (const dataKey in data) {
                    if (dataKey === item.key) {
                        for (const datumElement of data[dataKey]) {
                            // debugger
                            let theX = parseInt(datumElement.statDate.split(' ')[1].split(':')[0])
                            if (theX === 0 && item.pre) { // 先跳过预测数据的0时
                                theX = 24
                            }
                            let theArr = [
                                theX+':00',
                                datumElement.subscriberCount/10000
                            ]
                            // let theArr = datumElement.subscriberCount/10000

                            // debugger
                            sObj.data.push(theArr)
                        }
                    }
                }
                temp.push(sObj)
            }
            for (let i = 0; i < 25; i++) {
                // if (i === 23) {
                //     xArr.push(i+':00')
                //     continue
                // }
                if (i%2===0) {
                    xArr.push(i+':00')
                }
            }
            // xArr = this.utils.getHours(':00')
            temp[1].data.unshift(temp[0].data[temp[0].data.length-1]) // 预测数据加入实时的最后一个数
            temp[3].data.unshift(temp[2].data[temp[2].data.length-1]) // 预测数据加入实时的最后一个数
            // console.log(temp)
            // debugger
            seriesArr[0] = temp[0]
            seriesArr[1] = temp[2]
            seriesArr[2] = temp[1]
            seriesArr[3] = temp[3] // 换个顺序 对应不同颜色
            // debugger
            this.initChart1(seriesArr, seriesNameArr, xArr)
        },
        initChart1 (sData,lData,xData) {
            this.chart1 = echarts.init(this.$refs['chart1'])
            // debugger
            let theFontSize = this.htmlFontSize()
            let me = this

            let option = {
                color: ['#00FFFF', '#FFFF00'],
                tooltip: {
                    trigger: 'axis',
                    extraCssText: 'background:rgba(0,0,51,0.85);\n' + // 浮动框的样式
                        'border:1px solid #00C0FF;' +
                        'padding: 20px 17px 0px 17px',
                    formatter:function (params, ticket, callback) { // 格式化tooltip
                        // debugger;
                        // var theStr=params[0].name+"<br/>";
                        var theStr=`<div class="tt-name tt-line">${params[0].name}</div>`;
                        var theHash={};
                        //                         debugger;
                        for(var i=0;i<params.length;i++){
                           var theItem=params[i];
                           // debugger
                           if(!theHash[theItem.seriesName]){
                               theHash[theItem.seriesName]=true;
                               // theStr+= `<div class="tt-line">${theItem.marker}${theItem.seriesName}: ${theItem.value}</div>`
                               theStr+= `<div class="tt-line">
                                    <div class="tt-name2">${theItem.seriesName}: </div>
                                    <div class="tt-name2 tt-num">${theItem.value[1]}</div>
                                    </div>`

                           }
                        }
                        return theStr;//params[0].name+"<br/>"+params[0].marker+params[0].seriesName+":"+params[0].value;
                    }
                },
                grid: {
                    left: '3%',
                    right: '9%',
                    bottom: '8%',
                    top: '18%',
                    containLabel: true
                },
                legend: {
                    // data: ['每日客流', '香港--港珠澳'],
                    show: true,
                    data: lData,
                    textStyle: {
                        color: me.axisFontColor,
                        fontSize: this.utils.calSize(16, theFontSize),
                        fontFamily: 'Microsoft YaHei'
                    },
                    icon: 'circle',
                    right: '8%',
                    top: '5%',
                    itemGap: this.utils.calSize(27, theFontSize),
                    itemWidth: this.utils.calSize(10, theFontSize),
                    // itemWidth: me.isLabtop ? 25 : 29,
                    itemHeight: this.utils.calSize(10, theFontSize)
                    // itemHeight: me.isLabtop ? 11 : 13,
                },
                xAxis: [
                    {
                        type: 'category',
                        //                        axisPointer: {
                        //                            type: 'shadow'
                        //                        },
                        // 轴 样式
                        name: '(时间)',
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
                            /*fontFamily: 'MicrosoftYaHei',*/
                            color: me.axisFontColor,
                            interval: 0

                        },
                        axisTick: { // 刻度对齐突出的线
                            alignWithLabel: false,
                            interval: 0,
                            show: false
                        },
                        // data: ['8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月']
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '(单位:万人)',
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
                            /*fontFamily: 'MicrosoftYaHei',*/
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
                series: sData
                // series: [
                //     {
                //         name: '每日客流',
                //         type: 'line',
                //         areaStyle: areaStyle,
                //         // smooth: true,
                //         symbol: 'none', // 不显示数据线上的点
                //         data: me.handleData()
                //         // data: sData
                //     },
                //     {
                //         name: '香港--港珠澳',
                //         type: 'line',
                //         areaStyle: areaStyle,
                //         // smooth: true,
                //         symbol: 'none', // 不显示数据线上的点
                //         data: me.handleData()
                //         // data: sData
                //     },
                //
                // ]
            }
            this.chart1.setOption(option)
            this.chart1.resize()

        },
        // handleData () {
        //     let arr = []
        //     for (let i = 0; i < 12; i++) {
        //         arr.push(this.utils.randomNum(10,100))
        //     }
        //     return arr
        // },
    }
}
</script>

<style lang='scss' scoped>
    .rt-box-outer {
        position: absolute;
        z-index: 11;
        left: 74px;
        bottom: 112px;
        width: 892px;
        height: 310px;
    }
    .rt-box {
        width: 100%;
        height: 100%;
        background: url("../assets/曲线图背景@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .title {
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(254,254,254,1);
        /*line-height:60px;*/
        padding: 16px 27px 10px 34px;
        display: flex;
        justify-content: space-between;
        i {
            width: 20px;
            height: 22px;
            background: url("../assets/时长_icon@2x.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 8px;
        }
    }
    .title-l {
        display: flex;
        align-items: center;
    }
    .title-r {

    }
    .close {
        width: 14px;
        height: 3px;
        background: url("../assets/收起_icon@2x.png") no-repeat;
        background-size: 100% 100%;

    }
    .c-box {
        width: 100%;
        height: 259px;

    }


</style>
