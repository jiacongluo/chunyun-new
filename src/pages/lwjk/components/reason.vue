<template>
	<div class="reason" :style="'color:'+ this.color +';'">
		<div class="reasonTop bgi" :style="'background-image: url('+ this.bg +');'">
			<div class="topContent flex">
				<div class="bgi" :style="'background-image: url('+ this.img +');'"></div>
				<div class="fs_16 color-white">{{reasonName}}</div>
			</div>
		</div>
		<div class="percent" :id="'percent'+ rstype" ref="percent">
			<div class="percenLine bgi" :style="'background-image:url(' + this.lineImg +');'">
				<div class="fs_14 personNum">{{num}}起</div>
			</div>
			<div class="chart">
				<el-progress stroke-linecap="round" :stroke-width="lineWidth" type="dashboard" :percentage="percentage" :color="colorq">
	
				</el-progress>
				<div class="lines">
					
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	// import echarts from 'echarts'
	export default {
		props: {
			num:{
				type:Number,
				default:'',
			},
			rstype: {
				type: Number,
				default: 0,
			},
			reasonName: {
				type: String,
				default: '',
			},
			percentage: {
				type: Number,
				default: 0,
			},
			colorq: {
				type: String,
				default: '',
			},
			lineWidth:{
				type: Number,
				default: 0,
			}
		},
		data(){
			return{
				color:'',
				bg:'',
				img:'',
				lineImg: '', //左边线的颜色
			}
		},
		created() {
			switch (this.rstype) {
				case 1:
					this.color = 'rgba(255, 255, 0, 1)'
					this.bg = require('../assets/bg@2x.png')
					this.img = require('../assets/11交通事故@2x.png')
					this.lineImg = require('../assets/huang.png')
					break;
				case 2:
					this.color = 'rgba(255, 255, 0, 1)'
					this.bg = require('../assets/bg@2x.png')
					this.img = require('../assets/tq.png')
					this.lineImg = require('../assets/huang.png')
					break;
				case 3:
					this.color = 'rgba(255, 255, 0, 1)'
					this.bg = require('../assets/bg@2x.png')
					this.img = require('../assets/sz.png')
					this.lineImg = require('../assets/huang.png')
					break;
				case 4:
					this.color = 'rgba(255, 255, 0, 1)'
					this.bg = require('../assets/bg@2x.png')
					this.img = require('../assets/wxgl.png')
					this.lineImg = require('../assets/huang.png')
					break;
				case 5:
					this.color = 'rgba(255, 255, 0, 1)'
					this.bg = require('../assets/bg@2x.png')
					this.img = require('../assets/qt.png')
					this.lineImg = require('../assets/huang.png')
					break;
				default:
					break;
			}

		},
		mounted() {
		
		},
		data() {
			return {
				color: '',
				bg: '', //背景色
				img: '', //图片
				colorList:['rgba(255, 255, 0, 1)','rgba(0, 255, 255, 1)','rgba(255, 219, 49, 1)','rgba(92, 255, 123, 1)','rgba(240, 240, 240, 1)'],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped="scoped">
	.reason {
		width: 100%;
		height: 100%;
		
		.reasonTop {
			width: 108px;
			height: 39px;
			margin: 0 auto;
			position: relative;

			.topContent {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				>div:nth-child(1) {
					width: 30px;
					height: 30px;
					margin-right: 6px;
				}

				>div:nth-child(2) {
					width: 32px;
					margin-top: 7px;
				}
			}
		}

		.percent {
			width: 124px;
			height: 57px;
			position:relative;
			.percenLine{
				width: 38px;
				height: 10px;
				position: absolute;
				top: 28px;
				left: -10px;
			}
			.chart{
				width: 67px;
				height: 57px;
				margin: 0 auto;
				position:relative;
				.lines{
					
				}	
			}
			.personNum{
				margin-top: -20px;
				white-space:nowrap;
			}
		}
	}
</style>
