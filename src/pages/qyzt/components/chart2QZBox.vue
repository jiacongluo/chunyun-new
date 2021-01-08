<template>
    <div class="full-div thebox">
        <div class="box-l">
            <manWoman :man="genderData.man"></manWoman>
        </div>
        <div class="the-line"></div>
        <div class="box-r">
            <div class="box-r-inner">
                <div class="c-div" v-for="(item, index) in ageData" :key="index">
                    <huanChart
                        :color="index%2===0?'#18FF00':'#FFFF00'"
                        :name="item.name"
                        :percent="item.percent"></huanChart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import huanChart from '@/components/huanChart'
import manWoman from '@/components/manWoman'
import mixin from '@/utils/myMixin'
import { postData }from '@/utils/core/http'
export default {
    name: '',

    mixins: [mixin],

    components: {
        huanChart,
        manWoman
    },

    props: {},

    data () {
        return {
            ageData: [],
            genderData: {
                man: 0,
                woman: 0
            }
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
        init () {
            this.getData()
            this.getGenderData()
        },
        getData () {
            const url = '/qz/qzVisitersAge'
            const data = {
                // date: '2019-12-10'
                date: this.checkDate
            }
            postData(url, data).then((res) => {
                // let resData = _.sortBy(res.data, (item) => { // 排序
                //     return parseInt(item.ttime)
                // })
                let sData = []
                // for (const datum of res.data) {
                //     // debugger
                //     const ageKey = parseInt(datum.qzAge)
                //     if (ageKey === 0) {
                //         continue
                //     }
                //     if (ageKey >= 7) {
                //         continue
                //     }
                //     sData.push({
                //         name: this.ageMap[datum.qzAge],
                //         percent: parseInt(this.utils.tofixed(datum.qzAgePercentage*100))
                //     })
                // }
                let theObj = {
                    name: '24岁以下',
                    percent: 0
                }
                let dgit = 1
                sData.push(theObj)
                for (const dataKey in res.data) {
                    // debugger
                    if (dataKey == '1' || dataKey == '2') {
                        // theObj.percent += this.utils.toPercent(res.data[dataKey],dgit)
                        theObj.percent += res.data[dataKey]
                        continue
                    }
                    sData.push({
                        name: this.ageMap[dataKey],
                        // percent: parseInt(this.utils.tofixed(res.data[dataKey]*100,1))
                        percent: this.utils.toPercent(res.data[dataKey],dgit)
                    })
                }
                theObj.percent = this.utils.toPercent(theObj.percent,dgit)
                this.ageData = sData
                // debugger
            })
        },
        // 性别数据
        getGenderData () {
            const url = '/qz/qzVisitersGender'
            const data = {
                // date: '2019-12-10'
                date: this.checkDate
            }
            postData(url, data).then((res) => {
                let dataObj = {
                    man: 0,
                    woman: 0
                }
                for (const datum of res.data) {
                    if (datum.qzGender === 1) {
                        dataObj.man = this.utils.toPercent(datum.qzGenderPercentage)
                    }
                    if (datum.qzGender === 2) {
                        dataObj.woman = this.utils.toPercent(datum.qzGenderPercentage)
                    }
                    this.genderData = this.utils.calGender2(dataObj)

                }
                // debugger
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .thebox {
        display: flex;
    }
    .box-l {
        width: 242px;
        padding-top: 12px;
        padding-left: 13px;
        padding-bottom: 38px;
    }
    .box-r {
        /*width: 669px;*/
        width: 616px;
        /*padding-top: 19px;*/
        padding-bottom: 36px;

    }
    .box-r-inner {
        /*border-left: 1px solid rgba(21,141,211,1);*/
        width: 100%;
        height: 100%;
        display: flex;
        .c-div:nth-child(1) {
            margin-left: 32px;
        }
    }
    .c-div {
        height: 126px;
        width: 84px;
        /*width: 104px;*/
        /*flex: 1;*/
        /*margin-left: 5px;*/
        margin-left: 38px;
    }
    .the-line {
        width: 1px;
        height: 126px;
        background-color: #158DD3;
        position: absolute;
        left: 242px;
        top: 19px;
    }
</style>
