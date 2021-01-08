<template>
    <div class="full-div">
        <div class="data-box-box5-header">
            <div class="line"></div>
            <ul class="data-box-box5-tab">
                <li v-for="(item,index) in dataBoxBox5Ul" :key="index"
                    @click="clickLi(index)"
                :class="['cp', {'active': index === active}]">
                    {{item.name}}
                </li>
            </ul>
            <div class="data-box-box5-date">
                <datePicker :noborder="true" :range="true"  v-if="active===2||active===3"></datePicker>
            </div>
        </div>
        <div class="data-box-box5">
            <box5Chart1 v-if="active===0" :id="5"></box5Chart1>
            <box5Chart2 v-if="active===1"></box5Chart2>
            <box5Chart3 v-if="active===2" :id="6"></box5Chart3>
            <box5Chart4 v-if="active===3"></box5Chart4>
        </div>
    </div>
</template>

<script>
import datePicker from '@/components/datePicker'
import box5Chart1 from './box5Chart1'
import box5Chart2 from './box5Chart2'
import box5Chart3 from './box5Chart3'
import box5Chart4 from './box5Chart4'
export default {
    name: '',

    mixins: [],

    components: {
        datePicker,
        box5Chart1,
        box5Chart2,
        box5Chart3,
        box5Chart4
    },

    props: {},

    data () {
        return {
            active: 0,
            dataBoxBox5Ul: [
                {
                    name: '实时客流趋势',
                },
                {
                    name: '实时客流驻留时长分析',
                },
                {
                    name: '总客流趋势',
                },
                {
                    name: '旅客趋势',
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
        clickLi (idx) {
            this.active = idx
        }
    }
}
</script>

<style lang='scss' scoped>
    .data-box-box5-header {
        display: flex;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color:rgba(255,255,255,1);
        /*line-height:60px;*/
        .line {
            /*position: absolute;*/
            /*background:rgba(0,204,255,1);*/
            height: 40px;
            width: 55px;
            border-bottom: 1px solid rgba(0,204,255,1);
        }

        li {
            width: 131px;
            height: 40px;
            border-bottom: 1px solid rgba(0,204,255,1);
            text-align: center;
            line-height: 40px;
            color: #ffffff;
        }
        li.active {
            border:1px solid rgba(0,204,255,1);
            border-radius:6px 6px 0px 0px;
            border-bottom: none;
            color: #00FFFF;

        }
        li:nth-child(2) {
            width: 181px;

        }

    }
    .data-box-box5-tab {
        flex: 1;
        position: relative;
        display: flex;
    }
    .data-box-box5-date {
        height: 40px;
        border-bottom: 1px solid rgba(0,204,255,1);
        /*background-color: #fff;*/
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .data-box-box5 {
        width: 100%;
        height: 209px;
        /*background-color: #fff;*/
    }
</style>
