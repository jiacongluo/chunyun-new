<template>
    <div class="bgi popWindow3" v-if="visible">
        <div class="bgi insideBox">
            <div class="flex jsb color-white fs_20">
                <div class="flex leftHeader">
                    <div></div>
                    <div>{{city}}</div>
                    <div>{{num}}</div>
                </div>
                <div class="rightHeader bgi" @click="onClose()">
                </div>
            </div>
            <div class="content bgi flex jsa color-white fs_16">
                <div v-for="(item,i) in 5">
                    <div class="fs_26" :class="i<4?'green':'red'">{{arr[i]}}</div>
                    <div>{{options[i]}}</div>
                </div>
            </div>
            <div class="buttons flex fs_16 tac">
                <div class="color-white bgi" @click="onDetail">查看详情</div>
                <!--<div class="yellow bgi">链到嵌入页面</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            city: {
                type: String,
                default: '',
            },
            num: [String, Number],
            arr: {
                type: Array,
                default: () => []
            },
        },
        methods: {
            onDetail() {
                this.$emit('onDetail');
                this.$emit('close');
            },
            onClose() {
                this.$emit('close');
            }
        },
        data() {
            return {
                options: ['日工单', '累计工单', '已完成', '待办', '超时'],
                visible: true,
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .fs_26 {
        font-size: 26px;
    }

    .yellow {
        color: rgba(255, 255, 0, 1);
    }

    .green {
        color: rgba(0, 255, 153, 1);
    }

    .red {
        color: rgba(255, 102, 102, 1);
    }

    .popWindow3 {
        /*width: 100%;*/
        /*height: 100%;*/
        width: 645px;
        height: 342px;
        background-image: url(../assets/wk3.png);
        padding: 20px;
        z-index: 1000;

        .insideBox {
            width: 100%;
            height: 100%;
            position: relative;
            background-image: url(../assets/wk2.png);

            > div:first-child {
                margin-left: 21px;
                margin-right: 31px;
                padding-top: 20px;

                .leftHeader {
                    > div:first-child {
                        width: 4px;
                        height: 20px;
                        background: rgba(0, 255, 255, 1);
                    }

                    > div:nth-child(2) {
                        margin-left: 10px;
                        margin-right: 26px;
                    }
                }

                .rightHeader {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                    background-image: url(../assets/lancha.png);
                }
            }

            .content {
                width: 533px;
                height: 111px;
                padding-top: 34px;
                text-align: center;
                background-image: url(../assets/wk1.png);
                position: absolute;
                top: 50%;
                margin-top: -55px;
                left: 50%;
                margin-left: -266px;
                > div {
                    > div:first-child {
                        margin-bottom: 10px;
                    }
                }
            }

            .buttons {
                position: absolute;
                bottom: 17px;
                transform: translateX(-50%);
                left: 50%;

                > div {
                    width: 161px;
                    height: 51px;
                    line-height: 51px;
                    background-image: url(../assets/xiangqing.png);
                    margin-right: 16px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
