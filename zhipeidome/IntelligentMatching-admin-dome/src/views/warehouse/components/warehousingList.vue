<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">基本信息</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">通过</el-button>
					<el-button plain type="danger" @click="back()">驳回</el-button>
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>

			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="流水号:" prop="bra_name">
							{{formList.bra_name}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="来往单位:" prop="bra_name1">
							{{formList.bra_name1}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="创建人:" prop="bra_name2">
							{{formList.bra_name2}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="结款金额:" prop="bra_name5">
							{{formList.bra_name5}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="备注:" prop="bra_name6">
							<el-input v-model="bra_name6" placeholder="" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<!-- 列表 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">子单列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table :data="props.row.tableLastData" style="width: 100%">
							<el-table-column width='60px' label="序号" prop="numbermain" />
							<el-table-column label="商品品牌" prop="numbermain1" />
							<el-table-column label="商品类目" prop="numbermain2" />
							<el-table-column label="商品编码" prop="numbermain3" />
							<el-table-column width='300px' label="商品名称" prop="numbermain4" />
							<el-table-column label="采购价" prop="numbermain5" />
							<el-table-column label="采购数量" prop="numbermain6" />
							<el-table-column label="单位" prop="numbermain8" />
							<el-table-column label="单品总价" prop="numbermain12" />
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="单号" prop="numbers" />
				<el-table-column label="金额" prop="numbers2" />
				<el-table-column label="操作人" prop="numbers8" />
				<el-table-column label="操作时间" prop="numbers7" />
			</el-table>
			<div v-if="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
	</div>
</template>
<script>
	export default {
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
					bra_name: 'CG2020033123551324',
					bra_name1: '中国矿业制造特殊材料（北京）有限公司',
					bra_name2: '李贤举',
					bra_name3: '天津仓',
					bra_name4: '300',
					bra_name5: '300',
				},
				listData: '',
				dataTimes: '',
				dataTimest: '',
				deliveryMain: false,
				deliveryList: true,
				tableData: [ {
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '100',
					numbers3: '248',
					numbers4: '天津仓',
					numbers5: '95595958144',
					numbers6: '李贤举',
					numbers7: '2020/04/23',
					numbers8: '宁国通',
					numbers9: '0',
					tableLastData: [{
							numbermain: "1",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111452",
							numbermain4: "瓦尔塔蓝标L-400瓦尔塔黑标L2-400",
							numbermain5: "10",
							numbermain6: "10",
							numbermain7: "",
							numbermain8: "个",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "996",
							numbermain12: "100",
						}
					],
				}, {
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '100',
					numbers3: '248',
					numbers4: '天津仓',
					numbers5: '95595958144',
					numbers6: '李贤举',
					numbers7: '2020/4/8',
					numbers8: '宁国通',
					numbers9: '0',
					tableLastData: [{
							numbermain: "1",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111452",
							numbermain4: "瓦尔塔蓝标L-400瓦尔塔黑标L2-400",
							numbermain5: "10",
							numbermain6: "10",
							numbermain7: "",
							numbermain8: "个",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "996",
							numbermain12: "100",
						}
					],
				}, {
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '100',
					numbers3: '248',
					numbers4: '天津仓',
					numbers5: '95595958144',
					numbers6: '李贤举',
					numbers7: '2020/4/8',
					numbers8: '宁国通',
					numbers9: '0',
					tableLastData: [
						{
							numbermain: "1",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "96001111480",
							numbermain4: "瓦尔塔黑标L2-400瓦尔塔黑标L2-400",
							numbermain5: "2",
							numbermain6: "20",
							numbermain7: "2020/4/8",
							numbermain8: "张",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "996",
							numbermain12: "40",
						},
						{
							numbermain: "2",
							numbermain1: "瓦尔塔",
							numbermain2: "蓄电池",
							numbermain3: "960011114414",
							numbermain4: "瓦尔塔L3-400瓦尔塔黑标L2-400",
							numbermain5: "6",
							numbermain6: "10",
							numbermain7: "2020/4/8",
							numbermain8: "块",
							numbermain9: "17%",
							numbermain10: "人民币",
							numbermain11: "996",
							numbermain12: "60",
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
				stateSelectInfo1: [{
						id: 1,
						name: '审核中'
					},
					{
						id: 2,
						name: '待入库'
					},
					{
						id: 3,
						name: '部分入库'
					},
					{
						id: 3,
						name: '已入库'
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
			back() {
				this.$parent.postOrderListMsg2();
			},
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