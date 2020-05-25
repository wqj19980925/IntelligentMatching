<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">添加分销</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" :rules="Formrules" label-width="100px" class="mainSearchItemBox">
                <!-- 基本信息 -->
                <el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>基本信息:</span>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="订单日期"  prop="do_purchasetime" required>
                                <el-date-picker v-model="formList.do_purchasetime" align="right" type="date" placeholder="选择日期"  class="mainIptSelBox" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="分销单号:" prop="do_number" >
                                <el-input v-model="formList.do_number" disabled placeholder="请输入分销单号" clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="业务类型:" prop="do_businesstype">
                                <el-select v-model="formList.do_businesstype" clearable class="mainIptSelBox">
                                    <el-option label="批发" :value="1" />
                                    <el-option label="零售" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="group_type == 1">
                            <el-form-item label="分销商:" prop="do_distributor">
                                <el-select
                                    v-model="formList.do_distributor"
                                    filterable
                                    remote
                                    class="mainIptSelBox"
                                    clearable
                                    reserve-keyword
                                    placeholder="请输入分销商"
                                    :remote-method="matchdistribution"
                                    :loading="loading">
                                    <el-option
                                        v-for="(item,index) in distributionList"
                                        :key="index"
                                        :label="item.distributor_name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="票据类型:" prop="do_invoicetype">
                                <el-select v-model="formList.do_invoicetype" clearable class="mainIptSelBox">
                                    <el-option label="不开票" :value="0" />
                                    <el-option label="普通发票" :value="1" />
                                    <el-option label="专用发票" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结算方式:" prop="do_settlementype">
                                <el-select v-model="formList.do_settlementype" clearable class="mainIptSelBox">
                                    <el-option label="款到发货" :value="1" />
                                    <el-option label="货到付款" :value="2" />
                                    <el-option label="月结" :value="3" />
                                    <el-option label="在线支付" :value="4" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="交货方式:" prop="do_delivertype">
                                <el-select v-model="formList.do_delivertype" clearable class="mainIptSelBox">
                                    <el-option label="送货上门" :value="1" />
                                    <el-option label="自提" :value="2" />
                                    <el-option label="物流" :value="3" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="group_type == 1">
                            <el-form-item label="仓库:" prop="do_wareid">
                                <el-select v-model="formList.do_wareid" clearable class="mainIptSelBox">
                                    <el-option v-for="(item,index) in ware_List" :key="index" :label="item.ware_name" :value="item.ware_id" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同号:" prop="do_contract">
                                <el-input v-model="formList.do_contract" placeholder="请输入合同号" max="20" :maxlength="20" clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="快递单位:" prop="do_expressid">
                                <el-select v-model="formList.do_expressid" clearable class="mainIptSelBox">
                                    <el-option v-for="(item,index) in logisticsList" :key="index" :label="item.wlps_name" :value="item.ex_id" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备注:" prop="do_remark">
                                <el-input v-model="formList.do_remark" placeholder="请输入备注"  clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
                <!-- 收货信息 -->
				<el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>收货信息:</span>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="收件人姓名" prop="shr_name" required>
                                <el-input v-model="formList.shr_name" placeholder="请输入收件人姓名" max="10" :maxlength="10" clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="收件人电话:" prop="shr_phone">
                                <el-input v-model="formList.shr_phone" placeholder="请输入收件人电话" max="11" :maxlength="11" clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="收件人地址:" prop="selectedOptions">
                                <el-cascader
                                    size="large"
                                    :options="options"
                                    v-model="formList.selectedOptions"
                                    @change="handleChange"
                                >
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="详细地址:" prop="shr_adress">
                                <el-input v-model="formList.shr_adress" placeholder="请输入收件人详细地址"  clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                    </el-row>
				</el-card>
                <!-- 商品信息 -->
                <el-card shadow="never"    class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>商品信息:</span>
                    </div>
                    <el-form ref="loadingData" :model="loadingData" size="medium" label-width="100px" class="mainSearchItemBox">
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
                    </el-form>
                    <el-table :data="tableData" style="width: 100%" class="tabelDatas">
                        <el-table-column width="50px" label="序号" >
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column label="商品信息" v-if="group_type == 1" min-width="250">
                            <template slot-scope="scope" align="center">
                                <div>
                                    <p>商品品牌:{{scope.row.brand_name}}</p>
                                    <p>商品类目:{{scope.row.sort_directory}}</p>
                                    <p>商品编码:{{scope.row.general_version}}</p>
                                    <p>商品名称:{{scope.row.goods_name}}</p>
                                    <p>型号规格:{{scope.row.goods_standard}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品品牌" prop="brand_name" v-if="group_type == 2" min-width="100"/>
                        <el-table-column label="商品类目" prop="sort_directory" v-if="group_type == 2" min-width="100"/>
                        <el-table-column label="商品编码" prop="general_version" v-if="group_type == 2" min-width="150"/>
                        <el-table-column label="商品名称" prop="goods_name" v-if="group_type == 2" min-width="250"/>
                        <el-table-column label="型号规格" prop="goods_standard" v-if="group_type == 2" min-width="150"/>

                        <el-table-column label="数量" min-width="120" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.goods_num" @focus="scope.row.goods_num == 0? scope.row.goods_num = '':''"  placeholder="数量"  @blur="/[^\d]/g.test(scope.row.goods_num) ? scope.row.goods_num = 0: scope.row.goods_num == ''? scope.row.goods_num=0:'' " clearable class="mainIptSelBox" />
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" prop="company_unit" min-width="60" align="center"/>
                        <el-table-column label="单价" v-if="group_type == 1" min-width="130" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.univalence" placeholder="单价" @focus="scope.row.univalence == 0? scope.row.univalence = '':''"  @blur="!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d)?$)/.test(scope.row.univalence) ? scope.row.univalence = 0 :scope.row.univalence==''?scope.row.univalence=0:''" clearable class="mainIptSelBox" />
                            </template>
                        </el-table-column>
                        <el-table-column min-width="100" v-if="group_type == 1" label="税率" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.tax_rate" class="mainIptSelBox" @change="bumens">
                                    <el-option label="0" :value="0" />
                                    <el-option label="3" :value="3" />
                                    <el-option label="6" :value="6" />
                                    <el-option label="13" :value="13" />
                                    <el-option label="17" :value="17" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="130" v-if="group_type == 1" label="币种" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.currency"  class="mainIptSelBox">
                                    <el-option label="人民币" value="人民币" />
                                    <el-option label="美元" value="美元" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="金额" v-if="group_type == 1" min-width="80" align="center">
                            <template slot-scope="scope">
                                {{scope.row.money}}
                                <!-- <el-input v-model="scope.row.money" placeholder="" max="10" :maxlength="10" clearable class="mainIptSelBox" /> -->
                            </template>
                        </el-table-column>
                        <el-table-column min-width="150" v-if="group_type == 1" align="center" label="预计到货时间">
                            <template slot-scope="scope">
                                <el-date-picker style="width:150px" v-model="scope.row.estimate_time" align="right" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
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
			<span  v-if="group_type == 1" >总金额	</span>
			<el-input v-model="moneys" placeholder="总金额" v-if="group_type == 1"  @blur="!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d)?$)/.test(moneys) ? moneys = 0 :''" style="width: 100px; margin-left: 10px;"/><span  v-if="group_type == 1" style="color: red;">	*</span>
			<el-button type="primary" @click="addBrandBtn">提交</el-button>
		</div>
    </div>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
import {Distribution_AddDistrib} from "@/api/DistributionSystem"
import {getDistributor,searchGoodsData} from "@/api/commonAction"
export default {
    props:{
        group_type:{
            type:Number,
            default:''
        }
    },
    data() {
        const buttpye = (rule, value, callback) => {
            if(this.group_type == 1){
                return true;
            }else{
                return false
            }
        };
        const checkAge = (rule, value, callback) => {
            if(!value){
                return callback(new Error('手机号不能为空'));
            }else if(!/^1\d{10}$/.test(value)){
                return callback(new Error('手机号格式错误！'));
            }
            callback();
        }
        const Cityvalidator = (rule, value, callback) => {
            // console.log(value)
            if(!value){
                return callback(new Error('请选择收货地址'));
            }else if(value.length != 3) {
                return callback(new Error('收货地址错误'));
            }
            callback();
        }
        return {
            // 总金额
            moneys:0,
            // city option数据
            options: regionData,
            // 加载
            loading:false,
            // 分销商数据
            distributionList:[],
            // 品牌List
            brandList:[],
            // 仓库数据
            ware_List:[],
            // 快递单位
            logisticsList:[],
            // 商品信息List
            tableData:[],
            // 商品lies
            goods_nameList:[],
             // 快捷商品品
            loadingData:{
                brand_name:'',
                goods_name:'',
            },
            // form验证
            Formrules:{
                do_purchasetime:[
                    { required: true, message: '请选择订单日期', trigger: 'blur' }
                ],
                do_number:[
                    { required: true, message: '请输入分销单号', trigger: 'blur' }
                ],
                do_businesstype:[
                    { required: true, message: '请选择业务类型', trigger: 'blur' }
                ],
                do_distributor:[
                    { required: buttpye , message: '请选择分销商', trigger: 'blur' }
                ],
                do_invoicetype:[
                    { required: true , message: '请选择票据类型', trigger: 'blur' }
                ],
                do_settlementype:[
                    { required: true , message: '请选择结算方式', trigger: 'blur' }
                ],
                do_delivertype:[
                    { required: true , message: '请选择交货方式', trigger: 'blur' }
                ],
                do_wareid:[
                    { required: buttpye , message: '请选择仓库', trigger: 'blur' }
                ],
                do_contract:[
                    { required: true , message: '请输入合同号', trigger: 'blur' }
                ],
                do_expressid:[
                    { required: true , message: '请选择快递单位', trigger: 'blur' }
                ],
                shr_name:[
                    { required: true , message: '请输入收件人', trigger: 'blur' }
                ],
                shr_phone:[
                    { required: true, trigger: 'blur', validator:checkAge }
                ],
                selectedOptions:[
                    { required: true, trigger: 'change', validator:Cityvalidator }
                ],
                shr_adress:[
                    { required: true,  message: '请输入详细地址',  trigger: 'blur',}
                ],
            },
            formList:{
                do_delivertype:"",
                do_wareid:"",
                do_contract:'',
                do_expressid:'',
                do_remark:'',
                do_settlementype:"",
                do_invoicetype:"",
                do_distributor:"",
                do_businesstype:"",
                do_number:'',
                do_purchasetime:"",
                selectedOptions: [],
                shr_sheng:'',
                shr_city:'',
                shr_xian:"",
                shr_adress:"",
                shr_phone:"",
                shr_name:"",
            },
            // 时间快捷
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
        }
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
    created(){
        this.getinforData()
    },

    methods: {
        // 获取数据
        getinforData(){
            let datadd = {};
            datadd.type = 1;
            Distribution_AddDistrib(datadd).then(success=>{
                if(success.data.code == 200){
                    this.formList.do_number = success.data.data.do_number;
                    this.brandList = success.data.data.brand_data;
                    this.logisticsList = success.data.data.logistics;
                    if(this.group_type == 1){
                        this.ware_List = success.data.data.ware_data;
                    }
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error'
                    })
                    this.back();
                }
            }).catch(err=>{
                this.$message({
                    message:"获取数据失败！",
                    type:'error'
                });
                this.back();
            })
        },
        // 数据列表删除
        deltaiFun(index){
            this.tableData.splice(index,1);
        },
        // 收货地址匹配
        handleChange() {
            this.formList.shr_sheng = CodeToText[this.formList.selectedOptions[0]];
            this.formList.shr_city = CodeToText[this.formList.selectedOptions[1]];
            this.formList.shr_xian = CodeToText[this.formList.selectedOptions[2]];
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
        // 分销商匹配
        matchdistribution(e){
             this.loading = true;
            let datadd = {
                type:1,
                vendor:e
            }
            getDistributor(datadd).then(success=>{
                this.loading = false;
                if(success.data.code == 200){
                    this.distributionList = success.data.data;
                }else{
                    this.distributionList = [];
                }
            }).catch(err=>{
                this.loading = false;
                this.$message({
                    message:'数据匹配失败！',
                    type:'error'
                })
            })
        },
        // 添加分销
        addBrandBtn(){
            this.$refs['formList'].validate((valids) => {
                if(valids){
                    if(this.tableData.length == 0){
                        this.$message({
                            message:'请添加商品数据',
                            type:'warning'
                        })
                        return false;
                    }
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].goods_num == ''||this.tableData[i].goods_num == 0){
                            this.$message({
                                message:"请输入商品数量",
                                type:'warning'
                            })
                            return false;
                        }
                    }
                    let datadd = {};
                    datadd = this.formList;
                    datadd.goods = this.tableData;
                    datadd.do_amount = this.moneys;
                    datadd.type = 2;
                    Distribution_AddDistrib(datadd).then(success=>{
                        if(success.data.code == 200){
                            this.$message({
                                message:success.data.data,
                                type:"success"
                            })
                            this.back();
                        }else{
                            this.$message({
                                message:success.data.data,
                                type:"error"
                            })
                        }
                    }).catch(err=>{
                        this.$message({
                            message:"提交失败！",
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
    },
}
</script>

<style lang="scss">
    
</style>