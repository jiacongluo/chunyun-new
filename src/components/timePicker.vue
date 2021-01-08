<template>
    <!--时段选择-->
    <div class="full-div timePick">
        <div class="full-div inner">
            <div>{{showVal}}</div>
            <div class="icon bgi"></div>
        </div>
        <div class="t-container">
            <Dropdown trigger="click" @command="onComm">
              <span class="el-dropdown-link">
                下拉菜单下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <DropdownMenu class="menudiv" slot="dropdown">
                    <DropdownItem class="divitem" v-for="(item) in timeArr" :command="item">
                        {{item}}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import moment from 'moment'
export default {
    name: '',

    mixins: [],

    components: {
        Dropdown,
        DropdownItem,
        DropdownMenu,
    },

    props: {},

    data () {
        return {
            showVal: '',
            timeArr: []
        }
    },

    computed: {},

    watch: {
        showVal (n, o) {
            this.$emit('changeTime', n)
        }
    },

    created () {
    },

    mounted () {
        this.geneTimeArr()
    },

    destroyed () {
    },

    methods: {
        onComm (command) {
            this.showVal = command
        },
        // 产生时段
        geneTimeArr () {
            let arr = []
            for (let i = 0; i < 24; i++) {
                let item = this.geneTime(i)
                let item2 = this.geneTime(i+1)
                arr.push(item + '-' + item2)
            }
            this.timeArr = arr

            var nowHour = moment().format('HH');
            var afterHourNum = parseInt(nowHour) + 1;
            afterHourNum = afterHourNum < 10 ? '0' + afterHourNum : afterHourNum;

            var theDefaultTimeItem = nowHour + ':00-' + afterHourNum + ':00';
            this.showVal = theDefaultTimeItem // 默认时间
        },
        geneTime (num) {
            let tempStr = ':00'
            let str1 = this.utils.add0(num)
            return str1 + tempStr
        }
    }
}
</script>

<style lang='scss' scoped>
    .timePick {
        background: rgba(72, 137, 255, 0.2);
        border: 1px solid rgba(72, 184, 255, 1);
        padding: 0px 8px;
        font-size: 16px;
        /*font-family:PingFangSC;*/
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        /*line-height:60px;*/
        overflow: hidden;
    }

    .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:16px;
        /*font-family:PingFangSC;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
    }

    .t-container {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
    }

    .icon {
        width: 16px;
        height: 16px;
        background-image: url('../assets/日期icon@2x.png');
    }
    .divitem {
        font-size: 16px;
        color: #d9f1ff;
        background-color: #1e73d7;
        /*width: 50px;*/
        line-height: 25px;
    }
    .menudiv {
        background-color: #1e73d7;

    }
</style>
