<template>
    <div>
      <!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="wareInorShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
					<el-button plain v-if="Btnshow.exportBtn" type="danger" @click="exportBtn">导出</el-button>
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
						<el-form-item label="入库单号:" prop="rk_number">
							<el-input v-model="formList.rk_number" placeholder="请输入采购单号"  clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="创建人:" prop="cg_creator">
							<el-input v-model="formList.cg_creator" placeholder="请输入创建人" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="包含产品:" prop="goods_name">
							<el-input v-model="formList.goods_name" placeholder="请输入包含产品" max="10" :maxlength="10" clearable class="mainIptSelBox" />
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
		<el-row class="mainContentItemBox" v-if="wareInorShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">入库列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%" class="tabelDatas">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table :data="props.row.storage_goods"  style="width: 82%" class="tabelDatas">
							<el-table-column label="序号" min-width="60" align="center">
								<template slot-scope="scope">
									{{scope.$index+1}}
								</template>
							</el-table-column>
							<el-table-column label="商品信息" prop="" min-width="300">
								<template slot-scope="scope">
									<div>
										<p>商品品牌:{{scope.row.brand_name}}</p>
										<p>商品类目:{{scope.row.sort_directory}}</p>
										<p>商品编码:{{scope.row.general_version}}</p>
										<p>商品名称:{{scope.row.goods_name}}</p>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="采购数量" align="center"  prop="goods_num" />
							<el-table-column label="入库数量" align="center" prop="ruku_num" />
							<el-table-column label="单位" align="center" prop="company_unit" />
							<el-table-column label="预计到货时间" min-width="150" align="center"  prop="estimate_time" />
							<el-table-column label="实际到货时间" min-width="150" align="center"  prop="dh_time" />
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="入库信息" min-width="300" align="left" prop="cg_number" >\
                    <template slot-scope="scope">
                        <div>
                            <p>采购总数:{{scope.row.goods_count}}</p>
                            <p>采购单号:{{scope.row.cg_number}}</p>
                            <p>供货单位:{{scope.row.vendor}}</p>
                        </div>
                    </template>
                </el-table-column>			
				<el-table-column label="到货总数" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.ruku_num}} + {{scope.row.daifa_num}}
                    </template>
                </el-table-column>
				<el-table-column label="仓库" align="center" prop="ware_name" />
				<el-table-column label="创建人" min-width="100" prop="cg_creator" />
				<el-table-column label="审核人" min-width="100" prop="auditor_user" />
				<el-table-column label="联系人" align="center" min-width="100" prop="contact_name" />
				<el-table-column label="采购单状态" align="center" min-width="100">
					<template slot-scope="scope">
						<!-- {{scope.row.cg_state==3?'待处理':scope.row.cg_state==1?'审核中':scope.row.cg_state==5?'未入库':scope.row.cg_state==8?'部分入库': scope.row.cg_state==11?'完成': scope.row.cg_state==17?'中止':'代发采购'}} -->
						{{scope.row.cg_state==5?'未入库':scope.row.cg_state==8?'部分入库': '完成'}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="270" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button size="mini" plain v-if="Btnshow.recordBtn&&scope.row.cg_state != 5" type="primary" @click="recordBtn(scope.row)" >记录</el-button>
						<el-button size="mini" plain type="primary" v-if="Btnshow.WarehousingBtn&&scope.row.cg_state != 11" @click="WarehousingBtn(scope.row)">入库</el-button>
						<el-button size="mini" plain type="primary" v-if="Btnshow.returnGoodsBtn&&scope.row.cg_state != 5" @click="returnGoodsBtn(scope.row)">退货</el-button>
						<el-button size="mini" plain type="primary" v-if="Btnshow.exchanGoodsBtn&&scope.row.cg_state != 5" @click="exchanGoodsBtn(scope.row)">换货</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="tableData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="page" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row> 
        <!-- 记录 -->
        <record-list v-if="recordShow" :cg_number="cg_number" @listerToChild="returnFun"></record-list>
        <!-- 入库 -->
        <stockIn-list v-if="stockInShow" :cg_number="cg_number" @listerToChild="returnFun"></stockIn-list>
        <!-- 退货 -->
        <return-goods v-if="returnShow" :cg_number="cg_number" @listerToChild="returnFun"></return-goods>
        <!-- 换货 -->
        <change-goods v-if="changeShow" :cg_number="cg_number" @listerToChild="returnFun"></change-goods>
    </div>
</template>

<script>
import {getSupplierData} from "@/api/commonAction"
import {WareInorder_index,WareInorder_exportData} from "@/api/StorageSystem"
import StockInList from "./components/StockInList"
import recordList from "./components/recordList"
import returnGoods from './components/returnGoods'
import changeGoods from './components/changeGoods'
export default {
    components:{
        recordList,StockInList,returnGoods,changeGoods
    },
    data() {
        return {
            // child数据
            cg_number:'',
            // 父组件show
            wareInorShow:true,
            // 记录show
            recordShow:false,
            // 入库show
            stockInShow:false,
            // 换货Show
            changeShow:false,
            // 退货show
            returnShow:false,
            // 加载
            loading:false,
            // 状态
            cg_stateList:[
                {name:'全部',id:'0'},
                {name:'未入库',id:'5'},
                {name:'部分入库',id:'8'},
                {name:'完成',id:'11'},
            ],
            // 供应商List
            SupplierList:[],
            // 列表数据
            tableData:[],
            // form 数据
            formList:{
                cg_number:'',
                cg_supplyunit:"",
                rk_number:'',
                cg_creator:"",
                goods_name:'',
                dataTimes:[],
                dataTimest:[],
                cg_state:0,
            },
            // 权限Btn
            Btnshow:{},
            pickerOptions:{
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
            pageSize:0,//页数量
            totalNum:0,//总条数
            page:1,//页码
        }
    },
    created(){
        this.getinforData(this.page)
    },
    methods:{
        // 获取数据
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
            datadd.page = this.page;
            WareInorder_index(datadd).then(success=>{
                loading.close();
                for(var i=0;i<success.data.state_count.length;i++){
					for(var j=0;j<this.cg_stateList.length;j++){
						if(success.data.state_count[i].cg_state == this.cg_stateList[j].id){
							this.cg_stateList[j].num = success.data.state_count[i].num
						}
					}
				}
                if(success.data.code == 200){
                    this.tableData = success.data.data;
                    this.page = success.data.page.page;
                    this.pageSize = success.data.page.page_size;
                    this.totalNum = success.data.page.data_count;
                     for(var i=0;i<success.data.button.length;i++){
                        let butdata = success.data.button[i];
                        if(butdata.action == 'WareRecord'){
                            this.Btnshow.recordBtn = true;
                        }else if(butdata.action == 'Warehousing'){
                            this.Btnshow.WarehousingBtn = true;
                        }else if(butdata.action == 'returnGoods'){
                            this.Btnshow.returnGoodsBtn = true;
                        }else if(butdata.action == 'exportData'){
							this.Btnshow.exportBtn = true;
						}else if(butdata.action == 'exchanGoods'){
							this.Btnshow.exchanGoodsBtn = true;
						}
                    }
                }else{
                    this.tableData = [];
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:'数据获取失败！',
                    type:'error'
                })
            })
        },
        // 重置
        resetForm(){
			this.$refs.formList.resetFields();
        },
        // 记录
        recordBtn(data){
            this.wareInorShow = false;
            this.recordShow = true;
            this.cg_number = data.cg_number;
        },
        // 入库
        WarehousingBtn(data){
            this.cg_number = data.cg_number;
            this.wareInorShow = false;
            this.stockInShow = true;
        },
        // 退货
        returnGoodsBtn(data){
            this.cg_number = data.cg_number;
            this.wareInorShow = false;
            this.returnShow = true;
        },
        // 换货
        exchanGoodsBtn(data){
            this.cg_number = data.cg_number;
            this.wareInorShow = false;
            this.changeShow = true;
        },
        // 子组件返回
        returnFun(){
            this.getinforData(this.page)
            this.stockInShow = false;
            this.recordShow = false;
            this.returnShow = false;
            this.changeShow = false;
            this.wareInorShow = true;
        },
        // 状态
		distinguish(data) {
			this.formList.cg_state = data;
			this.getinforData(this.page)
		},
        // 翻页
		handleCurrentChange(e){
			this.getinforData(e);
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
            datadd.page = this.page;
			WareInorder_exportData(datadd).then(success=>{
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
    }
}
</script>
<style lang="scss">
    
</style>