<template>
    <!--日期选择-->
    <div :class="['dapick', {'dapick2': datePickerType==='daterange'}]">
        <div class="full-div showDiv">
            <span>{{showValue}}</span>
            <i class="icon"></i>
        </div>
        <div class="d-box cp">
            <DatePicker
                v-model="value1"
                :type="datePickerType"
                :picker-options="pickerOptions"
                :value-format="formatType"
                start-placeholder=""
                end-placeholder=""
            ></DatePicker>
        </div>
    </div>
</template>

<script>
import {DatePicker} from 'element-ui'
import mixin from '@/utils/myMixin'
export default {
    name: '',

    mixins: [mixin],

    components: {
        DatePicker
    },

    props: {
        formatType: {
            type: String,
            default: 'yyyy-MM-dd' // yyyy-MM 月格式
        },
        range: { // 是不是日期范围
            type: Boolean,
            default: false
        },
    },

    data () {
        return {
            value1: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            showValue: ''
        }
    },

    computed: {
        datePickerType () {
            return this.range ? 'daterange' : 'date'
        }
    },

    watch: {
        value1 (n, o) {
            // debugger
            if (this.range) {
                this.showValue = this.value1[0] + ' - ' + this.value1[1]

                this.$store.dispatch('dateRange', n)
            } else {
                this.showValue = this.value1

                this.$store.dispatch('checkDate', n)

            }
        },
        range (n, o) {
            this.init()
        }
    },

    created () {},

    mounted () {
        this.init()
    },

    destroyed () {},

    methods: {
        init () {
            if (this.range) {
                this.value1 = this.dateRange
                this.showValue = this.value1[0] + ' - ' + this.value1[1]
            } else {
                this.value1 = this.checkDate
                this.showValue = this.checkDate
            }
        },
        // 点击后获得焦点, 层级下去, 下次点击同样位置 日期选择器就会失去焦点消失
        focusEve () {
            this.zIdx = -1
        },
        blurEve () {
            this.zIdx = 10
        }
    }
}
</script>

<style lang='scss' scoped>

.dapick {
    width: 190px;
    height: 40px;
    border:1px solid #00C0FF;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(254,254,254,1);
    /*line-height:60px;*/
    position: relative;
}
.dapick2 {
    width: 290px;

}
    .showDiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 17px 0px;
    }
    .icon {
        width: 20px;
        height: 20px;
        background: url("../assets/日期_iocn@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .d-box {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
