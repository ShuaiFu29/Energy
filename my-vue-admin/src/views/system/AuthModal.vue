<template>
    <el-dialog :model-value="visible" title="权限设置" width="600px">
        权限弹窗
    </el-dialog>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
    visible: Boolean,

})
</script>