<template>
    <div :class="['sw-btn']" @click="clickSWBtn">
        <div :class="['item',isSelected?'selected':'']">卫星</div>
        <div :class="['item',isSelected?'':'selected']">地图</div>
    </div>
</template>

<script>
    import mapMixin from '@/utils/mapMixin'

    export default {
        name: '',

        mixins: [mapMixin],

        components: {},

        props: {},

        data() {
            return {
                isSelected: true,
            }
        },

        computed: {},

        watch: {},

        created() {
        },

        mounted() {
            // this.isSelected=true;
        },

        destroyed() {
        },

        methods: {
            clickSWBtn() {
                this.$emit('changeSatellite');
                this.isSelected = !this.isSelected;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .sw-btn {
        position: absolute;
        width: 130px;
        height: 49-9px;
        background: #135BAB;
        /*font-size:20px;*/
        /*color: #ffffff;*/
        /*background-color: #1a499b;*/
        /*border: 1px solid #00C0FF;*/
        /*@include defaultFlex;*/
        .item {
            width: 32px;
            height: 49-9px;
            text-align: center;
            display: inline-block;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(236, 236, 236, 1);
            line-height: 49-9px;
            width: 65px;
            cursor: pointer;
            &.selected {
                background: #0782FF;
            }
        }
    }
</style>
