<template>
    <!--排班弹窗-->
    <div class="dia">
        <Dialog
            custom-class="dcls"
            :top="theTop"
            :width="theWidth"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <div class="outer bgi">
                <div class="full-div inner bgi">
                    <header class="theHeder">
                        <div class="theHeder-l">
                            <div class="line"></div>
                            <div class="name">排班详情</div>
                        </div>
                        <div class="close bgi cp" @click="closeDialog"></div>
                    </header>
                    <div class="body">
                        <div class="body-item bgi">
                            <div class="body-item-header">
                                早班
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>时间段</span>
                                <span>8:00-14:00</span>
                            </div>
                            <div class="body-item-line body-item-line2">
                                <span>姓名</span>
                                <span>{{theData.dayName1}}</span>
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>部门</span>
                                <span>{{theData.dayDepartment1}}</span>
                            </div>
                            <!--<div class="body-item-line body-item-line2">-->
                                <!--<span>岗位</span>-->
                                <!--<span>{{theData.dayJobCategory1}}</span>-->
                            <!--</div>-->
                            <div class="body-item-line body-item-line2">
                                <span>联系电话</span>
                                <span>{{theData.dayContactWay1}}</span>
                            </div>
                        </div>
                        <div class="body-item bgi">
                            <div class="body-item-header">
                                中班
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>时间段</span>
                                <span>14:00-20:10</span>
                            </div>
                            <div class="body-item-line body-item-line2">
                                <span>姓名</span>
                                <span>{{theData.dayName2}}</span>
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>部门</span>
                                <span>{{theData.dayDepartment2}}</span>
                            </div>
                            <!--<div class="body-item-line body-item-line1">-->
                                <!--<span>岗位</span>-->
                                <!--<span>{{theData.dayJobCategory2}}</span>-->
                            <!--</div>-->
                            <div class="body-item-line body-item-line2">
                                <span>联系电话</span>
                                <span>{{theData.dayContactWay2}}</span>
                            </div>
                        </div>
                        <div class="body-item bgi">
                            <div class="body-item-header">
                                晚班
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>时间段</span>
                                <span>{{theData.nightTimeRange}}</span>
                            </div>
                            <div class="body-item-line body-item-line2">
                                <span>姓名</span>
                                <span>{{theData.nightName}}</span>
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>部门</span>
                                <span>{{theData.nightDepartment}}</span>
                            </div>
                            <!--<div class="body-item-line body-item-line2">-->
                                <!--<span>岗位</span>-->
                                <!--<span>{{theData.nightJobCategory}}</span>-->
                            <!--</div>-->
                            <div class="body-item-line body-item-line2">
                                <span>联系电话</span>
                                <span>{{theData.nightContactWay}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>


</template>

<script>
import { Dialog } from 'element-ui';
export default {
    name: '',

    mixins: [],

    components: {
        Dialog
    },

    props: {
        showDialog : {
            type: Boolean,
            default: false
        },
        theData: {
            type: Object,
        }
    },

    data () {
        return {
            theWidth: '50%',
            theTop: '15vh',
            dialogVisible: false,

        }
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {
        this.dialogVisible = true

    },

    destroyed () {},

    methods: {
        // 关闭弹窗
        handleClose (done) {
            this.$emit('update:showDialog', false)
            done();

            //            MessageBox.$confirm('确认关闭？')
            //                .then(_ => {
            //                    this.$emit('update:showDialog', false)
            //                    done();
            //                })
            //                .catch(_ => {
            //                });
        },
        // 关闭弹窗
        closeDialog () {
            this.dialogVisible = false
            this.$emit('update:showDialog', false)

        },
    }
}
</script>

<style lang='scss' scoped>
    .outer {
        /*width: 774px;*/
        /*height: 488px;*/
        /*background-image: url('../../../assets/pop/外框2@2x.png');*/
        background-image: url('../assets/bj-01@2x.png');
        width: 1131px;
        height: 455px;
        padding: 20px;
    }
    .inner {
        /*background-image: url('../../../assets/pop/外框1@2x.png');*/
        background-image: url('../assets/bj-02@2x.png');
        /*padding-top: 10px;*/
    }
    .close {
        width: 20px;
        height: 20px;
        background-image: url('../../../assets/pop/关闭@2x.png');
    }
    .theHeder {
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        padding-top: 20px;
        padding-left: 21px;
        padding-right: 31px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .line {
        width:4px;
        height:20px;
        background:rgba(0,255,255,1);
        margin-right: 10px;
    }
    .theHeder-l {
        display: flex;
        align-items: center;

    }
    .body {
        margin-top: 39px;
        padding-left: 17px;
        padding-right: 17px;
        display: flex;
        justify-content: space-between;

    }
    .body-item {
        /*width: 342px;*/
        /*height: 352px;*/
        /*background-image: url('../../../assets/pop/白斑底框@2x.png');*/
        /*margin-top: 10px;*/
        background-image: url('../assets/bj-03@2x.png');
        width: 342px;
        height: 319px;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
    }
    .body-item-header {
        font-size:20px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        width: 100%;
        text-align: center;
        padding-top: 15px;
        /*margin-bottom: 33px;*/
        height: 41px;
        margin-bottom: 10px;
    }
    .body-item-line {
        padding-left: 44px;
        padding-right: 47px;

        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        span:nth-child(2) {
            color: #FFFF00;
        }
    }
    .body-item-line1 {
        height: 75px;

    }
    .body-item-line2 {
        height: 39px;

    }
</style>
