<template>
    <ul class="sw-btn cp">
        <li :class="{'active': isSatellite}" @click="clickLi(true)">卫星</li>
        <li :class="{'active': !isSatellite}" @click="clickLi(false)">地图</li>
    </ul>
</template>

<script>
import mapMixin from '@/utils/mapMixin'

export default {
    name: '',

    mixins: [],

    components: {},

    props: {
        isSatellite: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {}
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {
        clickSWBtn () {
            this.$emit('changeSatellite')
        },
        clickLi (bl) {
            this.$emit('update:isSatellite', bl)
        }
    }
}
</script>

<style lang='scss' scoped>
    .sw-btn {
        width: 130px;
        height: 40px;

        font-size:16px;
        color: #ECECEC;
        background-color: #0066CC;
        /*border: 1px solid #00C0FF;*/
        //
        display: flex;
    }
    li {
        flex: 1;
        line-height: 40px;
        text-align: center;
    }
    li.active {
        background-color: #0782FF;
        font-weight: bold;
        color: #ECECEC;
    }
</style>
