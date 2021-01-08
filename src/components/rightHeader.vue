<template>
    <div class="header">
        <div class="title">
            <img src="../assets/header/标题底框@2x.png" alt="">
            <span @click="changePing('index.html')">智慧出行支撑保障系统</span>
        </div>

        <ul class="ul1">
            <li v-for="(item, index) in list" :key="index"
                :class="[{'active': index==currentPage}]">
                <span :class="[{'border': index!==list.length-1}, {'lastPd': index===list.length-1}, {'firstPd': index===0}, 'cp']"
                      @click="clickLi(index, item.link)">
                    {{item.name}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    props:{
        //当前页面index，防止重复跳转当前页面
        currentPage:{
            type: [Number, String],
            default: -1,
        }
    },
    data(){
        return{
            list: [
                {
                    name: '交通场站',
                    link: 'jtsn.html'
                },
                {
                    name: '服务区',
                    link: 'fwq.html'
                },
                {
                    name: '路网监控',
                    link: 'lwjk.html'
                },
                {
                    name: '入粤分析',
                    link: 'ryfx.html'
                },
            ]
        }
    },
    methods:{
        clickLi (index, link) {
            // this.currentPage = index
            this.utils.goToPage(link)
        },
        changePing (link) {
            this.utils.goToPage(link)
        }
    }
}
</script>

<style lang="scss" scoped="scoped">
    .header {
        width: 100%;
        height:86px;
        background:rgba(5,54,115,1);
        display: flex;
        border-bottom: 1px solid #00C0FF;
        position: relative;
		z-index: 99;
    }
    .title {
        min-width: 555px;
        height: 120px;
        position: relative;
        overflow: hidden;


        img {
            transform: rotateY(180deg);
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        span {
            font-size:46px;
            /*font-family:PingFang SC;*/
            font-weight:600;
            color:rgba(255,255,255,1);
            /*line-height:60px;*/
            white-space: nowrap;
            position: absolute;
            top: 22px;
            /*right: 83px;*/
            left: 0;
        }
    }
    .ul1 {
        width: 100%;
        height: 100%;
        display: flex;
        /*flex-direction: row-reverse;*/
        font-size: 28px;
        color: #ffffff;
        li {
            text-align: center;
            /*line-height: 86px;*/
            height: 100%;
            padding: 29px 0px;
            white-space: nowrap;

        }
        .active {
            background-image: url("../assets/header/tab选中效果@2x.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            color: $activeColor;
        }
        .border {
            border-right: 1px solid #0D5F99;
        }
        span {
            padding: 0 30px;
        }
        .lastPd {
            padding-right: 36px;
        }
        .firstPd {
            /*padding-left: 0;*/
        }
    }
</style>
