<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox returnGoods">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">仓库换货</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>
			</div>

			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
                <!-- 基本信息 -->
                <el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="订单日期" prop="cg_purchasetime" class="mainFormSeeInfoBox">
                                {{formList.cg_purchasetime}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="采购单号:" prop="cg_number" class="mainFormSeeInfoBox">
                                {{formList.cg_number}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="业务类型:" prop="business_type" class="mainFormSeeInfoBox">
                                {{formList.business_type == 1? '普通采购':'样品采购'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="供应商:" prop="vendor" class="mainFormSeeInfoBox">
                                {{formList.vendor}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="票据类型:" prop="cg_invoicetype" class="mainFormSeeInfoBox">
                                {{formList.cg_invoicetype == 0?"不开票":formList.cg_invoicetype == 1? "普通发票":'专用发票'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结算方式:" prop="cg_paymentype" class="mainFormSeeInfoBox">
                                {{formList.cg_paymentype==3?'款到发货':formList.cg_paymentype==4?'货到付款':formList.cg_paymentype==5?'月结15天':formList.cg_paymentype==6?'月结30天':'月结60天'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="交货方式:" prop="bra_name6" class="mainFormSeeInfoBox">
                                {{formList.cg_delivertype == 1?'送货上门':'自提'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="仓库:" prop="ware_name" class="mainFormSeeInfoBox">
                                {{formList.ware_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同号:" prop="contract_number" class="mainFormSeeInfoBox">
                                {{formList.contract_number}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人" prop="contact_name" class="mainFormSeeInfoBox">
                                {{formList.contact_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="部门:" prop="group_name" class="mainFormSeeInfoBox">
                                {{formList.group_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备注:" prop="cg_remark" class="mainFormSeeInfoBox">
                                {{formList.cg_remark}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
			
                <!-- 商品列表 -->
                <el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>商品信息</span>
                    </div>
                    <el-table :data="tableData" align="center" style="width: 100%" class="tabelDatas">
                        <el-table-column label="序号" align="center" width="50">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column label="商品品牌" align="center" prop="brand_name" />
                        <el-table-column label="商品类目" align="center" prop="sort_directory" />
                        <el-table-column label="商品编码" min-width="100" prop="general_version" />
                        <el-table-column label="商品名称" prop="goods_name" />
                        <el-table-column label="型号规格" min-width="100" prop="goods_standard" />
                        <el-table-column label="已入库数量" align="center" prop="ruku_num" />
                        <el-table-column label="数量" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.num" placeholder="数量"  @focus="scope.row.num==0?scope.row.num='':''" @blur="!/^\d+$/.test(scope.row.num)?scope.row.num=0:scope.row.num==''?scope.row.num=0:''" max="10" :maxlength="10" clearable class="mainIptSelBox" />
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" prop="company_unit" />
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
import {WareInorder_exchanGoods} from "@/api/StorageSystem"
import { getSupplierData } from '@/api/commonAction'
export default {
    props:{
        cg_number:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            // 加载
            loading:false,
            // 供应商List
            SupplierList:[],
            // 基本信息
            formList:{},
            // 商品数据
            tableData:[],
             
            WarehouseList:[],
        }
    },
    created() {
        this.getinforData()
    },
    methods: {
        // 获取数据
        getinforData(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let datadd ={};
            datadd.type = 1;
            datadd.cg_number = this.cg_number;
            WareInorder_exchanGoods(datadd).then(success=>{
                loading.close();
                if(success.data.code == 200){
                    this.formList = success.data.data.cg_data;
                    this.tableData = success.data.data.storage_goods;
                    this.SupplierList.push({
                        id:success.data.data.cg_data.cg_supplyunit,
                        vendor:success.data.data.cg_data.vendor
                    })
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error'
                    })
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:'信息获取失败！',
                    type:'error'
                })
                this.back();
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
        // 退货 提交 
        addBrandBtn(){
            for(var i=0;i<this.tableData.length;i++){
                if(this.tableData[i].num == 0||this.tableData[i].num == ''||this.tableData[i].num == undefined){
                    this.$message({
                        message:'请输入数量',
                        type:'warning'
                    });
                    return false;
                }
            }
            this.$prompt('请输入备注', '备注', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let datadd = {};
                datadd.rk_remark = value;
                datadd.type = 2;
                datadd.cg_number = this.cg_number;
                datadd.goods = this.tableData;
                WareInorder_exchanGoods(datadd).then(success=>{
                    loading.close();
                    if(success.data.code == 200){
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
                    loading.close();
                    this.$message({
                        message:'提交失败！',
                        type:'error'
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '提交取消！'
                });
            });
        },
        // 返回
        back(){
            this.$emit('listerToChild')
        },
    },
}
</script>
<style lang="scss">
    .returnGoods .el-form-item--medium .el-form-item__content{
        line-height: 20px;
    }
</style>