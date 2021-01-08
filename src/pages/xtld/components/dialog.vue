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
                <div class="close bgi cp" @click="closeDialog"></div>
                <div class="body">
                    <iframe :src="src" frameborder=”no” border=”0″ marginwidth=”0″ marginheight=”0″ scrolling=”no” allowtransparency=”yes”></iframe>
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
            src: {
                type: String,
            }
        },

        data () {
            return {
                theWidth: '80%',
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
        width: 1500px;
        height: 800px;
        /*background: red;*/
        /*background-image: url('../../../assets/pop/外框2@2x.png');*/
        /*padding: 20px;*/
        /*background: #01123b;*/
        background: #003B73;
        border:1px solid #00a6e7;
        position: relative;
        iframe{
            width: 1500px;
            height: 800-10px;
        }
        .close {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 20px;
            top:10px;
            background-image: url('../../../assets/pop/关闭@2x.png');
        }
    }

    .body {
        /*margin-top: 10px;*/
        padding-left: 0px;
        padding-right: 0px;
        display: flex;
        justify-content: space-between;

    }
</style>
