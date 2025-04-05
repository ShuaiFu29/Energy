<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card>
                <el-input style="width: 80%;" placeholder="请输入关键词" v-model="filterText">
                    <template #append>
                        <el-button icon="Search"></el-button>
                    </template>
                </el-input>
                <el-tree :data="treeData" ref="treeRef" class="mt" style="max-width: 600px;" :props="defaultProps"
                    show-checkbox :filter-node-method="filterNode"></el-tree>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h3>{{ title }}:计费模板</h3>
                    </div>
                </template>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
                    <el-form-item label="模板名称：">
                        <el-input v-model="ruleForm.name" placeholder="请输入模板名称" style="max-width: 200px;"></el-input>
                    </el-form-item>

                    <el-form-item :label="'时间区间' + (index + 1) + '：'" v-for="(timeSlot, index) in ruleForm.date"
                        :key="index">
                        <el-col :span="8">
                            <el-form-item>
                                <el-time-picker v-model="timeSlot.date1" placeholder="选择开始时间"
                                    style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <span class="ml">--</span>
                        </el-col>
                        <el-col :span="8">
                            <el-time-picker v-model="timeSlot.date2" placeholder="选择结束时间"
                                style="width: 100%;"></el-time-picker>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电费：">
                                <el-input v-model="timeSlot.electricity" placeholder="请输入电费"
                                    style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-button type="primary" class="mb" @click="addTimeSlot">添加时间区间</el-button>
                    <el-form-item label="停车费：">
                        <el-input v-model="ruleForm.parking" style="max-width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="服务费：">
                        <el-input v-model="ruleForm.service" style="max-width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="特殊备注：">
                        <el-input v-model="ruleForm.remarks" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">创建</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { cityListApi } from '@/api/operation'
import { watch } from 'vue'
import { ElTree } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
interface Tree {
    label: string,
    children?: Tree[]
}
interface RuleFormType {
    name: string,
    service: string,
    parking: string,
    remarks: string,
    date: Array<{ date1: string, date2: string, electricity: string }>
}
const filterText = ref<string>('')
const treeRef = ref<InstanceType<typeof ElTree>>()
watch(filterText, (val) => {
    treeRef.value!.filter(val)
})
const defaultProps = {
    children: 'children',
    label: 'label'
}
const treeData = ref<Tree[]>([])
onMounted(async () => {
    const { data } = await cityListApi()
    treeData.value = data
})
const filterNode: any = (value: string, data: Tree) => {
    if (!value) return true
    return data.label.includes(value)
}
// 计费模板
const title = ref<string>("")
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleFormType>>({

})
const ruleForm = ref<RuleFormType>({
    name: '',
    service: '',
    parking: '',
    remarks: '',
    date: [
        { date1: '', date2: '', electricity: '' }
    ]
})
const addTimeSlot = () => {
    ruleForm.value.date.push({ date1: '', date2: '', electricity: '' })
}
</script>