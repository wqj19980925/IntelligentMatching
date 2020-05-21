<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox examins">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">基本信息</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px"  class="mainSearchItemBox">
				<el-row>
					<el-col :span="6" >
						<el-form-item label="订单日期" prop="cg_purchasetime" class="mainFormSeeInfoBox">
							{{formList.cg_purchasetime}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="采购单号:" prop="" class="mainFormSeeInfoBox">
                            {{formList.cg_number}}
							<!-- <el-input disabled v-model="formList.cg_number" placeholder="请输入采购单号" max="10" :maxlength="10" clearable class="mainIptSelBox" /> -->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="业务类型:" prop="business_type" class="mainFormSeeInfoBox">
                            {{formList.business_type == 1?'普通采购':'样品采购'}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="供应商:" prop="cg_supplyunit" class="mainFormSeeInfoBox">
                            {{formList.group_name}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="票据类型:" prop="cg_invoicetype" class="mainFormSeeInfoBox">
                            {{formList.cg_invoicetype?'普通发票':'专用发票'}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="结算方式:" prop="cg_paymentype" class="mainFormSeeInfoBox">
                            {{formList.cg_paymentype == 1?'现金':formList.cg_paymentype == 2?'定期':formList.cg_paymentype == 3?'款到发货':formList.cg_paymentype == 4?'货到付款':formList.cg_paymentype == 5?'月结15天':formList.cg_paymentype == 6?'月结30天':'月结60天'}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交货方式:" prop="cg_delivertype" class="mainFormSeeInfoBox">
                            {{formList.cg_delivertype?'送货上门':'自提'}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="仓库:" prop="cg_wareid" class="mainFormSeeInfoBox">
							{{formList.ware_name}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="合同号:" prop="contract_number" class="mainFormSeeInfoBox">
							{{formList.contract_number}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系人:" prop="contact_name" class="mainFormSeeInfoBox">
							{{formList.contact_name}}
						</el-form-item>
					</el-col>
                    <el-col :span="6">
						<el-form-item label="联系方式:" prop="contact_phone" class="mainFormSeeInfoBox">
							{{formList.contact_phone}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="部门:" prop="group_id" class="mainFormSeeInfoBox">
							{{formList.group_name}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="备注:" prop="cg_remark" class="mainFormSeeInfoBox">
							{{formList.cg_remark}}
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
        <!-- 列表 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">商品信息</div>
			</div>
			
			<el-table :data="tableData" style="width: 100%">
				<el-table-column width="50px" label="序号" >
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
                        </div>
                    </template>
                </el-table-column>
				<el-table-column label="型号规格" prop="goods_standard" />
				<el-table-column label="数量" prop="goods_num"/>
				<el-table-column label="单位" prop="company_unit" />
				<el-table-column label="单价" prop="univalence"/>
				<el-table-column prop="tax_rate" label="税率"/>
				<el-table-column prop="currency" label="币种"/>
				<el-table-column label="金额" prop="money"/>
				<el-table-column prop="estimate_time" label="预计到货时间"/>
				
			</el-table>
			
		</el-row>
        <div style="height: 61px;"></div>
		<div class="bottomBtn">
			总金额：{{moneys}}
			<!-- <el-input v-model="moneys" placeholder="" max="10" :maxlength="10" style="width: 100px; margin-left: 10px;"/><span style="color: red;">	*</span> -->
			<el-button type="primary" @click="shows(1)">通过</el-button>
			<el-button type="primary" @click="shows(2)">驳回</el-button>
		</div>
        <!--<<备注-->
		<el-dialog :visible.sync="wareShow" title="备注" width="450px" @close="remarksText.jur_remark = ''">
			<el-form ref="remarksText" :model="remarksText" label-width="80px" :rules="rulesform">
				<el-form-item label="备注:" prop="jur_remark">
					<el-input type="textarea" :rows="5" maxlength="255" v-model="remarksText.jur_remark" style='width:300px' placeholder="请输入备注" />
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="wareShow = false"> 取 消 </el-button>
				<el-button type="primary" @click="submissionRemark('remarksText')"> 提交 </el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import {PurchaseOrder_Toexamine} from '@/api/PurchaseSystem'
import { getSupplierData, searchGoodsData } from '@/api/commonAction'
export default {
    props:{
        cg_number:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            // 弹窗内容
            remarksText:{
                jur_remark:''
            },
            rulesform: { },
            // dialog show
            wareShow:false,
            // 驳回 通过
            diatype:'',
            // 商品type
            goodstype:1,
            loading:false,
            // 分组List
            group_data:[],
            // 仓库List
            warehouseList:[],
            // 供应商
            SupplierList:[],
            // 基本信息
            formList:{},
           
            // 品牌List
            brandList:[],
            // 名称List
            goods_nameList:[],
            // 系列List
            pg_seriesList:[],
            // 编号 LIst
            general_versionList:[],
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
            // 列表数据
            tableData:[],
        }
    },
    created(){
        this.getinforData();
        
    },
    computed:{
        moneys:function(){
            let nums = 0;
            for(var i=0;i<this.tableData.length;i++){
                nums += parseFloat(this.tableData[i].money);
            }
            return nums;
        },
        'tableData[e].money':function(){
            for(var i=0;i<this.tableData.length;i++){
               this.tableData[i].money = this.tableData[i].goods_num * this.tableData[i].univalence;
            }
        }
    },
    methods:{
        // 页面数据
        getinforData(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let datadd = {};
            datadd.type = 1;
            datadd.cg_number = this.cg_number;
            PurchaseOrder_Toexamine(datadd).then(success=>{
                loading.close();
                if(success.data.code == 200){
                    this.formList = success.data.data.cg_data;
                    this.tableData = success.data.data.storage_goods;
                    this.formList.cg_number = this.cg_number;
                    this.warehouseList = success.data.data.ware_data;
                    this.group_data = success.data.data.group_data;
                    if(this.SupplierList.length==0){
                        this.SupplierList.push({id:success.data.data.cg_data.cg_supplyunit,vendor:success.data.data.cg_data.supplyunit_name})
                    }
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error'
                    })
                    this.back();
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:'数据获取失败！',
                    type:'error'
                })
            })
        },
        
        // 品牌 名称 系列 商品编号
        brandChanges(e){
            this.loading = true;
            let datadd = {};
            if(this.goodstype == 1){
                datadd.brand_name = e;
                this.loadingData.goods_name = '';
                this.loadingData.version = '';
                this.loadingData.general_version = '';                
            }else if(this.goodstype == 2){
                datadd.brand_name = this.loadingData.brand_name;
                datadd.goods_name = e;
                this.loadingData.version = '';
                this.loadingData.general_version = '';
            }else if(this.goodstype == 3){
                datadd.brand_name = this.loadingData.brand_name;
                datadd.goods_name = this.loadingData.goods_name;
                datadd.version = e;
                this.loadingData.general_version = '';
            }else if(this.goodstype == 4){
                datadd.brand_name = this.loadingData.brand_name;
                datadd.goods_name = this.loadingData.goods_name;
                datadd.version = this.loadingData.version;
                datadd.general_version = e;
            }
            searchGoodsData(datadd).then(success=>{
                // console.log(success)
                if(success.data.code == 200){
                    if(this.goodstype == 1){
                        this.brandList = success.data.data;
                        this.goods_nameList = [];
                        this.pg_seriesList = [];
                        this.general_versionList = [];
                    }else if(this.goodstype == 2){
                        this.goods_nameList =  success.data.data;
                        this.pg_seriesList = [];
                        this.general_versionList = [];
                    }else if(this.goodstype == 2){
                        this.pg_seriesList =  success.data.data;
                        this.general_versionList = [];
                    }else {                        
                        this.general_versionList = success.data.data;
                    }
                }else{
                    if(this.goodstype == 1){
                        this.brandList = [];
                        this.goods_nameList = [];
                        this.pg_seriesList = [];
                        this.general_versionList = [];
                    }else if(this.goodstype == 2){
                        this.goods_nameList = [];
                        this.pg_seriesList = [];
                        this.general_versionList = [];
                    }else if(this.goodstype == 2){
                        this.pg_seriesList = [];
                        this.general_versionList = [];
                    }else {                        
                        this.general_versionList = [];
                    }
                }
                this.loading = false;
            }).catch(err=>{
                this.$message({
                    message:'s数据获取失败',
                    type:'error'
                })
            })
        },
        shows(type){
            this.diatype = type;
            this.wareShow=true
        },
        // 商品数据添加
        goodschanges(e){
            console.log(e);
            let itemdata;
            if(this.goodstype == 1){
                for(var i=0;i<this.brandList.length;i++){
                    if(this.brandList[i].brand_name == e){
                        itemdata = this.brandList[i];
                    }
                }
            }else if(this.goodstype == 2){
                for(var i=0;i<this.goods_nameList.length;i++){
                    if(this.goods_nameList[i].goods_name == e){
                        itemdata = this.goods_nameList[i];
                    }
                }
            }else if(this.goodstype == 3){
                for(var i=0;i<this.pg_seriesList.length;i++){
                    if(this.pg_seriesList[i].pg_series == e){
                        itemdata = this.pg_seriesList[i];
                    }
                }
            }else if(this.goodstype == 4){
                for(var i=0;i<this.general_versionList.length;i++){
                    if(this.general_versionList[i].general_version == e){
                        itemdata = this.general_versionList[i];
                    }
                }
            }
            let datadd = {...itemdata};
            datadd.goods_id = datadd.pg_id;
            datadd.estimate_time = new Date();
            datadd.money = 0;
            datadd.goods_num = 0;
            datadd.moneys = 0;
            datadd.currency = '人民币';
            datadd.tax_rate = 0;
            datadd.univalence = 0;
            datadd.Company = '个';
            for(var i=0;i<this.tableData.length;i++){
                if(datadd.pg_id == this.tableData[i].goods_id){
                    this.$message({
                        message:'该商品已添加！',
                        type:'warning'
                    })
                    return false;
                }
            }
            this.tableData.push(datadd)
        },
        // 数据列表删除
        deltaiFun(index){
            this.tableData.splice(index,1);
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
     
        // 驳回 通过 提交
        submissionRemark(formName){
            // this.$refs[formName].validate(valid => {
                // if (valid) {
                    let datadd = {};
                    datadd.cg_number = this.cg_number;
                    datadd.examine_type = this.diatype;
                    datadd.type = 2;
                    datadd.remarks = this.remarksText.jur_remark;
                    PurchaseOrder_Toexamine(datadd).then(success=>{
                        if(success.data.code == 200){
                            this.$message({
                                message:success.data.data,
                                type:'success'
                            });
                            this.wareShow = false;
                            this.back();
                        }else{
                            this.$message({
                                message:success.data.data,
                                type:'error'
                            })
                            
                        }
                    }).catch(err=>{
                        this.$message({
                            message:'操作失败！',
                            type:'error'
                        })
                    })
            //     }
            // })
        },
        // 返回
        back(){
            this.$emit('listerToChild')
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
	.examins .el-form-item--medium .el-form-item__content{
        line-height: 20px;
    }
</style>