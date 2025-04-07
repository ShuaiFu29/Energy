import { post } from "../utils/http"
enum Api {
    auth = '/userAuth', 
}
function getAuthApi(pageAuthority:string):Promise<any> {
    return post(Api.auth, {pageAuthority})
}

export {getAuthApi}