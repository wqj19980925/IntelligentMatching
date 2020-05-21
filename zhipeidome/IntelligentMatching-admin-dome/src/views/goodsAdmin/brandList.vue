<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="addBrandBtn()">新增</el-button>
					<el-button plain type="danger">导出</el-button>
					<el-button plain type="danger">生成账单</el-button>
				</div>
			</div>
			<div class="receivListes-header">
				<div class="orhead-orbi_state">
					<span class="orhead-ord_service_states" style="padding-left: 35px;">状态</span>
					<div class="sd-module-btn">
						<div :class="formList.state === 0?'el-tab-order on':' el-tab-order'" @click="distinguish(0)">全部&nbsp;</div>
						<div :class="formList.state === 3?'el-tab-order on':' el-tab-order'" @click="distinguish(3)">
							备货中(<span style="color:red;">4</span>)
						</div>
						<div :class="formList.state === 4?'el-tab-order on':' el-tab-order'" @click="distinguish(4)">
							发货中(<span style="color:red;">0</span>)
						</div>
						<div :class="formList.state === 1?'el-tab-order on':' el-tab-order'" @click="distinguish(1)">
							部分发货(<span style="color:red;">0</span>)
						</div>
						<div :class="formList.state === 6?'el-tab-order on':' el-tab-order'" @click="distinguish(6)">
							完成(<span style="color:red;">0</span>)
						</div>
					</div>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="分销单号:" prop="bra_name">
							<el-input v-model="formList.bra_name" placeholder="请输入采购单号" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="分销单位:" prop="bra_name1">
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
					<el-col :span="6">
						<el-form-item label="分销状态:" prop="bra_name3">
							<el-select v-model="formList.bra_name3" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo1" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="包含产品:" prop="bra_name4">
							<el-input v-model="formList.bra_name4" placeholder="请输入包含产品" max="10" :maxlength="10" clearable class="mainIptSelBox" />
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
				<div class="titleNameBox">分销列表</div>
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
							<el-table-column label="已发货数量" prop="numbermain13" />
							<el-table-column label="单位" prop="numbermain7" />
							<el-table-column label="单价" prop="numbermain8" />
							<el-table-column label="税率" prop="numbermain9" />
							<el-table-column label="币种" prop="numbermain10" />
							<el-table-column label="金额" prop="numbermain11" />
							<el-table-column label="预计到货时间" prop="numbermain12" />
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="合同号" prop="numbers5" />
				<el-table-column label="分销单号" prop="numbers" />
				<el-table-column width='300px' label="分销单位" prop="numbers1" />
				<el-table-column label="总价" prop="numbers2" />
				<el-table-column label="总数" prop="numbers3" />
				<el-table-column label="已发货总数" prop="numbers10" />
				<el-table-column label="仓库" prop="numbers4" />
				<el-table-column label="创建人" prop="numbers6" />
				<el-table-column label="联系人" prop="numbers8" />
				<el-table-column label="分销状态" prop="numbers9" />
				<el-table-column label="操作" width="340" align="center">
					<template slot-scope="scope">
						<el-button size="mini" plain type="primary" v-if="scope.row.numbers9=='备货中'" @click="addBrandBtn1()">备货</el-button>
						<el-button size="mini" plain type="primary" v-if="scope.row.numbers9=='发货中'">发货</el-button>
						<el-button size="mini" plain type="success" v-if="scope.row.numbers9!='备货中' && scope.row.numbers9!='发货中'" @click="addBrandBtn2()">发货记录</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
		<!--<<添加采购单-->
		<addPurchase v-if="deliveryMain" @listerToChild="postOrderListMsg()"/>
		<!--<<添加采购单-->
		<!--<<备货单-->
		<stockPurchase v-if="deliveryMain1" @listerToChild="postOrderListMsg1()"/>
		<!--<<备货单-->
		<!--<<入库记录-->
		<warehousingList v-if="deliveryMain2" @listerToChild="postOrderListMsg1()"/>
		<!--<<入库记录-->
	</div>
</template>
<script>
	import addPurchase from './components/addPurchase'; //送货单
	import stockPurchase from './components/stockPurchase'; //备货单
	import warehousingList from './components/warehousingList'; //备货单
	export default {
		components: {
			addPurchase,
			stockPurchase,
			warehousingList
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
					bra_name5: '',
				},
				listData: '',
				dataTimes: '',
				dataTimest: '',
				deliveryMain: false,
				deliveryMain1: false,
				deliveryMain2: false,
				deliveryList:true,
				tableData: [{
					numbers: 'CG20200421100421504',
					numbers1: '明尼苏达矿业制造特殊材料（上海）有限公司',
					numbers2: '6000',
					numbers3: '300',
					numbers4: '天津仓',
					numbers5: '95595958144',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '部分发货',
					numbers10: '100',
					tableLastData: [{
							numbermain: "1",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111452",
							numbermain4: "瓦尔塔蓝标L-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "100",
							numbermain7: "个",
							numbermain8: "100",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "1000",
							numbermain12: "2020/4/8",
							numbermain13: "100",
						},
						{
							numbermain: "2",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111480",
							numbermain4: "瓦尔塔黑标L2-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "100",
							numbermain7: "个",
							numbermain8: "200",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "2000",
							numbermain12: "2020/4/8",
							numbermain13: "0",
						},
						{
							numbermain: "3",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "960011114414",
							numbermain4: "瓦尔塔L3-400瓦尔塔黑标L2-400",
							numbermain5: "40w",
							numbermain6: "100",
							numbermain7: "个",
							numbermain8: "300",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "3000",
							numbermain12: "2020/4/8",
							numbermain13: "0",
						}
					],
				}, {
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '4399',
					numbers3: '248',
					numbers4: '天津仓',
					numbers5: '95595958144',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '发货中',
					numbers10: '0',
				}, {
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '6000',
					numbers3: '300',
					numbers4: '天津仓',
					numbers5: '95595958144',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '部分发货',
					numbers10: '100',
				}, {
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '4399',
					numbers3: '248',
					numbers4: '天津仓',
					numbers5: '95595958144',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '备货中',
					numbers10: '0',
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
				stateSelectInfo1: [{
						id: 1,
						name: '备货中'
					},
					{
						id: 2,
						name: '发货中'
					},
					{
						id: 3,
						name: '部分发货'
					},
					{
						id: 3,
						name: '完成'
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
			resetForm(){
				this.formList ={
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
			addBrandBtn1() {
				this.deliveryMain1 = true
				this.deliveryList = false
			},
			addBrandBtn2() {
				this.deliveryMain2 = true
				this.deliveryList = false
			},
			distinguish(data){
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