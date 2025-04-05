import { ref, reactive, onMounted,unref } from "vue";
import { post } from "@/utils/http";

// Http 组合式函数
export function useHttp<T>(url: string, initialParams: any) {
    const dataList = ref<T[]>([]);
    const loading = ref<boolean>(false);
    const totals = ref(0);
    const pageInfo = reactive({
        page: 1,
        pageSize: 10,
    });
    // 加载数据的函数
    const loadData = async () => {

        loading.value = true;

        try {
            const { data } = await post(url, {...pageInfo,...unref(initialParams)});
           
            dataList.value = data.list;
            totals.value = data.total; // 假设返回总数

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            loading.value = false;
        }
    };
    // 在组件挂载时加载数据
    onMounted(() => {
        loadData();
    });

    const handleSizeChange = (size: number) => {
        console.log("handleSizeChange")
        pageInfo.pageSize = size;
        loadData();
    };

    const handleCurrentChange = (page: number) => {
        console.log("handleCurrentChange")
       pageInfo.page = page;
        loadData();
    };

    const resetPagination = () => {
        pageInfo.page = 1;
        pageInfo.pageSize = 10; 
        loadData();
    };

    return {
        dataList,
        loading,
        loadData,
        totals,
        pageInfo,
        handleSizeChange,
        handleCurrentChange,
        resetPagination,
    };
}