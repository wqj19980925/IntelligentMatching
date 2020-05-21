<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox"></div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row class="clearfix">
					<el-col :span="6">
						<el-form-item label="用户名:" prop="adm_account">
							<el-input v-model="formList.adm_account" placeholder="请输入用户名" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系电话:" prop="adm_phone">
							<el-input v-model="formList.adm_phone" placeholder="请输入联系电话" maxlength="11" @keyup.native="btKeyUp" @keydown.native="btKeyUp" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="姓名:" prop="adm_name">
							<el-input v-model="formList.adm_name" placeholder="请输入姓名" maxlength="5" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="角色:" prop="rol_id">
							<el-select v-model="formList.rol_id" placeholder="请选择可用角色" @click.native ="getRoleDataBtn()" clearable filterable :multiple="false" remote :remote-method="getRoleDataBtn" class="mainIptSelBox">
								<el-option v-for="item in roleInfo" :key="item.rol_id" :label="item.rol_name" :value="item.rol_id"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态:" prop="adm_state">
							<el-select v-model="formList.adm_state" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo" :key="item.id" :label="item.name" :value="item.id"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-button type="primary" @click="searchList('formList',1)">搜&nbsp;&nbsp;索</el-button>
						<el-button @click="resetForm('formList')">重&nbsp;&nbsp;置</el-button> </el-col>
				</el-row>
			</el-form>
		</el-row>		
		<el-row  class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">账号列表</div>
				<div class="buttonBox">
					<el-button v-if="limitsBtn.addBtn" type="primary" @click="addDialog.show = true">新增</el-button>
					<el-button v-if="limitsBtn.openBtn" class="btn-staCol" @click="setBatchStartBtn()">启用</el-button>
					<el-button v-if="limitsBtn.stopBtn" class="btn-delete" @click="setBatchStopBtn()">停用</el-button>
				</div>
			</div>
			<el-table :data="listData" width="100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"/>
				<el-table-column label="用户名" prop="adm_account" min-width align="center"/>
				<el-table-column label="姓名" prop="adm_name" align="center"/>
				<el-table-column label="联系电话" prop="adm_phone" align="center"/>
				<el-table-column label="角色名称" prop="rol_name" align="center"/>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.adm_state">{{ stateSelectInfo[scope.row.adm_state-1].name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="备注" prop="adm_remark" align="center">
					<template slot-scope="scope">
						{{scope.row.adm_remark}}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="250"> 
					<template slot-scope="scope">
						<el-button v-if="limitsBtn.editBtn" type="primary" @click="setEditBtn(scope.row)">编辑</el-button>
						<el-button v-if="scope.row.adm_state==2 && limitsBtn.openBtn" class="btn-staCol" @click="startStopBtn(scope.row,1)">启用</el-button>
						<el-button v-if="scope.row.adm_state==1 && limitsBtn.openBtn" class="btn-delete" @click="startStopBtn(scope.row,2)">停用</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div v-show="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange"/>
			</div>
		</el-row>
		<!-- 新增 -->
		<el-dialog :title="addDialog.title" :visible.sync="addDialog.show" :close-on-click-modal="false" :width="addDialog.width" @close="resetForm('addForm'),code_type = false">
			<el-form ref="addForm" :model="addForm" :rules="addFormRules" size="medium" label-width="100px">
				<el-form-item label="角色" prop="adm_rol_id">
					<el-select v-model="addForm.adm_rol_id" placeholder="请选择角色" @click.native ="getRoleDataBtn()" clearable filterable remote :remote-method="getRoleDataBtn" class="mainIptSelBox">
						<el-option v-for="item in roleInfo" :key="item.rol_id" :label="item.rol_name" :value="item.rol_id"/>
					</el-select>
				</el-form-item>
				<el-form-item label="用户名" prop="adm_account">
					<el-input v-model="addForm.adm_account" clearable placeholder="请输入用户名" class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="密码" prop="adm_password">
					<el-input v-model="addForm.adm_password" clearable placeholder="请输入登录密码" class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="姓名" prop="adm_name">
					<el-input v-model="addForm.adm_name" clearable placeholder="请输入姓名" maxlength="5" class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="手机号" prop="adm_phone">
					<el-input v-model="addForm.adm_phone" clearable placeholder="请输入手机号码" @blur="phoneValidateBtn" maxlength="11" class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="验证码" prop="code">
					<el-row>
						<el-col :span="10">
							<el-input v-model="addForm.code" clearable placeholder="请输入验证码" maxlength="11"/>
						</el-col>
						<el-col :span="8" :offset="1">
							  <el-button :disabled="code_type" @click="getCodeBtn" type="primary">{{code_name}}<span v-if="code_name < 60">秒</span></el-button>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="addForm.adm_remark" placeholder="请输入备注" clearable class="mainIptSelBox"/>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="addDialog.show = false">取 消</el-button>
				<el-button type="primary" @click="submitAddForm('addForm')">提 交</el-button>
			</span>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog :title="editDialog.title" :visible.sync="editDialog.show" :close-on-click-modal="false" :width="editDialog.width" @close="resetForm('editForm')">
			<el-form ref="editForm" :model="editForm" :rules="editFormRules" size="medium" label-width="100px">
				<el-form-item label="角色:" prop="adm_rol_id">
					<el-select v-model="editForm.adm_rol_id" placeholder="请选择角色" @click.native ="getRoleDataBtn()" clearable filterable remote :remote-method="getRoleDataBtn" class="mainIptSelBox">
						<el-option v-for="item in roleInfo" :key="item.rol_id" :label="item.rol_name" :value="item.rol_id"/>
					</el-select>
				</el-form-item>
				<el-form-item label="用户名:" prop="">
					{{ editForm.adm_account }}
				</el-form-item>
				<el-form-item label="密码:" prop="">
					************** <el-button type="text" @click="passDialog.show = true">更换</el-button>
				</el-form-item>
				<el-form-item label="姓名:" prop="adm_name">
					<el-input v-model="editForm.adm_name" clearable placeholder="请输入姓名" maxlength="5" class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="手机号:" prop="">
					{{ editForm.adm_phone }} <el-button type="text" @click="phoneDialog.show = true">更换</el-button>
				</el-form-item>
				<el-form-item label="备注:" prop="">
					<el-input v-model="editForm.adm_remark" placeholder="请输入备注" clearable class="mainIptSelBox"/>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="editDialog.show = false">取 消</el-button>
				<el-button type="primary" @click="submitEditForm('editForm')">提 交</el-button>
			</span>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog :title="passDialog.title" :visible.sync="passDialog.show" :close-on-click-modal="false" :width="passDialog.width" @close="resetForm('passForm'),passForm.passType = true">
			<el-form ref="passForm" :model="passForm" :rules="passFormRules" size="medium" label-width="100px">
				<el-form-item label="原始密码:" prop="old_password" v-if="passForm.passType">
					<el-input v-model="passForm.old_password" type="password" clearable placeholder="请输入原登录密码" class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="新密码:" prop="new_password" v-if="!passForm.passType">
					<el-input v-model="passForm.new_password" type="password" clearable placeholder="请输入新密码" class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="确认密码:" prop="confirm_password" v-if="!passForm.passType">
					<el-input v-model="passForm.confirm_password" type="password" clearable placeholder="再次输入新密码" class="mainIptSelBox"/>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="passDialog.show = false">取 消</el-button>
				<el-button v-if="passForm.passType" type="primary" @click="passValidateBtn('passForm')">下一步</el-button>
				<el-button v-else type="primary" @click="submitPassForm('passForm')">提 交</el-button>
			</span>
		</el-dialog>
		<!-- 修改手机号 -->
		<el-dialog :title="phoneDialog.title" :visible.sync="phoneDialog.show" :close-on-click-modal="false" :width="phoneDialog.width" @close="resetForm('phoneForm'),phoneForm.phoneType = true,code_type = false">
			<el-form ref="phoneForm" :model="phoneForm" :rules="phoneFormRules" size="medium" label-width="100px">
				<el-form-item label="原手机号:" prop="tel" v-if="phoneForm.phoneType">
					<el-input v-model="phoneForm.tel" placeholder="请输入手机号" @blur="phoneValidateBtn" clearable class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="新手机号:" prop="tel" v-if="!phoneForm.phoneType">
					<el-input v-model="phoneForm.tel" placeholder="请输入新手机号" @blur="phoneValidateBtn" clearable class="mainIptSelBox"/>
				</el-form-item>
				<el-form-item label="验证码" prop="code" v-if="!phoneForm.phoneType">
					<el-row>
						<el-col :span="10">
							<el-input v-model="phoneForm.code" placeholder="请输入验证码" clearable/>
						</el-col>
						<el-col :span="8" :offset="1">
							  <el-button :disabled="code_type" @click="getPhoneCodeBtn" type="primary">{{code_name}}<span v-if="code_name < 60">秒</span></el-button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="phoneDialog.show = false">取 消</el-button>
				<el-button v-if="phoneForm.phoneType" type="primary" @click="phoneOldValidateBtn('phoneForm')">下一步</el-button>
				<el-button v-else type="primary" @click="submitPhoneForm('phoneForm')">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import { staffList,getCodeInfo,addStaff,editStaff,startstase,stopstase,editPassword,editPhone } from '@/api/system'
import { getRoleInfo } from '@/api/commonAction'
import { errorStatus } from '@/utils/index'
import { phoneTest } from '@/utils/validate'

export default {
	name: 'Account',
	data() {
		return {
			// 验证码
			code_name:"获取验证码",
			code_type:false,//验证按钮
			// 搜索表单
			formList: {
				adm_account: '',
				adm_name: '',
				adm_phone: '',
				rol_id: '',
				adm_state: '',
			},
			// 状态
			stateSelectInfo: [
				{ id: 1, name: '启用' },
				{ id: 2, name: '停用' }
			],
			roleInfo: [],//获取角色
			listData: [],//列表
			currentPage: 1,
			pageSize: null,
			totalNum: null,
			// 新增
			addDialog: {
				title: '新增',
				show: false,
				width: '470px',
			},
			chosed: [],//列表全选数据
			// 新增表单
			addForm: {
				adm_phone:"",
				adm_account:'',
				adm_password: '',
				adm_name: '',
				adm_rol_id: '',
				adm_remark: '',
				code: '',
			},
			// 表单验证
			addFormRules: {
				adm_rol_id: [{ required: true, message: '请选择角色', trigger: 'change'}],
				adm_account: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
				adm_password: [{required: true, message: '请输入登录密码', trigger: 'blur'},{ min:6, max: 15, message: '密码由6-15位数字或字母,或下划线组成', trigger: 'blur' }],
				adm_name: [{ required: true, message: '请输入姓名', trigger: 'blur'}],
				adm_phone: [{ required: true, message: '请输入正确的手机号码', trigger: 'blur'}],
				code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
			},
			// 编辑
			editDialog: {
				title: '编辑',
				show: false,
				width: '470px',
			},
			// 编辑表单
			editForm: {
				adm_id:"",
				adm_name:'',
				adm_rol_id: '',
				adm_remark: '',
			},
			// 编辑表单-表单验证
			editFormRules: {
				adm_rol_id: [{ required: true, message: '请选择角色', trigger: 'change'}],
				adm_name: [{ required: true, message: '请输入姓名', trigger: 'blur'}],
			},
			// 修改密码
			passDialog: {
				title: '修改密码',
				show: false,
				width: '400px',
			},
			// 修改密码表单
			passForm:{
				type:'',
				adm_id:'',
				old_password:'',
				new_password:'',
				confirm_password:'',
				passType:true,//显示下一步还是提交
			},
			// 修改密码表单-表单验证
			passFormRules: {
				old_password: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
				new_password: [{ required: true, message: '请输入新密码', trigger: 'blur' },{ min:6, max: 15, message: '密码由6-15位数字或字母,或下划线组成', trigger: 'blur' }],
				confirm_password: [{ required: true, message: '再次输入新密码', trigger: 'blur'},{ min: 6, max: 15, message: '密码由6-15位数字或字母,或下划线组成', trigger: 'blur' }],
			},
			// 修改手机号
			phoneDialog: {
				title: '修改手机号',
				show: false,
				width: '400px',
			},
			// 修改手机号表单
			phoneForm:{
				type:'',
				adm_id:'',
				tel:'',
				code:'',
				phoneType:true,//显示下一步还是提交
			},
			// 修改手机号表单-表单验证
			phoneFormRules: {
				tel: [{ required: true, message: '请输入手机号', trigger: 'change' }],
				code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
			},
			// 按钮权限
			limitsBtn:{
				addBtn:false,
				editBtn:false,
				openBtn:false,
				stopBtn:false,
			},
		}
	},
	created() {
		// 页面加载时
		this.getPageInfo();
	},
	methods: {
		// 获取页面数据
		getPageInfo() {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const data = this.formList;
			data.pri_id = this.$route.meta.pri_id
			data.page = this.currentPage
			staffList(data).then(response => {
				loading.close()
				const dataRep = response.data
				if (errorStatus(dataRep)) {
					this.listData = dataRep.data.data;
					var reg=/(\d{3})\d{4}(\d{4})/;
					for(let i in this.listData){
						var phone = ""+this.listData[i].adm_phone
						this.listData[i].adm_phone = phone.replace(reg, "$1****$2")
					}
					this.currentPage = dataRep.data.current_page
					this.pageSize = dataRep.data.current_number
					this.totalNum = dataRep.data.total
					const ralBtn = dataRep.list_button
					for(let i in ralBtn){
						if(ralBtn[i].pri_method_name == '新增'){
							this.limitsBtn.addBtn = true;
						}else if(ralBtn[i].pri_method_name == '编辑'){
							this.limitsBtn.editBtn = true;
						}else if(ralBtn[i].pri_method_name == '启用'){
							this.limitsBtn.openBtn = true;
						}else if(ralBtn[i].pri_method_name == '停用'){
							this.limitsBtn.stopBtn = true;
						}
					}
				}
			})
			.catch(Error => {
				loading.close()
				console.log('请求失败--', Error)
			})
		},
		// 获取角色信息
		getRoleDataBtn(val) {
			const data = {}
			data.search_data = val
			getRoleInfo(data).then(response => {
				const dataRep = response.data
				if(errorStatus(dataRep)){
					this.roleInfo = dataRep.data.data;
				}
			})
		},
		// 新增-获取验证码
		getCodeBtn(){
			if(this.addForm.adm_phone == ''){
				this.$message.warning("请输入手机号");
				return false;
			}
			const data = {};
			data.adm_phone = this.addForm.adm_phone;
			getCodeInfo(data).then(success=>{
				this.code_type = true;
				if(success.data.code == 200){
					this.code_name = 59;
					let tims = setInterval(()=>{
						this.code_name --;
						if(this.code_name < 1){
							clearInterval(tims);
							this.code_name = '重新获取';
						} 
					},1000)
				}else if(success.data.code == 500){
					this.$message.warning(success.data.data);
				} else{
					this.code_name = '重新获取';
					this.code_type = false;
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		// 修改密码-验证旧密码
		passValidateBtn(formName){
			this.$refs[formName].validate(valid => {
				if(valid){
					const data = {};
					data.old_password = this.passForm.old_password;
					data.adm_id = this.editForm.adm_id;
					data.type = 1;
					editPassword(data).then(success=>{
						if(success.data.code == 200){
							this.passForm.passType = false;
							this.passForm.old_password = ''
							this.passForm.new_password = ''
							this.passForm.confirm_password = ''
						}else{
							this.$message.warning("原始密码错误！");
							this.passForm.passType = true;
						}
					}).catch(err=>{
						this.$message.error('验证原密码失败，请联系管理员！')
					})
				}
			})
		},
		// 修改密码-提交
		submitPassForm(formName){
			this.$refs[formName].validate(valid => {
				if(valid){
					if(this.passForm.new_password != this.passForm.confirm_password){
						this.$message.warning("两次输入的密码不一致");
						return false;
					}
					const data = {}
					data.new_password = this.passForm.new_password;
					data.confirm_password = this.passForm.confirm_password;
					data.adm_id = this.editForm.adm_id;
					data.type = 2;
					editPassword(data).then(success=>{
						if(success.data.code == 200){
							this.$message.success(success.data.data)
							this.passDialog.show = false;
						}else{
							this.$message.warning(success.data.error_message.confirm_password[0])
						}
					})
				}
			});
		},
		// 修改手机号-验证原手机号
		phoneOldValidateBtn(formName){
			this.$refs[formName].validate(valid => {
				if(valid){
					const data = {};
					data.tel = this.phoneForm.tel;
					data.adm_id = this.editForm.adm_id;
					data.type = 1;
					editPhone(data).then(success=>{
						if(success.data.code == 200){
							this.phoneForm.phoneType = false;
							this.phoneForm.tel = '';
						}else{
							this.$message.warning("原手机号错误！");
							this.phoneForm.phoneType = true;
						}
					}).catch(err=>{
						this.$message.error('验证原手机号失败，请联系管理员！')
					})
				}
			})
		},
		// 修改手机号-获取验证码
		getPhoneCodeBtn(){
			if(this.phoneForm.tel == ''){
				this.$message.warning("请填写手机号！");
				return false;
			}
			const data = {};
			data.tel = this.phoneForm.tel;
			data.adm_id = this.editForm.adm_id;
			data.type = 2;
			editPhone(data).then(success=>{
				if(success.data.code == 200){
					this.$message.success(success.data.data);
					this.code_name = 59;
					let tims = setInterval(()=>{
						this.code_name --;
						if(this.code_name < 1){
							clearInterval(tims);
							this.code_name = '重新获取';
						} 
					},1000)
				}else{
					this.$message.warning("验证码发送失败，请联系管理员！");
					this.phoneForm.phoneType = true;
				}
			}).catch(err=>{
				this.$message.error('验证码发送失败，请联系管理员！')
			})
		},
		// 修改手机号-提交
		editpasssubmitForm(formName){
			this.$refs[formName].validate(valid => {
				if(valid){
						const data = {};
						data.tel = this.phoneForm.tel;
						data.adm_id = this.editForm.adm_id;
						data.code = this.editForm.code;
						data.type = 3;
						editPhone(data).then(success=>{
							if(success.data.code == 200){
								this.$message.success(success.data.data)
								this.phoneDialog.show = false;
								this.getPageInfo();
							}else{
								this.$message.warning(success.data.data)
							}
						}).catch(err=>{
							this.$message.error('修改电话失败！请重试')
						})
				}else{
				
				}
			})
		},
		// 新增提交
		submitAddForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const data = this.addForm;
					addStaff(data).then(response=>{
						const dataRep = response.data
						if (errorStatus(dataRep)) {
							this.$message.success(dataRep.data);
							this.addDialog.show = false;
						}
					})
					.catch(err => {
						this.$message.error('验证原密码失败!请联系管理员')
					});
				} else {
					return false;
				}
			});
		},
		// 编辑-打开
		setEditBtn(row) {
			// console.log(row);
			this.roleInfo = [];
			this.editForm.adm_id = row.adm_id;
			this.editForm.adm_name = row.adm_name;
			this.editForm.adm_rol_id = row.rol_id;
			// 角色列表
			this.roleInfo.push({
				rol_id:row.rol_id,
				rol_name:row.rol_name,
			});
			this.editForm.adm_remark = row.adm_remark;
			this.editForm.adm_account = row.adm_account;
			this.editForm.adm_phone = row.adm_phone;
			this.editDialog.show = true;
		},
		// 编辑提交
		submitEditForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const data = this.editForm;
					editStaff(data).then(response=>{
						const dataRep = response.data
						if (errorStatus(dataRep)) {
							this.$message.success(dataRep.data);
							this.editDialog.show = false;
							this.getPageInfo();
						}
					})
					.catch(err => {
						this.$message.error('编辑提交失败，请稍候重试！')
					});
				} else {
					return false;
				}
			});
		},
		// 启用/停用
		startStopBtn(row,num) {
			const data = {}
			data.adm_id = [row.adm_id]
			if (num === 1) {
				// 启用
				startstase(data).then(response => {
					if (errorStatus(response.data)) {
						this.$message.success('启用成功!')
						row.adm_state = num
					}
				})
				.catch(Error => {
					this.$message.error('请求失败!')
				})
			} else if (num === 2) {
				// 停用
				stopstase(data).then(response => {
					if (errorStatus(response.data)) {
						this.$message.success('停用成功!')
						row.adm_state = num
					}
				})
				.catch(Error => {
					this.$message.error('请求失败!')
				})
			}
		},
		// 批量启用
		setBatchStartBtn() {
			if (this.chosed.length < 1) {
				this.$message.error('请选择要启用的账号!')
				return false;
			}
			const admId = [];
			for (const i in this.chosed) {
				if (this.chosed[i].adm_state === 2) {
					admId.push(this.chosed[i].adm_id)
				}
			}
			if(admId.length == 0){
				this.$message.warning('您选中的数据全部为“启用”状态，无需更改!')
				return false;
			}
			const data = {}
			data.adm_id = admId
			this.$confirm('请确认,是否启用选中的账号?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				startstase(data).then(response => {
					if (errorStatus(response.data)) {
						this.getPageInfo();
						this.$message.success('全部启用成功!')
					}
				})
				.catch(err => {
					this.$message.error('全部启用，请求失败!')
				})
			})
			.catch(() => {
				// console.log("取消启用");
			})
		},
		// 批量停用
		setBatchStopBtn() {
			if (this.chosed.length < 1) {
				this.$message.error('请选择要停用的账号!');
				return false;
			}
			const admId = [];
			for (const i in this.chosed) {
				if (this.chosed[i].adm_state === 1) {
					admId.push(this.chosed[i].adm_id)
				}
			}
			if(admId.length == 0){
				this.$message.warning('您选中的数据全部为“停用”状态，无需更改!')
				return false;
			}
			const data = {}
			data.adm_id = admId
			this.$confirm('请确认,是否停用选中账号?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				stopstase(data).then(response => {
					// console.log('addClass---', response)
					if (errorStatus(response.data)) {
						this.getPageInfo();
						this.$message.success('全部停用成功!')
					}
				})
				.catch(err => {
					this.$message.error('全部停用，请求失败!')
				})
			})
			.catch(() => {
				// console.log("取消停用");
			})
		},
		// 搜索
		searchList(formName) {
			this.currentPage = 1
			this.getPageInfo()
		},
		// 选中状态
		handleSelectionChange(val) {
			this.chosed = val
		},
		// 分页
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getPageInfo();
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		// 手机号码正则验证
		phoneValidateBtn(){
			// 新增-填写手机号
			if(!phoneTest(this.addForm.adm_phone)){
				this.addForm.adm_phone = '';
			}
			// 更换-填写手机号
			if(!phoneTest(this.phoneForm.tel)){
				this.phoneForm.tel = '';
			}
		},
	}
}
</script>
