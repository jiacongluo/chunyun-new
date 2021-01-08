<template>
	<div class="bxdxBox">

		<div class="bxdx bgi" :class="{'bg':!currentType}" v-loading="loading" element-loading-text="正在上传,请稍候" element-loading-background="rgba(0, 0, 0, 0.8)">
			<div class="closeIcon bgi csp" @click="this.closeWindow">

			</div>
			<!-- 正常发送 -->
			<div class="sendType1 color-white csp" :class="{'choosed': !currentType}" @click="currentType = 0">正常发送</div>

			<!-- 测试发送 -->
			<div class="sendType2 color-white csp" :class="{'choosed': currentType}" @click="currentType = 1">测试发送</div>
			<div class="color-white flex">
				<div class="bgi sendImg"></div>
				<div class="fs_20" :ifYellow="true">靶向短信发送</div>
			</div>
			<div class="line"></div>
			<!-- 定位的按钮 -->
			<div>
				<div class="fr history" @click="dialogTableVisible = true">
					<Button :text="'历史发送记录'" :shadowUrl="require('./assets/lishijilu.png')" :ifYellow="true"></Button>
				</div>
				<el-dialog :visible.sync="dialogTableVisible">

					<div class="popHistory bgi">
						<div class="flex jsb historyTitle">
							<div class="flex">
								<div class="bgi lsicon"></div>
								<div class="fs_20 color-white">历史发送记录</div>
							</div>
							<div class="close bgi csp" @click="dialogTableVisible = false"></div>
						</div>
						<div class="buttonList flex jsa">
							<div class="sendNote bgi tac fs_20">
								累计短信发送量：{{time}}条
							</div>
							<div class="sendNote bgi tac fs_20">
								累计短信任务数：{{amount}}次
							</div>
						</div>
						<div class="cutLine">
							<div class="cutLine2"></div>
						</div>
						<div class="buttons">
							<el-form :inline="true" :model="formInline" class="demo-form-inline color-white">
								<el-form-item class="lh51" label="活动名称">
									<el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
								</el-form-item>
								<el-form-item class="lh51" label="状态">
									<!-- 定位的倒三角 -->
									<div class="bgi seletImg"></div>
									<el-select v-model="formInline.state">
										<el-option v-for="(item,i) in stateList" :label="item" :value="i"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<div class="search" @click="search">
										<Button :text="'查询'" :shadowUrl="require('./assets/chaxun.png')"></Button>
									</div>
								</el-form-item>
							</el-form>
						</div>
						<div class="table">
							<el-table header-align="center" ref="myTable" :height="tableHeight" :data="tableData" stripe>
								<el-table-column align="center" type="index" min-width='9%' :index="indexMethod" label="序号">
								</el-table-column>
								<el-table-column prop="taskName" min-width='10.5%' label="活动名称">
								</el-table-column>
								<el-table-column prop="content" min-width='17.5%' :show-overflow-tooltip="true" label="短信内容">
								</el-table-column>
								<!-- <el-table-column min-width='9.5%' label="黑/白名单">
										<template slot-scope="scope">
											{{scope.row.blackCount}} / {{scope.row.whiteCount}}
										</template>
									</el-table-column> -->
								<el-table-column prop="areaName" min-width='10.5%' label="发送区域">
								</el-table-column>
								<el-table-column prop="succeedCount" min-width='9.5%' label="成功数">
								</el-table-column>
								<el-table-column prop="failedCount" min-width='9.5%' label="失败数">
								</el-table-column>
								<el-table-column prop="startTime" min-width='16%' label="创建时间">
								</el-table-column>
								<el-table-column prop="statusx" :formatter="format2" min-width='10%' label="状态">stateList
									<!-- <template slot-scope="scope">
									<span v-text="getStatu(scope.$index)"></span>
								</template> -->
								</el-table-column>
							</el-table>
						</div>

					</div>
				</el-dialog>
			</div>
			<!-- end -->
			<div class="color-blue fs_16">活动名称</div>
			<div><input v-model="name" maxlength="40" class="border-blue nameInput fs_16 color-white" type="text"></div>
			<div class="flex jsb">
				<div class="color-blue fs_16">短信内容</div>
				<div class="contentRight fs_16">
					<div class="flex jsb">
						<div class="flex csp" @click="changeAct">
							<div class="optionImg bgi" :class="active?'bgactive':''"></div>
							<div>自定义内容</div>
						</div>
						<el-dropdown trigger="click" @command="handleCommand">
							<div class="flex el-dropdown-link csp">
								<div class="modelWord fs_16">使用短信模板</div>
								<div class="bgi modelImg"></div>
							</div>
							<el-dropdown-menu slot="dropdown">
								<div v-for="(item,i) in nameList" :key="i">
									<el-dropdown-item :command="item">{{item.taskName}}</el-dropdown-item>
								</div>
							</el-dropdown-menu>
						</el-dropdown>
						<div class="saveDiv flex csp">
							<div class="bgi saveImg"></div>
							<div class="save fr" @click="saveModel">
								存至模板
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<textarea v-model="content" :readonly="!this.active" class="border-blue color-white fs_16 content" name="" id=""
				 cols="30" rows="10">

			</textarea>
			</div>
			<div class="color-white lists fs_18">
				{{!currentType?'地图圈选':'测试名单'}}
				<span class="fs_14" v-if="currentType">(提示：测试名单仅用于测试发送，号码数量不能超过20个)</span>
			</div>
			<div class="flex jsb coloList" v-show="!this.currentType">
				<!-- <div>
					<Roster @showLoad="showLoading()" @hideLoad="hideLoading()" ref='roster' :name="'白名单'" :num="0"></Roster>
				</div>
				<div>
					<Roster @showLoad="showLoading()" @hideLoad="hideLoading()" ref='roster2' :name="'黑名单'" :num="1"></Roster>
				</div> -->
				<div class="flex">
					<div class="kind tac csp flex jsc color-white fs_16" @click="ifDrop = !ifDrop">
						<div class="bgi" :style="'background-image: url('+ imgsArr[this.chooseType] +');'"></div>
						<div>{{chooseWord[chooseType]}}</div>
						<div class="bgi" :class="ifDrop?'drop':'up'"></div>

						<!-- 下拉选项 -->

						<div class="dropOption" v-show="ifDrop">
							<div class="csp flex jsc" v-for="(item,i) in 3" :key="i" @click="chooseType=i+1">
								<div class="bgi" :style="'background-image: url('+ imgsArr[i+1] +');'"></div>
								<div>{{chooseWord[i+1]}}</div>
							</div>
						</div>
					</div>

					<!-- 所属行政区 -->
					<div class="district csp color-white flex fs_16" @click="ifDrop2 = !ifDrop2">
						<div>{{chooseCity || '所属行政政区'}}</div>
						<div class="bgi" :class="ifDrop2?'drop':'up'"></div>

						<!-- 下拉选项 -->

						<div class="dropOption" v-show="ifDrop2">
							<div class="csp flex jsc" v-for="(item,i) in cityList" :key="i" @click="chooseCity= item">
								{{item}}
							</div>
						</div>
					</div>
					
					<div class="maxNum">
						<input type="text" placeholder="输入短信最大发送数量" v-model="max">
					</div>
					
					<div class="maxLine">
						
					</div>
					<!-- 开始圈选 -->

					<div class="startChoose csp" @click="startChoose">
						开始圈选
					</div>

					<!-- 清除圈选 -->

					<div class="clearChoose csp" @click="clearDraw">
						清除圈选
					</div>
				</div>
			</div>
			<div class="selfList" v-show="this.currentType">
				<Roster :ifTest="true" @showLoad="showLoading()" @hideLoad="hideLoading()" ref='roster3' :name="'测试名单'" :num="2"></Roster>
			</div>
			<div class="flex jsc bottom">
				<div class="reset" @click="reset">
					<Button :text="'重置'" :shadowUrl="require('./assets/tijiao.png')"></Button>
				</div>
				<div>
					<div class="submit" @click="submitIt">
						<Button :text="'提交'" :ifYellow="true" :shadowUrl="!this.currentType?require('./assets/tijiao.png'):require('./assets/weixuanzhong.png')"
						 @click="totalUpload"></Button>
					</div>
				</div>
				<!-- <div class="reset" @click="test">
					<Button :text="'测试发送'" :shadowUrl="this.currentType?require('./assets/tijiao.png'):require('./assets/weixuanzhong.png')"></Button>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Upload,
	} from 'element-ui'
	import Roster from './components/roster.vue'
	import Button from '../../components/button.vue'
	import cityCode from '@/utils/cityCode.js'
	export default {
		components: {
			Roster,
			Upload,
			Button,
		},
		data() {
			return {
				max:'', //短信发送最大数量
				info: [],
				chooseCity: '',
				cityList: [], //城市列表
				ifDrop: false, //选框类型是否下拉
				ifDrop2: false, //选框类型是否下拉
				chooseType: 0, //选择要画的形状
				imgsArr: [
					require('./assets/xuankuang.png'),
					require('./assets/yuan.png'),
					require('./assets/juxing2.png'),
					require('./assets/duobian.png'),
				],
				chooseWord: [
					'选框类型',
					'圆形',
					'矩形',
					'多边形',
				], //选择类型的文字
				obj: [], //传给后台的数组
				tableHeight: 250, //table高度
				//当前选择的类型（0正式还是1测试）
				currentType: 0,
				//加载中弹出层
				loading: false,
				stateList: ['全部', '初始化', '审批中', '跑数中', '发送中', '发送成功', '发送失败'], //状态列表
				tableData: [], //表格数据列表
				totalList: [],
				name: '',
				active: true,
				dialogTableVisible: false,
				amount: 0, //短信发送量
				time: 0, //短信发送次数
				nameList: [], //短信模板名称
				formInline: {
					name: '',
					state: 0,
				},
				content: '', //短信内容
			}
		},
		created() {
		    document.body.style.backgroundColor='rgba(0,0,0,0)';
			let me = this
			window.addEventListener('message', function(event) {
				if (event.data.drawInfo) {
					// debugger
					// this.info = event.data.drawInfo.map(o => ({...o}));
					me.info = JSON.parse(JSON.stringify(event.data.drawInfo))
				} else {
					// console.log('datasss',event.data)
				}
			});
			this.getTemplate()
			this.search()
			for (let i in cityCode) {
				this.cityList.push(cityCode[i])
			}
		},
		mounted() {
			let me = this;
			// debugger;
			// top.postMessage("ready")
		},
		watch: {
			dialogTableVisible(n, o) {
				if (n) {
					this.$nextTick(function(){
						this.sendRequest(0)
						this.$refs.myTable.doLayout()
					})
					
				}
			},
			// obj(n, o) {
			// 	if (n) {
			// 		console.log(n)
			// 		// debugger
			// 	}
			// }
		},
		methods: {
			//mixing
			htmlFontSize() {
				let theHTML = document.getElementsByTagName('html')[0]
				let theFS = theHTML.style.fontSize
				theFS = theFS.replace('px', '');
				return theFS
			},
			clearDraw() {
				this.info = []
				top.postMessage("clean")
			},
			startChoose() {
				if (!this.chooseType) {
					alert('请先选择图形')
					return
				}
				this.clearDraw()
				let me = this
				top.postMessage({
					drawType: me.chooseType,
				})
				// debugger
			},
			closeDrop() {
				let arr = document.getElementsByClassName('el-collapse-item__header')
				for (let i = 0; i < arr.length; i++) {
					arr[i].click()
				}
				// removeAttribute('is-active')
			},
			closeWindow() {
				top.postMessage("close")
				this.clearDraw()
			},
			//获取短信模板数组
			getTemplate() {
				this.http.post('jede/webx/querySmsTaskTemplate.do', {
					taskName: ''
				}).then(res => {
					if (res.retcode === 0) {
						this.nameList = res.body
					} else {
						this.$message.error(res.retmsg)
					}

				})
			},
			//测试发送
			test() {
				// if (!this.currentType) {
				// 	return
				// }
				let formData = new FormData();
				// formData.append("whiteListFile", this.$store.getters.getAll[0].raw)
				// formData.append("blackListFile", this.$store.getters.getAll[1].raw)
				// formData.append("mobileFile", this.$store.getters.getAll[2].raw)
				formData.append("content", this.content)
				formData.append("file", this.$store.getters.getAll[2].raw)
				// debugger
				this.http.post('jede/webx/sendTestSms.do', formData).then(res => {
					if (res.retcode === 0) {
						this.$message({
							type: 'success',
							message: '提交任务成功!',
							duration: 2000,
							onClose:()=>{
								this.clearDraw()
								this.closeWindow()
							}
						});
						this.name = ''
						this.content = ''
						// this.$refs.roster.fileName = '';
						// this.$refs.roster2.fileName = '';
						this.$refs.roster3.fileName = '';
						// this.$store.commit('delectAll')
						
					} else {
						this.$message.error(res.retmsg)
					}
				})
			},
			//更换激活状态
			changeCurrent(i) {
				this.currentType = i
			},
			//重置
			reset() {
				this.name = ''
				this.content = ''
				// this.$refs.roster.fileName = '';
				// this.$refs.roster2.fileName = '';
				this.$refs.roster3.fileName = '';
			},
			//显示加载中
			showLoading() {
				this.loading = true
			},
			//隐藏加载中
			hideLoading() {
				this.loading = false
			},
			//格式化短信内容
			format(row, column) {
				return this.limitLength(row.content, 10)
			},
			//超出字数显示...
			limitLength(txt, num) {
				let str = txt;
				str = str.substr(0, num) + '...';
				return str
			},
			// 把状态码转成文字
			format2(row, column) {
				//后台状态与前端保存不一致，需要+1处理
				return this.stateList[row.statusx - 0 + 1]
			},
			indexMethod(index) {
				return index + 1;
			},
			//查询
			search() {
				if (this.formInline.state) {
					this.sendRequest(this.formInline.state)
				} else {
					this.sendRequest(0)
				}

			},
			//发请求查询
			sendRequest(state) {
				if (state) {
					this.http.post('jede/webx/querySmsTaskStatus.do', {
						taskName: this.formInline.name,
						statusx: state - 1,
					}).then(res => {
						if (res.retcode === 0) {
							if (this.$refs.myTable) {
								this.$refs.myTable.bodyWrapper.scrollTop = 0;
							}
							this.tableData = res.body.detail
							this.amount = res.body.statis.taskCount
							this.time = res.body.statis.mobileCount
						} else {
							this.$message.error(res.retmsg)
						}
					})
				} else {
					this.http.post('jede/webx/querySmsTaskStatus.do', {
						taskName: this.formInline.name,
					}).then(res => {
						if (res.retcode === 0) {
							if (this.$refs.myTable) {
								this.$refs.myTable.bodyWrapper.scrollTop = 0;
							}
							this.tableData = res.body.detail
							this.amount = res.body.statis.taskCount
							this.time = res.body.statis.mobileCount
						} else {
							this.$message.error(res.retmsg)
						}
					})
				}

			},
			//弹出确认对话框
			open() {
				// debugger
				this.$confirm('已存在同名模板，此操作将覆盖同名模板, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.saveAjax()
				}).catch(() => {
					// MessageBox.$message({
					// 	type: 'info',
					// 	message: '已取消保存'
					// });
				});
			},
			//存模板发的请求
			saveAjax() {
				this.http.post('jede/webx/postSmsTaskTemplate.do', {
					taskName: this.name,
					content: this.content,
				}).then(res => {
					if (res.retcode === 0) {
						this.$message({
							type: 'success',
							message: '保存成功!'
						});
						this.getTemplate()
					} else {
						this.$message.error(res.retmsg)
					}

				})
			},
			//存至模板
			saveModel() {
				for (let i = 0; i < this.nameList.length; i++) {
					// debugger
					if (this.name === this.nameList[i].taskName) {
						this.open()
						return
					}
				}
				this.saveAjax();
			},
			handleCommand(command) {
				// this.name = command;
				// this.http.post('/message/loadSmsTaskTemplate', {
				// 	taskName: command
				// }).then(res => {
				// 	this.content = res.obj.content
				// })
				this.name = command.taskName
				this.content = command.content
			},

			//提交
			submitIt() {
				if (this.currentType) {
					this.test()
					return
				}
				// console.log(this.info)
				if (!this.chooseType || !this.info.length || !this.chooseCity) {
					alert('行政区,圈选区域，圈选形状都不能为空')
					return
				}
				let me = this
				let code
				let type
				let city = this.chooseCity
				let str = ''
				for (let i in cityCode) {
					if (city === cityCode[i]) {
						code = i
					}
				}
				// console.log('gg',me.obj)
				if (me.chooseType == 1) {
					type = 2
					str = me.info[0].center.lng + ',' + me.info[0].center.lat + ';' + me.info[0].radius + ';'
				} else if (me.chooseType == 3) {
					type = 1
					for (var i = 0; i < me.info.length; i++) {
						str += me.info[i].lng + ',' + me.info[i].lat + ';'
					}
				} else if (me.chooseType == 2) {
					type = 3
					for (var i = 0; i < me.info.length; i++) {
						str += me.info[i].lng + ',' + me.info[i].lat + ';'
					}
				}
				// 
				// 
				
				// console.log(str)
				this.http.post('jede/webx/postSmsTaskInfo.do', {
					content: this.content,
					taskName: this.name,
					drawType: type,
					drawPath: str,
					maxCnt:this.max,
					city: code,
					areaName: '自定义区域',
				}).then(res => {
					// debugger
					if (res.retcode === 0) {
						this.$message({
							type: 'success',
							message: '提交任务成功!',
							duration: 2000,
							onClose:()=>{
								this.clearDraw()
								this.closeWindow()	
							}
						});
						this.name = ''
						this.content = ''
						// this.$refs.roster.fileName = '';
						// this.$refs.roster2.fileName = '';
						// this.$refs.roster3.fileName = '';
						this.$store.commit('delectAll')
					} else {
						this.$message.error(res.retmsg)
					}
				})
			},
			//切换自定义内容状态
			changeAct() {
				this.active = !this.active
			},
			totalUpload() {
				this.totalList = []
				this.totalList = this.$store.getters.getAll
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.page-body{
		background-color: rgba(0,0,0,0)!important;
	}
	//底框
	.bg{
		background-image: url(assets/bxdxdk.png) !important;
	}
	//下拉图标
	.drop {
		background-image: url(assets/xiala2.png);
	}

	//上拉图标
	.up {
		background-image: url(assets/shangla.png);
	}

	//激活类型颜色
	.colorActive {
		background: rgba(26, 141, 230, 0.82) !important;
		border: 1px solid rgba(0, 249, 250, 1) !important;
	}

	//未激活类型颜色
	.colorNotActive {
		background: rgba(60, 123, 217, 0.3);
		border: 0;
	}

	.lh51 {
		line-height: 51px;
	}

	.bxdxBox {
		position: absolute;
		width: 1920px;
		height: 1080px;
		top: 0;
		left: 0;
	}

	.bxdx {
		position: relative;
		width: 1042px;
		// height: 595px;
		background-image: url(assets/bxdxdk2.png);
		margin: 0 auto;
		// margin-top: 235px;
		top: 235px;
		padding-left: 81px;
		padding-right: 31px;
		padding-top: 30px;

		.closeIcon {
			background-image: url(./assets/gbmr.png);
			position: absolute;
			top: -8px;
			right: -8px;
			width: 74px;
			height: 68px;
		}

		.sendType1,
		.sendType2 {
			position: absolute;
			left: 28px;
			font-size: 20px;
			width: 1em;
		}

		.sendType1 {
			top: 40px;
		}

		.sendType2 {
			top: 182px;
		}

		.choosed {
			color: rgba(240, 255, 0, 1);
			font-weight: bold;
		}

		.choosed::after {
			content: '';
			display: inline-block;
			width: 22px;
			height: 4px;
			padding-top: -2px;
			background: rgba(255, 102, 0, 1);
		}

		.sendImg {
			width: 25px;
			height: 22px;
			background-image: url(assets/bxicon.png);
			margin-right: 8px;
		}

		.line {
			width: 558px;
			height: 2px;
			background-image: linear-gradient(to right, rgba(17, 98, 140, 1), rgba(17, 98, 140, 0));
			margin-top: 10px;
			margin-bottom: 16px;
		}

		.history {
			position: absolute;
			top: 33px;
			right: 49px;
			width: 140px;
			height: 51px;
		}

		.nameInput {
			padding: 12px 9px;
			margin-top: 8px;
			margin-bottom: 16px;
			width: 100%;
			background-color: rgba(0, 0, 0, 0);
		}

		.contentRight {
			width: 415px;
			color: #43B2FF;

			.optionImg {
				margin-right: 8px;
				width: 14px;
				height: 14px;
				border-radius: 50%;
				border: 1px solid #FFFF00;
				margin-top: 1px;
			}

			.saveImg {
				width: 12px;
				height: 12px;
				background-image: url(assets/jiahao.png);
				margin-top: 2px;
				margin-right: 8px;
			}

			.bgactive {
				background-image: url(assets/jihuo.png);
			}

			.modelWord {
				color: #43B2FF;
			}

			.modelImg {
				width: 8px;
				height: 14px;
				margin-left: 8px;
				background-image: url(assets/updown.png);
				margin-top: 1px;
			}
		}

		.content {
			resize: none;
			width: 100%;
			height: 100px;
			margin-top: 7px;
			padding: 9px;
			margin-bottom: 20px;
			background-color: rgba(0, 0, 0, 0);
		}

		// 		.saveDiv {
		// 			height: 44px;
		// 
		// 			.save {
		// 				width: 140px;
		// 				height: 51px;
		// 				line-height: 51px;
		// 				margin-right: 20px;
		// 			}
		// 		}
		.lists {
			width: 100%;
			height: 45px;
			line-height: 45px;
			background: rgba(0, 102, 204, 1);
			border-radius: 1px;
			padding-left: 9px;
		}

		.coloList {
			margin-top: 18px;
			border: 1px solid rgba(90, 132, 201, 1);

			>div {
				height: 86px;

				.kind {
					width: 160px;
					height: 40px;
					margin-top: 24px;
					margin-left: 20px;
					background: rgba(8, 34, 77, 1);
					border: 1px solid rgba(0, 249, 250, 1);
					border-radius: 20px;
					padding-top: 12px;
					position: relative;

					>div:first-child {
						width: 16px;
						height: 16px;
						margin-right: 6px;
					}
					>div:nth-child(2){
						margin-right: 16px;
					}
					>div:nth-child(3) {
						width: 12px;
						height: 7px;
						position: absolute;
						top: 50%;
						margin-top: -3px;
						right: 22px;
					}

					.dropOption {
						position: absolute;
						top: 50px;
						left: 0;
						width: 180px;

						>div {
							width: 100%;
							height: 42px;
							background: rgba(8, 34, 77, 1);
							border: 1px solid rgba(0, 249, 250, 1);
							padding-top: 13px;

							>div:first-child {
								width: 16px;
								height: 16px;
								margin-right: 7px;
							}
						}

						>div:hover {
							background-color: rgba(0, 102, 204, 1);
						}

						>div:nth-child(2) {
							border-top: 0;
							border-bottom: 0;
						}
					}

				}

				.district {
					width: 180px;
					height: 40px;
					background: rgba(8, 34, 77, 1);
					border: 1px solid rgba(0, 249, 250, 1);
					border-radius: 20px;
					position: relative;
					margin-top: 23px;
					margin-left: 10px;

					>div:first-child {
						margin-top: 13px;
						margin-left: 20px;
					}

					>div:nth-child(2) {
						width: 12px;
						height: 7px;
						position: absolute;
						top: 50%;
						margin-top: -3px;
						right: 22px;
					}

					.dropOption {
						position: absolute;
						top: 50px;
						left: 0;
						width: 200px;
						overflow-y: scroll;
						height: 126px;

						>div {
							width: 100%;
							height: 42px;
							background: rgba(8, 34, 77, 1);
							border: 1px solid rgba(0, 249, 250, 1);
							padding-top: 13px;

							>div:first-child {
								width: 16px;
								height: 16px;
								margin-right: 7px;
							}
						}

						>div:hover {
							background-color: rgba(0, 102, 204, 1);
						}

						>div:nth-child(2) {
							border-top: 0;
							border-bottom: 0;
						}
					}
				}
			}
			.maxNum{
				width: 201px;
				height: 40px;
				border: 1px solid rgba(0, 249, 250, 1);
				border-radius: 20px;
				margin-top: 23px;
				margin-left: 10px;
				>input{
					width: 160px;
					height: 16px;
					outline: none;
					background-color: rgba(0,0,0,0);
					border: 0;
					color: white;
					font-size: 16px;
					margin-top: 12px;
					margin-left: 16px;
				}
			}
			.maxLine{
				width:1px;
				height:84px;
				background:rgba(90,132,201,1);
				margin: 0 20px;
			}
			.startChoose,
			.clearChoose {
				width: 140px;
				height: 40px;
				background: rgba(8, 34, 77, 1);
				border: 1px solid rgba(0, 249, 250, 1);
				border-radius: 20px;
				line-height: 40px;
				text-align: center;
				margin-top: 23px;
				font-size: 16px;
				color: white;
			}

			.startChoose {
				border: 1px solid rgba(255, 216, 0, 1);
				color: rgba(255, 255, 0, 1);
				margin-right: 10px;
			}
		}

		.selfList {
			width: 100%;
			height: 86px;
			margin-top: 18px;
		}

		.reset,
		.submit {
			width: 130px;
			height: 52px;
			margin-top: 34px;
			margin-right: 26px;
		}

		.bottom {
			height: 122px;
		}

			// 弹出层样式
			.popHistory {
				width: 1343px;
				height: 571px;
			    padding: 40px;
				background-image: url(assets/lishidik.png);
				padding-top: 34px;

				.lsicon {
					background-image: url(./assets/lishi.png);
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				.close {
					background-image: url(./assets/guanbi.png);
					width: 20px;
					height: 20px;
				}

				.buttonList {
					margin-top: 52px;

					.sendNote {
						width: 460px;
						height: 60px;
						line-height: 60px;
						color: #FFFF00;
						background-image: url(./assets/dxbj.png);
					}
				}

				.cutLine {
					width: 100%;
					height: 1px;
					margin-top: 32px;
					margin-bottom: 24px;
					position:relative;
					.cutLine2{
						position: absolute;
						top: 0;
						width:1302px;
						height:1px;
						background:rgba(8,158,228,1);
						left: -20px;
					}
				}

				.buttons {
					margin-left: 21px;

					.search {
						width: 121px;
						height: 51px;

						.button {
							font-size: 16px;
							padding-top: 1px;
						}
					}

					.seletImg {
						position: absolute;
						width: 12px;
						height: 6px;
						top: 50%;
						margin-top: -3px;
						right: 20px;
						background-image: url(./assets/sanjiao.png);

					}
				}

				.table {
					width: 1261px;
					// height: 318px;
					// margin-left: 21px;
					border: 1px solid rgba(9, 193, 255, 1);
				}
			}
		
	}
</style>
