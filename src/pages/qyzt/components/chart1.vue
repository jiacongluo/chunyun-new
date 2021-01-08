<template>
    <!--进度条图形-->
    <div class="qyzt-progress">
        <div class="name">{{name}}</div>
        <div class="pgr">
            <Progress
                :stroke-width="24"
                :percentage="percentage"
                :color="customColor"
                :show-text="false"
            ></Progress>
        </div>

        <div :class="['the-text', textcls]">
            {{percentage}}%
        </div>
    </div>
</template>

<script>
import {Progress} from 'element-ui'
export default {
    name: '',

    mixins: [],

    components: {Progress},

    props: {
        customColor: {
            type: String,
            default: '#00FFFF'
        },
        name: {
            type: String,
            default: '口岸驻留'
        },
        percentage: {
            type: Number,
            default: 0
        },
        textcls: {
            type: String,
            default: 'text1'
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

    methods: {}
}
</script>

<style lang='scss' scoped>
    .qyzt-progress {
        margin-top: 20px;
        height: 24px;
        width: 250px;
        /*background-color: #fff;*/
        display: flex;
        align-items: center;
    }
    .the-text {
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:bold;
        color:rgba(102,255,0,1);
        /*line-height:60px;*/
        margin-left: 10px;
    }
    .text1 {
        color:rgba(51,255,255,1);
    }
    .text2 {
        color:#FFFF00;
    }
    .text3 {
        color:#66FF00;
    }
    .name {
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        margin-right: 10px;
        white-space: nowrap;
    }
    .pgr {
        width: 115px;
    }
</style>
