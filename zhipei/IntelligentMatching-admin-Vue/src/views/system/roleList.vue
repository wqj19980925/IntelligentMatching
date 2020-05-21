<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="showList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox"></div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="角色名称:" prop="rol_name">
							<el-input v-model="formList.rol_name" placeholder="请输入角色名称" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="描述:" prop="rol_description">
							<el-input v-model="formList.rol_description" placeholder="请输入描述" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态:" prop="shop_state">
							<el-select v-model="formList.rol_state" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo" :key="item.id" :label="item.name" :value="item.id"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-button class type="primary" @click="searchList('formList')">搜&nbsp;&nbsp;索</el-button>
						<el-button class @click="resetForm('formList')">重&nbsp;&nbsp;置</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row class="mainContentItemBox" v-if="showList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">角色列表</div>
				<div class="buttonBox">
					<el-button type="primary" v-if="btnShow.addBtn" class="btn-mainCol" @click="addGoodsBtn">新增</el-button>
					<el-button v-if="btnShow.startBtn" class="btn-staCol" @click="setBatchStartBtn">启用</el-button>
					<el-button v-if="btnShow.stopBtn" class="btn-delete" @click="setBatchStopBtn">停用</el-button>
				</div>
			</div>
			<el-table :data="listData" width="100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"/>
				<el-table-column label="角色名称" prop="rol_name" min-width align="center"/>
				<el-table-column label="创建人" prop="adm_name" min-width align="center"/>
				<el-table-column label="创建时间" prop="rol_create_time" min-width align="center"/>
				<el-table-column label="备注" prop="rol_remark" align="center"/>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.rol_state"></span>{{ stateSelectInfo[scope.row.rol_state-1].name }}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="320">
					<template slot-scope="scope">
						<div class="opr-btn-box">
							<el-button v-if="btnShow.editBtn" :disabled="scope.row.rol_id===1" type="primary" @click="editRow(scope.row)">编辑</el-button>
							<el-button v-if="scope.row.rol_state==2&&btnShow.startBtn" class="btn-staCol" @click="enableThisClas(scope.row,1)">启用</el-button>
							<el-button v-if="scope.row.rol_state==1&&btnShow.stopBtn" :disabled="scope.row.rol_id===1" class="btn-delete" @click="enableThisClas(scope.row,2)">停用</el-button>
							<el-button v-if="btnShow.remarkBtn" class="btn-mainCol" @click="setRemarksBtn(scope.row.rol_id)">备注</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange"/>
			</div>
		</el-row>
		<!-- 备注 -->
		<el-dialog :visible.sync="remarkDialog.show" :title="remarkDialog.title" :width="remarkDialog.width" @close="resetForm('remarkForm')">
			<el-form label-width="120px" ref="remarkForm" :model="remarkForm" :rules="remarkFormRules">
				<el-form-item label="备注内容:" prop="rol_remark">
					<el-input v-model="remarkForm.rol_remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注" class="mainIptSelBox"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="remarkDialog.show = false">取 消</el-button>
				<el-button type="primary" @click="SubmitBtn('remarkForm')">提 交</el-button>
			</span>
		</el-dialog>
		<!-- 新增页面 -->
		<addroles v-if="!showList" :role-id="roleApp" :edit-id="edit_id" @listerToChild="showListPages()"/>
	</div>
</template>

<script>
import { roleindex, roleStart, roleStop,roleremark } from '@/api/system'
import { errorStatus } from '@/utils/index'
import Addroles from './components/addRoles'
export default {
	name: 'RoleList',
	components: { Addroles },
	data() {
		return {
			showList: true,
			edit_id: 0,
			roleApp:false,
			// 搜索表单
			formList: {
				rol_name: '',
				rol_creator: '',
				rol_state: '',
				rol_remark: ''
			},
			// 备注表单验证
			remarkFormRules: {
				rol_remark: [
					{ required: true, message: '请输入备注', trigger: 'blur' }
				],
			},
			// 备注表单
			remarkForm:{
				rol_remark:"",
				rol_id:"",
			},
			// 备注
			remarkDialog:{
				show:false,
				width:"500px",
				title:"备注",
			},
			// 状态
			stateSelectInfo: [
				{ id: 1, name: "启用" },
				{ id: 2, name: "停用" }
			],
			listData: [],//列表
			currentPage: 1,
			pageSize: null,
			totalNum: null,
			chosed:[],
			//按钮权限
			btnShow:{
				addBtn:false,
				editBtn:false,
				startBtn:false,
				stopBtn:false,
				remarkBtn:false,
			},
		}
	},
	created() {
		// 页面加载时
		this.getPageInfo()
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
			data.page = this.currentPage
			data.pri_id = this.$route.meta.pri_id// 传入按钮id
			roleindex(data).then(response => {
				loading.close()
				const dataRep = response.data;
				if (errorStatus(dataRep)) {
					this.listData = dataRep.data.data
					this.currentPage = dataRep.data.current_page
					this.pageSize = dataRep.data.current_number
					this.totalNum = dataRep.data.total
					const btnList = dataRep.list_button
					for (const i in btnList) {
						if (btnList[i].pri_method_name === '新增') {
							this.btnShow.addBtn = true;
						} else if (btnList[i].pri_method_name === '编辑') {
							this.btnShow.editBtn = true;
						} else if (btnList[i].pri_method_name === '启用') {
							this.btnShow.startBtn = true;
						} else if (btnList[i].pri_method_name === '停用') {
							this.btnShow.stopBtn = true;
						} else if (btnList[i].pri_method_name === '备注'){
							this.btnShow.remarkBtn = true;
						}
					}
				}
			})
			.catch(Error => {
				loading.close()
				this.$message.error('请求失败')
			})
		},
		// 搜索
		searchList(formName) {
			this.currentPage = 1
			this.getPageInfo()
		},
		// 新增
		addGoodsBtn() {
			this.edit_id = 0
			this.roleApp = false
			this.showList = false
		},
		// 编辑
		editRow(row) {
			this.edit_id = row.rol_id
			this.showList = false
			if(row.rol_category === 1){
				this.roleApp = false
			}else{
				this.roleApp = true

			}
		},
		// 备注弹框
		setRemarksBtn(val){
			this.remarkForm.rol_id = val;
			this.remarkDialog.show = true;
		},
		// 提交备注
		SubmitBtn(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					const data = this.remarkForm;
					roleremark(data).then(success=>{
						// console.log(success)
						if(success.data.code == 200){
							this.$message.success(success.data.data);
							this.dialog.show = false;
							this.getPageInfo();
						}else{
							this.$message.error(success.data.data);
						}
					}).catch(err=>{
						this.$message.error('备注添加失败')
					})
				}
			})
		},
		// 启用/停用
		enableThisClas(row, num) {
			const data = {};
			data.rol_id = [row.rol_id]
			if (num === 1) {
				// 启用
				roleStart(data).then(response => {
					if (errorStatus(response.data)) {
						this.$message.success('启用成功!')
						row.rol_state = num
					}
				})
				.catch(Error => {
					this.$message.error('请求失败!')
				})
			} else if (num === 2) {
				// 停用
				roleStop(data).then(response => {
					if (errorStatus(response.data)) {
						this.$message.success('停用成功!')
						row.rol_state = num
					}
				})
				.catch(Error => {
					this.$message.error('请求失败!')
				})
			}
		},
		// 批量启用
		setBatchStartBtn() {
			const list = this.listData
			const chosed = this.chosed
			if (chosed.length < 1) {
				this.$message.error('请选择要启用的角色!')
			} else {
				const id = []
				const data = {}
				for (const i in chosed) {
					if (chosed[i].rol_state === 2) {
						id.push(chosed[i].rol_id)
					}
				}
				if (id.length > 0) {
					data.rol_id = id
					this.$confirm('请确认,是否启用选中的角色?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						roleStart(data).then(response => {
							if (errorStatus(response.data)) {
								for (const i in id) {
									for (var j = 0; j < list.length; j++) {
										if (id[i] === list[j].rol_id) {
											list[j].rol_state = 1
										}
									}
								}
								this.listData = list
								this.$message.success('启用成功!')
							}
						})
						.catch(err => {
							console.log('启用的角色err', err)
							this.$message.error('请求失败!')
						})
					})
					.catch(() => {
						// console.log("取消停用");
					})
				} else {
					this.$message.warning('批量操作数据全为启用状态！')
					return false;
				}
			}
		},
		// 批量停用
		setBatchStopBtn() {
			const list = this.listData
			const chosed = this.chosed
			if (chosed.length < 1) {
				this.$message.error('请选择要停用的角色!')
			} else {
				const id = []
				const data = {}
				for (const i in chosed) {
					if (chosed[i].rol_state === 1) {
						id.push(chosed[i].rol_id)
					}
				}
				// console.log('选择的数据-id-', id)
				if (id.length > 0) {
					data.rol_id = id
					this.$confirm('请确认,是否停用选中角色?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						roleStop(data).then(response => {
							if (errorStatus(response.data)) {
								for (const i in id) {
									for (var j = 0; j < list.length; j++) {
										if (id[i] === list[j].rol_id) {
											list[j].rol_state = 2
										}
									}
								}
								this.listData = list
								this.$message.success('停用成功!')
							}
						})
						.catch(err => {
							console.log('启用的角色err', err)
							this.$message.error('请求失败!')
						})
					})
					.catch(() => {
						// console.log("取消停用");
					})
				} else {
					this.$message.warning('批量操作数据全为停用状态！')
					return truen;
				}
			}
		},
		// 选中状态
		handleSelectionChange(val) {
			this.chosed = val
		},
		// 分页
		handleCurrentChange(val) {
			this.currentPage = val
			this.getPageInfo()
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		// 新增和编辑页面返回
		showListPages() {
			this.showList = true
			this.getPageInfo()
		}
	}
}
</script>

