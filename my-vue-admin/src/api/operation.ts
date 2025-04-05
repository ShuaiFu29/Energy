import { post } from "@/utils/http";
enum Api{
    BatchDelete="/batchDelete"
}
function batchDeleteApi(order:string[]) {
    return post(Api.BatchDelete,{order})
}
export {batchDeleteApi}