import request from '@/utils/request'

// 采购计划 列表
export function PurchasePlan_index(data) {
    return request({
        url:'/PurchasePlan/index',
        method:'post',
        data
    })
}

//采购计划 转采购获取信息
export function PurchasePlan_turnPurchase(data){
    return request({
        url:'/PurchasePlan/turnPurchase',
        method:'post',
        data
    })
}


// 采购计划 导出
export function PurchasePlan_exportPurchasePlan(data){
    return request({
        url:'/PurchasePlan/exportPurchasePlan',
        method:'post',
        data
    })
}

// 采购计划 添加
export function PurchasePlan_AddPurchPlan(data){
    return request({
        url:'/PurchasePlan/AddPurchPlan',
        method:'post',
        data
    })
}

// 采购管理 列表
export function PurchaseOrder_index(data){
    return request({
        url:'/PurchaseOrder/index',
        method:'post',
        data
    })
}

// 采购管理 添加
export function PurchaseOrder_AddEntry(data){
    return request({
        url:'/PurchaseOrder/AddEntry',
        method:'post',
        data
    })
}

 // 采购管理 编辑
export function PurchaseOrder_EditEntry(data){
    return request({
        url:'/PurchaseOrder/EditEntry',
        method:'post',
        data
    })
}
// 采购管理 s审核
export function PurchaseOrder_Toexamine(data){
    return request({
        url:'/PurchaseOrder/Toexamine',
        method:'post',
        data
    })
}
// 采购管理 提交审核
export function PurchaseOrder_SubmitReview(data){
    return request({
        url:'/PurchaseOrder/SubmitReview',
        method:'post',
        data
    })
}

// 采购管理 导出
export function PurchaseOrder_exportData(data){
    return request({
        url:'/PurchaseOrder/exportData',
        method:'post',
        data
    })
}


// 采购管理 生成账单
export function PurchaseOrder_GenerateBill(data){
    return request({
        url:'/PurchaseOrder/GenerateBill',
        method:'post',
        data
    })
}


// 采购管理 二次编辑
export function PurchaseOrder_ForceEdit(data){
    return request({
        url:'/PurchaseOrder/ForceEdit',
        method:'post',
        data
    })
}


