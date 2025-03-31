<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="formParams.input" placeholder="请输入站点名称、id">
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
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
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
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { listApi } from '@/api/chargingstations'
const formParams = reactive({
    input: "",
    value: 1
})
const select = ref("name")
const loadData = async () => {
    const res = await listApi({ page: 1, pageSize: 10, status: 1 })
    console.log(res)
}
onMounted(() => {
    loadData()
})
</script>