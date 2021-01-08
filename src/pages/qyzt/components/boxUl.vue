<template>
    <ul class="map-box-ul">
        <li v-for="(item, index) in mapBoxUl" :key="index" v-if="item.name!=='公路口岸实时客流'&&item.name!=='大桥实时客流'">
            <div class="line1">
                <span>{{item.name}}</span>
                <i :class="item.jian?'down-icon':'up-icon'" v-if="item.key==='zengjian'"></i>
            </div>
            <div class="line2">
                <!--<i>{{utils.formatNum(item.data)}}</i>-->
                <!--<i :class="{'two': index%2!==0}">{{item.data}}</i>-->
                <i class="two">{{item.data}}</i>
                <span>{{item.unit}}{{item.name==='当日累计穿梭巴士'?'班次':'人'}}</span>
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
            mapBoxUl1: [
                {
                    name: '当日累计穿梭巴士',
                    data: 0,
                    key: 'CLASSCOUNT',
                    unit: ''
                },
                {
                    name: '当日累计巴士旅客',
                    data: 0,
                    key: 'CHECKCOUNT',
                    unit: ''
                },
                {
                    name: '公路口岸实时客流',
                    data: 0,
                    key: 'portFlow',
                    unit: ''
                },
                {
                    name: '大桥实时客流',
                    data: 0,
                    key: 'bridgeFlow',
                    unit: ''
                },
                // {
                //     name: '桥面5分钟离开人数',
                //     data: 0,
                //     key: 'flow5In',
                //     unit: ''
                // },
                // {
                //     name: '桥面5分钟进入人数',
                //     data: 0,
                //     key: 'flow5Out',
                //     unit: ''
                // },
                {
                    name: '桥面实时客流变化',
                    data: 0,
                    key: 'zengjian',
                    unit: '',
                    jian: false
                },
            ],
            mapBoxUl2: [
                {
                    name: '海安港及新港实时客流',
                    data: 0,
                    key: 'HAGFlow',
                    unit: ''


                },
                {
                    name: '粤海铁路北港实时客流',
                    data: 0,
                    key: 'YHBGFlow',
                    unit: ''

                },
                {
                    name: '春运累计离港人数',
                    data: 0,
                    key: 'flowOut',
                    unit: ''

                },
                {
                    name: '春运累计到港人数',
                    data: 0,
                    key: 'flowIn',
                    unit: ''

                },
            ],
            theMarkers: []

        }
    },

    computed: {},

    watch: {
        id (n, o) {
            this.init()
        },
        isShowUAV (n, o) {
            if (n) {
                this.hideMarkers()
            } else {
                this.showMarkers()
            }
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
        showMarkers () {
            for (const mk of this.theMarkers) {
                mk.show()
            }
        },
        hideMarkers () {
            for (const mk of this.theMarkers) {
                mk.hide()
            }
            // for (const argument of b) {
            //     let a = argument.postion_name
            //     if (a.indexOf('万江')!==-1) {
            //         console.log(a)
            //     }
            // }
        },
        async init () {
            if (this.id === 1) {
                this.mapBoxUl = this.mapBoxUl1
                this.url = '/bridge/realTimeFlow'
                await this.getData2()

            } else {
                this.mapBoxUl = this.mapBoxUl2
                this.url = '/qz/realTimeFlow'
                // this.url = '/qz/qzFlowStayRealTime'
            }
            this.clearMarkers()
            await this.getData()
            this.isRunning = true
            // debugger
        },
        clearMarkers () {
            window.theMap.remove(this.theMarkers)
        },
        // 画marker 信息框
        addMarkerInfo (data) {
            // debugger
            var content = `<div class="infoMarker bgi">
                        <div class="line1">${data.name}</div>
                        <div class="line2"><i>${data.num}</i><span>${data.unit}</span></div>
                        </div>`
            // if (!this.theMarkers[data.name]) {
                var marker = new AMap.Marker({
                    content: content,  // 自定义点标记覆盖物内容
                    position: data.lnglat, // 基点位置
                    offset: new AMap.Pixel(-107, -110) // 相对于基点的偏移位置
                });
                window.theMap.add(marker);
                this.theMarkers.push(marker);
            //
            // } else {
            //     this.theMarkers[data.name].setContent(content);
            // }

        },
        async getData () {
            // this.isRunning = false
            const url = this.url
            const data = {}
            await postData(url, data).then((res) => {
                // console.log(res)
                let zengjian1 = 0
                let zengjian2 = 0
                for (const dataKey in res.data) {
                    if (dataKey === 'flow5In') {
                        zengjian1 = res.data[dataKey]
                    }
                    if (dataKey === 'flow5Out') {
                        zengjian2 = res.data[dataKey]
                    }
                    for (const mapBoxUlElement of this.mapBoxUl) {

                        if (dataKey === mapBoxUlElement.key) {
                            // mapBoxUlElement.data = res.data[dataKey]/10000
                            mapBoxUlElement.data = this.utils.calWanNum(res.data[dataKey])
                            mapBoxUlElement.unit = this.utils.getWanUnit(mapBoxUlElement.data)
                            if (dataKey === 'bridgeFlow') {
                                let data = {
                                    num: mapBoxUlElement.data,
                                    unit: mapBoxUlElement.unit+'人',
                                    name: '大桥实时客流',
                                    lnglat: [113.728361,22.28002]

                                }
                                this.addMarkerInfo(data)
                            }
                            if (dataKey === 'portFlow') {
                                let data = {
                                    num: mapBoxUlElement.data,
                                    unit: mapBoxUlElement.unit+'人',
                                    name: '公路口岸实时客流',
                                    lnglat: [113.581762,22.201528]

                                }
                                this.addMarkerInfo(data)
                            }

                        }
                    }
                }
                for (const mapBoxUlElement of this.mapBoxUl) {
                    if (mapBoxUlElement.key === 'zengjian') {
                        let result = zengjian1 - zengjian2
                        mapBoxUlElement.data = this.utils.calWanNum(Math.abs(result))
                        mapBoxUlElement.unit = this.utils.getWanUnit(mapBoxUlElement.data)

                        mapBoxUlElement.jian = result < 0

                    }
                }
            })
        },
        getData2 () {
            const url = '/api/gdcnymotOut/realTimeBus'
            const data = {}
            getData(url, data).then((res) => {
                for (const dataKey in res.data) {
                    for (const mapBoxUlElement of this.mapBoxUl) {
                        if (dataKey === mapBoxUlElement.key) {
                            if (dataKey === 'CLASSCOUNT') {
                                mapBoxUlElement.data = res.data[dataKey]
                            } else {
                                mapBoxUlElement.data = this.utils.calWanNum(res.data[dataKey])
                                mapBoxUlElement.unit = this.utils.getWanUnit(mapBoxUlElement.data)
                            }

                        }
                    }
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .map-box-ul {
        position: absolute;
        left: 76px;
        top: 99px;
        /*top: 139px;*/
        z-index: 11;
        display: flex;

        li {
            width: 222px;
            height: 96px;
            background: url("../assets/框@2x.png") no-repeat;
            background-size: 100% 100%;
            font-size: 18px;
            /*font-family: Microsoft YaHei;*/
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            /*line-height:60px;*/
            padding: 18px 0px 0px 10px;
            margin-right: 9px;
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
                /*line-height:60px;*/
            }
            .two {
                color: $activeColor;
            }

        }
    }

    .up-icon{
        position: absolute;
        background-image: url("../assets/上升.png");
        width: 22px;
        height: 22px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: 10px;
    }
    .down-icon{
        position: absolute;
        background-image: url("../assets/下降.png");
        width: 22px;
        height: 22px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: 10px;

    }
</style>
