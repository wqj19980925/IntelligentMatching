import request from '@/utils/request'

// 账单管理 -- 列表
export function BillManage_index(data) {
    return request({
        url:'/BillManage/index',
        method:"post",
        data
    })    
}

// 账单管理 -- 导出
export function BillManage_exportData(data) {
    return request({
        url:'/BillManage/exportData',
        method:"post",
        data
    })    
}


// 账单管理 -- 审核
export function BillManage_Toexamine(data) {
    return request({
        url:'/BillManage/Toexamine',
        method:"post",
        data
    })    
}
