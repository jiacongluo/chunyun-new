import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
Vue.use(Vuex)

var theT = 2 // t+1 那么就是1
function checkTime () {
    let curDate = new Date()
    let hour = curDate.getHours()
    let mins = curDate.getMinutes()
    return hour>14||hour>=14&&mins>=30
}
if (checkTime()) {
    theT = 1
}
const index = new Vuex.Store({
	state:{
	    curDate: moment().format('YYYY-MM-DD'),
        checkDate: moment().subtract(theT, 'day').format('YYYY-MM-DD'), // 交通场站/区域专题 日期
        checkDateQYZT: moment().subtract(2, 'day').format('YYYY-MM-DD'),
        dateRange: [moment().subtract(theT+6, 'day').format('YYYY-MM-DD'), moment().subtract(theT, 'day').format('YYYY-MM-DD')], // 交通场站/区域专题 日期
        showUAVIframe: false, // 显示无人机视频
        playUrl: '', // 无人机播放url
        pointType: '机场', // 机场 铁路 客运站 总览左边的tab切换
        postionType: '', //  机场 铁路 客运站 点击地图点/地名 下钻到具体枢纽的点的类型
        pointStatus: 'yongji',
        postionName: '', // 当前位置 地点
        postionID: '', // 当前位置 地点 的id
        city: '', // 当前位置 地点 的城市
        tabName: '', // 具体枢纽 左边tab的标记
        markers: [], // 存放marker
        infoWindowDom: '', // 信息窗体dom对象
        infoWindow: null, //信息窗体对象
        isShowUAV: false, // 是不是显示了无人机
        showThreeD: false, // 显示3d模型
        showDialog: false, // 显示一键派单弹窗
        showDialogHref: '', // 一件派单url
    },
    getters: {
        curDate (state) {
            return state.curDate
        },
        checkDate (state) {
            return state.checkDate
        },
        dateRange (state) {
            return state.dateRange
        },
        showUAVIframe (state) {
            return state.showUAVIframe
        },
        playUrl (state) {
            return state.playUrl
        },
        pointType (state) {
            return state.pointType
        },
        pointStatus (state) {
            return state.pointStatus
        },
        postionName (state) {
            return state.postionName
        },
        postionID (state) {
            return state.postionID
        },
        city (state) {
            return state.city
        },
        tabName (state) {
            return state.tabName
        },
        postionType (state) {
            return state.postionType
        },
        markers (state) {
            return state.markers
        },
        infoWindowDom (state) {
            return state.infoWindowDom
        },
        infoWindow (state) {
            return state.infoWindow
        },
        checkDateQYZT (state) {
            return state.checkDateQYZT
        },
        isShowUAV (state) {
            return state.isShowUAV
        },
        showThreeD (state) {
            return state.showThreeD
        },
        showDialog (state) {
            return state.showDialog
        },
        showDialogHref (state) {
            return state.showDialogHref
        },
    },
	mutations:{
        curDate (state, n) {
            state.curDate = n
        },
        checkDate (state, n) {
            state.checkDate = n
        },
        dateRange (state, n) {
            state.dateRange = n
        },
        showUAVIframe (state, n) {
            state.showUAVIframe = n
        },
        playUrl (state, n) {
            state.playUrl = n
        },
        pointType (state, n) {
            state.pointType = n
        },
        pointStatus (state, n) {
            state.pointStatus = n
        },
        postionName (state, n) {
            state.postionName = n
        },
        postionID (state, n) {
            state.postionID = n
        },
        city (state, n) {
            state.city = n
        },
        tabName (state, n) {
            state.tabName = n
        },
        postionType (state, n) {
            state.postionType = n
        },
        markers (state, n) {
            state.markers = n
        },
        infoWindowDom (state, n) {
            state.infoWindowDom = n
        },
        infoWindow (state, n) {
            state.infoWindow = n
        },
        checkDateQYZT (state, n) {
            state.checkDateQYZT = n
        },
        isShowUAV (state, n) {
            state.isShowUAV = n
        },
        showThreeD (state, n) {
            state.showThreeD = n
        },
        showDialog (state, n) {
            state.showDialog = n
        },
        showDialogHref (state, n) {
            state.showDialogHref = n
        },
	},
	actions: {
        curDate (context, n) {
	        context.commit('curDate', n)
	    },
        checkDate (context, n) {
	        context.commit('checkDate', n)
	    },
        dateRange (context, n) {
	        context.commit('dateRange', n)
	    },
        showUAVIframe (context, n) {
	        context.commit('showUAVIframe', n)
	    },
        playUrl (context, n) {
	        context.commit('playUrl', n)
	    },
        pointType (context, n) {
            context.commit('pointType', n)
        },
        pointStatus (context, n) {
            context.commit('pointStatus', n)
        },
        postionName (context, n) {
            context.commit('postionName', n)
        },
        postionID (context, n) {
            context.commit('postionID', n)
        },
        city (context, n) {
            context.commit('city', n)
        },
        tabName (context, n) {
            context.commit('tabName', n)
        },
        postionType (context, n) {
            context.commit('postionType', n)
        },
        markers (context, n) {
            context.commit('markers', n)
        },
        infoWindowDom (context, n) {
            context.commit('infoWindowDom', n)
        },
        infoWindow (context, n) {
            context.commit('infoWindow', n)
        },
        checkDateQYZT (context, n) {
            context.commit('checkDateQYZT', n)
        },
        isShowUAV (context, n) {
            context.commit('isShowUAV', n)
        },
        showThreeD (context, n) {
            context.commit('showThreeD', n)
        },
        showDialog (context, n) {
            context.commit('showDialog', n)
        },
        showDialogHref (context, n) {
            context.commit('showDialogHref', n)
        },
	},
})

export default index