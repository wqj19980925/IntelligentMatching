<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="pageindexShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
                    
					<el-button type="primary" v-if="Btnshow.AddDistribBtn" @click="AddDistribBtn">新增</el-button>
					<el-button  v-if="Btnshow.exportBtn" class="btn-delete" @click="exportBtn">导出</el-button>
					<el-button  v-if="Btnshow.GenerateBillBtn" class="btn-delete" @click="GenerateBillBtn">生成账单</el-button>
                    
				</div>
			</div>
			<div class="receivListes-header">
				<div class="orhead-orbi_state">
					<span class="orhead-ord_service_states" style="padding-left: 35px;">状态：</span>
					<div class="sd-module-btn" >
						<div v-for="(item, index) in cg_stateList" :key="index" :class="formList.do_state == item.id?'el-tab-order on':' el-tab-order'" @click="distinguish(item.id)"> {{item.name}} <a v-if="parseInt(item.id) > 0">(<span style="color:red;">{{item.num}}</span>)</a> <span v-else style="color:red;">{{item.num}}</span> </div>
					</div>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="分销单号:" prop="do_number">
							<el-input v-model="formList.do_number" placeholder="请输入分销单号"  clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="分销单位:" prop="do_distributor">
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
                                    :value="item.distributor_name">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="创建人:" prop="do_creator">
							<el-input v-model="formList.do_creator" placeholder="请输入创建人" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="包含产品:" prop="goods_name">
							<el-input v-model="formList.goods_name" placeholder="请输入包含产品" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="创建时间" class="sd-form-item" prop="dataTimes">
							<el-date-picker v-model="formList.dataTimes" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" class="mainIptSelBox">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<div class="plr-10 fr">
						<el-button @click="getinforData(page)" type="primary">搜&nbsp;&nbsp;索</el-button>
						<el-button @click="resetForm()">重&nbsp;&nbsp;置</el-button>
					</div>
				</el-row>
			</el-form>
		</el-row>
        <!-- 列表 -->
		<el-row class="mainContentItemBox" v-if="pageindexShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">分销列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%" @selection-change="batchData">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="分销单信息" min-width="300">
                    <template slot-scope="scope"> 
                        <div>
                            <div>合同号:{{scope.row.do_contract}}</div>
                            <div>分销单号:{{scope.row.do_number}}</div>
                            <div>分销单位:{{scope.row.distr_name}}</div>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column label="总价" v-if="group_type == 1" align="center" prop="do_amount" />
				<el-table-column label="总数" align="center" prop="goods_count" />
				<el-table-column label="已发货总数" min-width="150" align="center" prop="fahuo_count" />
				<el-table-column label="仓库" align="center" prop="ware_name" />
				<el-table-column label="创建人" align="center" prop="do_creator" />
				<el-table-column label="联系人" align="center" prop="shr_name" />
				<el-table-column label="分销状态" align="center">
                    <template slot-scope="scope">
                        {{cg_stateList[scope.row.do_state].name}}
                    </template>
                </el-table-column>
				<el-table-column label="操作" width="260" fixed="right" align="center">
					<template slot-scope="scope">
                        <div class="mainOperationBtnBox">
                            <!-- <el-button type="primary" v-if="scope.row.numbers9=='备货中'" @click="addBrandBtn1()">分销备货</el-button>
                            <el-button type="primary" v-if="scope.row.numbers9=='发货中'">分销发货</el-button> -->
                            <el-button type="primary" v-if="Btnshow.DeliveryRecordBtn" @click="DeliveryRecordBtn(scope.row)">发货记录</el-button>
                            <el-button v-if="Btnshow.pageIndexBtn" @click="pageIndexBtn(scope.row)">查看分销</el-button>
                        </div>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="tableData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="page" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
        <!-- 弹框 -->
        <el-dialog :visible.sync="dialog.show" :title="dialog.title" :close-on-click-modal="false" :width="dialog.width" @close="closedia">
            <el-form ref="dialogData" :model="dialogData">
                <div v-if="dialog.function_action == 'pageindex'">
                    <el-table :data="dialogData.tabelData" style="width: 100%">
                        <el-table-column label="序号" width="60" align="center">
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
                                    <div>型号规格:{{scope.row.goods_standard}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="数量"  min-width="60" align="center" prop="goods_num" />
                        <el-table-column label="已发货数量" align="center" min-width="95" prop="ruku_num" />
                        <el-table-column label="单位" align="center" prop="company_unit" />
                        <el-table-column label="单价" v-if="group_type == 1" align="center" prop="univalence" />
                        <el-table-column label="税率" v-if="group_type == 1" min-width="80" align="center" prop="tax_rate" />
                        <el-table-column label="币种" v-if="group_type == 1" align="center" prop="currency" />
                        <el-table-column label="金额" v-if="group_type == 1" align="center" prop="money" />
						<el-table-column label="预计到货时间" v-if="group_type == 1" min-width="140" align="center" prop="estimate_time" />
                    </el-table>
                </div>
            </el-form>
            <div align="center" slot="footer" >
                <el-button class="btn-delete" @click="dialog.show = false">关 闭</el-button>
            </div>
        </el-dialog>
        <!-- 发货记录 -->
        <distribution-records :do_number="do_number" v-if="distributionShow" @listerToChild="record"></distribution-records>
        <!-- 新增分销 -->
        <add-distribution :group_type="group_type" v-if="addDistributionShow" @listerToChild="record"></add-distribution>
    </div>
</template>
<script>
import {Distribution_index,Distribution_GenerateBill,Distribution_exportData} from '@/api/DistributionSystem'
import {getDistributor} from "@/api/commonAction"
import DistributionRecords from './components/DistributionRecords'
import addDistribution from './components/addDistribution'
export default {
    components:{
        DistributionRecords,
        addDistribution
    },
    data() {
        return {
            //1 正常页面和展示   2 分销商查看页面
            group_type:'',
            // 本页页面
            pageindexShow:true,
            // 添加页面
            addDistributionShow:false,
            // 分销记录Show
            distributionShow:false,
            // 分销单号
            do_number:"",
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
            // 列表数据
            tableData:[],
            // 分销数据
            distributionList:[],
            // 加载
            loading:false,
            // 状态 LIst
            cg_stateList:[
                {name:'全部',id:'0'},
                {name:'备货',id:'1'},
                {name:'发货中',id:'2'},
                {name:'部分发货 ',id:'3'},
                {name:'完成',id:'4'},
                {name:'失效',id:'5'},
            ],
            //搜索条件
            formList:{
                do_number:'',
                do_distributor:'',
                do_creator:'',
                goods_name:'',
                dataTimes:[],
                do_state:'0'
            },
            // 按钮权限
            Btnshow:{},
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
            // 批量操作数据
            batchchagngsData:[],
            pageSize:0,//页数量
            totalNum:0,//总条数
            page:1,//页码
        }
    },
    created() {
        this.getinforData(this.page)
    },
    methods: {
        // 获取数据
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
            datadd.page = this.page;
            Distribution_index(datadd).then(success=>{
                loading.close();
                for(var i=0;i<success.data.state_count.length;i++){
					for(var j=0;j<this.cg_stateList.length;j++){
						if(success.data.state_count[i].do_state == this.cg_stateList[j].id){
							this.cg_stateList[j].num = success.data.state_count[i].num
						}
					}
				}
                if(success.data.code == 200){
                    this.group_type = success.data.group_type;
                    this.tableData = success.data.data;
                    this.page = success.data.page.page;
                    this.pageSize = success.data.page.page_size;
                    this.totalNum = success.data.page.data_count;
                    for(var i=0;i<success.data.button.length;i++){
                        let butdata = success.data.button[i];
                        if(butdata.action == 'AddDistrib'){
                            this.Btnshow.AddDistribBtn = true;
                        }else if(butdata.action == 'DeliveryRecord'){
                            this.Btnshow.DeliveryRecordBtn = true;
                        }else if(butdata.action == 'returnGoods'){
                            this.Btnshow.returnGoodsBtn = true;
                        }else if(butdata.action == 'exportData'){
							this.Btnshow.exportBtn = true;
						}else if(butdata.action == 'GenerateBill'){
							this.Btnshow.GenerateBillBtn = true;
						}else if(butdata.action == 'index'){
                            this.Btnshow.pageIndexBtn = true;
                        }
                    }
                }else{
                    this.tableData = [];
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:'数据获取失败！',
                    type:'error'
                })
            })
        },
        // 状态切换
		distinguish(data) {
			this.formList.do_state = data;
			this.getinforData(this.page)
		},
        // 重置
        resetForm(){
			this.$refs.formList.resetFields();
        },
        // 子组件返回
        record(){
            this.addDistributionShow = false;
            this.distributionShow = false;
            this.pageindexShow = true;
            this.getinforData(this.page)
        },
        // 新增分销
        AddDistribBtn(){
            this.pageindexShow = false;
            this.addDistributionShow = true;
        },
        // 弹框关闭
        closedia(){
            this.dialogData.tabelData = [];
        },
        // 发货记录
        DeliveryRecordBtn(data){
            this.do_number = data.do_number;
            this.distributionShow = true;
            this.pageindexShow = false;
        },
         // 查看
        pageIndexBtn(data){
            this.dialog.title = '入库商品';
            this.dialog.width = '1100px';
            this.dialog.function_action = 'pageindex'
            this.dialogData.tabelData = data.storage_goods;
            this.dialog.show = true;
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
        // 翻页
        handleCurrentChange(e){
            this.getinforData(e);
        },
        // 批量操作
        batchData(val){
            this.batchchagngsData = val;
        },
        //生成账单
        GenerateBillBtn(){
            console.log(this.batchchagngsData)
            if(this.batchchagngsData.length==0){
                this.$message({
                    message:'请先选择列表数据',
                    type:"warning"
                })
                return false;
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let do_number = [];
            for(let i=0;i<this.batchchagngsData.length;i++){
                do_number.push(this.batchchagngsData[i].do_number)
            }
            var datadd  = {};
            datadd.do_number = do_number;
            Distribution_GenerateBill(datadd).then(success=>{
                loading.close();
                if(success.data.code == 200){
                    this.$message({
                        message:success.data.data,
                        type:'success'
                    })
                    this.getinforData(this.page)
                }else{
                    this.$message({
                        message:success.data.data,
                        type:'error'
                    })
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:'生成账单失败！',
                    type:"error"
                })
            })
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
            Distribution_exportData(datadd).then(success=>{
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
        }
    },
}
</script>
<style lang="scss">
    
</style>