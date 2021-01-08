<template>
    <div class="full-div">
        <header>
            <div class="header-item">
                <div :class="['cp','data-box-box4-header', {'active': id===1}]"
                     @click="clickPP(1)">省外</div>
            </div>
            <div class="header-item">
                <div :class="['cp','data-box-box4-header', {'active': id===3}]" v-if="postionType==='机场'"
                     @click="clickPP(3)">国外</div>
                <div :class="['cp','data-box-box4-header', {'active': id===2}]" v-else
                     @click="clickPP(2)">省内</div>
            </div>
        </header>
        <div class="body">
            <div class="c-name">{{type===1?`来源Top${showData.length}`:`去向Top${showData.length}`}}</div>
            <box6Chart
                :type="type===1?'来源':'去向'"
                :theData="showData"
                :id="id"
                v-if="showData.length"></box6Chart>
            <!--<box6Chart :type="'去向'" :theData="leaveData" v-if="leaveData.length"></box6Chart>-->
            <!--<div ref="chart1" class="full-div"></div>-->
            <ul class="btm-tab">
               <li :class="[{'active': type===1}, 'cp']" @click="clickType(1)"></li>
               <li :class="[{'active': type===2}, 'cp']" @click="clickType(2)"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import { postData,getData }from '@/utils/core/http'
import echarts from 'echarts'
import box6Chart from './box6Chart'
export default {
    name: '',

    mixins: [mapMixin,myMixin],

    components: {
        box6Chart
    },

    props: {},

    data () {
        return {
            id: 1, // 1省内/境外 2省外
            activeIdx: 1, //
            type: 1, // 1来源 2去向
            leaveData: [], // 去向数据
            originData: [], // 来源数据
            showData: [],
            countType: '',
        }
    },

    computed: {},

    watch: {
        id (n, o) {
            // debugger
            this.init()
        },
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
        // 点击来源 去向
        clickType (type) {
            this.type = type
            if (this.type === 1) {
                this.showData = this.originData
            }
            if (this.type === 2) {
                this.showData = this.leaveData
            }
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
                if (this.type === 1) {
                    this.showData = this.originData
                }
                if (this.type === 2) {
                    this.showData = this.leaveData
                }
            })
        },
    }
}
</script>

<style lang='scss' scoped>
header {
    display: flex;
}
    .header-item {
        flex: 1;
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
    .body {
        height: 158px;
        width: 100%;
        position: relative;
    }
    .btm-tab {
        width: 100%;
        position: absolute;
        bottom: 15px;
        left: 0;
        display: flex;
        justify-content: center;
        li {
            width: 68px;
            height: 8px;
            background-color: #9ba3a7;
        }
        li:nth-child(1) {
            margin-right: 10px;
        }
        li.active {
            background-color: #15b8fb;
        }
    }
    .c-name {
        position: absolute;
        top: 0;
        /*left: 0;*/
    }
    .c-name {
        font-size: .08333rem;
        font-weight: 400;
        color: #fff;
        position: absolute;
        right: 20px;
        top: .03646rem;
    }
</style>
