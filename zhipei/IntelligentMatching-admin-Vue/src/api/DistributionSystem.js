import request from '@/utils/request'

// 分销管理 -- 列表
export function  Distribution_index(data) {
    return request({
        url:'/Distribution/index',
        method:'post',
        data
    })
}

// 分销管理 -- 生成账单
export function Distribution_GenerateBill(data){
    return request({
        url:'/Distribution/GenerateBill',
        method:'post',
        data
    })
}

// 分销管理 -- 分销记录
export function Distribution_DeliveryRecord(data){
    return request({
        url:'/Distribution/DeliveryRecord',
        method:'post',
        data
    })
}

// 分销管理 -- 添加
export function Distribution_AddDistrib(data){
    return request({
        url:'/Distribution/AddDistrib',
        method:'post',
        data
    })
}

// 分销管理 -- 导出
export function Distribution_exportData(data){
    return request({
        url:'/Distribution/exportData',
        method:'post',
        data
    })
}

