<template>
    <div class="bgi shuniu-l-btm-box">
        <BtmChart1 :id="1" v-if="tabName==='列车趋势'"></BtmChart1>
        <BtmChart2 v-if="tabName==='列车表'"></BtmChart2>
        <BtmChart3 v-if="tabName==='实时监控'"></BtmChart3>
        <BtmChart4 v-if="tabName==='协调联动'"></BtmChart4>
        <BtmChart5 :id="1" v-if="tabName==='航班趋势'"></BtmChart5>
        <BtmChart6 v-if="tabName==='航班表'"></BtmChart6>

    </div>
</template>

<script>
import BtmChart1 from './BtmChart1'
import BtmChart2 from './BtmChart2'
import BtmChart3 from './BtmChart3'
import BtmChart4 from './BtmChart4'
import BtmChart5 from './BtmChart5'
import BtmChart6 from './BtmChart6'
import mapMixin from '@/utils/mapMixin'
export default {
    name: '',

    mixins: [mapMixin],

    components: {
        BtmChart1,
        BtmChart2,
        BtmChart4,
        BtmChart3,
        BtmChart5,
        BtmChart6
    },

    props: {

    },

    data () {
        return {}
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {}
}
</script>

<style lang='scss' scoped>

</style>
