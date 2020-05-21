<template>
    <div>
    	<!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="addBrandBtn()">新增</el-button>
					<el-button plain v-if="Btnshow.exportBtn" type="danger" @click="exportBtn">导出</el-button>
					<el-button plain type="danger">生成账单</el-button>
				</div>
			</div>
			<div class="receivListes-header">
				<div class="orhead-orbi_state">
					<span class="orhead-ord_service_states" style="padding-left: 35px;">状态：</span>
					<div class="sd-module-btn" >
						<div v-for="(item, index) in cg_stateList" :key="index" :class="formList.cg_state == item.id?'el-tab-order on':' el-tab-order'" @click="distinguish(item.id)"> {{item.name}} <a v-if="parseInt(item.id) > 0">(<span style="color:red;">{{item.num}}</span>)</a> <span v-else style="color:red;">{{item.num}}</span> </div>
					</div>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="8">
						<el-form-item label="采购单号:" prop="cg_number">
							<el-input v-model="formList.cg_number" placeholder="请输入采购单号"  clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="供货单位:" prop="cg_supplyunit">
							<el-select
                                v-model="formList.cg_supplyunit"
                                filterable
                                remote
								class="mainIptSelBox"
                                clearable
                                reserve-keyword
                                placeholder="请输入供货单位"
                                :remote-method="matchSupplier"
                                :loading="loading">
                                <el-option
                                    v-for="(item,index) in SupplierList"
                                    :key="index"
                                    :label="item.vendor"
                                    :value="item.vendor">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="创建人:" prop="cg_creator">
							<el-input v-model="formList.cg_creator" placeholder="请输入创建人" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<!-- <el-col :span="6">
						<el-form-item label="采购状态:" prop="cg_state">
							<el-select v-model="formList.cg_state" clearable class="mainIptSelBox">
								<el-option v-for="item in cg_stateList" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col> -->
					<el-col :span="8">
						<el-form-item label="结算状态:" prop="cg_settlementype">
							<el-select v-model="formList.cg_settlementype" clearable class="mainIptSelBox">
								<el-option v-for="item in cg_settlementypeList" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="包含产品:" prop="goods_name">
							<el-input v-model="formList.goods_name" placeholder="请输入包含产品" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="总金额:" prop="amount_start">
							<el-input style="width: 38%;" v-model="formList.amount_start" placeholder="最小值" max="10" :maxlength="10" clearable/> -
							<el-input style="width: 38%;" v-model="formList.amount_end" placeholder="最大值" max="10" :maxlength="10" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="创建时间" class="sd-form-item" prop="dataTimes">
							<el-date-picker v-model="formList.dataTimes" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" class="mainIptSelBox">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="到货时间" class="sd-form-item" prop="dataTimest">
							<el-date-picker v-model="formList.dataTimest" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" class="mainIptSelBox">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<div class="plr-10 fr">
						<el-button @click="getinforData(page)" type="primary">搜&nbsp;&nbsp;索</el-button>
						<el-button type="danger" @click="resetForm()">重&nbsp;&nbsp;置</el-button>
					</div>
				</el-row>
			</el-form>
		</el-row>
		<!-- 列表 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">采购列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table :data="props.row.storage_goods" style="width: 80%">
							<el-table-column label="序号" min-width="80" align="center">
								<template slot-scope="scope">
									{{scope.$index+1}}
								</template>
							</el-table-column>
							<el-table-column label="商品信息" prop="" width="300">
								<template slot-scope="scope">
									<div>
										<p>商品品牌:{{scope.row.brand_name}}</p>
										<p>商品类目:{{scope.row.sort_directory}}</p>
										<p>商品编码:{{scope.row.general_version}}</p>
										<p>商品名称:{{scope.row.goods_name}}</p>
										<p>型号规格:{{scope.row.goods_standard}}</p>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="数量" min-width="70" align="center" prop="goods_num" />
							<el-table-column label="单位" min-width="70" align="center" prop="company_unit" />
							<el-table-column label="单价" min-width="70" align="center" prop="univalence" />
							<el-table-column label="税率" min-width="70" align="center" prop="tax_rate" />
							<el-table-column label="币种" min-width="70" align="center" prop="currency" />
							<el-table-column label="金额" min-width="70" align="center" prop="money" />
							<el-table-column label="预计到货时间" min-width="150" align="center" prop="estimate_time" />
						</el-table>
					</template>
				</el-table-column>
				<el-table-column min-width="300" label="采购单信息"  prop="" >
					<template slot-scope="scope">
						<div>
							<p>采购总价:{{scope.row.cg_amount}}</p>
							<p>采购总数:{{scope.row.goods_count}}</p>
							<p>合同号:{{scope.row.contract_number}}</p>
							<p>采购单号:{{scope.row.cg_number}}</p>
							<p>供货单位:{{scope.row.vendor}}</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="仓库" prop="ware_name" />
				<el-table-column label="创建人" min-width="100" align="center" prop="cg_creator" />
				<el-table-column label="审核人" min-width="100" align="center" prop="auditor_user" />
				<el-table-column label="联系人" min-width="100" align="center" prop="contact_name" />
				<el-table-column label="采购单状态" min-width="100" align="center">
					<template slot-scope="scope">
						{{scope.row.cg_state==3?'待处理':scope.row.cg_state==1?'审核中':scope.row.cg_state==5?'未入库':scope.row.cg_state==8?'部分入库': scope.row.cg_state==11?'完成': scope.row.cg_state==17?'中止':'代发采购'}}
					</template>
				</el-table-column>
				<el-table-column label="结算状态">
					<template slot-scope="scope">
						{{scope.row.cg_paymentype == 1?'现金':scope.row.cg_paymentype == 2?'定期':scope.row.cg_paymentype == 3?'款到发货':scope.row.cg_paymentype == 4?'货到付款':scope.row.cg_paymentype == 5?'月结15天':scope.row.cg_paymentype == 6?'月结30天':'月结60天'}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="260" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button size="mini" plain v-if="Btnshow.submitToExamine&&scope.row.cg_state==3" type="primary" @click="submitToExamine(scope.row)" >提交审核</el-button>
						<el-button size="mini" plain v-if="Btnshow.toexamine&&scope.row.cg_state==1" type="primary"  @click="toexamine(scope.row)">审核</el-button>
						<el-button size="mini" plain v-if="Btnshow.EditEntryBtn&&scope.row.cg_state==3" type="primary"  @click="EditEntryBtn(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="tableData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="page" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
		<!--<<添加采购单-->
		<addPurchase v-if="adddeliveryMain" @listerToChild="addRetens()" />
		<!--<<添加采购单-->
		<!--<<编辑-->
		<eidtPurchase :cg_number="cg_number" v-if="editdeliveryMain" @listerToChild="addRetens()" />
		<!--<<编辑-->
		<!--<<审核-->
		<examinePurchas :cg_number="cg_number" v-if="examindeliveryMain" @listerToChild="addRetens()" />
		<!--<<审核-->
    </div>
</template>

<script>
import addPurchase from './components/addPurchase'; //添加组件
import eidtPurchase from './components/eidtPurchase'; //送货单
import examinePurchas from './components/examinePurchas'; //送货单

import { getSupplierData } from '@/api/commonAction'
import { PurchaseOrder_index,PurchaseOrder_SubmitReview, PurchaseOrder_exportData } from "@/api/PurchaseSystem"
export default {
	components: {
		addPurchase,
		eidtPurchase,
		examinePurchas
	},
    data() {
        return {
			// 采购单号
			cg_number:"",
			//添加组件
			adddeliveryMain:false,
			// 编辑组件
			editdeliveryMain:false,
			// 审核组件
			examindeliveryMain:false,
			// 加载
			loading:false,
			// 编辑
			deliveryList:true,
			// 列表数据
			tableData:[],
			// 供货单位LIst
			SupplierList:[],
			// 采购状态
			cg_stateList:[
				{id:'0',name:'全部'},
				{id:'3',name:'待处理'},
				{id:'1',name:'审核中'},
				{id:'5',name:'未入库'},
				{id:'8',name:'部分入库'},
				{id:'11',name:'完成'},
				{id:'18',name:'代发采购 '},				
			],
			// 结算状态
			cg_settlementypeList:[
				{id:'1',name:'待生成账单'},
				{id:'2',name:'待结算'},
				{id:'3',name:'全部'},
			],
			// 搜索条件
            formList:{
                cg_state:0,
				cg_number:'',
				dataTimes:[],
				dataTimest:[],
            },
			pageSize:0,//页数量
            totalNum:0,//总条数
            page:1,//页码
			// 按钮权限
			Btnshow:{},
			// 时间快捷
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			},
        }
    },
	created(){
		this.getinforData(this.page)
	},
	methods:{
		   // 获取列表
        getinforData(page){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let datadd = {};
            datadd = this.formList;
            if(this.formList.dataTimes.length != 0){
                datadd.create_start = this.formList.dataTimes[0];
                datadd.create_end = this.formList.dataTimes[1];
            }
			if(this.formList.dataTimest.length != 0){
				datadd.dh_start = this.formList.dataTimest[0];
				datadd.dh_end = this.formList.dataTimest[1];
			}
            datadd.page = page;
            PurchaseOrder_index(datadd).then(success=>{
                loading.close();
				for(var i=0;i<success.data.state_count.length;i++){
					for(var j=0;j<this.cg_stateList.length;j++){
						if(success.data.state_count[i].cg_state == this.cg_stateList[j].id){
							this.cg_stateList[j].num = success.data.state_count[i].num
						}
					}
				}
                if(success.data.code ==200){
                    this.tableData = success.data.data;
                    this.page = success.data.page.page;
                    this.pageSize = success.data.page.page_size;
                    this.totalNum = success.data.page.data_count;
                    
                    for(var i=0;i<success.data.button.length;i++){
                        let butdata = success.data.button[i];
                        if(butdata.action == 'Toexamine'){
                            this.Btnshow.toexamine = true;
                        }else if(butdata.action == 'SubmitReview'){
                            this.Btnshow.submitToExamine = true;
                        }else if(butdata.action == 'EditEntry'){
                            this.Btnshow.EditEntryBtn = true;
                        }else if(butdata.action == 'exportData'){
							this.Btnshow.exportBtn = true;
						}
                    }
                }else{
                    this.tableData = [];
                }
            }).catch(err=>{
				console.log(err)
                loading.close();
                this.$message({
                    message:'数据获取失败！',
                    type:'error',
                })
            })
        },
		// 匹配供货单位
        matchSupplier(e){
            this.loading = true;
            let datadd = {
                type:1,
                vendor:e
            }
            getSupplierData(datadd).then(success=>{
                this.loading = false;
                if(success.data.code == 200){
                    this.SupplierList = success.data.data;
                }else{
                    this.SupplierList = [];
                }
            }).catch(err=>{
                this.loading = false;
                this.$message({
                    message:'数据匹配失败！',
                    type:'error'
                })
            })
        },
		//添加采购单
		addBrandBtn() {
			this.adddeliveryMain = true
			this.deliveryList = false
		},
		// 添加返回
		addRetens(){
			this.adddeliveryMain = false;//添加组件
			this.editdeliveryMain = false;// 编辑组件
			this.examindeliveryMain = false;//审核组件
			this.deliveryList = true;
			this.getinforData(this.page)
		},
		// 导出
		exportBtn(){
			const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
			 let datadd = {};
            datadd = this.formList;
            if(this.formList.dataTimes.length != 0){
                datadd.create_start = this.formList.dataTimes[0];
                datadd.create_end = this.formList.dataTimes[1];
            }
			if(this.formList.dataTimest.length != 0){
				datadd.dh_start = this.formList.dataTimest[0];
				datadd.dh_end = this.formList.dataTimest[1];
			}
            datadd.page = this.page;
			PurchaseOrder_exportData(datadd).then(success=>{
				loading.close();
				let url = success.config.baseURL.split('public')[0];
				if(success.data.code == 200){
					window.location.href = url+success.data.data;
				}else{
					this.$message({
						message:success.data.data,
						type:'error'
					})
				}
			}).catch(err=>{
				loading.close()
				this.$message({
					message:'导出失败！',
					type:'error'
				})
			})
		},
		// 重置
		resetForm(){
			this.$refs.formList.resetFields();
			this.formList.amount_end = ''
		},
		// 状态
		distinguish(data) {
			this.formList.cg_state = data;
			this.getinforData(this.page)
		},
		toexamine(data){
			this.cg_number = data.cg_number;
			this.deliveryList = false;
			this.examindeliveryMain = true;
		},
		// 编辑
		EditEntryBtn(data){
			this.cg_number = data.cg_number;
			this.deliveryList = false;
			this.editdeliveryMain = true;
		},
		// 提交审核
		submitToExamine(data){
			this.$confirm('确定提交审核吗？, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let datadd = {};
				datadd.cg_number = data.cg_number;
				PurchaseOrder_SubmitReview(datadd).then(success=>{
					if(success.data.code == 200){
						this.$message({
							message:success.data.data,
							type:'success'
						});
						this.getinforData(this.page)
					}else{
						this.$message({
							message:success.data.data,
							type:'error'
						})
					}
				}).catch(err=>{
					this.$message({
						message:'提交审核失败！',
						type:'error'
					})
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消提交审核'
				});          
			});
		},
		// 翻页
		handleCurrentChange(e){
			this.getinforData(e);
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>