<template>
    <div ref="chartView" class="chart-panel"></div>
</template>

<script>
    import echarts from 'echarts';
    // import '../china.js';
    import 'echarts-gl-jian';
    import GpsUtil from '../../../utils/GpsUtil'
    import resUtil from '../../../utils/resUtil';

    export default {
        name: 'province',

        mixins: [],

        components: {},

        props: {
            data: {type: [Array, String, Number]},
            type: [String, Number]
        },

        data() {
            return {
                areaName: "",
            }
        },

        computed: {},

        watch: {
            data(newData, oldData) {
                this.loadData(newData);
            }
        },

        created() {
        },

        async mounted() {
            await this.initChartBase();
            await this.initChart();
            await this.loadData(this.data);
        },

        destroyed() {
        },

        methods: {
            onRegionChange(regionName){
                this.$emit("onRegionChnage",regionName);
            },
            /**
             * 图形大小更改
             * */
            async refresh() {
                this.chartView.resize();
            },
            /***
             * 初始化地球
             */
            async initChart() {
                this.chartView = echarts.init(this.$refs.chartView);
                let theFontSize = this.utils.htmlFontSize();
                var me=this;
                var option = {
                    backgroundColor: '',
                    title: {
                        text: '',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    geo3D: {
                        map: 'china',
                        roam: true,
                        itemStyle: {
                            color: '#08399d',
                            areaColor: '#08399d',
                            opacity: 1,
                            borderWidth: 0.8,
                            borderColor: 'rgb(62,215,213)'
                        },
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff', //地图初始化区域字体颜色
                                fontSize: me.utils.calSize(14, theFontSize),
                                opacity: 1,
                                backgroundColor: 'rgba(0,0,0,0)'
                            },
                        },
                        emphasis: { //当鼠标放上去  地区区域是否显示名称
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: me.utils.calSize(14, theFontSize),
                                    backgroundColor: 'rgba(0,23,11,0)'
                                }
                            }
                        },
                        //shading: 'lambert',
                        light: { //光照阴影
                            main: {
                                color: '#fff', //光照颜色
                                intensity: 1.2, //光照强度
                                //shadowQuality: 'high', //阴影亮度
                                shadow: false, //是否显示阴影
                                alpha: 55,
                                beta: 10

                            },
                            ambient: {
                                intensity: 0.3
                            }
                        },
                        // realisticMaterial: {
                        //     detailTexture: 'asset/leather/leather_albedo.jpg'
                        // }
                        viewControl: {
                            "alpha": 72.32354298402106,
                            "beta": 9.668323472058011,
                            "distance": 151.0416188719436,
                            "orthographicSize": 60,
                            "minAlpha": 5,
                            "minBeta": -80,
                            "maxBeta": 80,
                            "projection": "perspective",
                            "autoRotate": false,
                            "autoRotateDirection": "cw",
                            "autoRotateSpeed": 10,
                            "autoRotateAfterStill": 3,
                            "damping": 0.8,
                            "rotateSensitivity": 1,
                            "zoomSensitivity": 1,
                            "panSensitivity": 0.5,
                            "panMouseButton": "left",
                            "rotateMouseButton": "right",
                            "minDistance": 40,
                            "maxDistance": 400,
                            "maxOrthographicSize": 400,
                            "minOrthographicSize": 20,
                            "center": [0, 0, 0],
                            "maxAlpha": 90
                        }
                    },
                    series: [{
                        type: 'lines3D',
                        coordinateSystem: 'geo3D',
                        effect: {
                            show: true
                        },
                        blendMode: 'lighter',
                        lineStyle: {
                            color: '#FFFF00',// '#00c7ff',
                            width: 4//width: 6
                        },
                        data: [],
                        silent: false
                    }],

                };
                this.chartView.setOption(option);
            },
            async initChartBase() {
                let theData = await  resUtil.getRes("map/china.json", {});
                var me = this;

                if (theData == null) {
                    console.log("获取地图数据失败!");
                }
                echarts.registerMap("china", theData);

            },
            /**
             * 加载数据
             * @param theDatas
             * @returns {Promise<void>}
             */
            async loadData(dataArgs) {
                var data = dataArgs || [];
                var theDataItems = [];
                let theFontSize = this.utils.htmlFontSize();
                var me=this;
                var option = this.chartView.getOption();
                option.series[0].data = [];
                var theColors = ['#FFFF00', '#00EAFF', '#EA00FF', '#00FF66', '#FF6799', '#F98B15', '#2C85FE'];//['#ff5555', '#ff8155', '#ffc955', '#cafd4f', '#4ffd5f', '#4ffdca', '#4fe2fd', '#4f99fd', '#3b4dff', '#644cdb']

                for (var i = 0; i < 10&&i<data.length; i++) {
                    var theItem = data[i];
                    var theToName = theItem.to;
                    var theFromName = theItem.from;
                    var theGpsFromPoint = GpsUtil.getByAreaName(theFromName);
                    if (!theGpsFromPoint) {
                        console.log('未找到坐标:' + theFromName);
                        continue;
                    }
                    var theGpsToPoint = GpsUtil.getByAreaName(theToName);
                    if (!theGpsToPoint) {
                        console.log('未找到坐标:' + theToName);
                        continue;
                    }
                    if (i < theColors.length) {
                        option.series[0].data.push({
                            name: theToName,
                            itemStyle: {
                                areaColor: theColors[i]
                            },
                            label: {
                                fontSize: me.utils.calSize(20, theFontSize)
                            }
                        });
                    }
                    else {
                        option.series[0].data.push({
                            name: '',
                            label: {
                                fontSize: me.utils.calSize(18, theFontSize)
                            }
                        });
                    }
                    //debugger;
                    theDataItems.push(
                        {
                            coords: [
                                theGpsFromPoint,
                                theGpsToPoint,

                            ],
                            value: theItem.value || theItem.num || 0,
                            lineStyle: {color: theColors[i < 10 ? i : 9]}
                        });
                }
                option.series[0].data = theDataItems;
                // this.chartView.clear();
                // debugger;
                this.chartView.setOption(option);
                var me = this;
                this.chartView.on('geoselectchanged', function (params) {
                    // debugger;
                    if (!params['handled']) {
                        params['handled'] = true;

                        // var theChartView = me.chartView;
                        // var theOption = theChartView.getOption();
                        // var theRegions = theOption.geo3D[0].regions;
                        // theRegions.map(m => {
                        //     m.itemStyle = {};
                        //     if (m.name == params.label) {
                        //         m.itemStyle.color = 'red';
                        //     }
                        // });
                        // theChartView.setOption(theOption);
                        me.onRegionChange(params.label);
                    }

                });

            }
        }
    }
</script>

<style lang='scss' scoped>
    .chart-panel {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
</style>
