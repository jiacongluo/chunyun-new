<template>
    <div class="app-view bg-base">
        <leftHeader :currentPage="'1'"></leftHeader>
        <div class="app-body">
            <world ref="word" v-if="viewType==1" :currentDate="currentDate"></world>
            <country ref="country" v-if="viewType==2" :currentDate="currentDate"></country>
            <province ref="province" v-if="viewType==3" :currentDate="currentDate"></province>
        </div>
        <div :class="['date-part',viewType==3?'right':'']">
            <datePicker2 :value.sync="currentDate"></datePicker2>
        </div>
        <div class="nav-bar">
            <div :class="['province-btn',viewType==3?'select':'']" @click="viewType=3">省内旅客分析</div>
            <div :class="['country-btn',viewType==2?'select':'']" @click="viewType=2">省际旅客分析</div>
            <div :class="['world-btn',viewType==1?'select':'']" @click="viewType=1">国际旅客分析</div>


        </div>
        <div class="left-bg"></div>
    </div>
</template>

<script>
    import leftHeader from '../../components/leftHeader'
    import world from './world'
    import country from './country'
    import province from './province'
    import datePicker2 from '../../components/datePicker2'
    import dateUtil from '../../utils/dateUtil'

    export default {
        name: 'lkfx',//旅客分析

        mixins: [],

        components: {
            leftHeader,
            world,
            country,
            province,
            datePicker2
        },

        props: {},

        data() {
            return {
                isRunning: false,
                currentDate: dateUtil.formateQueryDate(dateUtil.beforeDays(new Date(), 2)),
                viewType: 3,
            }
        },

        computed: {},

        watch: {
            currentDate(n, o) {

                // debugger;
            }
        },

        created() {
            window['onRender'] = () => this.refresh();
        },

        mounted() {
            this.isRunning = true;
            this.run();
        },

        destroyed() {
            this.isRunning = false;
        },

        methods: {
            async run() {
                while (true) {
                    await this.sleep(1000 * 10);
                    if (this.isRunning) {
                        // this.loadByDate(this.selectDate);
                        // debugger;
                        this.refresh();
                    }

                }

            },
            sleep(timeout) {
                return new Promise((resolve, reject) => {
                    //这里模拟异步动作，一般来说可以放置Ajax请求, 'promise1-result'为请求成功后的返回结果
                    //注：Promise实例只能通过resolve 或 reject 函数来返回，并用then()或者catch()获取
                    //不能在里面直接return ... 这样是获取不到Promise返回值的
                    setTimeout(() => resolve('ok'), timeout)
                })
            },
            async refresh() {
                console.log("开始刷新旅客分析");
                if (this.viewType == 1) {
                    this.$refs.word.refresh();
                }
                if (this.viewType == 2) {
                    this.$refs.country.refresh();
                }
                if (this.viewType == 3) {
                    this.$refs.province.refresh();
                }

            }
        },


    }
</script>

<style lang='scss' scoped>
    .app-view {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        width: 1920px;
        height: 1080px;
        background-color: #0C2449;
        .date-part {
            position: absolute;
            left: 72px;
            top: 122px;
            width: 222px;
            height: 40px;
            background: #091F6C;
            &.right{
                top: 122-10px!important;
                left: auto!important;
                right: 72px!important;
            }
        }
        .app-body {
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            top: 86px;
            /*background-image: url("assets/bg.png");*/
            /*background-size: 100% 100%;*/
            /*background-repeat: no-repeat;*/
        }
        .nav-bar {
            position: absolute;
            bottom: 70px;
            height: 55px;
            width: 854px;
            left: 141px;
            text-align: left;
            div {
                position: relative;
                display: inline-block;
                cursor: pointer;
                margin: 10px;
                width: 187px;
                height: 49px;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 49px;
                background-repeat: no-repeat;
                background-size: cover;
                background: rgba(15, 113, 149, 0.75);
                border: 2px solid rgba(0, 255, 255, 1);
                border-radius: 30px;
                text-align: center;
                margin-right: 41px;
                &.select {
                    height: 55px;
                    line-height: 55px;
                    font-weight: 500;
                    background: transparent;
                    color: rgba(255, 255, 0, 1);
                    background-image: url("assets/world/地图选中框@2x.png");
                    background-size: 100% 100%;
                    border: none;
                }

            }

        }
    }

</style>
