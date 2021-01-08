<template>
    <div class="search-box">
        <div class="search-box-left cp">
            <div class="xiala cp" @click="clickTab">所有服务区</div>
            <div class="search-box-left-icon"></div>
        </div>
        <div class="search-box-mid">
            <input type="text" v-model="searchVal" placeholder="请输入要搜索地址">
            <ul class="search-list-ul" v-show="showSuggestion">
                <li class="search-list-li cp" v-for="(item,index) in suggestionList" :key="index" @click="selectItem=item.postion_name;showTabList=false;showSuggestion=false;">
                    <span>{{item.postion_name}}</span>
                    <div class="auv-icon bgi" v-show="false"></div>
                </li>
            </ul>
        </div>
        <div class="search-box-right">
            <div class="search-box-right-icon cp" @click="clickSearch"></div>
        </div>

        <div class="type-list" v-show="showTabList">
            <!--<div class="type-list-tab linear-border">-->
                <!--<div :class="['type-list-tab-item', 'cp', {'on': item.value===showType}]"-->
                     <!--@click="clickType(item.value)"-->
                     <!--v-for="(item,index) in typeList" :key="index">{{item.name}}</div>-->
            <!--</div>-->
            <ul class="type-list-ul">
                <li class="contentItem cp" v-for="(item,index) in stationList" :key="index"
                    v-if="item.postion_type===showType">
                    <div @click="selectItem=item.postion_name;showTabList=false;showSuggestion=false;">
                        {{item.postion_name}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: '',

    mixins: [],

    components: {},

    props: {
        detailItem:[String],

        stationList: {
            type: Array,
            default: []
        }
    },

    data () {
        return {
            selectItem:'',
            searchVal: '',
            showTabList: false,
            showSuggestion: false,
            typeList: [
                {
                    name: '服务区',
                    value: '服务区'
                },
            ],
            showType: '服务区', // 当前的type
            suggestionList: [], // 搜索建议
        }
    },

    computed: {},

    watch: {
        selectItem(){
            this.$emit("update:detailItem", this.selectItem)
        },
        // 监听输入
        searchVal (n, o) {
            if (!n || !n.length) {
                this.showSuggestion = false
                return
            }
            this.suggestionList = []
            let newList = []

            for (const stationListElement of this.stationList) {
                if (stationListElement.postion_name.indexOf(n) >=0) {
                    newList.push(stationListElement)
                }
            }
            this.suggestionList = newList
            this.showSuggestion = true
        }
    },

    created () {},

    mounted () {

    },

    destroyed () {},

    methods: {
        clickSearch () {
            if (!this.searchVal) {
                this.showSuggestion= false
                alert('请输入地点')
                return
            }
            for (const stationListElement of this.stationList) {
                if (stationListElement.postion_name==this.searchVal) {
                    this.selectItem=stationListElement.postion_name;
                    this.showTabList=false;
                    this.showSuggestion=false;
                    this.searchVal='';
                    return
                }
            }

            alert('没找到对应地点')
        },
        clickTab () {
            this.showTabList = !this.showTabList
        },
        clickType (type) {
            this.showType = type
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
    .search-box-left {
        width:118px;
        /*background: red;*/
        height:40px;
        background:rgba(19,91,171,1);
        opacity:0.9;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        padding-left: 10px;
        padding-right: 20-10px;
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
        width:233px;
        height:40px;
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
            height: 16px;
            margin-top: 12px;
            margin-left: 10px;
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
        height: 40px;
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
        width: 308-100px;
        height: 153*2px;
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
    /*.type-list-ul {*/
        /*height: 124px;*/
        /*overflow-y: scroll;*/
        /*width: 100%;*/
        /*padding-top: 2px;*/
    /*}*/
    .type-list-ul {
        height: 124*2+10+40px;
        overflow-y: scroll;
        width: 100%;
        padding-top: 2px;
    }
    .contentItem {
        height: 28px;
        line-height: 28px;
        padding-left: 10px;
    }

    .contentItem:hover {
        background-color: rgba(19, 89, 155, 0.9);
    }

</style>

