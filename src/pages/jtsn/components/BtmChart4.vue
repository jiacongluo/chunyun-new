<template>
    <!--协调联动-->
    <div class="full-div c4-box xtld">
        <div class="contain" v-if="xtldData.length">
            <xtldItem :theData="item" v-for="item in xtldData"></xtldItem>
        </div>
        <div class="contain-l">
            <div class="contain-l-btn contain-l-btn2 bgi cp">
                <a href="SmartOneClient://">
                    <span>
                        紧急通话
                    </span>
                </a>

            </div>
            <div class="contain-l-btn contain-l-btn1 bgi cp" @click="clickYIjian">
                <span>
                一键派单
                </span>
            </div>
        </div>

        <!--<popPaidan-->
            <!--:showDialog.sync="showDialog"-->
            <!--v-if="showDialog"-->
            <!--:href="paibanHref"-->
        <!--&gt;</popPaidan>-->

    </div>
</template>

<script>
import xtldItem from './xtldItem'
import { postData, getData }from '@/utils/core/http'
import myMixin from '@/utils/myMixin'
import mapMixin from '@/utils/mapMixin'
import moment from 'moment'
import popPaidan from '@/components/popPaidan'
import * as underscore from 'underscore'
export default {
    name: '',

    mixins: [myMixin,mapMixin],

    components: {
        xtldItem,
        popPaidan
    },

    props: {},

    data () {
        return {
            xtldData: [],
            // showDialog: false,
            paibanHref: ''
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
        // 点击一键派单
        clickYIjian () {
            var theName = this.postionName
            var reOrgId = ''
            var userId = ''
            for (const terminalInfoListElement of window.terminalInfoList) {
                if (theName === terminalInfoListElement['postion_name']) {
                    reOrgId = terminalInfoListElement['orgid'] // 匹配到id
                    userId = terminalInfoListElement['userid']
                }
            }
            this.paibanHref = `https://www.bingolink.biz/pacx/adapter.html?type=3&reOrgId=${reOrgId}&userId=${userId}`
            // debugger
            // this.showDialog = true
            this.$store.dispatch('showDialog', true)
            this.$store.dispatch('showDialogHref', this.paibanHref)
        },
        init () {
            this.fetchData()
        },
        fetchData () {
            const url = '/api/xtld/holidaySchedulingList'
            const data = {
                startDate: this.dateRange[0],
                endDate : this.dateRange[1],
                // postionID: this.postionID,
                positionName: this.postionName,
                channel: '交通枢纽'
            }
            getData(url, data).then((res) => {
                // this.xtldData = res.data
                let arr = []
                for (const dataKey in res.data) {
                    let tempArr = res.data[dataKey]
                    arr.push(tempArr)
                }
                arr = underscore.sortBy(arr, (item) => { // 按照日期排序
                    return item[0]['schedulingDate']
                })
                this.xtldData = arr
                // debugger
            })
        },
    }
}
</script>

<style lang='scss' scoped>
.c4-box {

    display: flex;
}
    .contain {
        /*margin-right: 3px;*/
        display: flex;
        /*width: 839px;*/
        min-width: 782px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-top: 8px;
        padding-left: 8px;
    }
    .contain-l {
        /*width: 88px;*/
        width: 145px;
        height: 100%;
        @include defaultFlex;
        border-left: 1px solid #00C0FF;
    }
    .contain-l-btn1 {
        background-image: url('../assets/一键派单底框@2x.png');

    }
    .contain-l-btn2 {
        background-image: url('../assets/紧急通话底框@2x.png');
        color: #FCFF00!important;
    }
    .contain-l-btn {
        width: 52px;
        height: 166px;
        font-size:18px;
        /*font-family:PingFang SC;*/
        font-weight:500;
        color:rgba(33,211,255,1);
        /*line-height:60px;*/
        @include defaultFlex;

        span {
            width: 18px;
            word-break: break-all;
        }
        a {
            width: 18px;
            word-break: break-all;
            color: #FCFF00!important;

        }
    }
</style>
