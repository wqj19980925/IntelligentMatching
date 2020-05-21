<template>
	<div class="app-container">
		<el-row class="sd-module-box">
			<div class="sd-moudle-header mar-bot-10">
				<div class="sd-module-title">员工设置</div>
				<div class="sd-module-btn">
					<el-button :loading="subLoading" class="btn-mainCol" @click="getCheckedKeys()">保存</el-button>
					<el-button class="btn-back" @click="back()">返回</el-button>
				</div>
			</div>
			<el-form ref="formList" :model="formList" :rules="formRules" label-width="120px" class="sd-form-box clearfix">
			
			 <el-row class="clearfix">
				 <el-col :span="24" class="add-gods-title " >
							<div class="titleBut">员工信息</div>
					</el-col>
					<el-col :span="6" class="sd-col-6">
						<el-form-item label="员工账号:" class="sd-form-item" prop="adm_account">
							{{person.adm_account}}
						</el-form-item>
					</el-col>
					<el-col :span="6" class="sd-col-6">
						<el-form-item label="员工姓名:" class="sd-form-item" prop="adm_phone">
						 {{person.adm_name}}
						</el-form-item>
					</el-col>
					<el-col :span="6" class="sd-col-6">
						<el-form-item label="联系电话:" class="sd-form-item" prop="adm_name">
							{{person.adm_phone}}
						</el-form-item>
					</el-col>
					<el-col :span="24" class="sd-col-6">
						<el-form-item label="隶属门店:" class="sd-form-item" prop="adm_name">
							{{shop_name}}
						</el-form-item>
					</el-col>
					<el-col :span="24" class="add-gods-title ">
						<div class="Divisionline1"/>
					</el-col>
					<el-col :span="24" class="add-gods-title " >
							<div class="titleBut">可以调用资源</div>
					</el-col>
					<el-col :span="24" class="add-gods-title " >
						<el-tabs :tab-position="tabPosition" style="min-height:150px;margin-left:50px">
							<el-tab-pane label="直营门店" v-if="shopType != 3">
								 <el-checkbox :indeterminate="isIndete" v-model="checkAllShop" style="height:35px" @change="handleCheckAllShop">全选</el-checkbox>
								 <el-checkbox-group v-model="checkShop" @change="handleCheckShop">
									<el-checkbox v-for="item in shoplist" :label="item.shop_id" :key="item.shop_id">{{item.shop_name}}
									</el-checkbox>
								</el-checkbox-group>
							</el-tab-pane>
							<el-tab-pane label="加盟门店" v-if="shopType != 3">
								 <el-checkbox :indeterminate="isIndeteFranchised" v-model="FranchisedFranchised" style="height:35px" @change="handleCheckAllFranchised">全选</el-checkbox>
								 <el-checkbox-group v-model="checkFranchised" @change="handleCheckFranchised">
									<el-checkbox v-for="item in franchisedShopList" :label="item.shop_id" :key="item.shop_id">{{item.shop_name}}
									</el-checkbox>
								</el-checkbox-group>
							</el-tab-pane>
							<el-tab-pane label="门店" v-if="shopType == 3">
								 <el-checkbox :indeterminate="isIndete" v-model="checkAllShop" style="height:35px" @change="handleCheckAllShop">全选</el-checkbox>
								 <el-checkbox-group v-model="checkShop" @change="handleCheckShop">
									<el-checkbox v-for="item in shoplist" :label="item.shop_id" :key="item.shop_id">{{item.shop_name}}
									</el-checkbox>
								</el-checkbox-group>
							</el-tab-pane>
							<el-tab-pane label="仓库">
									<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="height:35px">全选</el-checkbox>
									 <el-checkbox-group v-model="checkWare" @change="handleCheckWare" >
										<el-checkbox v-for="item in warelist" :label="item.ware_id" :key="item.ware_id">{{item.ware_name}}
										</el-checkbox>
									</el-checkbox-group>
							</el-tab-pane>
						</el-tabs>
					</el-col>
					<el-col :span="24" class="add-gods-title ">
						<div class="Divisionline1"/>
					</el-col>
					 <el-col :span="24" class="add-gods-title " >
						<el-col :span="21" class="sd-col-6">
							<div class="titleBut">账号绑定</div>
						</el-col>
						<el-col :span="3" class="sd-col-6">
							<el-button class="add-goods-btn main-btn" @click="addInfoThird()" >+ 增加mac地址</el-button>
						</el-col>
					</el-col>
					<el-col :span="24" class="sd-col-6">
						<div v-for="(item,index) in tracDetail" :key="index" class="addGods-infor-ipt clearfix">
							<el-form-item label="mac地址" prop="mac" style="margin-top: 20px">
								<el-input v-model="item.mac " style="width:500px;margin-right: 20px" placeholder="请输入mac地址" maxlength="15" clearable />
								 <el-button icon="el-icon-delete" class="btn-delete" @click="deleteInfo(index)"/>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<!-- <el-form-item label="选择仓库" prop="mac">
				</el-form-item>
				<el-form-item label="选择门店" prop="mac">
				</el-form-item> -->
			</el-form>
		</el-row>
	</div>
</template>
<script>
import { setStaff} from '@/api/system'
import { errorStatus } from '@/utils/index'
export default {
	name: 'Addroles',
	props: {
		admId: {
			type: Number,
			required: true
		},
		person: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			tabPosition: 'top',
			tracDetail:[
				{mac:''},
			],
			checkAllShop:false,
			FranchisedFranchised:false,
			isIndete:false,
			isIndeteFranchised:false,
			isIndeterminate: true,
			checkAll: false,
			role_tit: '角色新增',
			formList: {
				rol_name: '',
				rol_describe: ''
			},
			formRules: {
				rol_name: [
					{ required: true, message: '请输入角色名称', trigger: 'blur' }
				],
			},
			list: [],
			shoplist:[],//直营店
			warelist:[],//仓库
			franchisedShopList:[],//加盟店
			shopType:'',////门店类型：1总店2直营店3加盟店
			checkWare: [],
			checkShop: [],
			checkFranchised: [],
			defaultProps: {
				children: 'subcat',
				label: 'ware_name'
			},
			subLoading: false,
			shop_name:'',
		}
	},
	created() {
		this.pageInfor()
	},
	methods: {
		pageInfor() {
			const editId = this.editId
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const data = {}
			data.adm_id =this.admId
			data.type = 1
			setStaff(data).then(Response => {
				loading.close()
				const dataRep = Response.data
				if (errorStatus(dataRep)) {
					console.log('dataRep',dataRep);
					this.warelist = dataRep.data.warehouse
					this.shoplist = dataRep.data.shop
					this.franchisedShopList = dataRep.data.franchised_outlet
					this.shop_name = dataRep.data.shop_name;
					this.shopType = dataRep.data.shop_type;
					const choselist =dataRep.data.adm_set;
					this.checkWare = [];
					this.checkShop = [];
					this.checkFranchised = [];
					if(choselist.length !== 0){
						for(var i in choselist.adms_ware_id){
							this.checkWare.push(Number(choselist.adms_ware_id[i]))
						}
						for(var i in choselist.adms_shop_id){
							this.checkShop.push(Number(choselist.adms_shop_id[i]))
						}
						for(var i in choselist.adms_shop_outlet){
							this.checkFranchised.push(Number(choselist.adms_shop_outlet[i]))
						}
						if(choselist.adms_mac_address.length !== 0){
								this.tracDetail =[]
							for(var i in choselist.adms_mac_address){
								this.tracDetail.push({mac:choselist.adms_mac_address[i]})
							}
						}
						this.handleCheckWare(this.checkWare)
						this.handleCheckShop(this.checkShop)
						this.handleCheckFranchised(this.checkShop)
						// this.handleCheckFranchised(this.checkFranchised)
					}
				}
			})
			.catch(Error => {
				loading.close()
			})
		},
		// 提交
		getCheckedKeys() {
			const data = {}
			var mac=[]
			for(var i in this.tracDetail){
				if(this.tracDetail[i].mac === '' ){
					if( this.checkWare.length === 0 && this.checkShop.length === 0 && this.checkFranchised.length === 0 ){
						this.$message.error('请至少选择一个功能设置!')
						return false
					}
				}else{
					mac.push(this.tracDetail[i].mac) 
				}
			}

			data.warehouse = this.checkWare
			data.shop =	this.checkShop
			data.franchised_outlet = this.checkFranchised
			data.mac = mac 
			data.type = 2
			data.adm_id = this.admId
			// console.log('data',data);
			// return false;
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			setStaff(data).then(response => {
				loading.close()
				const dataRep = response.data
				if (errorStatus(dataRep)) {
					this.$message.success(dataRep.data)
					this.back();
				}
			})
			.catch(Error => {
				loading.close()
				this.$message.error('请求失败')
			})
		

		},
		//增加mac地址
		addInfoThird(){
				const tracDetail = this.tracDetail
				const detail = {
					mac: '',
				}
				const leng = tracDetail.length
				this.$set(this.tracDetail, leng, detail)
		},
		//删除mac地址
		deleteInfo(index) {
			if (index === 0) {
				this.$message.error('不可删除!')
				return false
			} else {
				this.tracDetail.splice(index, 1)
			}
		},
		// 加盟店
		handleCheckAllFranchised(val){
			var checkbox =[]
			for(var i in this.franchisedShopList){
				checkbox.push(this.franchisedShopList[i].shop_id)
			}
			this.checkFranchised = val ? checkbox : [];
			this.isIndeteFranchised= false;
		},
		handleCheckFranchised(value){
			let checkedCount = value.length;
			this.FranchisedFranchised = checkedCount === this.franchisedShopList.length;
			this.isIndeteFranchised = checkedCount > 0 && checkedCount < this.franchisedShopList.length;
		},
		// 直营店
		handleCheckAllShop(val){
			var checkbox =[]
			for(var i in this.shoplist){
				checkbox.push(this.shoplist[i].shop_id)
			}
			this.checkShop = val ? checkbox : [];
			this.isIndete= false;
		},
		handleCheckShop(value){
			let checkedCount = value.length;
			this.checkAllShop = checkedCount === this.shoplist.length;
			this.isIndete = checkedCount > 0 && checkedCount < this.shoplist.length;
		},
		// 仓库
		handleCheckAllChange(val){
			var checkbox =[]
			for(var i in this.warelist){
				checkbox.push(this.warelist[i].ware_id)
			}
			this.checkWare = val ? checkbox : [];
			this.isIndeterminate = false;
		},
		handleCheckWare(value){
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.warelist.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.warelist.length;
		},
		back() {
			this.$emit('listerToChild', 'Addroles')
		},
		resetChecked() {
			this.$refs.tree.setCheckedKeys([])
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-container {
	.sd-module-box {
		.lk-form-addRoles {
			.roles-checkbox {
				.roles-chose-tit-box {
					padding: 10px 0 4px 0;
					border-bottom: 1px solid #eee;
					@include clearfix;
					.roles-title {
						border-left: 1px solid #1d92c9;
						padding: 2px 0 2px 26px;
						font-size: 16px;
						width: 40%;
						float: left;
					}
					.sd-module-btn {
						float: right;
						padding-right: 20px;
					}
				}
			}
		}
	}
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.roles-chose {
	margin-top: 0;
	.role-tree-chose {
		.el-tree-node {
			@include clearfix;
			// width: 100%;
			.el-tree-node__expand-icon {
				color: #666;
			}
			.el-checkbox__inner {
				border: 1px solid #999;
			}
			.el-checkbox__input.is-checked .el-checkbox__inner,
			.el-checkbox__input.is-indeterminate .el-checkbox__inner {
				border: 1px solid #409eff;
			}
			padding: 10px 0 8px;
			.el-tree-node__children {
				.el-tree-node__expand-icon {
					display: none;
				}
				.el-tree-node {
					padding: 6px 0 0px;
					.el-tree-node__content {
						padding-left: 40px !important;
					}
					.el-tree-node__children {
						padding-left: 60px !important;
						@include clearfix;
						// padding: 0 0 0 50px;
						.el-tree-node {
							padding: 0 30px;
							float: left;
							.el-tree-node__content {
								padding-left: 0 !important;
							}
							.el-tree-node__children {
								// padding-left: 0 !important;
								padding: 6px 0 0 0 !important;
							}
						}
					}
				}
			}
		}
	}
}
</style>
<style scoped>
.Divisionline1{
	border-bottom:1px solid #ddd;
	margin:10px 0 10px 0
}
.titleBut{
	 margin-left:45px;
	 margin-bottom: 30px;
	 font-size:17px

}

</style>
<style>
.el-checkbox+.el-checkbox {margin-left: 30px;}
</style>