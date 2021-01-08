<template>
    <!--摄像头-->
    <div class="cam-box cp">
        <div :class="['cont', {'active': showList}]" @click="clickCamBox">
            <div class="border border1"></div>
            <div class="border border2"></div>
            <div class="border border3"></div>
            <div class="border border4"></div>
            <div class="cont-l">
                <div class="icon bgi"></div>
                <div>实时监控</div>
            </div>
            <div class="cont-r jiantou bgi"></div>
        </div>
        <ul class="list-ul" v-if="showList">
            <li v-for="(item,index) in videoData" :key="index"
                v-if="item['地点'] === position"
                :class="[{'active':activeCam===index}]"
                @click="clickCam(index, item)">
                <div class="li-icon bgi"></div>
                <div>{{item['监控点名称']}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import videoData from '@/utils/videoData'
export default {
    name: '',

    mixins: [],

    components: {},

    props: {
        id: {
            type: Number,
            default: -1
        }
    },

    data () {
        return {
            showList: false,
            videoData: [],
            activeCam: -1
        }
    },

    computed: {
        position () {
            return this.id === 1? '港珠澳大桥' : '琼州海峡'
        }
    },

    watch: {},

    created () {},

    mounted () {
        this.videoData = videoData
    },

    destroyed () {},

    methods: {
        clickCamBox () {
            this.showList = !this.showList
        },
        clickLi (item) {

        },
        // 点击摄像头
        clickCam (idx, item) {
            // debugger
            this.activeCam =idx
            const origin = window.location.origin
            const path = window.location.pathname.split('/')[1]
            let url = 'SHWGOIE:'+ origin + '/' + path + '/video/?vid=' + item['编码']
                // +'&id=' + this.id
            // debugger
            window.location.href = url
            // window.location.href = 'http://192.168.1.61:10000/qyzt.html?' + 'id=' + this.id
        },
    }

}
</script>

    <style lang='scss' scoped>
    .cam-box {
        width: 220px;
        height: 50px;
        font-size:16px;
        /*font-family:Adobe Heiti Std;*/
        font-weight:normal;
        color:rgba(255,255,255,1);
    }
    .cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .cont-l {
        display: flex;
        align-items: center;
        .icon {
            width: 18px;
            height: 22px;
            background-image: url('../assets/监控@.png');
            margin-right: 9px;
        }

    }
    .jiantou {
        width: 17px;
        height: 10px;
        background-image: url('../assets/上拉@.png');
    }
    .cont {
        width: 220px;
        height: 50px;
        background:rgba(0,51,153,0.8);
        position: relative;
        padding-left: 20px;
        padding-right: 18px;
    }
    .cont.active {
        background: #005CC0;
        border: 1px solid #009DFF;
    }
    .border {
        width: 13px;
        height: 13px;
        position: absolute;
    }
    .border1 {
        border: 1px solid #00FFFF;
        border-bottom: none;
        border-right: none;
        left: 0;
        top: 0;
    }
    .border2 {
        border: 1px solid #00FFFF;
        border-bottom: none;
        border-left: none;
        right: 0;
        top: 0;
    }
    .border3 {
        border: 1px solid #00FFFF;
        border-top: none;
        border-right: none;
        left: 0;
        bottom: 0;
    }
    .border4 {
        border: 1px solid #00FFFF;
        border-top: none;
        border-left: none;
        right: 0;
        bottom: 0;
    }
        .list-ul {
            width: 100%;
            position: absolute;
            z-index: 11;
            left: 0;
            top: 50px;
            height: 154px;
            overflow-y: auto;
            li {
                width: 100%;
                height: 50px;
                background:rgba(0,51,153,0.8);
                padding-left: 20px;
                display: flex;
                align-items: center;
            }
            li.active {
                background: #005CC0;
                border: 1px solid #009DFF;

            }
            li:hover {
                background: #005CC0;
                border: 1px solid #009DFF;

            }
            .li-icon {
                min-width: 18px;
                height: 22px;
                background-image: url('../assets/监控@.png');
                margin-right: 9px;
            }
        }
</style>
