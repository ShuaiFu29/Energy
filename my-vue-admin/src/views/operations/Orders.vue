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
                <el-button type="primary" @click="loadData">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
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
        <el-button type="danger" :disabled="!selectionList.length" @click="handleBatchDelete">批量删除</el-button>
        <el-button icon="Download" type="primary" :disabled="!selectionList.length">导出订单数据到Excel</el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="dataList" v-loading="loading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
            <el-table-column label="订单日期" prop="date"></el-table-column>
            <el-table-column label="开始时间" prop="startTime"></el-table-column>
            <el-table-column label="结束时间" prop="endTime"></el-table-column>
            <el-table-column label="金额" prop="money"></el-table-column>
            <el-table-column label="支付方式" prop="pay"></el-table-column>
            <el-table-column label="订单状态" prop="status">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.status === 2">进行中</el-tag>
                    <el-tag type="primary" v-else-if="scope.row.status === 3">已完成</el-tag>
                    <el-tag type="warning" v-else-if="scope.row.status === 4">异常</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small">详情</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]" :background="true" layout="total, sizes, prev, pager, next, jumper"
            :total="totals" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
    </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useHttp } from '@/hooks/useHttp'
import { batchDeleteApi } from '@/api/operation'
import { ElMessage } from 'element-plus'
interface SearchType {
    orderNo: string,
    status: number,
    no: string,
    name: string,
    startDate: string,
    endDate: string
}

interface SelectionListType {
    orderNo: string,
    equipmentNo: string,
    date: string,
    startTime: string,
    endTime: string,
    money: string,
    pay: string,
    status: number
}
const date = ref()
const searchParams = ref<SearchType>({
    orderNo: "",
    status: 1,
    no: "",
    name: "",
    startDate: "",
    endDate: ""
})
const handleChange = (val: string[]) => {
    searchParams.value.startDate = val[0]
    searchParams.value.endDate = val[1]
}
const {
    dataList,
    loading,
    totals,
    pageInfo,
    loadData,
    handleSizeChange,
    handleCurrentChange,
    resetPagination
} = useHttp<SelectionListType>("/orderList", searchParams);
const handleReset = () => {
    date.value = ""
    searchParams.value = {
        orderNo: "",
        status: 1,
        no: "",
        name: "",
        startDate: "",
        endDate: ""
    }
    resetPagination()
}
const selectionList = ref<SelectionListType[]>([])
const handleSelectionChange = (selection: SelectionListType[]) => {
    selectionList.value = selection
}
const handleBatchDelete = async () => {
    try {
        const res = await batchDeleteApi(selectionList.value.map((item: SelectionListType) => item.orderNo))
        if (res.code) {
            ElMessage({
                message: res.data,
                type: 'success'
            })
            loadData()
        }
    } catch (error) {
        console.log(error)
    }

}
</script>