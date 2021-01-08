<template>
    <div id="container" class="full-div">
        <!--<div class="sw-btn-outer">-->
        <!--<mapSWBtn @changeSatellite="clickSWBtn"></mapSWBtn>-->
        <!--</div>-->

    </div>

</template>

<script>
    import PlacePointView from '../PlacePointView'
    import mapMixin from '@/utils/mapMixin'
    // import MapBase from '../../../utils/reli2'
    import TrafficView from '@/utils/traffic'
    import mapSWBtn from '@/components/mapSWBtn2'
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
        },

        data() {
            return {
                defaultCenter: [113.85, 22.680949],
                pointControl: null,
                thePlace: '', // 当前位置
                isOverView: true, // 是不是总览
            }
        },

        computed: {},

        watch: {},

        created() {
        },

        mounted() {
            this.initEvent()
        },

        destroyed() {
        },

        methods: {

            initEvent() {
                this.initMap()
                this.pointControl = new PlacePointView(this.theMap);

            },

            initMap() {
                // window.mapbase = new MapBase()

                var satellite = this.satellite = new AMap.TileLayer.Satellite();
                var normalLayer = this.normalLayer = new AMap.TileLayer()
                var roadNet = new AMap.TileLayer.RoadNet();
                // 港珠澳大桥经纬度:
                let id = this.id
                let me = this
                let layers = [
                    satellite,
                    // building,
                    roadNet
                ]
                //创建地图
                // debugger
                var map = new AMap.Map('container', {
                    pitch: 0,
                    mapStyle:this.mapStyle,
                    // viewMode: id == 1 ?'':'3D',// 地图模式
                    center: me.defaultCenter,
                    zoom: 8,
                    expandZoomRange: true,  // 改变最大缩放等级
                    zooms: [8, 20],  // 改变最大缩放等级
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
                // window.mapbase.initEvent();
                this.traffic = new TrafficView(window.theMap)


            },


            // 回去原来的地点
            backPos() {
                if (this.id === 1) {
                    this.theMap.setZoomAndCenter(11, [113.74747, 22.234744])
                }
                if (this.id === 2) { // 110.231124
                    this.theMap.setZoomAndCenter(15, [110.231124, 20.268827])
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    .sw-btn-outer {
        position: absolute;
        /*right: 509px;*/
        /*top: 20px;*/
        /*top: 14px;*/
        /*right: 41+80+60px;*/
        right: 41+80+20px;
        top:10px;
        z-index: 11;
    }
</style>
