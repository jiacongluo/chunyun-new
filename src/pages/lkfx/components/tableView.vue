<template>
    <div class="table-view">
        <table>
            <thead>
            <tr>
                <th >
                    排名
                </th>
                <th style="width: 150px">
                    {{type==1?"国家":"省份"}}
                </th>
                <th style="width: 150px">
                    {{direction==1?'迁入':'迁出'}}人数
                </th>
                <th style="width: 150px">
                    公路
                </th>
                <th style="width: 150px">
                    水路
                </th>
                <th style="width:150px">
                    铁路
                </th>
                <th style="width: 150px">
                    民航
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in  items" :key="index" v-if="index>=beginIndx&&index<endIndex">
                <td>
                    <!--<span :class="['row-'+(index+1)]">{{index+1}}</span>-->
                    {{index+1}}
                </td>
                <td>
                    {{item.area}}
                </td>
                <td>
                    {{ parseFloat(item.num+''||'0').toFixed(0)}}人
                </td>


                <td>
                    {{((item.channel2||0)*100).toFixed(2)}}%
                </td>
                <td>
                    {{((item.channel3||0)*100).toFixed(2)}}%
                </td>
                <td>
                    {{((item.channel1||0)*100).toFixed(2)}}%
                </td>
                <td>
                    {{((item.channel0||0)*100).toFixed(2)}}%
                </td>
            </tr>
            </tbody>
        </table>
        <div class="page">
            <div v-for="page in  pageCount" @click="loadPage(page-1)"
                 :class="['page-item',pageIndex==page-1?'select':'']"></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'table-view',

        mixins: [],

        components: {},

        props: {
            data: {type: [Array, String, Number]},
            type: {type: [String, Number], default: 1},//1 境外，2 省内 3 省外
            direction: {type: [String, Number], default: 1} //1 迁入 2 迁出

        },

        data() {
            return {
                pageCount: 1,
                pageSize: 5,
                beginIndx: 0,
                endIndex: 5,
                pageIndex: 0,
                items: [],
                //渠道类型:1公路，2民航，3水路，4铁路
                channelMap: {
                    "2": 0,
                    "1": 1,
                    "4": 2,
                    "3": 3,
                },
            }
        },

        computed: {},

        watch: {
            async data(newData, oldData) {
                this.loadData(newData);
            }
        },

        created() {
        },

        async mounted() {
            this.loadData(this.data);
        },

        destroyed() {
        },

        methods: {
            /**
             * 图形大小更改
             * */
            async refresh() {
            },
            /***
             * 初始化地球
             */
            async initChart() {

            },

            async loadPage(page) {
                this.pageIndex = page;
                this.beginIndx = this.pageSize * this.pageIndex;
                this.endIndex = this.beginIndx + this.pageSize;
            },
            async initData() {

            },
            async loadData(data) {
                var theData = data || [];
                this.items=theData;
                var thePageCount = Math.ceil(this.items.length / this.pageSize);
                this.pageCount = thePageCount;
                // debugger;
                this.loadPage(0);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .table-view {
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        table {
/*
            width: 968px;
*/
            position: absolute;
            top: 0px;
            left: 24px;
            right: 34px;
            bottom: 19+8px;
            table-layout: fixed;
            thead tr {
                height: 43px;
            }
            thead tr th {
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(0, 255, 255, 1)
            }
            /*thead tr  th:nth-child(1){*/
            /*text-align: left;*/
            /*}*/
            /*thead tr th:nth-child(7){*/
            /*text-align: right;*/
            /*}*/
            tbody tr {
                height: 43px;
            }
            tbody tr:nth-child(even) {
                background: #194EA3;
            }
            tbody td {
                font-size: 16px;
                text-align: center;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                .row-1 {
                    width: 36px;
                    height: 30px;
                    line-height: 30px;
                    background-image: url("../assets/world/排名1@2x.png");
                    background-repeat: no-repeat;
                    background-size: 36px 30px;
                    display: inline-block;
                }
                .row-2 {
                    width: 36px;
                    height: 30px;
                    line-height: 30px;
                    display: inline-block;
                    background-image: url("../assets/world/排位2@2x.png");
                    background-repeat: no-repeat;
                    background-size: 36px 30px;
                }
                .row-3 {
                    width: 36px;
                    height: 30px;
                    line-height: 30px;
                    display: inline-block;
                    background-image: url("../assets/world/排名3@2x.png");
                    background-repeat: no-repeat;
                    background-size: 36px 30px;
                }
            }

            /*tbody tr  td:nth-child(1){*/
            /*text-align: left;*/
            /*}*/
            /*tbody tr td:nth-child(7){*/
            /*text-align: right;*/
            /*}*/
        }
        .page {
            text-align: center;
            position: absolute;
            left: 0px;
            bottom: 19px;
            right: 0px;
            height: 8px;
            .page-item {
                width: 68px;
                height: 8px;

                background: rgba(155, 163, 167, 1);
                display: inline-block;
                margin-right: 16px;
                cursor: pointer;
                &.select {
                    background: rgba(21, 184, 251, 1);
                }
            }
        }
    }
</style>
