<template>
	<div class="full-div app " v-if="isInit">
		<rightHeader :currentPage = "'1'"></rightHeader>
        <div class="the-bg  " ></div>
        <div class="main-box">
            <div class="the-bg2 pen"></div>
            <div class="map-box-outer">
                <mainBox ref="mainBox"></mainBox>

            </div>
        </div>
        <div class="right-bg">

        </div>
    </div>
</template>

<script>
	import rightHeader from '@/components/rightHeader.vue'
    import mixin from '@/utils/myMixin'
    import mainBox from './components/mainBox'
    export default {
		name: '',

		mixins: [mixin],

        components:{
            rightHeader,
            mainBox
        },

		props: {},

		data() {
			return {
			}
		},

		computed: {},

		watch: {},

		created() {},

		mounted() {
            window['onRender'] = () => this.init();

        },

		destroyed() {},

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
            refresh(){
                this.$refs.mainBox.refresh();
            },
            sleep(timeout) {
                return new Promise((resolve, reject) => {
                    //这里模拟异步动作，一般来说可以放置Ajax请求, 'promise1-result'为请求成功后的返回结果
                    //注：Promise实例只能通过resolve 或 reject 函数来返回，并用then()或者catch()获取
                    //不能在里面直接return ... 这样是获取不到Promise返回值的
                    setTimeout(() => resolve('ok'), timeout)
                })
            },
            init () {
                this.isInit = true

            }
        },

	}
</script>

<style lang='scss' scoped>
    .app {
        background-color: #0C2449;
        height: 1080px;
        /*background-image: url("assets/网格@2x.png");*/
    }
    .main-box {
        /*width: 1895px;*/
        /*width: 1920px;*/
        /*width: 100%;*/
        /*height: 965px;*/
        height: 994px;
        /*background: url("./assets/外框01@2x.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        /*margin: 16px auto 0;*/
        margin: 0px auto 0;
        position: relative;
        z-index: 90;
        display: flex;
        padding-top: 17px;

    }
    .the-bg2 {
        /*background: url("./assets/外框01@2x.png") no-repeat;*/
        /*background: url("./assets/bgkuang2.png") no-repeat;*/
        /*background: url("./assets/bgqudiaoxian.png") no-repeat;*/
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        /*height: 994px;*/
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
    }
    .map-box-outer {
        width: 100%;
        padding-left: 30-6px;
        padding-right: 26px;
        /*padding-right: 26px;*/
        /*margin-top: 16px;*/
        padding-bottom: 16px;

    }
</style>
