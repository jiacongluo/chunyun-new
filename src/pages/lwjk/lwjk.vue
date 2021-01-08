<template>
	<div class="lwjk" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
	 element-loading-background="rgba(0, 0, 0, 0.8)">

		<rightHeader :currentPage="'2'"></rightHeader>
		<div class="jkbody">

		</div>
		<div id="container">

		</div>

		<!-- 实时视频监控 -->

		<div class="video color-white fs_16 bgi csp flex jsc" @click="changeActive" v-show="videoShow" :class="{'videoActive':videoActive}">
			<div class="bgi"></div>
			<div>实时监控</div>
		</div>

		<div class="bgi videoLine" v-show="videoActive && videoShow"></div>

		<div class="videolist" v-if="videoActive && videoShow">
			<ul class="cam-box-inner">
			    <li v-for="(item,index) in videoList" :key="index"
			        @click="clickCam($event,item)">
			        <i class="bgi"></i>
			        <span>{{item.name}}</span>
			    </li>
			</ul>
		</div>
		<!-- 天气预报 -->
		<div class="weather" v-show="weatherShow">
			<weatherBox2></weatherBox2>
		</div>
		<!-- 天气预报结束 -->

		<!-- 监控结束 -->
		<div style="display: none;">
			<div ref='marker'>
				<Marker2 @closeInfo='this.closeInfo' :ifPeople="false" :amount="'400'" :name="markerName"></Marker2>
			</div>
		</div>
		<div v-if="!ifDraw">
			<!-- 高速路段控件 -->
			<div class="roads fs_16 color-white">

				<div class="flex road">
					<!-- 收费站控件 -->
					<div class="stations bgi flex" v-show="stationShow">
						<div>{{stationName}}</div>
						<div></div>
						<div class="bgi" @click="back"></div>
					</div>
					<div class="flex csp" @click="changeShow1">
						<div class="color-white" v-if="!this.type">路段名称</div>
						<div class="color-white" v-if="this.type">收费站</div>
						<div class="bgi"></div>
					</div>
					<div>
						<input type="text" v-model="search" placeholder="请输入要搜索地址">
						<div class="suggestion">
							<div class="csp" @click="itemClick(item);search = ''" v-for="(item,i) in suggestionList" :key="i">
								{{item.roadName || item.name}}
							</div>
						</div>
					</div>
					<div class="bgi csp" @click="clickSearch">
						<div class="bgi"></div>
					</div>
				</div>
				<div class="roadContent" :class="{'left': this.stationShow}" v-show="show1">
					<div class="flex">
						<div class="bgi csp" @click="changetype(0)"></div>
						<div class="csp" @click="changetype(0)">路段名称</div>
						<div></div>
						<div class="bgi csp" @click="changetype(1)"></div>
						<div class="csp" @click="changetype(1)">收费站</div>
					</div>
					<div class="line"></div>
					<div>
						<div class="contentItem csp" @click="itemClick(item)" v-for="(item,i) in itemList">
							{{item.roadName || item.name}}
							<div class="itemPlane bgi" v-if="item.roadName === planeRoad1 || item.roadName === planeRoad2 || item.roadName === planeRoad3 || item.roadName === planeRoad4 || item.roadName === planeRoad5 || item.roadName === planeRoad6 || item.roadName === planeRoad7"></div>
							<div class="videoImg bgi" v-if="item.state === 3"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- 无人机 -->
			<div class="plane bgi csp" v-if="planeButton" @click="buttonClick">
				<div class="planeImg bgi" v-if="!ifPlane"></div>
				<div class="planeImg2 bgi" v-if="ifPlane"></div>
				<div class="color-white fs_16 tac" v-if="ifPlane">无人机</div>
			</div>
			<!--
			<div class="drawIt tac color-white fs_16 csp" @click="changeDraw">
				使用画圈功能
			</div> -->
		</div>

		<!-- <div class="drawOptions flex fs_16" v-if="ifDraw">
			<div>
				<el-collapse v-model="activeNames">
					<el-collapse-item :title="this.chooseCity || '选择城市'" name="1">
						<div class="cityList">城市列表</div>
						<div class="line3 "></div>
						<div class="csp gd" @click="chooseCity = '广东';closeDrop()">广东:</div>
						<div class="flex citys csp ">
							<div v-for="(item,i) in cityList" @click="chooseCity = item;closeDrop()">
								{{item}}
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
			<div class="kind tac csp">
				<el-dropdown trigger='click' @command="handleCommand">
					<span class="el-dropdown-link">
						<span>{{kind}}</span>
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu class="chooseImg" style="left: 222px;" slot="dropdown">
						<el-dropdown-item :command="'矩形'">矩形</el-dropdown-item>
						<el-dropdown-item :command="'多边形'">多边形</el-dropdown-item>
						<el-dropdown-item :command="'圆形'">圆形</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="start csp" @click="this.startDraw">开始画图</div>
			<div class="finish csp" @click="openNote">靶向短信</div>
		</div> -->
		<!-- 地图绘制功能 -->
		<!-- <div class="drawSomething csp el-dropdown-link" @click="drawCircle">
			 <el-dropdown>
			      <div class="el-dropdown-link color-white">
			        选择绘制的图形
			      </div>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item>矩形</el-dropdown-item>
			        <el-dropdown-item>多边形</el-dropdown-item>
			        <el-dropdown-item>圆形</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
		</div> -->

		<!-- 靶向短信之前的 -->
		<!-- <div class="drawSomething bgi flex fs_16">
			<div class="csp" @click="changeMap">
				<div class="bgi bgi2" :class="{activeMap:!mapType}">

				</div>
				<div>卫星地图</div>
			</div>
			<div class="bxline bgi"></div>
			<div class="csp" @click="openNote()">
				<div class="bgi" :class="{activeNote:showFrame}">

				</div>
				<div>靶向短信</div>
			</div>
		</div> -->

		<div class="bxnew color-white fs_16 flex">
			<div @click="changeBg(0)" :class="{'activeColor': !mapType}">卫星</div>
			<div @click="changeBg(1)" :class="{'activeColor': mapType}">地图</div>
		</div>

		<div class="csp bxButton flex" :class="{'actborder':showFrame}" @click="openNote()">
			<div class="bgi" :class="{activeNote:showFrame}">

			</div>
			<div>靶向短信</div>
		</div>

		<!-- 实时客流量 -->
		<div class="now bgi flex color-white" v-show="nowShow">
			<div>
				<div class="fs_20">
					实时客流
				</div>
				<div class="bgi"></div>
				<div class="bgi tac fs_16">
					<span>{{peopleNum}}</span>
					<span>人</span>
				</div>
			</div>
			<div>
				<div class="fs_20">实时客流驻留时长分析</div>
				<div id='chart1'></div>
			</div>
			<div>
				<div class="fs_20">客流趋势</div>
				<div id='chart2'>

				</div>
			</div>
		</div>

		<div class="forms">
			<div class="bgi">
				<Title :title="'交通事件数量监测'"></Title>
				<div class="flex">
					<div class="color-white fs_16">本日交通事件数量</div>
					<div class="eventLine">
						<div class="bgi eventLine2">

						</div>
					</div>
					<div>
						<span class="fs_36" style="color: rgba(255, 255, 0, 1);">{{trafficTotal}}</span>
						<span class="fs_14" style="color: rgba(255, 255, 0, 1);">起</span>
					</div>
				</div>
				<div class="flex jsb">
					<div class="reasonList" v-for="(item,i) in reasonList" :key="i">
						<Reason :num="trafficList[i]" :lineWidth="12" :percentage="percenList[i]" :colorq="colorList[i]" :rstype="i-0+1"
						 :reasonName="item"></Reason>
					</div>
				</div>
			</div>
			<div class="bgi">
				<div class="bgi">
					<Title :title="'重点路段监测'"></Title>
					<div class="tableDiv csp">
						<Table @rowClick = "rowClick" :dataList="sortMain" :tbtype="0"></Table>
					</div>
				</div>
			</div>
			<div class="bgi">
				<div class="bgi">
					<Title :title="'缓行路段'"></Title>
					<div class="tableDiv csp">
						<Table @rowClick = "rowClick" :dataList="dataList" :tbtype="1"></Table>
					</div>
				</div>
			</div>
		</div>

		<iframeBox v-if="showUAVIframe"></iframeBox>

		<!-- 靶向短信iframe -->
		<div id="openframe" v-show="showFrame">
			<Myframe @clean="cleanIt" @draw="startDraw($event)" :drawInfo="drawObj" :drawMethods="drawType" @close="this.closeNote"></Myframe>
		</div>

		<!-- 靶向结束 -->

		<div class="right-bg"></div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import TrafficView from '@/utils/traffic.js'
	import rightHeader from '@/components/rightHeader.vue'
	import Title from './components/formTitle.vue'
	import Reason from './components/reason.vue'
	import Table from './components/table.vue'
	import Stations from '@/utils/station2018.js'
	import videoCode from '@/utils/videoCode.js'
	import Myframe from '@/components/frame.vue'
	import Marker2 from '@/components/marker.vue'
	import mixin from '@/utils/myMixin'
	import cityCode from '@/utils/cityCode.js'
	import iframeBox from '@/pages/qyzt/components/iframeBox'
	import mapSWBtn from '@/components/mapSWBtn'
	import weatherBox2 from '@/components/weatherBox2'
	export default {
		name: '',

		mixins: [mixin],


		props: {},

		data() {
			return {
				weatherShow:false, //天气预报是否显示
				activeId:'', //当前点击的无人机uuid
				videoName:'', //当前点击的监控路段名或者收费站名
				videoList:[], //当前监控list
				videoShow:false,
				videoActive:false, //视频监控是否点击
				mapStyle: 'amap://styles/4c9342fa8348902a654e5edeb8dc6c19',
				normalStyle: 'amap://styles/90e78a39a4c75b68d73f9cf7ba92aa2c',
				timer:{},
				timer2:{},
				mainArr: [], //重点路段数组
				mapObj: '', //地图画的对象
				drawType: 0, //选择画图的形状
				UAVMarker: [], // 无人机marker
				UAVPolyline: [], // 无人机线
				isShowUAV: false, // 是否在显示无人机
				id: 3, // 3'广珠西线' , 4'南二环'
				UAVData: [], // 无人机数据
				streamName: '', //无人机的名字
				idList: [], //后台返回的名字查询id列表
				planeButton: false, //无人机按钮显隐
				uuid3: '33', //写死的无人机id3
				uuid4: '44', //写死的无人机id4
				uuid5: '162', //写死的无人机id5
				uuid6: '168', //写死的无人机id6
				uuid7:'169', //写死的无人机id7
				uuid8: '170',
				uuid9: '171',
				planeRoad1: '南二环', //写死的无人机路段1
				planeRoad2: '广珠西线', //写死的无人机路段2
				planeRoad3:'京港澳高速粤境北段(京珠北)',
				planeRoad4: '二广高速',
				planeRoad5: '渝湛高速',
				planeRoad6: '湛徐高速',
				planeRoad7: '粤赣高速',
				trafficTotal: 0, //交通总数
				area: 0, //圈出范围的面积
				infoWindow: {}, //信息窗体对象
				markerName: '', //信息窗体name
				markerObj: {}, //高速路marker对象
				frameSrc: '',
				showFrame: false,
				drawObj: [], //画的图形对象
				isDrawed: false,
				kind: '选择图形',
				chooseCity: '',
				cityList: [],
				activeNames: ['1'],
				ifDraw: false, //是否画圈
				UAVLogo: require('./assets/wurenjidian.png'),
				ifPlane: false, //无人机按钮是否激活
				layer1: {}, //卫星图层
				mapType: 0, //切换地图样式 0为卫星 1为标准
				loading: false, //加载动画
				traffic: {}, //实例画线对象
				chart1Data: [], //驻留市场分析数组
				chart2Data: [], //客流趋势
				postionID: '80171', //传给后台的点id
				date: '', //传给后台的时间
				suggestionShow: true,
				map: {}, //当前地图示例对象
				suggestionList: [], //搜索建议
				nowShow: false, //实时客流量显隐
				eventNum: 125, //事件响应数
				reasonList: [],
				itemList: [],
				type: 0, //0为高速路段,1为收费站
				show1: false, //高速路段显隐
				show2: false, //收费站显隐
				stationShow: false, //收费显隐
				stationName: '', //收费站名称
				chart1: null,
				chart2: null,
				peopleNum: 342, //实时人数
				percenList: [],
				trafficList: [],
				colorList: ['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 1)',
					'rgba(255, 255, 0, 1)'
				],
				bgcList: ['rgba(255, 255, 0, 0.2)', 'rgba(255, 255, 0, 0.2)', 'rgba(255, 255, 0, 0.2)', 'rgba(255, 255, 0, 0.2)',
					'rgba(255, 255, 0, 0.2)'
				],
				dataList: [], //后台返回的数组
				//写死的收费站数据
				stationList: [{
						name: '清远西收费站',
						xy: '113.022921,23.660767'
					},
					{
						name: '广园收费站',
						xy: '113.273612,23.158289'
					},
					{
						name: '三元里收费站',
						xy: '113.256076,23.158451'
					},
					{
						name: '勒流收费站',
						xy: '113.187256,22.844037'
					},
					{
						name: '沙贝收费站',
						xy: '113.194773,23.154628'
					},
					{
						name: '佛山罗格收费站',
						xy: '113.011973,22.991334'
					},
					// {
					// 	name: '街口收费站',
					// 	xy: '113.579269,23.520948'
					// },
				],
				//写死的几条监控路段
				videoRoad:[
					{
						name:'南沙港快速',
						xy:'113.389796,22.985239',
					},
					// {
					// 	name:'东二环高速',
					// 	xy:'113.389796,22.985239',
					// },
					{
						name:'广明高速',
						xy:'113.339405,22.980549',
					},
					{
						name:'华南快速',
						xy:'113.336837,23.02714',
					}
				],
				search: '', //搜索文本
			}
		},
		computed: {
			// 重点路段数据排序
			sortMain: function() {
				if(this.mainArr.length < 1){
					return
				}
				return this.sortByKey(this.mainArr, 'jamSpeed')
			}
		},

		watch: {
			drawObj(n, o) {
				console.log("drawObj", n);
				// debugger
			},
			mapType(n, o) {
				if (n) {
					this.map.remove(this.layer1)
					this.map.setMapStyle(this.mapStyle)
				} else {
					this.map.add(this.layer1)
					this.map.setMapStyle(this.normalStyle)
				}
			},
			type(n, o) {
				if (!n) {
					this.itemList = JSON.parse(JSON.stringify(this.dataList))
					this.addItem()
				} else {
					this.itemList = this.stationList
				}
			},
			search(n, o) {
				if (n) {
					if (!this.type) {
						this.suggestionList = []
						for (var i = 0; i < 10; i++) {
							if (n === this.itemList[i].roadName.substr(0, n.length)) {
								// console.log(m.C.extData['枢纽名称']);
								this.suggestionList.push(this.itemList[i])
								// debugger
							}
						}
					} else {
						this.suggestionList = []
						for (var i = 0; i < this.stationList.length; i++) {
							if (n === this.stationList[i].name.substr(0, n.length)) {
								// console.log(m.C.extData['枢纽名称']);
								this.suggestionList.push(this.stationList[i])
								// debugger
							}
						}
					}
				} else {
					this.suggestionList = []
				}
			}
		},

		created() {

			this.date = this.utils.formatTime2()
			for (let i in cityCode) {
				this.cityList.push(cityCode[i])
			}
			this.drawGaode()
			this.getTop()
			const timer1 = setInterval(()=>{
				this.changetype(0)
				this.drawGaode()
				this.getTop()
			},1000*60*2)


			this.http.get('/api/terminal/getPositionInfoList', {

			}).then(res => {
				if (res.code == 200) {
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].postion_type == '收费站')
							this.idList.push(res.data[i])
					}
				} else {
					console.log(res.msg)
				}
			})



			this.http.get('/api/gdcnymotOut/trafficEvent', {

			}).then(res => {
				if (res.code == 200 && res.data.length > 0) {
					for (let i = 0; i < res.data.length; i++) {
						this.trafficTotal += res.data[i].COU - 0
						this.trafficList.push(res.data[i].COU)
						this.reasonList.push(res.data[i].eventTypeName)
					}
					let me = this
					let four = 0
					for (let j = 0; j < this.trafficList.length; j++) {
						if(me.trafficTotal){
							if(j<4){
								this.percenList.push(Math.round((me.trafficList[j] - 0) / me.trafficTotal * 100))
								four += (Math.round((me.trafficList[j] - 0) / me.trafficTotal * 100))
							}else{
								// alert(four)
								this.percenList.push(100-four)
							}

						}else{
							this.percenList.push(0)
						}

					}
				} else {

				}
			})
		},

		mounted() {

			this.markerObj = this.$refs.marker
			this.initMap([113.27, 23.13])
			let me = this;
			let arr = document.getElementsByClassName('el-progress__text');
			for (let i = 0; i < arr.length; i++) {
				arr[i].innerHTML = '<span class="percent1">' + me.percenList[i] + '</span>' + '<span class="percent2">%</span>'
				arr[i].style.color = me.colorList[i];
				arr[i].style.top = '60%';
			}
			let arr2 = document.getElementsByClassName('percent2');
			for (let i = 0; i < arr2.length; i++) {
				arr2[i].style.fontSize = '12px'
			}
			let arr3 = document.getElementsByClassName('el-progress-circle__track');
			for (let i = 0; i < arr2.length; i++) {
				let bgc = me.bgcList[i]
				arr3[i].setAttribute('stroke', bgc)
			}

			this.traffic = new TrafficView(this.map);
		},

		destroyed() {},

		methods: {
			clickSearch(){
				if(!this.search){
					alert('请输入地点')
					return
				}
				if (!this.type) {
					if(this.search == this.suggestionList[0].roadName){
						this.itemClick(this.suggestionList[0])
					}else{
						alert('找不到地点')
					}
				} else {
					if(this.search == this.suggestionList[0].name){
						this.itemClick(this.suggestionList[0])
					}else{
						alert('找不到地点')
					}
				}

			},
			// 去除括号方法(只用于显示监控)
			formatterLoad(str){
				if(str.indexOf('(') != -1){
					return str.split('(')[0]
				}else{
					return str
				}
			},
			// 点击摄像头
			clickCam (ev, item) {
			    ev.stopPropagation()
			    // debugger
			    const origin = window.location.origin
			    const path = window.location.pathname.split('/')[1]
			    let url = 'SHWGOIE:'+ origin + '/' + path + '/video/?vid=' + item.code
			    // debugger
			    window.location.href = url
			},
			changeActive(){
				this.videoActive = !this.videoActive
			},
			rowClick(obj){
				this.type = 0
				this.itemClick(obj)
				// console.log(obj.xy)
			},
			//获取top10路段
			getTop(){
				this.http.get('/api/RoadNetwork/getGsCongestionAndDetails', {

				}).then(res => {
					this.itemList = []
					if (res.code == 200) {
						// debugger
						this.dataList = res.data.rows
						this.itemList = JSON.parse(JSON.stringify(this.dataList))
						this.addItem()
						// this.moveCenter(this.formatterXy(this.dataList[0].xy))

						this.loading = false
						// debugger
					} else {
						this.addItem()
						this.loading = false
					}
				})
			},
			//添加写死的无人机路段和视频监控路段
			addItem(){
				//加上两条写死的无人机路段

				this.itemList.push({
					roadName: this.planeRoad1,
					xy: '113.47408,22.865275',
					state: 2,
					jamDist: 1857,
					jamSpeed: 40,
				})
				this.itemList.push({
					roadName: this.planeRoad2,
					xy: '113.259248,22.935523',
					state: 2,
					jamDist: 2116,
					jamSpeed: 30,
				})
				this.itemList.push({
					roadName: this.planeRoad3,
					xy: '113.076766,25.223171',
					state: 2,
				})
				this.itemList.push({
					roadName: this.planeRoad4,
					xy: '112.885005,23.180834',
					state: 2,
				})
				this.itemList.push({
					roadName: this.planeRoad5,
					xy: '110.266303,21.30943',
					state: 2,
				})
				this.itemList.push({
					roadName: this.planeRoad6,
					xy: '110.076977,21.060274',
					state: 2,
				})
				this.itemList.push({
					roadName: this.planeRoad7,
					xy: '114.914546,24.48293',
					state: 2,
				})
				for (let i = 0; i < this.videoRoad.length; i++) {
					this.itemList.push({
						roadName: this.videoRoad[i].name,
						xy: this.videoRoad[i].xy,
						state: 3,
					})
				}
			},
			drawGaode(){
				//高德请求重点路段交通态势
				let arr = [{
						road: 'G9411莞佛高速',
						code: '440100'
					}, {
						road: 'G25长深高速',
						code: '440300'
					}, {
						road: 'S41机场高速',
						code: '440100'
					}, {
						road: '广佛公路',
						code: '440600'
					}, {
						road: 'G4京港澳高速',
						code: '440100'
					},
					{
						road: 'S15沈海高速广州支线',
						code: '440100'
					},
					{
						road: 'G55二广高速',
						code: '440600'
					},
					{
						road: 'S3广深沿江高速',
						code: '440100'
					},
					{
						road: 'S31龙大高速',
						code: '440300'
					}, {
						road: 'G4W广澳高速',
						code: '440100'
					},

				]

				this.mainArr = []
				for (let i = 0; i < arr.length; i++) {
					this.getGaode(arr[i])
				}
				// this.getGaode('G25长深高速')
				//-----
			},
			changeBg(num){
				this.mapType = num
			},
			//数组对象排序
			sortByKey(array, key) {
				return array.sort(function(a, b) {
					var x = a[key];
					var y = b[key];
					return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				})
			},
			getGaode(obj) {
				this.http.get('https://restapi.amap.com/v3/traffic/status/road?name=' + obj.road +
					'&level=1&adcode=' + obj.code + '&extensions=all&key=461e7bc449e12e9138e49ff6db2f5a3c', {}).then(res => {
					if (res.status && res.info) {
						let speedArr = res.trafficinfo.roads
						// let total = 0;
						// for (let j = 0; j < speedArr.length; j++) {
						// 	if (speedArr[j].speed) {
						// 		let num = speedArr[j].speed - 0;
						// 		total += num
						// 	}
						// }
						// if(obj.road == 'G9411莞佛高速'){
						// 	var xy = speedArr[1].polyline.split(';')[0];
						// 	// obj.road = 'G9411莞佛高速(虎门大桥端)'
						// 	var direction = speedArr[1].direction
						// 	var speed = speedArr[1].speed
						// 	var status = speedArr[1].status
						// }else{
						// 	var xy = speedArr[0].polyline.split(';')[0];
						// 	var direction = speedArr[0].direction
						// 	var speed = speedArr[0].speed
						// 	var status = speedArr[0].status
						// }
						// let speed = Math.floor(total / speedArr.length); //平均车速

						// let status = res.trafficinfo.evaluation.status;

						for (let i = 0; i < speedArr.length; i++) {
							if(speedArr[i].status > 0){
								if(speedArr[i].name == '莞佛高速'){
									var xy = '113.608818,22.7870712';
									var direction = ''
									var speed = speedArr[i].speed
									var status = speedArr[i].status
								}else if(speedArr[i].name == '机场高速'){
									var xy = '113.280228,23.4019375';
									var direction = '从三东大道东出入口到Ｓ１５沈海高速广州支线出口'
									var speed = speedArr[i].speed
									var status = speedArr[i].status
								}else{
									var xy = speedArr[i].polyline.split(';')[0];
									var direction = speedArr[i].direction
									var speed = speedArr[i].speed
									var status = speedArr[i].status
								}
								// debugger
								break
							}
						}
						var newRoad=direction==''?obj.road:obj.road+'('+direction+')';
						if(speed!=null && speed!='null'){
							this.mainArr.push({
								roadName: newRoad,
								jamSpeed: speed,
								status: status,
								xy: xy,
							})
						}

					}else{

					}
				})
			},
			drawFinish() {
				// debugger
				this.showFrame = true
			},
			cleanIt() {
				// debugger
				this.map.remove(this.mapObj)
			},
			//无人机按钮点击
			buttonClick() {
				if (!this.ifPlane) {
					return
				} else {
					this.drawUAVLine()
					this.$store.dispatch('showUAVIframe', true)
					let time = 5000
					this.timer = setInterval(() => {
					    this.repeatFly()
					}, time)
				}
				// this.$store.dispatch('showUAVIframe', true)
			},
			closeInfo() {
				this.infoWindow.close()
			},
			openNote() {
				//以前的逻辑
				// if (this.drawObj.length > 0) {
				// 	if (this.area > 1000000) {
				// 		if (this.chooseCity) {
				// 			this.showFrame = true
				// 		} else {
				// 			alert('请选择发送区域')
				// 		}
				// 	} else {
				// 		alert('圈选面积不能小于1平方公里')
				// 	}
				// } else {
				// 	alert('请先画出范围')
				// }
				// 以前的逻辑结束
				this.showFrame = true
			},
			closeNote() {
				this.showFrame = false
			},
			closeDrop() {
				let arr = document.getElementsByClassName('el-collapse-item__header')
				for (let i = 0; i < arr.length; i++) {
					arr[i].click()
				}
				// removeAttribute('is-active')
			},
			startDraw(data) {
				// this.map.remove(this.drawObj)
				// this.drawObj = []
				// debugger
				this.map.setZoom(14)
				let mouseTool = new AMap.MouseTool(this.map)
				if (data == 3) {
					this.drawPolygon(mouseTool, this)
					this.drawType = 3
				} else if (data == 2) {
					this.drawRectangle(mouseTool, this)
					this.drawType = 2
				} else if (data == 1) {
					this.drawCircle(mouseTool, this)
					this.drawType = 1
				}
			},
			//绘制多边形
			drawPolygon(tool, ts) {
				tool.polygon({
					strokeColor: "#FF33FF",
					strokeOpacity: 1,
					strokeWeight: 6,
					strokeOpacity: 0.2,
					fillColor: '#1791fc',
					fillOpacity: 0.4,
					// 线样式还支持 'dashed'
					strokeStyle: "solid",
					// strokeStyle是dashed时有效
					// strokeDasharray: [30,10],
				})
				tool.on('draw', function(event) {
					if (event.obj.getArea() < 1000000) {
						alert('圈选范围不得小于1平方公里')
						ts.cleanIt()
						return
					}
					// for (var i = 0; i < event.obj.getPath().length; i++) {
					// 	ts.drawObj.push(event.obj.getPath()[i])
					// }
					ts.mapObj = event.obj
					ts.drawObj = event.obj.getPath()
					// console.log(event.obj.getPath())

					// ts.area = event.obj.getArea()
					tool.close()
					ts.drawFinish()
				})
			},
			//绘制矩形
			drawRectangle(tool, ts) {
				tool.rectangle({
					strokeColor: 'red',
					strokeOpacity: 0.5,
					strokeWeight: 6,
					fillColor: 'blue',
					fillOpacity: 0.5,
					// strokeStyle还支持 solid
					strokeStyle: 'solid',
					// strokeDasharray: [30,10],
				})
				tool.on('draw', function(event) {
					ts.mapObj = event.obj
					// console.log(event.obj.getPath())
					if (event.obj.getArea() < 1000000) {
						alert('圈选范围不得小于1平方公里')
						ts.cleanIt()
						return
					}
					// debugger
					// for (var i = 0; i < event.obj.getPath().length; i++) {
					// 	ts.drawObj.push(event.obj.getPath()[i].)
					// }
					ts.drawObj = event.obj.getPath()
					// debugger
					// ts.area = event.obj.getArea()
					tool.close()
					ts.drawFinish()

				})
			},
			//绘制圆形
			drawCircle(tool, ts) {
				tool.circle({
					strokeColor: "#FF33FF",
					strokeOpacity: 1,
					strokeWeight: 6,
					strokeOpacity: 0.2,
					fillColor: '#1791fc',
					fillOpacity: 0.4,
					strokeStyle: 'solid',
					// 线样式还支持 'dashed'
					// strokeDasharray: [30,10],
				})
				tool.on('draw', function(event) {
					ts.mapObj = event.obj
					let r = event.obj.getRadius()
					ts.area = (r * r * Math.PI)
					if (ts.area < 1000000) {
						alert('圈选范围不得小于1平方公里')
						ts.cleanIt()
						return
					}

					let obj = {}

					obj.radius = event.obj.getRadius()
					obj.center = event.obj.getCenter()
					// debugger
					ts.drawObj = []
					ts.drawObj.push(obj)
					// debugger
					tool.close()
					ts.drawFinish()
				})
			},
			handleCommand(command) {
				this.kind = command
			},
			changeDraw() {
				this.ifDraw = true
			},
			//画站点
			drawStations(obj) {
				let me = this
				let center = this.formatterXy(obj.xy)
				let name = obj.name
				let icon = require('./assets/shoufeizhan.png')
				var selfIcon = new AMap.Icon({
					size: new AMap.Size(39, 48),
					image: icon,
					imageSize: new AMap.Size(39, 48),
					// imageOffset: new AMap.Pixel(-35, -3)
				});

				let marker = new AMap.Marker({
					position: center,
					// 将一张图片的地址设置为 icon
					title:name,
					icon: selfIcon,
					// 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
					offset: new AMap.Pixel(-13, -30)
				});
				this.map.add(marker)

				 // 默认的打点marker
				// let marker = new AMap.Marker({
				// 	position: center,
				// 	title: name,
				// 	visible: true,
				// 	radius: 10,
				// 	strokeColor: 'white',
				// 	strokeWeight: 2,
				// 	strokeOpacity: 0.5,
				// 	fillColor: 'rgba(0,0,255,1)',
				// 	fillOpacity: 0.5,
				// 	zIndex: 10,
				// 	bubble: true,
				// 	cursor: 'pointer',
				// 	clickable: true,
				// })
				// marker.setMap(me.map)
				// 默认结束
				marker.on('click', function() {
					me.type = 1;
					me.itemClick(obj)
				})
			},
			changeMap() {
				if (this.mapType) {
					this.mapType = 0
				} else {
					this.mapType = 1
				}
			},
			back() {
				this.changetype(0)
				this.stationShow = false
				this.nowShow = false
			},
			inits(name) {
				this.$nextTick(() => {
					let id
					let me = this
					for (let i = 0; i < me.idList.length; i++) {
						if (me.idList[i].postion_name == name) {
							id = me.idList[i].postion_id
						}
					}
					if (name) {
						this.drawTheRectangle(name)
					}
					this.initChart1(name, id)
					this.initChart2(name, id)
					this.getPeople(name, id)
				})
			},
			/**
			 * 服务区,消费站画线
			 * @param name 地点名称
			 */
			drawTheRectangle(name) {
				for (var key in Stations) {
					if (name === key) {
						// console.log(key);
						var theLngLatArr = Stations[key];
						// debugger
						this.traffic.drawTheRectangle(theLngLatArr);
						return
					}
				}
			},
			//mixing
			htmlFontSize() {
				let theHTML = document.getElementsByTagName('html')[0]
				let theFS = theHTML.style.fontSize
				theFS = theFS.replace('px', '');
				return theFS
			},
			//获取实时客流量
			getPeople(name, id) {
				this.http.getData('/api/toll/selectTollFlowRealtime', {
					postionID: id,
					positionName: name,
				}).then(res => {
					this.peopleNum = res.data.pepValue
				})
			},
			//时长分析echart
			initChart1(name, id) {
				this.chart1Data = []
				this.http.getData('/api/toll/selectTollStay', {
					date: this.date,
					postionID: id,
					postionName: name
				}).then(res => {
					if (res.data.length > 0) {
						for (var i = 0; i < res.data.length; i++) {
							// this.chart1Data.push(res.data[i].timeValue - 0)
                            this.chart1Data.push(res.data[i].timeZb)
						}

						this.chart1 = echarts.init(document.getElementById('chart1'))
						let theFontSize = this.htmlFontSize()
						let me = this
						let option = {
							tooltip: {
								trigger: 'axis',
								axisPointer: { // 坐标轴指示器，坐标轴触发有效
									type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
								},
								formatter:me.utils.tooltipFormatter,
							},
							// grid: {
							// 	left: '0',
							// 	right: '20%',
							// 	bottom: '0',
							// 	width: '100%',
							// 	height: '100%',
							// 	containLabel: true
							// },
							xAxis: [{
								type: 'category',
								name:'(小时)',
								nameLocation: 'end',
								nameGap: this.utils.calSize(4, theFontSize),
								nameTextStyle: {
									color: 'white',
									fontSize: this.utils.calSize(14, theFontSize),
								},
								data: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7以上'],
								axisTick: {
									show: false
								},
								splitLine: {
									show: false
								},
								axisLabel: {
									show: true,
									interval: 0,
									color: 'white',
									fontSize: this.utils.calSize(14, theFontSize),
								},
								axisLine: {
									lineStyle: {
										color: 'rgba(0, 102, 255, 1)',
										width: this.utils.calSize(1, theFontSize),
									}
								}
							}],
							yAxis: [{
								type: 'value',
								splitLine: {
									show: false
								},
								name: '(单位:%)',
								nameLocation: 'end',
								nameGap: this.utils.calSize(16, theFontSize),
								nameTextStyle: {
									color: 'white',
									fontSize: this.utils.calSize(14, theFontSize),
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true,
									color: 'white',
									margin: this.utils.calSize(4, theFontSize),
									fontSize: this.utils.calSize(14, theFontSize),
									formatter: function(value, index) {
										// if (value >= 10000 && value < 10000000) {
										// 	value = value / 10000 + "万";
										// } else if (value >= 10000000) {
										// 	value = value / 10000000 + "千万";
										// }
										value = value
										return value;
									}
								},
								axisLine: {
									lineStyle: {
										color: 'rgba(0, 102, 255, 1)',
										width: this.utils.calSize(1, theFontSize),
									}
								}
							}],
							series: [{
								name: '驻留时长',
								type: 'bar',
								barWidth: this.utils.calSize(9, theFontSize),
								barGap: this.utils.calSize(25, theFontSize),
								itemStyle: {
									color: 'rgba(0, 239, 239, 1)',
								},

								data: me.chart1Data
							}],
							grid: {
								top: this.utils.calSize(45, theFontSize),
								left: this.utils.calSize(30, theFontSize),
								right: this.utils.calSize(42, theFontSize),
								bottom: this.utils.calSize(22, theFontSize),
							}
						}
						this.chart1.setOption(option)
						this.chart1.resize()
					}
				})
			},

			//客流趋势echart
			initChart2(name, id) {
				let me = this
				me.http.getData('/api/toll/selectTollFlowTrend', {
					date: me.date,
					postionID: id,
					positionName: name,
				}).then(res => {
					me.chart2Data = []
					for (let i = 0; i < res.data.length; i++) {
						if (i < 1 || i % 4 == 0) {
							me.chart2Data.push(res.data[i].pep_value)
						}
					}
					me.chart2 = echarts.init(document.getElementById('chart2'))
					let theFontSize = me.htmlFontSize()
					let option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'line' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						// grid: {
						// 	left: '0',
						// 	right: '0',
						// 	bottom: '0',
						// 	width: '100%',
						// 	height: '100%',
						// 	containLabel: true,
						// },
						xAxis: [{
							type: 'category',
							data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00'],
							axisTick: {
								show: false
							},
							name:'(时间)',
							nameLocation: 'end',
							nameGap: this.utils.calSize(4, theFontSize),
							nameTextStyle: {
								color: 'white',
								fontSize: this.utils.calSize(14, theFontSize),
							},
							boundaryGap: false,
							splitLine: {
								show: false
							},
							axisLabel: {
								show: true,
								interval: 0,
								color: 'white',
								fontSize: this.utils.calSize(14, theFontSize),
								rotate:"30",
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(0, 102, 255, 1)',
									width: this.utils.calSize(1, theFontSize),
								}
							},
							// offset:0 4,
						}],
						yAxis: [{
							type: 'value',
							splitLine: {
								show: false
							},
							name: '(单位:人)',
							nameLocation: 'end',
							nameGap: this.utils.calSize(16, theFontSize),
							nameTextStyle: {
								color: 'white',
								fontSize: this.utils.calSize(14, theFontSize),
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								show: true,
								color: 'white',
								margin: this.utils.calSize(4, theFontSize),
								fontSize: this.utils.calSize(14, theFontSize),
								formatter: function(value, index) {
									// if (value >= 10000 && value < 10000000) {
									// 	value = value / 10000 + "万";
									// } else if (value >= 10000000) {
									// 	value = value / 10000000 + "千万";
									// }
									// value = value / 10000
                                    value = value
									return value;
								}
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(0, 102, 255, 1)',
									width: this.utils.calSize(1, theFontSize),
								}
							}
						}],
						series: [{
							name: '',
							type: 'line',
							itemStyle: {
								color: 'rgba(255, 255, 0, 1)',
							},
							lineStyle: {
								color: 'rgba(255, 255, 0, 1)',
								width: this.utils.calSize(2, theFontSize),
							},
							areaStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'rgba(255, 255, 0, 1)' // 0% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(255, 255, 0, 0)' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								}
							},
							smooth: true,
							data: me.chart2Data
						}],
						grid: {
							top: this.utils.calSize(45, theFontSize),
							left: this.utils.calSize(40, theFontSize),
							right: this.utils.calSize(60, theFontSize),
							bottom: this.utils.calSize(32, theFontSize),
						},

					}
					this.chart2.setOption(option)
					this.chart2.resize()
				})
			},
			showVideo(name){
				// alert(name)
				this.videoShow = false
				this.videoActive = false
				this.videoList = []
				for(let i = 0;i< videoCode.length;i++){
					if(name == videoCode[i].type){
						this.videoList.push(videoCode[i])
						this.videoShow = true
					}
				}
			},
			itemClick(item) {
				this.planeButton = false
				clearInterval(this.timer)
				clearInterval(this.timer2)
				this.$store.dispatch('showUAVIframe', false)
				this.weatherShow = false
				if (this.type) {
					// this.roadShow = false;
					this.stationShow = true;
					this.stationName = item.roadName || item.name;
					this.nowShow = true;
					this.showVideo(this.stationName)
					this.$nextTick(this.inits(item.name || ''))
					this.timer2 = setInterval(() => {
						// debugger
					    this.inits(item.name || '')
					}, 1000*10)
					this.moveCenter(this.formatterXy(item.xy))
				} else {
					if(item.type === 0){
						this.weatherShow = true
						this.$store.dispatch('city', item.city)
						// debugger
					}
					this.nowShow = false;
					this.stationShow = false;
					this.moveCenter(this.formatterXy(item.xy))
					this.markerName = item.roadName
					this.showVideo(this.formatterLoad(this.markerName))
					let content = this.markerObj
					// 创建 infoWindow 实例
					this.infoWindow = new AMap.InfoWindow({
						content: content, //传入 dom 对象，或者 html 字符串
						isCustom: true, //使用自定义窗体
					});
					// this.infoWindow.open(this.map, this.map.getCenter());
					this.infoWindow.open(this.map, this.formatterXy(item.xy));
					this.map.setZoom(12)
					if (item.roadName === this.planeRoad1) {
						this.ifOnline(this.uuid3) //判断无人机是否在线
						this.activeId = '33'
					} else if (item.roadName === this.planeRoad2) {
						this.ifOnline(this.uuid4)
						this.activeId = '44'
					} else if (item.roadName === this.planeRoad3) {
						this.ifOnline(this.uuid5)
						this.activeId = '162'
					}else if (item.roadName === this.planeRoad4) {
						this.ifOnline(this.uuid6)
						this.activeId = '168'
					}else if (item.roadName === this.planeRoad5) {
						this.ifOnline(this.uuid7)
						this.activeId = '169'
					}else if (item.roadName === this.planeRoad6) {
						this.ifOnline(this.uuid8)
						this.activeId = '170'
					}else if (item.roadName === this.planeRoad7) {
						this.ifOnline(this.uuid9)
						this.activeId = '171'
					}else {

					}
				}
			},
			//获取当前路段无人机是否在线
			ifOnline(str) {
				this.id = str
				this.planeButton = true
				this.ifPlane = false
				this.http.getData('/api/flisionUAV/isOnline/' + str, {
				}).then(res => {
					if (res.code == 200) {
						if (res.data.isOnline) {
							this.ifPlane = true
							this.streamName = res.data.streamName
							// debugger
							let playUrl = `/api/flisionUAV/play/${this.streamName}`
							this.getUAVPos()
							this.getUAVUrl(playUrl)
						}
					} else {
						// alert(res.msg)
					}
				})
			},
			// 无人机最新位置接口
			getUAVPos() {
				// debugger
				const url = '/api/flisionUAV/droneInfo/list'
				const data = {
					serialNumber: this.streamName.split('_')[0]
				}
				this.http.getData(url, data).then((res) => {
					console.log(res.data.data[0])
					this.UAVData = res.data.data // 倒序 保存无人机数据 倒序后最后一个点是最新的
					// if (this.isShowUAV) { // 如果是显示无人机状态 就画线
					//     this.drawUAVLine()
					// }
					// this.drawUAVLine()
				})
			},
			getUAVUrl(url) {
				this.http.getData(url, {}).then((res) => {
					// this.playUrl = res.data
					this.$store.dispatch('playUrl', res.data)
				})
			},
			// // 回去原来的地点
			// backPos () {
			//     if (this.id === 1) {
			//         this.theMap.setZoomAndCenter(11, [113.74747, 22.234744])
			//     }
			//     if (this.id === 2) { // 110.231124
			//         this.theMap.setZoomAndCenter(15, [110.231124, 20.268827])
			//     }
			// },

			//重复操作
			async repeatFly(){
				await this.repeatPosition()
				this.repeatLine()
			},

			//重复画线
			async repeatLine(){
				this.drawUAVLine()
			},
			//重复获取位置
			async repeatPosition(){
				this.getUAVPos()
			},
			// 无人机画线
			drawUAVLine() {
				// debugger
				this.clearUAV()
				let me = this
				var path = [];
// 				for (const uavDatum of this.UAVData) {
// 					path.push([uavDatum.longitude, uavDatum.latitude])
// 				}

				let len = 200
				for (let i = 0; i < len; i++) {
				    let uavDatum = this.UAVData[i];
					if(uavDatum.uid == this.activeId){
						path.push([uavDatum.longitude, uavDatum.latitude])
					}
				}
				// console.log('path=' + path[0])
				let arr = [];
				AMap.convertFrom(path, 'gps', function (status, result) {
				  if (result.info === 'ok') {
				    arr = result.locations; // Array.<LngLat>
					var polyline = new AMap.Polyline({
						path: arr,
						isOutline: true,
						outlineColor: '#ffeeff',
						borderWeight: 1,
						strokeColor: "3fff59",
						strokeOpacity: 1,
						strokeWeight: 4,
						// 折线样式还支持 'dashed'
						strokeStyle: "dashed",
						// strokeStyle是dashed时有效
						// strokeDasharray: [10,2,10], // 点 线 点
						strokeDasharray: [18, 10], // 点 线 点
						lineJoin: 'round',
						lineCap: 'round',
						zIndex: 50,
					})
					window.line = polyline
					var pointArr = arr[0]
					// console.log('arr==' + pointArr)
					var marker = new AMap.Marker({ // 无人机marker
						position: new AMap.LngLat(pointArr['lng'], pointArr['lat']),
						offset: new AMap.Pixel(-41.5, -24),
						icon: me.UAVLogo, // 添加 Icon 图标 URL
						title: ''
					});
					// 绑定事件
					marker.on('click', () => { // 点击显示视频
						// debugger
					});
					me.UAVMarker.push(marker)
					me.UAVPolyline.push(polyline)
					// debugger
					me.map.add(marker)
					polyline.setMap(me.map)
					// 缩放地图到合适的视野级别
					me.map.setFitView([marker])
				  }
				});


				// debugger

			},
			// 清除无人机的marker和线
			clearUAV() {
				if (this.UAVMarker.length) {
					this.map.remove(this.UAVMarker)
				}
				if (this.UAVPolyline.length) {
					this.map.remove(this.UAVPolyline)
				}
			},

			//后台返回的字符串坐标转为number
			formatterXy(xy) {
				let arr = xy.split(",")
				let arr2 = []
				for (let i = 0; i < arr.length; i++) {
					arr2.push(arr[i] - 0)
				}
				return arr2
			},
			changetype(num) {
				this.type = num
			},
			changeShow1() {
				this.show1 = !this.show1
			},
			changeShow2() {
				this.show2 = !this.show2
			},
			//构建地图 center:中心点坐标
			initMap(center) {
				this.map = new AMap.Map('container', {
					zoom: 8, //级别
					// zooms: [10, 38],
					center: center, //中心点坐标
					// viewMode: '3D' //使用3D视图
					// scrollWheel:true,

				});
				// 构造官方卫星、路网,实时交通图层
				this.layer1 = new AMap.TileLayer.Satellite();
				var layer2 = new AMap.TileLayer.RoadNet();
				var layer3 = new AMap.TileLayer.Traffic({
					autoRefresh: true, //自动刷新
					interval: 300, //刷新间隔（默认180s）
				});
				var layers = [
					this.layer1,
					// layer2,
					layer3
				]
				// 添加到地图上
				this.map.add(layers);
				for (var i = 0; i < this.stationList.length; i++) {
					this.drawStations(this.stationList[i])
				}
				window.theMap = this.map

				// var gps = [113.309994, 22.867207];
				// AMap.convertFrom(gps, 'baidu', function (status, result) {
				//   if (result.info === 'ok') {
				//     alert(result.locations); // Array.<LngLat>
				//   }
				// });
			},
			//移动地图中心点
			moveCenter(center) {
				this.map.setCenter(center)
			},
		},

		components: {
			rightHeader,
			Title,
			Reason,
			Table,
			Myframe,
			Marker2,
			iframeBox,
			mapSWBtn,
			weatherBox2
		}
	}
</script>

<style lang='scss' scoped>
	.weather{
		position: absolute;
		top: 160px;
		left: 60px;
		width: 938px;
		height: 76px;
	}
	.videoActive{
		color: black !important;
		background-image: url(assets/lcdk.png) !important;
	}
	.activeColor{
		background-color: rgba(7, 130, 255, 1) !important;
	}
	.activeNote {
		background-image: url(../bxdx/assets/bxdj.png) !important;
	}
	.actborder{
		border: 1px solid rgba(0, 255, 255, 1);
		color: rgba(0, 255, 255, 1) !important;
	}
	.activeMap {
		background-image: url(./assets/卫星-选中@2x.png) !important;
	}

	.chooseImg {
		background-color: rgba(19, 91, 171, 0.9);
		border: 0;

		.el-dropdown-menu__item {
			color: white;
		}

		.el-popper .el-popper[x-placement^=bottom] .popper__arrow {
			border-bottom-color: rgba(19, 91, 171, 0.9) !important;
		}

		.el-dropdown-menu__item:focus,
		.el-dropdown-menu__item:not(.is-disabled):hover {
			background-color: rgba(19, 91, 171, 0.9);
		}

	}

	.bgcolor {
		background-color: rgba(19, 91, 171, 0.9);
	}

	.left {
		margin-left: 248px;
	}

	/* 地图绘制按钮样式,可以改 */
	.drawSomething {
		position: absolute;
		top: 108px;
		left: 810px;
		width: 184px;
		height: 72px;
		background-image: url(./assets/外框@2x.png);
		color: white;
		z-index: 100;

		>div:first-child {
			width: 50%;
			position: relative;

			>div:first-child {
				position: absolute;
				width: 57px;
				height: 57px;
				background-image: url(./assets/卫星-默认@2x.png);
				top: -2px;
				left: 18px;
			}

			>div:nth-child(2) {
				margin-top: 45px;
				margin-left: 16px;
			}

		}

		>div:nth-child(3) {
			width: 50%;

			>div:first-child {
				position: absolute;
				width: 63px;
				height: 53px;
				background-image: url(./assets/短信-默认@2x.png);
				top: -2px;
				right: 16px;
			}

			>div:nth-child(2) {
				margin-top: 45px;
				margin-left: 11px;
			}

		}

		.bxline {
			height: 44px;
			width: 1px;
			margin-top: 14px;
			background-image: url(./assets/虚线@2x.png);
		}
	}

	.bxnew{
		position: absolute;
		width: 130px;
		height: 40px;
		line-height: 40px;
		top: 111px;
		left: 846px;
		>div{
			width: 50%;
			height: 100%;
			text-align: center;
			background-color: rgba(19, 91, 171, 0.9);
			cursor: pointer;
		}
	}

	.bxButton{
		width:109px;
		height:40px;
		background:rgba(26,73,155,1);
		/* border:1px solid rgba(0, 255, 255, 1); */
		position: absolute;
		top: 111px;
		left: 730px;
		padding-top: 11px;
		color:white;
		>div:first-child {
			width: 17px;
			height: 17px;
			background-image: url(../bxdx/assets/bxmr.png);
			margin-left: 11px;
			margin-right: 6px;
			border: 0;
		}

		>div:nth-child(2) {
			font-size: 16px;
		}
	}

	.lwjk {
		background-color: rgba(7, 44, 81, 1);
		width: 1920px;
		height: 1080px;
		position: relative;

		#openframe {
			width: 1920px;
			height: 1080px;
			position: fixed;
			/* pointer-events: none; */
			top: 0;
			left: 0;
			z-index: 111;
		}

		.jkbody {
			position: absolute;
			top: 86px;
		/* 	background-image: url(assets/7c71450fab1d06fb5ae69878069958b.png); */
			width: 1920px;
			height: 994px;
			z-index: 10;
			pointer-events: none;
		}

		#container {
			position: absolute;
			top: 103px;
			left: 24px;
			/* background-color: red; */
			width: 982px;
			height: 945px;
		}
		.video{
			width: 140px;
			height: 45px;
			line-height: 45px;
			background-image: url(assets/lcdk2.png);
			position: absolute;
			top: 400px;
			left: 60px;
			white-space: nowrap;
			>div:first-child{
				width: 18px;
				height: 22px;
				background-image: url(./assets/jk2.png);
				margin-top: 11px;
				margin-right: 9px;
			}
		}
		.videoLine{
			width: 27px;
			height: 7px;
			background-image: url('./assets/xian.png');
			position: absolute;
			top: 414px;
			left: 198px;
		}
		.videolist{

			.cam-box-inner {
			    width:212px;
			    height:154px;
			    background:rgba(12,48,129,0.8);
			    border:1px solid #00C0FF;
			    font-size:16px;
			    /*font-family:Microsoft YaHei;*/
			    font-weight:400;
			    color:rgba(255,255,255,1);
			    /*line-height:60px;*/
			    position: absolute;
				top: 337px;
				left: 225px;
			    overflow-y: auto;
			    li {
			        width: 100%;
			        height: 50px;
			        padding-left: 20px;
			        padding-right: 20px;
			        display: flex;
			       /* justify-content: space-between; */
			        align-items: center;
			    }
			    li.active {
			        color: #000C2D;

			    }
			    li:hover {
			        background-color: #009CFF;
			        color: #000C2D;

			    }
			    i {
			        min-width: 16px;
			        height: 20px;
			        margin-right: 9px;
			        background-image: url('./assets/球机@2x.png');
			    }
			}
		}
		.plane {
			width: 178px;
			height: 66px;
			background-image: url(assets/feijibg.png);
			position: absolute;
			top: 161px;
			left: 800px;

			.planeImg {
				width: 118px;
				height: 44px;
				background-image: url(assets/weidianwurenji.png);
				margin: 0 auto;
				margin-top: 11px;
			}

			.planeImg2 {
				width: 118px;
				height: 44px;
				background-image: url(assets/wurenji.png);
				margin: 0 auto;
			}
		}

		.drawIt {
			width: 178px;
			height: 66px;
			line-height: 66px;
			position: absolute;
			top: 200px;
			left: 810px;
			background-color: rgba(19, 91, 171, 0.9);
		}

		.drawOptions {
			width: 680px;
			height: 100px;
			line-height: 100px;
			position: absolute;
			top: 140px;
			left: 100px;
			fontSize: 16px;

			.gd {
				padding-left: 60px;
				margin-top: 10px;
				fontSize: 16px;
			}

			.cityList {
				padding-left: 40px;
				margin-bottom: 10px;
			}

			.line3 {
				width: 100%;
				border-bottom: 1px solid white;
				fontSize: 16px;
			}

			.citys {
				padding-left: 80px;
				flex-wrap: wrap;
				fontSize: 16px;

				>div {
					margin-left: 20px;
					fontSize: 16px;
				}
			}
		}

		.kind {
			width: 160px;
			height: 40px;
			line-height: 40px;
			margin-left: 40px;
			background-color: rgba(19, 91, 171, 0.9);

			.el-dropdown {
				margin: 0 10px;
				color: white;
			}
		}

		.start {
			width: 160px;
			height: 40px;
			line-height: 40px;
			margin-left: 20px;
			color: white;
			text-align: center;
			background-color: rgba(19, 91, 171, 0.9);
		}

		.finish {
			width: 160px;
			height: 40px;
			line-height: 40px;
			margin-left: 20px;
			color: white;
			text-align: center;
			background-color: rgba(19, 91, 171, 0.9);
		}

		.roads {
			position: absolute;
			top: 111px;
			left: 60px;

			.stations {
				width: 228px;
				height: 40px;
				background-image: url(assets/fanhuibg.png);
				justify-content: flex-end;

				>div:first-child {
					margin-top: 13px;
				}

				>div:nth-child(2) {
					width: 1px;
					height: 21px;
					background: rgba(247, 250, 252, 1);
					margin: 10px 8px;
				}

				>div:nth-child(3) {
					width: 19px;
					height: 15px;
					background-image: url(assets/fanhui.png);
					margin-top: 12px;
					margin-right: 8px;
				}
			}

			.road {
				>div:first-child {
					margin-right: 20px;
				}

				>div:nth-child(2) {
					width: 118px;
					height: 40px;
					line-height: 40px;
					background-color: rgba(19, 91, 171, 0.9);

					>div:first-child {
						margin-left: 17px;
						margin-right: 12px;
					}

					>div:nth-child(2) {
						width: 12px;
						height: 6px;
						margin-top: 17px;
						background-image: url(./assets/xiala.png);
					}
				}

				>div:nth-child(3) {
					width: 233px;
					height: 40px;
					margin-left: 8px;
					margin-right: 4px;
					position: relative;
					background-color: rgba(19, 91, 171, 0.9);

					>input {
						background-color: rgba(0, 0, 0, 0);
						outline: 0;
						border: 0;
						color: white;
						width: 200px;
						height: 18px;
						margin-top: 10px;
						margin-left: 10px;
					}

					.suggestion {
						position: absolute;
						top: 40px;
						left: 0;
						width: 100%;

						>div {
							width: 100%;
							height: 32px;
							line-height: 32px;
							background-color: rgba(19, 89, 155, 0.9);
							padding-left: 10px;
							z-index: 103;
						}
					}
				}

				>div:nth-child(4) {
					width: 65px;
					height: 40px;
					background-image: url(assets/sousuobg.png);

					>div {
						width: 20px;
						height: 20px;
						margin-top: 10px;
						margin-left: 14px;
						background-image: url(assets/sousuo.png);
					}
				}
			}

			.roadContent {
				width: 308px;
				height: 153px;
				background-color: rgba(22, 65, 112, 0.9);
				margin-top: 3px;
				color: rgba(236, 236, 236, 1);

				>div:first-child {
					>div:first-child {
						width: 17px;
						height: 13px;
						background-image: url(assets/gaosu.png);
						margin-left: 8px;
						margin-right: 6px;
						margin-top: 7px;
					}

					>div:nth-child(2) {
						padding-top: 6px;
					}

					>div:nth-child(3) {
						width: 1px;
						height: 17px;
						background: rgba(255, 255, 255, 0.33);
						margin-top: 5px;
						margin-left: 15px;
						margin-right: 11px;
					}

					>div:nth-child(4) {
						width: 17px;
						height: 16px;
						background-image: url(assets/shoufei.png);
						margin-right: 5px;
						margin-top: 5px;
					}

					>div:nth-child(5) {
						margin-top: 6px;
					}
				}

				.line {
					margin-top: 6px;
					width: 249px;
					height: 2px;
					background-image: linear-gradient(to right, rgba(6, 136, 201, 1), rgba(6, 136, 201, 0));
				}

				>div:nth-child(3) {
					height: 124px;
					overflow-y: scroll;
					width: 100%;
					padding-top: 2px;

					.contentItem {
						height: 28px;
						line-height: 28px;
						padding-left: 10px;
						position: relative;

						.itemPlane {
							position: absolute;
							width: 52px;
							height: 20px;
							background-image: url(assets/wurenji.png);
							top: 50%;
							right: 13px;
							transform: translateY(-50%);
						}
						.videoImg{
							position: absolute;
							width: 18px;
							height: 22px;
							background-image: url(assets/shexiangtou.png);
							top: 50%;
							right: 30px;
							transform: translateY(-50%);
						}
					}

					.contentItem:hover {
						background-color: rgba(19, 89, 155, 0.9);
					}
				}
			}
		}

		.now {
			position: absolute;
			width: 892px;
			height: 310px;
			bottom: 32px;
			left: 80px;
			background-image: url(assets/ditushuju.png);
			padding-top: 23px;
			padding-bottom: 27px;

			>div:first-child {
				width: 205px;
				height: 100%;

				>div:first-child {
					margin-left: 28px;
				}

				>div:nth-child(2) {
					width: 142px;
					height: 115px;
					background-image: url(assets/keliuicon.png);
					margin-top: 42px;
					margin-left: 36px;
				}

				>div:nth-child(3) {
					width: 150px;
					height: 64px;
					line-height: 64px;
					margin-left: 32px;
					margin-top: 19px;
					background-image: url(assets/renshubg.png);

					>span:first-child {
						font-size: 26px;
						color: rgba(0, 255, 255, 1);
						font-weight: bold;
					}
				}
			}

			>div:nth-child(2) {
				flex: 1;
				width: 376px;
				height: 100%;
				border-left: 1px dashed rgba(72, 184, 255, 0.52);
				border-right: 1px dashed rgba(72, 184, 255, 0.52);

				>div:first-child {
					margin-left: 26px;
				}

				>div:nth-child(2) {
					margin-left: 26px;
					margin-right: 26px;
					height: 226px;
				}
			}

			>div:nth-child(3) {
				width: 307px;
				height: 100%;
				padding-left: 18px;

				>div:nth-child(2) {
					margin-right: 26px;
					height: 226px;
				}
			}
		}

		.forms {
			position: absolute;
			top: 102px;
			right: 66px;
			padding: 12px 0;

			>div {
				width: 830px;
				height: 345px;
				background-image: url(assets/bg.png);

				.eventLine {
					flex-grow: 1;
					height: 9px;
					/* background-image: url(assets/jindu.png); */
					background-color: rgba(3, 90, 130, 1);
					margin-top: 11px;
					position: relative;

					.eventLine2 {
						position: absolute;
						left: 0;
						top: 0;
						height: 100%;
						width: 50%;
						background-image: url(assets/jindutiao.png);
					}
				}

			}

			>div:first-child {
				height: 208px;
				margin-bottom: 12px;

				>div:nth-child(2) {
					margin-top: 8px;
					padding-left: 26px;
					line-height: 36px;

					>div:nth-child(1) {
						margin-right: 16px;
					}

					>div:nth-child(3) {
						margin-left: 10px;
						margin-right: 30px;
					}
				}

				>div:nth-child(3) {
					padding-right: 22px;
					padding-left: 28px;

					.reasonList {
						width: 124px;
					}
				}
			}

			>div:nth-child(2) {
				margin-bottom: 14px;
				height: 345.6px;
			}

			.tableDiv {
				padding: 0 6px;
				height: 296px;
			}
		}
	}
</style>
