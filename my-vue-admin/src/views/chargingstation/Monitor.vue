<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model.trim="formParams.input" placeholder="请输入站点名称、id">
                    <template #append>
                        <el-select v-model="select" style="width: 115px">
                            <el-option label="按名称查询" value="name" />
                            <el-option label="按ID查询" value="id" />
                        </el-select>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="formParams.value" placeholder="充电站状态">
                    <el-option :value="1" label="全部"></el-option>
                    <el-option :value="2" label="使用中"></el-option>
                    <el-option :value="3" label="空闲中"></el-option>
                    <el-option :value="4" label="维护中"></el-option>
                    <el-option :value="5" label="待维修"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click='loadData'>查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-row>
            <el-col :span="6">
                <el-statistic title="累计充电量(度)" :value="268900" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计充电次数(次)" :value="1389"></el-statistic>
            </el-col>
            <el-col :span="6">
                <el-statistic title="服务区域(个)" :value="88" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计效益(元)" :value="5622178">
                </el-statistic>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="primary">
            <el-icon style="margin-right: 5px;">
                <Plus />
            </el-icon>
            新增充电站
        </el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" style="width: 100%;" v-loading="loading">
            <el-table-column type="index" width="80" label="序号"></el-table-column>
            <el-table-column prop="name" label="站点名称"></el-table-column>
            <el-table-column prop="id" label="站点ID"></el-table-column>
            <el-table-column prop="city" label="所属城市"></el-table-column>
            <el-table-column prop="fast" label="快充数"></el-table-column>
            <el-table-column prop="slow" label="慢充数"></el-table-column>
            <el-table-column prop="status" label="充电站状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 2" type="primary">使用中</el-tag>
                    <el-tag v-if="scope.row.status === 3" type="success">空闲中</el-tag>
                    <el-tag v-if="scope.row.status === 4" type="warning">维护中</el-tag>
                    <el-tag v-if="scope.row.status === 5" type="danger">待维修</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="now" label="正在充电"></el-table-column>
            <el-table-column prop="fault" label="故障数"></el-table-column>
            <el-table-column prop="person" label="站点负责人"></el-table-column>
            <el-table-column prop="tel" label="负责人电话"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]" :background="true" layout="total, sizes, prev, pager, next, jumper"
            :total="totals" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
    </el-card>
    <StationForm :dialog-visible="visible" @close='visible = false' />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { listApi } from '@/api/chargingstations'
import StationForm from './components/StationForm.vue'
import type { RowType } from '@/types/station'
import { useStationStore } from '@/store/station'
const formParams = reactive({
    input: "",
    value: 1
})
const select = ref("name")
const tableData = ref<RowType[]>([]);
const loading = ref<boolean>(false);
const totals = ref<number>(0)
const pageInfo = reactive({
    page: 1,
    pageSize: 10
})
const loadData = async () => {
    loading.value = true
    const { data: { list, total } } = await listApi({ ...pageInfo, status: formParams.value, [select.value]: formParams.input });
    totals.value = total
    tableData.value = list
    loading.value = false
}
onMounted(() => {
    loadData()
})
const handleSizeChange = (size: number) => {
    pageInfo.pageSize = size
    loadData()
}
const handleCurrentChange = (page: number) => {
    pageInfo.page = page;
    loadData()
}
const handleReset = () => {
    pageInfo.page = 1
    pageInfo.pageSize = 10
    formParams.input = ''
    formParams.value = 1
    select.value = 'name'
    loadData()
}
const visible = ref<boolean>(false)
const stationStore = useStationStore()
const { setRowData } = stationStore
const edit = (row: RowType) => {
    setRowData(row)
    visible.value = true
}

</script>