import request from '@/utils/request'
// 登录
export function loginByUsername(company_name, username, password, type, islogin) {
  const data = {
  	company_name,
    username,
    password,
    type,
    islogin
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}


// 退出
export function LogOut(token) {
  const data = {
    api_token: token
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取左侧信息
export function serverRouterMap(token) {
  const data = {
    api_token: token
  }
  return request({
    url: '/navigation',
    method: 'post',
    data
  })
}
