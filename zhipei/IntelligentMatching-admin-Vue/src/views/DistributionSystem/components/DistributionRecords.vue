<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox detailsd">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">新增分销</div>
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
                            <el-form-item label="分销单号:" prop="do_number" class="mainFormSeeInfoBox">
                                {{formList.do_number}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="分销单位:" prop="distr_name" class="mainFormSeeInfoBox">
                                {{formList.distr_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="创建人:" prop="do_creator" class="mainFormSeeInfoBox">
                                {{formList.do_creator}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="仓库:" prop="ware_name" class="mainFormSeeInfoBox">
                                {{formList.ware_name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="分销总数:" prop="goods_num" class="mainFormSeeInfoBox">
                                {{formList.goods_num}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="发货总数:" prop="fahuo_num" class="mainFormSeeInfoBox">
                                {{formList.fahuo_num}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
				<el-card shadow="never" class="box-card mainCardBorNoneBox">
                    <div slot="header" class="clearfix">
                        <span>发货记录:</span>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="发货单号" align="center"  prop="rk_number" />
                        <el-table-column label="数量" align="center" prop="fahuo_num" />
                        <el-table-column label="操作人" align="center" prop="inware_user" />
                        <el-table-column label="操作时间" align="center" prop="arrival_time" />
                        <el-table-column label="操作类型" align="center"  >
                            <template slot-scope="scope">
                                {{scope.row.rk_waretype == 1?'发货':'作废'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" >
                            <template slot-scope="scope">
                                <el-button @click="pageIndexBtn(scope.row)">查看记录</el-button>
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
						<el-table-column label="序号" min-width="80" align="center">
							<template slot-scope="scope">
								{{scope.$index+1}}
							</template>
						</el-table-column>
						<el-table-column label="商品信息" prop="" width="300">
							<template slot-scope="scope">
								<div>
									<div>商品品牌:{{scope.row.brand_name}}</div>
									<div>商品类目:{{scope.row.sort_directory}}</div>
									<div>商品编码:{{scope.row.general_version}}</div>
									<div>商品名称:{{scope.row.goods_name}}</div>
								</div>
							</template>
						</el-table-column>
                        <el-table-column label="分销数量" align="center" prop="goods_num" />
                        <el-table-column label="发货数量" align="center" prop="ruku_num" />
                        <el-table-column label="单位" align="center" prop="company_unit" />
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
import {Distribution_DeliveryRecord} from '@/api/DistributionSystem'

export default {
    props:{
        do_number:{
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
            // 商品信息
            tableData:[],
            // 基础信息
            formList:{}
        }
    },
    created() {
        this.getinforData();
    },
    methods: {
        // 获取信息
        getinforData(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let datadd = {};
            datadd.do_number = this.do_number;
            Distribution_DeliveryRecord(datadd).then(success=>{
                loading.close();
                if(success.data.code == 200){
                    this.formList = success.data.data.do_data;
                    this.tableData = success.data.data.ware_inorderData;
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'success'
                    });
                    this.back();
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:'数据获取'
                })
                this.back();
            })
        },
        closedia(){
            this.formList.tabelData = [];
        },
        // 查看
        pageIndexBtn(data){
            this.dialog.title = '发货商品';
            this.dialog.width = '1000px';
            this.dialog.function_action = 'pageindex'
            this.dialogData.tabelData = data.ware_goods;
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