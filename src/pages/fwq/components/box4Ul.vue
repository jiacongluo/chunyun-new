<template>
    <ul class="full-div box4-ul2">
        <li class="box4" v-for="(item,index) in OVbox4Ul" :key="index"
        @click="clickLi(index)">
            <div class="box4-inner">
                <!--<div class="on-box cp" v-if="index===active"></div>-->
                <!--<div class="off-box cp" v-else></div>-->
                <div class="box4-name cp">{{item.name}}</div>
                <div class="num-box" :style="{'color': item.color}">
                    <i>{{item.num}}</i>个
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { postData, post2, getData } from '@/utils/core/http'

export default {
    name: '',

    mixins: [],

    components: {},

    props: {},

    data () {
        return {
            active: 0,
            OVbox4Ul: [
                {
                    name: '拥挤',
                    num: 0,
                    on: true,
                    color: '#FF3600',
                    key: 'warningList_high'
                },
                {
                    name: '适中',
                    num: 0,
                    on: false,
                    color: '#2EDFFF',
                    key: 'warningList_medium'


                },
                {
                    name: '舒适',
                    num: 0,
                    on: false,
                    color: '#71FF39',
                    key: 'warningList_low'


                },
            ],
        }
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {
        this.fetchData()
    },

    destroyed () {},

    methods: {
        fetchData () {
            const url = '/api/terminal/getTerminalWarningList'
            const data = {}
            getData(url, data).then((res) => {
                for (let key in res.data) {
                    for (const oVbox4UlElement of this.OVbox4Ul) {
                        if (key === oVbox4UlElement.key) {
                            oVbox4UlElement.num = res.data[key].length
                        }
                    }
                }
            })
        },
        clickLi (idx) {
           this.active = idx
        }
    }
}
</script>

<style lang='scss' scoped>
    .box4-ul2 {
        /*left: 523px;*/
        /*position: absolute;*/
        /*top: 18px;*/
        /*z-index: 10;*/
        display: flex;
    }
    .off-box {
        min-width:20px;
        height:20px;
        border:1px solid rgba(255,255,255,1);
        margin-right: 7px;
    }
    .on-box {
        min-width:20px;
        height:20px;
        background: url("../assets/功能选中@2x.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 7px;

    }
    .box4-name {
        font-size:18px;
        /*font-family:PingFangSC;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
    }
    .num-box {
        font-size: 16px;
        color: #ffffff;
        margin-left: 19px;
        /*font-family:Microsoft YaHei;*/
        /*line-height:60px;*/
        white-space: nowrap;
        i {
            font-weight:bold;
            font-size:36px;
        }
    }

    .box4 {
        width:172px;
        height:75px;
        /*background:rgba(4,22,69,0.8);*/
        /*border:1px solid rgba(100,178,255,1);*/
        background: url("../assets/拥挤底框@2x.png") no-repeat;
        background-size: 100% 100%;
        //@include defaultFlex;
        padding: 22px 0px 23px 21px;
    }
    .box4-inner {
        display: flex;
        /*justify-content: space-between;*/
        align-items: center;
    }
    .box4-ul-box {
        left: 523px;
        position: absolute;
        top: 10px;
        z-index: 10;
        display: flex;
    }
</style>
