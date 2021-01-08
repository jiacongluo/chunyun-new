<template>
    <!--男女图-->
    <div class="full-div c-div2">
        <div class="icon-box">
            <div class="icon man"></div>
            <div class="icon-data">{{man}}<i>%</i></div>
        </div>
        <div class="progress-div">
            <Progress :percentage="100 - man" :show-text="false"></Progress>
        </div>
        <div class="icon-box">
            <div class="icon woman"></div>
            <div class="icon-data icon-data2">{{100 - man}}<i>%</i></div>
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
        man: {
            type: [Number,String],
            default: 0
        }
    },

    data () {
        return {}
    },

    computed: {},

    watch: {
        man () {

        }
    },

    created () {},

    mounted () {},

    destroyed () {},

    methods: {}
}
</script>

<style lang='scss' scoped>
    .icon-box {
        width: 54px;
        height: 131px;
    }
    .icon {
        width: 100%;
        height: 104px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .man {
        background-image: url("../assets/男人@2x.png");
    }
    .woman {
        background-image: url("../assets/女人_icon@2x.png");
    }
    .c-div2 {
        display: flex;
        align-items: center;
    }
    .progress-div {
        width: 81px;
        height: 7px;
        padding-top: 20px;
        transform: rotate(180deg);
    }
    .icon-data {
        font-size:28px;
        /*font-family:Microsoft YaHei;*/
        font-weight:bold;
        color:rgba(0,255,255,1);
        /*line-height:60px;*/
        text-align: center;
        padding-left: 8px;
        i {
            font-size: 16px;
        }
    }
    .icon-data2 {
        color: #FF29D9;
    }
</style>
