<template>
    <!--航班表-->
    <div class="full-div box">
        <div class="full-div box-inner">
            <div class="box-item">
                <BtmChart2Item :id="3"></BtmChart2Item>
            </div>
            <div class="box-item">
                <BtmChart2Item :id="4"></BtmChart2Item>
            </div>
        </div>
    </div>
</template>

<script>
import BtmChart2Item from './BtmChart2Item'
export default {
    name: '',

    mixins: [],

    components: {
        BtmChart2Item
    },

    props: {},

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
    .box {
        padding-top: 16px;
        padding-left: 14px;
        padding-right: 15px;
    }
    .box-item {
        width: 50%;
        height: 100%;
    }
    .box-inner {
        display: flex;
    }
</style>
