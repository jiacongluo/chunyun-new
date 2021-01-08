<template>
    <div class="map-box-outer">
        <div id="container" class="map-box"></div>

        <div class="sw-btn-outer">
            <mapSWBtn
            :isSatellite.sync="isSatellite"
        ></mapSWBtn>
        </div>

        <!--无人机按钮-->
        <div class="auv-box cp" @click="clickUAVBtn">
            <div class="auv-on" v-if="streamName"></div>
            <div class="auv" v-else></div>
        </div>
    </div>

</template>

<script>
import { getData }from '@/utils/core/http'
import station2018 from '@/utils/station2018'
import mapMixin from '@/utils/mapMixin'
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
        }
    },

    data () {
        /*人工岛 center:[113.580931, 22.204715] zoom:15
        * 海安港 center:[] zoom:*/
        return {
            streamName: '', //
            UAVData: [], // 无人机数据
            // isShowUAV: false, // 是否在显示无人机
            // playUrl: 'http://183.6.114.219:23137/gdcnymot2/api/flisionUAV/play/0UYKG7R002018a_11', // 视频url
            // playUrl: '', // 视频url
            UAVMarker: [], // 无人机marker
            UAVPolyline: [], // 无人机线
            UAVIdMap: { // 11(gangzhuao,港珠澳大桥）,22（qiongzhou，琼州海峡）,33（nanerhuan，南二环）,44（guangzhuxi，广珠西线）
                1: '11',
                2: '22'
            },
            UAVLogo: require('../assets/无人机点@2x.png'),
            markersData: [
                {name: '公路口岸', lnglat: [113.581762,22.201528]},
                {name: '港珠澳大桥', lnglat: [113.728361,22.28002]},
            ],
            theMarkers: [],
            center1: [113.711078, 22.264613], // 港珠澳
            center2: [110.184174, 20.240383] // 琼州
        }
    },

    computed: {},

    watch: {
        id (n, o) {
            this.initEvent()
        },
        isShowUAV (n, o) {
            if (n) {
                this.hideMarkers()
            } else {
                this.showMarkers()
            }
        }
    },

    created () {},

    mounted () {
        this.initEvent()
    },

    destroyed () {},

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
        },
        // 点击无人机按钮,画线
        clickUAVBtn () {
            // debugger
            if (this.streamName) {
                if (this.isShowUAV) { // 再次点击 关闭无人机
                    this.backPos()
                    this.$store.dispatch('isShowUAV', false)
                    this.$store.dispatch('showUAVIframe', false)


                } else { // 点击开启画无人机轨迹
                    this.drawUAVLine()
                    this.$store.dispatch('showUAVIframe', true)
                    this.$store.dispatch('isShowUAV', true)

                }
            }
        },
        initEvent () {
            let city = this.id === 1 ? '珠海': '湛江'
            this.$store.dispatch('city', city)
            this.initMap()
            if (!this.isDebug) {
                this.refreshUAV()
            }
        },
        // 刷新无人机
        refreshUAV () {
            this.getUAVOL()
            let time = 5000
            this.timer = setInterval(() => {
                this.getUAVOL()
            }, time)
        },
        // 返回值：StreamName：无人机ID_uuid,uuid的值：11(gangzhuao,港珠澳大桥）,
        // 22（qiongzhou，琼州海峡）,33（nanerhuan，南二环）,44（guangzhuxi，广珠西线）;isOnline:是否在线,1在线，0不在线
        // 检查无人机是否在线
        getUAVOL () {
            const url = `/api/flisionUAV/isOnline/${this.UAVIdMap[this.id]}`
            const data = {
            }
            getData(url, data).then((res) => {
                try {
                    if (res.data.isOnline) {
                        this.streamName = res.data.streamName
                        let url = `/api/flisionUAV/play/${this.streamName}`
                        this.getUAVPos()
                        this.getUAVUrl(url)
                    } else {
                        this.streamName = ''
                        this.$store.dispatch('playUrl', '')
                    }
                } catch (e) {
                    console.log(e)
                }

            })
        },
        getUAVUrl (url) {
            getData(url, {}).then((res) => {
                // this.playUrl = res.data
                this.$store.dispatch('playUrl', res.data)

            })
        },
        // 无人机最新位置接口
        getUAVPos () {
            const url = '/api/flisionUAV/droneInfo/list'
            const data = {
                serialNumber: this.streamName.split('_')[0]
            }
            getData(url, data).then((res) => {
                this.UAVData = res.data.data //
                if (this.isShowUAV) { // 如果要显示无人机状态 就画线
                    this.drawUAVLine()
                }
            })
        },
        initMap () {
            var satellite = this.satellite = new AMap.TileLayer.Satellite();
            var normalLayer = this.normalLayer = new AMap.TileLayer()
            var roadNet = new AMap.TileLayer.RoadNet();
            // 港珠澳大桥经纬度:
            let id = this.id
            let me = this
            let layers = me.isSatellite? [
                satellite,
                normalLayer
                // building,
                //roadNet
            ]: []
            let mapStyle = me.isSatellite?me.normalStyle:me.mapStyle
            //创建地图
            // debugger
            var map = new AMap.Map('container', {
                pitch: 0,
                mapStyle: mapStyle,
                // viewMode: id == 1 ?'':'3D',// 地图模式
                center: id == 1 ? me.center1 : me.center2,//港珠澳大桥
                // features: ['bg'],//, 'building', 'point', 'road'],//['all'],// ['bg', 'building','point'],
                zoom: id == 1 ? 11 : 13,// 11.78,
                // zooms: [10, 20],
                // zoom: 4,
                keyboardEnable: false,
                layers: layers
            });
            this.theMap = map;
            window.theMap = map
            this.beforeDrawRect()
            // this.theMap.setMapStyle('amap://styles/4c9342fa8348902a654e5edeb8dc6c19');
            if (this.id === 1) {
                // this.handleNavPath()
                for (const markersDatum of this.markersData) {
                    this.addMarker(markersDatum)
                }
                this.drawRoad()
            }
            if (this.id === 2) {
            }

        },
        // 画点
        addMarker (data) {
            var content = `<div class="roundMarker bgi"></div>`
            // if (!this.theMarkers[name]) {
                var marker = new AMap.Marker({
                    content: content,  // 自定义点标记覆盖物内容
                    position: data.lnglat, // 基点位置
                    offset: new AMap.Pixel(-15, -15), // 相对于基点的偏移位置
                    title: data.name
                });
            this.theMarkers.push(marker)
                this.theMap.add(marker);
                // this.theMarkers[name] = marker;
            // }
            // else {
            //     this.theMarkers[name].setContent(content);
            // }
        },

        // 画框
        drawRect (lnglatArr) {
            let pathArray = []

            let theMap = this.theMap
            for (var i = 0; i < lnglatArr.length; i++) {
                var p = lnglatArr[i];
                if (p.length < 2) {
                    console.log('数据不对', p);
                    continue
                }
                // console.log(p)
                var a = new AMap.LngLat(p[0], p[1]);
                pathArray.push(a);
            }
            console.log('开始画线');
            // debugger;
            let RoadPath = new AMap.Polygon ({
                path: pathArray,
                fillColor: '#4fbefc', // 多边形填充颜色
                strokeWeight: 6, // 线条宽度，默认为 1
                // strokeColor: '#0066FF', // 线条颜色
                strokeColor: '#FFFF00', // 线条颜色
                strokeOpacity: 1, // 线条透明度
                fillOpacity: 0,
                zIndex: 10010,
                // strokeDasharray: [10, 5]
                isOutline: true,
                borderWeight: 3,
            });
            RoadPath.setMap(theMap);
        },
        // 找到数据
        beforeDrawRect () {
            const theData = station2018
            let placeName = []
            let lnglatArr = []
            if (this.id === 1) {
                placeName = ['人工岛']
            }
            if (this.id === 2) {
                placeName = ['徐闻海安港', '海安两港', '海安北港']
            }
            for (const placeNameElement of placeName) {
                for (const theDataKey in theData) {
                    if (theDataKey === placeNameElement) {
                        lnglatArr = theData[theDataKey]
                        this.drawRect(lnglatArr)
                        break
                    }
                }
            }

        },
        // 画线 大桥的
        drawRoad () {
            var road1 = "113.588394,22.208838;113.590149,22.21011;113.590599,22.2104;113.595665,22.213629;113.596802,22.214354;113.598633,22.215521;113.614006,22.225338;113.620605,22.229549;113.63002,22.235565;113.631332,22.236328;113.637299,22.239779;113.63958,22.241047;113.641769,22.24198;113.642578,22.242275;113.643295,22.24254;113.64563,22.243315;113.651047,22.244696;113.66011,22.24703;113.661095,22.247313;113.664551,22.248289;113.667458,22.249111;113.671799,22.250729;113.675491,22.252337;113.678452,22.253839;113.680527,22.255039;113.685425,22.258179;113.68557,22.258297;113.686523,22.259041;113.68853,22.260616;113.69072,22.262365;113.695602,22.266844;113.698349,22.26914;113.698563,22.269285;113.700981,22.270933;113.703171,22.272369;113.705627,22.273762;113.708496,22.275114;113.708603,22.275164;113.711372,22.276325;113.714485,22.277439;113.718124,22.278551;113.721848,22.27928;113.725845,22.279804;113.729912,22.280087;113.730469,22.280096;113.735283,22.280165;113.752434,22.280178;113.75515,22.280178;113.771355,22.280273;113.774216,22.280287;113.774414,22.280287;113.784065,22.280273;113.785217,22.280273;113.786385,22.280273;113.788612,22.280264;113.790833,22.280264";
            var road2 = "113.790833,22.280264;113.79277,22.28026;113.796379,22.280264;113.797493,22.280273;113.804657,22.280277;113.805443,22.280273;113.818352,22.280188;113.840332,22.280035;113.843056,22.280018;113.844658,22.279922;113.845665,22.279831;113.848297,22.279331;113.850136,22.27895;113.851761,22.27862;113.852592,22.278393;113.853432,22.278164;113.855408,22.277622;113.859734,22.276047;113.862305,22.275074;113.867935,22.272961;113.869301,22.272512;113.870056,22.272287;113.870796,22.272121;113.87146,22.272005;113.871979,22.271954;113.873421,22.271875;113.87455,22.271917;113.875565,22.272036;113.877388,22.272354;113.878021,22.272532;113.878799,22.272808;113.879883,22.273243;113.880302,22.273415;113.882492,22.274714;113.884277,22.275911;113.885223,22.276548;113.890862,22.280273;113.895134,22.283096;113.896568,22.284027;113.897781,22.284761;113.902382,22.287868;113.90303,22.288256;113.90435,22.289021;113.905319,22.289417;113.90625,22.289722;113.906883,22.28993;113.907982,22.290192;113.908791,22.290325;113.90976,22.290447;113.910194,22.290468;113.910667,22.290468;113.912407,22.290424;113.913292,22.290482;113.913643,22.290533;113.914009,22.290611;113.915291,22.291124;113.915558,22.291258;113.916428,22.291693;113.917114,22.291975;113.917488,22.292166;113.91777,22.292257;113.918198,22.292326;113.918762,22.292339;113.920692,22.292286;113.921295,22.292223;113.921867,22.292118;113.923981,22.291519;113.92485,22.291258;113.928223,22.290236;113.930382,22.289577;113.932014,22.289106;113.932594,22.288998;113.933487,22.288885;113.934364,22.288872;113.934891,22.288898;113.935272,22.288939;113.935913,22.289021;113.936821,22.289181;113.937378,22.289314";

            var thePaths = road1.split(";").concat(road2.split(";")).map(function (item) {
                var points = item.split(',');
                return [points[0], points[1]];
            });
            var pathArray = thePaths.map(function (item) {
                return new AMap.LngLat(parseFloat(item[0]), parseFloat(item[1]))
            });

            // var theStartPoint = thePaths[0];
            // var theEndPoint = thePaths[thePaths.length - 1];

            // debugger;
            var RoadPath = window['bridgeLine'] =  new AMap.Polyline({
                path: pathArray,
                strokeColor: '#0066FF',//"#0d305d",
                strokeOpacity: "1",
                strokeWeight: "6",
                strokeStyle: "solid",
                zIndex: 1000,
                strokeDasharray: [10, 5]
            });
            // debugger
            this.theMap.add(RoadPath);
            return RoadPath;
        },
        // 处理导航路线数据
        handleNavPath () {
            var road1 = "113.588394,22.208838;113.590149,22.21011;113.590599,22.2104;113.595665,22.213629;113.596802,22.214354;113.598633,22.215521;113.614006,22.225338;113.620605,22.229549;113.63002,22.235565;113.631332,22.236328;113.637299,22.239779;113.63958,22.241047;113.641769,22.24198;113.642578,22.242275;113.643295,22.24254;113.64563,22.243315;113.651047,22.244696;113.66011,22.24703;113.661095,22.247313;113.664551,22.248289;113.667458,22.249111;113.671799,22.250729;113.675491,22.252337;113.678452,22.253839;113.680527,22.255039;113.685425,22.258179;113.68557,22.258297;113.686523,22.259041;113.68853,22.260616;113.69072,22.262365;113.695602,22.266844;113.698349,22.26914;113.698563,22.269285;113.700981,22.270933;113.703171,22.272369;113.705627,22.273762;113.708496,22.275114;113.708603,22.275164;113.711372,22.276325;113.714485,22.277439;113.718124,22.278551;113.721848,22.27928;113.725845,22.279804;113.729912,22.280087;113.730469,22.280096;113.735283,22.280165;113.752434,22.280178;113.75515,22.280178;113.771355,22.280273;113.774216,22.280287;113.774414,22.280287;113.784065,22.280273;113.785217,22.280273;113.786385,22.280273;113.788612,22.280264;113.790833,22.280264";
            var road2 = "113.790833,22.280264;113.79277,22.28026;113.796379,22.280264;113.797493,22.280273;113.804657,22.280277;113.805443,22.280273;113.818352,22.280188;113.840332,22.280035;113.843056,22.280018;113.844658,22.279922;113.845665,22.279831;113.848297,22.279331;113.850136,22.27895;113.851761,22.27862;113.852592,22.278393;113.853432,22.278164;113.855408,22.277622;113.859734,22.276047;113.862305,22.275074;113.867935,22.272961;113.869301,22.272512;113.870056,22.272287;113.870796,22.272121;113.87146,22.272005;113.871979,22.271954;113.873421,22.271875;113.87455,22.271917;113.875565,22.272036;113.877388,22.272354;113.878021,22.272532;113.878799,22.272808;113.879883,22.273243;113.880302,22.273415;113.882492,22.274714;113.884277,22.275911;113.885223,22.276548;113.890862,22.280273;113.895134,22.283096;113.896568,22.284027;113.897781,22.284761;113.902382,22.287868;113.90303,22.288256;113.90435,22.289021;113.905319,22.289417;113.90625,22.289722;113.906883,22.28993;113.907982,22.290192;113.908791,22.290325;113.90976,22.290447;113.910194,22.290468;113.910667,22.290468;113.912407,22.290424;113.913292,22.290482;113.913643,22.290533;113.914009,22.290611;113.915291,22.291124;113.915558,22.291258;113.916428,22.291693;113.917114,22.291975;113.917488,22.292166;113.91777,22.292257;113.918198,22.292326;113.918762,22.292339;113.920692,22.292286;113.921295,22.292223;113.921867,22.292118;113.923981,22.291519;113.92485,22.291258;113.928223,22.290236;113.930382,22.289577;113.932014,22.289106;113.932594,22.288998;113.933487,22.288885;113.934364,22.288872;113.934891,22.288898;113.935272,22.288939;113.935913,22.289021;113.936821,22.289181;113.937378,22.289314";

            var thePaths = road1.split(";").concat(road2.split(";")).map(function (item) {
                var points = item.split(',');
                return [points[0], points[1]];
            });
            var thePaths2 = []
            for (const thePathsElement of thePaths) {
                let temp = [...thePathsElement]
                temp[1] -= 0.007
                thePaths2.push(temp)
            }
            thePaths2.reverse() // 反向
            // this.drawNavPath(thePaths,thePaths2)
        },
        // 画导航线
        drawNavPath (path1, path2) {
            let me = this;
            AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

                if (!PathSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                }
                var defaultLineOptions = {
                    renderAllPointsIfNumberBelow: -1, //绘制路线节点，如不需要可设置为-1
                    // pathTolerance: 2,
                    // keyPointTolerance: 0,
                    pathLineStyle: {
                        lineWidth: 3,
                        strokeStyle: '#225df7',
                        borderWidth: 1,
                        borderStyle: '#eeeeee',
                        dirArrowStyle: false
                    },
                    // pathLineHoverStyle: {
                    //     lineWidth: 3,
                    //     strokeStyle: 'rgba(204, 63, 88,1)',
                    //     borderWidth: 1,
                    //     borderStyle: '#cccccc',
                    //     dirArrowStyle: false
                    // },
                    // pathLineSelectedStyle: {
                    //     lineWidth: 6,
                    //     strokeStyle: '#C11534',
                    //     borderWidth: 1,
                    //     borderStyle: '#cccccc',
                    //     dirArrowStyle: true
                    // },
                    // dirArrowStyle: {
                    //     stepSpace: 35,
                    //     strokeStyle: '#ffffff',
                    //     lineWidth: 2
                    // },
                    // startPointStyle: {
                    //     radius: 4,
                    //     fillStyle: '#109618',
                    //     lineWidth: 1,
                    //     strokeStyle: '#eeeeee'
                    // },
                    // endPointStyle: {
                    //     radius: 4,
                    //     fillStyle: '#dc3912',
                    //     lineWidth: 1,
                    //     strokeStyle: '#eeeeee'
                    // },
                    // keyPointStyle: {
                    //     radius: 3,
                    //     fillStyle: 'rgba(8, 126, 196, 1)',
                    //     lineWidth: 1,
                    //     strokeStyle: '#eeeeee'
                    // },
                    // keyPointHoverStyle: {
                    //     radius: 4,
                    //     fillStyle: 'rgba(0, 0, 0, 0)',
                    //     lineWidth: 2,
                    //     strokeStyle: '#ffa500'
                    // },
                    // keyPointOnSelectedPathLineStyle: {
                    //     radius: 4,
                    //     fillStyle: 'rgba(8, 126, 196, 1)',
                    //     lineWidth: 2,
                    //     strokeStyle: '#eeeeee'
                    // }
                };
                var defaultLineOptions2 = {
                    renderAllPointsIfNumberBelow: -1, //绘制路线节点，如不需要可设置为-1
                    // pathTolerance: 2,
                    // keyPointTolerance: 0,
                    pathLineStyle: {
                        lineWidth: 3,
                        strokeStyle: '#F7B538',
                        borderWidth: 1,
                        borderStyle: '#eeeeee',
                        dirArrowStyle: false
                    },
                    // pathLineHoverStyle: {
                    //     lineWidth: 3,
                    //     strokeStyle: 'rgba(204, 63, 88,1)',
                    //     borderWidth: 1,
                    //     borderStyle: '#cccccc',
                    //     dirArrowStyle: false
                    // },
                    // pathLineSelectedStyle: {
                    //     lineWidth: 6,
                    //     strokeStyle: '#C11534',
                    //     borderWidth: 1,
                    //     borderStyle: '#cccccc',
                    //     dirArrowStyle: true
                    // },
                    // dirArrowStyle: {
                    //     stepSpace: 35,
                    //     strokeStyle: '#ffffff',
                    //     lineWidth: 2
                    // },
                    // startPointStyle: {
                    //     radius: 4,
                    //     fillStyle: '#109618',
                    //     lineWidth: 1,
                    //     strokeStyle: '#eeeeee'
                    // },
                    // endPointStyle: {
                    //     radius: 4,
                    //     fillStyle: '#dc3912',
                    //     lineWidth: 1,
                    //     strokeStyle: '#eeeeee'
                    // },
                    // keyPointStyle: {
                    //     radius: 3,
                    //     fillStyle: 'rgba(8, 126, 196, 1)',
                    //     lineWidth: 1,
                    //     strokeStyle: '#eeeeee'
                    // },
                    // keyPointHoverStyle: {
                    //     radius: 4,
                    //     fillStyle: 'rgba(0, 0, 0, 0)',
                    //     lineWidth: 2,
                    //     strokeStyle: '#ffa500'
                    // },
                    // keyPointOnSelectedPathLineStyle: {
                    //     radius: 4,
                    //     fillStyle: 'rgba(8, 126, 196, 1)',
                    //     lineWidth: 2,
                    //     strokeStyle: '#eeeeee'
                    // }
                };
                var map = me.theMap
                var pathSimplifierIns = new PathSimplifier({
                    zIndex: 100,
                    //autoSetFitView:false,
                    map: map, //所属的地图实例

                    getPath: function(pathData, pathIndex) {

                        return pathData.path;
                    },
                    getHoverTitle: function(pathData, pathIndex, pointIndex) {

                        if (pointIndex >= 0) {
                            //point
                            return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                        }

                        return pathData.name + '，点数量' + pathData.path.length;
                    },
                    renderOptions: defaultLineOptions

                });
                var pathSimplifierIns2 = new PathSimplifier({
                    zIndex: 100,
                    //autoSetFitView:false,
                    map: map, //所属的地图实例

                    getPath: function(pathData, pathIndex) {

                        return pathData.path;
                    },
                    getHoverTitle: function(pathData, pathIndex, pointIndex) {

                        if (pointIndex >= 0) {
                            //point
                            return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                        }

                        return pathData.name + '，点数量' + pathData.path.length;
                    },
                    renderOptions: defaultLineOptions2

                });

                window.pathSimplifierIns = pathSimplifierIns;

                //设置数据
                pathSimplifierIns.setData([
                    {
                        name: '路线0',
                        path: path1,
                    },
                ]);
                pathSimplifierIns2.setData([
                    {
                        name: '路线1',
                        path: path2,

                    }
                ]);
                var defaultNavOptions = {
                    loop: true, //循环播放
                    speed: 10000, //巡航速度，单位千米/小时
                    pathNavigatorStyle: {
                        initRotateDegree: 0,
                        width: 16,
                        height: 16,
                        autoRotate: true,
                        lineJoin: 'round',
                        content: 'defaultPathNavigator', // defaultPathNavigator,
                        fillStyle: '#087EC4',
                        strokeStyle: '#116394', //'#eeeeee',
                        lineWidth: 1,
                        pathLinePassedStyle: {
                            lineWidth: 2,
                            strokeStyle: 'rgba(8, 126, 196, 1)',
                            borderWidth: 1,
                            borderStyle: '#eeeeee',
                            dirArrowStyle: false
                        }
                    }
                };
                var defaultNavOptions2 = {
                    loop: true, //循环播放
                    speed: 10000, //巡航速度，单位千米/小时
                    pathNavigatorStyle: {
                        initRotateDegree: 0,
                        width: 16,
                        height: 16,
                        autoRotate: true,
                        lineJoin: 'round',
                        content: 'defaultPathNavigator', // defaultPathNavigator,
                        fillStyle: '#087EC4',
                        strokeStyle: '#116394', //'#eeeeee',
                        lineWidth: 1,
                        pathLinePassedStyle: {
                            lineWidth: 2,
                            strokeStyle: 'rgba(8, 126, 196, 1)',
                            borderWidth: 1,
                            borderStyle: '#eeeeee',
                            dirArrowStyle: false
                        }
                    }
                };
                //对第一条线路（即索引 0）创建一个巡航器
                var navg1 = pathSimplifierIns.createPathNavigator(0, defaultNavOptions);
                var navg2 = pathSimplifierIns2.createPathNavigator(0, defaultNavOptions2);
                window.navg1 = navg1
                navg1.start();
                navg2.start();
                me.theMap.setFitView(navg1)
            });
        },
        // 无人机画线
        drawUAVLine () {
            this.clearUAV()
            var pathBefore = []
            var path = [];
            var me = this
            // for (const uavDatum of this.UAVData) {
            //     path.push([uavDatum.longitude, uavDatum.latitude])
            // }
            let len = 200
            for (let i = 0; i < len; i++) {
                let uavDatum = this.UAVData[i];
                pathBefore.push([uavDatum.longitude, uavDatum.latitude])
            }
            // gps 转 高德
            AMap.convertFrom(pathBefore, 'gps', function (status, result) {
                if (result.info === 'ok') {
                    path = result.locations; // Array.<LngLat>
                    // debugger
                    var polyline = new AMap.Polyline({
                        path: path,
                        isOutline: true,
                        outlineColor: '#ffeeff',
                        borderWeight: 1,
                        strokeColor: "#3fff59",
                        strokeOpacity: 1,
                        strokeWeight: 4,
                        // 折线样式还支持 'dashed'
                        strokeStyle: "dashed",
                        // strokeStyle是dashed时有效
                        // strokeDasharray: [10,2,10], // 点 线 点
                        strokeDasharray: [18,10] , // 点 线 点
                        lineJoin: 'round',
                        lineCap: 'round',
                        zIndex: 50,
                    })
                    var pointArr = path[0]
                    // debugger
                    var marker = new AMap.Marker({ // 无人机marker
                        position: new AMap.LngLat(pointArr['lng'],pointArr['lat']),
                        offset: new AMap.Pixel(-41.5, -24),
                        icon: me.UAVLogo, // 添加 Icon 图标 URL
                        title: ''
                    });
                    // 绑定事件
                    marker.on('click', () => { // 点击显示视频
                        // debugger
                    });
                    me.UAVMarker.push(marker)
                    me.UAVPolyline.push(polyline)
                    me.theMap.add(marker)
                    polyline.setMap(me.theMap)
                    // 缩放地图到合适的视野级别
                    me.theMap.setFitView([ marker ])
                }
            });

        },
        // 回去原来的地点
        backPos () {
            if (this.id === 1) {
                this.theMap.setZoomAndCenter(11, this.center1)
            }
            if (this.id === 2) { // 110.231124
                this.theMap.setZoomAndCenter(15, this.center2)
            }
        },
        // 清除无人机的marker和线
        clearUAV () {
            if (this.UAVMarker.length) {
                this.theMap.remove(this.UAVMarker)
            }
            if (this.UAVPolyline.length) {
                this.theMap.remove(this.UAVPolyline)
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .map-box-outer {
        width: 976px;
        /*height: 961px;*/
        height: 959px;

        margin-left: 32px;
        position: relative;
        z-index: 10;
    }
    .map-box {
        width: 100%;
        height: 100%;
    }

    .auv-box {
        position: absolute;
        display: none;
        z-index: 11;
        top: 13px;
        right: 19px;
        width: 184px;
        height: 66px;
        background: url("../assets/未点击bg@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .auv {
        width: 107px;
        height: 33px;
        background: url("../assets/无人机 未点击@2x.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 38px;
        top: 19px;
        z-index: 10;
    }
    .auv-on {
        width: 119px;
        height: 45px;
        background: url("../assets/无人机@2x.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 29px;
        top: 4px;
        z-index: 11;
    }
    .v-div {
        /*width: 500px;*/
        /*height: 500px;*/
        z-index: 11;
        position: relative;
    }

    .sw-btn-outer {
        position: absolute;
        left: 627px;
        top: 13px;
        z-index: 11;
    }

</style>
