<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">新增采购</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" :rules="formRules" label-width="100px" class="mainSearchItemBox">
                <!-- 基本信息 -->
                <el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>基本信息:</span>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="订单日期" class="sd-form-item" prop="cg_purchasetime">
                                <el-date-picker v-model="formList.cg_purchasetime" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions" class="mainIptSelBox">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="业务类型:" prop="business_type">
                                <el-select v-model="formList.business_type"  class="mainIptSelBox">
                                    <el-option label="普通采购" :value="1" />
                                    <el-option label="样品采购" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="供应商:" prop="cg_supplyunit">
                                <el-select
                                    v-model="formList.cg_supplyunit"
                                    filterable
                                    remote
                                    clearable
                                    reserve-keyword
                                    placeholder="请输入供应商"
                                    class="mainIptSelBox"
                                    :remote-method="matchSupplier"
                                    :loading="loading">
                                    <el-option
                                        v-for="(item,index) in SupplierList"
                                        :key="index"
                                        :label="item.vendor"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="票据类型:" prop="cg_invoicetype">
                                <el-select v-model="formList.cg_invoicetype" class="mainIptSelBox">
                                    <el-option label="不开票 " :value="0" />
                                    <el-option label="普通发票 " :value="1" />
                                    <el-option label="专用发票" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结算方式:" prop="cg_paymentype" >
                                <el-select v-model="formList.cg_paymentype" clearable class="mainIptSelBox">
                                    <el-option label="款到发货" :value="3" />
                                    <el-option label="货到付款" :value="4" />
                                    <el-option label="月结15天" :value="5" />
                                    <el-option label="月结30天" :value="6" />
                                    <el-option label="月结60天" :value="7" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="交货方式:" prop="cg_delivertype" >
                                <el-select v-model="formList.cg_delivertype" clearable class="mainIptSelBox">
                                    <el-option label="送货上门" :value="1" />
                                    <el-option label="自提" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="仓库:" class="sd-form-item" prop="cg_wareid" >
                                <el-select v-model="formList.cg_wareid" clearable class="mainIptSelBox">
                                    <el-option v-for="item in warehouseList" :key="item.ware_id" :label="item.ware_name" :value="item.ware_id" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同号:" class="sd-form-item" prop="contract_number" >
                                <el-input v-model="formList.contract_number" placeholder="请输入合同号"  clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人:" class="sd-form-item" prop="contact_name" >
                                <el-input v-model="formList.contact_name" placeholder="请输入联系人" max="10" :maxlength="10" clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系方式:" class="sd-form-item" prop="contact_phone" >
                                <el-input v-model="formList.contact_phone" placeholder="请输入联系方式" max="11" :maxlength="11" clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="部门:" class="sd-form-item">
                                <el-select v-model="formList.group_id" class="mainIptSelBox" @change="bumens">
                                    <el-option v-for="(item,index) in group_data" :key="index" :label="item.group_name" :value="item.group_id" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备注:" class="sd-form-item" prop="cg_remark" >
                                <el-input v-model="formList.cg_remark" placeholder="请输入备注" clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <el-form ref="loadingData" :model="loadingData" size="medium" label-width="100px" class="mainSearchItemBox">
                <!-- 商品信息 -->
				<el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>商品信息:</span>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="商品品牌" class="sd-form-item" prop="brand_name">
                                <el-select
                                    v-model="loadingData.brand_name"
                                    filterable
                                    clearable
                                    placeholder="请选择品牌"
                                >
                                    <el-option
                                        v-for="(item,index) in brandList"
                                        :key="index"
                                        :label="item.brand_name"
                                        :value="item.brand_name">
                                    </el-option>
                                </el-select>
                                <!-- <el-autocomplete style="width: 100%;" v-model="loadingData.brand_name" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="商品名称" class="sd-form-item" prop="goods_name">
                                <el-select
                                    v-model="loadingData.goods_name"
                                    filterable
                                    remote
                                    clearable
                                    reserve-keyword
                                    @change="goodschanges"
                                    placeholder="请输入商品名称"
                                    :remote-method="brandChanges"
                                    :loading="loading">
                                    <el-option
                                        v-for="(item,index) in goods_nameList"
                                        :key="index"
                                        :label="item.goods_name"
                                        :value="item.pg_id">
                                    </el-option>
                                </el-select>
                                <!-- <el-autocomplete style="width: 100%;" v-model="loadingData.goods_name" :fetch-suggestions="brandChanges" placeholder="请输入内容" @select="handleSelect"></el-autocomplete> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-table :data="tableData" style="width: 100%" class="tabelDatas">
                        <el-table-column width="50px" label="序号" align="center" >
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column label="商品信息" prop="" width="250">
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
                        <el-table-column label="数量"  align="center" min-width="100">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.goods_num" @focus="scope.row.goods_num == 0? scope.row.goods_num = '':''"  placeholder="数量"  @blur="/[^\d]/g.test(scope.row.goods_num) ? scope.row.goods_num = 0: scope.row.goods_num == ''? scope.row.goods_num=0:'' " clearable class="mainIptSelBox" />
                            </template>
                        </el-table-column>
                        <el-table-column label="单位"  align="center" prop="company_unit" min-width="60"/>
                        <el-table-column label="单价"  align="center" min-width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.univalence" placeholder="单价" @focus="scope.row.univalence == 0? scope.row.univalence = '':''"  @blur="!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d)?$)/.test(scope.row.univalence) ? scope.row.univalence = 0 :scope.row.univalence==''?scope.row.univalence=0:''" clearable class="mainIptSelBox" />
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100"  align="center" label="税率">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.tax_rate" class="mainIptSelBox" @change="bumens">
                                    <el-option label="0" :value="0" />
                                    <el-option label="3" :value="3" />
                                    <el-option label="6" :value="6" />
                                    <el-option label="13" :value="13" />
                                    <el-option label="17" :value="17" />
                                </el-select>
                                <!-- <span><el-input style="min-width:80%" v-model="scope.row.tax_rate" placeholder="税率" max="10" :maxlength="10" clearable class="mainIptSelBox" /> %</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100"  align="center" label="币种">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.currency"  class="mainIptSelBox">
                                    <el-option label="人民币" value="人民币" />
                                    <el-option label="美元" value="美元" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="金额"  align="center" min-width="80">
                            <template slot-scope="scope">
                                {{scope.row.money}}
                                <!-- <el-input v-model="scope.row.money" placeholder="" max="10" :maxlength="10" clearable class="mainIptSelBox" /> -->
                            </template>
                        </el-table-column>
                        <el-table-column min-width="150"  align="center" label="预计到货时间">
                            <template slot-scope="scope">
                                <el-date-picker v-model="scope.row.estimate_time" value-format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" min-width="150" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" plain @click="deltaiFun(scope.$index)" type="danger">撤销</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
				</el-card>
            </el-form>
		</el-row>
        
        <div style="height: 61px;"></div>
		<div class="bottomBtn">
			总金额	
			<el-input v-model="moneys" placeholder="总金额"  @blur="!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d)?$)/.test(moneys) ? moneys = 0 :''" style="width: 100px; margin-left: 10px;"/><span style="color: red;">	*</span>
			<!-- <el-button type="primary" @click="addBrandBtn(2)">提交计划</el-button> -->
			<el-button type="primary" @click="addBrandBtn(1)">提交采购</el-button>
		</div>
    </div>
</template>

<script>
import { PurchaseOrder_AddEntry} from '@/api/PurchaseSystem'
import { getSupplierData, searchGoodsData } from '@/api/commonAction'
export default {
     
    data() {
        var checkAge = (rule, value, callback) => {
            if(!value){
                return callback(new Error('手机号不能为空'));
            }else if(!/^1\d{10}$/.test(value)){
                return callback(new Error('手机号格式错误！'));
            }
            callback();
        }
        return {
            // 总金额:
            moneys:0,
            // 商品type
            goodstype:1,
            loading:false,
            // 部门List
            group_data:[],
            // 仓库List
            warehouseList:[],
            // 供应商
            SupplierList:[],
            // 基本信息
            formList:{
                cg_purchasetime:"",
                business_type:1,
                cg_invoicetype:0,
                cg_supplyunit:'',
                cg_invoicetype:'',
                cg_paymentype:"",
                cg_delivertype:"",
                cg_wareid:"",
                contract_number:"",
                contact_name:"",
                contact_phone:"",
                cg_remark:'',
            },
            formRules:{
                cg_purchasetime:[
                    { required: true, message: '请选择订单日期', trigger: 'blur' }
                ],
                business_type:[
                    { required: true, message: '请选择业务类型', trigger: 'blur' }
                ],
                cg_supplyunit:[
                    { required: true, message: '请选择供应商', trigger: 'blur' }
                ],
                cg_invoicetype:[
                    { required: true, message: '请选择票据类型', trigger: 'blur' }
                ],
                cg_paymentype:[
                    { required: true, message: '请选择结款方式', trigger: 'blur' }
                ],
                cg_delivertype:[
                    { required: true, message: '请选择交活方式', trigger: 'blur' }
                ],
                cg_wareid:[
                    { required: true, message: '请选择仓库', trigger: 'blur' }
                ],
                contract_number:[
                    { required: true, message: '请输入合同号', trigger: 'blur' }
                ],
                contact_name:[
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                contact_phone:[
                    { required: true, message: '请输入正确的联系方式', trigger: 'blur', validator:checkAge }
                ],
                group_id:[
                    { required: true, message: '请选择部门', trigger: 'blur' }
                ]
            },
            // 快捷商品品
            loadingData:{
                brand_name:'',
                goods_name:'',
                version:'',
                general_version:'',
            },
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
        this.formList.cg_invoicetype = 0;
        this.formList.cg_purchasetime = new Date(); 
    },
    watch: {
        tableData:{
            handler(newVal, oldVal) {
                let nums = 0;
                for(var i=0;i<this.tableData.length;i++){
                    this.tableData[i].money = this.tableData[i].goods_num * this.tableData[i].univalence;
                    nums += parseFloat(this.tableData[i].money);
                }
                this.moneys = nums;
                this.$forceUpdate();
            },
            deep: true
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
            PurchaseOrder_AddEntry(datadd).then(success=>{
                loading.close();
                if(success.data.code == 200){
                    this.formList.cg_number = success.data.data.cg_number;
                    this.formList.group_id = success.data.data.group_id;
                    this.warehouseList = success.data.data.ware_data;
                    this.group_data = success.data.data.group_data;
                    this.brandList = success.data.data.brand_data;
                }else{
                    this.$message({
                        message:'数据获取失败！',
                        type:'error'
                    })
                }
            }).catch(err=>{
                console.log(err)
                loading.close();
                this.$message({
                    message:'数据获取失败！',
                    type:'error'
                })
            })
        },
        // 部门不刷新
        bumens(e){
            this.$forceUpdate();
        },
        // 品牌 名称 系列 商品编号
        brandChanges(e){
            this.loading = true;
            let datadd = {};
            datadd.brand_name = this.loadingData.brand_name;
            datadd.goods_name = e;
            searchGoodsData(datadd).then(success=>{
                // console.log(success)
                if(success.data.code == 200){
                    this.goods_nameList =  success.data.data;
                }else{
                   this.goods_nameList = [];
                }
                this.loading = false;
            }).catch(err=>{
                this.$message({
                    message:'数据获取失败',
                    type:'error'
                })
            })
        },
        // 商品数据添加
        goodschanges(e){
            console.log(e);
            let itemdata;
            for(var i=0;i<this.goods_nameList.length;i++){
                if(this.goods_nameList[i].pg_id == e){
                    itemdata = this.goods_nameList[i];
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
            datadd.company_unit = '个';
            let addtype = true;
            for(var i=0;i<this.tableData.length;i++){
                if(datadd.pg_id == this.tableData[i].goods_id){
                    this.$message({
                        message:'该商品已添加！',
                        type:'warning'
                    })
                    addtype = false;
                    this.loadingData.goods_name = '';
                    return false;
                }
            }
            if(addtype){
                this.tableData.push(datadd);
                this.loadingData.goods_name = '';
            }
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
        // 添加采购单提交
        addBrandBtn(type){
            this.$refs['formList'].validate((valid) => {
                if(valid){
                    if(this.tableData.length == 0){
                        this.$message({
                            message:"请添加数据",
                            type:'warning'
                        });
                        return false;
                    }
                    let datadd = {};
                    datadd = this.formList;
                    datadd.submit_type = type;
                    datadd.cg_amount = this.moneys;
                    datadd.goods = this.tableData;
                    datadd.type = 2;
                    PurchaseOrder_AddEntry(datadd).then(success=>{
                        if(success.data.code ==200){
                            this.$message({
                                message:success.data.data,
                                type:'success'
                            })
                            this.back();
                        }else{
                            this.$message({
                                message:success.data.data,
                                type:'error'
                            })
                        }
                    }).catch(err=>{
                        this.$message({
                            message:'提交失败！',
                            type:'error'
                        })
                    })
                }
            })
                       
            
        },
        // 返回
        back(){
            this.$emit('listerToChild')
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	
</style>