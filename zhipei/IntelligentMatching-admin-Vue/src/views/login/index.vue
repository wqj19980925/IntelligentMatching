<template>
	<div class="mainLoginItemBox">
		<div class="mainLoginFormItemBox">
			<div class="loginTitleLogoBox">
				<div class="logoBox">智配</div>
				<div class="txtBox">智能配件管理系统</div>
			</div>
			<div class="mainLoginFormBox">
				<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class auto-complete="on" label-position="left">
					<el-form-item prop="company_name" class="formInfoBox formIcon01">
						<el-input v-model="loginForm.company_name" placeholder="请输入公司名称" type="text" class="iptBox" style="border:0;" :maxlength="11" />
					</el-form-item>
					<el-form-item prop="username" class="formInfoBox formIcon01">
						<el-input v-model="loginForm.username" placeholder="请输入用户名" type="text" class="iptBox" style="border:0;" :maxlength="11" />
					</el-form-item>
					<el-form-item prop="password" class="formInfoBox formIcon02">
						<el-input :type="passwordType" v-model="loginForm.password" placeholder="请输入密码" class="iptBox" style="border:0;" />
					</el-form-item>
				</el-form>
			</div>
			<div class="mainLoginSubmitBox">
				<el-button :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
			</div>
		</div>
		<div class="mainCopyrightItemBox">
			<a href="http://www.beian.miit.gov.cn">京ICP备17007110号-1</a>
		</div>
	</div>
</template>
<script>
	export default {
		name: "Login",
		data() {
			const validateCompany_name = (rule, value, callback) => {
				if(value.length < 2) {
					callback(new Error("请输入公司名称"));
				} else {
					callback();
				}
			};
			const validateUsername = (rule, value, callback) => {
				if(value.length < 2) {
					callback(new Error("请输入用户名"));
				} else {
					callback();
				}
			};
			const validatePassword = (rule, value, callback) => {
				if(value.length < 2) {
					callback(new Error("请输入密码"));
				} else {
					callback();
				}
			};
			return {
				loginForm: {
					company_name: "极限光合",
					username: "admin",
					password: "a123456",
					type: 1,
					islogin: '',
				},
				loginRules: {
					company_name: [{
						required: true,
						trigger: "blur",
						validator: validateCompany_name
					}, ],
					username: [{
						required: true,
						trigger: "blur",
						validator: validateUsername
					}, ],
					password: [{
						required: true,
						trigger: "blur",
						validator: validatePassword
					}]
				},
				passwordType: "password",
				loading: false,
			};
		},
		watch: {
			$route: {
				handler: function(route) {},
				immediate: true
			}
		},
		created() {},
		methods: {
			// 登录
			handleLogin() {
				// $refs 绑定loginForm	这个节点
				this.$refs.loginForm.validate(valid => {
					if(valid) {
						this.loading = true;
						this.$store.dispatch("LoginByUsername", this.loginForm).then(data => {
								this.loading = false;
								console.log("登录信息", data)
								if(data.code === 400) {
									this.$confirm("此账号已登录,是否强制登录?", "提示", {
										confirmButtonText: "确定",
										cancelButtonText: "取消",
										type: "warning"
									}).then(() => {
										const data = this.loginForm;
										data.islogin = "2";
										this.$store.dispatch("LoginByUsername", data).then(data => {
												localStorage.setItem('user_name', data.user_name) //用户姓名
												this.$router.push({ path: data.path });

											})
											.catch(Error => {
												this.$message.error("登录请求失败!");
											});
									});
								} else {
									localStorage.setItem('user_name', data.user_name) //用户姓名
									this.$router.push({ path: data.path });
								}
							})
							.catch(err => {
								this.$message.error("登录请求失败!");
								// console.log("err----", err);
								this.loading = false;
							});
					} else {
						// this.$message.error("登录信息错误!!");
						return false;
					}
				});
			},
		}
	};
</script>
<style>
	.mainLoginItemBox {
		position: relative;
		height: 100%;
		min-width: 1200px;
		min-height: 700px;
		width: 100%;
		background: url("../../assets/img/admin_login_bg.jpg") no-repeat center;
		background-size: cover;
	}
	
	.mainLoginFormItemBox {
		width: 400px;
		height: 450px;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 9;
		margin: -225px 0 0 -200px;
	}
	
	.mainLoginFormItemBox .loginTitleLogoBox {
		height: 110px;
		margin-bottom: 35px;
		text-align: center;
		color: #fff;
	}
	
	.mainLoginFormItemBox .loginTitleLogoBox .logoBox {
		width: 200px;
		height: 68px;
		margin: 0 auto;
		background: url(../../assets/img/logo_03.png) no-repeat scroll left center;
		font-size: 70px;
		line-height: 68px;
		font-weight: bold;
		text-align: right;
	}
	
	.mainLoginFormItemBox .loginTitleLogoBox .txtBox {
		font-size: 28px;
		line-height: 30px;
		margin-top: 10px;
	}
	
	.mainLoginFormItemBox .mainLoginFormBox {
		width: 400px;
		height: 260px;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		padding: 26px 35px 0;
	}
	
	.mainLoginFormItemBox .mainLoginFormBox .formInfoBox {
		height: 54px;
		margin-bottom: 20px;
		background: none no-repeat scroll 22px center;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 8px;
	}
	
	.mainLoginFormItemBox .mainLoginFormBox .formIcon01 {
		background-image: url(../../assets/img/login_form_icon_01.png);
	}
	
	.mainLoginFormItemBox .mainLoginFormBox .formIcon02 {
		background-image: url(../../assets/img/login_form_icon_02.png);
	}
	
	.mainLoginFormItemBox .mainLoginFormBox .formInfoBox .el-input__inner {
		background-color: transparent;
		width: 240px;
		height: 54px;
		border: 0px solid #fff;
		margin-left: 50px;
		font-size: 14px;
		color: #fff;
	}
	
	.mainLoginFormItemBox .mainLoginFormBox .formInfoBox .el-input__inner::-webkit-input-placeholder {
		color: #999;
	}
	
	.mainLoginFormItemBox .mainLoginSubmitBox {
		margin-top: 28px;
		height: 54px;
		background-color: rgba(46, 115, 228, 0.6);
		border-radius: 10px;
	}
	
	.mainLoginFormItemBox .mainLoginSubmitBox .el-button {
		width: 100%;
		height: 54px;
		background-color: transparent;
		border: 0px solid #fff;
		font-size: 20px;
		color: #fff;
	}
	
	.mainCopyrightItemBox {
		position: fixed;
		left: 10px;
		bottom: 0;
		font-size: 14px;
		line-height: 30px;
	}
	
	.mainCopyrightItemBox a {
		color: #999!important;
	}
</style>