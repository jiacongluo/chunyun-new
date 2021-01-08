<template>
    <!--无人机 视频播放-->
    <div class="ifa-div">
        <iframe class="v-div" :src="`${playUrl}`" frameborder="0" width="800" height="450"></iframe>
        <!--<iframe class="v-div" src="https://appfactoryengineapp.bingolink.biz/bhxvbmk9gyjsh8rzvztkz4/#/qcMMsNDVNYFMJz5JYbHpvP/page/Ca8EdD4MzvzsDdeA8QH8c5/zMwJYNbxNRP8HBoxSVKxKK?_t=1577089976996&type=3&reOrgId=f998709c-fe5d-4ca5-87c2-0e90d90fdef3&userId=080fdc4e-776a-4c5a-adcf-4b147cbbaecd" frameborder="0" width="800" height="450"></iframe>-->
        <div class="close-ifa-box cp" @click="clickClose">
            <div class="close-ifa"></div>
        </div>
    </div>
</template>

<script>
import mixin from '@/utils/myMixin'

export default {
    name: '',

    mixins: [mixin],

    components: {},

    props: {},

    data () {
        return {
        }
    },

    computed: {
    },

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {
        clickClose () {
            this.$store.dispatch('showUAVIframe', false)

        }
    }
}
</script>

<style lang='scss' scoped>
    .ifa-div {
        //@include center;
        z-index: 999;
        position: absolute;
        right: 55px;
        top: 350px;
    }
    .close-ifa-box {
        width: 22px;
        height: 20px;
        background: url("../assets/关闭BG@2x.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 0px;
        top: 0px;
    }
    .close-ifa {
        width: 12px;
        height: 12px;
        background: url("../assets/关闭@2x.png") no-repeat;
        background-size: 100% 100%;
        @include center;
    }
</style>
