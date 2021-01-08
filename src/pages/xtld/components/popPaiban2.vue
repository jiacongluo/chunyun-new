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
                            <div class="name">广东省春运工作联系方式</div>
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
                        <table ref="tableList">
                            <thead v-show="query">
                            <tr>
                                <td>单位</td>
                                <td>领导机构职务</td>
                                <td>姓 名</td>
                                <td>职务</td>
                                <td>办公电话</td>
                                <td>移动电话</td>
                                <td>传真</td>
                                <td>电子邮箱</td>
                            </tr>
                            </thead>
                            <tbody v-show="query=='省交通运输厅'">
                            <tr>
                                <td rowspan="3">
                                    省交通运输厅
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>章 权</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副厅长</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td rowspan="2">
                                    gdscybgs@163.com
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>翁兴根</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>综合运输处处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83730025</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13825011836</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24小时值班电话：83881523、83835328；收文传真：83730675</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省委宣传部'">
                            <tr>
                                <td rowspan="3">
                                    
                                    <p>
                                        <span>省委宣传部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>崔朝阳</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>省委宣传部副部长、</span>
                                    </p>
                                    <p>
                                        <span>省新闻办主任</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13922113305</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>曾宝瑜</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>新闻处副处长</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13902223823</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24小时值班电话：；收文传真：；单位文秘：</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='省发展改革委员会'">
                            <tr>
                                <td rowspan="4">
                                    
                                    
                                    <p>
                                        <span>省发展改革委员会</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>黄恕明</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副主任</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83133085</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13902491300</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>林蓓霞</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>价格处处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83134172</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13500001061</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>崔 岩</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>价格处二级主任</span>
                                    </p>
                                    <p>
                                        <span>科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83134590</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18922758369</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83134195</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>Fgw_jgglc@</span>
                                    </p>
                                    <p>
                                        <span>gd.gov.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24小时值班电话：单位文秘：83133087；收文传真：83134195</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省市场监督管理局'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    <p>
                                        <span>省市场监督管理局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈 波</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副巡视员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>38836988</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13802908739</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>王诗翔</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>38835451</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13609001331</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈 涛</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>38835997</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13560039889</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>蔡亲国</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>38835464</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13822222631</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24小时值班电话：；收文传真：；单位文秘（办公室）：</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='省教育厅'">
                            <tr>
                                <td rowspan="8">
                                    
                                    
                                    
                                    
                                    <p>
                                        <span>省教育厅</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>朱超华</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>省教育厅党组成</span>
                                    </p>
                                    <p>
                                        <span>员、副厅长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>37629032</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>日常工作负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>程五一</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>学校后勤管理处</span>
                                    </p>
                                    <p>
                                        <span>处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>37628105</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13924088651</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>饶洪彬</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>学校后勤管理处</span>
                                    </p>
                                    <p>
                                        <span>四级调研员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>37627235</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18126821376</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>贺丰霞</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>学校后勤管理处</span>
                                    </p>
                                    <p>
                                        <span>二级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>37627115</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13631385413</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>迟海洋</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>学校后勤管理处</span>
                                    </p>
                                    <p>
                                        <span>主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>37627979</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>15920404642</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>胡沛均</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>学校后勤管理处</span>
                                    </p>
                                    <p>
                                        <span>四级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>37629529</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13922176307</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>胡沛均</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>学校后勤管理处</span>
                                    </p>
                                    <p>
                                        <span>四级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>37629529</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13922176307</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：37626346；收文传真：37627239/37626613；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：37629320</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省公安厅'">
                            <tr>
                                <td rowspan="7">
                                    
                                    
                                    
                                    <p>
                                        <span>省公安厅</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>孙太平</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副厅长</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>日常工作负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>申勇强</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>交管局局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83111518</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>刘振星</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>交管局副局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83111518</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>郭湘楠</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>交管局指挥处副</span>
                                    </p>
                                    <p>
                                        <span>科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83110392</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13570211580</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>36220820</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <a href="mailto:jtxxk@163.com"><span>jtxxk@163.com</span></a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>刘 浩</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>交管局秩序处副</span>
                                    </p>
                                    <p>
                                        <span>科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83111566</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13922185006</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>36220820</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>梁泽宏</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>交管局指挥处副</span>
                                    </p>
                                    <p>
                                        <span>科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83110389</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13824452610</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>36220820</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：36220800；收文传真：36220820；单位文秘（办公室）：83111520</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省人力资源社会保障厅'">
                            <tr>
                                <td rowspan="3">
                                    
                                    <p>
                                        <span>省人力资源社会保障厅</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>葛国兴</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副厅长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83176399</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>夏义兵</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副局长</span>
                                    </p>
                                    <p>
                                        <span>（主持工作）</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83372778</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13828460329</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>唐圣章</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83365313</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13570448520</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省人力资源社会保障厅'">
                            <tr>
                                <td rowspan="4">
                                    
                                    <p>
                                        <span>省人力资源社会保障厅</span>
                                    </p>
                                </td>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>卢健秋</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83345706</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13763349360</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>罗风华</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83363271</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826256189</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>罗风华</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83363271</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826256189</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：020-83363271；收文传真：020-83327258；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：020-83364508</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省卫生健康委员会'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    <p>
                                        <span>省卫生健康委员会</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>马文峰</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>省卫健委党组成</span>
                                    </p>
                                    <p>
                                        <span>员，保健局局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83870001</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826221123</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>高 燕</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>卫健委保健局副</span>
                                    </p>
                                    <p>
                                        <span>局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89221158</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13889901333</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>严宏志</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>三级调研员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89020588</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13824467588</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>王 慧</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>宣传处</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83134381</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826468518</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24小时值班电话：；收文传真：83730675</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='团省委'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    <p>
                                        <span>团省委</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>唐 锐</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>团省委副书记</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87185629</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13503081187</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>黎业辉</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>省志愿者行动</span>
                                    </p>
                                    <p>
                                        <span>指导中心副主任</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83861999</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13556038122</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>gd_zyz@126.</span>
                                    </p>
                                    <p>
                                        <span>com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>倪晓奇</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>省志愿者行动</span>
                                    </p>
                                    <p>
                                        <span>指导中心干部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87786223</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>14743212402</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>gd_zyz@126.</span>
                                    </p>
                                    <p>
                                        <span>com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>杨意舒</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>省志愿者行动指</span>
                                    </p>
                                    <p>
                                        <span>导中心八级职员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87786223</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18820400623</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>gd_zyz@126.</span>
                                    </p>
                                    <p>
                                        <span>com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：87786223；收文传真：87185611；单位文秘（办公室）：87185611</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='民航中南地区管理局'">
                            <tr>
                                <td rowspan="3">
                                    
                                    
                                    <p>
                                        <span>民航中南地区管理局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>高迎丰</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>民航广东监管局局领导</span>
                                    </p>
                                    <p>
                                        <span>（一级调研员）</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>86122886</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13903074711</span>
                                    </p>
                                </td>
                                <td rowspan="3">
                                    
                                    
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>86134450</span>
                                    </p>
                                </td>
                                <td rowspan="3">
                                    
                                    
                                    <p>
                                        <span>gjjysc@163.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>邝志明</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>民航广东监管局</span>
                                    </p>
                                    <p>
                                        <span>运输处处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>86128337</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13926449002</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>莫湘湘</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>民航广东监管局运输处一级主任</span>
                                    </p>
                                    <p>
                                        <span>科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>86132536</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13631476583</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='民航中南地区管理局'">
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>民航中南地区管理局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>宣传工作联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>符 瑶</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>民航广东监管局行政办一级主任</span>
                                    </p>
                                    <p>
                                        <span>科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>86137583</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18922175099</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>86134450</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>gjjysc@163.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：13570056560；收文传真：020-86134450；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：020-86135047</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省通信管理局'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    
                                    <p>
                                        <span>省通信管理局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>李 敏</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>党组成员、</span>
                                    </p>
                                    <p>
                                        <span>一级巡视员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87626830</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18666086899</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87690462</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈亮新</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>处长、</span>
                                    </p>
                                    <p>
                                        <span>一级调研员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87628826</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826260005</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87690462</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>樊志伟</span>
                                    </p>
                                    <p>
                                        <span>（主<span>） </span><span>许&nbsp;&nbsp;&nbsp; 倩</span></span>
                                    </p>
                                    <p>
                                        <span>（备）</span>
                                    </p>
                                </td>
                                <td>
                                    
                                    <p>
                                        <span>二级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87626862</span>
                                    </p>
                                    <p>
                                        <span>（ 主 ） <span>87318103</span></span>
                                    </p>
                                    <p>
                                        <span>（备）</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13922190801</span>
                                    </p>
                                    <p>
                                        <span>（ &nbsp; 主 ） <span>15820215480</span></span>
                                    </p>
                                    <p>
                                        <span>（备）</span>
                                    </p>
                                </td>
                                <td>
                                    
                                    <p>
                                        <span>87690462</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    
                                    <p>
                                        <span>宣传工作联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>许&nbsp;&nbsp;&nbsp; 倩</span>
                                    </p>
                                    <p>
                                        <span>（主<span>） </span><span>李志圣</span></span>
                                    </p>
                                    <p>
                                        <span>（备）</span>
                                    </p>
                                </td>
                                <td>
                                    
                                    <p>
                                        <span>二级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87318103</span>
                                    </p>
                                    <p>
                                        <span>（ 主 ） <span>87628376</span></span>
                                    </p>
                                    <p>
                                        <span>（备）</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>15820215480</span>
                                    </p>
                                    <p>
                                        <span>（ &nbsp; 主 ） <span>13927183683</span></span>
                                    </p>
                                    <p>
                                        <span>（备）</span>
                                    </p>
                                </td>
                                <td>
                                    
                                    <p>
                                        <span>87690462</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：13922190801；收文传真：87626800；单位文秘（办公室）：87699309</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='省气象局'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    
                                    <p>
                                        <span>省气象局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>梁建茵</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87671905</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13503052960</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87773952</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>liang_jy@</span>
                                    </p>
                                    <p>
                                        <span>gd121.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>张银河</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>减灾处副处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87672706</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13926219611</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87773952</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>41623517@</span>
                                    </p>
                                    <p>
                                        <span>qq.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>黄冬三</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>减灾处二级主任</span>
                                    </p>
                                    <p>
                                        <span>科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87672115</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13560391871</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87773952</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>109908537@</span>
                                    </p>
                                    <p>
                                        <span>qq.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>杨群娜</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>办公室媒体中心</span>
                                    </p>
                                    <p>
                                        <span>科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87671871</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18502021681</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>87773952</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>597127242@</span>
                                    </p>
                                    <p>
                                        <span>qq.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：020-87667965；收文传真：020-87773952；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：020-87667965</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='广东海事局'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    <p>
                                        <span>广东海事局</span>
                                    </p>
                                </td>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈毕伍</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89098989</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>34291384</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>黄斯深</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副局长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89098983</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>34291384</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>日常工作负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>吴建生</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89098805</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18922227598</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>何伟雄</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89098803</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13600495931</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>hwxiong@</span>
                                    </p>
                                    <p>
                                        <span>gdmsa.gov.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>温光富</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>四级调研员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89098804</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18922227248</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>Wenguangfu</span>
                                    </p>
                                    <p>
                                        <a href="mailto:001@163.com"><span>001@163.com</span></a>
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>广东海事局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>周明耀</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>一级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>89098418</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13825003260</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：34283886；收文传真：34281854；单位文秘（办公室）：89098406</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='武警广东总队'">
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>武警广东总队</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>张树彬</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>参谋</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>85129196</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13560172090</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24小时值班电话：</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='中国铁路广州局集团有限公司'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    <p>
                                        <span>中国铁路广州局集团有限公司</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>刘唐洪</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61328008</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>胡湘江</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>总工程师</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61323662</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13924273179</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>彭 翔</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61327752</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18902254687</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>曾 勇</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副科长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61327329</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18675823835</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：61326001；收文传真：61326159；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：61322159</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='省铁路建设投资集团'">
                            <tr>
                                <td rowspan="10">
                                    
                                    
                                    
                                    
                                    
                                    <p>
                                        <span>省铁路建设投资集团</span>
                                    </p>
                                </td>
                                <td rowspan="6">
                                    
                                    
                                    
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>王 刚</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869303</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13922252881</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>高 振</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>党委副书记</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869305</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13600004500</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>杨晚华</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>党委委员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869316</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13609711517</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>许泽群</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869328</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13922261188</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>梁育辉</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869329</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13802903375</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>曾 奕</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869313</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13802739832</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>顾建华</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>部长 /</span>
                                    </p>
                                    <p>
                                        <span>运输管理部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869333</span>
                                    </p>
                                    <p>
                                        <span>转 </span><span>8561</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18206661565</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>刘晓华</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>主管 /</span>
                                    </p>
                                    <p>
                                        <span>运营管理部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869333</span>
                                    </p>
                                    <p>
                                        <span>转 </span><span>8566</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18923651665</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈晓伟</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>主管 /</span>
                                    </p>
                                    <p>
                                        <span>党群工作部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>61869333</span>
                                    </p>
                                    <p>
                                        <span>转 </span><span>8540</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>15918706518</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>503782390@</span>
                                    </p>
                                    <p>
                                        <span>qq.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：61355818；收文传真：61355100；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：61869333 转 8117</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='省能源局'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    <p>
                                        <span>省能源局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>吴道闻</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>局长</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>83133011</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>黄志明</span>
                                    </p>
                                    <p>
                                        <span>周&nbsp;&nbsp;&nbsp; 晶</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>处长</span>
                                    </p>
                                    <p>
                                        <span>副处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83133329</span>
                                    </p>
                                    <p>
                                        <span>83138679</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18666092211</span>
                                    </p>
                                    <p>
                                        <span>13798195766</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83133329</span>
                                    </p>
                                    <p>
                                        <span>83138679</span>
                                    </p>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>庞子铃</span>
                                    </p>
                                    <p>
                                        <span>邱&nbsp;&nbsp;&nbsp; 晨</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>四级调研员</span>
                                    </p>
                                    <p>
                                        <span>干部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83134563</span>
                                    </p>
                                    <p>
                                        <span>83138740</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13570468979</span>
                                    </p>
                                    <p>
                                        <span>13826160306</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>邱 晨</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>干部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83138740</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826160306</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <a href="mailto:qiuch@gd.gov"><span>qiuch@gd.gov.</span></a>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：；收文传真：；83138665；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：83138751</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省机场集团'">
                            <tr>
                                <td rowspan="5">
                                    
                                    
                                    <p>
                                        <span>省机场集团</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>鲍轶琳</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>总经济师、党委</span>
                                    </p>
                                    <p>
                                        <span>委员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>86128881</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>胡 丹</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>经营管理部副部</span>
                                    </p>
                                    <p>
                                        <span>长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>86120890</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13570068266</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>辛 玲</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>经营管理部业务</span>
                                    </p>
                                    <p>
                                        <span>经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>86131559</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13711231036</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>xinl@gdairport.</span>
                                    </p>
                                    <p>
                                        <span>com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈仕试</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>党委工作部业务</span>
                                    </p>
                                    <p>
                                        <span>经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>86133761</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826057358</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>chenss@</span>
                                    </p>
                                    <p>
                                        <span>gdairport.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24小时值班电话：13902201190；收文传真：86636728；单位文秘：86120918</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='省交通集团'">
                            <tr>
                                <td rowspan="8">
                                    
                                    
                                    
                                    
                                    <p>
                                        <span>省交通集团</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>曹晓峰</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>29006113</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13802949888</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>日常工作负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>刘小峰</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>经营管理部部长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>29005962</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18022391600</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>李文贵</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>经营管理部副部</span>
                                    </p>
                                    <p>
                                        <span>长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>29005960</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13802943526</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>李红昕</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>经营管理部主管</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>29005970</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13501517198</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>80482789@</span>
                                    </p>
                                    <p>
                                        <span>qq.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>黄申春</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>经营管理部</span>
                                    </p>
                                    <p>
                                        <span>副主管</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>29005967</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13570381733</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>3789496@</span>
                                    </p>
                                    <p>
                                        <span>qq.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>宣传工作联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>李红梅</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>党群工作部</span>
                                    </p>
                                    <p>
                                        <span>副部长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>29006072</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13922269360</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>欧阳</span>
                                    </p>
                                    <p>
                                        <span>征朝</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>党群工作部职员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>29006069</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13924124816</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>34969368@</span>
                                    </p>
                                    <p>
                                        <span>qq.com</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：020-83730980；收文传真：020-29006300；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：冯刚 13688889002</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='省航运集团'">
                            <tr>
                                <td rowspan="9">
                                    
                                    
                                    
                                    
                                    
                                    <p>
                                        <span>省航运集团</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>杨显昌</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>航运集团党委书记、董事长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83295333</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13822221133</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295064</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>yangxc@ </span><span>hangyun.com.</span>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>日常工作负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>张道武</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>航运集团党委委员、副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83297899</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13822235101</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295064</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>zhangdw@ </span><span>hangyun.com.</span>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>丁予君</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>航运集团党委委员、副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83297999</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13602732565</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295064</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>dingyj@ </span><span>hangyun.com.</span>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>杨榜明</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>航运集团总经理助理、经营管理</span>
                                    </p>
                                    <p>
                                        <span>部部长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83297881</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18680525031</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295476</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>yangbm@ </span><span>hangyun.com.</span>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>李志杰</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>航运集团安全总监、安全监督部</span>
                                    </p>
                                    <p>
                                        <span>部长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83297998</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13902248021</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295476</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>lizj@hangyun.com.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>统计联络</span>
                                    </p>
                                    <p>
                                        <span>员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>李家乐</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>经营管理部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83297716</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18126793668</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295476</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>lijl@hangyun.</span>
                                    </p>
                                    <p>
                                        <span>com.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>高洪亮</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>党群工作部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83297863</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13761812909</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295476</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>gaohl@ </span><span>hangyun.com.</span>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <p>
                                        <span>安全联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈 晨</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>安全监督部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83297882</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18565317668</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>83295476</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>chenchen@ </span><span>hangyun.com.</span>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：18024073178；收文传真：；83295476；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：18126793668</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='中国移动广东分公司'">
                            <tr>
                                <td rowspan="8">
                                    
                                    
                                    
                                    
                                    <p>
                                        <span>中国移动广东分公司</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>崔志顺</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>公司副总经理</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13802882128</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>聂 磊</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>网络部副总经理</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13922200985</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>周明辉</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>网络部主任</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13902220689</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>余俊松</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>网络部应急主管</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13802881826</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>曾长江</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>网络管理中心主</span>
                                    </p>
                                    <p>
                                        <span>管</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13902220401</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>卜仁彪</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>无线优化中心主</span>
                                    </p>
                                    <p>
                                        <span>管</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13802881239</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>雷少波</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>综合部主管</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>13802883127</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话；13802880671；收文传真：66836999/66811219；单位文秘（办公室）：</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='中国电信广东分公司'">
                            <tr>
                                <td rowspan="6">
                                    
                                    
                                    
                                    <p>
                                        <span>中国电信广东分公司</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>徐 丛</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87189918</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13302332266</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>刘志军</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>网运部副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87188236</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13302336623</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>李志锋</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>网运部主管</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87188718</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13302322693</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>陈穗华</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>监控值班室主管</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87189107</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13302338309</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>索 莎</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>公共关系</span>
                                    </p>
                                    <p>
                                        <span>业务主管</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>87188871</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18922778880</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：87778207；收文传真：87753605；单位文秘（办公室）：13302332348</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-show="query=='中国联通广东分公司'">
                            <tr>
                                <td rowspan="13">
                                    
                                    
                                    <p>
                                        <span>中国联通广东分公司</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈孟尝</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>广东联通</span>
                                    </p>
                                    <p>
                                        <span>副总经理</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>18620010016</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="3">
                                    
                                    <p>
                                        <span>日常工作负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>宋人强</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>办公室副主任</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22181333</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602031333</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>麦文胜</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>网运部副总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22181000</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602030100</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>苏爱国</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>广东联通信息安</span>
                                    </p>
                                    <p>
                                        <span>全部总经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22189008</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602039008</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>

                                <td rowspan="2">
                                    
                                    <p>
                                        <span>日常工作负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>郭俊明</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>客户服务部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22180979</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602030979</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>张迎峰</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>联通（广东）<span>产</span><span>业互联网公司大</span></span>
                                    </p>
                                    <p>
                                        <span>数据部副总经理</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>18602031228</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>zhangyf2284@chinaunicom.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>郭 庆</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>办公室 /</span>
                                    </p>
                                    <p>
                                        <span>安全保卫部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22182468</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602032468</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>guoq30@chinaunicom.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="4">
                                    
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>肖嘉晔</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>广东联通网运部</span>
                                    </p>
                                    <p>
                                        <span>室负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22181536</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602031536</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>xiaojy5@chinaunicom.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>罗创业</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>广东联通信息安</span>
                                    </p>
                                    <p>
                                        <span>全部室经理</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22181611</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602033437</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>luochuangye@chinaunicom.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>万 亮</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>广东联通客户服</span>
                                    </p>
                                    <p>
                                        <span>务部主管</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22183437</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602033437</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>wanl11@chinaunicom.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>苏 寒</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>联通（广东）产业互联网公司大</span>
                                    </p>
                                    <p>
                                        <span>数据部主管</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>18602033032</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>suh32@chinaunicom.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>邓颍瑶</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>办公室 /</span>
                                    </p>
                                    <p>
                                        <span>安全保卫部</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>22180983</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>18602030983</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>dengyy18@chinaunicom.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：18680524432；收文传真：22180999；</span>
                                    </p>
                                    <p>
                                        <span>单位文秘（办公室）：18602030983</span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody v-show="query=='省政务服务数据管理局'">
                            <tr>
                                <td rowspan="6">
                                    
                                    
                                    
                                    <p>
                                        <span>省政务服务数据管理局</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>周传世</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>总工程师、</span>
                                    </p>
                                    <p>
                                        <span>一级调研员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83134766</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13808880895</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>日常工作</span>
                                    </p>
                                    <p>
                                        <span>负责人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>陈德伟</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>业务统筹处</span>
                                    </p>
                                    <p>
                                        <span>处长</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83134317</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13829723557</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    
                                    <p>
                                        <span>联络员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>曾志波</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>四级主任科员、</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83134725</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13580360460</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <span>gdic_zengzb@gd.gov.cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>许美凝</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>四级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83134765</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13427501409</span>
                                    </p>
                                </td>
                                <td></td>
                                <td>
                                    <p>
                                        <a href="mailto:xumn@gd.gov"><span>xumn@gd.gov.</span></a>
                                    </p>
                                    <p>
                                        <span>cn</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <span>宣传工作</span>
                                    </p>
                                    <p>
                                        <span>联系人</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>何冠明</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>办公室</span>
                                    </p>
                                    <p>
                                        <span>一级主任科员</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>020-</span>
                                    </p>
                                    <p>
                                        <span>83132263</span>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <span>13826203719</span>
                                    </p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <p>
                                        <span>24 </span><span>小时值班电话：020-83134475；收文传真：020-83327534；</span>
                                    </p>
                                    <p>
                                        <a href="mailto:fuwei@gd.gov.cn"><span>单位文秘（办公室）：020-83134214</span><span>、13360553210</span><span>、fuwei@gd.gov.cn</span><span>（傅潍）</span></a>
                                    </p>
                                </td>
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
                this.totalList= ["省交通运输厅", "省委宣传部", "省发展改革委员会", "省市场监督管理局", "省教育厅", "省公安厅", "省人力资源社会保障厅",
                    "省卫生健康委员会", "团省委", "民航中南地区管理局", "省通信管理局", "省气象局", "广东海事局", "武警广东总队", "中国铁路广州局集团有限公司",
                    "省铁路建设投资集团", "省能源局","省机场集团","省交通集团","省航运集团","中国移动广东分公司","中国电信广东分公司","中国联通广东分公司","省政务服务数据管理局"];
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

            }

            table-layout: fixed;
        }

    }
</style>
