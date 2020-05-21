import request from '@/utils/request'
// 供应链
// 公共方法--商品品类
export function getCategoryInfo(data) {
    return request({
        url: '/v1/CategoryLists/getCategory',
        method: 'post',
        data
    })
}
// 公共方法--商品品牌
export function getBrandInfo(data) {
    return request({
        url: '/v1/BrandLists/getBrand',
        method: 'post',
        data
    })
}
// 公共方法--获取渠道商
export function getChannelInfo(data) {
    return request({
        url: '/v1/ChannelLists/getChannel',
        method: 'post',
        data
    })
}
// 公共方法--获取渠道标签信息
export function getChannelLabel(data) {
    return request({
        url:'/v1/ChannelLabels/getChannelLabel',
        method:"post",
        data
    })
}
// 公共方法--获取角色信息
export function getRoleInfo(data) {
    return request({
        url:'/v1/RoleSets/getRole',
        method:"post",
        data
    })
}

// 公共方法--获取解约渠道信息
export function getDistributors(data) {
    return request({
        url:'/v1/ReplenishmentLists/getDistributors',
        method:"post",
        data
    })
}

// 公共方法--获取开启补货渠道信息
export function getReplenishmentChannel(data) {
    return request({
        url:'/v1/ChannelLists/getReplenishmentChannel',
        method:"post",
        data
    })
}

// 公共方法--获取补货职务为安装门店的渠道
export function getShops(data) {
    return request({
        url:'/v1/ReplenishmentLists/getShops',
        method:"post",
        data
    })
}

// 公共方法--获取商品信息
export function getGoods(data) {
    return request({
        url:'/v1/DamageProcess/getGoods',
        method:"post",
        data
    })
}
