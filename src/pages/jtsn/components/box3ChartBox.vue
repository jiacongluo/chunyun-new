<template>
    <!--省内省外 来源去向-->
    <div class="full-div df">
        <div v-for="(item,index) in dataBoxBox3" :key="index">
            <div class="data-box-title-box">
                <div class="data-box-title linear-border">
                    <i class="icon icon2"></i>
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="data-box-box3-inner">
                <div class="full-div">
                    <originChart :postionType="postionType" :id="item.id" :shengWai="item.num"></originChart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import originChart from './originChart'
import { postData,getData }from '@/utils/core/http'
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'

export default {
    name: '',

    mixins: [mapMixin,myMixin],

    components: {
        originChart
    },

    props: {},

    data () {
        return {
            dataBoxBox3: [
                {
                    name: '来源洞察',
                    num: 50,
                    id: 1,
                    key: 'originMap'

                },
                {
                    name: '去向洞察',
                    num: 50,
                    id: 2,
                    key: 'leaveMap'

                },
            ]
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
            const url = '/api/terminal/getTerminalOriginAndLeave'
            const data = {
                countDate: this.checkDate,
                postionID: this.postionID,
                postionName: this.postionName,

            }
            getData(url, data).then((res) => {
                for (const dataBoxBox3Element of this.dataBoxBox3) {
                    for (const dataKey in res.data) {
                        if (dataKey === dataBoxBox3Element.key) {
                            // debugger
                            try {
                                let thetgt = res.data[dataKey]['outProvinceOrigin'] || res.data[dataKey]['outProvinceLeave']
                                dataBoxBox3Element.num = this.utils.toPercent(thetgt['travelerZb'],1)
                                // dataBoxBox3Element.num = this.utils.tofixed(thetgt['travelerZb'] * 100,1)
                            } catch (e) {
                                console.log(e)
                            }
                        }
                    }
                }
                // debugger
            })
        },
    }
}
</script>

<style lang='scss' scoped>
    .data-box-title-box {
        padding-left: 20px;
        width: 100%;
        .icon {
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .icon1 {
            width: 24px;
            height: 19px;
            margin-right: 11px;
            background-image: url('../assets/旅客画像_icon@2x.png');
        }
        .icon2 {
            width: 26px;
            height: 18px;
            margin-right: 8px;
            background-image: url('../assets/洞察@2x.png');
        }
        .icon3 {
            width: 22px;
            height: 17px;
            margin-right: 8px;
            background-image: url('../assets/洞察@2x.png');
        }
    }
    .data-box-title {
        width: 100%;
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(0,255,255,1);
        /*line-height:60px;*/
        border-bottom: 2px solid;
        display: flex;
        /*height: 48px;*/
        align-items: center;
        padding-bottom: 9px;
    }
    .data-box-box3-inner {
        /*height: 45px;*/
        width: 100%;
        /*background-color: #fff;*/
        padding-left: 20px;
    }
</style>
