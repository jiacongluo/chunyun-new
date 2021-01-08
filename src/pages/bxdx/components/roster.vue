<template>
	<div class="flex roster jsb border-blue">
		<div>
			<div class="color-white name bgi fs_16">{{name}}</div>
			<span class="fileName fs_16" v-show="this.fileName">
				<span>{{fileName}}</span>
				<div class="delect csp" @click="delect">x</div>
			</span>
		</div>
		<div class="flex buttonLists">
			<div class="buttonList" @click="download(num)">
				<Button :text="'下载模板'"></Button>
			</div>
			<Upload :on-change="this.success" :file-list="fileList" action='#' :show-file-list="false" :auto-upload="false"
			 :multiple="false" :accept="'.txt'">
				<div slot="trigger" class="buttonList">
					<Button :text="'上传'"></Button>
				</div>
			</Upload>
		</div>


	</div>
</template>

<script>
	import {
		Upload
	} from 'element-ui'
	import Button from '../../../components/button.vue'
	import saveAs from 'file-saver';
	export default {
		props: {
			name: {
				type: String,
				default: '',
			},
			num: {
				type: Number,
				default: 0,
			},
			ifTest:{
				type:Boolean,
				default:false,
			}
		},
		data() {
			return {
				fileName: '',
				fileList: [],
			}
		},
		created() {
			
		},
		methods: {
			
			//下载模板方法(str为白名单，黑名单，自定义名单)
			download(num){
				let location;
				let url = 'http://183.6.114.219:23137/gdcnymot2/jede/crmres/';
				if(num){
					location = num == '1'? 'blacklist.txt':'mobilelist.txt'
				}else{
					location = 'whitelist.txt'
				}
				var tempwindow=window.open('_blank'); // 先打开页面 
				tempwindow.location= url+location; // 后更改页面地址	
				// let FileSaver = require('file-saver');
				// FileSaver.saveAs(url + location)
			},
			//上传名单
			success(file, fileList) {
				this.fileName = file.name
				//之前的逻辑（本地保存文件，先不上传）
				if(this.ifTest){
					this.$store.commit('change', {
						i: this.num,
						obj: file
					})
				}else{
					//后面改的逻辑，点击上传后直接上传名单
					this.$emit('showLoad') //调用父组件显示遮罩
					let formData = new FormData();
					let typex;
					if(this.num){
						typex = this.num == '1'? 2 : 0
					}else{
						typex = 1
					}
					formData.append('typex',typex)
					formData.append('file',file.raw)
					// debugger
					this.http.post2('/jede/webx/uploadBlackWhteListFile.do',formData).then(res => {
						if (!res.retcode) {
							this.$emit('hideLoad') //调用父组件隐藏遮罩
							this.$message({
								type: 'success',
								message: '上传成功!'
							});
							
						} else {
							this.$emit('hideLoad') //调用父组件隐藏遮罩
							this.$message.error(res.retmsg)
						}
					}).catch(() => {
						this.$emit('hideLoad') //调用父组件隐藏遮罩
						this.$message.error('上传失败，请重试！')
					});
					//后来改的到这里结束
				}
				
			},
			delect() {
				this.fileName = ''
				this.$store.commit('delect', this.num)
			}
		},
		components: {
			Upload,
			Button
		}

	}
</script>

<style lang="scss" scoped="scoped">
	.roster {
		width: 100%;
		height: 100%;
		
		.name {
			width: 153px;
			height: 32px;
			line-height: 32px;
			padding-left: 8px;
			margin-bottom: 18px;
			background-image: url(../assets/juxing.png);
		}

		.fileName {
			color: #F7F712;
			font-size: 16px;
			margin-left: 6px;
			margin-top: 17px;
			position: relative;

			.delect {
				position: absolute;
				top: -4px;
				right: -12px;
				width: 8px;
				height: 8px;
				color: #EC461A;
			}
		}

		.buttonLists {
			padding-top: 28px;
			.buttonList {
				width: 100px;
				height: 30px;
				line-height: 30px;
				margin-right: 10px;
			}
		}
	}
</style>
