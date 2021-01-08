<template>
    <!--排班弹窗-->
    <div class="dia">
        <Dialog custom-class="dcls" :close-on-click-modal="false" :top="theTop" :width="theWidth" :visible.sync="dialogVisible"
                :before-close="handleClose">
            <div class="outer bgi">
                <div class="full-div inner bgi">
                    <header class="theHeder">
                        <div class="theHeder-l">
                            <div class="line"></div>
                            <div class="name">地市春运工作联系方式</div>
                        </div>
                        <div class="close bgi cp" @click="closeDialog"></div>
                    </header>

                    <!-- 搜索栏 -->

                    <div class="searchInput flex">
                        <div class="bgi"></div>
                        <div>
                            <input type="text" v-model="searchWord"  @focus="listShow = true" placeholder="请输入你要查询的内容">
                        </div>
                        <div class="bgi csp" @click="changeShow"></div>
                        <div class="searchList" v-show="listShow">
                            <div v-for="(item,i) in searchList" class="csp" @click="clickWord(event,item)">
                                {{item}}
                            </div>
                        </div>
                    </div>

                    <!-- 搜索栏结束 -->

                    <div class="body">
                        <!--<table v-if="query=='广州市'">-->
                            <!--<tbody>-->
                            <!--<tr>-->
                                <!--<td>地市</td>-->
                                <!--<td colspan="2">领导机构职务</td>-->
                                <!--<td>姓名</td>-->
                                <!--<td>职务/部门</td>-->
                                <!--<td>办公电话</td>-->
                                <!--<td>手机</td>-->
                                <!--<td>电子邮箱</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td></td>-->
                                <!--<td colspan="2">春运领导小组组长</td>-->
                                <!--<td>林道平</td>-->
                                <!--<td>广州市人民政府副市长</td>-->
                                <!--<td>020-83123113（秘书）</td>-->
                                <!--<td>13760771769（秘书）</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td rowspan="2"></td>-->
                                <!--<td colspan="2" rowspan="2">春运领导小组常务副组长</td>-->
                                <!--<td>邢翔</td>-->
                                <!--<td>广州市人民政府副秘书长</td>-->
                                <!--<td>020-83123113（秘书）</td>-->
                                <!--<td>13760771769（秘书）</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td rowspan="2">潘双明</td>-->
                                <!--<td>广州市交通运输局</td>-->
                                <!--<td>020-</td>-->
                                <!--<td rowspan="2"></td>-->
                                <!--<td rowspan="2"></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td></td>-->
                                <!--<td colspan="2"></td>-->
                                <!--<td>书记、局长</td>-->
                                <!--<td>38113811</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>广州市</td>-->
                                <!--<td></td>-->
                                <!--<td>春运办主任</td>-->
                                <!--<td>潘双明</td>-->
                                <!--<td>广州市交通运输局书记、局长</td>-->
                                <!--<td>020-38113811</td>-->
                                <!--<td></td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td></td>-->
                                <!--<td></td>-->
                                <!--<td></td>-->
                                <!--<td rowspan="2">沈颖</td>-->
                                <!--<td>广州市交通运输局总</td>-->
                                <!--<td>020-</td>-->
                                <!--<td rowspan="2">13500018472</td>-->
                                <!--<td rowspan="2"></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td rowspan="3"></td>-->
                                <!--<td rowspan="3">春运办&nbsp;成员</td>-->
                                <!--<td rowspan="2">春运办副主任</td>-->
                                <!--<td>工程师</td>-->
                                <!--<td>38113822</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>张洪谱</td>-->
                                <!--<td>广州市交通运输局一级调研员（市管）</td>-->
                                <!--<td>020-38113803</td>-->
                                <!--<td>13889906736</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td></td>-->
                                <!--<td rowspan="2">陈时国</td>-->
                                <!--<td>广州市交通运输局运</td>-->
                                <!--<td>020-</td>-->
                                <!--<td rowspan="2">18922202593</td>-->
                                <!--<td rowspan="2"></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td rowspan="2"></td>-->
                                <!--<td rowspan="2"></td>-->
                                <!--<td rowspan="2">联络员</td>-->
                                <!--<td>输保障处处长</td>-->
                                <!--<td>38180129</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td rowspan="2">黄丁华</td>-->
                                <!--<td>广州市交通运输局</td>-->
                                <!--<td>020-</td>-->
                                <!--<td rowspan="2">13925129210</td>-->
                                <!--<td rowspan="2"></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td></td>-->
                                <!--<td></td>-->
                                <!--<td></td>-->
                                <!--<td>运输保障处副处长</td>-->
                                <!--<td>38180133</td>-->
                            <!--</tr>-->
                         <!---->
                            <!--<tr>-->
                                <!--<td rowspan="7">广州市</td>-->
                                <!--<td rowspan="6">春运办&nbsp;成员</td>-->
                                <!--<td rowspan="3">联络员</td>-->
                                <!--<td>黄志廷</td>-->
                                <!--<td>广州市交通运输局运输保障处主任科员</td>-->
                                <!--<td>020-38180463</td>-->
                                <!--<td>13926446958</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>朱文雄</td>-->
                                <!--<td>广州市交通运输局运输保障处主任科员</td>-->
                                <!--<td>020-38180297</td>-->
                                <!--<td>13710705580</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>王威</td>-->
                                <!--<td>广州市交通运输局运输保障处主任科员</td>-->
                                <!--<td>020-38180463</td>-->
                                <!--<td>18988991299</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td rowspan="3">宣传工作联系人</td>-->
                                <!--<td>林驰</td>-->
                                <!--<td>广州市交通运输局宣传处处长</td>-->
                                <!--<td>020-38180089</td>-->
                                <!--<td>13826254575</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>王多全</td>-->
                                <!--<td>广州市交通运输局宣传处副处长</td>-->
                                <!--<td>020-38113873</td>-->
                                <!--<td>13609006085</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>黄贵滨</td>-->
                                <!--<td>广州市交通运输局宣传处二级主任科员</td>-->
                                <!--<td>020-38180058</td>-->
                                <!--<td>13430354210</td>-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td colspan="7">24小时值班电话：87583720；收文传真：86010020；单位文秘（办公室）：87583720</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                        <table v-if="query=='广州市'">
                            <tbody>
                            <tr class="firstRow">
                                <td>
                                    地市
                                </td>
                                <td colspan="2">
                                    领导机构职务
                                </td>
                                <td>
                                    姓名
                                </td>
                                <td>
                                    职务/部门
                                </td>
                                <td>
                                    办公电话
                                </td>
                                <td>
                                    手机
                                </td>
                                <td>
                                    电子邮箱
                                </td>
                            </tr>
                            <tr>
                                <td style="word-break: break-all;" rowspan="19" colspan="1">
                                    <br/>广州市
                                </td>
                                <td colspan="2">
                                    春运领导小组组长
                                </td>
                                <td>
                                    林道平
                                </td>
                                <td>
                                    广州市人民政府副市长
                                </td>
                                <td>
                                    020-83123113（秘书）
                                </td>
                                <td>
                                    13760771769（秘书）
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="3">
                                    春运领导小组常务副组长
                                </td>
                                <td>
                                    邢翔
                                </td>
                                <td>
                                    广州市人民政府副秘书长
                                </td>
                                <td>
                                    020-83123113（秘书）
                                </td>
                                <td>
                                    13760771769（秘书）
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    潘双明
                                </td>
                                <td rowspan="2">
                                    广州市交通运输局
                                    书记、局长
                                </td>
                                <td rowspan="2">
                                    020-38113811
                                </td>
                                <td rowspan="2"></td>
                                <td rowspan="2"></td>
                            </tr>
                            <tr>
                                <!--<td>-->
                                    <!--书记、局长-->
                                <!--</td>-->
                                <!--<td>-->
                                    <!--38113811-->
                                <!--</td>-->
                            </tr>
                            <tr>
                                <td style="word-break: break-all;" rowspan="14" colspan="1">
                                    <br/>春运办&nbsp;成员
                                </td>
                                <td style="word-break: break-all;">
                                    春运办主任
                                </td>
                                <td>
                                    潘双明
                                </td>
                                <td>
                                    广州市交通运输局书记、局长
                                </td>
                                <td>
                                    020-38113811
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3" colspan="1" style="word-break: break-all;">
                                    春运办副主任
                                </td>
                                <td rowspan="2">
                                    沈颖
                                </td>
                                <td rowspan="2" colspan="1">
                                    广州市交通运输局总<br/>工程师
                                </td>
                                <td rowspan="2" colspan="1" style="word-break: break-all;">
                                    020-38113822
                                </td>
                                <td rowspan="2">
                                    13500018472
                                </td>
                                <td rowspan="2"></td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <td>
                                    张洪谱
                                </td>
                                <td>
                                    广州市交通运输局一级调研员（市管）
                                </td>
                                <td>
                                    020-38113803
                                </td>
                                <td>
                                    13889906736
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style="word-break: break-all;" rowspan="7" colspan="1">
                                    <br/>联络员
                                </td>
                                <td rowspan="2">
                                    陈时国
                                </td>
                                <td rowspan="2" colspan="1" style="word-break: break-all;">
                                    广州市交通运输局运<br/>输保障处处长
                                </td>
                                <td rowspan="2" colspan="1" style="word-break: break-all;">
                                    020-38180129
                                </td>
                                <td rowspan="2">
                                    18922202593
                                </td>
                                <td rowspan="2"></td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <td rowspan="2">
                                    黄丁华
                                </td>
                                <td rowspan="2" colspan="1">
                                    广州市交通运输局<br/>运输保障处副处长
                                </td>
                                <td rowspan="2" colspan="1" style="word-break: break-all;">
                                    020-38180133
                                </td>
                                <td rowspan="2">
                                    13925129210
                                </td>
                                <td rowspan="2"></td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <td>
                                    黄志廷
                                </td>
                                <td style="word-break: break-all;">
                                    广州市交通运输局运输保障处主任科员
                                </td>
                                <td>
                                    020-38180463
                                </td>
                                <td>
                                    13926446958
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    朱文雄
                                </td>
                                <td>
                                    广州市交通运输局运输保障处主任科员
                                </td>
                                <td>
                                    020-38180297
                                </td>
                                <td>
                                    13710705580
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    王威
                                </td>
                                <td>
                                    广州市交通运输局运输保障处主任科员
                                </td>
                                <td>
                                    020-38180463
                                </td>
                                <td>
                                    18988991299
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">
                                    宣传工作联系人
                                </td>
                                <td>
                                    林驰
                                </td>
                                <td>
                                    广州市交通运输局宣传处处长
                                </td>
                                <td>
                                    020-38180089
                                </td>
                                <td>
                                    13826254575
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    王多全
                                </td>
                                <td>
                                    广州市交通运输局宣传处副处长
                                </td>
                                <td>
                                    020-38113873
                                </td>
                                <td>
                                    13609006085
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    黄贵滨
                                </td>
                                <td>
                                    广州市交通运输局宣传处二级主任科员
                                </td>
                                <td>
                                    020-38180058
                                </td>
                                <td>
                                    13430354210
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    24小时值班电话：87583720；收文传真：86010020；单位文秘（办公室）：87583720
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table  v-if="query=='深圳市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="7">深圳市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>刘庆生</td>
                                <td>深圳市政府常务副市长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2">春运领导小组副组长</td>
                                <td>于宝明</td>
                                <td>深圳市交通运输局局长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>徐忠平</td>
                                <td>深圳市交通运输局副局长</td>
                                <td>83168388</td>
                                <td>13392812316</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td>张永平</td>
                                <td>深圳市公共交通管理局局长</td>
                                <td>83168090</td>
                                <td>13808800225</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>联络员</td>
                                <td>姜威</td>
                                <td>深圳市公共交通管理局副局长</td>
                                <td>83168002</td>
                                <td>13802268728</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>张卿江</td>
                                <td>主任科员</td>
                                <td>83059132</td>
                                <td>13510718716</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：83168123；收文传真：83165191；单位文秘（办公室）：83168022</td>
                            </tr>
                            </tbody>
                        </table>

                        <table v-if="query=='珠海市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="9">珠海市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>曾进泽</td>
                                <td>常务副市长</td>
                                <td>2126096</td>
                                <td>18928029099</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="4">春运领导小组副组长</td>
                                <td>文华</td>
                                <td>市政府副秘书长</td>
                                <td>2123683</td>
                                <td>13823096166</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>林粤海</td>
                                <td>市交通运输局局长</td>
                                <td>2632322</td>
                                <td>13902533922</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>赵开元</td>
                                <td>市公安局副局长</td>
                                <td>8641389</td>
                                <td>13702761663</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>任国锋</td>
                                <td>市应急管理局总工程师</td>
                                <td>2155665</td>
                                <td>13823013531</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>曲向华</td>
                                <td>市交通运输局总工程师、港口管理局副局长</td>
                                <td>2266223</td>
                                <td>13570613889</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">春运办副主任</td>
                                <td>吴骥</td>
                                <td>市交警支队副支队长</td>
                                <td>8641619</td>
                                <td>13802678623</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>周国庆</td>
                                <td>市运管处主任</td>
                                <td>2188833</td>
                                <td>13702311823</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>许强</td>
                                <td>市交通运输局科长</td>
                                <td>2266081</td>
                                <td>13702768381</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="5">珠海市</td>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td rowspan="3">联络员</td>
                                <td>张斌</td>
                                <td>市公安交警支队科长</td>
                                <td>8642657</td>
                                <td>13702322298</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>刘赞量</td>
                                <td>市应急管理局副科长</td>
                                <td>2155662</td>
                                <td>13823089633</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>陈兆华</td>
                                <td>市交通运输局四级主任科员</td>
                                <td>2512118</td>
                                <td>15323984987</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>陈彦斌</td>
                                <td>市交通运输局职员</td>
                                <td>2262995</td>
                                <td>13570939384</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0756-2262767；收文传真：0756-2263533；单位文秘（办公室）：0756-2266883；春运办邮箱：zhscybgs@163.com</td>
                            </tr>

                            </tbody>
                        </table>
                            <table v-if="query=='汕头市'">
                                <tbody>
                                <tr>
                                    <td>地市</td>
                                    <td colspan="2">领导机构职务</td>
                                    <td>姓名</td>
                                    <td>职务/部门</td>
                                    <td>办公电话</td>
                                    <td>手机</td>
                                    <td>电子邮箱</td>
                                </tr>
                            <tr>
                                <td rowspan="3">汕头市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>李宇</td>
                                <td>市委常委、副市长</td>
                                <td></td>
                                <td>13417010740</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>庄怀</td>
                                <td>市政府副秘书长</td>
                                <td></td>
                                <td>18318783888</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>黄宏华</td>
                                <td>市交通运输局局长</td>
                                <td></td>
                                <td>13809295335</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="8">汕头市</td>
                                <td rowspan="7">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>范怀礼</td>
                                <td>市交通运输局副局长</td>
                                <td>88273765</td>
                                <td>13802716309</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">春运办副主任</td>
                                <td>佘常伟</td>
                                <td>市交通运输局科长</td>
                                <td>88388321</td>
                                <td>13531281488</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>李小保</td>
                                <td>市交警支队大队长</td>
                                <td>88571044</td>
                                <td>13902738179</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>郑红弟</td>
                                <td>市交通运输综合执法局副局长</td>
                                <td>88388312</td>
                                <td>13829586429</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>李伟波</td>
                                <td>市交通运输局主任科员</td>
                                <td>88274011</td>
                                <td>13536889928</td>
                                <td>stcybgs@163.com</td>
                            </tr>
                            <tr>
                                <td>余文凯</td>
                                <td>市交通运输局办事员</td>
                                <td>88274011</td>
                                <td>18826488911</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>陈斌</td>
                                <td>市交通运输局科员</td>
                                <td>88278671</td>
                                <td>13902740426</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0754-88295404；收文传真：0754-88285876；单位文秘（办公室）：0754-88278671</td>
                            </tr>
                            </tbody>
                        </table>

                        <table v-if="query=='佛山市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="9">佛山市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>许国</td>
                                <td>副市长</td>
                                <td>0757-83280882</td>
                                <td>13360939001</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="3">春运领导小组副组长</td>
                                <td>高荣堂</td>
                                <td>市政府副秘书长</td>
                                <td>0757-83039213</td>
                                <td>13702921258</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>曾阳春</td>
                                <td>市交通运输局局长</td>
                                <td>0757-82256686</td>
                                <td>13702553091</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>梁恩球</td>
                                <td>市公安局党委委员、副局长</td>
                                <td></td>
                                <td>13702558844</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="5">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>曾阳春(兼任)</td>
                                <td>市交通运输局局长</td>
                                <td>0757-82256686</td>
                                <td>13702553091</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">春运办副主任</td>
                                <td>庄儒耀</td>
                                <td>市交通运输局副局长</td>
                                <td>0757-82626259</td>
                                <td>13702913098</td>
                                <td>624471288@qq.com</td>
                            </tr>
                            <tr>
                                <td>梁恩球</td>
                                <td>市公安局党委委员、副局长</td>
                                <td></td>
                                <td>13702558844</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>张坤</td>
                                <td>市交通运输局客运科科长</td>
                                <td>82239196</td>
                                <td>13924825522</td>
                                <td>773560172@qq.com</td>
                            </tr>
                            <tr>
                                <td>冼建科</td>
                                <td>市交通运输局客运科副科长</td>
                                <td>83816198</td>
                                <td>13927228954</td>
                                <td>76041630@qq.com</td>
                            </tr>
                            <tr>
                                <td rowspan="2">佛山市</td>
                                <td>春运办成员</td>
                                <td>宣传工作联系人</td>
                                <td>李淑莲</td>
                                <td>科员/佛山市交通运输局办公室</td>
                                <td>0757-82518671</td>
                                <td>18566066167</td>
                                <td>583613038@qq.com</td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0757-82626256；收文传真：0757-82223396；单位文秘（办公室）：0757-82223787</td>
                            </tr>

                            </tbody>
                        </table>

                        <table v-if="query=='韶关市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="7">韶关市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>李欣</td>
                                <td>市政府副市长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>李志兵</td>
                                <td>市政府副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>唐明强</td>
                                <td>市交通运输局局长</td>
                                <td>0751-8876419</td>
                                <td>13509059788</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>姚斌</td>
                                <td>市交通运输局总工程师</td>
                                <td>0751-8876419</td>
                                <td>13602248124</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>涂增军</td>
                                <td>市交通运输局科长</td>
                                <td>0751-8876419</td>
                                <td>13826344885</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>张文俊</td>
                                <td>市交通运输局科员</td>
                                <td>0751-8876419</td>
                                <td>13602915736</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">韶关市</td>
                                <td>春运办成员</td>
                                <td>宣传工作联系人</td>
                                <td>张文俊</td>
                                <td>市交通运输局科员</td>
                                <td>0751-8876419</td>
                                <td>13602915736</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0751-8876419；收文传真：0751-8877009；单位文秘（办公室）：0751-8883732</td>
                            </tr>

                            </tbody>
                        </table>

                        <table  v-if="query=='河源市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="7">河源市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>庞启彪</td>
                                <td>市政府副市长</td>
                                <td>0762-3300611</td>
                                <td>18688093382</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>王少锋</td>
                                <td>市政府副秘书长</td>
                                <td>0762-3322389</td>
                                <td>13923686970</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>马国波</td>
                                <td>市交通运输局局长</td>
                                <td>0762-3297036</td>
                                <td>13829389668</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>马国波</td>
                                <td>市交通运输局局长</td>
                                <td>0762-3297036</td>
                                <td>13829389668</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">春运办副主任</td>
                                <td>幸运杰</td>
                                <td>市公安局党委委员、指挥中心主任</td>
                                <td></td>
                                <td>13502318988</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>胡国平</td>
                                <td>市交通运输局党组成员、市运管处处长</td>
                                <td>0762-3223263</td>
                                <td>13829326669</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>联络员</td>
                                <td>张文斌</td>
                                <td>市交通运输局公路运输管理科科长</td>
                                <td>0762-3297526</td>
                                <td>13502326009</td>
                                <td>zwb-hy@163.com</td>
                            </tr>
                            <tr>
                                <td rowspan="3">河源市</td>
                                <td rowspan="2">春运办&nbsp;成员</td>
                                <td rowspan="2">宣传工作联系人</td>
                                <td>吴雄强</td>
                                <td>市交通运输局科员</td>
                                <td>0762-3292475</td>
                                <td>13553277589</td>
                                <td>hyscyb080@163.com</td>
                            </tr>
                            <tr>
                                <td>赖相斌</td>
                                <td>市交通运输局科员</td>
                                <td>0762-3292962</td>
                                <td>18316909828</td>
                                <td>hyscyb080@163.com</td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0762-3318993；收文传真：0762-3311993；单位文秘（办公室）：0762-3299922</td>
                            </tr>
                            </tbody>
                        </table>

                        <table v-if="query=='梅州市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>

                            <tr>
                                <td rowspan="6">梅州市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>黄文沐</td>
                                <td>市委常委、市政府党组副书记</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="4">春运领导小组副组长</td>
                                <td>黎清华</td>
                                <td>市政府副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>谢文威</td>
                                <td>市交通运输局局长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>王忠</td>
                                <td>市公路事务中心主任</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>李昌龙</td>
                                <td>市公安局常务副局长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办成员</td>
                                <td>春运办主任</td>
                                <td>胡新文</td>
                                <td>市交通运输局副局长</td>
                                <td>0753-2285022</td>
                                <td>13502336581</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="5">梅州市</td>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td>春运办副主任</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>李军</td>
                                <td>市交通运输局运输管理科科长</td>
                                <td>0753-2283008</td>
                                <td>13823861639</td>
                                <td>mz2017008@163.com</td>
                            </tr>
                            <tr>
                                <td>黄电基</td>
                                <td>市交通运输局运输管理科科员</td>
                                <td>0753-2283008</td>
                                <td>13825983131</td>
                                <td>mz2017008@163.com</td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0753-2283008；收文传真：0753-2281180；单位文秘（办公室）：0753-2281032</td>
                            </tr>

                            </tbody>
                        </table>

                        <table v-if="query=='惠州市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="4">惠州市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>林洪</td>
                                <td>市政府副市长</td>
                                <td>0752-2892876</td>
                                <td>18928300199</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="3">春运领导小组副组长</td>
                                <td>胡志威</td>
                                <td>市政府副秘书长</td>
                                <td>0752-2882261</td>
                                <td>13502298861</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>钟朝阳</td>
                                <td>市交通运输局局长</td>
                                <td>0752-2899886</td>
                                <td>18802666886</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>黄新平</td>
                                <td>市公安局副局长</td>
                                <td>0752-2868886</td>
                                <td>13902622566</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="6">惠州市</td>
                                <td colspan="2">春运领导小组副组长</td>
                                <td>徐东波</td>
                                <td>市应急管理局副局长</td>
                                <td>0752-2180793</td>
                                <td>13924738187</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>钟朝阳</td>
                                <td>市交通运输局局长</td>
                                <td>0752-2899886</td>
                                <td>18802666886</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>联络员</td>
                                <td>万涛</td>
                                <td>市交通运输局陆运科科长</td>
                                <td>0752-2829832</td>
                                <td>13928325956</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>曾创成</td>
                                <td>市交通局陆运科副科长</td>
                                <td>0752-2829832</td>
                                <td>15819896800</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0752-2829696；收文传真：0752-2829666；单位文秘（办公室）：0752-2829330</td>
                            </tr>


                            </tbody>
                        </table>

                        <table v-if="query=='汕尾市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="3">汕尾市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>林少文</td>
                                <td>市政府副市长</td>
                                <td></td>
                                <td>13929302699</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>王晓东</td>
                                <td>市政府副秘书长</td>
                                <td></td>
                                <td>13600209998</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>林展海</td>
                                <td>市交通运输局局长</td>
                                <td></td>
                                <td>13927966999</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="6">汕尾市</td>
                                <td rowspan="5">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>王维斌</td>
                                <td>市交通运输局副局长</td>
                                <td></td>
                                <td>13902677368</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>刘杰豪</td>
                                <td>市交通运输局科长</td>
                                <td></td>
                                <td>13302683838</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>李东明</td>
                                <td>市交通运输局副主任科员</td>
                                <td></td>
                                <td>18666039126</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>周晓倩</td>
                                <td>市交通运输局科员</td>
                                <td></td>
                                <td>13632290864</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24&nbsp;小时值班电话：0660-3336666；收文传真：0660-3325215；单位文秘（办公室）：3334611</td>
                            </tr>


                            </tbody>
                        </table>

                        <table v-if="query=='东莞市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="3">东莞市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>郭向阳</td>
                                <td>副市长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>黄淦洪</td>
                                <td>副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>朱利民</td>
                                <td>东莞市交通运输局局长</td>
                                <td>0769-22002222</td>
                                <td>13829215851</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="10">东莞市</td>
                                <td rowspan="9">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>罗观云</td>
                                <td>东莞市交通运输局副局长</td>
                                <td>0769-22002833</td>
                                <td>13809279793</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">春运办副主任</td>
                                <td>吴柏安</td>
                                <td>市人力资源和社会保障局副局长</td>
                                <td>0769-22261233</td>
                                <td>13713131122</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>陈瑛瑜</td>
                                <td>市道路运输事务中心主任</td>
                                <td>0769-22002233</td>
                                <td>13712211322</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>黄小龙</td>
                                <td>市交警支队副支队长</td>
                                <td>/</td>
                                <td>13926858890</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>陈瀚林</td>
                                <td>东莞市交通运输局副科长</td>
                                <td>0769-22002513</td>
                                <td>18128572513</td>
                                <td>dgcyb2009@126.com</td>
                            </tr>
                            <tr>
                                <td>黎树榕</td>
                                <td>东莞市交通运输局科员</td>
                                <td>0769-22002519</td>
                                <td>13713402348</td>
                                <td>dgcyb2009@126.com</td>
                            </tr>
                            <tr>
                                <td>联络员</td>
                                <td>袁俊轩</td>
                                <td>东莞市交通运输局科员</td>
                                <td>0769-22002515</td>
                                <td>13728449567</td>
                                <td>dgcyb2009@126.com</td>
                            </tr>
                            <tr>
                                <td rowspan="2">宣传工作联系人</td>
                                <td>陈瀚林</td>
                                <td>东莞市交通运输局副科长</td>
                                <td>0769-22002513</td>
                                <td>18128572513</td>
                                <td>dgcyb2009@126.com</td>
                            </tr>
                            <tr>
                                <td>赵俊东</td>
                                <td>东莞市交通运输局科员</td>
                                <td>0769-22002109</td>
                                <td>15014758826</td>
                                <td>dgcyb2009@126.com</td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0769-22002010、0769-22002020；收文传真：0769-22002011；单位文秘（办公室）：0769-22002010</td>
                            </tr>
                            </tbody>
                        </table>

                        <table v-if="query=='中山市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="9">中山市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>高瑞生</td>
                                <td>副市长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>黄金贺</td>
                                <td>市交通运输局副局长</td>
                                <td>28191103</td>
                                <td>13702789123</td>
                                <td>ygk0760@163.com</td>
                            </tr>
                            <tr>
                                <td>李君</td>
                                <td>市公安局常务副局长</td>
                                <td>23183333</td>
                                <td>13902829063</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="6">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>黄金贺</td>
                                <td>市交通运输局副局长</td>
                                <td>28191103</td>
                                <td>13702789123</td>
                                <td>ygk0760@163.com</td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td>郭景安</td>
                                <td>市交通运输局副处级干部</td>
                                <td></td>
                                <td>13702376030</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td>李鹏昊</td>
                                <td>市公安交警支队副支队长</td>
                                <td>23188369</td>
                                <td>13928195575</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">联络员</td>
                                <td>张双革</td>
                                <td>市交通运输局运管科科长</td>
                                <td>28192600</td>
                                <td>13702459460</td>
                                <td>ygk0760@163.com</td>
                            </tr>
                            <tr>
                                <td>梁浩平</td>
                                <td>市发改局科员</td>
                                <td>88319735</td>
                                <td>13928138833</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>钱俊</td>
                                <td>市公安局交管科科长</td>
                                <td>23188362</td>
                                <td>13590881128</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="9">中山市</td>
                                <td rowspan="9">春运办&nbsp;成员</td>
                                <td rowspan="9">联络员</td>
                                <td>梁桂萍</td>
                                <td>市工信局科长</td>
                                <td>88329437</td>
                                <td>13822793133</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>吴海成</td>
                                <td>市公路局科长</td>
                                <td>88366571</td>
                                <td>13928177283</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>李娜</td>
                                <td>广珠城际轻轨助理</td>
                                <td>61379425</td>
                                <td>13380215363</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>黄威成</td>
                                <td>中山海事局指挥中心主任</td>
                                <td>88287881</td>
                                <td>13928133928</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>陈启枢</td>
                                <td>市民政局科长</td>
                                <td>88267810</td>
                                <td>13802662030</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>李海鹰</td>
                                <td>市气象局科长</td>
                                <td></td>
                                <td>13590757820</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>梁巍</td>
                                <td>中山航道事务中心科员</td>
                                <td>88636880</td>
                                <td>13068148226</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>梁颂海</td>
                                <td>市教体局三级主任科员</td>
                                <td>89989966</td>
                                <td>13928181228</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>周倩懿</td>
                                <td>市人社局科长</td>
                                <td>88875181</td>
                                <td>13380882788</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="7">中山市</td>
                                <td rowspan="6">春运办&nbsp;成员</td>
                                <td rowspan="5">联络员</td>
                                <td>罗成</td>
                                <td>市市场监管局科长</td>
                                <td>88160346</td>
                                <td>15900078850</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>曾毅峰</td>
                                <td>市委宣传部新闻科科长</td>
                                <td></td>
                                <td>13528115127</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>罗玲</td>
                                <td>市卫健局</td>
                                <td>88360616</td>
                                <td>13702536708</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>马军民</td>
                                <td>市文广旅游局科长</td>
                                <td>88663063</td>
                                <td>13425518889</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>魏俊峰</td>
                                <td>市应急管理局</td>
                                <td>88389790</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>胡雷</td>
                                <td>市交通运输局科员</td>
                                <td>28192624</td>
                                <td>13928173548</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：88860660；收文传真：0760-28192607；单位文秘（办公室）：28192615</td>
                            </tr>


                            </tbody>
                        </table>

                        <table v-if="query=='江门市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="3">江门市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>林飞鸣</td>
                                <td>江门市政府副市长</td>
                                <td>0750-3273178</td>
                                <td>13924680011</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>莫劲锋</td>
                                <td>江门市府办副秘书长</td>
                                <td>0750-3273680</td>
                                <td>18823083366</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>许春绵</td>
                                <td>江门市交通运输局党组书记局长</td>
                                <td>0750-3921808</td>
                                <td>13828076902</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="8">江门市</td>
                                <td rowspan="7">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>蒋炎麟</td>
                                <td>江门市交通运输局党组成员</td>
                                <td>0750-3887768</td>
                                <td>13828037888</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td>张泽鸿</td>
                                <td>江门市交通运输局道运科&nbsp;科长</td>
                                <td>0750-3858268</td>
                                <td>18026767366</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">联络员</td>
                                <td>张晓军</td>
                                <td>江门市交通运输局道运科二级主任科员</td>
                                <td>0750-3858989</td>
                                <td>13632089968</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>刘广涛</td>
                                <td>江门市交通运输局执法监督科&nbsp;科长</td>
                                <td>0750-3921810</td>
                                <td>13828031222</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>李顺朝</td>
                                <td>江门市交通运输局基建科&nbsp;一级科员</td>
                                <td>0750-3858995</td>
                                <td>13929038039</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">宣传工作联系人</td>
                                <td>叶昕昕</td>
                                <td>江门市交通运输局办公室&nbsp;一级科员</td>
                                <td>0750-3858903</td>
                                <td>18933160169</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>李华彬</td>
                                <td>江门市交通运输局法制科一级科员</td>
                                <td>0750-3858937</td>
                                <td>13612290800</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0750-3528503；收文传真：0750-3554397；单位文秘（办公室）：0750-3858908</td>
                            </tr>
                            </tbody>
                        </table>

                        <table v-if="query=='阳江市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="9">阳江市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>冯松柏</td>
                                <td>市政府副市长</td>
                                <td>3309060</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>陈进</td>
                                <td>市政府副秘书长</td>
                                <td>0662-3320638</td>
                                <td>13926388822</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>蓝洪浪</td>
                                <td>市交通运输局局长</td>
                                <td>0662-3260333</td>
                                <td>17722002233</td>
                                <td>yj3130133@163.com</td>
                            </tr>
                            <tr>
                                <td rowspan="5">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>蓝洪浪</td>
                                <td>市交通运输局局长</td>
                                <td>0662-3260333</td>
                                <td>17722002233</td>
                                <td>yj3130133@163.com</td>
                            </tr>
                            <tr>
                                <td rowspan="2">春运办副主任</td>
                                <td>张家文</td>
                                <td>市交通运输局副局长</td>
                                <td>0662-3168336</td>
                                <td>18900800338</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>冯修羽</td>
                                <td>市公安交警支队队长</td>
                                <td></td>
                                <td>1390252198</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>联络员</td>
                                <td>黄俊峰</td>
                                <td>市交通运输局综合运输管理科负责人</td>
                                <td>0662-3130166</td>
                                <td>17728782092</td>
                                <td>yjjtyg@163.com</td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>陈亮荣</td>
                                <td>交通运输局办公室科员</td>
                                <td>0662-3130189</td>
                                <td>18926390228</td>
                                <td>yj3130133@163.com</td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：17728782822；收文传真：0662-3130101；单位文秘（办公室）：0662-3130133</td>
                            </tr>
                            </tbody>
                        </table>

                        <table v-if="query=='湛江市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="9">湛江市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>曹兴</td>
                                <td>湛江市委常委、市政府常务副市长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>梁建辉</td>
                                <td>湛江市政府副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>庄光权</td>
                                <td>湛江市交通运输局局长</td>
                                <td>0759-3127311</td>
                                <td>13790982999</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="6">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>陈兴</td>
                                <td>湛江市交通运输局四级调研员</td>
                                <td>0579-3127366</td>
                                <td>13590036888</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="5">春运办副主任</td>
                                <td>吴进强</td>
                                <td>湛江市公安局交警支队交管大队大队长</td>
                                <td></td>
                                <td>13825820280</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>钟向东</td>
                                <td>湛江市交通运输局综合运输科科长</td>
                                <td>0759-3127609</td>
                                <td>13828210333</td>
                                <td>zjjtygk@126.com</td>
                            </tr>
                            <tr>
                                <td>罗烈</td>
                                <td>湛江市交通运输局路政科科长</td>
                                <td>0759-3127982</td>
                                <td>13828247608</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>吴友香</td>
                                <td>湛江市交通运输局安全应急科科长</td>
                                <td>0759-3127827</td>
                                <td>13509937937</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>黄克</td>
                                <td>湛江市交通运输局办公室主任</td>
                                <td>0759-3127933</td>
                                <td>13702883133</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="5">湛江市</td>
                                <td rowspan="4">春运办&nbsp;成员</td>
                                <td rowspan="3">联络员</td>
                                <td>林崇</td>
                                <td>湛江市交通运输局综合运输科主任科员</td>
                                <td>0759-3127492</td>
                                <td>13828210333</td>
                                <td>zjjtygk@126.com</td>
                            </tr>
                            <tr>
                                <td>田学汉</td>
                                <td>湛江市交通运输局综合运输科科员</td>
                                <td>0759-3127491</td>
                                <td>13590093999</td>
                                <td>zjjtygk@126.com</td>
                            </tr>
                            <tr>
                                <td>练庆威</td>
                                <td>湛江市春运办工作人员</td>
                                <td>0759-3127997</td>
                                <td>13828215090</td>
                                <td>zjjtygk@126.com</td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>赖智彬</td>
                                <td>湛江市交通运输局办公室科员</td>
                                <td>0759-3127996</td>
                                <td>15113578369</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0759-3127177；收文传真：0759-3127491；单位文秘（办公室）：3127997</td>
                            </tr>

                            </tbody>
                        </table>

                        <table v-if="query=='茂名市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>

                            <tr>
                                <td rowspan="4">茂名市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>李多民</td>
                                <td>副市长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>何志强</td>
                                <td>副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>梁世廉</td>
                                <td>茂名市交通运输局局长</td>
                                <td></td>
                                <td>18688362299</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办成员</td>
                                <td>春运办主任</td>
                                <td>陈亚聪</td>
                                <td>茂名市交通运输局副局长</td>
                                <td>3990813</td>
                                <td>13828695513</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="6">茂名市</td>
                                <td rowspan="5">春运办&nbsp;成员</td>
                                <td>春运办副主任</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">联络员</td>
                                <td>丁福周</td>
                                <td>茂名市交通运输局综合运输科科长</td>
                                <td>3990886</td>
                                <td>13926718888</td>
                                <td>mmjtzyk@163.com</td>
                            </tr>
                            <tr>
                                <td>邱宏明</td>
                                <td>茂名市交通运输局综合运输科科员</td>
                                <td>3990621</td>
                                <td>13709626466</td>
                                <td>mmjtzyk@163.com</td>
                            </tr>
                            <tr>
                                <td>陈钦杰</td>
                                <td>茂名市交通运输局综合运输科科员</td>
                                <td>3990621</td>
                                <td>18819623371</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>宣传工作联系人</td>
                                <td>黄洁</td>
                                <td>茂名市交通运输局办公室主任</td>
                                <td>3990889</td>
                                <td>13929701278</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：3990621(工作日值班)，3990666（春节假期值班）收文传真：3990620；单位文秘（办公室）：3990899</td>
                            </tr>

                            </tbody>
                        </table>

                        <table v-if="query=='肇庆市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="3">肇庆市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>唐小兵</td>
                                <td>副市长/肇庆市人民政府</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>李禹山</td>
                                <td>副秘书长/肇庆市人民政府</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>吴冠儒</td>
                                <td>局长/肇庆市交通运输局</td>
                                <td>2702866</td>
                                <td>13929849628</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="8">肇庆市</td>
                                <td rowspan="7">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>李镜全</td>
                                <td>副局长/肇庆市交通运输局</td>
                                <td>2208626</td>
                                <td>13827558883</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td>曾宪杰</td>
                                <td>科长/市交通局综合运输科</td>
                                <td>2723032</td>
                                <td>13929828008</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>李志煌</td>
                                <td>科员/市交通局综合运输科</td>
                                <td>2721296</td>
                                <td>18666792886</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>黄汉邦</td>
                                <td>科员/市交通局综合运输科</td>
                                <td>2721296</td>
                                <td>13435957138</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">宣传工作联系人</td>
                                <td>姚智良</td>
                                <td>科员/市交通局综合运输科</td>
                                <td>2721296</td>
                                <td>13642263396</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>熊杰</td>
                                <td>副主任/市交通局办公室</td>
                                <td>2720682</td>
                                <td>13929824900</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>赖晓瑜</td>
                                <td>科员/市交通局综合运输科</td>
                                <td>2721296</td>
                                <td>13822681256</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0758-2723032；收文传真：0758-2721296；单位文秘（办公室）：0758-2720682</td>
                            </tr>
                            </tbody>
                        </table>

                        <table v-if="query=='清远市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="9">清远市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>吕成蹊</td>
                                <td>组长（副市长）</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="3">春运领导小组副组长</td>
                                <td>吴家辉</td>
                                <td>市政府副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>范桂石</td>
                                <td>交通局局长</td>
                                <td>3381826</td>
                                <td>13902351144</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>廖贤就</td>
                                <td>交警支队长</td>
                                <td>3463787</td>
                                <td>13802890612</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="5">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>李招安</td>
                                <td>市交通局副局长</td>
                                <td>3372216</td>
                                <td>18218302008</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>春运办副主任</td>
                                <td>陈建友</td>
                                <td>交警支队副支队长</td>
                                <td>3463729</td>
                                <td>13828503218</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">联络员</td>
                                <td>陈志(运管)</td>
                                <td>综合运输科副科长</td>
                                <td>3387838</td>
                                <td>13802892712</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>周剑鹏(执法)</td>
                                <td>执法监督科科长</td>
                                <td>3379022</td>
                                <td>13824943318</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>张志韶(交警)</td>
                                <td>交警支队秘书科长</td>
                                <td>3463489</td>
                                <td>19865205848</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">清远市</td>
                                <td>春运办成员</td>
                                <td>宣传工作联系人</td>
                                <td>吴淑萍</td>
                                <td>交通局办公室主任</td>
                                <td>3360306</td>
                                <td>13922602908</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0763-3372616；/3367916（非工作日应急值班）；收文传真：0763-3366055；/3366036（非工作日应急传真）；邮箱：qyjtcyb@163.com；单位文秘（办公室）：0763-3366036；</td>
                            </tr>

                            </tbody>
                        </table>

                        <table v-if="query=='潮州市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="6">潮州市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>张传胜</td>
                                <td>市委常委、常务副市长</td>
                                <td>2362308</td>
                                <td>13828335869</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>陈锦辉</td>
                                <td>市政府副秘书长</td>
                                <td>2283991</td>
                                <td>13828328388</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>黄奕斌</td>
                                <td>市交通运输局局长</td>
                                <td>2350628</td>
                                <td>13903099678</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>黄奕斌</td>
                                <td>市交通运输局局长</td>
                                <td>2350628</td>
                                <td>13903097116</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">春运办副主任</td>
                                <td>何平</td>
                                <td>市交通运输局副局长</td>
                                <td></td>
                                <td>13828368802</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>邱建炜</td>
                                <td>市交通运输局副局长</td>
                                <td>0768-2291708</td>
                                <td>13902793007</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="6">潮州市</td>
                                <td rowspan="5">春运办&nbsp;成员</td>
                                <td rowspan="3">联络员</td>
                                <td>庄沛华</td>
                                <td>市交通运输局科员</td>
                                <td>0768-2291708</td>
                                <td>13903097116</td>
                                <td>cztraffic@163.com</td>
                            </tr>
                            <tr>
                                <td>曾炜华</td>
                                <td>市交通运输局科员</td>
                                <td></td>
                                <td>13828397508</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>许锐松</td>
                                <td>市交通运输局综合执法局大队长</td>
                                <td></td>
                                <td>13553786665</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">宣传工作联系人</td>
                                <td>刘吟香</td>
                                <td>市交通运输局科员</td>
                                <td>2295633</td>
                                <td>13553750051</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>余育闺</td>
                                <td>市交通运输局科员</td>
                                <td></td>
                                <td>13433703767</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：07682295060；收文传真：07682295632；单位文秘（办公室）：07682295633</td>
                            </tr>

                            </tbody>
                        </table>

                        <table v-if="query=='揭阳市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="3">揭阳市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>吴毅青</td>
                                <td>市人民政府副市长</td>
                                <td>0663-8308611</td>
                                <td>18925612338</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="2">春运领导小组副组长</td>
                                <td>王辉</td>
                                <td>市人民政府副秘书长</td>
                                <td>0663-8289511</td>
                                <td>13822991508</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>张自旺</td>
                                <td>市交通运输局局长</td>
                                <td>0663-8338662</td>
                                <td>18822917933</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td rowspan="9">揭阳市</td>
                                <td rowspan="8">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>张自旺</td>
                                <td>市交通运输局局长</td>
                                <td>0663-8338662</td>
                                <td>18822917933</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">春运办副主任</td>
                                <td>方瑛</td>
                                <td>市交通运输局副局长</td>
                                <td>0663-8232683</td>
                                <td>13828180182</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>苏鸿基</td>
                                <td>市交通运输局副局长</td>
                                <td>0663-8262778</td>
                                <td>13902753859</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">联络员</td>
                                <td>郑楚周</td>
                                <td>市交通运输局综运科科长</td>
                                <td>0663-8236603</td>
                                <td>13922683222</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>陈海燕</td>
                                <td>市交通运输局办公室副主任</td>
                                <td>0663-8236601</td>
                                <td>13502600006</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>赵明</td>
                                <td></td>
                                <td>0663-8534529</td>
                                <td>13226166506</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">宣传工作联系人</td>
                                <td>谢锋</td>
                                <td></td>
                                <td>0663-8236601</td>
                                <td>15992526338</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>赵明</td>
                                <td></td>
                                <td>0663-8236601</td>
                                <td>13226166506</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：0663-8236601；收文传真：0663-8236615；单位文秘（办公室）：0663-8236601</td>
                            </tr>
                            </tbody>
                        </table>

                        <table  v-if="query=='云浮市'">
                            <tbody>
                            <tr>
                                <td>地市</td>
                                <td colspan="2">领导机构职务</td>
                                <td>姓名</td>
                                <td>职务/部门</td>
                                <td>办公电话</td>
                                <td>手机</td>
                                <td>电子邮箱</td>
                            </tr>
                            <tr>
                                <td rowspan="9">云浮市</td>
                                <td colspan="2">春运领导小组组长</td>
                                <td>施东红</td>
                                <td>市政府副市长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="3">春运领导小组副组长</td>
                                <td>王斌</td>
                                <td>市政府副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>伍启汉</td>
                                <td>市交通运输局局长</td>
                                <td>8926873</td>
                                <td></td>
                                <td>yfjt8018@163.com</td>
                            </tr>
                            <tr>
                                <td>梁业荣</td>
                                <td>市公安局党委委员、副局长</td>
                                <td>8130283</td>
                                <td>13927186993</td>
                                <td>yfjjzd@sina.com</td>
                            </tr>
                            <tr>
                                <td rowspan="5">春运办&nbsp;成员</td>
                                <td>春运办主任</td>
                                <td>王斌</td>
                                <td>市政府副秘书长</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">春运办副主任</td>
                                <td>王永纲</td>
                                <td>市交通运输局科长</td>
                                <td>8926019</td>
                                <td>13927179999</td>
                                <td>yfjt8018@163.com</td>
                            </tr>
                            <tr>
                                <td>廖国志</td>
                                <td>市公安局科长</td>
                                <td>8213096</td>
                                <td>13927186533</td>
                                <td>yfjjzd@sina.com</td>
                            </tr>
                            <tr>
                                <td rowspan="2">联络员</td>
                                <td>关振波</td>
                                <td>市交通运输局副科长</td>
                                <td>8926610</td>
                                <td>13826891917</td>
                                <td>yfjt8018@163.com</td>
                            </tr>
                            <tr>
                                <td>曾繁华</td>
                                <td>市公安局科员</td>
                                <td>8213032</td>
                                <td>13927195095</td>
                                <td>yfjjzd@sina.com</td>
                            </tr>
                            <tr>
                                <td rowspan="3">云浮市</td>
                                <td rowspan="2">春运办&nbsp;成员</td>
                                <td rowspan="2">宣传工作联系人</td>
                                <td>陈秋霞</td>
                                <td>市交通运输局科员</td>
                                <td>8926018</td>
                                <td>18023751508</td>
                                <td>yfjt8018@163.com</td>
                            </tr>
                            <tr>
                                <td>胡志铭</td>
                                <td>市交通运输局科员</td>
                                <td>8926018</td>
                                <td>18316007333</td>
                                <td>yfjt8018@163.com</td>
                            </tr>
                            <tr>
                                <td colspan="7">24小时值班电话：07668926007；收文传真：07668926018、07668926068；单位文秘（办公室）：07668926018</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </Dialog>
    </div>


</template>

<script>
    import {
        Dialog
    } from 'element-ui';

    export default {
        name: '',

        mixins: [],

        components: {
            Dialog
        },

        props: {
            showDialog: {
                type: Boolean,
                default: false
            },
            theData: {
                type: Object,
            }
        },

        data() {
            return {
                searchWord: '', //搜索关键词
                listShow: false, //搜索建议是否显示
                theWidth: '75%',
                theTop: '15vh',
                query: '',
                dialogVisible: false,
                searchList: [],
                totalList:[],
            }
        },

        computed: {},

        watch: {
            searchWord() {
                this.searchList=this.totalList.filter(m=>m.indexOf(this.searchWord)>=0)

            }
        },

        created() {
            this.dialogVisible = true;
        },

        mounted() {

            this.initSearchList();

        },

        destroyed() {
        },

        methods: {
            initSearchList() {
                // var cssSelection="tbody td[1]";
                // var theTableList=this.$refs.tableList;
                //
                // var theList=theTableList.querySelectorAll(cssSelection);
                this.totalList= ["广州市","深圳市","珠海市","汕头市","佛山市","韶关市","河源市","梅州市","惠州市","汕尾市","东莞市","中山市","江门市","阳江市","湛江市","茂名市","肇庆市","清远市","潮州市","揭阳市","云浮市"];
                this.searchList =this.totalList.filter(m=>true);

            },
            changeShow() {
                this.listShow = !this.listShow
            },
            //点击搜索建议
            clickWord(event, item) {
                this.searchWord = item
                this.listShow = false;
                this.query = this.searchWord;
            },
            // 关闭弹窗
            handleClose(done) {
                this.$emit('update:showDialog', false)
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
            closeDialog() {
                this.dialogVisible = false
                this.$emit('update:showDialog', false)

            },
        }
    }
</script>

<style lang='scss' scoped>
    ::-webkit-scrollbar {
        width: 6px;
        background: #0066CC;
        /*外层轨道*/
    }

    ::-webkit-scrollbar-thumb {
        display: block;
        width: 6px;
        margin: 0 auto;
        border-radius: 10px;
        background: #00CCFF;
        /*内层轨道*/
    }

    .outer {
        /*width: 774px;*/
        /*height: 488px;*/
        /*background-image: url('../../../assets/pop/外框2@2x.png');*/
        /*background-image: url('../assets/bj-01@2x.png');*/
        background-color: rgba(1, 15, 28, 0.8);
        width: 1430px;
        /*height: 455px;*/
        padding: 20px;
    }

    .inner {
        /*background-image: url('../../../assets/pop/外框1@2x.png');*/
        /*background-image: url('../assets/bj-02@2x.png');*/
        background-color: #002a54; /*rgba(0, 51, 255);*/
        border: 1px solid rgba(8, 158, 228, 1);
        /*padding-top: 10px;*/
    }

    .close {
        width: 20px;
        height: 20px;
        background-image: url('../../../assets/pop/关闭@2x.png');
    }

    .theHeder {
        font-size: 20px;
        /*font-family:Microsoft YaHei;*/
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 255, 255, 0.2);
        height: 60px;
        /*line-height:60px;*/
        /*padding-top: 20px;*/
        padding-left: 21px;
        padding-right: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .line {
        width: 4px;
        height: 20px;
        background: rgba(0, 255, 255, 1);
        margin-right: 10px;
    }

    .theHeder-l {
        display: flex;
        align-items: center;

    }

    .searchInput {
        width: 370px;
        height: 40px;
        font-size: 16px;
        position: relative;
        background: rgba(9, 31, 108, 1);
        border: 1px solid rgba(0, 0, 0, 1);
        margin-top: 20px;
        margin-left: 11px;

        > div:first-child {
            width: 18px;
            height: 18px;
            background-image: url(../assets/sousuo.png);
            margin-top: 10px;
            margin-left: 17px;
        }

        > div:nth-child(2) {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 45px;

            > input {
                width: 240px;
                color: rgba(254, 254, 254, 1);
                background-color: rgba(9, 31, 108, 1);
                outline: none;
                border: 0;
            }

            ::-webkit-input-placeholder {
                /* WebKit browsers */
                color: rgba(254, 254, 254, 0.5);
            }
        }

        > div:nth-child(3) {
            width: 14px;
            height: 8px;
            background-image: url(../assets/xiala.png);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 17px;
        }

        .searchList {
            position: absolute;
            width: 370px;
            max-height: 240px;
            left: 0;
            top: 40px;
            overflow-y: scroll;
            color: white;
            background: #0066cc; /*rgba(9, 31, 108, 1);*/
            > div {
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding-left: 16px;
                z-index: 100;
            }
        }

        .searchList::-webkit-scrollbar {
            width: 6px;
            background: #0066CC;
            /*外层轨道*/
        }

        .searchList::-webkit-scrollbar-thumb {
            display: block;
            width: 6px;
            margin: 0 auto;
            border-radius: 10px;
            background: #00CCFF;
            /*内层轨道*/
        }
    }

    .body {
        margin-top: 20px;
        padding-left: 17px;
        padding-right: 17px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        /*min-height:200px;*/
        height: 600px;
        overflow-y: auto;

        table {
            width: 1348px;
            border-collapse: collapse;
            border-spacing: 0;
            a {
                text-decoration: none;
                color:white;
            }
            thead {
                background-color: rgba(0, 102, 204, 1);
                height: 50px;

                tr {
                    background-color: rgba(0, 102, 204, 1);
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    text-align: center;

                    td {
                        border: 1px #0066CC solid;
                        /*line-height:50px;*/
                    }
                }
            }

            tbody {
                text-align: center;

                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);

                tr {
                    height: 40px;

                    td {
                        border: 1px #0066CC solid;
                        line-height: 40px;
                    }
                }

                tr:first-child {
                    background-color: rgba(0, 102, 204, 1);
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    text-align: center;

                    td {
                        border: 1px #0066CC solid;
                        /*line-height:50px;*/
                    }
                }

            }

            table-layout: fixed;
        }

    }
</style>
