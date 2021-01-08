<template>
	<div class="header">
        <ul class="ul1">
            <li v-for="(item, index) in list" :key="index"
                :class="[{'active': index==currentPage}]">
                <span :class="[{'border': index!==list.length-1}, {'lastPd': index===list.length-1}, {'firstPd': index===0}, 'cp']"
                      @click="clickLi(index, item.link, item.name)">
                    {{item.name}}
                </span>
                <div class="hover-div" v-if="item.name==='区域专题'">
                    <!--<div class="hover-div-item cp" @click="utils.goToPage('qyzt.html', {id:1})">港珠澳大桥专题</div>-->
                    <!--<div class="hover-div-item cp" @click="utils.goToPage('qyzt.html', {id:2})">琼州海峡专题</div>-->
                    <div class="hover-div-item cp" @click="clickZhuantiLi(1)">港珠澳大桥专题</div>
                    <div class="hover-div-item cp" @click="clickZhuantiLi(2)">琼州海峡专题</div>
                    <!--<div class="hover-div-item cp" @click="clickZhuantiLi(3)">武汉广东迁徙专题</div>-->

                </div>
            </li>
        </ul>
        <div class="title">
            <img src="../assets/header/标题底框@2x.png" alt="">
            <span @click="changePing('jtsn.html')">广东省交通运输节假日</span>
        </div>

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
                        name: '春运运输概况',
                        link: 'index.html'
                    },
                    {
                        name: '旅客分析',
                        link: 'lkfx.html'
                    },
                    // {
                    //     name: '路网监控',
                    //     link: 'lwjk.html'
                    // },
                    {
                        name: '联网联控',
                        link: 'lkyw.html'
                    },
                    {
                        name: '协调联动',
                        link: 'xtld.html'
                    },
                    {
                        name: '区域专题',
                        link: 'qyzt.html'
                    },
                    // {
                    //     name: '春运简报',
                    //     link: ''
                    // },
                ]
			}
		},
		methods:{
            clickLi (index, link, name) {
                if (name === '区域专题') {
                    localStorage.theId = 1
                }
                this.utils.goToPage(link)
            },
            changePing (link) {
                this.utils.goToPage(link)
            },
            clickZhuantiLi (id) {
                localStorage.theId = id
                if(id==3){
                    this.utils.goToPage('yqlx.html');
                    return;
                }
                this.utils.goToPage('qyzt.html')
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
    z-index: 100;
    position: relative;
}
.title {
    min-width: 555px;
    height: 120px;
    position: relative;
    overflow: hidden;

    img {
        /*transform: rotateY(180deg);*/
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
        /*left: 83px;*/
        right: 0;
    }
}
    .ul1 {
        width: 100%;
        height: 100%;
        display: flex;
        /*flex-direction: row-reverse;*/
        font-size: 28px;
        color: #ffffff;
        padding-left: 488px;
        /*padding-left: 548px;*/
        li {
            text-align: center;
            /*line-height: 86px;*/
            height: 100%;
            padding: 29px 0px;
            white-space: nowrap;
            position: relative;
        }
        li:hover {
            .hover-div {
                display: block;
            }
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
            padding: 0px 30px;
        }
        .lastPd {
            /*padding-right: 0px;*/
        }
        .firstPd {
            /*padding-left: 0;*/
        }
    }
    .hover-div {
        width: 100%;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);

        text-align: center;
        border:1px solid rgba(255,255,0,1);
        box-shadow:0px 10px 20px 0px rgba(1,7,15,0.3);
        background:rgba(3,30,64,0.9);
        margin-top: 10px;
        display: none;
    }
    .hover-div-item {
        line-height:60px;
        height: 60px;
        border-bottom: 1px solid rgba(255,255,0,1);
    }
    .hover-div-item:last-child {
        border-bottom: none!important;
    }
    .hover-div-item:hover {
        color: $activeColor;
        background-color: rgba(255,255,0,0.1);
    }
</style>
