<template>
    <el-card>
        <div class="mt">
            <span class="title">文章类型:</span>
            <el-tag type="primary" class="mr">全部</el-tag>
            <el-tag type="info" class="mr" v-for="item in typeList.type" :key="item">{{ item }}</el-tag>
        </div>
        <div class="mt">
            <span class="title">重要程度:</span>
            <el-tag type="primary" class="mr">全部</el-tag>
            <el-tag type="info" class="mr" v-for="item in typeList.important" :key="item">{{ item }}</el-tag>
        </div>
        <div class="mt">
            <span class="title">发布渠道:</span>
            <el-tag type="primary" class="mr">全部</el-tag>
            <el-tag type="info" class="mr" v-for="item in typeList.publish" :key="item">{{ item }}</el-tag>
        </div>
        <el-divider />
        <div class="mt">
            <span class="title">已选:</span>
            <el-tag type="success" class="mr" closable>全部</el-tag>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { typeListApi } from "@/api/document";
import { onMounted, ref } from "vue";
interface ListType {
    type: string[],
    important: string[],
    publish: string[]
}
const typeList = ref<ListType>({ type: [], important: [], publish: [] })

onMounted(async () => {
    const { data } = await typeListApi();
    typeList.value = data
})
</script>

<style lang="less" scoped>
.title {
    font-size: 14px;
    display: inline-block;
    width: 80px;
}
</style>