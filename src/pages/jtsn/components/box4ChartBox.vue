<template>
    <div class="full-div df">
        <div class="data-box-box4" v-if="">
            <div :class="['cp','data-box-box4-header', {'active': id===1}]"
                 @click="clickPP(1)">省外</div>
            <div class="c-div">
                <!--<div class="full-div br">-->
                <div class="full-div">
                    <box4Chart :type="'来源'" :theData="originData" v-if="originData.length"></box4Chart>
                    <div class="c-name">来源TOP 5</div>
                </div>
            </div>
        </div>
        <div class="data-box-box4">
            <div :class="['cp','data-box-box4-header', {'active': id===3}]" v-if="postionType==='机场'"
                @click="clickPP(3)">国外</div>
            <div :class="['cp','data-box-box4-header', {'active': id===2}]" v-else
                @click="clickPP(2)">省内</div>
            <div class="c-div">
                <div class="full-div br">

                    <box4Chart :type="'去向'" :theData="leaveData" v-if="leaveData.length"></box4Chart>
                    <div class="c-name">去向TOP 5</div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import box4Chart from './box4Chart'
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import { postData,getData }from '@/utils/core/http'

export default {
    name: '',

    mixins: [mapMixin,myMixin],

    components: {
        box4Chart
    },

    props: {},

    data () {
        return {
            id: 1, // 1省内/境外 2省外
            activeIdx: 1, //
            leaveData: [],
            originData: [],
            countType: '',
        }
    },

    computed: {
        // countType () {
        //     return this.id===1?'省内':'省外'
        // }
    },

    watch: {
        id (n, o) {
            // debugger
            this.init()
        }
    },

    created () {},

    mounted () {
        this.init()
    },

    destroyed () {},

    methods: {
        clickPP (id) {
            this.id = id
            this.activeIdx = id
        },
        init () {
            this.fetchData()
        },
        fetchData () {
            let leaveDataKey = ''
            let originDataKey = ''

            if (this.id === 1) {
                leaveDataKey = 'listOutProvinceLeave'
                originDataKey = 'listOutProvinceOrigin'
                this.countType = '省外'
            }
            if (this.id === 2) {
                leaveDataKey = 'listInProvinceLeave'
                originDataKey = 'listInProvinceOrigin'
                this.countType = '省内'
            }
            if (this.id === 3) {
                leaveDataKey = 'listForgeinLeave'
                originDataKey = 'listForgeinOrigin'
                this.countType = '境外'
            }
            const url = '/api/terminal/getTerminalOriginAndLeave_TOP5'
            const data = {
                countDate: this.checkDate,
                postionID: this.postionID,
                postionName: this.postionName,
                countType : this.countType,
            }
            getData(url, data).then((res) => {
                this.leaveData = res.data[leaveDataKey] || []
                this.originData = res.data[originDataKey] || []
                // debugger
            })
        },

    }
}
</script>

<style lang='scss' scoped>
    .data-box-box4 {
        flex: 1;
        height: 200px;
        /*background-color: #fff;*/
    }
    .data-box-box4-header {
        width: 100%;
        height: 35px;
        font-size:18px;
        /*font-family:Adobe Heiti Std;*/
        font-weight:normal;
        color:rgba(255,255,255,1);
        line-height:35px;
        text-align: center;
        border-bottom: 1px solid rgba(55,154,255,1);
    }
    .data-box-box4-header.active {
        background:rgba(7,130,255,1);
    }
    .c-div {
        padding: 4px 0 5px 0;
        width: 100%;
        height: 158px;
    }
    .br {
        border-right: 1px solid #379AFF;
    }
    .c-name {
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        position: absolute;
        left: 15px;
        top: 7px;
    }
</style>
