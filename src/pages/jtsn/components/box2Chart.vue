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
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import { postData,getData }from '@/utils/core/http'
export default {
    name: '',

    mixins: [mapMixin, myMixin],

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
            },
            rawData: {} // 原数据
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
            this.fetchData()
        },
        fetchData () {
            const url = '/api/terminal/getTerminalSexAge'
            const data = {
                // date: '2019-12-10'
                countDate: this.checkDate,
                postionID: this.postionID,
                postionName: this.postionName,

            }
            getData(url, data).then((res) => {
                let sData = []
                let theObj = {
                    name: '24岁以下',
                    percent: 0
                }
                let dgit = 1
                sData.push(theObj)
                for (const obj of res.data.terminal_age) {
                    if (obj.ageGroup === 0) {
                        continue
                    }
                    if (obj.ageGroup == 1 || obj.ageGroup == 2) {
                        // theObj.percent += this.utils.toPercent(obj['ageZb'],dgit)
                        theObj.percent += obj['ageZb']
                        continue
                    }
                    // debugger
                    sData.push({
                        name: this.ageMap[obj.ageGroup],
                        percent: this.utils.toPercent(obj['ageZb'],dgit)
                    })
                }
                theObj.percent = this.utils.toPercent(theObj.percent,dgit)
                this.ageData = sData
                // debugger
                let dataObj = {
                    man: 0,
                    woman: 0
                }
                for (const obj of res.data.terminal_sex) {
                    if (obj.sex === 1) {
                        dataObj.man = this.utils.toPercent(obj['manZb'])
                        this.rawData.man = this.utils.toPercent(obj['manZb'])
                    }
                    if (obj.sex === 2) {
                        dataObj.woman = this.utils.toPercent(obj['manZb'])
                        this.rawData.woman = this.utils.toPercent(obj['manZb'])
                    }
                    this.genderData = this.utils.calGender2(dataObj)
                }
                // debugger
            })
        },

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
        width: 669px;
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
    /*.c-div {*/
        /*height: 126px;*/
        /*!*width: 84px;*!*/
        /*width: 104px;*/
        /*margin-left: 5px;*/
    /*}*/
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
