import request from '@/utils/request'

// 分销管理
export function  Distribution_index(data) {
    return request({
        url:'/Distribution/index',
        method:'post',
        data
    })
}
