<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox records">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">库房记录</div>
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
				</el-card>
				<!-- 入库记录 -->
				<el-card shadow="never" class="box-card mainCardBorNoneBox">
					<div slot="header" class="clearfix">
						<span>入库记录:</span>
					</div>
					<el-table :data="tableData" style="width: 100%">
						
						<el-table-column label="入库单号" align="center"  prop="rk_number" />
						<el-table-column label="数量" align="center" prop="ware_num" />
						<el-table-column label="操作类型" align="center" prop="rk_waretype">
							<template slot-scope="scope">
								{{scope.row.rk_waretype == 1?'入库':scope.row.rk_waretype == 2?'退货': scope.row.rk_waretype == 3 ? '代发':'换货'}}
							</template>
						</el-table-column>
						<el-table-column label="操作人" align="center" prop="inware_user" />
						<el-table-column label="到货时间" align="center" prop="arrival_time" />
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button  @click="pageIndexBtn(scope.row)">查看商品</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-form>
		</el-row>
		<!-- 弹框 -->
        <el-dialog :visible.sync="dialog.show" :title="dialog.title" :close-on-click-modal="false" :width="dialog.width" @close="closedia">
            <el-form ref="dialogData" :model="dialogData">
                <div v-if="dialog.function_action == 'pageindex'">
                    <el-table :data="dialogData.tabelData" style="width: 100%">
						<el-table-column width='60px' label="序号" align="center">
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
						<el-table-column label="采购数量" align="center" prop="goods_num" />
						<el-table-column label="入库数量" align="center" prop="ruku_num" />
						<el-table-column label="单位" align="center" prop="company_unit" />
						<el-table-column label="预计到货时间" align="center" prop="estimate_time" />
						<el-table-column label="实际入库时间" align="center" prop="dh_time" />
					</el-table>
                </div>
            </el-form>
            <div align="center" slot="footer" >
                <el-button class="btn-delete" @click="dialog.show = false">关 闭</el-button>
            </div>
        </el-dialog>
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
			 // 弹框配置
            dialog:{
                width:"800px",
                show:false,
                title:"",
                function_action:'',
            },
            // 弹框数据
            dialogData:{
                tabelData:[],
            },
			// 基本信息
            formList:{},
			// 记录List
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
		// 弹框关闭
        closedia(){
            this.dialogData.tabelData = [];
        },
		// 查看
        pageIndexBtn(data){
            this.dialog.title = '入库商品';
            this.dialog.width = '1000px';
            this.dialog.function_action = 'pageindex'
            this.dialogData.tabelData = data.ware_goods;
            this.dialog.show = true;
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