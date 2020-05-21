<template>
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="distributionShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
					<el-button plain v-if="Btnshow.exportBtn" type="danger" @click="exportBtn">导出</el-button>
				</div>
			</div>
			<div class="receivListes-header">
				<div class="orhead-orbi_state">
					<span class="orhead-ord_service_states" style="padding-left: 35px;">状态：</span>
					<div class="sd-module-btn" >
						<div v-for="(item, index) in cg_stateList" :key="index" :class="formList.cg_state == item.id?'el-tab-order on':' el-tab-order'" @click="distinguish(item.id)"> {{item.name}} <a v-if="parseInt(item.id) > 0">(<span style="color:red;">{{item.num}}</span>)</a> <span v-else style="color:red;">{{item.num}}</span> </div>
					</div>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="8">
						<el-form-item label="分销单号:" prop="do_number">
							<el-input v-model="formList.do_number" placeholder="请输入分销单号"  clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
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
					<el-col :span="8">
						<el-form-item label="创建人:" prop="do_creator">
							<el-input v-model="formList.do_creator" placeholder="请输入创建人" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="包含产品:" prop="goods_name">
							<el-input v-model="formList.goods_name" placeholder="请输入包含产品" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="创建时间" class="sd-form-item" prop="dataTimes">
							<el-date-picker v-model="formList.dataTimes" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" class="mainIptSelBox">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<div class="plr-10 fr">
						<el-button @click="getinforData(page)" type="primary">搜&nbsp;&nbsp;索</el-button>
						<el-button type="danger" @click="resetForm()">重&nbsp;&nbsp;置</el-button>
					</div>
				</el-row>
			</el-form>
		</el-row>
        <!-- 列表 -->
		<el-row class="mainContentItemBox" v-if="distributionShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">分销列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table :data="props.row.tableLastData" style="width: 100%">
							<el-table-column label="序号" prop="numbermain" />
							<el-table-column label="商品品牌" prop="numbermain1" />
							<el-table-column label="商品类目" prop="numbermain2" />
							<el-table-column label="商品编码" prop="numbermain3" />
							<el-table-column width='300px' label="商品名称" prop="numbermain4" />
							<el-table-column label="型号规格" prop="numbermain5" />
							<el-table-column label="数量" prop="numbermain6" />
							<el-table-column label="已发货数量" prop="numbermain13" />
							<el-table-column label="单位" prop="numbermain7" />
							<el-table-column label="单价" prop="numbermain8" />
							<el-table-column label="税率" prop="numbermain9" />
							<el-table-column label="币种" prop="numbermain10" />
							<el-table-column label="金额" prop="numbermain11" />
							<el-table-column label="预计到货时间" prop="numbermain12" />
						</el-table>
					</template>
				</el-table-column>
                
                
				<el-table-column label="分销单信息" min-width="300">
                    <template slot-scope="scope"> 
                        <div>
                            <p>合同号:{{scope.row.do_contract}}</p>
                            <p>分销单号:{{scope.row.do_number}}</p>
                            <p>分销单位:{{scope.row.distr_name}}</p>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column label="总价" prop="numbers2" />
				<el-table-column label="总数" prop="numbers3" />
				<el-table-column label="已发货总数" prop="numbers10" />
				<el-table-column label="仓库" prop="numbers4" />
				<el-table-column label="创建人" prop="numbers6" />
				<el-table-column label="联系人" prop="numbers8" />
				<el-table-column label="分销状态" prop="numbers9" />
				<el-table-column label="操作" width="260" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button size="mini" plain type="primary" v-if="scope.row.numbers9=='备货中'" @click="addBrandBtn1()">备货</el-button>
						<el-button size="mini" plain type="primary" v-if="scope.row.numbers9=='发货中'">发货</el-button>
						<el-button size="mini" plain type="success" v-if="scope.row.numbers9!='备货中' && scope.row.numbers9!='发货中'" @click="addBrandBtn2()">发货记录</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="tableData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="page" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
    </div>
</template>
<script>
import {Distribution_index} from '@/api/DistributionSystem'
import {getDistributor} from "@/api/commonAction"
export default {
    data() {
        return {
            // 列表数据
            tableData:[],
            // 分销数据
            distributionList:[],
            // 加载
            loading:false,
            // 页面show
            distributionShow:true,
            cg_stateList:[
                {name:'全部',id:'0'},
                {name:'备货',id:'1'},
                {name:'发货中',id:'2'},
                {name:'部分发货 ',id:'3'},
                {name:'完成',id:'4'},
            ],
            //搜索条件
            formList:{
                do_number:'',
                do_distributor:'',
                do_creator:'',
                goods_name:'',
                dataTimes:[],
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
						if(success.data.state_count[i].cg_state == this.cg_stateList[j].id){
							this.cg_stateList[j].num = success.data.state_count[i].num
						}
					}
				}
                if(success.data.code == 200){
                    this.tableData = success.data.data;
                    this.page = success.data.page.page;
                    this.pageSize = success.data.page.page_size;
                    this.totalNum = success.data.page.data_count;
                     for(var i=0;i<success.data.button.length;i++){
                        let butdata = success.data.button[i];
                        if(butdata.action == 'WareRecord'){
                            this.Btnshow.recordBtn = true;
                        }else if(butdata.action == 'Warehousing'){
                            this.Btnshow.WarehousingBtn = true;
                        }else if(butdata.action == 'returnGoods'){
                            this.Btnshow.returnGoodsBtn = true;
                        }else if(butdata.action == 'exportData'){
							this.Btnshow.exportBtn = true;
						}else if(butdata.action == 'exchanGoods'){
							this.Btnshow.exchanGoodsBtn = true;
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
        // 翻页
        handleCurrentChange(e){
            this.getinforData(e);
        },
        // 导出
        exportBtn(){

        }
    },
}
</script>
<style lang="scss">
    
</style>