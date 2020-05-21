import request from '@/utils/request'

// 供货单位匹配
export function getSupplierData(data) {
    return request({
        url:'/getSupplierData',
        method:'post',
        data
    })
}

// 搜索商品
export function searchGoodsData(data){
    return request({
        url:'/searchGoodsData',
        method:'post',
        data
    })
}
// 分销商数据
export function getDistributor(data){
    return request({
        url:'/getDistributor',
        method:'post',
        data
    })
}