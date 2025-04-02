import { post } from '@/utils/http'
import { RowType } from '@/types/station'
interface ListType{
    page: number,
    pageSize: number,
    name?: string,
    id?: string,
    status:number
}
enum Api{
    List = '/stationList',
    Edit='/station/edit'
}
function listApi(data:ListType) {
    return post(Api.List,data)
}
function editApi(data: RowType) {
    return post(Api.Edit,data)
}
export { listApi,editApi }