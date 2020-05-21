<template>
	<div>
		<!-- 信息筛选 -->
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">信息筛选</div>
				<div class="buttonBox"></div>
			</div>
			<el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
				<el-row>
					<el-col :span="6">
						<el-form-item label="操作人:" prop="oplo_adm_name">
							<el-input v-model="formList.oplo_adm_name" placeholder="请输入操作人" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="操作模块:" prop="oplo_module">
							<el-input v-model="formList.oplo_module" placeholder="请输入操作模块" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="操作功能:" prop="oplo_action">
							<el-input v-model="formList.oplo_action" placeholder="请输入操作功能" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="操作内容:" prop="oplo_content">
							<el-input v-model="formList.oplo_content" placeholder="请输入操作内容" clearable class="mainIptSelBox"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="操作时间:" prop="startEndTime">
							<el-date-picker v-model="formList.startEndTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" clearable class="mainIptSelBox"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-button type="primary" @click="searchList('formList')">搜&nbsp;&nbsp;索</el-button>
						<el-button @click="resetForm('formList')">重&nbsp;&nbsp;置</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row class="mainContentItemBox">
			<div class="mainHeaderTitleBox">
				<div class="titleNameBox">日志列表</div>
				<div class="buttonBox"></div>
			</div>
			<el-table :data="listData" width="100%">
				 <el-table-column label="操作人" prop="oplo_adm_name" align="center" min-width="60px"/>
					<el-table-column label="操作ip" prop="oplo_ip" align="center" min-width="60px"/>
					<el-table-column label="操作模块" prop="oplo_module" align="center" min-width="80px"/>
					<el-table-column label="操作功能" prop="oplo_action" align="center" min-width="80px"/>
					<el-table-column label="操作时间" prop="oplo_create_time" align="center" min-width="80px"/>
					<el-table-column label="操作内容" prop="oplo_content" align="center" min-width="180px"/>
			</el-table>
			<div v-if="listData.length>0" class="mainPageTurningBox">
				<el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="total, prev, pager, next, jumper" background @current-change="handleCurrentChange"/>
			</div>
		</el-row>
	</div>
</template>

<script>
import { SystemLogs_index } from '@/api/system'
import { errorStatus } from '@/utils/index'
export default {
	name: 'LogList',
	data() {
		return {
			// 搜索表单
			formList: {
				oplo_adm_name: '',
				oplo_module: '',
				oplo_action: '',
				oplo_content: '',
				startEndTime:[],
				oplo_create_time_start	: '',
				oplo_create_time_end: '',
			},
			listData: [],//列表
			currentPage: 1,
			pageSize: null,
			totalNum: null,
		}
	},
	created() {
		// 页面加载时
		this.getPageInfo()
	},
	methods: {
		// 获取列表
		getPageInfo() {
			if(this.formList.startEndTime){
				this.formList.oplo_create_time_start = this.formList.startEndTime[0];
				this.formList.oplo_create_time_end = this.formList.startEndTime[1];
			}else{
				this.formList.oplo_create_time_start = '';
				this.formList.oplo_create_time_end = '';
			}
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			let data = {};
			data = this.formList;
			data.page = this.currentPage;
			SystemLogs_index(data).then(response => {
				loading.close()
				const dataRep = response.data
				if (errorStatus(dataRep)) {
					this.listData = dataRep.data.data
					this.currentPage = dataRep.data.current_page
					this.pageSize = dataRep.data.current_number
					this.totalNum = dataRep.data.total
				}
			})
			.catch(err => {
				loading.close()
				this.$message.error('请求失败!')
			})
		},
		// 搜索
		searchList(formName) {
			this.currentPage = 1
			this.getPageInfo();
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		// 页面跳转
		handleCurrentChange(val) {
			this.currentPage = val
			this.getPageInfo();
		}
	}
}
</script>



