import request from '@/utils/request'
// 系统日志 -- 列表
export function SystemLogs_index(data){
  return request({
    url:"/v1/SystemLogs/index",
    method:'post',
    data
  })
}

//角色列表 -- 列表
export function roleindex(data) {
  return request({
    url: '/v1/RoleSets/index',
    method: 'post',
    data
  })
}
// 角色列表--添加-获取页面数据
export function roleAdd(data) {
  return request({
    url: '/v1/RoleSets/add',
    method: 'post',
    data
  })
}
// 角色列表--添加--提交
export function addaction(data) {
  return request({
    url: '/v1/RoleSets/add',
    method: 'post',
    data
  })
}

// 角色列表--编辑--请求
export function editrole(data) {
  return request({
    url: '/v1/RoleSets/edit',
    method: 'post',
    data
  })
}

// 角色列表--编辑--提交
export function editaction(data) {
  return request({
    url: '/v1/RoleSets/edit',
    method: 'post',
    data
  })
}

// 角色列表--启用
export function roleStart(data) {
  return request({
    url: '/v1/RoleSets/start',
    method: 'post',
    data
  })
}

// 角色列表--停用
export function roleStop(data) {
  return request({
    url: '/v1/RoleSets/stop',
    method: 'post',
    data
  })
}

// 角色列表--备注
export function roleremark(data) {
  return request({
    url: '/v1/RoleSets/remark',
    method: 'post',
    data
  })
}


// 账号列表-列表
export function staffList(data) {
  return request({
    url: '/v1/AdminLists/index',
    method: 'post',
    data
  })
}
// 账号列表-新增-获取验证码
export function getCodeInfo(data) {
  return request({
    url: '/v1/AdminLists/getCode',
    method: 'post',
    data
  })
}
// 账号列表-新增
export function addStaff(data) {
  return request({
    url: '/v1/AdminLists/add',
    method: 'post',
    data
  })
}
// 账号列表-启用
export function startstase(data) {
  return request({
    url: '/v1/AdminLists/start',
    method: 'post',
    data
  })
}

// 账号列表-停用
export function stopstase(data) {
  return request({
    url: '/v1/AdminLists/stop',
    method: 'post',
    data
  })
}
// 账号列表-编辑
export function editStaff(data) {
  return request({
    url: '/v1/AdminLists/edit',
    method: 'post',
    data
  })
}
// 账号列表 编辑---修改密码 
export function editPassword(data) {
  return request({
    url: '/v1/AdminLists/editPassword',
    method: 'post',
    data
  })
}
// 账号列表 编辑---修改电话 
export function editPhone(data) {
  return request({
    url: '/v1/AdminLists/editPhone',
    method: 'post',
    data
  })
}
