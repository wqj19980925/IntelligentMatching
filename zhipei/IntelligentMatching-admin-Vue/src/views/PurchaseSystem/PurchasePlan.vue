<template>
    <div>
        <!-- 信息筛选 -->
        <div class="mainContentItemBox" v-if="deliveryList">
            <div class="mainHeaderTitleBox">
                <div class="titleNameBox">信息筛选</div>
                <div class="buttonBox">
                    <el-button plain v-if="Btnshow.exportBtn" @click="exportBtn" type="danger">导出</el-button>
                </div>
            </div>
            <el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="采购单号:" prop="cg_number">
                            <el-input v-model="formList.cg_number" placeholder="请输入采购单号" max="25" :maxlength="25" clearable class="mainIptSelBox" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供货单位:" prop="cg_supplyunit">
                            <el-select
                                v-model="formList.cg_supplyunit"
                                filterable
                                remote
                                clearable
                                reserve-keyword
                                placeholder="请输入供货单位"
                                :remote-method="matchSupplier"
                                class="mainIptSelBox"
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
                            <el-input v-model="formList.cg_creator" placeholder="请输入创建人" clearable class="mainIptSelBox" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="包含产品:" prop="goods_name">
                            <el-input v-model="formList.goods_name" placeholder="请输入包含产品"   clearable class="mainIptSelBox" />
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
                    <div class="plr-10 fr">
                        <el-button type="primary" @click="getinforData(page)">搜&nbsp;&nbsp;索</el-button>
                        <el-button type="danger" @click="resetForm()">重&nbsp;&nbsp;置</el-button>
                    </div>
                </el-row>
            </el-form>
        </div>
        <!-- 列表 -->
		<el-row class="mainContentItemBox" v-if="deliveryList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">采购列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="expand" >
					<template slot-scope="props">
						<el-table :data="props.row.storage_goods" style="width: 100%">
							<el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{scope.$index+1}}
                                </template>
                            </el-table-column>
							<el-table-column label="商品品牌" prop="brand_name" />
							<el-table-column label="商品类目" prop="sort_directory" />
							<el-table-column label="商品编码" prop="general_version" />
							<el-table-column width='300px' label="商品名称" prop="goods_name" />
							<el-table-column label="型号规格" prop="goods_standard" />
							<el-table-column label="数量" prop="goods_num" />
							<el-table-column label="单位" prop="company_unit" />
							<el-table-column label="单价" prop="univalence" />
							<el-table-column label="税率" prop="tax_rate" />
							<el-table-column label="币种" prop="currency" />
							<el-table-column label="金额" prop="money" />
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="合同号" width="150" prop="contract_number" />
				<el-table-column label="采购单号" width="250" prop="cg_number" />
				<el-table-column label="供货单位" width='300px' prop="vendor" />
				<el-table-column label="采购总价" prop="cg_amount" />
				<el-table-column label="采购总数" prop="goods_count" />
				<el-table-column label="仓库" prop="ware_name" />
				<el-table-column label="创建人" prop="cg_creator" />
				<el-table-column label="审核人" prop="auditor_user" />
				<el-table-column label="联系人" prop="contact_name" />
				<el-table-column label="操作" fixed="right" width="260" align="center">
					<template slot-scope="scope">
						<el-button size="mini" plain type="primary" v-if="Btnshow.toPurchaseBtn" @click="toPurchaseBtn(scope.row)">转采购</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="tableData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="page" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
        <!--<<编辑-->
		<eidtPurchaseTwo :cg_number="cg_number" v-if="!deliveryList" @listerToChild="deliveryList = true" />
    </div>
    
</template>

<script>
import { getSupplierData } from '@/api/commonAction'
import { PurchasePlan_index, PurchasePlan_exportPurchasePlan } from '@/api/PurchaseSystem'
import eidtPurchaseTwo from './components/eidtPurchaseTwo'; //送货单
export default {
    components: {
        eidtPurchaseTwo
    },
    data(){
        return{
            // 编辑show
            deliveryList:true,
            // 加载
            loading:false,
            // 列表list
            tableData:[],
            // 搜索表单
            formList:{
                cg_number:"",
                cg_supplyunit:"",
                cg_creator:'',
                amount_start:'',
                amount_end:'',
                dataTimes:[]
            },
            pageSize:0,//页数量
            totalNum:0,//总条数
            page:1,//页码
            // 供货单位
            SupplierList:[],
            // 按钮权限
            Btnshow:{},
            // 采购单号
            cg_number:'',
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
            datadd.page = page;
            PurchasePlan_index(datadd).then(success=>{
                loading.close();
                if(success.data.code ==200){
                    this.tableData = success.data.data;
                    this.page = success.data.page.page;
                    this.pageSize = success.data.page.page_size;
                    this.totalNum = success.data.page.data_count;
                    
                    for(var i=0;i<success.data.button.length;i++){
                        let butdata = success.data.button[i];
                        if(butdata.action == 'turnPurchase'){
                            this.Btnshow.toPurchaseBtn = true;
                        }else if(butdata.action == 'exportPurchasePlan'){
                            this.Btnshow.exportBtn = true;
                        }else if(butdata.action == 'index'){
                            this.Btnshow.seeBtn = true;
                        }
                    }
                }else{
                    this.tableData = [];
                }
            }).catch(err=>{
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
        // 重置
        resetForm(){
            this.$refs.formList.resetFields();
            this.formList.amount_end ='';
        },
        // 跳页
        handleCurrentChange(e){
            this.getinforData(e);
        },
        // 转采购
        toPurchaseBtn(data) {
            this.cg_number = data.cg_number;
            this.deliveryMain1 = true
            this.deliveryList = false
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
			PurchasePlan_exportPurchasePlan(datadd).then(success=>{
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
    }
}
</script>
<style scoped>
    
</style>