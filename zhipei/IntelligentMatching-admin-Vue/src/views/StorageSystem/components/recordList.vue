<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox records">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">基本信息</div>
				<div class="buttonBox">
					<el-button plain type="primary" @click="back()">返回</el-button>
				</div>

			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="采购单号:" prop="cg_number" class="mainFormSeeInfoBox">
							{{formList.cg_number}}
						</el-form-item>
					</el-col>
					
					<el-col :span="6">
						<el-form-item label="创建人:" prop="cg_creator"  class="mainFormSeeInfoBox">
							{{formList.cg_creator}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="仓库:" prop="ware_name"  class="mainFormSeeInfoBox">
							{{formList.ware_name}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="采购总数:" prop="goods_count"  class="mainFormSeeInfoBox">
							{{formList.goods_count}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="到货总数:" prop="rk_num"  class="mainFormSeeInfoBox">
							{{formList.rk_num}} + {{formList.df_num}}
						</el-form-item>
					</el-col>
                    <el-col :span="12">
						<el-form-item label="供货单位:" prop="supplyunit_name"  class="mainFormSeeInfoBox">
							{{formList.supplyunit_name}}
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
        <!-- 列表 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">入库记录</div>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table :data="props.row.ware_goods" style="width: 100%">
							<el-table-column width='60px' label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+1}}
                                </template>
                            </el-table-column>
							<el-table-column label="商品品牌" align="center" prop="brand_name" />
							<el-table-column label="商品类目" align="center" prop="sort_directory" />
							<el-table-column label="商品编码" align="center" prop="general_version" />
							<el-table-column width='300px' align="center" label="商品名称" prop="goods_name" />
							<el-table-column label="采购数量" align="center" prop="goods_num" />
							<el-table-column label="入库数量" align="center" prop="ruku_num" />
							<el-table-column label="单位" align="center" prop="company_unit" />
							<el-table-column label="预计到货时间" align="center" prop="estimate_time" />
							<el-table-column label="实际入库时间" align="center" prop="dh_time" />
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="入库单号" align="center"  prop="rk_number" />
				<el-table-column label="数量" align="center" prop="ware_num" />
				<el-table-column label="操作类型" align="center" prop="rk_waretype">
                    <template slot-scope="scope">
                        {{scope.row.rk_waretype == 1?'入库':scope.row.rk_waretype == 2?'退货': scope.row.rk_waretype == 3 ? '代发':'换货'}}
                    </template>
                </el-table-column>
				<el-table-column label="操作人" align="center" prop="inware_user" />
				<el-table-column label="到货时间" prop="arrival_time" />
			</el-table>
		</el-row>
    </div>
</template>

<script>
import {WareInorder_WareRecord} from '@/api/StorageSystem'
export default {
    props:{
        cg_number:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            formList:{},
            tableData:[],
        }
    },
    created() {
        this.getinforData();
    },
    methods: {
        
        // 获取页面数据
        getinforData(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let datadd = {};
            datadd.cg_number = this.cg_number;
            WareInorder_WareRecord(datadd).then(success=>{
                loading.close()
                console.log(success)
                if(success.data.code==200){
                    this.formList = success.data.data.cg_data;
                    // this.formList.cg_number = this.cg_number;
                    this.tableData = success.data.data.ware_inorderData;
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error'
                    });
                    this.back();
                }
            }).catch(err=>{
                loading.close()
                this.$message({
                    message:'数据获取失败！',
                    type:'error'
                });
                this.back();
            })
        },
        // 返回
        back(){
            this.$emit('listerToChild')
        },
    }
}
</script>
<style lang="scss">
	.records .el-form-item--medium .el-form-item__content{
        line-height: 20px;
    }
</style>