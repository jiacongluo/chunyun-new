<template>
    <!--日期选择-->
    <div :class="[{'noborder': noborder},'dapick', {'dapick2': datePickerType==='daterange'}]">
        <div class="full-div showDiv">
            <span>{{showValue}}</span>
            <!--<i class="icon"></i>-->
        </div>
        <div class="d-box cp">
            <DatePicker
                v-model="value1"
                :clearable="false"
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
import  dateUtil from '../utils/dateUtil'
export default {
    name: '',

    mixins: [],

    components: {
        DatePicker
    },

    props: {
        formatType: {
            type: String,
            default: 'yyyy年MM月dd日' // yyyy-MM 月格式
        },
        noborder:false,
        value: [String]
    },

    data () {
        return {
            value1: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date(dateUtil.formateQueryDate(new Date())+" 00:00:00").getTime()||time.getTime()>=dateUtil.nextDays(new Date(),6).getTime();
                },
            },
            showValue: ''
        }
    },

    computed: {
        datePickerType () {
            return 'date'
        }
    },

    watch: {
        value(newValue, oldValue) {
            this.value1 = newValue;
        },
        value1(n, o) {
            this.init();
            this.$emit("update:value", this.value1)
        }
    },

    created () {},

    mounted () {
        this.value1=this.value;
        this.init()
    },

    destroyed () {},

    methods: {
        init () {
            this.showValue=this.value1;
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
    width: 105+44px;
    height: 19px;
    border:1px solid $bdColor;
    font-size:19px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(254,254,254,1);
    /*line-height:60px;*/
    position: relative;
}
.dapick2 {
    width: 105px;

}
    .showDiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0px 0px;
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
