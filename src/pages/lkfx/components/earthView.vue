<template>
    <div ref="chartView" class="chart-panel"></div>
</template>

<script>
    import echarts from 'echarts';
    import 'echarts-gl-jian';
    import resUtil from '../../../utils/resUtil';
    import countryGps from '../../../utils/countryGps';

    export default {
        name: 'earth',

        mixins: [],

        components: {},

        props: {
            data: {type: [Array, String, Number]},
            type:[String, Number]
        },

        data() {
            return {
                countryMap: {}
            }
        },

        computed: {},

        watch: {
            async data(newData, oldData) {
                this.loadData(newData);
            }
        },

        created() {
        },

        async mounted() {
            this.initLanuage();
            this.initData();
            this.initChart();

        },

        destroyed() {
        },

        methods: {
            /**
             * 图形大小更改
             * */
            async refresh() {
                this.chartView.resize();
            },
            async initLanuage() {
                var theCountryEnNames = "Andorra,United Arab Emirates,Afghanistan,Antigua and Barbuda,Anguilla,Albania,Armenia,Netherlands Antilles,Angola,Antarctica,Argentina,American Samoa,Austria,Australia,Aruba,Azerbaijan,Bosnia and Herzegovina,Barbados,Bangladesh,Belgium,Burkina Faso,Bulgaria,Bahrain,Burundi,Benin,Bermuda,Brunei,Bolivia,Brazil,Bahamas,Bhutan,Bouvet Island,Botswana,Belarus,Belize,Canada,Cocos [Keeling] Islands,Congo [DRC],Central African Republic,Congo [Republic],Switzerland,Côte d'Ivoire,Cook Islands,Chile,Cameroon,China,Colombia,Costa Rica,Cuba,Cape Verde,Christmas Island,Cyprus,Czech Republic,Germany,Djibouti,Denmark,Dominica,Dominican Republic,Algeria,Ecuador,Estonia,Egypt,Western Sahara,Eritrea,Spain,Ethiopia,Finland,Fiji,Falkland Islands [Islas Malvinas],Micronesia,Faroe Islands,France,Gabon,United Kingdom,Grenada,Georgia,French Guiana,Guernsey,Ghana,Gibraltar,Greenland,Gambia,Guinea,Guadeloupe,Equatorial Guinea,Greece,South Georgia and the South Sandwich Islands,Guatemala,Guam,Guinea-Bissau,Guyana,Gaza Strip,Hong Kong,Heard Island and McDonald Islands,Honduras,Croatia,Haiti,Hungary,Indonesia,Ireland,Israel,Isle of Man,India,British Indian Ocean Territory,Iraq,Iran,Iceland,Italy,Jersey,Jamaica,Jordan,Japan,Kenya,Kyrgyzstan,Cambodia,Kiribati,Comoros,Saint Kitts and Nevis,North Korea,South Korea,Kuwait,Cayman Islands,Kazakhstan,Laos,Lebanon,Saint Lucia,Liechtenstein,Sri Lanka,Liberia,Lesotho,Lithuania,Luxembourg,Latvia,Libya,Morocco,Monaco,Moldova,Montenegro,Madagascar,Marshall Islands,Macedonia [FYROM],Mali,Myanmar [Burma],Mongolia,Macau,Northern Mariana Islands,Martinique,Mauritania,Montserrat,Malta,Mauritius,Maldives,Malawi,Mexico,Malaysia,Mozambique,Namibia,New Caledonia,Niger,Norfolk Island,Nigeria,Nicaragua,Netherlands,Norway,Nepal,Nauru,Niue,New Zealand,Oman,Panama,Peru,French Polynesia,Papua New Guinea,Philippines,Pakistan,Poland,Saint Pierre and Miquelon,Pitcairn Islands,Puerto Rico,Palestinian Territories,Portugal,Palau,Paraguay,Qatar,Réunion,Romania,Serbia,Russia,Rwanda,Saudi Arabia,Solomon Islands,Seychelles,Sudan,Sweden,Singapore,Saint Helena,Slovenia,Svalbard and Jan Mayen,Slovakia,Sierra Leone,San Marino,Senegal,Somalia,Suriname,São Tomé and Príncipe,El Salvador,Syria,Swaziland,Turks and Caicos Islands,Chad,French Southern Territories,Togo,Thailand,Tajikistan,Tokelau,Timor-Leste,Turkmenistan,Tunisia,Tonga,Turkey,Trinidad and Tobago,Tuvalu,Taiwan,Tanzania,Ukraine,Uganda,U.S. Minor Outlying Islands,United States,Uruguay,Uzbekistan,Vatican City,Saint Vincent and the Grenadines,Venezuela,British Virgin Islands,U.S. Virgin Islands,Vietnam,Vanuatu,Wallis and Futuna,Samoa,Kosovo,Yemen,Mayotte,South Africa,Zambia,Zimbabwe".split(',');
                var theCountryCnNames = "安道尔，阿拉伯联合酋长国，阿富汗，安提瓜和巴布达，安圭拉，阿尔巴尼亚，亚美尼亚，荷属安的列斯群岛，安哥拉，南极洲，阿根廷，美属萨摩亚，奥地利，澳大利亚，阿鲁巴，阿塞拜疆，波斯尼亚和黑塞哥维那，巴巴多斯，孟加拉国，比利时，布基纳法索，保加利亚，巴林，布隆迪，贝宁，百慕大，文莱，玻利维亚，巴西，巴哈马，不丹，布维岛，博茨瓦纳，白俄罗斯，伯利兹，加拿大，科科斯[基林]群岛，刚果[刚果民主共和国]，中非共和国，刚果[共和国] ]，瑞士，科特迪瓦，库克群岛，智利，喀麦隆，中国，哥伦比亚，哥斯达黎加，古巴，佛得角，圣诞岛，塞浦路斯，捷克共和国，德国，吉布提，丹麦，多米尼克，多米尼加共和国，阿尔及利亚，厄瓜多尔，爱沙尼亚，埃及，西撒哈拉，厄立特里亚，西班牙，埃塞俄比亚，芬兰，斐济，福克兰群岛[Islas Malvinas]，密克罗尼西亚，法罗群岛，法国，加蓬，英国，格林纳达，格鲁吉亚，法属圭亚那，根西岛，加纳，直布罗陀，格陵兰，冈比亚，几内亚，瓜德罗普岛，赤道几内亚，希腊，南乔治亚岛和南桑威奇群岛，危地马拉，关岛，几内亚比绍，圭亚那，加沙地带，香港，赫德岛和麦克唐纳群岛，洪都拉斯，克罗地亚，海地，匈牙利，印度尼西亚，爱尔兰，以色列，马恩岛，印度，英属印度洋领地，伊拉克，伊朗，冰岛，意大利，泽西岛，牙买加，约旦，日本，肯尼亚，吉尔吉斯斯坦，柬埔寨，基里巴斯，科摩罗，圣基茨和尼维斯，朝鲜，韩国，科威特，开曼群岛，哈萨克斯坦，老挝，黎巴嫩，圣卢西亚，列支敦士登，斯里兰卡，利比里亚，莱索托，立陶宛，卢森堡，拉脱维亚，利比亚，摩洛哥，摩纳哥，摩尔多瓦，黑山，马达加斯加，马绍尔群岛，马其顿[前南斯拉夫马其顿]，马里，缅甸[缅甸]，蒙古，澳门，北马里亚纳群岛，马提尼克岛，毛里塔尼亚，蒙特塞拉特，马耳他，毛里求斯，马尔代夫，马拉维，墨西哥，马来西亚，莫桑比克，纳米比亚，新喀里多尼亚，尼日尔，诺福克岛，尼日利亚，尼加拉瓜，荷兰，挪威，尼泊尔，瑙鲁，纽埃，新西兰，阿曼，巴拿马，秘鲁，法属波利尼西亚，巴布亚新几内亚，菲律宾，巴基斯坦，波兰，圣皮埃尔和密克隆，皮特凯恩群岛，波多黎各，巴勒斯坦领土，葡萄牙，帕劳，巴拉圭，卡塔尔，留尼旺，罗马尼亚，塞尔维亚，俄罗斯，卢旺达a，沙特阿拉伯，所罗门群岛，塞舌尔，苏丹，瑞典，新加坡，圣赫勒拿，斯洛文尼亚，斯瓦尔巴和扬马延，斯洛伐克，塞拉利昂，圣马力诺，塞内加尔，索马里，苏里南，圣多美和普林西比，萨尔瓦多，叙利亚，斯威士兰，特克斯和凯科斯群岛，乍得，法属南部领土，多哥，泰国，塔吉克斯坦，托克劳，东帝汶，土库曼斯坦，突尼斯，汤加，土耳其，特立尼达和多巴哥，图瓦卢，台湾，坦桑尼亚，乌克兰，乌干达，美国小型离岛，美国，乌拉圭，乌兹别克斯坦，梵蒂冈城，圣文森特和格林纳丁斯，委内瑞拉，英属维尔京群岛，美国。维尔京群岛，越南，瓦努阿图，瓦利斯和富图纳群岛，萨摩亚，科索沃，也门，马约特岛，南非，赞比亚，津巴布韦".split('，');
                var theCountryMap = {};
                //debugger;
                for (var i = 0; i < theCountryEnNames.length; i++) {
                    theCountryMap[theCountryEnNames[i]] = theCountryCnNames[i];
                    theCountryMap[theCountryCnNames[i]] = theCountryEnNames[i];
                }
                this.countryMap =  theCountryMap;
            },
            /***
             * 初始化地球
             */
            async initChart() {

                this.chartView = echarts.init(this.$refs.chartView);
                let theBaseChart = await this.initChartBase();
                var option = {
                    title: {
                        // text: 'Click on an area for more detail',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    //backgroundColor: '#333',
                    tooltip: {
                        show: true
                    },

                    globe: {
                        // baseTexture: "../imgs/earth_base.jpg",
                        baseTexture: "imgs/earth_hight.jpg",
                        heightTexture: "imgs/earth_hight.jpg",
                        shading: 'color',
                        label: {
                            show: true,
                        },
                        layers: [{
                            type: 'blend',
                            texture: theBaseChart
                        }],
                        // shading: 'lambert',
                        light: { // 光照阴影
                            main: {
                                color: '#fff', // 光照颜色
                                intensity: 1.2, // 光照强度
                                // shadowQuality: 'high', //阴影亮度
                                shadow: false, // 是否显示阴影
                                alpha: 40,
                                beta: 40
                            },
                            ambient: {
                                intensity: 0.5
                            }
                        },
                        emphasis: {
                            label: {
                                textStyle: {
                                    color: 'white',
                                }
                            },
                            itemStyle: {
                                color: '#3997d3'
                            },
                        },
                        viewControl: {
                            alpha: 30,
                            beta: 160,
                            targetCoord: [137.738529375, 34.1624556476964],
                            autoRotateSpeed: 15,
                            autoRotate: true,
                            autoRotateDirection: 'ccw',
                            autoRotateAfterStill: 10,
                            distance: 240,
                            zoomSensitivity: 0,
                            rotateSensitivity: [1, 0]
                        }
                    },
                    series: [{
                        name: 'lines3D',
                        type: 'lines3D',
                        coordinateSystem: 'globe',
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
                    },
                        //画点数据
                        // {
                        //     type: 'scatter3D',
                        //     coordinateSystem: 'globe',
                        //     blendMode: 'lighter',
                        //     symbolSize: 20,
                        //     // symbol:'roundRect',
                        //     itemStyle: {
                        //         color: 'transparent',
                        //         borderWidth: 8,
                        //         borderColor: 'yellow',
                        //         opacity: 1
                        //     },
                        //     data: [[113.4655810000, 22.6850440000, 0]]
                        // },
                        // {
                        //     name: '弱',
                        //     type: 'scatterGL',
                        //     progressive: 1e6,
                        //     coordinateSystem: 'globe',
                        //     symbolSize: 10,
                        //     zoomScale: 0.002,
                        //     blendMode: 'lighter',
                        //     large: true,
                        //     itemStyle: {
                        //         color: 'rgb(20, 15, 2)'
                        //     },
                        //     postEffect: {
                        //         enable: true
                        //     },
                        //     silent: true,
                        //     dimensions: ['lng', 'lat'],
                        //     data: [[113.4655810000,22.6850440000]]
                        // }
                    ]
                };
                this.chartView.setOption(option);
                this.loadData(this.data);
            },
            /**
             * 初始化地图基图
             */
            async initChartBase() {
                let theData = await  resUtil.getRes("map/world.json", {});
                var me = this;
                theData.features.map(m => {
                    var theName = "";
                    if (m.properties && m.properties.name) {
                        theName = m.properties.name.trim();
                    }
                    if (theName && me.countryMap[theName]) {
                        m.properties.name = me.countryMap[theName];
                    }
                });
                if (theData == null) {
                    console.log("获取地图数据失败!");
                }
                echarts.registerMap("world", theData);
                var canvas = document.createElement('canvas');
                var mapChart = echarts.init(canvas, null, {
                    width: 4096,
                    height: 2048
                });
                mapChart.setOption({
                    backgroundColor: 'transparent',// '#183363',//'rgba(44,75,138,0.8)',//#2c4b8a
                    series: [{
                        type: 'map',
                        map: 'world',

                        // 绘制完整尺寸的 echarts 实例
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        hoverable: false,//点击不反应
                        itemStyle: {
                            normal: {
                                //areaColor: '#0040a3',
                                //borderColor: '#49ffff'
                                //areaColor: '#0040a3',
                                //borderColor: '#49ffff'
                                borderColor: '#49ffff',// 'rgba(100,149,237,1)',
                                areaColor: 'transparent',// '#3997d3',//'#2b7ecc',
                                borderWidth: 1,
                                areaStyle: {
                                    color: 'transparent',//'#2b7ecc'
                                },
                                label: {
                                    show: true,
                                    color: 'white'
                                }
                            },

                        },
                        emphasis: {
                            label: {
                                textStyle: {
                                    color: 'white',
                                }
                            },
                            itemStyle: {
                                borderColor: '#49ffff',// 'rgba(100,149,237,1)',
                                areaColor: 'transparent',// '#3997d3',//'#2b7ecc',
                                borderWidth: 1,
                                areaStyle: {
                                    color: 'transparent',// '#2b7ecc'
                                },
                                label: {
                                    show: true,
                                    color: 'white'
                                },
                                /*normal: {
                                    //areaColor: '#0040a3',
                                    //borderColor: '#49ffff'
                                    //areaColor: '#0040a3',
                                    //borderColor: '#49ffff'
                                    borderColor: '#49ffff',// 'rgba(100,149,237,1)',
                                    areaColor: '#3997d3',//'#2b7ecc',
                                    borderWidth: 1,
                                    areaStyle: {
                                        color: '#2b7ecc'
                                    },
                                    label: {
                                        show: true,
                                        color: 'white'
                                    }
                                },*/
                            },
                        },
                        boundingCoords: [
                            [-180, 90],
                            [180, -90]
                        ]
                    }]
                });
                return mapChart;
            },

            async initData() {
                var theCountryPoints = countryGps.getPoints();
                var theCountryGps = {};
                for (var i = 0; i < theCountryPoints.length; i++) {
                    var theItem = theCountryPoints[i];
                    theCountryGps[this.countryMap[theItem.name]] = [theItem.longitude, theItem.latitude];
                }
                this.theCountryGps = theCountryGps;
            },
            async loadData(datas) {
                this.render(datas);
            },
            /***
             * 刷新展示信息
             * @param data
             */
            async render(theData) {

                var data=(theData||[]).slice(0,8);
                var theCountryGps = this.theCountryGps;
                var theCountryMap = this.countryMap;
                data = data || [];
                var theData = [];
                var theOptions = this.chartView.getOption();
               if(!theOptions){
                   return;
               }
               // debugger;
                theOptions.series[0].data = [];
                var theColors = ['#FFFF00','#00EAFF','#EA00FF','#00FF66','#FF6799','#F98B15','#2C85FE'];//['#ff5555', '#ff8155', '#ffc955', '#cafd4f', '#4ffd5f', '#4ffdca', '#4fe2fd', '#4f99fd', '#3b4dff', '#644cdb']
                /*['#faeebe','#bcb9e7','#20e3df','#acebd5','#6fc1dc',
            '#fdb269','#ff8c83','#c3ff76','#f7fe86','#8398fe'];// ['rgb(132, 187, 45)', 'orange', 'yellow', 'lime', 'aqua'];*/
                for (var i = 0; i < data.length; i++) {
                    var theItem = data[i];

                    var theMap = {"美国和加拿大": "美国"};
                    var theToName = theMap[theItem.to] || theItem.to;
                    var theFromName =theMap[theItem.from] || theItem.from;
                    if (!theCountryGps[theFromName]) {
                        console.log('未找到坐标:' + theFromName);
                        continue;
                    }
                    if (!theCountryGps[theToName]) {
                        console.log('未找到坐标:' + theToName);
                        continue;
                    }
                    if (i < theColors.length) {
                        theOptions.series[0].data.push({
                            name: theCountryMap[theToName],
                            itemStyle: {
                                areaColor: theColors[i]
                            },
                            label: {
                                fontSize: 20
                            }
                        });
                        if (theToName == '美国') {
                            theOptions.series[0].data.push({
                                name: theCountryMap['加拿大'],
                                itemStyle: {
                                    areaColor: theColors[i]
                                },
                                label: {
                                    fontSize: 20
                                }
                            });
                        }
                    }
                    else {
                        theOptions.series[0].data.push({
                            name: theCountryMap[theToName],
                            /* itemStyle: {
                                 areaColor: theColors[i]
                             },*/
                            label: {
                                fontSize: 18
                            }
                        });
                        if (theToName == '美国') {
                            theOptions.series[0].data.push({
                                name: theCountryMap['加拿大'],
                                /*itemStyle: {
                                    areaColor: theColors[i]
                                },*/
                                label: {
                                    fontSize: 18
                                }
                            });
                        }
                    }
                    //debugger;
                    theData.push(
                        {
                            coords: [
                                 theCountryGps[theFromName],
                                theCountryGps[theToName],

                            ],
                            value: theItem.value || theItem.num || 0,
                            lineStyle: {color: theColors[i < 10 ? i : 9]}
                        });
                }
                theOptions.series[0].data = theData;
                // this.chartView.clear();
                this.chartView.setOption(theOptions);
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