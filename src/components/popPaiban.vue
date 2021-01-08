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
                                白班
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>时间段</span>
                                <span>6:00-18:00</span>
                            </div>
                            <div class="body-item-line body-item-line2">
                                <span>姓名</span>
                                <span>{{theData[0].name}}</span>
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>部门</span>
                                <span>{{theData[0].department}}</span>
                            </div>
                            <div class="body-item-line body-item-line2">
                                <span>岗位</span>
                                <span>{{theData[0].jobCategory}}</span>
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>联系电话</span>
                                <span>{{theData[0].contactWay}}</span>
                            </div>
                        </div>
                        <div class="body-item bgi">
                            <div class="body-item-header">
                                夜班
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>时间段</span>
                                <span>6:00-18:00</span>
                            </div>
                            <div class="body-item-line body-item-line2">
                                <span>姓名</span>
                                <span>{{theData[1].name}}</span>
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>部门</span>
                                <span>{{theData[1].department}}</span>
                            </div>
                            <div class="body-item-line body-item-line2">
                                <span>岗位</span>
                                <span>{{theData[1].jobCategory}}</span>
                            </div>
                            <div class="body-item-line body-item-line1">
                                <span>联系电话</span>
                                <span>{{theData[1].contactWay}}</span>
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
            type: Array,
            default: () => []
        }
    },

    data () {
        return {
            theWidth: '40%',
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
        width: 774px;
        height: 488px;
        background-image: url('../assets/pop/外框2@2x.png');
        padding: 20px;
    }
    .inner {
        background-image: url('../assets/pop/外框1@2x.png');
    }
    .close {
        width: 20px;
        height: 20px;
        background-image: url('../assets/pop/关闭@2x.png');
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
        width: 342px;
        height: 352px;
        background-image: url('../assets/pop/白斑底框@2x.png');
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
