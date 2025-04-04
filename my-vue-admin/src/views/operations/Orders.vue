<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="请输入订单号" v-model="searchParams.orderNo"></el-input>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="订单状态" v-model="searchParams.status">
                    <el-option label="全部" :value="1"></el-option>
                    <el-option label="进行中" :value="2"></el-option>
                    <el-option label="已完成" :value="3"></el-option>
                    <el-option label="异常" :value="4"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-model="searchParams.no">
                <el-input placeholder="设备编号"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-col>
            <el-col :span="6" class="mt">
                <el-input placeholder="请输入站点名称" v-model="searchParams.name"></el-input>
            </el-col>
            <el-col :span="6" class="mt">
                <el-date-picker v-model="data" type="daterange" range-separator="/" start-placeholder="开始时间"
                    end-placeholder="结束时间" @change="handleChange" value-format="YYYY-MM-DD" />
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="danger">批量删除</el-button>
        <el-button icon="Download" type="primary">导出订单数据到Excel</el-button>
    </el-card>
    <el-card class="mt">
        <el-table>
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
            <el-table-column label="订单日期" prop="data"></el-table-column>
            <el-table-column label="开始时间" prop="startTime"></el-table-column>
            <el-table-column label="结束时间" prop="endTime"></el-table-column>
            <el-table-column label="金额" prop="money"></el-table-column>
            <el-table-column label="支付方式" prop="pay"></el-table-column>
            <el-table-column label="订单状态" prop="status"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small">详情</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const data = ref([])
interface SearchParams {
    orderNo: string,
    status: number,
    no: string,
    name: string,
    startTime: string,
    endTime: string
}
const searchParams = ref<SearchParams>({
    orderNo: '',
    status: 1,
    no: '',
    name: '',
    startTime: '',
    endTime: ''
})
const handleChange = (val: string[]) => {
    searchParams.value.startTime = val[0]
    searchParams.value.endTime = val[1]
}
</script>