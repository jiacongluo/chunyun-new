<template>
    <div class="full-div">
        <div class="box">
            {{data.num}}<i>{{data.unit}}</i>
            <div class="bgi sanjiao sanjiao1"></div>
            <div class="bgi sanjiao sanjiao2"></div>
        </div>
        <div class="name">
            {{data.name}}
        </div>
    </div>
</template>

<script>
export default {
    name: '',

    mixins: [],

    components: {},

    props: {
        data: {
            type: Object,
            default: {}
        }
    },

    data () {
        return {}
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {}
}
</script>

<style lang='scss' scoped>
.box {
    width: 100%;
    height:49px;
    background:rgba(0,0,0,0.21);
    border:2px solid rgba(72,184,255,1);
    position: relative;
    font-size:36px;
    font-family:unidreamledregular;
    font-weight:400;
    color:rgba(255,255,0,1);
    /*line-height:60px;*/
    line-height: 49px;
    text-align: center;
    /*letter-spacing: 5px;*/
    /*margin-right: 6px;*/
    i {
        font-size: 14px;
        color: #ffffff;
        margin-left: 6px;
    }
}
    .name {
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(254,254,254,1);
        /*line-height:60px;*/
        text-align: center;
        margin-top: 9px;
    }
    .sanjiao {
        width: 8px;
        height: 11px;
        background-image: url('../assets/sanjao.png');
        position: absolute;
        top: 17px;
    }
    .sanjiao1 {
        left: -4px;
    }
    .sanjiao2 {
        transform: rotate(180deg);
        right: -4px;
    }
</style>
