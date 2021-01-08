<template>
    <div class="app-view">
        <leftHeader :currentPage="'3'"></leftHeader>
        <!--<div class="fs_20">协调联动</div>-->
        <div class="part part-1">
            <div class="title-part">
                <div class="title1">
                  <span class="icon zhiban">bsp;
                </span>
                    <span class="title">
                    节假日值守排班
                </span>
                </div>
                <!--  <div class="title2">

              <span class="icon dianhua">
                </span>
                    <span class="title" @click="paiban2Visible=true" >
                    广东省春运工作联系方式
                </span>
                </div>

                <div class="title2">

                <span class="icon dianhua">&nbsp;
                </span>
                    <span class="title" @click="paiban3Visible=true">
                   地市春运工作联系方式
                </span>
                </div>-->
            </div>
            <div class="data-box-header-r">
                <dateRangePicker :value.sync="range" :range="true" :allDate="true"
                                 :datePickerType="'daterange'"></dateRangePicker>
            </div>
            <div class="left-nav" @click="loadBefore()" v-if="displayIndex>0">

            </div>
            <div class="right-nav" @click="loadNext()" v-if="displayIndex+7<panbanList.length">

            </div>
            <div class="ban-wrap">
                <div v-for="(item,index) in panbanList" class="item-ban"
                     v-if="displayIndex+7>index&&displayIndex<=index">
                    <div class="title">
                        <!--12月14日（周二）-->
                        {{item.schedulingDateStr}}
                    </div>
                    <div class="day">
                        <span class="icon"></span> 早班 {{item.dayName1}}
                    </div>
                    <div class="day">
                        <span class="icon"></span> 中班 {{item.dayName2}}
                    </div>
                    <div class="night">
                        <span class="icon"></span> 晚班 {{item.nightName}}
                    </div>
                    <div class="btns">
                        <div class="btn" @click="selectPanBan=item;paibanVisible=true">排班详情</div>
                        <!--<div class="btn">值班台账</div>-->
                    </div>
                </div>
            </div>

        </div>
        <div class="part part-2">
            <!--<div class="title-part">-->
            <!--<div class="icon renwuliu">-->

            <!--</div>-->
            <!--<div class="title">-->
            <!--协调任务配送单-->
            <!--</div>-->

            <!--</div>-->
            <div class="base-part-1">

            </div>
            <div class="base-part-2">

            </div>
            <div class="base-part-3">

            </div>
            <div class="base-part-4">

            </div>

            <div class="title-part">
                <span class="icon renwuliu">
                </span>
                <span class="title big">
                    节假日协调工单
                </span>
            </div>
            <div class="tab-titles">
                <!--<div class="icon renwuliu">-->

                <!--</div>-->
                <!--<div class="title">-->
                <!--协调任务接收单-->
                <!--</div>-->
                <!--<div :class="['tab-title', 'icon1',workflowDirection==1?'selected':'']" @click="workflowDirection=1">-->
                <!--协调任务配送单-->
                <!--</div>-->
                <!--<div :class="['tab-title', 'icon2',workflowDirection==2?'selected':'']" @click="workflowDirection=2">-->
                <!--协调任务接收单-->
                <!--</div>-->
            </div>
            <div class="title-btns">
                省交通厅
                <div v-if="workflowDirection==0" class="btn" @click="createWorkflow()">
                    新建
                </div>
                <div class="btn" @click="showWorkFlow()">
                    查看
                </div>
            </div>
            <div v-if="workflowDirection==0" class="total-part">
                <div class="item">
                    <div class="name">日工单</div>
                    <div class="number-part">
                        {{workflowTotal0.dayCount}}<span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">累计工单</div>
                    <div class="number-part">
                        {{workflowTotal0.allCount}}<span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">已完成</div>
                    <div class="number-part">
                        {{workflowTotal0.completeCount}}<span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">待办</div>
                    <div class="number-part">
                        {{workflowTotal0.dealCount}}<span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">超时</div>
                    <div class="number-part">
                        {{workflowTotal0.timeoutCount}}<span class="unit">单</span>
                    </div>
                </div>
            </div>
            <div v-if="workflowDirection==0" class="left-part">
                <div :class="['item',workType==1?'selected':'']" @click="workType=1">
                    <div class="name-part">
                        <div class="icon yujing"></div>
                        <div class="title">预警单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal1.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
                <div :class="['item',workType==2?'selected':'']" @click="workType=2">
                    <div class="name-part">
                        <div class="icon shujudan"></div>
                        <div class="title">数据单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal2.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
                <div :class="['item',workType==3?'selected':'']" @click="workType=3">
                    <div class="name-part">
                        <div class="icon xiezuodan"></div>
                        <div class="title">协作单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal3.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
                <div :class="['item',workType==4?'selected':'']" @click="workType=4">
                    <div class="name-part">
                        <div class="icon baozhangdan"></div>
                        <div class="title">保障单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal4.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
            </div>
            <div v-if="workflowDirection==0" :class="['right-part','selected'+workType]">
                <div v-if="detailBig==0||detailBig==1" :class="['item-part',detailBig==1?'big':'']">
                    <div class="title-part">
                        <div class="icon"></div>
                        <div class="title">地市明细</div>
                    </div>
                    <div class="item-content">
                        <div v-for="item in part2" class="item"
                             @click="selectedFlowDetail=item;getStatisticsDetail(item.orgId,item.orgName,workType,item)">
                            <div class="number">{{item.allCount}}</div>
                            <div class="name">{{item.orgName}}</div>
                        </div>
                        <!--<div v-for="item in 40" class="item">-->
                        <!--<div class="number">10</div>-->
                        <!--<div class="name">测</div>-->
                        <!--</div>-->
                    </div>
                    <!--<div :class="['more' ,detailBig==1?'return':'']" @click="detailBig==0?detailBig=1:detailBig=0"></div>-->
                    <!--<div class="more-text" @click="detailBig==0?detailBig=1:detailBig=0">查看更多</div>-->
                    <div class="more" v-if="part2.length>7" @click="detailBig==0?detailBig=1:detailBig=0"></div>
                    <div class="more-text" v-if="part2.length>7" @click="detailBig==0?detailBig=1:detailBig=0">查看更多
                    </div>
                </div>
                <div v-if="detailBig==0||detailBig==2" :class="['item-part',detailBig==2?'big':'']">
                    <div class="title-part">
                        <div class="icon">&nbsp;</div>
                        <div class="title">站场明细</div>
                    </div>
                    <div class="item-content">
                        <div v-for="item in part3" class="item"
                             @click="selectedFlowDetail=item;getStatisticsDetail(item.orgId,item.orgName,workType,item)">
                            <div class="number">{{item.allCount}}</div>
                            <div class="name">{{item.orgName}}</div>
                        </div>
                        <!--<div v-for="item in 40" class="item">-->
                        <!--<div class="number">10</div>-->
                        <!--<div class="name">测</div>-->
                        <!--</div>-->
                    </div>
                    <!--<div :class="['more' ,detailBig==2?'return':'']" @click="detailBig==0?detailBig=2:detailBig=0"></div>-->
                    <!--<div class="more-text" @click="detailBig==0?detailBig=2:detailBig=0">查看更多</div>-->
                    <div class="more" v-if="part3.length>7" @click="detailBig==0?detailBig=2:detailBig=0"></div>
                    <div class="more-text" v-if="part3.length>7" @click="detailBig==0?detailBig=2:detailBig=0">查看更多
                    </div>
                </div>
            </div>

            <!-- 任务接收单-->
            <div v-if="workflowDirection==4" class="total-part">
                <div class="item">
                    <div class="name">日工单</div>
                    <div class="number-part">
                        {{workflowTotal0.dayCount}}
                        <span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">累计工单</div>
                    <div class="number-part">
                        {{workflowTotal0.allCount}}<span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">已完成</div>
                    <div class="number-part">
                        {{workflowTotal0.completeCount}}<span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">待办</div>
                    <div class="number-part">
                        {{workflowTotal0.dealCount}}<span class="unit">单</span>
                    </div>
                </div>
                <div class="item">
                    <div class="name">超时</div>
                    <div class="number-part">
                        {{workflowTotal0.timeoutCount}}<span class="unit">单</span>
                    </div>
                </div>
            </div>
            <div v-if="workflowDirection==4" class="left-part">
                <div :class="['item',workType==1?'selected':'']" @click="workType=1;detailBig=0;">
                    <div class="name-part">
                        <div class="icon yujing"></div>
                        <div class="title">预警单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal1.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal1.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
                <div :class="['item',workType==2?'selected':'']" @click="workType=2;detailBig=0;">
                    <div class="name-part">
                        <div class="icon shujudan"></div>
                        <div class="title">数据单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal2.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal2.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
                <div :class="['item',workType==3?'selected':'']" @click="workType=3;detailBig=0;">
                    <div class="name-part">
                        <div class="icon xiezuodan"></div>
                        <div class="title">协作单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal3.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal3.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
                <div :class="['item',workType==4?'selected':'']" @click="workType=4;detailBig=0;">
                    <div class="name-part">
                        <div class="icon baozhangdan"></div>
                        <div class="title">保障单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.dayCount}}</div>
                        <div class="name">日工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.allCount}}</div>
                        <div class="name">累计工单</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.completeCount}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="value-part">
                        <div class="number">{{workflowTotal4.dealCount}}</div>
                        <div class="name">待办</div>
                    </div>
                    <div class="value-part red">
                        <div class="number">{{workflowTotal4.timeoutCount}}</div>
                        <div class="name">超时</div>
                    </div>
                </div>
            </div>
            <div v-if="workflowDirection==4" :class="['right-part','selected'+workType]">
                <div v-if="detailBig==0||detailBig==1" :class="['item-part',detailBig==1?'big':'']">
                    <div class="title-part">
                        <div class="icon"></div>
                        <div class="title">地市明细</div>
                    </div>
                    <div class="item-content">
                        <div v-for="item in part2" class="item"
                             @click="selectedFlowDetail=item;getStatisticsDetail(item.orgId,item.orgName,workType)">
                            <div class="number">{{item.allCount}}</div>
                            <div class="name" @title="item.orgName">{{item.orgName}}</div>
                        </div>
                        <!--<div v-for="item in 40" class="item">-->
                        <!--<div class="number">10</div>-->
                        <!--<div class="name">测</div>-->
                        <!--</div>-->
                    </div>
                    <!--<div :class="['more' ,detailBig==1?'return':'']" @click="detailBig==0?detailBig=1:detailBig=0"></div>-->
                    <!--<div class="more-text" @click="detailBig==0?detailBig=1:detailBig=0">查看更多</div>-->
                    <div class="more" v-if="part2.length>7" @click="detailBig==0?detailBig=1:detailBig=0"></div>
                    <div class="more-text" v-if="part2.length>7" @click="detailBig==0?detailBig=1:detailBig=0">查看更多
                    </div>
                </div>
                <div v-if="detailBig==0||detailBig==2" :class="['item-part',detailBig==2?'big':'']">
                    <div class="title-part">
                        <div class="icon">&nbsp;</div>
                        <div class="title">站场明细</div>
                    </div>
                    <div class="item-content">
                        <div v-for="item in part3" class="item"
                             @click="selectedFlowDetail=item;getStatisticsDetail(item.orgId,item.orgName,workType)">
                            <div class="number">{{item.allCount}}</div>
                            <div class="name" @title="item.orgName">{{item.orgName}}</div>
                        </div>
                        <!--<div v-for="item in 40" class="item">-->
                        <!--<div class="number">10</div>-->
                        <!--<div class="name">测</div>-->
                        <!--</div>-->
                    </div>
                    <!--<div :class="['more' ,detailBig==2?'return':'']" @click="detailBig==0?detailBig=2:detailBig=0"></div>-->
                    <!--<div class="more-text" @click="detailBig==0?detailBig=2:detailBig=0">查看更多</div>-->
                    <div class="more" v-if="part3.length>7" @click="detailBig==0?detailBig=2:detailBig=0"></div>
                    <div class="more-text" v-if="part3.length>7" @click="detailBig==0?detailBig=2:detailBig=0">查看更多
                    </div>
                </div>
            </div>
        </div>
        <div class="pop3-wrap" v-if="pop3Visible">
            <popWindow3 @close="pop3Visible=false" :arr="detailFlowData" :city="selectedFlowDetail.orgName"
                        :num="selectedFlowDetail.allCount" @onDetail="onDetail()"></popWindow3>
        </div>
        <popPaiban :showDialog.sync="paibanVisible"
                   v-if="paibanVisible"
                   :theData="selectPanBan"></popPaiban>
        <popPaiban2 :showDialog.sync="paiban2Visible"
                    v-if="paiban2Visible"></popPaiban2>
        <popPaiban3 :showDialog.sync="paiban3Visible"
                    v-if="paiban3Visible"></popPaiban3>
        <dialogEle :showDialog.sync="dialogVisible"
                   v-if="dialogVisible"
                   :src="src"></dialogEle>
    </div>
</template>

<script>
    import leftHeader from '@/components/leftHeader.vue'
    import dateRangePicker from '@/components/dateRangePicker2'
    import dateUtil from '../../utils/dateUtil'
    import {Progress} from 'element-ui'
    import popWindow3 from './components/popWindow3'
    import {get, post, getData} from '../../utils/core/http'
    import popPaiban from './components/popPaiban'
    import popPaiban2 from './components/popPaiban2'
    import popPaiban3 from './components/popPaiban3'
    import dialogEle from './components/dialog'
    import cookie from '@/utils/core/cookie.js'

    export default {
        name: '',

        mixins: [],

        components: {
            leftHeader,
            popWindow3,
            popPaiban3,
            popPaiban,
            popPaiban2,
            dateRangePicker,
            dialogEle
        },
        props: {},

        data() {
            return {
                displayIndex: 0,
                paibanVisible: false,
                paiban2Visible: false,
                paiban3Visible:false,
                dialogVisible: false,
                selectPanBan: {},
                src: '',
                workflowDirection: 0,
                selectPanBanItems: [],
                currentDate: dateUtil.formateQueryDate(new Date()),//'2019-01-28',
                panbanList: [],
                workType: 1,
                pop3Visible: false,
                orgId: '',
                workflowTotal0: {},
                workflowTotal1: {},
                workflowTotal2: {},
                workflowTotal3: {},
                workflowTotal4: {},
                part2: [],
                part3: [],
                selectFlow: {},
                detailFlowData: [],
                detailFlowName: '',
                detailBig: 0,
                range: [],
                baseUrl:''
            }
        },

        computed: {},

        watch: {
            detailBig(newValue,oldValue){
                // debugger;
            },
            dialogVisible(newValue, oldValue){
                if(!newValue){
                    this.getHomeDetail();
                    this.getStatistics(this.workType);
                }
            },
            workType(newValue, oldValue) {

                this.getStatistics(newValue);
                this.workType=newValue;
                this.detailBig=0;
            },
            selectPanBan(newValue, oldValue) {
                // debugger;
                this.selectPanBanItems = [];
            },
            currentDate(newValue, oldValue) {
                this.loadData(newValue);
            },
            async range(newDate, oldDate) {
                // debugger;
                // this.loadByRangDate(this.range[0], this.range[1]);
                this.loadRangeData();
            }
        },

        created() {
        },

        mounted() {
            this.baseUrl=AppConfig.workflowPageBaseUrl;
            this.range = [dateUtil.formateQueryDate(dateUtil.beforeDays(dateUtil.parserDate(this.currentDate), 2)),dateUtil.formateQueryDate(dateUtil.nextDays(dateUtil.parserDate(this.currentDate), 4+20))]
            // this.range = ['2020-01-10', '2020-02-18']
            // this.loadData(this.currentDate);
            this.loadRangeData();
            this.getHomeDetail();
            this.getStatistics(this.workType);
        },

        destroyed() {
        },

        methods: {
            showDialog(url) {
                this.dialogVisible = true;
                this.src = url;
            },
            onDetail() {
                //todo change
                // debugger;
                var theDepId=cookie.getCookie('deptId');
                var theUrlValue = this.baseUrl+"/travel/page/manage.html?flag=1&otherId="+ this.selectedFlowDetail.orgId+"&type="+ this.selectedFlowDetail.workType+"&id="+theDepId;
                console.log("查看详情", theUrlValue);
                this.showDialog(theUrlValue);
            },
            async loadData(date) {
                var theEndDate = dateUtil.parserDate(date);
                var theBeginDate = dateUtil.beforeDays(theEndDate, 6);
                var theBeginStr = dateUtil.formateQueryDate(theBeginDate);
                var theEndStr = dateUtil.formateQueryDate(theEndDate);
                this.getHolidaySchedulingList(theBeginStr, theEndStr);
            },
            async loadRangeData() {
                var theBeginStr = this.range[0];
                var theEndStr = this.range[1];
                this.displayIndex = 0;
                this.getHolidaySchedulingList(theBeginStr, theEndStr);
            },
            async loadNext() {
                // var theEndDate = dateUtil.parserDate(this.currentDate);
                // var theBeginDate = dateUtil.nextDays(theEndDate, 7);
                // var theBeginStr = dateUtil.formateQueryDate(theBeginDate);
                // this.currentDate = theBeginStr;
                var theIndex = this.displayIndex + 7;
                if (theIndex >= this.panbanList.length) {
                    theIndex = this.panbanList.length - 1;
                }
                if (theIndex < 0) {
                    theIndex = 0;
                }
                this.displayIndex = theIndex;
                // var theOldData=this.panbanList;
                // var theNewArray=[];
                // for(var i=0;i<theOldData.length;i++){
                //     theNewArray.push(theOldData[i]);
                // }
                // this.panbanList=theNewArray;
            },
            async loadBefore() {
                // var theEndDate = dateUtil.parserDate(this.currentDate);
                // var theBeginDate = dateUtil.beforeDays(theEndDate, 7);
                // var theBeginStr = dateUtil.formateQueryDate(theBeginDate);
                // this.currentDate = theBeginStr;
                var theIndex = this.displayIndex - 7;
                if (theIndex < 0) {
                    theIndex = 0;
                }
                // debugger;
                this.displayIndex = theIndex;
                // var theOldData=this.panbanList;
                // var theNewArray=[];
                // for(var i=0;i<theOldData.length;i++){
                //     theNewArray.push(theOldData[i]);
                // }
                // this.panbanList=theNewArray;
            },
            createWorkflow() {
                //todo change
                var theDepId=cookie.getCookie('deptId');
                // debugger;
                this.showDialog(this.baseUrl+"/travel/page/newWorkOrder1.html?flag=1&id="+theDepId+"&type="+this.workType);
            },
            showWorkFlow() {
                //todo change
                var theDepId=cookie.getCookie('deptId');
                this.showDialog(this.baseUrl+"/travel/page/manage.html?id="+theDepId);
            },
            //二级数据
            ////api/gmcc/getStatistics
            async getStatistics(workType) {
                var theDepId=cookie.getCookie('deptId');
                let theData = await getData("/travel/order/getOrderCountByCity", {type: workType,flag:1,id:theDepId});
                // let theData2 = await getData("/travel/order/getOrderCountByStation", {type: workType});
                /**
                 *  {
      "orgType": 2,
      "orgName": "广州",
      "workCount": 0,
      "orgId": "e8506f3e-0b17-44bd-8533-5ab7b684407c"
    }
                 */
                var theDataList = (theData.data || []);
                // var theDataList2 = (theData2.data || []);
                theDataList.map(m=>{
                    m.dayCount=m['dayOrder'];
                    m.workTypeName=m['orderTypeName'];
                    m.workType=m['orderType'];
                    m.allCount=m['sumOrder'];
                    m.completeCount=m['finishOrder'];
                    m.dealCount=m['unfinishOrder'];
                    m.timeoutCount=m['overtimeOrder'];
                    m.orgName=m['cityName']||m['name'];
                    m.orgId=m['cityId']||m['id'];
                });
               var theDataList1= theDataList.filter(m=>m.orgType=='2');
               var theDataList2= theDataList.filter(m=>m.orgType=='3');
                this.part2 = theDataList1;
                this.part3 = theDataList2;
            },
            //三级数据
            ///api/gmcc/getStatisticsDetail
            async getStatisticsDetail(orgId, orgName, workType,item) {

                // debugger;
                let theData =item;// await getData("/api/gmcc/getStatisticsDetail", {orgId: orgId, workType: workType});
                /**"dayCount": 0,
                 "workTypeName": "协作单",
                 "workType": 3,
                 "allCount": 0,
                 "completeCount": 0,
                 "dealCount": 0,
                 "timeoutCount": 0
                 */
                    //工作流明细
                var theDatas = [theData.dayCount, theData.allCount,
                        theData.completeCount, theData.dealCount, theData.timeoutCount];
                this.detailFlowData = theDatas;
                this.detailFlowName = orgName;
                this.pop3Visible = true;
            },
            //得到一级数据
            async getHomeDetail() {
                var theDepId=cookie.getCookie('deptId');
                let theData = await getData("/travel/order/getOrderCount", {id:theDepId,flag:'1'});
                //workType: 0 1 2 3 4 对应workTypeName 所有单 预警单 数据单 协作单 保障单
                /**
                 * {
      "dayCount": 0,
      "workTypeName": "保障单",
      "workType": 4,
      "allCount": 2,
      "completeCount": 0,
      "dealCount": 0,
      "timeoutCount": 2
    }
                 */
                for (var i = 0; i <= 4; i++) {
                    this['workflowTotal' + i] = {
                        "dayCount": 0,
                        workType: i,
                        "allCount": 0,
                        "completeCount": 0,
                        "dealCount": 0,
                        "timeoutCount": 0
                    };
                }
                theData.data.map(m => {
                    m.dayCount=m['dayOrder'];
                    m.workTypeName=m['orderTypeName'];
                    m.workType=m['orderType'];
                    m.allCount=m['sumOrder'];
                    m.completeCount=m['finishOrder'];
                    m.dealCount=m['unfinishOrder'];
                    m.timeoutCount=m['overtimeOrder'];
                    this['workflowTotal' + m.workType] = m;
                });
            },
            async getHolidaySchedulingList(startDate, endDate) {
                ///api/xtld/holidaySchedulingList
                let theData = await getData("/api/xtld/holidaySchedulingList", {
                    channel: '交通厅',
                    startDate: startDate,
                    endDate: endDate
                });
                /**
                 *     {
        "id": 609,
        "schedulingDate": "2019-01-22",
        "unit": "广州交通厅",
        "department": "后勤部",
        "name": "王五",
        "contactWay": "13434147770",
        "onDutyType": "白班",
        "jobCategory": "高级",
        "createTime": "2019-12-20T07:15:33",
        "updateTime": null,
        "channel": "交通厅"
      },
                 {
                   "id": 612,
                   "schedulingDate": "2019-01-22",
                   "unit": "广州交通厅",
                   "department": "后勤部",
                   "name": "王五",
                   "contactWay": "13434147770",
                   "onDutyType": "夜班",
                   "jobCategory": "高级",
                   "createTime": "2019-12-20T07:15:33",
                   "updateTime": null,
                   "channel": "交通厅"
                 }
                 */
                var theDataList = theData.data;
                var weekMap = {
                    0: '星期日',
                    1: '星期一',
                    2: '星期二',
                    3: '星期三',
                    4: '星期四',
                    5: '星期五',
                    6: '星期六'
                }

                var theResultList = [];
                for (var key in theDataList) {
                    var m = theDataList[key];
                    var theObj = {schedulingDate: '', dayName: '', nightName: ''};
                    m.map(n => {
                        if (n.onDutyType == "夜班") {
                            theObj.schedulingDate = n.schedulingDate;
                            theObj.schedulingDateStr = theObj.schedulingDate + "(" + weekMap[dateUtil.parserDate(theObj.schedulingDate).getDay()] + ")";
                            theObj.nightName = n.name;
                            theObj.nightDepartment = n.department;
                            theObj.nightJobCategory = n.jobCategory;
                            theObj.nightContactWay = n.contactWay;
                            theObj.nightTimeRange = "20:00-次日8:10";
                        }
                        if (n.onDutyType == "白班1") {
                            theObj.dayTimeRange1 = "8:00-12:00";
                            theObj.schedulingDate1 = n.schedulingDate;
                            theObj.dayName1 = n.name;
                            theObj.schedulingDateStr1 = theObj.schedulingDate1 + "(" + weekMap[dateUtil.parserDate(theObj.schedulingDate1).getDay()] + ")";
                            theObj.dayDepartment1 = n.department;
                            theObj.dayJobCategory1 = n.jobCategory;
                            theObj.dayContactWay1 = n.contactWay;
                        }
                        if (n.onDutyType == "白班2") {
                            theObj.dayTimeRange2 = "14:00-20:10";
                            theObj.schedulingDate2 = n.schedulingDate;
                            theObj.dayName2 = n.name;
                            theObj.schedulingDateStr2 = theObj.schedulingDate2 + "(" + weekMap[dateUtil.parserDate(theObj.schedulingDate2).getDay()] + ")";
                            theObj.dayDepartment2 = n.department;
                            theObj.dayJobCategory2 = n.jobCategory;
                            theObj.dayContactWay2 = n.contactWay;
                        }
                    });
                    theResultList.push(theObj);
                }
                var theDefaultResultList = dateUtil.genDayDataAndMerge(dateUtil.parserDate(startDate), dateUtil.parserDate(endDate), 1, {
                    "schedulingDateStr": '',
                    "schedulingDate": '',
                    "nightName": '',
                    "nightDepartment": '',
                    "nightContactWay": '',
                    "nightJobCategory": '',
                    "nightTimeRange": '20:00-次日8:10',
                    "dayName1": '',
                    "dayDepartment1": '',
                    "dayContactWay1": '',
                    "dayJobCategory1": '',
                    "dayTimeRange1": '8:00-12:00',

                    "dayName2": '',
                    "dayDepartment2": '',
                    "dayContactWay2": '',
                    "dayJobCategory2": '',
                    "dayTimeRange2": '14:00-20:10',
                }, theResultList, m => m.schedulingDate);

                theResultList = theDefaultResultList.map(m => {
                    m.value.schedulingDate = m.date;
                    m.value.schedulingDateStr = m.date + "(" + weekMap[dateUtil.parserDate(m.date).getDay()] + ")";
                    ;
                    return m.value;
                });
                this.panbanList = theResultList;// theResultList.reverse();
            }
        },

    }
</script>

<style lang='scss' scoped>
    .app-view {

        .pop3-wrap {
            position: absolute;
            width: 645px;
            height: 342px;
            left: 638px;
            /*left: 395px;*/
            top: 242px;
        }
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        width: 1920px;
        height: 1080px;
        background-color: #0E2850;
        background-image: url("../../assets/bg/协调联动@2x.png");
        /*background-image: url("assets/bg@2x.png");*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
        * {
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .part-1 {
            position: absolute;
            top: 107px;
            left: 0px;
            right: 0px;
            height: 336px;
            .title-part {
                border-bottom: 1px solid #1D9AE9;
                /*padding-top: 5px;*/
                width: 1870px;
                height: 50-5px;
                position: absolute;
                top: 0-2px !important;
                left: 24+8px !important;
                vertical-align: middle;
                .icon {
                    width: 26px;
                    height: 45px;
                    /*position: relative;*/
                    background-size: 26px 26px;
                    background-repeat: no-repeat;
                    background-position: center center;
                    margin-left: 10px !important;
                    display: inline-block;

                }
                .title {
                    position: relative;
                    margin-left: 9px;
                    display: inline-block;
                    &:hover {
                        color: #00F6FF;
                    }
                    /*line-height: 26px;*/
                    font-size: 24px !important;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(253, 253, 253, 1);
                    height: 45px;
                    padding-right: 10px;
                }
                .title1 {
                    border-right: 1px solid rgba(29, 154, 233, 1);
                    text-align: center;
                    height: 45px;
                    line-height: 45px;
                    margin-left: 45px;
                    display: inline-block;
                    /*background: red;*/
                    cursor: pointer;
                    &:hover {
                        .icon {
                            background-image: url("assets/排班2@2x.png");
                        }
                    }

                }
                .title2 {
                    border-right: 1px solid rgba(29, 154, 233, 1);
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    display: inline-block;
                    cursor: pointer;
                    /*background: red;*/
                    &:hover {
                        .icon {
                            background-image: url("assets/电 话 拷贝@2x.png");
                        }
                    }

                }

            }
            .data-box-header-r {
                position: absolute;
                right: 78px;
                top: 0px;
                height: 40px;
                width: 300px;
            }
            .left-nav {
                cursor: pointer;
                position: absolute;
                left: 35px;
                top: 133-8px;
                width: 24px;
                height: 122px;
                background-image: url("assets/左箭头@2x.png");
            }
            .right-nav {
                cursor: pointer;
                position: absolute;
                right: 37px;
                top: 133-8px;
                width: 24px;
                height: 122px;
                background-image: url("assets/右箭头@2x.png");
            }
            .ban-wrap {
                height: 239px;
                position: absolute;
                left: 63px;
                top: 74-14-8px;
                right: 71px;
                overflow: hidden;
                .item-ban {
                    position: relative;
                    display: inline-block;
                    width: 253px;
                    background-image: url("assets/数据bg（蓝）@2x.png");
                    height: 239px;
                    margin-left: 2px;
                    &:nth-child(even) {
                        background-image: url("assets/bg(绿色)@2x.png");
                    }
                    .title {
                        margin-top: 16px;
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        /*font-weight:400;*/
                        color: rgba(255, 255, 255, 1);
                    }
                    .day {
                        font-size: 16px;
                        height: 34-10px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        margin-top: 31-10px;
                        width: 100%;
                        padding-left: 27px;
                        line-height: 34-10px;
                        .icon {
                            background-image: url("assets/白天-晴@2x.png");
                            width: 34-10px;
                            height: 34-10px;
                            margin-right: 21px;
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            display: inline-block;
                        }

                    }
                    .night {
                        font-size: 16px;
                        height: 34-10px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        margin-top: 24-10px;
                        width: 100%;
                        padding-left: 27px;
                        line-height: 34-10px;
                        .icon {
                            background-image: url("assets/月亮@2x.png");
                            width: 34-10px;
                            height: 34-10px;
                            margin-right: 21px;
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            display: inline-block;
                        }
                    }
                    .btns {
                        margin-top: 24px;
                        width: 100%;
                        padding-left: 14px;
                        font-size: 16px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        .btn {
                            display: inline-block;
                            cursor: pointer;
                            background: rgba(13, 82, 125, 0.2);
                            border: 1px solid #00FF99;
                            border-radius: 20px;
                            width: 109*2px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            margin-right: 8px;
                            &:hover {
                                border: 1px solid yellow;
                            }
                        }
                    }
                }
            }

        }
        .part-2 {
            position: absolute;
            top: 429px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            .title-part {
                position: relative!important;
                .title {
                    &.big {
                        font-size: 24px;
                    }
                }
            }
            .base-part-1 {
                position: absolute;
                left: 33+8px;
                width: 37-8px;
                top: 0px;
                height: 56-3px;
                border-bottom: solid 1px #1D9AE9;
            }
            .base-part-2 {
                position: absolute;
                /*display: none;*/
                left: 33+8+37-8+246-1px;
                width: 10+1px;
                top: 0px;
                height: 56-3px;
                border-bottom: solid 1px #1D9AE9;
            }
            .base-part-3 {
                position: absolute;
                left: 33+8+37+246+246px;
                right: 40-8px;
                top: 0px;
                height: 56-3px;
                border-bottom: solid 1px #1D9AE9;
            }
            .base-part-4 {
                position: absolute;
                left: 33+8px;
                width: 300+300px;
                top: 0px;
                height: 56-3px;
                border-bottom: solid 1px #1D9AE9;
            }
            .tab-titles {
                position: absolute;
                left: 69px;
                top: 10-3px;
                .tab-title {
                    border-radius: 15px 15px 0px 0px;
                    cursor: pointer;
                    position: relative;
                    display: inline-block;
                    font-size: 24px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    padding-left: 57-15px;
                    width: 246px;
                    background-size: 26px 22px;
                    margin-right: 10px;
                    background-position: 21px center;
                    background-repeat: no-repeat;
                    text-align: center;
                    line-height: 44px;
                    border: solid 1px #1D9AE9;
                    &.selected {
                        font-weight: bold;
                        color: rgba(0, 255, 234, 1);
                    }
                    &.icon1 {
                        background-image: url("assets/配送默认状态@2x.png");
                        /*border-bottom: none;*/
                        &.selected {
                            background-image: url("assets/配送选中状态@2x.png");
                            border-bottom: none;
                        }
                    }
                    &.icon2 {
                        background-image: url("assets/接收单默认状态@2x.png");
                        /*border-bottom: none;*/
                        &.selected {
                            background-image: url("assets/接收单选中状态@2x.png");
                            border-bottom: none;
                        }
                    }
                }
            }

            .title-btns {
                position: absolute;
                right: 85px;
                top: 0px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                padding-left: 20px;
                border-left: solid 1px #1D9AE9;
                height: 52px;
                .btn {
                    font-size: 16px;
                    width: 120px;
                    height: 51px;
                    text-align: center;
                    display: inline-block;
                    line-height: 51px;
                    font-family: MicrosoftYaHei;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    background-image: url("assets/查看按钮@2x.png");

                    &:hover {
                        color: rgba(255, 204, 0, 1);
                        background-image: url("assets/新建按钮@2x.png");
                    }

                }
            }
            .total-part {
                position: absolute;
                left: 0px;
                top: 497-429px;
                right: 0px;
                height: 63px;
                padding-left: 68px;
                .item {
                    display: inline-block;
                    position: relative;
                    background-image: url("assets/外框@2x.png");
                    width: 331px;
                    height: 71px;
                    margin-left: 33px;
                    &:nth-child(1) {
                        margin-left: 0px !important;
                    }
                    &:nth-child(even) {
                        .number-part {
                            color: #FFCC00;
                        }

                    }
                    .name {
                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        text-align: left;
                        padding-left: 40px;
                        padding-top: 26px;
                    }
                    .number-part {
                        font-size: 30px;
                        /*font-family: unidreamledregular;*/
                        font-weight: normal;
                        color: rgba(0, 255, 204, 1);
                        line-height: 71px;
                        position: absolute;
                        left: 150px;
                        top: 0px;
                        .unit {
                            font-size: 16px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            margin-left: 26px;
                        }
                    }

                }
            }
            .left-part {
                position: absolute;
                /*background: red;*/
                left: 62px;
                right: 1325px;
                top: 497-429+71+13px;
                bottom: 37px;
                .item {
                    width: 533px;
                    height: 111px;
                    cursor: pointer;
                    background-image: url("assets/默认@2x.png");
                    margin-bottom: 8px;
                    &:nth-child(0) {
                        margin-bottom: 0px !important;
                    }
                    &.selected {
                        background-image: url("assets/选中框@2x.png");
                        .yujing {
                            background-image: url("assets/tab/铃铛 拷贝@2x.png") !important;;
                        }
                        .shujudan {
                            background-image: url("assets/tab/数据 拷贝@2x.png") !important;;
                        }
                        .xiezuodan {
                            background-image: url("assets/tab/协助 拷贝@2x.png") !important;;
                        }
                        .baozhangdan {
                            background-image: url("assets/tab/安全保障 拷贝@2x.png") !important;;
                        }
                    }
                    .name-part {
                        width: 53*2px !important;
                        height: 53*2px !important;
                        padding-top: 27px;
                        display: inline-block;
                        text-align: center;
                        .icon {
                            width: 28px;
                            height: 32px;
                            display: inline-block;
                            &.yujing {
                                background-image: url("assets/tab/铃铛@2x.png");
                            }
                            &.shujudan {
                                background-image: url("assets/数据@2x.png");
                            }
                            &.xiezuodan {
                                background-image: url("assets/协助@2x.png");
                            }
                            &.baozhangdan {
                                background-image: url("assets/安全保障@2x.png");
                            }
                        }
                        .title {
                            font-size: 16px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            margin-top: 10px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                    .value-part {
                        text-align: center;
                        display: inline-block;
                        width: 85px !important;
                        .number {
                            margin-top: 34px;
                            font-size: 36px;
                            /*font-family: unidreamledregular;*/
                            font-weight: normal;
                            color: rgba(0, 255, 153, 1);
                        }
                        &.red {
                            .number {
                                color: #FF6666;
                            }
                        }
                        .name {
                            font-size: 16px;
                            margin-top: 10px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }
            .right-part {
                position: absolute;
                /*background: blue;*/
                left: 594px;
                right: 67px;
                top: 497-429+71+13px;
                bottom: 37px;
                background-image: url("assets/地市明细BG@2x.png");
                &.selected1 {
                    background-image: url("assets/tab/01@2x.png") !important;
                }
                &.selected2 {
                    background-image: url("assets/tab/02@2x.png") !important;;
                }
                &.selected3 {
                    background-image: url("assets/tab/03@2x.png") !important;;
                }
                &.selected4 {
                    background-image: url("assets/tab/04@2x.png") !important;;
                }
                .item-part {
                    height: 214px;
                    border-bottom: 1px solid rgba(0, 255, 153, 1);
                    width: 1259-22px;
                    margin-left: 18px;
                    cursor: pointer;
                    position: relative;

                    .title-part {
                        position: absolute;
                        /*line-height: 20px;*/
                        text-align: left;
                        top: 25px;
                        left: 0px;
                        height: 46px;
                        line-height: 26px;
                        .icon {
                            width: 4px;
                            height: 16px;
                            margin-left: 14px !important;
                            background: rgba(0, 246, 255, 1);
                            margin-right: 10px;

                        }
                        .title {
                            font-size: 20px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                    .item-content {
                        position: absolute;
                        top: 48px;
                        left: 14px;
                        right: 0px;
                        bottom: 0px;
                        text-align: left;
                        overflow: hidden;
                        height: 110px;

                        .item {
                            width: 171px;
                            height: 111px;
                            text-align: center;
                            margin-bottom: 10px;
                            background-image: url("assets/矩形 973@2x.png");
                            display: inline-block;
                            .number {
                                font-size: 36px;
                                /*font-family: unidreamledregular;*/
                                font-weight: normal;
                                color: rgba(0, 255, 153, 1);
                                margin-top: 30px;
                            }
                            .name {
                                font-size: 16px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                /*height: 32px;*/
                                color: rgba(255, 255, 255, 1);
                                width: 171px;
                                padding-left: 10px;
                                padding-right: 10px;
                                text-align: center;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }
                        }

                    }
                    .more {
                        width: 18px;
                        height: 20px;
                        background-image: url("assets/下拉@2x.png");
                        position: absolute;
                        bottom: 20px;
                        left: 572px;
                        cursor: pointer;
                    }
                    .more-text {
                        width: 100px;
                        height: 16px;
                        position: absolute;
                        bottom: 22px;
                        left: 600px;
                        font-size: 16px;
                        text-align: left;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        cursor: pointer;
                    }
                    &.big {
                        height: 456px;
                        .item-content {
                            height: 456-100px;
                            right: 15px;
                            overflow-y: auto;

                        }
                        .more {
                            background-image: url("assets/上拉@2x.png");
                        }
                    }
                }
            }

        }
        .part {
            position: absolute;
            .title-part {
                position: absolute;
                /*line-height: 20px;*/
                top: 14px;
                left: 0px;
                height: 46px;
                line-height: 26px;
                .icon {
                    width: 26px;
                    height: 26px;
                    margin-left: 69px;
                    display: inline-block;
                    background-position: left center;
                    &.zhiban {
                        background-image: url("assets/排班@2x.png");
                        &:hover {
                            background-image: url("assets/排班2@2x.png");
                        }

                    }
                    &.dianhua {
                        background-image: url("assets/电 话@2x.png");
                        &:hover {
                            background-image: url("assets/电 话 拷贝@2x.png");
                        }
                    }
                    &.renwuliu {
                        background-image: url("assets/应急_ICON@2x.png");

                    }

                }
                .title {
                    margin-left: 9px;
                    display: inline-block;
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(253, 253, 253, 1);
                }
            }
            .part-content {
                position: absolute;
                bottom: 0px;
                left: 0px;
                right: 0px;
            }
        }
    }

    ::-webkit-scrollbar {
        width: 7px;
        /* height: 41px; */
        background-color: rgba(133, 177, 224, 0.22);
    }

    /* .item-content */
    ::-webkit-scrollbar-thumb {
        width: 7px;
        height: 41px;
        background: rgba(16, 125, 201, 1);
        border-radius: 4px;
    }
</style>
