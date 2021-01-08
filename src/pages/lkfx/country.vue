<template>
  <div class="world-view">
    <!--<div class="bgimage-1">-->

    <!--</div>-->
    <!--<div class="bgimage-2">-->

    <!--</div>-->
    <div class="left-part">
      <countryView :data="showInine?inData:outData" ></countryView>
    </div>
    <div class="right-part">
      <div class="item item-1">
        <div class="title-part linear-border">
          <div class="icon icon1"></div>
          <div class="title">
            省外来源渠道分析
          </div>
        </div>
        <div class="body">

          <div class="item right-border">
            <div class="icon icon-gonglu-green">

            </div>
            <div class="name">
              公路
            </div>
            <div class="percent">
              {{Math.floor(inChannelMap['channel1']*100).toFixed(0)}}%
            </div>
          </div>
          <div class="item  right-border">
            <div class="icon icon-shuilu-green">

            </div>
            <div class="name ">
              水路
            </div>
            <div class="percent">
              {{Math.floor(inChannelMap['channel3']*100).toFixed(0)}}%
            </div>
          </div>
          <div class="item right-border">
            <div class="icon icon-tielu-green">

            </div>
            <div class="name ">
              铁路
            </div>
            <div class="percent">
              {{Math.floor(inChannelMap['channel2']*100).toFixed(0)}}%
            </div>
          </div>

          <div class="item ">
            <div class="icon icon-minhang-green">

            </div>
            <div class="name ">
              民航
            </div>
            <div class="percent">
              {{100-Math.floor(inChannelMap['channel1']*100)-Math.floor(inChannelMap['channel2']*100)-Math.floor(inChannelMap['channel3']*100)}}%
            </div>
          </div>
        </div>
      </div>
      <div class="item item-2">
        <div class="title-part linear-border">
          <div class="icon icon1"></div>
          <div class="title">
            省外去向渠道分析
          </div>
        </div>
        <div class="body">

          <div class="item right-border">
            <div class="icon icon-gonglu-yellow">

            </div>
            <div class="name">
              公路
            </div>
            <div class="percent">
              {{Math.floor(outChannelMap['channel1']*100).toFixed(0)}}%
            </div>
          </div>
          <div class="item right-border">
            <div class="icon icon-shuilu-yellow">

            </div>
            <div class="name ">
              水路
            </div>
            <div class="percent">
              {{Math.floor(outChannelMap['channel3']*100).toFixed(0)}}%
            </div>
          </div>
          <div class="item right-border">
            <div class="icon icon-tielu-yellow">

            </div>
            <div class="name ">
              铁路
            </div>
            <div class="percent">
              {{Math.floor(outChannelMap['channel2']*100).toFixed(0)}}%
            </div>
          </div>

          <div class="item ">
            <div class="icon icon-minhang-yellow">

            </div>
            <div class="name ">
              民航
            </div>
            <div class="percent">
              <!--{{Math.floor(outChannelMap['channel0']*100).toFixed(0)}}%-->
              {{100-Math.floor(outChannelMap['channel1']*100)-Math.floor(outChannelMap['channel2']*100)-Math.floor(outChannelMap['channel3']*100)}}%
            </div>
          </div>
        </div>
      </div>
      <div class="item item-3">
        <div class="title-part linear-border">
          <div class="icon icon2"></div>
          <div class="title">
            省外来源分布
          </div>
        </div>
        <div class="body" @mouseover="showInine=true">
          <tableView :data="inData" :type="3" :direction="1"></tableView>
        </div>
      </div>
      <div class="item item-4">
        <div class="title-part linear-border">
          <div class="icon icon2"></div>
          <div class="title">
            省外去向分布
          </div>
        </div>
        <div class="body" @mouseover="showInine=false">
          <tableView :data="outData" :type="3" :direction="2"></tableView>
        </div>
      </div>
    </div>
    <div class="number-part">
      <div class="number-item number-item-1">
        <div class="title">省外来源总量</div>
        <div class="number-value"><span class="number yellow-number">{{utils.formatNumAuto(numpart.inNum)}}</span><span
                class="unit">万人</span>
        </div>
      </div>
      <div class="number-item number-item-2">
        <div class="title">省外去向总量</div>
        <div class="number-value"><span class="number yellow-number">{{utils.formatNumAuto(numpart.outNum)}}</span><span
                class="unit">万人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import './style/common.scss'
    import transform from './transform'
    import tableView from './components/tableView'
    import countryView from './components/countryView'
    import {get, post} from '../../utils/core/http'
    import dateUtil from '../../utils/dateUtil'

    export default {
        name: 'world',//国际旅客分析bo'd

        mixins: [],

        components: {
            countryView,
            tableView
        },

        props: {
            currentDate:[String]
        },

        data() {
            return {
                // selecteDate: dateUtil.formateQueryDate(new Date()),
                // currentDate: '2019-03-01',
                // currentDate: dateUtil.formateQueryDate(dateUtil.beforeDays(new Date(),3)),
                //渠道类型:1公路，2民航，3水路，4铁路
                channelMap: {
                    "2": 0,
                    "1": 1,
                    "4": 2,
                    "3": 3,
                },
                showInine:false,
                numpart: {
                    inNum: 0,
                    outNum: 0
                },
                inoutMove: {
                    inMove: [],
                    outMove: []
                },
                inoutChannel: {
                    inChannel: [],
                    outChannel: []
                },
                inChannelMap: {
                    channel0: 0,
                    channel1: 0,
                    channel2: 0,
                    channel3: 0,
                },
                outChannelMap: {
                    channel0: 0,
                    channel1: 0,
                    channel2: 0,
                    channel3: 0,
                },
                inData: [],
                outData: []

            }
        },

        computed: {},

        watch: {
            async currentDate(n,o){
                this.loadData();
            }
        },

        created() {
            // window['onRender'] = () => this.refresh();
        },

        async mounted() {
            this.loadData();
        },

        destroyed() {
        },

        methods: {
            async refresh() {
//更新数据
                this.getForgeinInOutNum(this.currentDate);
            },

            /**
             * 省外迁入/迁出渠道分析
             * */
            async getForgeinInOutChannel(date) {
                //date 日期格式 2019-12-09
                this.inoutChannel = {
                    inChannel: [],
                    outChannel: []
                };
                let theData = await get("/api/lkfx/getProvinceInOutChannel?date=" + date);
                if (theData && theData.data) {
                    this.inoutChannel = theData.data;
                }
                else {
                    this.inoutChannel = {
                        inChannel: [],
                        outChannel: []
                    };
                }
                this.inoutChannel.inChannel.map(m => this.$set(this.inChannelMap, "channel" + this.channelMap[m.channelType], m.percentage));
                this.inoutChannel.outChannel.map(m => this.$set(this.outChannelMap, "channel" + this.channelMap[m.channelType], m.percentage));

            },
            /*
            * getForgeinInOutMove 省外迁入来源/迁出去向分布
            * */
            async getForgeinInOutMove(date) {
                //date 日期格式 2019-12-09
                this.inoutMove = {
                    inMove: [],
                    outMove: []
                };
                let theData = await get("/api/lkfx/getProvinceInOutMove?date=" + date);
                if (theData && theData.data) {
                    this.inoutMove = theData.data;
                }
                else {
                    this.inoutMove = {
                        inMove: [],
                        outMove: []
                    };
                }
                // debugger;
                this.inData = transform.transformCountryLine(this.inoutMove.inMove, 1, 1, '广东');
                this.outData = transform.transformCountryLine(this.inoutMove.outMove, 2, 1, '广东');

            },
            /*
            旅客分析-省外迁入/迁出总量
            响应说明:inNum:迁入总量,outNum:迁出总量"
            * */
            async getForgeinInOutNum(date) {
                //date 日期格式 2019-12-09
                this.numpart.inNum = 0;
                this.numpart.outNum = 0;
                let theData = await get("/api/lkfx/getProvinceInOutNum?date="+date, {});
                if (theData && theData.data) {
                    this.numpart = theData.data;
                }
                else {
                    this.numpart.inNum = 0;
                    this.numpart.outNum = 0;
                }
            },
            /***
             * 加载全部数据
             * @returns {Promise<void>}
             */
            async loadData() {
                this.getForgeinInOutNum(this.currentDate);
                this.getForgeinInOutChannel(this.currentDate);
                this.getForgeinInOutMove(this.currentDate)
            }
        },


    }
</script>

<style lang='scss' scoped>
  .world-view {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 14px;
    .bgimage-1 {
      position: absolute;
      left: 16px;
      right: 8px;
      bottom: 16px;
      top: 0px;
      /*background-image: url("assets/world/背景@2x.png");*/
      /*background-size: 2345px 962px;*/
      background-repeat: no-repeat;
      background-size: 100% 100%;
      /*background-position: 16px 0px;*/
    }
    .bgimage-2 {
      position: absolute;
      /*left: 45px;*/
      /*right: 45px;*/
      /*bottom: 16px;*/
      /*top:0px;*/
      height: 882px;
      left: 32px;
      right: 23px;
      bottom: 16px;
      /*top:0px;*/

      background-image: url("assets/world/地图下方背景线@2x.png");
      /*background-size: 2345px 962px;*/
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .left-part {
      position: absolute;
      width: 848px;
      bottom: 0px;
      top: 0px;
    }
    .right-part {
      position: absolute;
      left: 848px;
      right: 0px;
      bottom: 0px;
      top: 0px;
      .item {
        .title-part {
          position: absolute;
          left: 28px;
          top: 0px;
          /*right: 100px;*/
          right: 0px;
          height: 54px;
          border-bottom: 2px solid rgba(6, 136, 201, 1);
          /*border-image: -webkit-linear-gradient(#0688C9, #000) 90 90;*/
          /*border-image: -moz-linear-gradient(#0688C9, #000) 90 90;*/
          /*border-image: linear-gradient(#0688C9, #000) 90 90;*/
          .title {
            font-size: 20px;
            position: absolute;
            top: 27px;
            left: 58-28px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(253, 253, 253, 1);
          }
          .icon {
            position: absolute;
            left: 28-28px;
            top: 27px;
            &.icon1 {
              background-repeat: no-repeat;
              background-image: url("assets/world/境内／境外标题icon@2x.png");
              width: 20px;
              height: 20px;
              background-size: 100% 100%;
            }
            &.icon2 {
              background: #00FFFF;
              width: 9px;
              height: 20px;
              background-size: 100% 100%;
            }
          }
        }

      }
      .item-1 {
        position: absolute;
        left: 0px;
        top: 21px;
        width: 501px;
        height: 218px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("assets/world/迁入／迁出背景@2x.png");
        .item {
          display: inline-block;
          width: 43+32+43px;
          text-align: center;
          &.right-border {
            border-right: 1px solid rgba(72, 133, 234, 1);
          }
        }
        .body {
          position: absolute;
          top: 75px;
          left: 0px;
          .icon {
            display: inline-block;
          }
          .name {
            font-size: 16px;
            margin-top: 8px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .percent {
            font-size: 30px;
            margin-top: 13px;
            font-family: Lato;
            font-weight: 800;
            /*color: rgba(0, 255, 255, 1);*/
            color: yellow;
          }
        }
      }
      .item-2 {
        position: absolute;
        left: 13+501px;
        top: 21px;
        width: 501px;
        height: 218px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("assets/world/迁入／迁出背景@2x.png");
        .item {
          display: inline-block;
          width: 43+32+43px;
          text-align: center;
          &.right-border {
            border-right: 1px solid rgba(72, 133, 234, 1);
          }
        }
        .body {
          position: absolute;
          top: 75px;
          left: 0px;
          .icon {
            display: inline-block;
          }
          .name {
            font-size: 16px;
            margin-top: 8px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .percent {
            font-size: 30px;
            margin-top: 13px;
            font-family: Lato;
            font-weight: 800;
            /*color: rgba(0, 255, 255, 1);*/
            color: yellow;
          }
        }
      }
      .item-3 {
        position: absolute;
        width: 1011px;
        height: 357px;
        left: 0px;
        top: 248px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("assets/world/迁入／迁出来源分部框@2x.png");
        .body {
          position: absolute;
          top: 56px;
          left: 0px;
          right: 0px;
          bottom: 0px;
        }

      }
      .item-4 {
        position: absolute;
        width: 1011px;
        height: 345px;
        top: 620px;
        left: 0px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("assets/world/迁入／迁出来源分部框@2x.png");
        .body {
          position: absolute;
          top: 56px;
          left: 0px;
          right: 0px;
          bottom: 0px;
        }
      }
      .chart-part {
        position: absolute;
        width: 500px;
        height: 500px;
      }
    }
    .number-part {
      /*left:203px;*/
      /*top:53px;*/
      left: 72px;
      top:87px;
      .number-item {
        /*position: absolute;*/
        /*width: 222px;*/
        /*height: 96px;*/
        /*background-image: url("assets/world/迁入迁出数据底框@2x.png");*/
        /*background-size: 100% 100%;*/
        /*background-repeat: no-repeat;*/
        /*&.number-item-1 {*/
        /*left: 172px;*/
        /*top: 38px;*/
        /*}*/
        /*&.number-item-2 {*/
        /*left: 441px;*/
        /*top: 38px;*/
        /*}*/
        /*.title {*/
        /*position: absolute;*/
        /*width: 109px;*/
        /*height: 19px;*/
        /*left: 26px;*/
        /*top: 12px;*/
        /*text-align: center;*/
        /*font-size: 18px;*/
        /*font-family: Microsoft YaHei;*/
        /*font-weight: 400;*/
        /*color: rgba(255, 255, 255, 1);*/
        /*line-height: 19px;*/
        /*}*/
        /*.number {*/
        /*position: absolute;*/
        /*font-size: 42px;*/
        /*font-family:unidreamledregular;*/
        /*letter-spacing: 5px;*/
        /*font-weight: 400;*/
        /*color: rgba(0, 255, 255, 1);*/
        /*line-height: 44px;*/
        /*left: 25px;*/
        /*top: 44px;*/
        /*}*/
        /*.unit {*/
        /*position: absolute;*/
        /*right: 25px;*/
        /*top: 69px;*/
        /*font-size: 14px;*/
        /*font-family: Microsoft YaHei;*/
        /*font-weight: 400;*/
        /*color: rgba(255, 255, 255, 1);*/
        /*line-height: 14px;*/
        /*}*/
      }

    }
  }


</style>