<template>
    <div id="container" class="full-div">
        <div :class="['sw-btn-outer', {'ovPos': !isOverView}]">
            <mapSWBtn
                :isSatellite.sync="isSatellite"
            ></mapSWBtn>
        </div>

        <!--楼层按钮-->
        <div id="DivButton" class="DivButton"></div>
    </div>

</template>

<script>
import PlacePointView from '../data'
import mapMixin from '@/utils/mapMixin'
import MapBase from '@/utils/reli'
import TrafficView from '@/utils/traffic'
import mapSWBtn from '@/components/mapSWBtn'

export default {
    name: '',

    mixins: [mapMixin],

    components: {
        mapSWBtn
    },

    props: {
        id: {
            type: Number,
            default: -1
        },
        stationList: {
            type: Array,
            default: []
        },
        terminalInfoList: {
            type: Array,
            default: []
        },
        isOverView: {
            type: Boolean,
            default: true
        },
    },

    data () {
        return {
            pointControl: null,
            // markers: [], // 存放marker
            markerIconMap: {
                '机场': require('../assets/mk飞机.png'),
                '铁路': require('../assets/mk火车.png'),
                '客运站': require('../assets/mk客运站.png'),
                '水路': require('../assets/mk水路.png')
            },
        }
    },

    computed: {},

    watch: {
        pointType (n, o) {
            this.renderMarker()
        },
        isOverView (n, o) {
            if (n) {
                this.closeInfo()
            }
        },
    },

    created () {},

    mounted () {
        this.initEvent()
    },

    destroyed () {},

    methods: {
        // terminalInfoList匹配stationList取到经纬度数据
        handleTerminalInfoList () {
            for (const terminalInfoListElement of this.terminalInfoList) {
                for (const station of this.stationList) {
                    if (station.postion_name === terminalInfoListElement.postion_name) {
                        terminalInfoListElement['lnglat'] = station['lnglat'] // 得到经纬度
                        terminalInfoListElement['rectData'] = station['rectData'] // 得到画框数据
                    }
                }
            }
        },
        /**
         * 匹配枢纽点对应的坐标数据
         */
        findHingeLngLat () {
            const placePoints = window.pointControl.PlacePoints // 地图点数组 有经纬度数据
            for (let obj of this.terminalInfoList) {
                let have = false
                for (let point of placePoints) {
                    try {
                        if (obj.postion_name === point['枢纽名称']) {
                            let lnglat = point['地址'][0]['lnglat'].split(',')
                            // debugger
                            obj.lnglat = lnglat
                            have = true
                        }
                    } catch (e) {
                        console.log(point)
                    }

                }
                if (!have) {
                    // console.log(`${obj.postion_name} 没有坐标数据.`)
                }
            }
            //      console.log(this.positionInfoList)
        },
        // 根据terminalInfoList 画点
        renderMarker () {
            this.clearMarkers()
            const type = this.pointType
            var me = this
            let markerArr = []
            for (const terminalInfoListElement of this.terminalInfoList) {
                // console.log(terminalInfoListElement['postion_type'])
                if (!terminalInfoListElement['lnglat'] || !terminalInfoListElement['lnglat'].length) {
                    console.log(`没有经纬度: ${terminalInfoListElement.postion_name}`)
                    continue
                }
                if (terminalInfoListElement['postion_type'] !== type) { // 匹配全局类型 要显示的类型
                    continue
                }
                var icon = this.markerIconMap[terminalInfoListElement['postion_type']]
                var lnglat = terminalInfoListElement['lnglat']
                var city = terminalInfoListElement.city
                var postion_name = terminalInfoListElement.postion_name
                var postion_id = terminalInfoListElement.postion_id
                var postion_type = terminalInfoListElement.postion_type
                var user_cnt = terminalInfoListElement.user_cnt
                var lv = terminalInfoListElement.lv
                var marker = new AMap.Marker({
                    position: new AMap.LngLat(lnglat[0],lnglat[1]),
                    offset: new AMap.Pixel(0, 0),
                    icon: icon, // 添加 Icon 图标 URL
                    title: postion_name,
                    extData: {
                        lnglat: lnglat,
                        city: city,
                        postion_id: postion_id,
                        postion_name: postion_name,
                        user_cnt: user_cnt,
                        postion_type: postion_type,
                        lv: lv
                    }
                });
                var maxZoom = 17
                marker.on('click', function () {
                    let ExtData = this.getExtData()

                    me.handleMoveToPoint(me,ExtData)

                })
                markerArr.push(marker)
                this.theMap.add(marker);
            }
            this.$store.dispatch('markers', markerArr)

        },
        // 清除marker
        clearMarkers () {
            this.theMap.remove(this.markers);
            this.$store.dispatch('markers', [])

        },
        async initEvent () {
            this.$store.dispatch('infoWindowDom', this.$refs.marker)

            this.initMap()
            this.handleTerminalInfoList()
            // this.findHingeLngLat()
            this.renderMarker()
        },

        initMap () {

            var satellite = this.satellite = new AMap.TileLayer.Satellite();
            var normalLayer = this.normalLayer = new AMap.TileLayer()
            window.roadNet = new AMap.TileLayer.RoadNet();
            // 港珠澳大桥经纬度:
            let me = this
            let layers = this.isSatellite?[
                satellite,
                normalLayer,
                // building,
                window.roadNet
            ]:[
                normalLayer,
                // building,
                // window.roadNet
            ]
            let mapStyle = this.isSatellite? me.normalStyle : me.mapStyle
            //创建地图
            // debugger
            var map = new AMap.Map('container', {
                pitch: 0,
                mapStyle: mapStyle,
                // viewMode: id == 1 ?'':'3D',// 地图模式
                center: me.defaultCenter,
                zoom: me.defaultZoom,
                expandZoomRange:true,  // 改变最大缩放等级
                zooms: [8,20],  // 改变最大缩放等级
                //center:[110.322391,20.146053 ],//琼州海峡 //lat: 20.146053  lng: 110.322391

                //center: [113.275824, 22.994826],
                // features: ['bg'],//, 'building', 'point', 'road'],//['all'],// ['bg', 'building','point'],
                // zoom: id == 1 ? 11 : 13,// 11.78,
                // zooms: [10, 20],
                // zoom: 4,
                keyboardEnable: false,
                layers: layers
            });
            this.theMap = map;
            window.theMap = map
            window.traffic = new TrafficView(window.theMap)
            window.pointControl = this.pointControl = new PlacePointView(this.theMap);
            window.mapbase = new MapBase()
            mapbase.initEvent()
        },
    }
}
</script>

<style lang='scss' scoped>
    .sw-btn-outer {
        position: absolute;
        right: 56px;
        top: 20px;
        z-index: 11;
    }
    .m-box {
        position: absolute;
        right: 509px;
        top: 20px;
        z-index: 11;
    }
    .ovPos {
        top: 9px;
        right: 11px;
    }

</style>
