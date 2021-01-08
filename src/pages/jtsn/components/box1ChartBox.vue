<template>
    <div class="data-box-box1 bgi">
        <div class="data-box-box1-item" v-for="(item,index) in dataBoxBox1" v-if="item.show">
            <box1Chart :data="item"></box1Chart>
        </div>
    </div>
</template>

<script>
import box1Chart from './box1Chart'
import { postData,getData } from '@/utils/core/http'
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import airportUtil from '@/utils/airportUtil'

export default {
    name: '',

    mixins: [mapMixin,myMixin],

    components: {
        box1Chart
    },

    props: {},

    data () {
        return {
            airName: '',
            dataBoxBox1: [
                {
                    name: '日总旅客量',
                    num: 0,
                    key: 'travelers',
                    show: true,
                    unit: '万'
                },
                {
                    name: '到达旅客量',
                    num: 0,
                    key: 'arrivalValue',
                    show: true,
                    unit: '万'

                },
                {
                    name: '出发旅客量',
                    num: 0,
                    key: 'leaveValue',
                    show: true,
                    unit: '万'

                },
                {
                    name: '发送班次数',
                    num: 0,
                    key: 'outCnt',
                    show: true,
                    unit: ''

                },
                {
                    name: '到达班次数',
                    num: 0,
                    key: 'inCnt',
                    show: true,
                    unit: ''
                },
            ],
        }
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {
        this.init()
    },

    destroyed () {},

    methods: {
        // 客运站隐藏 发送班次数/到达班次数
        fillter () {
            const theType = this.postionType
            if (theType === '客运站'||this.postionName=="潮汕国际机场" /*||this.postionName=="金湾机场"*/ ||this.postionName=="宝安国际机场" ||this.postionName=="佛山沙堤机场"  ) {
                for (const dataBoxBox1Element of this.dataBoxBox1) {
                    if (dataBoxBox1Element.name === '发送班次数'|| dataBoxBox1Element.name === '到达班次数') {
                        dataBoxBox1Element.show = false
                    }
                }
            } else {
                for (const dataBoxBox1Element of this.dataBoxBox1) {
                    // if (dataBoxBox1Element.name === '发送班次数'|| dataBoxBox1Element.name === '到达班次数') {
                        dataBoxBox1Element.show = true
                    // }
                }
            }
        },
        init () {
            this.fillter()
            this.fetchData()
            this.fetchData2()
        },
        fetchData () {
            const url = '/api/terminal/getTerminalPassenger'
            const data = {
                countDate: this.checkDate,
                postionID: this.postionID,
                postionName: this.postionName,
            }
            // debugger
            getData(url, data).then((res) => {
                // console.log(res)
                let theDataObj = res.data[0]
                for (const dataKeyElement of this.dataBoxBox1) {
                    for (const theDataObjKey in theDataObj) {
                        if (theDataObjKey === dataKeyElement.key) {
                            dataKeyElement.num = this.utils.calWanNum(theDataObj[theDataObjKey],1)
                            dataKeyElement.unit = this.utils.getWanUnit(dataKeyElement.num)
                        }
                    }
                }
            })
        },
        // 班次
        fetchData2 () {
            let postionName = this.postionName
            let postionType = this.postionType
            if (postionType === '机场') {
                let url = '/api/air/getInOutClass'
                if (postionName === '宝安国际机场') {
                    url = '/api/baoAnAirPort/baoAnFlyInOutCount'
                }
                // const theDate = this.isDebug?'2019-01-14':this.checkDate
                const theDate = this.checkDate
                // this.airName = this.isDebug?'SZX':airportUtil.getCodeByName(this.postionName)
                this.airName = airportUtil.getCodeByName(this.postionName)
                const data = {
                    date: theDate,
                    airName: this.airName,
                }
                // debugger
                getData(url, data).then((res) => {
                    // console.log(res)
                    let theDataObj = res.data[0]
                    if (postionName === '宝安国际机场') {
                        theDataObj = res.data
                    }
                    for (const dataKeyElement of this.dataBoxBox1) {
                        for (const theDataObjKey in theDataObj) {
                            if (theDataObjKey === dataKeyElement.key) {
                                dataKeyElement.num = this.utils.calWanNum(theDataObj[theDataObjKey])
                                dataKeyElement.unit = this.utils.getWanUnit(dataKeyElement.num)
                            }
                        }
                    }
                })
            }
            if (postionType === '铁路') {
                const theDate = this.checkDate.split('-').join('')
                let url = `/api/gdcnymotOut/train/count/${postionName}/${theDate}`
                const data = {
                    // date: theDate,
                    // airName: this.airName,
                }
                // debugger
                getData(url, data).then((res) => {
                    // console.log(res)
                    let theDataObj = res.data
                    this.dataBoxBox1[3]['num'] = this.utils.calWanNum(theDataObj['outCount'])
                    this.dataBoxBox1[3]['unit'] = this.utils.getWanUnit(this.dataBoxBox1[3]['num']+'')
                    this.dataBoxBox1[4]['num'] = this.utils.calWanNum(theDataObj['inCount'])
                    this.dataBoxBox1[4]['unit'] = this.utils.getWanUnit(this.dataBoxBox1[4]['num']+'')
                })
            }

        }

    }
}
</script>

<style lang='scss' scoped>
    .data-box-box1-item {
        min-width: 140px;

    }
</style>
