<template>
	<div>
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">{{ role_tit }}</div>
				<div class="buttonBox">
					<el-button type="primary" :loading="subLoading" @click="getCheckedKeys()">提交</el-button>
					<el-button class="btn-delete" @click="getBackBtn()">返回</el-button>
				</div>
			</div>
			<el-card shadow="never" class="mainCardBorNoneBox">
				<div slot="header">
					<div class="titleNameBox">基本信息</div>
				</div>
				<el-form ref="formList" :model="formList" :rules="formRules" label-width="100px" class="lk-form-addRoles">
					<el-col :span="6">
						<el-form-item label="角色名称" prop="rol_name">
							<el-input v-model="formList.rol_name" maxlength="20" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="角色描述" prop="rol_describe">
							<el-input v-model="formList.rol_describe" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
				</el-form>
			</el-card>
			<el-card shadow="never" class="mainCardBorNoneBox">
				<div slot="header">
					<div class="titleNameBox">系统功能项</div>
					<div class="buttonBox"><el-button class="btn-delete" @click="resetChecked()">清空</el-button></div>
				</div>
				<el-tree ref="tree" :data="functionListData" :default-checked-keys="checkKey" :props="defaultProps" :expand-on-click-node="false" :default-expand-all="true" show-checkbox node-key="pri_id" class="mainFunctionItemBox"/>
			</el-card>
		</el-row>
	</div>
</template>
<script>
import { roleAdd,addaction,editrole,editaction } from '@/api/system'
import { errorStatus } from '@/utils/index'
export default {
	name: 'Addroles',
	props: {
		editId: {
			type: Number,
			required: true
		},
		roleId: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			role_tit: '新增角色',
			// 提交表单
			formList: {
				rol_name: '',
				rol_describe: ''
			},
			formRules: {
				rol_name: [
					{ required: true, message: '请输入角色名称', trigger: 'blur' }
				],
			},
			functionListData: [],//功能项数据
			checkKey: [],
			defaultProps: {
				children: 'subcat',
				label: 'pri_method_name'
			},
			subLoading: false,
			pri_idList: null,
		}
	},
	created() {
		this.pageInfor()
	},
	methods: {
		// 页面预加载
		pageInfor() {
			const editId = this.editId
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const data = {}
			data.type = 1
			if (editId == 0) {
				roleAdd(data).then(Response => {
					loading.close()
					const dataRep = Response.data
					if (errorStatus(dataRep)) {
						this.pri_idList = dataRep.pri_id
						this.functionListData = dataRep.privileges_info
						for(var i in this.functionListData){
							if(this.functionListData[i].pri_show===2){
								this.functionListData[i].splice(i,1)
							}
							if(this.functionListData[i].subcat){
								for(var j in this.functionListData[i].subcat){
									if(this.functionListData[i].subcat[j].pri_show===2){
										this.functionListData[i].subcat.splice(j,1)
									}
								}
							}	
						}
					}
				})
				.catch(Error => {
					loading.close()
				})
			} else {
				this.role_tit = '角色编辑'
				data.rol_id = editId
				editrole(data).then(response => {
					loading.close()
					const dataRep = response.data
					if (errorStatus(dataRep)) {
						this.functionListData = dataRep.privileges_info
						console.log(dataRep,'编辑')
						for(var i in this.functionListData){
							if(this.functionListData[i].pri_show===2){
								this.functionListData[i].splice(i,1)
							}
							if(this.functionListData[i].subcat){
								for(var j in this.functionListData[i].subcat){
									if(this.functionListData[i].subcat[j].pri_show===2){
										this.functionListData[i].subcat.splice(j,1)
									}
								}
							}	
						}
						const lidsd = []
						const lsid = dataRep.data.rol_subordinate
						const lkds = dataRep.data.rol_privilege
						// for (var i = 0; i < lkds.length; i++) {
						// 	if(lkds[i]==='1'){
						// 		lidsd.push(Number(lkds[i]))
						// 	}
						// 	if(lkds[i]==='223'){//应收账款分析
						// 		lidsd.push(Number(lkds[i]))
						// 	}
						// 	if(lkds[i]==='212'){//技师地图
						// 		lidsd.push(Number(lkds[i]))
						// 	}
							
						// 	if(lkds[i]==='230'){//销售利润
						// 		lidsd.push(Number(lkds[i]))
						// 	}
						// 	if(this.roleId){//app端
						// 		if(lsid.indexOf(Number(lkds[i])) === -1) { //!==
						// 			lidsd.push(Number(lkds[i]))
						// 		}
						// 	}
						// 	if(!this.roleId){//pc端
						// 		if (lsid.indexOf(Number(lkds[i])) !== -1) { //!==
						// 			lidsd.push(Number(lkds[i]))
						// 		}
						// 	}

						// }
						this.checkKey = dataRep.data.rol_privilege;
						console.log("this.checkKey",this.checkKey);
						this.formList.rol_name = dataRep.data.rol_name
						this.formList.rol_describe = dataRep.data.rol_remark
					}
				})
				.catch(Error => {
					loading.close()
				})
			}
		},
		// 提交
		getCheckedKeys() {
			this.$refs.formList.validate((valid) => {
				if (!valid) {
					return false;
				}else{
					if (this.formList.rol_name === '' || this.formList.rol_name === null) {
						this.$message.error('请输入角色名称')
						return false
					}
					const editId = this.editId
					const data = {}
					const arrCheck = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
					const arrCheckchild = this.$refs.tree.getCheckedKeys()
					const arr = []
					for (var i = 0; i < arrCheck.length; i++) {
						if (arrCheckchild.indexOf(arrCheck[i]) === -1) {
							arr.push(arrCheck[i])
						}
					}
					if (arrCheck.length === 0) {
						this.$message.error('请选择系统功能项')
						return false
					}
					data.rol_privilege = arrCheck;
					data.type = '2'
					data.rol_name = this.formList.rol_name;
					data.rol_remark = this.formList.rol_describe;
					console.log('arrCheck',arrCheck);
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					if (editId === 0) {
						addaction(data).then(response => {
							loading.close()
							const dataRep = response.data
							if (errorStatus(dataRep)) {
								this.$message.success(dataRep.data)
								this.$refs.tree.setCheckedKeys([])
								this.formList.rol_name = ''
								this.getBackBtn();//返回列表
							}
						})
						.catch(Error => {
							loading.close()
							this.$message.error('请求失败')
						})	
					} else {
						this.subLoading = true
						data.rol_id = editId
						editaction(data).then(response => {
							loading.close()
							this.subLoading = false
							const dataRep = response.data
							if (errorStatus(dataRep)) {
								this.$message.success(dataRep.data)
								this.$emit('listerToChild', 'Addroles')
							}
						})
						.catch(Error => {
							loading.close()
							this.subLoading = false
							this.$message.error('请求失败')
						})
					}
				}
			})
		},
		// 返回列表
		getBackBtn() {
			this.$emit('listerToChild', 'Addroles')
		},
		// 清空系统功能项选中状态
		resetChecked() {
			this.$refs.tree.setCheckedKeys([])
		}
	}
}
</script>
<style>
.mainFunctionItemBox .el-tree-node__content{height:34px;padding:4px 0;}
.mainFunctionItemBox .el-tree-node__children .el-tree-node__expand-icon{display:none;}
.mainFunctionItemBox .el-tree-node__children .el-tree-node__content{padding-left:40px!important;}
.mainFunctionItemBox .el-tree-node__children .el-tree-node__children{padding-left:20px!important;}
.mainFunctionItemBox .el-tree-node__children .el-tree-node__children .el-tree-node{display:inline-block;}
</style>

