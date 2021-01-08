import { mapState } from 'vuex'
import zoomData from '@/utils/zoomData'
let myMixin = {
    components: {},

    data () {
        return {
            isDebug: process.env.NODE_ENV === 'development',
            satellite: null, // 卫星图层
            normalLayer: null, // 标准图层
            isSatellite: process.env.NODE_ENV !== 'development', // 是不是卫星地图
            // isSatellite: true, // 是不是卫星地图
            theMap: null,
            defaultCenter: [113.292304, 22.87088], // 默认中心
            defaultZoom: 8,
            // markerObj: null,
            // infoWindow: {}, //信息窗体对象
            infoWindowNum: '', //
            infoWindowName: '', //
            showInfoWindow: false, // 是不是显示信息窗体
            mapStyle: 'amap://styles/4c9342fa8348902a654e5edeb8dc6c19',
            normalStyle: 'amap://styles/90e78a39a4c75b68d73f9cf7ba92aa2c',
            isRunning: false,

        }

    },
    computed: {
        ...mapState({
            pointType: state => {
                return state.pointType
            },
            pointStatus: state => {
                return state.pointStatus
            },
            postionName: state => {
                return state.postionName
            },
            postionID: state => {
                return state.postionID
            },
            city: state => {
                return state.city
            },
            tabName: state => {
                return state.tabName
            },
            markers: state => {
                return state.markers
            },
            infoWindowDom: state => {
                return state.infoWindowDom
            },
            infoWindow: state => {
                return state.infoWindow
            },
            postionType: state => {
                return state.postionType
            },
            isShowUAV: state => {
                return state.isShowUAV
            },
            showThreeD: state => {
                return state.showThreeD
            },
            showDialog: state => {
                return state.showDialog
            },
            showDialogHref: state => {
                return state.showDialogHref
            },

        }),
    },
    mounted () {
        window.defaultCenter = this.defaultCenter
        window.drawPositionMarker = this.drawPositionMarker
        window.closeClick = this.closeClick
        window.createInfoDom = this.createInfoDom
        window.closeInfo = this.closeInfo
    },
    methods: {
        async run() {
            var sec = this.isDebug?10:10
            while (true) {
                await this.utils.sleep(1000 * sec);
                if (this.isRunning) {
                    // debugger

                    this.init && this.init();
                }

            }

        },
        // 隐藏markers
        hideMarkers () {
            for (const marker of this.markers) {
                marker.hide()
            }
        },
        // 显示markers
        showMarkers () {
            for (const marker of this.markers) {
                marker.show()
            }
        },

        // 处理 移动到地点
        handleMoveToPoint (me, obj) {
            window.isFloor = false
            // debugger

            let arg = obj.lnglat
            let user_cnt = obj.user_cnt
            let theLnglat = obj.lnglat
            let postion_id = obj.postion_id
            let postion_name = obj.postion_name
            let theZoom = zoomData[postion_name] || 17
            let city = obj.city
            let postion_type = obj.postion_type
            let lv = obj.lv
            // debugger
            me.$store.dispatch('city', city)
            me.$store.dispatch('postionID', postion_id)
            me.$store.dispatch('postionName', postion_name)
            me.$store.dispatch('postionType', postion_type)
            me.$store.dispatch('tabName', '')
            me.$store.dispatch('showThreeD', false)

            me.infoWindowName = postion_name // 信息窗体的名字
            window.postionName = postion_name
            me.infoWindowNum = user_cnt
            // debugger
            $('#DivButton').empty(); // 清空楼层按钮
            window.pointControl.MoveToPoint(arg, theZoom)
            // window.traffic.drawTheRectangle(obj.rectData)
            window.mapbase.drawReli(postion_name, user_cnt || 800,'',lv.level)
            if (postion_name === '广州白云国际机场') {
                window.drawT2Reli('广州白云机场T2航站楼','广州白云机场T2航站楼',user_cnt)
            }
            // var position = new AMap.LngLat(theLnglat[0], theLnglat[1]);
            // let theDom = me.createInfoDom(obj)
            // me.drawPositionMarker(position, theDom)
            me.$emit('update:isOverView', false)
            this.hideMarkers()
        },
        // 切换卫星/标准 地图
        // clickSWBtn () {
        //     if (this.isSatellite) {
        //         this.theMap.remove(this.satellite)
        //         // this.theMap.add(this.normalLayer)
        //         // window.theMap.setMapStyle('amap://styles/whitesmoke');
        //         // debugger
        //         this.isSatellite = false
        //     } else {
        //         this.theMap.add(this.satellite)
        //         // this.theMap.remove(this.normalLayer)
        //         this.isSatellite = true
        //     }
        // },
        // 关闭窗体
        closeInfo () {
            window.infoWindow.close()
            // this.showInfoWindow = false
        },
        // 画地图 枢纽的人数框
        drawPositionMarker (pos, dom, isVue = false) {
            // console.log(1111)
            // this.showInfoWindow = true
            let me = null
            if (isVue) {
                me = this
            } else {
                me = window
            }
            // this.markerObj = this.infoWindowObj
            // debugger
            let content = dom
            // debugger
            // 创建 infoWindow 实例
            // window.infoWindow = this.infoWindow = new AMap.InfoWindow({
            let infoWindow = me.infoWindow = new AMap.InfoWindow({
                content: content, //传入 dom 对象，或者 html 字符串
                isCustom: true, //使用自定义窗体
            });
            if (isVue) {
                me.$store.dispatch('infoWindow', infoWindow)
            }
            me.infoWindow.open(window.theMap, pos);
        },
        // 信息窗体的dom 创建
        createInfoDom (data, floorName) {
            // debugger
            let theDom = `<div class="theInfoWindow bgi color-white">
		<div class="flex" style="padding-bottom: 6px;">
			<div></div>
			<div class="fs_20">${floorName||data.postion_name}</div>
		</div>
		<div></div>
		<div class="flex fs_16">
			<div v-else>${floorName?'当前楼层人数:':'当前场站人数:'}</div>
			<div style="margin-left: 10px;">${data.user_cnt}</div>
			<div>人</div>
		</div>
		<p id="closeInfo" class="delect bgi csp" onclick="window.theMap.clearInfoWindow();"></p>

	</div>`

            return theDom
        }
    },
    watch: {
        postionName (n, o) {
            this.init && this.init()
        },
        isSatellite (n, o) {
            if (n) {
                this.theMap.add(this.satellite)
                this.theMap.setMapStyle(this.normalStyle);
                window['bridgeLine'] && window['bridgeLine'].show()
                if (window.pageName === 'jtsn') {
                    this.theMap.add(window.roadNet)
                }
            } else {
                this.theMap.setMapStyle(this.mapStyle);
                this.theMap.remove(this.satellite)
                // debugger
                window['bridgeLine'] && window['bridgeLine'].hide()
                if (window.pageName === 'jtsn') {
                    this.theMap.remove(window.roadNet)
                }
            }
        }
    }
}

export default myMixin