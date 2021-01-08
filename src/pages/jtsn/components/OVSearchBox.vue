<template>
    <div class="search-box">
        <div class="search-box-left cp" @click="clickTab">
            <div class="xiala cp">所有站场</div>
            <div class="search-box-left-icon"></div>
        </div>
        <div class="search-box-mid" @click="clickInput">
            <input type="text" v-model="searchVal" placeholder="请输入要搜索地址">
            <ul class="search-list-ul" v-show="showSuggestion">
                <li class="search-list-li cp" v-for="(item,index) in suggestionList" :key="index"
                    @click="clickName(item.postion_name)">
                    <span>{{item.postion_name}}</span>
                    <div class="auv-icon bgi" v-show="false"></div>
                </li>
            </ul>
        </div>
        <div class="search-box-right">
            <div class="search-box-right-icon cp" @click="clickSearch"></div>
        </div>

        <div class="type-list" v-show="showTabList">
            <div class="type-list-tab linear-border">
                <div :class="['type-list-tab-item', 'cp', {'on': item.value===showType}]"
                     @click="clickType(item.value)"
                     v-for="(item,index) in typeList" :key="index">{{item.name}}</div>
            </div>
            <ul class="type-list-ul">
                <li class="contentItem cp" v-for="(item,index) in dragList" :key="index"
                    @click="clickName(item.postion_name)"
                    v-if="item.postion_type===showType">
                    <div>{{item.postion_name}}</div>
                    <div class="contentItem-icon bgi" v-if="item.hasVideo"></div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import mapMixin from '@/utils/mapMixin'
import Marker2 from '@/components/marker.vue'

export default {
    name: '',

    mixins: [mapMixin],

    components: {
        Marker2
    },

    props: {
        terminalInfoList: {
            type: Array,
            default: []
        }
    },

    data () {
        return {
            searchVal: '',
            showTabList: false,
            showSuggestion: false,
            typeList: [
                {
                    name: '机场',
                    value: '机场'
                },
                {
                    name: '铁路',
                    value: '铁路'
                },
                {
                    name: '客运站',
                    value: '客运站'
                },
            ],
            showType: '机场', // 当前的type
            suggestionList: [], // 搜索建议
            dragList: [] // 下拉list
        }
    },

    computed: {},

    watch: {
        // 监听输入
        searchVal (n, o) {
            if (!n || !n.length) {
                this.showSuggestion = false
                return
            }
            this.suggestionList = []
            let newList = []
            for (const stationListElement of this.dragList) {
                if (stationListElement.postion_name.indexOf(n) >=0) {
                    newList.push(stationListElement)
                }
            }
            this.suggestionList = newList
            this.showSuggestion = this.suggestionList.length!==0
        },
        isOverView (n, o) {
            if (n) {
                this.closeInfo()
            }
        },
    },

    created () {},

    mounted () {
        this.dragList = this.terminalInfoList

    },

    destroyed () {},

    methods: {
        // 点击搜索
        clickSearch () {
            if (!this.searchVal) {
                this.showSuggestion= false
                alert('请输入地点')
                return
            }
            for (const stationListElement of this.dragList) {
                if (stationListElement.postion_name==this.searchVal) {
                    this.clickName(this.searchVal)
                    return
                }
            }
            if (!this.suggestionList.length) {
                this.showSuggestion= false
                alert('没找到对应地点')
            }
        },
        hideList () {
            this.showTabList = false
            this.showSuggestion = false
        },
        // 点击名字
        clickName (name) {
            this.moveToPoint(name)
            this.hideList()
        },
        // 点击输入框 隐藏tab
        clickInput () {
            this.showTabList = false
        },
        // 点击 所有站场
        clickTab () {
            this.showTabList = !this.showTabList
            this.showSuggestion = false
        },
        clickType (type) {
            this.showType = type
        },
        moveToPoint (name) {
            let theName = name
            let me =this
            for (let obj of this.dragList) {
                if (theName === obj.postion_name) {

                    me.handleMoveToPoint(me,obj)

                }
            }
        },
    }
}
</script>

<style lang='scss' scoped>
    .xiala {

    }
    .search-box {
        display: flex;
        position: relative;
    }
    .search-box-left,.search-box-mid,.search-box-right {
        height: 49px;
    }
    .search-box-left {
        width:147px;
        background:rgba(19,91,171,1);
        opacity:0.9;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        padding-left: 10px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*line-height:60px;*/
    }
    .search-box-left-icon {
        width: 12px;
        height: 6px;
        background: url("../assets/xiala.png") no-repeat;
        background-size: 100% 100%;
    }
    .search-list-ul {
        position: absolute;
        top: 45px;
        left: 0;
        width: 100%;
        height: 124px;
        overflow-y: scroll;
        .search-list-li {
            width: 100%;
            height: 32px;
            line-height: 32px;
            background-color: rgba(0, 239, 239, 0.6);
            padding-left: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .auv-icon {
            width: 52px;
            height: 20px;
            background: url("../assets/无人机@2x.png") no-repeat;
            margin-right: 13px;
        }
    }
    .search-box-mid {
        width:293px;
        background:rgba(19,91,171,1);
        opacity:0.9;
        margin-left: 5px;
        color: #ffffff;
        position: relative;
        input {
            background-color: rgba(0, 0, 0, 0);
            outline: 0;
            border: 0;
            color: white;
            width: 200px;
            height: 26px;
            margin-top: 12px;
            margin-left: 10px;
            font-size: 16px;
        }
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #ECECEC;
        /*font-size: 16px;*/
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #ECECEC;
        /*font-size: 16px;*/
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #ECECEC;
        /*font-size: 16px;*/
    }
    .search-box-right {
        width: 65px;
        background: url("../assets/sousuobg.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 5px;
        @include defaultFlex;

    }
    .search-box-right-icon {
        width: 20px;
        height: 20px;
        background: url("../assets/sousuo.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 20px;
    }
    .type-list {
        width: 308px;
        height: 153px;
        background-color: rgba(22, 65, 112, 0.9);
        /*margin-top: 3px;*/
        color: rgba(236, 236, 236, 1);
        position: absolute;
        left: 0;
        top: 45px;
        font-size: 16px;
        color: #ffffff;
        .line {
            width: 1px;
            height: 17px;
            background: rgba(255, 255, 255, 0.33);
            margin-top: 5px;
            margin-left: 15px;
            margin-right: 11px;
        }
    }
    .type-list-tab {
        padding-top: 6px;
        padding-bottom: 6px;
        display: flex;
        border-bottom: 1px solid;
        .type-list-tab-item:nth-child(3) {
            border: 0;
        }
    }
    .type-list-tab-item {
        flex: 1;
        text-align: center;
        border-right: 1px solid #ffffff;
    }
    .type-list-tab-item.on {
        color: #00C0FF;
    }
    .type-list-ul {
        height: 124px;
        overflow-y: scroll;
        width: 100%;
        padding-top: 2px;
    }
    .contentItem {
        height: 28px;
        line-height: 28px;
        padding-left: 10px;
        display: flex;
        padding-right: 10px;
        justify-content: space-between;
        align-items: center;
    }

    .contentItem:hover {
        background-color: rgba(19, 89, 155, 0.9);
    }
    .contentItem-icon {
        min-width: 16px;
        height: 20px;
        background-image: url('../assets/球机@2x.png');

    }
</style>
