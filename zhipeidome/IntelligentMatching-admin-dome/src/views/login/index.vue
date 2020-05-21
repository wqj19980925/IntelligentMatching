<template>
	<div class="mainLoginItemBox">
		<div class="mainLoginFormItemBox">
			<div class="loginTitleLogoBox">
				<div class="logoBox">智配</div>
				<div class="txtBox">智能配件管理系统</div> 
			</div>
			<div class="mainLoginFormBox">
				<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class auto-complete="on" label-position="left">
					<el-form-item prop="username" class="formInfoBox formIcon01">
						<el-input v-model="loginForm.username" placeholder="请输入手机号" type="text" class="iptBox" style="border:0;" @change="changePhone($event)" :maxlength="11"/>
					</el-form-item>
					<el-form-item prop="password" class="formInfoBox formIcon02">
						<el-input :type="passwordType" v-model="loginForm.password" placeholder="请输入密码" @change="changePass($event,3)" class="iptBox" style="border:0;" @keyup.enter.native="handleLogin"/>
					</el-form-item>
				</el-form>
			</div>
			<div class="mainLoginSubmitBox"><el-button :loading="loading" @click.native.prevent="handleLogin">登 录</el-button></div>
		</div>
		<div class="mainCopyrightItemBox"><a href="http://www.beian.miit.gov.cn">京ICP备17007110号-1</a></div>
	</div>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
import { valiPassword ,phoneTest} from "@/utils/validate";
import { forgetPassCode,changeState} from "@/api/login";
export default {
	name: "Login",
	data() {
		const validateUsername = (rule, value, callback) => {
			if (value.length < 2) {
				callback(new Error("请输入用户名"));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (!valiPassword(value.trim())) {
				callback(new Error("请确认密码正确性"));
			} else {
				callback();
			}
		};
		const validatePhone = (rule, value, callback) => {
			if (!phoneTest(value.trim())) {
				callback(new Error("请确认手机号格式的正确性"));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				username: "",
				password: "",
				facility:'',
			},
			resform: {
				com_name: "",
				adm_username: "",
				adm_tel: "",
				adm_pas: "",
				adm_code: "",
				info_address: "",
				info_province: "",
				info_city: "",
				info_county: ""
			},
			forgetForm: {
				adm_tel: "",
				adm_pas: "",
				adm_affpas: "",
				adm_code: ""
			},
			options: regionData,
			selectedOptions: [],
			loginRules: {
				username: [
					{ required: true, trigger: "blur", validator: validateUsername },
					{ required: true, trigger: "blur", validator: validatePhone }
				],
				password: [
					{ required: true, trigger: "blur", validator: validatePassword }
				]
			},
			yzmtext: "发送验证码",
			passwordType: "password",
			loading: false,
			showDialog: false,
			redirect: undefined,
			registerstate: true,
			yzmshow: true,
			timer: null,
			count: "",
			checkedstate: true,
			facility:'',
		};
	},
	watch: {
		$route: {
			handler: function(route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true
		}
	},
	created() {
		// this.getInfo()
	},
	methods: {
		// 打开页面访问方法
		getInfo(){
			// let name,value,str=location.href,num=str.indexOf("?"); 
			// str = str.substr(num+1);
			// let arr1 = str.split("&")
			// console.log('num',num);
			// console.log('str',str);
			// console.log('arr1',arr1);

			let url = location.href.split("?");
			if(url.length > 0){
				var url2 = url[1].split("=");
				// console.log('-----',url2[0]);
				if(url2.length != 0){
					if(url2[0] != 'facility'){
						this.loginFormShow = true;
						this.facility = ''
						return false;
					}
					this.facility = url2[1];
					this.loginForm.facility =  url2[1];
				}
			}
			const data={}
			data.facility = this.facility
			data.state = 1
			changeState(data.facility,data.state).then(response => {
				if (response.data.code === 200) {
					// 权限计算机验证成功
					// this.$message.success(response.data.msg);
					this.loginFormShow = true;
				}else{
					// 权限计算机验证失败
					this.loginFormShow = false;
				}
			})
			
		},
		// 验证手机号
		changePhone(e){
			if(!phoneTest(e.trim())){
				 this.$message.error("手机号格式不正确!");
				 this.loginForm.username=''
				 this.forgetForm.adm_tel=''
			}
		},
		// 验证密码
		changePass(e,type){
			var reg=/^[0-9a-zA-Z_]{6,15}$/
			if(!reg.test(e)){
				this.$message.error("密码由6-15位数字或字母,或下划线组成");
				if(type===1){
					this.forgetForm.adm_pas=''
				}else if(type===2){
					this.forgetForm.adm_affpas=''
				}else {
					this.loginForm.password=''
				}
			}
		},
		// 登录
		handleLogin() {
			// $refs 绑定loginForm	这个节点
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					this.loading = true;
					this.$store.dispatch("LoginByUsername", this.loginForm).then(data => {
						this.loading = false;
						console.log("登录信息",data)
						if (data.code === 400) {
							this.$confirm("此账号已登录,是否强制登录?", "提示", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							}).then(() => {
								const data = this.loginForm;
								data.login_type = "1";
								if(this.facility){
									data.facility = this.facility
								}
								this.$store.dispatch("LoginByUsername", data).then(data => {
									localStorage.setItem('adm_name', data.data.adm_name)//用户姓名
									localStorage.setItem('adm_id', data.data.adm_id);//用户id
									this.$router.push({ path:'PurchaseOrder' });
								})
								.catch(Error => {
									this.$message.error("登录请求失败!");
								});
							});
						} else {
							localStorage.setItem('adm_name', data.data.adm_name)//用户姓名
							localStorage.setItem('adm_id', data.data.adm_id);//用户id
							this.$router.push({ path: 'PurchaseOrder' });
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
		// 验证手机号
		validatemobile() {
			var myreg = /^1[3456789]\d{9}$/;
			if (!myreg.test(this.resform.adm_tel)) {
				this.$message.error("请输入有效的手机号");
				this.resform.adm_tel = "";
				return false;
			}
		},
		// 获取验证码
		getYzm(state) {
			const num = 60;
			if (state == 1) {
				if (this.resform.adm_tel == "") {
					this.$message.error("请输入联系电话!");
					return false;
				}
			} else {
				if (this.forgetForm.adm_tel == "") {
					this.$message.error("请输入联系电话!");
					return false;
				}
			}
			// if(!this.timer){
			const data = {};
			if (state == 1) {
				data.type = "1";
				data.phone = this.resform.adm_tel;
			// } else {
			//	 data.type = "2";
			//	 data.phone = this.forgetForm.adm_tel;
			// }
				axCode(data).then(response => {
					// console.log(response.data,'验证码')
					if (response.data.code == 200) {
						this.$message.success("发送成功!");
						this.count = num;
						this.yzmshow = false;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= num) {
								this.yzmtext = this.count--;
							} else {
								this.yzmshow = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000);
					} else {
						this.$message.error(response.data.data);
						this.yzmshow = true;
						clearInterval(this.timer);
					}
				});
			}else{
				data.adm_phone=this.forgetForm.adm_tel
				forgetPassCode(data).then(response => {
					// console.log(response.data,'验证码')

					if (response.data.code == 200) {
						this.$message.success("发送成功!");
						this.count = num;
						this.yzmshow = false;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= num) {
								this.yzmtext = this.count--;
							} else {
								this.yzmshow = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000);
					} else {
						this.$message.error(response.data.data);
						this.yzmshow = true;
						clearInterval(this.timer);
					}
				});
			}

			// }
		},
		// 城市选择
		addressChange(arr) {
			console.log(arr);
			this.resform.info_province = CodeToText[arr[0]] || "";
			this.resform.info_city = CodeToText[arr[1]] || "";
			this.resform.info_county = CodeToText[arr[2]] || "";
		},
	}
};
</script>
<style>
.mainLoginItemBox{position: relative;height: 100%;min-width: 1200px;min-height: 700px;width: 100%;background: url("../../assets/img/admin_login_bg.jpg") no-repeat center;background-size:cover;}
.mainLoginFormItemBox{width:400px;height:450px;position:fixed;top:50%;left:50%;z-index:9;margin:-225px 0 0 -200px;}
.mainLoginFormItemBox .loginTitleLogoBox{height:110px;margin-bottom:35px;text-align:center;color:#fff;}
.mainLoginFormItemBox .loginTitleLogoBox .logoBox{width:200px;height:68px;margin:0 auto;background:url(../../assets/img/logo_03.png) no-repeat scroll left center;font-size:70px;line-height:68px;font-weight:bold;text-align:right;}
.mainLoginFormItemBox .loginTitleLogoBox .txtBox{font-size:28px;line-height:30px;margin-top:10px;}
.mainLoginFormItemBox .mainLoginFormBox{width:400px;height:180px;background-color:rgba(0, 0, 0, 0.4);border-radius:10px;padding:26px 35px 0;}
.mainLoginFormItemBox .mainLoginFormBox .formInfoBox{height:54px;margin-bottom:20px;background:none no-repeat scroll 22px center;background-color:rgba(0, 0, 0, 0.6);border-radius:8px;}
.mainLoginFormItemBox .mainLoginFormBox .formIcon01{background-image:url(../../assets/img/login_form_icon_01.png);}
.mainLoginFormItemBox .mainLoginFormBox .formIcon02{background-image:url(../../assets/img/login_form_icon_02.png);}
.mainLoginFormItemBox .mainLoginFormBox .formInfoBox .el-input__inner{background-color:transparent;width:240px;height:54px;border:0px solid #fff;margin-left:50px;font-size:14px;color:#fff;}
.mainLoginFormItemBox .mainLoginFormBox .formInfoBox .el-input__inner::-webkit-input-placeholder{color:#999;}
.mainLoginFormItemBox .mainLoginSubmitBox{margin-top:28px;height:54px;background-color:rgba(46, 115, 228, 0.6);border-radius:10px;}
.mainLoginFormItemBox .mainLoginSubmitBox .el-button{width:100%;height:54px;background-color:transparent;border:0px solid #fff;font-size:20px;color:#fff;}
.mainCopyrightItemBox{position:fixed;left:10px;bottom:0;font-size:14px;line-height:30px;}
.mainCopyrightItemBox a{color:#999!important;}
</style>


