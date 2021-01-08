<template>
    <!--一键派单 弹窗-->
    <div class="dia">
        <Dialog
            custom-class="dcls2"
            :top="theTop"
            :width="theWidth"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <iframe :src="showDialogHref" frameborder=”no” border=”0″ marginwidth=”0″ marginheight=”0″ scrolling=”no” allowtransparency=”yes”></iframe>

        </Dialog>

    </div>
</template>

<script>
import { Dialog } from 'element-ui';
import mapMixin from '@/utils/mapMixin'
export default {
    name: '',

    mixins: [mapMixin],

    components: {Dialog},

    props: {
        showDialog : {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            theWidth: '910px',
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
            // this.$emit('update:showDialog', false)
            this.$store.dispatch('showDialog', false)

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
            this.$store.dispatch('showDialog', false)

            // this.$emit('update:showDialog', false)

        },
    }
}
</script>

<style lang='scss' scoped>
    iframe {
        /*position: absolute;*/
        /*left: 0px;*/
        /*right: 0px;*/
        /*bottom: 0px;*/
        /*top: 0;*/
        width: 900px;
        height: 600px;
        background-color: #014c85;
    }
</style>
