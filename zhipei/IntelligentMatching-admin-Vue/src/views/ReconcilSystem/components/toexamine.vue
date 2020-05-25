<template lang="">
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">审核账单</div>
				<div class="buttonBox">
					<el-button  type="primary" @click="back()">返回</el-button>
				</div>
			</div>
            <!-- 基本信息 -->
            <el-form>
                <el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>基本信息:</span>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="流水号:" prop="bi_number" class="mainFormSeeInfoBox">
                                {{formList.bi_number}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="来往单位:" prop="unit_name" class="mainFormSeeInfoBox">
                                {{formList.unit_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="创建人:" prop="creator" class="mainFormSeeInfoBox">
                                {{formList.creator}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结款金额:" prop="bi_amount" class="mainFormSeeInfoBox">
                                {{formList.bi_amount}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备注:" prop="remarks">
                                <el-input v-model="formList.remarks" placeholder="请输入备注"  clearable class="mainIptSelBox" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
           
            <el-card shadow="never" class="box-card mainCardBorNoneBox">
                <div slot="header" class="clearfix">
                    <span>子单列表:</span>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="单号"  align="center" prop="number" />
                    <el-table-column label="金额"  align="center" prop="amount" />
                    <el-table-column label="操作人"  align="center" prop="creator" />
                    <el-table-column label="操作时间"  align="center" prop="create_time" />
                    <el-table-column label="操作"   align="center">
                        <template slot-scope="scope">
                            <div>
                                <el-button @click="pageIndexBtn(scope.row)">查看商品</el-button>
                            </div>
                        </template>
                    </el-table-column >
                </el-table>
            </el-card>
        </el-row>
        
        <!-- 提交 -->
        <div style="height: 61px;"></div>
        <div class="bottomBtn">
			<el-button type="primary" @click="addexamins(1)">通过</el-button>
			<el-button type="primary" @click="addexamins(2)">驳回</el-button>
		</div>
        <!-- 弹框 -->
        <el-dialog :visible.sync="dialog.show" :title="dialog.title" :close-on-click-modal="false" :width="dialog.width" @close="closedia">
            <el-form ref="dialogData" :model="dialogData">
                <div v-if="dialog.function_action == 'pageindex'">
                    <el-table :data="dialogData.tabelData" style="width: 100%">
						<el-table-column label="序号" min-width="80" align="center">
							<template slot-scope="scope" >
								{{scope.$index+1}}
							</template>
						</el-table-column>
						<el-table-column label="商品信息" min-width="300">
							<template slot-scope="scope">
								<div>
									<div>商品品牌:{{scope.row.brand_name}}</div>
									<div>商品类目:{{scope.row.sort_directory}}</div>
									<div>商品编码:{{scope.row.general_version}}</div>
									<div>商品名称:{{scope.row.goods_name}}</div>
								</div>
							</template>
						</el-table-column>
                        <el-table-column label="采购价"  align="center" prop="univalence" />
                        <el-table-column label="采购数量"  align="center" prop="goods_num" />
                        <el-table-column label="单位"  align="center" prop="company_unit" />
                        <el-table-column label="单品总价"  align="center" prop="money" />
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
import {BillManage_Toexamine} from "@/api/ReconcilSystem"
export default {
    props:{
        bi_number:{
            type:String,
            default:''
        }
    },
    data() {
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
            // 列表数据
            tableData:[],
        }
    },
    created() {
        this.getInforData();
    },
    methods: {
        // 获取数据
        getInforData(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let datadd = {};
            datadd.type = 1;
            datadd.bi_number = this.bi_number;
            BillManage_Toexamine(datadd).then(success=>{
                loading.close();
                if(success.data.code == 200){
                    this.formList = success.data.data.bi_data;
                    this.tableData = success.data.data.son_order;
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error'
                    })
                    this.back()
                }
            }).catch(err=>{
                this.$message({
                    message:"数据获取失败！",
                    type:'error'
                })
                this.back();
            })
        },
        // 弹框关闭
        closedia(){
            this.dialogData.tabelData = [];
        },
       
        // 提交 type 1 通过 2 驳回
        addexamins(type){
            let datadd = {};
            datadd.type = 2;
            datadd.bi_number = this.bi_number;
            datadd.examine_type = type;
            datadd.remarks = this.formList.remarks;
            BillManage_Toexamine(datadd).then(success=>{
                if(success.data.code == 200){
                    this.$message({
                        message:success.data.data,
                        type:"success"
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
                    message:'审核失败！',
                    type:'error'
                })
            })
        },
        // 查看
        pageIndexBtn(data){
            this.dialog.title = '采购商品';
            this.dialog.width = '1000px';
            this.dialog.function_action = 'pageindex'
            this.dialogData.tabelData = data.goods;
            this.dialog.show = true;
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