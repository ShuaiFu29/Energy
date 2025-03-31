import { post } from '@/utils/http'
interface ListType{
    page: number,
    pageSize: number,
    name?: string,
    id?: string,
    status:number
}
enum Api{
    List='/stationList'
}
function listApi(data:ListType) {
    return post(Api.List,data)
}
export { listApi }