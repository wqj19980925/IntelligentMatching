<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox stockInList">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">添加入库</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
                 <!-- 基本信息 -->
				<el-card shadow="never" class="box-card mainCardBorNoneBox">
					<div slot="header" class="clearfix">
						<span>基本信息:</span>
					</div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="订单日期:" class="mainFormSeeInfoBox" prop="cg_purchasetime">
                                {{formList.cg_purchasetime}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="采购单号:" prop="cg_number" class="mainFormSeeInfoBox">
                                {{formList.cg_number}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="业务类型:" prop="bra_name2" class="mainFormSeeInfoBox">
                                {{formList.business_type == 1?'普通采购':'样品采购'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="供应商:" prop="vendor" class="mainFormSeeInfoBox">
                                {{formList.vendor}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="票据类型:" prop="cg_invoicetype" class="mainFormSeeInfoBox">
                                {{formList.cg_invoicetype == 1?'普通发票':'专用发票'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结算方式:" prop="cg_paymentype" class="mainFormSeeInfoBox">
                                {{formList.cg_paymentype==3?'款到发货':formList.cg_paymentype==4?'货到付款':formList.cg_paymentype==5?'月结15天':formList.cg_paymentype == 6?'月结30天':'月结60天'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="交货方式:" prop="cg_delivertype" class="mainFormSeeInfoBox">
                                {{formList.cg_delivertype==1?'送货上门':'自提'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="仓库:" class="mainFormSeeInfoBox" prop="ware_name">
                                {{formList.ware_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同号:" class="mainFormSeeInfoBox" prop="contract_number">
                                {{formList.contract_number}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人:" class="mainFormSeeInfoBox" prop="contact_name">
                                {{formList.contact_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="部门:" class="mainFormSeeInfoBox" prop="group_name">
                                {{formList.group_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备注:" class="mainFormSeeInfoBox" prop="cg_remark">
                                {{formList.cg_remark}}
                            </el-form-item>
                        </el-col>
                    </el-row>
				</el-card>
                <!-- 商品信息 -->
				<el-card shadow="never" class="box-card mainCardBorNoneBox">
					<div slot="header" class="clearfix">
						<span>商品信息:</span>
					</div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="序号" width="80">
                            <template slot-scope="scope" >
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
                        <el-table-column label="型号规格" align="center" prop="goods_standard" />
                        <el-table-column label="采购数量" align="center" prop="goods_num" />
                        <el-table-column label="已入库数量" align="center" prop="ruku_num" />
                        <el-table-column label="数量" align="center">
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.ruku_num != scope.row.goods_num" v-model="scope.row.num" @focus="scope.row.num==0?scope.row.num='':''" @blur="!/^\d+$/.test(scope.row.num)?scope.row.num=0:scope.row.num==''?scope.row.num=0:''" placeholder="数量" max="10" :maxlength="10" clearable class="mainIptSelBox" />
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" prop="company_unit" />
                        <el-table-column width="200px" align="center" label="入库时间">
                            <template slot-scope="scope">
                                <el-date-picker style="width:150px" v-model="scope.row.estimate_time" value-format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                    </el-table>
				</el-card>
			</el-form>
		</el-row>
        
		<div style="height: 61px;"></div>
		<div class="bottomBtn">
			<el-button type="primary" @click="addBrandBtn()">提交</el-button>
		</div>
    </div>
</template>
<script>
import {WareInorder_Warehousing} from '@/api/StorageSystem'
export default {
    props:{
        cg_number:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            // 基本信息
            formList:{

            },
            // 商品数据
            tableData:[],
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
    created() {
        this.getinforData()
    },
    methods:{
        getinforData(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let datadd = {};
            datadd.cg_number = this.cg_number;
            datadd.type = 1;
            WareInorder_Warehousing(datadd).then(success=>{
                loading.close();
                if(success.data.code ==200){
                    this.formList = success.data.data.cg_data;
                    this.tableData = success.data.data.storage_goods;
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error'
                    })
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:'数据获取失败！',
                    type:'error'
                })
                this.back();
            })
        },
        // 返回
        back(){
            this.$emit('listerToChild')
        },
        // 入库提交
        addBrandBtn(){
            if(this.tableData.length==0){
                this.$message({
                    message:"暂无商品数据，提交失败！",
                    type:'warning'
                })
                return false;
            }
            let datadd = {};
            datadd.cg_number = this.cg_number;
            datadd.type = 2;
            datadd.goods = this.tableData;
            WareInorder_Warehousing(datadd).then(success=>{
                if(success.data.code ==200){
                    this.$message({
                        message:success.data.data,
                        type:'success'
                    })
                    this.back()
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error',
                    })
                }
            }).catch(err=>{
                this.$message({
                    message:'入库失败！',
                    type:'error'
                })
            })
        }
    }
}
</script>
<style lang="scss">
    .stockInList .el-form-item--medium .el-form-item__content{
        line-height: 20px;
    }
</style>