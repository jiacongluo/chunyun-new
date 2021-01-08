<template>
    <div class="map-box-outer2 full-div" v-if="isInit">
        <div :class="['map-box-outer', {'map-box-outer-s': !isOverView}]">
            <mapBox
                v-show="!showThreeD"
                :isOverView.sync="isOverView"
                :stationList="stationList"
                :terminalInfoList="terminalInfoList"></mapBox>

            <!--模型-->
            <div class="ddd-box" v-show="showThreeD" v-if="!isDebug && postionName==='广州白云国际机场'">
                <iframe class="ddd-iframe" src="airport/index.html" frameborder="0"></iframe>
            </div>
        </div>

        <!--搜索框-->
        <div :class="['box', 'box5', {'ovPos': !isOverView}]">
            <OVSearchBox
                :terminalInfoList="terminalInfoList"
                :isOverView.sync="isOverView"></OVSearchBox>
        </div>
        <!--总览 开始-->
        <div v-if="isOverView">
            <!--左切换box-->
            <div class="box box1">
                <OVLeftTabBox
                    :terminalInfoList="terminalInfoList"
                    :stationList="stationList"
                    :isOverView.sync="isOverView"
                    v-if="stationList.length"></OVLeftTabBox>
            </div>
            <!--近7天曲线图-->
            <div class="box box2" style="display: none">
                <div class="box-title">
                    <div class="box-title-icon box-title-icon1 bgi"></div>
                    <div>发送旅客量</div>
                </div>
                <div class="box2-wrap">
                    <OVChart1 :id="1"></OVChart1>
                </div>
            </div>
            <!--本日投入总班次数量图-->
            <!--<div class="box box3">-->
                <!--<div class="box-title">-->
                    <!--<div class="box-title-icon box-title-icon2 bgi"></div>-->
                    <!--<div>本日投入总班次数量</div>-->
                <!--</div>-->
                <!--<div class="box2-wrap">-->
                    <!--<OVChart2></OVChart2>-->
                <!--</div>-->
            <!--</div>-->
            <!--拥挤适中舒适 框-->
            <div class="box4-ul">
                <OVBox4Ul :terminalInfoList="terminalInfoList"></OVBox4Ul>
            </div>
        </div>
        <!--总览 结束-->

        <!--具体枢纽 开始-->
        <div class="full-div pen shuniu" v-else>
            <!--左边部分-->
            <div class="shuniu-l pen">
                <!--返回-->
                <div class="shuniu-l-back cp bgi" @click="backToDefault">
                    <span>{{postionName||''}}</span>
                    <div class="line"></div>
                    <div class="icon bgi"></div>
                </div>
                <!--天气-->
                <!--<weatherBox></weatherBox>-->
                <div class="wbbox">
                    <weatherBox2></weatherBox2>
                </div>
                <!--实时人数的框-->
                <OVBoxUl :id="3"></OVBoxUl>

                <!--左tab框-->
                <ul class="shuniu-l-tab" v-if="showShuNiuTab">
                    <li :class="['bgi', 'cp', {'active': item.active&&tabName},item.extCls?item.extCls:'']"
                        @click="clickTab(item.name,item.extCls)"
                        v-for="(item,index) in shuniuTabList" :key="index"
                    v-if="item.show">
                        <i :class="[item.cls, 'bgi']"></i>
                        <div class="name" v-if="item.name==='紧急通话'">
                            <a href="SmartOneClient://">{{item.name}}</a>
                        </div>
                        <div class="name" v-else>{{item.name}}</div>
                        <!--实时监控-->
                        <div :class="['cam-box',{'db': tabName==='实时监控'}]" v-if="item.name==='实时监控'">
                            <div class="cam-box-line bgi"></div>
                            <ul class="cam-box-inner">
                                <li v-for="(item,index) in videoData" :key="index"
                                    :class="[{'active':activeCam===index}]"
                                    v-if="item['地点'] === postionName"
                                    @click="clickCam($event, index,item)">
                                    <i class="bgi"></i>
                                    <span>{{item['监控点名称']}}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <!--左边 底部部分-->
                <div class="shuniu-l-btm" v-if="tabName && tabName!=='靶向短信' && tabName!=='实时监控' && tabName!=='3D模型' && tabName!=='紧急通话'">
                    <BtmChartBox></BtmChartBox>
                </div>

                <!--&lt;!&ndash;3d模型&ndash;&gt;-->
                <!--<div class="ddd-box" v-show="showThreeD">-->
                    <!--<iframe class="ddd-iframe" src="airport/index.html" frameborder="0"></iframe>-->
                <!--</div>-->
            </div>

            <!--右边部分-->
            <div class="data-box pea">
                <div class="data-box-header">
                    <div class="data-box-header-l">
                        <div :class="['cp', 'header-item', 'active']">
                            <i class="i1"></i>
                            <span>客流洞察</span>
                        </div>
                    </div>
                    <div class="data-box-header-r">
                        <datePicker :range="false" :datePickerType="'date'"></datePicker>
                    </div>
                </div>

                <div class="data-box-box1-outer">
                    <box1ChartBox></box1ChartBox>
                </div>

                <div class="data-box-title-box">
                    <div class="data-box-title linear-border">
                        <i class="icon icon1"></i>
                        <span>旅客画像</span>
                    </div>
                </div>
                <div class="data-box-box2">
                    <box2Chart></box2Chart>
                </div>

                <div class="data-box-box3-outer">
                    <!--<div class="data-box-box3" v-for="(item,index) in dataBoxBox3" :key="index">-->
                        <!--<div class="data-box-title-box">-->
                            <!--<div class="data-box-title linear-border">-->
                                <!--<i class="icon icon2"></i>-->
                                <!--<span>{{item.name}}</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="data-box-box3-inner">-->
                            <!--<div class="full-div">-->
                                <!--<originChart :shengNei="item.num"></originChart>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="data-box-box3">
                        <box3ChartBox></box3ChartBox>
                    </div>
                </div>

                <div class="data-box-box4-outer">
                    <div class="bgi data-box-box4-inner">
                        <!--<box4ChartBox></box4ChartBox>-->
                        <box6ChartBox></box6ChartBox>
                    </div>
                </div>


                <div class="data-box-title-box">
                    <div class="data-box-title linear-border">
                        <i class="icon icon3"></i>
                        <span>客流趋势</span>
                    </div>
                </div>
                <div class="data-box-box5-outer">
                    <div class="bgi data-box-box5-inner">
                        <box5ChartBox></box5ChartBox>
                    </div>
                </div>

            </div>
        </div>
        <!--具体枢纽 结束-->


		<!-- 靶向短信iframe -->
		<div id="openframe" v-show="showFrame">
			<frame @clean="cleanIt" @draw="startDraw($event)" :drawInfo="drawObj" :drawMethods="drawType" @close="this.closeNote"></frame>
		</div>

		<!-- 靶向结束 -->

    </div>

</template>

<script>
import { getData }from '@/utils/core/http'
import station2018 from '@/utils/station2018'
import placePointData from '@/utils/placePointData'
import OVChart1 from './OVChart1'
import OVChart2 from './OVChart2'
import mapBox from './mapBox'
import OVSearchBox from './OVSearchBox'
import OVLeftTabBox from './OVLeftTabBox'
import OVBox4Ul from './OVBox4Ul'
import OVBoxUl from './OVBoxUl'
import datePicker from '@/components/datePicker'
import box5ChartBox from './box5ChartBox'
import box1ChartBox from './box1ChartBox'
import box2Chart from './box2Chart'
import box3ChartBox from './box3ChartBox'
import box4ChartBox from './box4ChartBox'
import box6ChartBox from './box6ChartBox'
import BtmChartBox from './BtmChartBox'
import weatherBox from './weatherBox'
import weatherBox2 from '@/components/weatherBox2'
import mapMixin from '@/utils/mapMixin'
import myMixin from '@/utils/myMixin'
import Marker2 from '@/components/marker.vue'
import frame from '@/components/frame.vue'
import videoData from '@/utils/videoData'
import moment from 'moment'
import airportUtil from '@/utils/airportUtil'

export default {
    name: '',

    mixins: [mapMixin,myMixin],

    components: {OVChart1,OVChart2,mapBox,
        OVSearchBox,
        OVBox4Ul,
        OVBoxUl,
        datePicker,
        box5ChartBox,
        box1ChartBox,
        box2Chart,
        box4ChartBox,
        BtmChartBox,
        weatherBox,
        weatherBox2,
        box3ChartBox,
        OVLeftTabBox,
        Marker2,
		frame,
        box6ChartBox
		},

    props: {

    },

    data () {
        return {
			drawType: 0, //选择画图的形状
			drawObj: [], //图形坐标点数组
			mapObj: '', //地图画的对象
			showFrame:false,
            isInit: false,
            lvObj: {
                '拥挤': 'yongji',
                '适中': 'shizhong',
                '舒适': 'shushi'
            },
            stationList: [],
            terminalInfoList: [],
            isOverView: true, // 是不是总览
            shuniuTabList: [
                {
                    name: '列车趋势',
                    icon: require('../assets/lefttab/归属分析_icon@2x.png'),
                    cls: 'icon1',
                    active: false,
                    show:false,
                    key: '铁路'
                },
                {
                    name: '列车表',
                    icon: require('../assets/lefttab/列车表@2x.png'),
                    cls: 'icon2',
                    active: false,
                    show:false,
                    key: '铁路'
                },
                {
                    name: '航班趋势',
                    icon: require('../assets/lefttab/归属分析_icon@2x.png'),
                    cls: 'icon1',
                    active: false,
                    show:false,
                    key: '机场'
                },
                {
                    name: '航班表',
                    icon: require('../assets/lefttab/列车表@2x.png'),
                    cls: 'icon2',
                    active: false,
                    show:false,
                    key: '机场'
                },
                {
                    name: '实时监控',
                    icon: require('../assets/lefttab/监控@2x.png'),
                    cls: 'icon3',
                    active: false,
                    show:true


                },
                // {
                //     name: '协调联动',
                //     icon: require('../assets/lefttab/协调联动@2x.png'),
                //     cls: 'icon4',
                //     active: false,
                //     show:true
                // },
                /*{
                    name: '紧急通话',
                    icon: require('../assets/lefttab/协调联动@2x.png'),
                    cls: 'icon4',
                    active: false,
                    show:true
                },*/
                {
                    name: '靶向短信',
                    icon: require('../assets/lefttab/靶向短信@2x.png'),
                    cls: 'icon5',
                    active: false,
                    show:true
                },
                {
                    name: '周边运力',
                    icon: require('../assets/lefttab/周边运力.png'),
                    cls: 'icon6',
                    active: false,
                    show:false


                },
                {
                    name: '应急预案',
                    icon: require('../assets/lefttab/应急预案.png'),
                    cls: 'icon7',
                    active: false,
                    show:false
                },
                {
                    name: '3D模型',
                    icon: require('../assets/lefttab/应急预案.png'),
                    cls: 'icon7',
                    active: false,
                    show:false
                },
            ],
            videoData: [],
            activeCam: -1,
            showShuNiuTab: false, // 显示 枢纽详情 左边的 tab切换
            // greyList: ["东莞站", "广州火车站", "惠州站", "深圳西站", "韶关站", "珠海站", "梅州火车站", "源潭火车站", "广州南站", "深圳北站", "虎门站", "汕尾站", "佛山西站", "东莞东", "武广清远站", "潮汕站", "广州北站", "广州东站", "深圳站", "汕头站"]
            greyList: []
        }
    },

    computed: {},

    watch: {
        id (n, o) {
            this.initEvent()
        },
        // 监控地图地点的改变
        async postionName (n, o) {
            this.changeShuNiuTab(false)
            let theType = ''
            let hasVideo = false
            for (const obj of this.terminalInfoList) {
                if (obj.postion_name === n) {
                    theType = obj.postion_type
                    hasVideo = obj.hasVideo
                }
            }
            // 没有监控的 隐藏 有就显示
            for (const shuniuTabListElement of this.shuniuTabList) {
                if (shuniuTabListElement.name === '实时监控') {
                    shuniuTabListElement.show = hasVideo
                }
            }
            // 周边运力隐藏显示
            debugger;
            if (n === '广州南站' || n === '广州火车站' || n === '广州东站' || n==='广州火车站'|| n=== '广州白云国际机场') {
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (shuniuTabListElement.name === '周边运力') {
                        shuniuTabListElement.show = true
                    }
                }
            } else {

                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (shuniuTabListElement.name === '周边运力') {
                        shuniuTabListElement.show = false
                    }
                }
            }

            // 应急预案显示隐藏
            if (n==='广州火车站') {
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (shuniuTabListElement.name === '应急预案') {
                        shuniuTabListElement.show = true
                    }
                }
            } else {
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (shuniuTabListElement.name === '应急预案') {
                        shuniuTabListElement.show = false
                    }
                }
            }
            // 3d模型 显示隐藏
            if (n==='广州白云国际机场') {
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (shuniuTabListElement.name === '3D模型') {
                        shuniuTabListElement.show = true
                    }
                }
            } else {
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (shuniuTabListElement.name === '3D模型') {
                        shuniuTabListElement.show = false
                    }
                }
            }

            // 显示隐藏列车表 列车趋势
            if (theType === '铁路') {
                // 显示列车趋势
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (!shuniuTabListElement.key) {
                        continue
                    }
                    if (shuniuTabListElement.name === '列车趋势') {
                        let hasTrendData =await this.hasTrendData()
                        // debugger
                        if (hasTrendData) {
                            shuniuTabListElement.extCls = ''
                        } else {
                            shuniuTabListElement.extCls = 'grey'
                            console.log(`${n}:没有列车趋势数据`)
                        }
                        shuniuTabListElement.show = true
                    }
                    if (shuniuTabListElement.name === '列车表') {
                        let hasTableData =await this.hasTableData(theType)
                        if (hasTableData) {
                            shuniuTabListElement.extCls = ''
                        } else {
                            shuniuTabListElement.extCls = 'grey'
                            console.log(`${n}:没有列车表数据`)
                        }
                        shuniuTabListElement.show = true
                    }
                }

            } else {
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (!shuniuTabListElement.key) {
                        continue
                    }
                    if (shuniuTabListElement.key === '铁路') {
                        shuniuTabListElement.show = false
                    }
                }
            }
                // 显示隐藏 航班表 航班趋势
            if (theType === '机场') {
                // debugger

                if (n !== '潮汕国际机场') { // 潮汕国际机场 隐藏 航班表 航班趋势
                    // debugger
                    // 显示航班趋势
                    for (const shuniuTabListElement of this.shuniuTabList) {
                        if (!shuniuTabListElement.key) {
                            continue
                        }


                        if (shuniuTabListElement.name === '航班趋势') {
                          if(/*n === '金湾机场' || n === '宝安国际机场' ||*/ n === '佛山沙堤机场' ){
                            shuniuTabListElement.show = false
                          }else{
                            shuniuTabListElement.show = true
                          }

                        }
                        if (shuniuTabListElement.name === '航班表') {
                            let hasTableData = await this.hasTableData(theType)
                            if (hasTableData) {
                                shuniuTabListElement.extCls = ''
                            } else {
                                shuniuTabListElement.extCls = 'grey'
                                console.log(`${n}:没有航班表数据`)
                            }

                          if(/*n === '金湾机场' || n === '宝安国际机场' || */n === '佛山沙堤机场' ){
                            shuniuTabListElement.show = false
                          }else{
                            shuniuTabListElement.show = true
                          }
                        }
                    }


                    // for (const shuniuTabListElement of this.shuniuTabList) {
                    //     if (!shuniuTabListElement.key) {
                    //         continue
                    //     }
                    //     if (shuniuTabListElement.key === '机场') {
                    //         shuniuTabListElement.show = true
                    //     }
                    // }
                } else {
                    // debugger

                    for (const shuniuTabListElement of this.shuniuTabList) {
                        if (!shuniuTabListElement.key) {
                            continue
                        }
                        if (shuniuTabListElement.key === theType) {
                            shuniuTabListElement.show = false
                        }
                    }
                }
            } else {
                // debugger
                for (const shuniuTabListElement of this.shuniuTabList) {
                    if (!shuniuTabListElement.key) {
                        continue
                    }
                    if (shuniuTabListElement.key === '机场') {
                        shuniuTabListElement.show = false
                    }
                }
            }
            this.changeShuNiuTab(true)
        },
    },

    created () {},

    mounted () {
      this.initEvent();
       // window['onRender'] = () => this.initEvent();
        // for (const argument of a) {
        //     console.log(argument.postion_name)
        // }
    },

    destroyed () {},

    methods: {
        // 显示 枢纽详情 左边的 tab切换
        changeShuNiuTab (bool) {
            this.showShuNiuTab = bool
        },
        // 判断 列车趋势/ 是否有数据
        async hasTrendData () {
            let postionName = this.postionName
            const url = `/api/gdcnymotOut/train/trend/${postionName}`
            try {
                let res=await getData(url, {})
                // 先判断是否有数
                let theData = res.data
                if (theData&&theData.sendTrendList&&theData.arrivalTrendList&&theData.sendTrendList.length&&theData.arrivalTrendList.length) {
                    let bool1, bool2;
                    bool1 = theData.sendTrendList.every((item,index,array) => {
                        return item.passenger <= 0
                    })
                    bool2 = theData.arrivalTrendList.every((item,index,array) => {
                        return item.passenger <= 0
                    })
                    // debugger
                    // 再判断是否全部小于等于0, 是则返回false 否则true
                    return !(bool1&&bool2)
                }
            } catch (e) {
                console.log(`请求列车趋势错误:${e}`)
            }
            return false
        },
        // 判断 列车表/航班表 是否有数据
        async hasTableData (type) {
            let postionName = this.postionName
            let url1 = ''
            let url2 = ''

            let theDay = this.curDate
            var nowHour = moment().format('HH');
            var afterHourNum = parseInt(nowHour) + 1;
            afterHourNum = afterHourNum < 10 ? '0' + afterHourNum : afterHourNum;

            var theDefaultTimeItem = nowHour + ':00-' + afterHourNum + ':00';
            let timeArr = theDefaultTimeItem.split('-')
            let startTime = timeArr[0].split(':')[0]
            let endTime = timeArr[1].split(':')[0]

            let startTime2 = theDay + ' ' + timeArr[0]
            let endTime2 = theDay + ' ' + timeArr[1]

            let params = {}
            let inOutKey = ''
            try {
                if (type === '铁路') { // 判断 有没有数据
                    url1 = `/api/gdcnymotOut/train/sfzInfo/${postionName}/${startTime}/${endTime}`
                    url2 = `/api/gdcnymotOut/train/zdzInfo/${postionName}/${startTime}/${endTime}`
                    // 顺序执行:
                    // let res1 = await getData(url1, params)
                    // let res2 = await getData(url2, params)

                    // 同时执行:
                    let [res1, res2] = await Promise.all([getData(url1, params),getData(url2, params)])
                    // console.log(res1,res2)
                    // debugger
                    if (res1.data.length&&res2.data.length) {
                        return true
                    }
                }
                if (type === '机场') {

                    url1 = `/api/air/flyList`
                    url2 = `/api/air/flyList`
                    if (postionName === '宝安国际机场') {
                        url1 = '/api/baoAnAirPort/baoAnFlyList'
                        url2 = '/api/baoAnAirPort/baoAnFlyList'
                    }
                    let airName = airportUtil.getCodeByName(postionName)

                    startTime = theDay + ' ' + timeArr[0]
                    endTime = theDay + ' ' + timeArr[1]
                    params = {
                        startTime: startTime2,
                        endTime : endTime2,
                        airName : airName,
                    }
                    let res1 = await getData(url1, params)
                    // console.log(res1)
                    // debugger
                    if (res1['data']['inList']&&res1['data']['outList']&&res1['data']['inList'].length&&res1['data']['outList'].length) {
                        return true
                    }
                }
            } catch (e) {
                console.log(`请求列车表/航班表错误:${e}`)
            }
            // debugger
            return false
        },
        // 点击摄像头
        clickCam (ev, idx, item) {
            ev.stopPropagation()
            // debugger
            this.activeCam =idx
            const origin = window.location.origin
            const path = window.location.pathname.split('/')[1]
            let url = 'SHWGOIE:'+ origin + '/' + path + '/video/?vid=' + item['编码']
            // debugger
            window.location.href = url
        },
		drawFinish() {
			// debugger
			this.showFrame = true
		},
		closeNote(){
			this.showFrame = false
            this.$store.dispatch('tabName', '') // 取消选中状态

        },
		startDraw(data){
			// this.map.remove(this.drawObj)
			// this.drawObj = []
			// debugger
			let mouseTool = new AMap.MouseTool(window.theMap)
			window.theMap.setZoom(14)
			if (data == 3) {
				this.drawPolygon(mouseTool, this)
				this.drawType = 3
			} else if (data == 2) {
				this.drawRectangle(mouseTool, this)
				this.drawType = 2
			} else if (data == 1) {
				this.drawCircle(mouseTool, this)
				this.drawType = 1
			}
		},
		cleanIt(){
			window.theMap.remove(this.mapObj)
		},
		//绘制多边形
		drawPolygon(tool, ts) {
			tool.polygon({
				strokeColor: "#FF33FF",
				strokeOpacity: 1,
				strokeWeight: 6,
				strokeOpacity: 0.2,
				fillColor: '#1791fc',
				fillOpacity: 0.4,
				// 线样式还支持 'dashed'
				strokeStyle: "solid",
				// strokeStyle是dashed时有效
				// strokeDasharray: [30,10],
			})
			tool.on('draw', function(event) {
				if (event.obj.getArea() < 1000000) {
					alert('圈选范围不得小于1平方公里')
					ts.cleanIt()
					return
				}
				// for (var i = 0; i < event.obj.getPath().length; i++) {
				// 	ts.drawObj.push(event.obj.getPath()[i])
				// }
				ts.mapObj = event.obj
				ts.drawObj = event.obj.getPath()
				// console.log(event.obj.getPath())

				// ts.area = event.obj.getArea()
				tool.close()
				ts.drawFinish()
			})
		},
		//绘制矩形
		drawRectangle(tool, ts) {
			tool.rectangle({
				strokeColor: 'red',
				strokeOpacity: 0.5,
				strokeWeight: 6,
				fillColor: 'blue',
				fillOpacity: 0.5,
				// strokeStyle还支持 solid
				strokeStyle: 'solid',
				// strokeDasharray: [30,10],
			})
			tool.on('draw', function(event) {
				ts.mapObj = event.obj
				// console.log(event.obj.getPath())
				if (event.obj.getArea() < 1000000) {
					alert('圈选范围不得小于1平方公里')
					ts.cleanIt()
					return
				}
				// debugger
				// for (var i = 0; i < event.obj.getPath().length; i++) {
				// 	ts.drawObj.push(event.obj.getPath()[i].)
				// }
				ts.drawObj = event.obj.getPath()
				// debugger
				// ts.area = event.obj.getArea()
				tool.close()
				ts.drawFinish()

			})
		},
		//绘制圆形
		drawCircle(tool, ts) {
			tool.circle({
				strokeColor: "#FF33FF",
				strokeOpacity: 1,
				strokeWeight: 6,
				strokeOpacity: 0.2,
				fillColor: '#1791fc',
				fillOpacity: 0.4,
				strokeStyle: 'solid',
				// 线样式还支持 'dashed'
				// strokeDasharray: [30,10],
			})
			tool.on('draw', function(event) {
				ts.mapObj = event.obj
				let r = event.obj.getRadius()
				ts.area = (r * r * Math.PI)
				if (ts.area < 1000000) {
					alert('圈选范围不得小于1平方公里')
					ts.cleanIt()
					return
				}
				let obj = {}
				ts.drawObj = []
				obj.radius = event.obj.getRadius()
				obj.center = event.obj.getCenter()
				// debugger
				ts.drawObj.push(obj)
				// debugger
				tool.close()
				ts.drawFinish()
			})
		},
        // 点击左边切换tab
        clickTab (name, extCls) {
            if (name === '列车趋势'||name === '列车表'||name === '航班表') {
                // return
                if (extCls === 'grey') {
                    return
                }
            }
            if (this.tabName === name) {
                if (name === '3D模型') {
                    this.$store.dispatch('showThreeD', false)
                }
                this.$store.dispatch('tabName', '')
                return
            }
            for (const shuniuTabListElement of this.shuniuTabList) {
                shuniuTabListElement.active = shuniuTabListElement.name === name
            }
            this.$store.dispatch('tabName', name)
            if (name === '靶向短信') {
				this.showFrame = true
            }
            if (name === '3D模型') {
                this.$store.dispatch('showThreeD', true)
            }
        },
        // 点击返回总览
        backToDefault () {
            window.theMap.setZoomAndCenter(this.defaultZoom, this.defaultCenter);
          // window.mapbase.removeReli();
            // window.mapbase.remove();
            this.$store.dispatch('tabName', '')
            this.isOverView = true
            this.$store.dispatch('showThreeD', false)
            this.showMarkers()
        },
        // 处理枢纽的数据
        handleData () {
            for (const argument of this.stationList) {
                if (argument.coordinate_x && argument.coordinate_y) {
                    argument['lnglat'] = [argument.coordinate_x, argument.coordinate_y] // 经纬度数组
                }
                if (argument.coordinate_xys) {
                    argument['rectData'] = JSON.parse(argument.coordinate_xys) // 画框的数组
                }
            }
            for (const terminalInfoListElement of this.terminalInfoList) {
                for (const argument of this.stationList) {
                    if (argument.postion_name === terminalInfoListElement.postion_name) {
                        terminalInfoListElement['lv'] = this.utils.calLv( // 拥挤级别
                            terminalInfoListElement['user_cnt']/argument['warning_high'],
                            // argument['warning_medium'],
                            // argument['warning_high']
                        )
                        terminalInfoListElement['lnglat'] = argument['lnglat'] // 经纬度
                        terminalInfoListElement['city'] = argument['city'] // 城市
                        terminalInfoListElement['userid'] = argument['userid'] //
                        terminalInfoListElement['orgid'] = argument['orgid'] //
                    }
                }
            }
            for (const terminalInfoListElement of this.terminalInfoList) {
                terminalInfoListElement['hasVideo'] = false
                if (terminalInfoListElement.postion_name === '广州白云国际机场') { // 把白云机场的人数传到top, 方便iframe获取
                    //top['theNum'] = terminalInfoListElement['user_cnt']
                  window.theNum = terminalInfoListElement['user_cnt']
                }
                for (const videoDatum of this.videoData) {
                    if (terminalInfoListElement.postion_name === videoDatum['地点']) { // 判断是否有实时监控数据
                        terminalInfoListElement['hasVideo'] = true
                        break
                    }
                }
            }
            window.terminalInfoList = this.terminalInfoList
        },
        async initEvent () {
            // debugger
            this.videoData = videoData

            try {
                await this.getStationList()
                await this.getTerminalInfoByType()
                // debugger
              this.handleData()
              this.isInit = true
            } catch (e) {
                console.log(e)
                // alert('请求出错, 请刷新再试')
                // window.location.reload()
            }

        },

        // 枢纽列表获取
        async getStationList () {
            const url = '/api/terminal/getPositionInfoList'
            const data = {
            }
            await getData(url, data).then((res) => {
                this.stationList = res.data
                // console.log(1)
            })
        },
        // 枢纽概览——查询 全部 类型的枢纽人数
        async getTerminalInfoByType () {
            // console.log(2)
            const url = '/api/terminal/getTerminalInfoByType'
            const data = {
                postionType: '全部'
            }
            await getData(url, data).then((res) => {
                this.terminalInfoList = res.data

            })
        }

    }
}
</script>

<style lang='scss' scoped>
	#openframe {
		width: 1920px;
		height: 1080px;
		position: fixed;
		/* pointer-events: none; */
		top: 0;
		left: 0;
		z-index: 111;
	}
    .map-box-outer2 {
        /*margin-left: 32px;*/
        position: relative;
        z-index: 10;
        /*width: 1832px;*/
        width: 100%;
        height: 100%;
        /*padding-top: 16px;*/
    }
    .map-box-outer {
        width: 100%;
        height: 100%;
    }
    .map-box-outer-s {
        width: 52%;
        height: 100%;
        position: relative;
    }
    .map-box {

    }

    .box {
        position: absolute;
        z-index: 10;

    }
    .box1 {
        width:457px;
        height:859px;
        background: url("../assets/bj@2x.png") no-repeat;
        background-size: 100% 100%;
        top: 89px;
        left: 45px;
    }
    .box2 {
        width:1318px;
        height:290px;
        /*left: 36px;*/
        right: 50px;
        bottom: 11px;
        background: url("../assets/曲线图背景@2x(1).png") no-repeat;
        background-size: 100% 100%;

    }
    .box3 {
        width:743px;
        height:290px;
        right: 70px;
        bottom: 11px;
        background: url("../assets/柱状图背景@2x.png") no-repeat;
        background-size: 100% 100%;

    }
    .box4 {
        width:172px;
        height:75px;
        /*background:rgba(4,22,69,0.8);*/
        /*border:1px solid rgba(100,178,255,1);*/
        background: url("../assets/拥挤底框@2x.png") no-repeat;
        background-size: 100% 100%;
        @include defaultFlex;
        padding: 22px 28px 23px 21px;
    }
    .box4-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .box4-ul-box {
        left: 523px;
        position: absolute;
        top: 18px;
        z-index: 10;
        display: flex;
    }

    .off-box {
        width:20px;
        height:20px;
        border:1px solid rgba(255,255,255,1);
        margin-right: 7px;
    }
    .on-box {
        width:20px;
        height:20px;
        background: url("../assets/功能选中@2x.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 7px;

    }
    .box4-name {
        font-size:18px;
        /*font-family:PingFangSC;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
    }
    .num-box {
        font-size: 16px;
        color: #ffffff;
        margin-left: 19px;
        /*font-family:Microsoft YaHei;*/
        /*line-height:60px;*/
        i {
            font-weight:bold;
            font-size:36px;
        }
    }
    .box-title {
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(254,254,254,1);
        /*line-height:60px;*/
        padding: 18px 0 10px 27px;
        display: flex;
    }
    .box-title-icon {
        width: 20px;
        height: 22px;
        /*background-color: #fff;*/
        margin-right: 8px;
    }
    .box-title-icon1 {
        background: url("../assets/实时客流_icon@2x(1).png") no-repeat;
    }
    .box-title-icon2 {
        background: url("../assets/实时客流_icon@2x(2).png") no-repeat;
    }
    .box2-wrap {
        width: 100%;
        height: 235px;
        position: relative;
        /*background-color: #fff;*/
    }

    .box5 {
        position: absolute;
        top: 20px;
        /*right: 177px;*/
        left: 46px;
        /*max-width: 426px;*/
        z-index: 11;
    }
    .box4-ul {
        /*left: 523px;*/
        right: 200px;
        position: absolute;
        top: 18px;
        z-index: 10;
    }

    .data-box {
        width: 904px;
        position: absolute;
        z-index: 10;
        background-color: #0C2449;
        right: 0;
        top: 0;
        height: 100%;
    }
    .ovPos {
        top: 9px;
        left: 318px;
    }
    .shuniu {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
    }
    .shuniu-l {
        width: 976px;
        height: 100%;
        position: relative;
    }

    .shuniu-l > * {
        pointer-events: auto;
        z-index: 10;
    }
    .shuniu-l-back {
        width: 224px;
        height: 40px;
        background-image: url("../assets/全省bg拷贝@2x.png");
        position: absolute;
        top: 9px;
        left: 38px;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        line-height: 40px;
        padding-left: 32px;
        /*display: flex;*/
        .icon {
            width: 19px;
            height: 15px;
            background-image: url("../assets/返回@2x.png");
            position: absolute;
            right: 7px;
            top: 13px;
        }
        .line {
            width:1px;
            height:21px;
            background:rgba(247,250,252,1);
            position: absolute;
            right: 33px;
            top: 10px;
        }
    }

    .shuniu-l-tab {
        /*top: 205px;*/
        top: 252px;
        left: 40px;
        position: absolute;
        font-size:16px;
        /*font-family:PingFang SC;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        z-index: 100;
        .name {
            white-space: nowrap;
            a {
                color:rgba(255,255,255,1);

            }
        }
        >li {
            margin-bottom: 21px;
            background-image: url("../assets/列车表选中底框@2x.png");
            padding: 0px 24px;
            display: flex;
            align-items: center;
            width: 142px;
            height: 45px;
            position: relative;
        }
        >li.active {
            width: 140px;
            background-image: url("../assets/列车趋势底框@2x.png");
            color: #000C2D;
        }
        .icon1 {
            margin-right: 7px;
            width: 22px;
            height: 17px;
            background-image: url("../assets/lefttab/归属分析_icon@2x.png");
        }
        .icon2 {
            margin-right: 11px;
            width: 19px;
            height: 16px;
            background-image: url('../assets/lefttab/列车表@2x.png');
        }
        .icon3 {
            margin-right: 9px;
            width: 18px;
            height: 22px;
            background-image: url('../assets/lefttab/监控@2x.png');
        }
        .icon4 {
            margin-right: 8px;
            width: 20px;
            height: 16px;
            background-image: url('../assets/lefttab/协调联动@2x.png');
        }
        .icon5 {
            margin-right: 9px;
            width: 17px;
            height: 17px;
            background-image: url('../assets/lefttab/靶向短信@2x.png');
        }
        .icon6 {
            margin-right: 7px;
            width: 19px;
            height: 16px;
            background-image: url('../assets/lefttab/周边运力.png');
        }
        .icon7 {
            margin-right: 6px;
            width: 19px;
            height: 17px;
            background-image: url('../assets/lefttab/应急预案.png');
        }
    }
    .shuniu-l-btm {
        left: 33px;
        bottom: 0px;
        position: absolute;
        z-index: 11;

    }
    .shuniu-l-btm-box {
        width: 925px;
        height: 256px;
        background-image: url('../assets/列车表底框@2x.png');

    }

    .data-box-header {
        width: 875px;
        height: 61px;
        background: url("../assets/客流洞察背景@2x.png") no-repeat;
        background-size: 100% 100%;
        padding-left: 17px;
        display: flex;
        justify-content: space-between;
    }
    .data-box-header-l {
        display: flex;
    }
    .data-box-header-r {
        padding: 10px 38px 0 0;
    }
    .header-item {
        width: 166px;
        height: 51px;
        /*background-color: #FFF;*/
        margin-right: 20px;
        margin-top: 13px;
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("../assets/默认框@2x.png");
        @include defaultFlex;
        i {
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-right: 7px;
        }
        .i1 {
            width: 24px;
            height: 16px;
            background-image: url("../assets/客流洞察_默认_icon1@2x.png");
        }
        .i2 {
            width: 20px;
            height: 20px;
            background-image: url("../assets/客流趋势_默认_iocn@2x.png");
        }

    }
    .header-item.active {
        background-image: url("../assets/选中框@2x.png");
        font-weight:bold;
        color:rgba(255,255,0,1);
        .i1 {
            background-image: url("../assets/客流洞察_选中_icon@2x.png");
        }
        .i2 {
            background-image: url("../assets/客流趋势_选中_icon@2x.png");
        }
    }

    .data-box-box1-outer {
        padding-left: 14px;
        margin-top: 7px;
    }
    .data-box-box1 {
        width: 827px;
        height: 116px;
        margin-bottom: 7px;
        background-image: url('../assets/客流监控背景@2x.png');
        display: flex;
        justify-content: space-between;
        padding-left: 18px;
        padding-right: 17px;
        align-items: center;
    }

    .data-box-box2 {
        height: 171px;
        width: 100%;
        /*background-color: #fff;*/
    }
    .data-box-box3-outer {
        padding-right: 55px;
        display: flex;
    }
    .data-box-box3 {
        width: 50%;
    }

    .data-box-title-box {
        padding-left: 20px;
        width: 100%;
        .icon {
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .icon1 {
            width: 24px;
            height: 19px;
            margin-right: 11px;
            background-image: url('../assets/旅客画像_icon@2x.png');
        }
        .icon2 {
            width: 26px;
            height: 18px;
            margin-right: 8px;
            background-image: url('../assets/洞察@2x.png');
        }
        .icon3 {
            width: 22px;
            height: 17px;
            margin-right: 8px;
            background-image: url('../assets/lefttab/归属分析_icon@2x.png');
        }
    }
    .data-box-title {
        width: 100%;
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(0,255,255,1);
        /*line-height:60px;*/
        border-bottom: 2px solid;
        display: flex;
        /*height: 48px;*/
        align-items: center;
        padding-bottom: 9px;
    }
    .pt20 {
        padding-top: 20px;
    }
    .data-box-box3-inner {
        /*height: 45px;*/
        width: 100%;
        /*background-color: #fff;*/
        padding-left: 20px;
    }
    .data-box-box4-inner {
        width: 838px;
        background-image: url('../assets/省内省外底框@.png');
        display: flex;
        padding: 7px 6px 0 7px;
    }

    .data-box-box4-outer {
        padding-left: 14px;
    }
    .data-box-box5-outer {
        padding-left: 14px;
    }
    .data-box-box5-inner {
        width: 838px;
        height: 256px;
        background-image: url('../assets/归属分析-icon@.png');
        padding: 7px 6px 0 7px;

    }
    .cam-box {
        display: none;
    }
    .cam-box-line {
        width: 27px;
        height: 7px;
        background-image: url('../assets/线.png');
        position: absolute;
        left: 136px;
        top: 14px;
        z-index: 11;
    }
    .cam-box-inner {
        width:212px;
        height:154px;
        background:rgba(12,48,129,0.8);
        border:1px solid #00C0FF;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        position: absolute;
        left: 160px;
        top: -59px;
        overflow-y: auto;
        li {
            width: 100%;
            height: 50px;
            padding-left: 20px;
            /*padding-right: 60px;*/
            display: flex;
            /*justify-content: space-between;*/
            align-items: center;
        }
        li.active {
            color: #000C2D;

        }
        li:hover {
            background-color: #009CFF;
            color: #000C2D;

        }
        i {
            min-width: 16px;
            height: 20px;
            margin-right: 9px;
            background-image: url('../assets/球机@2x.png');
        }
    }
    .ddd-box {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 9!important;
        left: 0;
        top: 0;
    }
    .ddd-iframe {
        width: 976px;
        height: 961px;
    }
    .wbbox {
        position: absolute;
        top: 171px;
        left: 40px;
    }
</style>
