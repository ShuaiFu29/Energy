import { post,get } from '@/utils/http'
import { RowType } from '@/types/station'
import Revenue from '@/views/chargingstation/Revenue.vue'
import { number } from 'echarts/types/src/echarts.all.js'

interface ListType{
    page: number,
    pageSize: number,
    name?: string,
    id?: string,
    status:number
}
enum Api{
    List = '/stationList',
    Edit = '/station/edit',
    Delete = '/station/delete',
    RevenueChart = '/revenueChart',
    Revenue='/revenueList'
}
interface RevenueType{
    page: number,
    pageSize: number,
    name:string
}
function listApi(data:ListType) {
    return post(Api.List,data)
}
function editApi(data: RowType) {
    return post(Api.Edit,data)
}
function deleteApi(id: string) {
    return post(Api.Delete,{id})
}
function chartApi(){
    return get(Api.RevenueChart)
}
function revenueApi(data:RevenueType) {
    return post(Api.Revenue)
}
export { listApi,editApi,deleteApi,chartApi,revenueApi }