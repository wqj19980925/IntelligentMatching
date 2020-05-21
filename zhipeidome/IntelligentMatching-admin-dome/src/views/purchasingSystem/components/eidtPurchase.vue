<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">基本信息</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="订单日期" class="sd-form-item" prop="dataTimes">
							<el-date-picker v-model="dataTimes" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="订单编码:" prop="bra_name1">
							<el-input v-model="formList.bra_name1" placeholder="请输入订单编码" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="业务类型:" prop="bra_name2">
							<el-select v-model="formList.bra_name2" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo1" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="供应商:" prop="bra_name3">
							<el-input v-model="formList.bra_name3" placeholder="请输入供货商编号或简称识别" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="票据类型:" prop="bra_name4">
							<el-select v-model="formList.bra_name4" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo2" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="结算方式:" prop="bra_name5">
							<el-select v-model="formList.bra_name5" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo3" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交货方式:" prop="bra_name6">
							<el-select v-model="formList.bra_name6" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo4" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="仓库" class="sd-form-item" prop="bra_name7">
							<el-select v-model="formList.bra_name7" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo5" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="合同号" class="sd-form-item" prop="bra_name8">
							<el-input v-model="formList.bra_name8" placeholder="请输入合同号" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系人" class="sd-form-item" prop="bra_name9">
							<el-input v-model="formList.bra_name9" placeholder="请输入联系人" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="部门" class="sd-form-item" prop="bra_name10">
							<el-select v-model="formList.bra_name10" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo6" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="备注" class="sd-form-item" prop="bra_name11">
							<el-input v-model="formList.bra_name11" placeholder="请输入备注" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<!-- 列表 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">商品信息</div>
				<div class="buttonBox">
					<el-button plain type="danger" @click="edietsMain()">退货</el-button>
				</div>
			</div>
			<el-form v-if="edetsList" ref="loadingData" :model="loadingData" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="商品品牌" class="sd-form-item" prop="loadingData">
							<el-autocomplete style="width: 100%;" v-model="loadingData" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商品名称" class="sd-form-item" prop="loadingData2">
							<el-autocomplete style="width: 100%;" v-model="loadingData2" :fetch-suggestions="querySearchAsync3" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商品系列" class="sd-form-item" prop="loadingData3">
							<el-autocomplete style="width: 100%;" v-model="loadingData3" :fetch-suggestions="querySearchAsync3" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商品编号" class="sd-form-item" prop="loadingData4">
							<el-autocomplete style="width: 100%;" v-model="loadingData4" :fetch-suggestions="querySearchAsync4" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column width="50px" label="序号" prop="numbers" />
				<el-table-column label="商品品牌" prop="numbers1" />
				<el-table-column label="商品类目" prop="numbers2" />
				<el-table-column label="商品编码" prop="numbers3" />
				<el-table-column label="商品名称" prop="numbers4" />
				<el-table-column label="型号规格" prop="numbers5" />
				<el-table-column label="数量">
					<template slot-scope="scope">
						<el-input v-if="edetsList" v-model="scope.row.numbers6" placeholder="" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						<span v-else>{{scope.row.numbers6}}</span>
					</template>
				</el-table-column>
				<el-table-column label="单位" prop="numbers7" />
				<el-table-column label="单价">
					<template slot-scope="scope">
						<el-input v-if="edetsList" v-model="scope.row.numbers8" placeholder="" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						<span v-else>{{scope.row.numbers8}}</span>
					</template>
				</el-table-column>
				<el-table-column width="100px" label="税率">
					<template slot-scope="scope">
						<span v-if="edetsList"><el-input v-model="scope.row.numbers9" placeholder="" max="10" :maxlength="10" clearable class="mainIptSelBox" /> %</span>
						<span v-else>{{scope.row.numbers9}}  %</span>
					</template>
				</el-table-column>
				<el-table-column width="150px" label="币种">
					<template slot-scope="scope">
						<el-select v-if="edetsList" v-model="scope.row.numbers10" clearable class="mainIptSelBox">
							<el-option v-for="item in stateSelectInfo7" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
						<span v-else>{{scope.row.numbers10}}</span>
					</template>
				</el-table-column>
				<el-table-column label="金额">
					<template slot-scope="scope">
						<el-input v-if="edetsList" v-model="scope.row.numbers11" placeholder="" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						<span v-else>{{scope.row.numbers11}}</span>
					</template>
				</el-table-column>
				<el-table-column width="200px" label="预计到货时间">
					<template slot-scope="scope">
						<el-date-picker v-if="edetsList" style="width:150px" v-model="scope.row.numbers12" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
						</el-date-picker>
						<span v-else>{{scope.row.numbers12}}</span>
					</template>
				</el-table-column>-->
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope">
						<el-button size="mini" v-if="edetsList" plain type="danger">撤销</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
		<div style="height: 61px;"></div>
		<div class="bottomBtn">
						总金额	
			<el-input v-model="moneys" placeholder="" max="10" :maxlength="10" style="width: 100px; margin-left: 10px;"/><span style="color: red;">	*</span>
			<el-button type="primary" @click="addBrandBtn()">提交</el-button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				restaurants: [],
				state: '',
				moneys:'13700',
				timeout: null,
				formList: {
					state: 0,
					bra_name1: '961134545454541',
					bra_name2: 1,
					bra_name3: '瓦尔塔中国',
					bra_name4: 1,
					bra_name5: 1,
					bra_name6: 1,
					bra_name7: 1,
					bra_name8: '96891176016228',
					bra_name9: '宁国通',
					bra_name10: 1,
					bra_name11: '',
					bra_name12: '',
				},
				loadingData: '',
				loadingData2: '',
				loadingData3: '',
				loadingData4: '',
				listData: '',
				edetsList: false,
				dataTimes: '2020/04/22',
				dataTimest: '',
				tableData: [{
					numbers: '1',
					numbers1: '瓦尔塔',
					numbers2: '蓄电池',
					numbers3: '09113344455',
					numbers4: '瓦尔塔L-400',
					numbers5: '40w',
					numbers6: '2',
					numbers7: '个',
					numbers8: '100',
					numbers9: '17',
					numbers10: 1,
					numbers11: '200',
					numbers12: '2020/04/23',
				}, {
					numbers: '2',
					numbers1: '瓦尔塔',
					numbers2: '蓄电池',
					numbers3: '09113344455',
					numbers4: '瓦尔塔L-400',
					numbers5: '40w',
					numbers6: '10',
					numbers7: '个',
					numbers8: '50',
					numbers9: '6',
					numbers10: 1,
					numbers11: '500',
					numbers12: '2020/04/23',
				}, {
					numbers: '3',
					numbers1: '瓦尔塔',
					numbers2: '蓄电池',
					numbers3: '09113344455',
					numbers4: '瓦尔塔L-400',
					numbers5: '40w',
					numbers6: '100',
					numbers7: '个',
					numbers8: '100',
					numbers9: '22',
					numbers10: 1,
					numbers11: '10000',
					numbers12: '2020/04/23',
				}, {
					numbers: '4',
					numbers1: '瓦尔塔',
					numbers2: '蓄电池',
					numbers3: '09113344455',
					numbers4: '瓦尔塔L-400',
					numbers5: '40w',
					numbers6: '30',
					numbers7: '个',
					numbers8: '100',
					numbers9: '15',
					numbers10: 1,
					numbers11: '3000',
					numbers12: '2020/04/23',
				}],
				// 业务类型
				stateSelectInfo1: [{
						id: 1,
						name: '普通采购'
					},
					{
						id: 2,
						name: '样品采购'
					}
				],
				stateSelectInfo2: [{
						id: 1,
						name: '专用发票'
					},
					{
						id: 2,
						name: '普通发票'
					},
					{
						id: 3,
						name: '无'
					}

				],
				stateSelectInfo3: [{
						id: 1,
						name: '款到发货'
					},
					{
						id: 2,
						name: '货到付款'
					},
					{
						id: 3,
						name: '月结15天'
					},
					{
						id: 4,
						name: '月结30天'
					},
					{
						id: 5,
						name: '月结60天'
					}
				],
				stateSelectInfo4: [{
						id: 1,
						name: '送货上门'
					},
					{
						id: 2,
						name: '自提'
					}
				],
				stateSelectInfo5: [{
						id: 1,
						name: '天津仓'
					},
					{
						id: 2,
						name: '北京仓'
					}
				],
				stateSelectInfo6: [{
						id: 1,
						name: '采购部'
					},
					{
						id: 2,
						name: '运营部'
					}
				],
				stateSelectInfo7: [{
						id: 1,
						name: '人民币'
					},
					{
						id: 2,
						name: '美元'
					}
				],
				stateSelectInfo: [{
						id: 1,
						name: '启用'
					},
					{
						id: 2,
						name: '停用'
					}
				],
				listData: [], //信息列表
				chosed: '',
				currentPage: 1, //当前页码
				pageSize: null, //每页多少条
				totalNum: null, //总共多少条
				showAddClas: false, //弹框默认关闭
				AddClastitle: '', //弹框名称
				addClaSta: null, // 判断是新增还是编辑 1新增 2编辑
				// 新增表单
				addClaForm: {
					bra_name: '',
					bra_id: null
				},
				// 新增表单验证
				addClaRules: {
					bra_name: [{
						required: true,
						trigger: 'blur',
						message: '品牌名称不能为空'
					}]
				},
				// 按钮权限
				btnShow: {
					addBtn: false,
					editBtn: false,
					startBtn: false,
					stopBtn: false
				},

			}
		},
		created() {},
		methods: {
			loadAll() {
				return [{
						"value": "3M-BZ-QHYGM-002   3M-铂智-浅色-售后1个门-其他-通用",
					},
					{
						"value": "6935693900075111    瓦尔塔-瓦尔塔礼品-碧然德水壶-其他-普通",
					},
				];
			},
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				cb(results);

			},
			createStateFilter(queryString) {
				return(loadingData) => {
					return(loadingData.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			querySearchAsync2(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter2(queryString)) : restaurants;
				cb(results);
			},
			createStateFilter2(queryString) {
				return(loadingData2) => {
					return(loadingData2.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			querySearchAsync3(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter3(queryString)) : restaurants;
				cb(results);
			},
			createStateFilter3(queryString) {
				return(loadingData3) => {
					return(loadingData3.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			querySearchAsync4(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter4(queryString)) : restaurants;
				cb(results);
			},
			createStateFilter4(queryString) {
				return(loadingData4) => {
					return(loadingData4.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				console.log(item);
			},
			back() {
				this.$parent.postOrderListMsg1();
			},
			edietsMain() {
                this.edetsList=true
			}
		},
		mounted() {
			this.restaurants = this.loadAll();
		}
	}
</script>
<style>
	.el-autocomplete-suggestion {
		width: 500px !important;
	}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
	.bottomBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		background-color: #FFFFFF;
		height: 60px;
		padding: 10px 0;
		border-top: 1px solid #dddddd;
		z-index: 99;
		right: 0;
	}
	
	.receivListes-header {
		margin: 10px 0 0 0;
		.orhead-orbi_state {
			display: flex;
			align-items: center;
			.orhead-ord_service_states {
				padding: 0 10px;
			}
			.sd-module-btn {
				color: #666;
				.el-tab-order {
					display: inline-block;
					width: 120px;
					height: 34px;
					font-size: 14px;
					border: 1px solid #ccc;
					border-radius: 4px;
					text-align: center;
					line-height: 34px;
					cursor: pointer;
				}
				.el-tab-order.on {
					color: #409eff;
					border: 1px solid #409eff;
				}
			}
		}
	}
</style>