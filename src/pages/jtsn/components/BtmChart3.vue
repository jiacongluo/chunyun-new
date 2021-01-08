<template>
    <!--实时监控-->
    <div class="shishi full-div">
        <header>
            <!--<div class="header-l"></div>-->
            <ul>
                <li v-for="(item,index) in camList"
                    @click="clickLi(index,item)"
                    :class="[{'active': index===active}, 'cp']">
                    {{item.name}}
                </li>
            </ul>
            <!--<div class="header-r"></div>-->
        </header>
    </div>
</template>

<script>
export default {
    name: '',

    mixins: [],

    components: {},

    props: {},

    data () {
        return {
            active: -1,
            camList: [
                {
                    name: '东广场1#球机',
                    camID: '10101011001310000001'
                },
                {
                    name: '东广场2#球机',
                    camID: '10101011001310000002'
                },
                {
                    name: '东广场3#球机',
                    camID: '10101011001310000003'
                },
            ]
        }
    },

    computed: {},

    watch: {},

    created () {},

    mounted () {},

    destroyed () {},

    methods: {

    }
}
</script>

<style lang='scss' scoped>
.shishi {
    /*display: flex;*/
}
    ul {
        flex: 1;
        /*width: 100%;*/
        display: flex;
        color: #ffffff;
        font-size: 16px;
        border-bottom: 1px solid #00FFFF;

    }
    li {
        text-align: center;
        height: 38px;
        line-height: 38px;
        padding-right: 20px;
        padding-left: 20px;
        border-bottom: 1px solid #00FFFF;
        border-radius: 6px 6px 0 0;
    }
    li.active {
        color: #00FFFF;
        border: 1px solid #00FFFF;
        border-bottom: none;
    }
    header {
        padding-top: 3px;
        width: 100%;
        display: flex;
        height: 41px;
    }
    .header-l,.header-r  {
        min-width: 150px;
        border-bottom: 1px solid #00FFFF;
        height: 100%;
    }

</style>
