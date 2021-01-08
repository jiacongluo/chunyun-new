<template>
    <div class="full-div the-box">
        <div class="left-box">
            <span>{{theType}}</span>
            <span class="per">{{utils.tofixed(100 - shengWai,1)}}</span>
            <span>%</span>
        </div>
        <div class="mid-box">
            <Progress
                :stroke-width="12"
                :percentage="shengWai"
                :color="customColor"
                :show-text="false"
            ></Progress>
        </div>
        <div class="right-box">
            <span>省外</span>
            <span class="per">{{shengWai}}</span>
            <span>%</span>
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
        postionType: {
            type: String,
            default: ''
        },
        shengWai: {
            type: Number,
            default: 50
        },
        customColor: {
            type: String,
            default: '#E3E30F'
        },
        name: {
            type: String,
            default: '口岸驻留'
        },
        id: {
            type: Number,
            default: 1

        }
    },

    data () {
        return {

        }
    },

    computed: {
        theType () {
            if (this.postionType === '机场') {
                return '国外'
            } else {
                return '省内'
            }
        }
    },

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {}
}
</script>

<style lang='scss' scoped>
    .the-box {
        display: flex;
        /*text-align: center;*/
    }
    .left-box {
        font-size:16px;
        /*font-family:MicrosoftYaHei;*/
        /*font-weight:bold;*/
        color:rgba(31,174,233,1);
        /*line-height:60px;*/
        width: 82px;
        line-height: 42px;
        margin-right: 24px;
        white-space: nowrap;
    }
    .right-box {
        font-size:16px;
        color: #FFFF00;
        width: 82px;
        line-height: 42px;
        /*padding-left: 12px;*/
        white-space: nowrap;

    }
    .per {
        font-weight: bold;
        font-size: 24px;
        margin-left: 3px;
    }
    .mid-box {
        width: 209px;
        height: 13px;
        /*margin-top: 26px;*/
        transform: rotate(180deg);
        position: relative;
        top: 18px;
        margin-right: 12px;
    }
</style>
