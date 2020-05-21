<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
					<el-button plain type="danger">导出</el-button>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="采购单号:" prop="bra_name">
							<el-input v-model="formList.bra_name" placeholder="请输入采购单号" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="供货单位:" prop="bra_name1">
							<el-select v-model="formList.bra_name1" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="创建人:" prop="bra_name2">
							<el-input v-model="formList.bra_name2" placeholder="请输入创建人" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="包含产品:" prop="bra_name4">
							<el-input v-model="formList.bra_name4" placeholder="请输入包含产品" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="总金额:" prop="bra_name5">
							<el-input style="width: 40%;" v-model="formList.bra_name5" placeholder="最小值" max="10" :maxlength="10" clearable/> -
							<el-input style="width: 40%;" v-model="formList.bra_name6" placeholder="最大值" max="10" :maxlength="10" clearable/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="创建时间" class="sd-form-item" prop="dataTimes">
							<el-date-picker v-model="dataTimes" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<div class="plr-10 fr">
						<el-button class type="primary">搜&nbsp;&nbsp;索</el-button>
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
						<el-table :data="props.row.tableLastData" style="width: 100%">
							<el-table-column label="序号" prop="numbermain" />
							<el-table-column label="商品品牌" prop="numbermain1" />
							<el-table-column label="商品类目" prop="numbermain2" />
							<el-table-column label="商品编码" prop="numbermain3" />
							<el-table-column width='300px' label="商品名称" prop="numbermain4" />
							<el-table-column label="型号规格" prop="numbermain5" />
							<el-table-column label="数量" prop="numbermain6" />
							<el-table-column label="单位" prop="numbermain7" />
							<el-table-column label="单价" prop="numbermain8" />
							<el-table-column label="税率" prop="numbermain9" />
							<el-table-column label="币种" prop="numbermain10" />
							<el-table-column label="金额" prop="numbermain11" />
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="合同号" prop="numbers5" />
				<el-table-column label="采购单号" prop="numbers" />
				<el-table-column width='300px' label="供货单位" prop="numbers1" />
				<el-table-column label="采购总价" prop="numbers2" />
				<el-table-column label="采购总数" prop="numbers3" />
				<el-table-column label="仓库" prop="numbers4" />
				<el-table-column label="创建人" prop="numbers6" />
				<el-table-column label="审核人" prop="numbers7" />
				<el-table-column label="联系人" prop="numbers8" />
				<el-table-column label="操作" width="260" align="center">
					<template slot-scope="scope">
						<el-button size="mini" plain type="primary" @click="addBrandBtn2()">转采购</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
		<!--<<编辑-->
		<eidtPurchaseTwo v-if="deliveryMain1" @listerToChild="postOrderListMsg1()" />
		<!--<<编辑-->
	</div>
</template>
<script>
	import eidtPurchaseTwo from './components/eidtPurchaseTwo'; //送货单
	export default {
		components: {
			eidtPurchaseTwo
		},
		data() {
			return {
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
				formList: {
					state: 0,
					bra_name1: '',
					bra_name2: '',
					bra_name3: '',
					bra_name4: '',
					bra_name5: '',
					bra_name6: '',
					bra_name7: '',
				},
				listData: '',
				dataTimes: '',
				dataTimest: '',
				deliveryMain: false,
				deliveryMain1: false,
				deliveryMain2: false,
				deliveryList: true,
				tableData: [{
					numbers: 'CG202004211668542331',
					numbers1: '明尼苏达矿业制造特殊材料（上海）有限公司',
					numbers2: '6000',
					numbers3: '30',
					numbers4: '天津仓',
					numbers5: '152486541952',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '待处理',
					numbers10: '待结算',
					tableLastData: [{
							numbermain: "1",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111452",
							numbermain4: "瓦尔塔蓝标L-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "100",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "1000",
							numbermain12: "2020/4/8",
						},
						{
							numbermain: "2",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111480",
							numbermain4: "瓦尔塔黑标L2-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "200",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "2000",
							numbermain12: "2020/4/8",
						},
						{
							numbermain: "3",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111479",
							numbermain4: "瓦尔塔L3-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "300",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "3000",
							numbermain12: "2020/4/8",
						}
					],
				}, {
					numbers: 'CG202004211668544527',
					numbers1: '明尼苏达矿业制造特殊材料（上海）有限公司',
					numbers2: '6000',
					numbers3: '30',
					numbers4: '天津仓',
					numbers5: '152486541648',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '审核中',
					numbers10: '待结算',
					tableLastData: [{
							numbermain: "1",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111452",
							numbermain4: "瓦尔塔蓝标L-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "100",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "1000",
							numbermain12: "2020/4/8",
						},
						{
							numbermain: "2",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111480",
							numbermain4: "瓦尔塔黑标L2-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "200",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "2000",
							numbermain12: "2020/4/8",
						},
						{
							numbermain: "3",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111479",
							numbermain4: "瓦尔塔L3-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "300",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "3000",
							numbermain12: "2020/4/8",
						}
					],
				}, {
					numbers: 'CG202004211668578456',
					numbers1: '明尼苏达矿业制造特殊材料（上海）有限公司',
					numbers2: '6000',
					numbers3: '30',
					numbers4: '天津仓',
					numbers5: '152486541335',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '待入库',
					numbers10: '待结算',
					tableLastData: [{
							numbermain: "1",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111452",
							numbermain4: "瓦尔塔蓝标L-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "100",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "1000",
							numbermain12: "2020/4/8",
						},
						{
							numbermain: "2",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111480",
							numbermain4: "瓦尔塔黑标L2-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "200",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "2000",
							numbermain12: "2020/4/8",
						},
						{
							numbermain: "3",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111479",
							numbermain4: "瓦尔塔L3-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "10",
							numbermain7: "个",
							numbermain8: "300",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "3000",
							numbermain12: "2020/4/8",
						}
					],
				}],
				// 状态
				stateSelectInfo: [{
						id: 1,
						name: '慧祥泽商贸有限公司'
					},
					{
						id: 2,
						name: '3M中国有限公司'
					}
				],
				stateSelectInfo1: [
				    {
						id: 1,
						name: '待处理'
					},{
						id: 2,
						name: '审核中'
					},
					{
						id: 3,
						name: '待入库'
					},
					{
						id: 4,
						name: '部分入库'
					},
					{
						id: 5,
						name: '已入库'
					}
				],
				stateSelectInfo2: [{
						id: 1,
						name: '待生成账单'
					},
					{
						id: 2,
						name: '待结算'
					},
					{
						id: 3,
						name: '已结算'
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
						}
						// { min: 1, max: 20, message: '品牌名称过长,字数不可超过20', trigger: 'blur' }
					]
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
			resetForm() {
				this.formList = {
					state: 0,
					bra_name1: '',
					bra_name2: '',
					bra_name3: '',
					bra_name4: '',
					bra_name5: '',
					bra_name5: '',
				}
			},
			//退出添加采购单
			postOrderListMsg() {
				this.deliveryMain = false
				this.deliveryList = true
			},
			postOrderListMsg1() {
				this.deliveryMain1 = false
				this.deliveryList = true
			},
			postOrderListMsg2() {
				this.deliveryMain2 = false
				this.deliveryList = true
			},
			//退出添加采购单
			addBrandBtn() {
				this.deliveryMain = true
				this.deliveryList = false
			},
			addBrandBtn2() {
				this.deliveryMain1 = true
				this.deliveryList = false
			},
			addBrandBtn3() {
				this.deliveryMain2 = true
				this.deliveryList = false
			},
			distinguish(data) {
				this.formList.state = data
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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