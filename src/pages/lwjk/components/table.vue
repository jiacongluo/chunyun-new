<template>
	<div class="tablebox">
		<el-table empty-text="暂无缓行路段" :row-class-name="tableRowClassName" @row-click="clickRow" :data="tableData" stripe style="width: 100%">
			<el-table-column align="center" min-width='10%' label="序号" v-if="!this.page">
				<template slot-scope="scope">
					<div v-text="scope.$index - 0 + 1" v-if="scope.$index - 0 + 1 < 4">

					</div>
					<div v-text="scope.$index - 0 + 1" v-if="scope.$index - 0 + 1 > 3">

					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" min-width='10%' label="序号" v-if="this.page">
				<template slot-scope="scope">
					<!-- <div class="fk" :class="'fk'+ scope.$index" v-text="scope.$index - 0 + 1" v-if="scope.$index - 0 + 1 < 4">
						
					</div> -->
					<div v-text="scope.$index - 0 + 6">

					</div>
				</template>
			</el-table-column>
			<el-table-column prop="roadName" label="路段名称" min-width='60%' align="center">
				<template slot-scope="scope">
					<div>
						{{scope.row.roadName}}
						<span v-if="formatterLoad(scope.row.roadName) == 'S3广深沿江高速' || formatterLoad(scope.row.roadName) == 'S31龙大高速' || formatterLoad(scope.row.roadName) == 'S41机场高速'" class="roadVideo bgi"></span>
					</div>
				</template>
			</el-table-column>
			<el-table-column :prop="!this.tbtype?'status':'jamDist'" :label="!this.tbtype?'通行状态':'缓行长度'" align="center"
			 min-width='15%'>
				<template slot-scope="scope">
					<div :class="'color'+ scope.row.status" v-text="statusList[scope.row.status]" v-if="!tbtype"></div>
					<div v-text="(scope.row.jamDist/1000).toFixed(2) + 'km'" v-if="tbtype"></div>
				</template>
			</el-table-column>
			<el-table-column prop="jamSpeed" align="center" label="平均车速" min-width='15%'>
				<template slot-scope="scope">
					<div v-text="scope.row.jamSpeed + 'km/h'"></div>
					<!-- <div v-text="0 + 'km/h'" v-if="!scope.row.jamSpeed"></div> -->
				</template>
			</el-table-column>

		</el-table>
		<div class="flex pages jsc">
			<div :class="{active:!this.page}" @click="changePage(0)"></div>
			<div :class="{active:this.page}" @click="changePage(1)"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			tbtype: {
				type: Number,
				default: 0,
			},
			dataList: {
				type: Array,
				default: () => {
					return []
				},
			},
		},

		data() {
			return {
				tableData: [

				], //表格数据
				statusList: [
					'未知', '畅通', '缓行', '拥堵', '严重拥堵'
				], //通行状态列表
				page: 0, //分页参数

			}
		},
		watch: {
			dataList(n, o) {
				if (n.length > 0) {
					this.tableData = []
					for (let i = 0; i < 5; i++) {
						if (this.dataList[i]) {
							this.tableData.push(this.dataList[i])
						}
					}
				}
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			// 去除括号方法(只用于显示监控)
			formatterLoad(str){
				return str.split('(')[0]
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				//把每一行的索引放进row
				row.index = rowIndex;
			},
			clickRow(row, column, event) {
				// if (this.tbtype) {
				// 	return
				// }
				let type = this.tbtype
				let city = '广州'
				if(this.formatterLoad(row.roadName) == 'G25长深高速' || this.formatterLoad(row.roadName) == 'S31龙大高速'){
					city = '深圳'
				}else if(this.formatterLoad(row.roadName) == 'G55二广高速' || this.formatterLoad(row.roadName) == '广佛公路'){
					city = '佛山'
				}
				let obj = {
					roadName: row.roadName,
					xy: row.xy,
					city:city,
					type:type,
				}
				this.$emit('rowClick', obj)
			},
			indexMethod(index) {
				return index + 1;
			},
			changePage(num) {
				this.page = num
				if (num) {
					this.tableData = [];
					for (let i = 5; i < 10; i++) {
						if (this.dataList[i]) {
							this.tableData.push(this.dataList[i])
						}
					}
				} else {
					this.tableData = [];
					for (let i = 0; i < 5; i++) {
						if (this.dataList[i]) {
							this.tableData.push(this.dataList[i])
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
		.roadVideo {
			display: inline-block;
			width: 14px;
			height: 16px;
			margin-left: 4px;
			background-image: url(../assets/jk2.png);
		}
	
	.tablebox {
		position: relative;
		height: 100%;
		width: 100%;

		.pages {
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			bottom: 14px;

			>div {
				width: 68px;
				height: 8px;
				background: rgba(155, 163, 167, 1);
				margin-right: 16px;
			}

			>.active {
				background-color: rgba(21, 184, 251, 1);
			}
		}

		.color4 {
			color: rgba(255, 24, 24, 1)
		}

		.color3 {
			color: rgba(255, 102, 0, 1)
		}

		.color2 {
			color: rgba(254, 215, 0, 1)
		}

		.color0 {
			color: rgba(0, 255, 216, 1)
		}

		.color1 {
			color: rgba(68, 223, 31, 1)
		}
	}

	// .lwjk .el-table_1_column_1{
	// 	background-color: red !important;
	// }
</style>
