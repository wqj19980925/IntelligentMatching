<template>
	<!-- 信息筛选 -->
    <div class="mainContentItemBox">
        <div class="mainHeaderTitleBox">
            <div class="titleNameBox">信息筛选</div>
            <div class="buttonBox">
                <el-button plain type="danger">导出</el-button>
            </div>
        </div>
        <el-form ref="formList" :model="formList" size="medium" label-width="100px" class="mainSearchItemBox">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="采购单号:" prop="bra_name">
                        <el-input v-model="formList.bra_name" placeholder="请输入采购单号" max="10" :maxlength="10" clearable class="mainIptSelBox" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="供货单位:" prop="bra_name1">
                        <el-select v-model="formList.bra_name1" clearable class="mainIptSelBox">
                            <el-option v-for="item in stateSelectInfo" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="创建人:" prop="bra_name2">
                        <el-input v-model="formList.bra_name2" placeholder="请输入创建人" max="10" :maxlength="10" clearable class="mainIptSelBox" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="包含产品:" prop="bra_name4">
                        <el-input v-model="formList.bra_name4" placeholder="请输入包含产品" max="10" :maxlength="10" clearable class="mainIptSelBox" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="总金额:" prop="bra_name5">
                        <el-input style="width: 40%;" v-model="formList.bra_name5" placeholder="最小值" max="10" :maxlength="10" clearable/> -
                        <el-input style="width: 40%;" v-model="formList.bra_name6" placeholder="最大值" max="10" :maxlength="10" clearable/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="创建时间" class="sd-form-item" prop="dataTimes">
                        <el-date-picker v-model="dataTimes" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <div class="plr-10 fr">
                    <el-button class type="primary">搜&nbsp;&nbsp;索</el-button>
                    <el-button type="danger" @click="resetForm()">重&nbsp;&nbsp;置</el-button>
                </div>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formList:{
                state:0
            },
            // 时间快捷
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    }
}
</script>