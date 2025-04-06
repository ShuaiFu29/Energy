const fieldLabelMap:Record<string,string> = {
    description: "故障描述",
    address: "设备地址",
    equNo: "设备编号",
    level: "告警级别",
    time: "故障时间",
    code: "故障代码",
    status: "当前状态",
}
const getLabel = (key: string): string => {
    return fieldLabelMap[key]||key
}
export {getLabel}