<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
					<el-button plain type="primary">导入</el-button>
					<el-button plain type="danger">导出</el-button>
				</div>
			</div>
			<div class="receivListes-header">
				<div class="orhead-orbi_state">
					<span class="orhead-ord_service_states" style="padding-left: 35px;">状态</span>
					<div class="sd-module-btn">
						<div :class="formList.state === 0?'el-tab-order on':' el-tab-order'" @click="distinguish(0)">全部&nbsp;</div>
						<div :class="formList.state === 1?'el-tab-order on':' el-tab-order'" @click="distinguish(1)">
							待审核(<span style="color:red;">1</span>)
						</div>
						<div :class="formList.state === 2?'el-tab-order on':' el-tab-order'" @click="distinguish(2)">
							未结款(<span style="color:red;">1</span>)
						</div>
						<div :class="formList.state === 3?'el-tab-order on':' el-tab-order'" @click="distinguish(3)">
							部分结款(<span style="color:red;">1</span>)
						</div>
						<div :class="formList.state === 4?'el-tab-order on':' el-tab-order'" @click="distinguish(4)">
							已结款(<span style="color:red;">1</span>)
						</div>
					</div>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="流水号:" prop="bra_name">
							<el-input v-model="formList.bra_name" placeholder="请输入流水号" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="来往单位:" prop="bra_name1">
							<el-select v-model="formList.bra_name1" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="结款状态:" prop="bra_name3">
							<el-select v-model="formList.bra_name3" clearable class="mainIptSelBox">
								<el-option v-for="item in stateSelectInfo1" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="创建人:" prop="bra_name2">
							<el-input v-model="formList.bra_name2" placeholder="请输入创建人" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="创建时间" class="sd-form-item" prop="dataTimes">
							<el-date-picker v-model="dataTimes" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="结款时间" class="sd-form-item" prop="dataTimest">
							<el-date-picker v-model="dataTimest" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
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
				<div class="titleNameBox">账单列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column width='200px' label="账单编号" prop="numbers" />
				<el-table-column label="单量" prop="numbers3" />
				<el-table-column width='300px' label="来往单位" prop="numbers1" />
				<el-table-column label="结款金额" prop="numbers2" />
				<el-table-column label="联系人" prop="numbers8" />
				<el-table-column label="联系电话" prop="numbers4" />
				<el-table-column width='200px' label="起止日期" prop="numbers5" />
				<el-table-column label="结款状态" prop="numbers9" />
				<el-table-column label="操作" width="280" align="center">
					<template slot-scope="scope">
						<!--<el-button size="mini" plain type="primary" v-if="scope.row.numbers9 == '部分结款'" @click="addBrandBtn()">结款</el-button>
						<el-button size="mini" plain type="primary" v-if="scope.row.numbers9 == '已结款'" @click="addBrandBtn1()">结款记录</el-button>-->
						<el-button size="mini" plain type="primary" v-if="scope.row.numbers9 == '待审核'" @click="addBrandBtns()">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
		<!--<<审核-->
		<warehousingList v-if="deliveryMain2" @listerToChild="postOrderListMsg2()" />
		<!--审核>>-->
		<!--<<结款-->
		<warehousingListTwo v-if="deliveryMain" @listerToChild="postOrderListMsg2()" />
		<!--结款>>-->
		<!--<<结款记录-->
		<warehousingListTree v-if="deliveryMain3" @listerToChild="postOrderListMsg3()" />
		<!--结款记录>>-->
	</div>
</template>
<script>
	import warehousingList from './components/warehousingList'; //审核
	import warehousingListTwo from './components/warehousingListTwo'; //结款
	import warehousingListTree from './components/warehousingListTree'; //结款记录
	export default {
		components: {
			warehousingList,
			warehousingListTwo,
			warehousingListTree
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
				deliveryMain2: false,
				deliveryMain3: false,
				deliveryMain4: false,
				deliveryList: true,
				tableData: [{
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '200',
					numbers3: '3',
					numbers4: '18637856655',
					numbers5: '2020/04/01-2020/04/29',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '部分结款',
				}, {
					numbers: 'CG2020042110042150',
					numbers1: '明尼苏达矿业制造特殊材料（上海）有限公司',
					numbers2: '300',
					numbers3: '4',
					numbers4: '17601622981',
					numbers5: '2020/04/01-2020/04/29',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '待审核',
					
				}, {
					numbers: 'CG2020033123551324',
					numbers1: '中国矿业制造特殊材料（北京）有限公司',
					numbers2: '400',
					numbers3: '5',
					numbers4: '16695215584',
					numbers5: '2020/04/01-2020/04/29',
					numbers6: '李贤举',
					numbers7: '赵超',
					numbers8: '宁国通',
					numbers9: '已结款',
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
						name: '待审核'
					},
					{
						id: 2,
						name: '待结款'
					},
					{
						id: 3,
						name: '部分结款'
					},
					{
						id: 4,
						name: '已结款'
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
			//退出
			postOrderListMsg2() {
				this.deliveryMain2 = false
				this.deliveryList = true
			},
			//退出
			postOrderListMsg3() {
				this.deliveryMain3 = false
				this.deliveryList = true
			},
			//退出
			postOrderListMsg4() {
				this.deliveryMain4 = false
				this.deliveryList = true
			},
			//添加采购单
			addBrandBtn() {
				this.deliveryMain = true
				this.deliveryList = false
			},
			//入库记录
			addBrandBtns() {
				this.deliveryMain2 = true
				this.deliveryList = false
			},
			//入库记录
			addBrandBtn1() {
				this.deliveryMain3 = true
				this.deliveryList = false
			},
			//退出
			addBrandBtns4() {
				this.deliveryMain4 = true
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