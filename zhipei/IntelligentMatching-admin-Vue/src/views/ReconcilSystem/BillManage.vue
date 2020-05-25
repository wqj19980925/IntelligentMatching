<template lang="">
    <div>
        <!-- 信息筛选 -->
		<el-row class="mainContentItemBox" v-if="BillShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox">
					<el-button  v-if="Btnshow.exportBtn" class="btn-delete" @click="exportBtn">导出</el-button>
				</div>
			</div>
			<div class="receivListes-header">
				<div class="orhead-orbi_state">
					<span class="orhead-ord_service_states" style="padding-left: 35px;">状态：</span>
					<div class="sd-module-btn" >
						<div v-for="(item, index) in cg_stateList" :key="index" :class="formList.bi_state == item.id?'el-tab-order on':' el-tab-order'" @click="distinguish(item.id)"> {{item.name}} <a v-if="parseInt(item.id) > 0">(<span style="color:red;">{{item.num}}</span>)</a> <span v-else style="color:red;">{{item.num}}</span> </div>
					</div>
				</div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="流水号:" prop="bi_number">
							<el-input v-model="formList.bi_number" placeholder="请输入流水号" max="20" :maxlength="20" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="来往单位:" prop="unit_id">
							<el-select                                 
                                v-model="formList.unit_id"
                                filterable
                                remote
								class="mainIptSelBox"
                                clearable
                                reserve-keyword
                                placeholder="请输入来往单位"
                                :remote-method="getUnits"
                                :loading="loading"
                            >
								<el-option v-for="item in UnitsList" :key="item.unit_id" :label="item.name" :value="item.unit_id" />
							</el-select>
						</el-form-item>
					</el-col>					
					<el-col :span="6">
						<el-form-item label="创建人:" prop="creator">
							<el-input v-model="formList.creator" placeholder="请输入创建人" max="10" :maxlength="10" clearable class="mainIptSelBox" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="创建时间:" class="sd-form-item" prop="dataTimes">
							<el-date-picker v-model="formList.dataTimes" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="结款时间:" class="sd-form-item" prop="dataTimest">
							<el-date-picker v-model="formList.dataTimest" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<div class="plr-10 fr">
						<el-button @click="getInforData(page)" type="primary">搜&nbsp;&nbsp;索</el-button>
						<el-button @click="resetForm()">重&nbsp;&nbsp;置</el-button>
					</div>
				</el-row>
			</el-form>
		</el-row>
        <!-- 列表 -->
		<el-row class="mainContentItemBox" v-if="BillShow">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">账单列表</div>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column min-width='200px' label="账单信息" align="left" >
                    <template slot-scope="scope">
                        <div>
                            <div>账单编号:{{scope.row.bi_number}}</div>
                            <div>单量:{{scope.row.bi_quantity}}</div>
                            <div>来往单位:{{scope.row.unit_name}}</div>
                        </div>
                    </template>
                </el-table-column>
				<el-table-column label="结款金额" align="center" prop="bi_amount" />
				<el-table-column label="联系人" align="center" prop="shr_name" />
				<el-table-column label="联系电话" align="center" prop="shr_phone" />
				<el-table-column min-width='200px'  align="center" label="起止日期">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.time_start}} 至 {{scope.row.time_end}}                            
                        </div>
                    </template>
                </el-table-column>
				<el-table-column label="结款状态"  align="center">
                    <template slot-scope="scope">
                        {{scope.row.bi_state == 1?'待审核':scope.row.bi_state == 1?'未结款':scope.row.bi_state == 1?'部分结款':'已结款'}}
                    </template>
                </el-table-column>
				<el-table-column label="操作" min-width="150"  align="center">
					<template slot-scope="scope">
					    <el-button type="primary" v-if="Btnshow.ToexamineBtn && scope.row.bi_state == 1" @click="ToexamineBtn(scope.row)">账单审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div v-if="tableData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="page" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange" />
			</div>
		</el-row>
        <toexamine v-if="ToexamineShow" :bi_number="bi_number"  @listerToChild="returnparent()" ></toexamine>
    </div>
</template>
<script>
import {BillManage_index,BillManage_exportData} from '@/api/ReconcilSystem'
import {getinoutUnits} from "@/api/commonAction"
import toexamine from './components/toexamine'
export default {
    components:{toexamine},
    data(){
        return{
            // 加载
            loading:false,
            // 账单show
            BillShow:true,
            // 审核组件
            ToexamineShow:false,
            // 来往单位LIst
            UnitsList:[],
            // 列表数据
            tableData:[],
            // 搜索数据
            formList:{
                bi_state:0,
                unit_id:"",
                bi_number:"",
                creator:"",
                dataTimes:[],
                dataTimest:[],
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
            // 权限按钮
            Btnshow:{},
            // 状态数据
            cg_stateList:[
                {id:'0',name:'全部'},
                {id:'1',name:'待审核'},
                {id:'2',name:'未结款'},
                {id:'3',name:'部分结款'},
                {id:'4',name:'已结款'},
            ],
            pageSize:0,//页数量
            totalNum:0,//总条数
            page:1,//页码
        }
    },
    created() {
        this.getInforData(this.page)
    },
    methods: {
        // 获取列表数据
        getInforData(page){
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
            if(this.formList.dataTimest.length != 0){
                datadd.setment_start = this.formList.dataTimest[0];
                datadd.setment_end = this.formList.dataTimest[1];
            }
            datadd.page = page;
            BillManage_index(datadd).then(success=>{
                loading.close();
                for(var i=0;i<success.data.state_count.length;i++){
					for(var j=0;j<this.cg_stateList.length;j++){
						if(success.data.state_count[i].bi_state == this.cg_stateList[j].id){
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
                        if(butdata.action == 'Toexamine'){
                            this.Btnshow.ToexamineBtn = true;
                        }else if(butdata.action == 'exportData'){
							this.Btnshow.exportBtn = true;
						}
                    }
                }else{
                    this.tableData = [];
                }
            }).catch(err=>{
                loading.close();
                this.$message({
                    message:"数据获取失败！",
                    type:"error"
                })
            })
        },
        // 翻页1
        handleCurrentChange(e){
            this.getInforData(e);
        },
        // 审核
        ToexamineBtn(data){
            this.bi_number = data.bi_number;
            this.BillShow = false;
            this.ToexamineShow = true;
        },
         // 状态
		distinguish(data) {
			this.formList.bi_state = data;
			this.getInforData(this.page)
		},
        // 获取来往单位
        getUnits(e){
            this.loading = true;
            let datadd = {};
            datadd.unit_name = e;
            getinoutUnits(datadd).then(success=>{
                this.loading = false;
                if(success.data.code == 200){
                    this.UnitsList = success.data.data;
                }else{
                    this.UnitsList = [];
                }
            }).catch(err=>{
                this.loading = false;
                this.UnitsList = [];
            })
        },
        // 重置
        resetForm(){
			this.$refs.formList.resetFields();
        },
        returnparent(){
            this.ToexamineShow = false;
            this.BillShow = true;
            this.getInforData(this.page)
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
            if(this.formList.dataTimest.length != 0){
                datadd.setment_start = this.formList.dataTimest[0];
                datadd.setment_end = this.formList.dataTimest[1];
            }
            datadd.page = this.page;
            BillManage_exportData(datadd).then(success=>{
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