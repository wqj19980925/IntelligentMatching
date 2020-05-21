import request from '@/utils/request'

// 渠道标签 --列表
export function channelLabelsList(data){
    return request({
        url:'/v1/ChannelLabels/index',
        method:"post",
        data
    })
}
// 渠道标签 -- 启用
export function chlastart(data){
    return request({
        url:'/v1/ChannelLabels/start',
        method:"post",
        data
    })
}

// 渠道标签 -- 停用
export function chlastop(data){
    return request({
        url:'/v1/ChannelLabels/stop',
        method:"post",
        data
    })
}

// 渠道标签 -- 新增
export function chlaadd(data){
    return request({
        url:'/v1/ChannelLabels/add',
        method:"post",
        data
    })
}

// 渠道标签 -- 编辑
export function chlaedit(data){
    return request({
        url:'/v1/ChannelLabels/edit',
        method:"post",
        data
    })
}


// 渠道列表 -- 列表
export function ChannelLists_index(data){
    return request({
        url:'/v1/ChannelLists/index',
        method:"post",
        data
    })
}
// 渠道列表 -- 启用
export function chlaListstart(data){
    return request({
        url:'/v1/ChannelLists/start',
        method:"post",
        data
    })
}
// 渠道列表 -- 停用
export function chlaListstop(data){
    return request({
        url:'/v1/ChannelLists/stop',
        method:"post",
        data
    })
}
// 渠道列表 -- 删除
export function chlaListdelete(data){
    return request({
        url:'/v1/ChannelLists/delete',
        method:"post",
        data
    })
}
// 渠道列表 -- 重置密码
export function chlaListresetPassword(data){
    return request({
        url:'/v1/ChannelLists/resetPassword',
        method:"post",
        data
    })
}
// 渠道列表 -- 新增
export function chlaListadd(data){
    return request({
        url:'/v1/ChannelLists/add',
        method:"post",
        data
    })
}
// 渠道列表 -- 编辑
export function chlaListedit(data){
    return request({
        url:'/v1/ChannelLists/edit',
        method:"post",
        data
    })
}
// 渠道列表 -- 绑定身份ID验证
export function verifyInformation(data){
    return request({
        url:'/v1/ChannelLists/verifyInformation',
        method:"post",
        data
    })
}
