import request from '@/utils/request'

// 库房系统

// 入库单管理 -- 列表
export function  WareInorder_index(data) {
    return request({
        url:'/WareInorder/index',
        method:'post',
        data
    })
}

// 入库单管理 -- 记录
export function  WareInorder_WareRecord(data) {
    return request({
        url:'/WareInorder/WareRecord',
        method:'post',
        data
    })
}

// 入库单管理 -- 入库
export function  WareInorder_Warehousing(data) {
    return request({
        url:'/WareInorder/Warehousing',
        method:'post',
        data
    })
}

// 入库单管理 -- 退货
export function WareInorder_returnGoods(data){
    return request({
        url:'/WareInorder/returnGoods',
        method:'post',
        data
    })
}

// 入库单管理 -- 换货
export function WareInorder_exchanGoods(data){
    return request({
        url:'/WareInorder/exchanGoods',
        method:'post',
        data
    })
}

// 入库单管理 -- 导出
export function WareInorder_exportData(data){
    return request({
        url:'/WareInorder/exportData',
        method:'post',
        data
    })
}
