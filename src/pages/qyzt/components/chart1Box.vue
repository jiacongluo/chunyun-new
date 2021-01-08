<template>
    <div class="data-box1-chart">
        <chart1 v-for="(item, index) in list" :key="index"
                :percentage="item.percentage"
                :customColor="item.customColor"
                :textcls="item.textcls"
                :name="item.name"
        ></chart1>
    </div>
</template>

<script>
import chart1 from './chart1'
import mixin from '@/utils/myMixin'
import { postData }from '@/utils/core/http'
export default {
    name: '',

    mixins: [mixin],

    components: {
        chart1
    },

    props: {},

    data () {
        return {
            percentage1: 0,
            percentage2: 0,
            percentage3: 0,
            list: [
                {
                    name: '口岸驻留',
                    customColor: '#00FFFF',
                    textcls: 'text1',
                    percentage: 0,
                    flowType: '口岸观光'
                },
                {
                    name: '往香港',
                    customColor: '#CCFF00',
                    textcls: 'text2',
                    percentage: 0,
                    flowType: '上桥去香港'
                },
                {
                    name: '往珠澳',
                    customColor: '#66FF00',
                    textcls: 'text3',
                    percentage: 0,
                    flowType: '下桥去珠海澳门'
                },
            ]
        }
    },

    computed: {},

    watch: {

    },

    created () {},

    mounted () {
        this.init()
    },

    destroyed () {},

    methods: {
        getData () {
            const url = '/bridge/bridgeFlowStay'
            const data = {
                date: this.checkDate
            }
            postData(url, data).then((res) => {
                // console.log(res)
                for (const datum of res.data) {
                    for (const listElement of this.list) {
                        if (listElement.flowType === datum.flowType) {
                            listElement.percentage = parseFloat(this.utils.tofixed(datum.percent * 100, 2))
                        }
                    }
                }
            })
        },
        // 刷新
        init () {
            this.getData()
        }
    }
}
</script>

<style lang='scss' scoped>
.data-box1-chart {
    display: flex;
    justify-content: space-between;
}
</style>
