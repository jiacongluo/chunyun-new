import {mapState} from 'vuex'

let myMixin = {
    components: {},

    data () {
        return {
            isDebug: process.env.NODE_ENV === 'development',
            isInit: false,
            axisColor: '#0066FF', // 坐标轴颜色
            axisFontColor: '#FEFEFE', // 坐标轴文字颜色
            zhuliuMap: { // 驻留时长
                0: '0-1',
                1: '1-2',
                2: '2-3',
                3: '3-4',
                4: '4-5',
                5: '5-6',
                6: '6-7',
                7: '7以上',
                8: '8-24',
            },
            ageMap: { // 年龄
                6: '55岁以上',
                5: '45-54岁',
                4: '35-44岁',
                3: '25-34岁',
                2: '18-24岁',
                1: '18岁以下',

            },
            isRunning:false

        }
    },
    computed: {
        ...mapState({
            curDate: state => {
                return state.curDate
            },
            checkDate: state => {
                return state.checkDate
            },
            checkDateQYZT: state => {
                return state.checkDateQYZT
            },
            dateRange: state => {
                return state.dateRange
            },
            showUAVIframe: state => {
                return state.showUAVIframe
            },
            playUrl: state => {
                return state.playUrl
            },
        }),
        // 是不是在iframe内
        isTopWindow () {
            return window == top
        }
    },
    mounted () {
    },
    methods: {
        htmlFontSize () {
            let theHTML = document.getElementsByTagName('html')[0]
            let theFS = theHTML.style.fontSize
            theFS = theFS.replace('px', '');
            return theFS
        },
        checkTime () {
            let curDate = new Date()
            let hour = curDate.getHours()
            let mins = curDate.getMinutes()
            return hour==14&&mins==30
        },
        theTimer () {
            window.theTimer = setInterval(() => {
                if (this.checkTime) {

                }
            },6000)
        }
    },
    watch: {
        checkDate(n ,o) {
            this.init && this.init()
        },
        dateRange(n ,o) {
            this.init && this.init()
        },
    }
}

export default myMixin