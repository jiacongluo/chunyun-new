<template>
    <!--协调联动的框 排班详情-->
    <div :class="['full-div', 'boxitem', 'bgi', single?'box1':'box2']">
        <div class="inner">
            <header>
                {{theData[0].schedulingDate}}
            </header>
            <div class="body">
                <div class="body-line mb24">
                    <i class="icon icon1 bgi"></i>
                    <div class="ban">
                        <span>白班</span>
                        <span>{{theData[0]['name']}}</span>
                    </div>
                </div>
                <div class="body-line">
                    <i class="icon icon2 bgi"></i>
                    <div class="ban">
                        <span>夜班</span>
                        <span>{{theData[1]['name']}}</span>
                    </div>
                </div>
            </div>
            <footer>
                <div class="btn cp" @click="clickDetail">排班详情</div>
                <!--<div class="btn">值班台账</div>-->
            </footer>
        </div>

        <popPaiban
            :showDialog.sync="showDialog"
            v-if="showDialog"
            :theData="theData"
        ></popPaiban>
    </div>
</template>

<script>
import popPaiban from '@/components/popPaiban'
export default {
    name: '',

    mixins: [],

    components: {
        popPaiban
    },

    props: {
        single: {
            type: Boolean,
            default: true
        },
        theData: {
            type: Array,
            default: () => []
        }
    },

    data () {
        return {
            showDialog: false
        }
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {
        // 点击详情
        clickDetail () {
            this.showDialog = true
        }
    }
}
</script>

<style lang='scss' scoped>
.box1 {
    background-image: url('../assets/数据bg蓝.png');
}
.box2 {
    background-image: url('../assets/数据bg绿色.png');
}
    .boxitem {
        min-width: 253px;
        max-width: 254px;
        height: 239px;
        /*padding-top: 7px;*/
        /*padding-left: 7px;*/
        margin-right: 5px;
    }
    .inner {
        width: 100%;
        height: 100%;
        /*background-color: #fff;*/
    }
    header {
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        padding-top: 16px;
        /*padding-left: 48px;*/
        text-align: center;
    }
    .body {
        padding-top: 31px;
        padding-left: 27px;
    }
    .mb24 {
        margin-bottom: 24px;
    }
    .body-line {
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        display: flex;
        align-items: center;
        .icon {
            width: 34px;
            height: 34px;
        }
        .icon1 {
            background-image: url('../assets/白天-晴@2x.png');
        }
        .icon2 {
            background-image: url('../assets/月亮@2x.png');
        }
    }
    .ban {
        margin-left: 21px;
        width: 107px;
        display: flex;
        justify-content: space-between;
    }
    .btn {
        width:109px;
        height:40px;
        background:rgba(13,82,125,0.2);
        border:1px solid #00FFCD;
        border-radius:20px;
        line-height: 40px;
        text-align: center;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
    }
    .btn.active {
        font-weight:bold;
        color:rgba(255,204,0,1);
        border-color: #FFCC00;
    }
    footer {
        margin-top: 24px;
        /*padding-left: 14px;*/
        display: flex;
        justify-content: center;
        .btn:nth-child(1) {
            margin-right: 8px;
        }
    }
</style>
