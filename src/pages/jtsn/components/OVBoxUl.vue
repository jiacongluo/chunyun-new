<template>
    <ul class="map-box-ul">
        <li v-for="(item, index) in mapBoxUl" :key="index">
            <div class="line1">{{item.name}}</div>
            <div class="line2">
                <!--<i>{{utils.formatNum(item.data)}}</i>-->
                <i :style="{'color': item.color}">{{item.data}}</i>
                <span>{{item.unit}}人</span>
            </div>
        </li>
    </ul>
</template>

<script>
import { postData,getData } from '@/utils/core/http'
import mapMixin from '@/utils/mapMixin'
export default {
    name: '',

    mixins: [mapMixin],

    components: {},

    props: {
        id: {
            type: Number,
            defalut: 1
        }
    },

    data () {
        return {
            url: '',
            mapBoxUl: [],
            mapBoxUl3: [
                {
                    name: '实时客流',
                    data: 0,
                    key: 'user_cnt',
                    // color: '#00FFFF',
                    color: '#FFFF00',
                    unit: ''

                },
                {
                    name: '实时进入人数',
                    data: 0,
                    key: 'user_in',
                    color: '#FFFF00',
                    unit: ''


                },
                {
                    name: '实时离开人数',
                    data: 0,
                    key: 'user_out',
                    // color: '#2DE714',
                    color: '#FFFF00',
                    unit: ''


                }
            ]

        }
    },

    computed: {},

    watch: {
        id (n, o) {
            this.init()
        }
    },

    created () {
    },

    mounted () {
        this.init()
        this.run()

    },

    destroyed () {
        this.isRunning = false
    },

    methods: {
        async init () {
            if (this.id === 3) {
                this.mapBoxUl = this.mapBoxUl3
                this.url = '/api/terminal/getTerminalFlow' // 实时人数
                this.url2 = '/api/terminal/getTerminalInOut' // 实时进入 实时离开
            }
            await this.fetchData()
            this.isRunning = true

        },

        async fetchData () {
            // this.isRunning = false
            const url = this.url
            const url2 = this.url2
            const data = {
                postionID: this.postionID,
                postionName: this.postionName,
            }
            // let num = 0
            // for (const terminalInfoListElement of window.terminalInfoList) {
            //     if (this.postionName === terminalInfoListElement['postion_name']) {
            //         num = terminalInfoListElement['user_cnt']
            //         // debugger
            //         break
            //     }
            // }
            // for (const mapBoxUlElement of this.mapBoxUl) {
            //     if (mapBoxUlElement.key === 'user_cnt') {
            //         // debugger
            //         mapBoxUlElement.data = this.utils.calWanNum(num)
            //         mapBoxUlElement.unit = this.utils.getWanUnit(mapBoxUlElement.data)
            //     }
            // }
            await getData(url2, data).then((res) => {
            // console.log(res)
            for (const dataKey in res.data['terminalIn'][0]) {
              for (const mapBoxUlElement of this.mapBoxUl) {
                if (dataKey === mapBoxUlElement.key) {
                  // debugger
                  // mapBoxUlElement.data = this.utils.tofixed(res.data['terminalIn'][0][dataKey]/10000,2)
                  mapBoxUlElement.data = this.utils.calWanNum(res.data['terminalIn'][0][dataKey])
                  mapBoxUlElement.unit = this.utils.getWanUnit(mapBoxUlElement.data)

                }
              }
            }
            for (const dataKey in res.data['terminalOut'][0]) {
              for (const mapBoxUlElement of this.mapBoxUl) {
                if (dataKey === mapBoxUlElement.key) {
                  // mapBoxUlElement.data = this.utils.tofixed(res.data['terminalOut'][0][dataKey]/10000,2)
                  mapBoxUlElement.data = this.utils.calWanNum(res.data['terminalOut'][0][dataKey])
                  mapBoxUlElement.unit = this.utils.getWanUnit(mapBoxUlElement.data)

                }
              }
            }
          })
            await getData(url, data).then((res) => {
                for (const mapBoxUlElement of this.mapBoxUl) {
                    if ('user_cnt' === mapBoxUlElement.key) {
                        // debugger
                        var user_cnt = res.data[0]['user_cnt']
                        let me = window
                        mapBoxUlElement.data = this.utils.calWanNum(user_cnt)
                        mapBoxUlElement.unit = this.utils.getWanUnit(mapBoxUlElement.data)

                        if (!window.isFloor) { // 不是点击楼层状态, 就画人数框
                            // debugger
                            var theLnglat = []
                            var fullName = window.postionName
                            for (const terminalInfoListElement of window.terminalInfoList) {
                                if (fullName === terminalInfoListElement.postion_name) {
                                    theLnglat = terminalInfoListElement['lnglat']
                                }
                            }
                            var theData = [{
                                postion_name: fullName,
                                user_cnt: user_cnt
                            }]
                            var position = new AMap.LngLat(theLnglat[0], theLnglat[1]);
                            let theDom = me.createInfoDom(theData[0])
                            me.drawPositionMarker(position, theDom)
                        }
                    }
                }
            })

        },
    }
}
</script>

<style lang='scss' scoped>
    .map-box-ul {
        position: absolute;
        left: 40px;
        top: 65px;
        z-index: 9;
        display: flex;

        li {
            width: 222px;
            height: 96px;
            background: url("../assets/框@2x.png") no-repeat;
            background-size: 100% 100%;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            /*line-height:60px;*/
            padding: 18px 0px 0px 21px;
            /*margin-right: 8px;*/
            margin-right: 125px;
        }

        .line2 {
            margin-top: 12px;
            font-size: 14px;

            i {
                font-size: 42px;
                font-family: unidreamledregular;
                font-weight: bold;
                color: rgba(0, 255, 255, 1);
                /*letter-spacing: 5px;*/
            }

        }
    }
</style>
