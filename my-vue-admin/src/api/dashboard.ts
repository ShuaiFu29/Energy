import { get } from "@/utils/http"
enum Api {
    ChartData = '/chartData'
}
function chartDataApi() {
    return get(Api.ChartData)
}
  
export {chartDataApi}