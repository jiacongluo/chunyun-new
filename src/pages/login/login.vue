<template>
	<div class="bgi loginBg">
		<div class="header bgi color-white fb tac">
			广东省交通运输节假日智慧出行支撑保障系统
		</div>
		<div class="bgi loginBox">
			<div class="loginTitle tac">
				用户登录
			</div>
			<div class="flex userName" :class="{'shit':this.active == 1}">
				<div class="bgi"></div>
				<div></div>
				<div>
					<input @focus="active = 1" @blur="active = 0" readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);"
					 placeholder="请输入用户名/手机号" type="text" v-model="userName">
				</div>
			</div>
			<div class="flex password" :class="{'shit':this.active == 2}">
				<div class="bgi"></div>
				<div></div>
				<div>
					<input @focus="active = 2" @blur="active = 0" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);"
					 placeholder="请输入密码" name="xx" type="password" v-model="password">
				</div>
			</div>
			<div class="flex jsb codes">
				<div class="flex code" :class="{'shit':this.active == 3}">
					<div class="bgi"></div>
					<div></div>
					<div>
						<input @focus="active = 3" @blur="active = 0" placeholder="请输入验证码" type="text" v-model="code">
					</div>
				</div>
				<div @click="changeCode" class="codeNum bgi csp" :style="'background-image: url('+ codeImg +');'">

				</div>
			</div>

			<!-- <div class="passwordHandle flex jsb fs_18">
				<div class="remember flex csp" @click="changeChoose">
					<div class="bgi" :class="ifChoose?'choose':'notChoose'">
						
					</div>
					<div>
						记住密码
					</div>
				</div>
				<div class="csp">
					忘记密码？
				</div>
			</div> -->

			<div class="button csp" @click="login">
				登 录
			</div>
		</div>

	</div>
</template>

<script>
	import cookie from '@/utils/core/cookie.js'
	export default {
		data() {
			return {
				codeImg: '', //验证码图片
				ifChoose: false, //是否记住密码
				flag: false, //是否正在登录状态，防止多次请求
				userName: '',
				password: '',
				code: '',
				active:0, //当前哪个input获得焦点
			}
		},
		created() {
			this.changeCode()
		},
		methods: {
			login() {
				if (this.flag) {
					return
				}
				if (this.userName && this.password && this.code) {
					this.flag = true
					this.http.post('api/platformLogin/loginVerify', {
						code: this.code,
						password: this.password,
						username: this.userName,
					}).then(res => {
						// debugger
						if (res.code == 200) {
							this.flag = false
							cookie.setCookie('userName',this.userName,60*24)
							// debugger;
							if(res&&res.data&&res.data.deptId){
                                cookie.setCookie('deptId',res.data.deptId,60*24)
							}
							//userId
                            if(res&&res.data&&res.data.userId){
                                cookie.setCookie('userId',res.data.userId,60*24)
                            }
							window.location.href="index.html"
						} else {
							alert(res.msg)
							this.changeCode()
							this.flag = false
						}
					})
				} else {
					alert('用户名，密码，验证码都不能为空')
					this.changeCode()
				}
			},
			changeCode() { 
				// this.codeImg = '/api/platformLogin/gifCode?' + Math.random()
				this.codeImg = '/gdcnymot2/api/platformLogin/gifCode?' + Math.random()
			},
			changeChoose() {
				this.ifChoose = !this.ifChoose
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: rgba(23, 161, 230, 1);
		font-size: 18px;
	}

	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: rgba(23, 161, 230, 1);
		font-size: 18px;
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: rgba(23, 161, 230, 1);
		font-size: 18px;
	}

	.shit {
		::-webkit-input-placeholder {
			/* WebKit browsers */
			color: rgba(0, 255, 255, 1);
			font-size: 18px;
		}

		::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: rgba(0, 255, 255, 1);
			font-size: 18px;
		}

		:-ms-input-placeholder {
			/* Internet Explorer 10+ */
			color: rgba(0, 255, 255, 1);
			font-size: 18px;
		}
	}

	.loginBg {
		width: 1920px;
		height: 1080px;
		background-image: url(./assets/beijing.png);

		.header {
			font-size: 46px;
			width: 1920px;
			height: 92px;
			line-height: 92px;
			background-image: url(assets/btbj.png);
		}

		.loginBox {
			width: 703px;
			height: 607px;
			background-image: url(assets/denglubj.png);
			margin: 140px auto;

			.loginTitle {
				padding-top: 59px;
				color: rgba(5, 255, 255, 1);
				font-size: 42px;
			}

			.userName {
				width: 565px;
				height: 64px;
				border: 1px solid rgba(20, 137, 204, 1);
				border-radius: 4px;
				margin: 0 auto;
				margin-top: 43px;
				color: rgba(23, 161, 230, 1);
				>div:first-child {
					width: 29px;
					height: 29px;
					background-image: url(assets/zh.png);
					margin-left: 13px;
					margin-top: 18px;
				}

				>div:nth-child(2) {
					width: 2px;
					height: 26px;
					background: rgba(0, 113, 212, 1);
					margin-left: 12px;
					margin-right: 13px;
					margin-top: 23px;
				}

				input {
					width: 240px;
					// height: 17px;
					font-size: 18px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 33px;
					background-color: rgba(0, 0, 0, 0);
					outline: none;
					border: 0;
					margin-top: 18px;
				}

			}
			
			.shit{
				border: 1px solid rgba(0, 255, 255, 1) !important;
				color: rgba(0, 255, 255, 1) !important;
				>div:nth-child(2){
					background: rgba(0, 255, 255, 1) !important;
				}
			}
			.password {
				width: 565px;
				height: 64px;
				border: 1px solid rgba(20, 137, 204, 1);
				border-radius: 4px;
				margin: 0 auto;
				margin-top: 40px;
				color: rgba(23, 161, 230, 1);
				>div:first-child {
					width: 29px;
					height: 29px;
					background-image: url(assets/mima.png);
					margin-left: 13px;
					margin-top: 18px;
				}

				>div:nth-child(2) {
					width: 2px;
					height: 26px;
					background: rgba(0, 113, 212, 1);
					margin-left: 12px;
					margin-right: 13px;
					margin-top: 23px;
				}

				input {
					width: 240px;
					// height: 17px;
					font-size: 18px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 33px;
					background-color: rgba(0, 0, 0, 0);
					outline: none;
					border: 0;
					margin-top: 18px;
				}
			}

			.codes {
				width: 565px;
				margin: 0 auto;

				.code {
					width: 385px;
					height: 64px;
					border: 1px solid rgba(20, 137, 204, 1);
					border-radius: 4px;
					margin-top: 40px;
					color: rgba(23, 161, 230, 1);
					>div:first-child {
						width: 29px;
						height: 29px;
						background-image: url(assets/yzm.png);
						margin-left: 13px;
						margin-top: 18px;
					}

					>div:nth-child(2) {
						width: 2px;
						height: 26px;
						background: rgba(0, 113, 212, 1);
						margin-left: 12px;
						margin-right: 13px;
						margin-top: 23px;
					}

					input {
						width: 240px;
						// height: 17px;
						font-size: 18px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 33px;
						background-color: rgba(0, 0, 0, 0);
						outline: none;
						border: 0;
						margin-top: 18px;
					}
				}

				.codeNum {
					width: 170px;
					height: 64px;
					border: 1px solid rgba(20, 137, 204, 1);
					border-radius: 4px;
					margin-top: 40px;
				}
			}

			.passwordHandle {
				color: rgba(26, 209, 255, 1);
				margin: 0 auto;
				margin-top: 11px;
				width: 565px;

				.remember {
					.notChoose {
						background-image: url(assets/meixuan.png);
					}

					.choose {
						background-image: url(assets/xuanze.png);
					}

					>div:first-child {
						width: 18px;
						height: 18px;
						margin-left: 3px;
						margin-right: 10px;
					}
				}
			}

			.button {
				width: 572px;
				height: 62px;
				line-height: 62px;
				margin: 0 auto;
				color: black;
				background-color: rgba(26, 220, 255, 1);
				font-size: 29px;
				text-align: center;
				margin-top: 50px;
			}
		}
	}
</style>
