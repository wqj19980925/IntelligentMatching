import request from '@/utils/request'
// 登录
export function loginByUsername(username, password, login_type,facility) {
  const data = {
    username,
    password,
    login_type,
    facility
  }
  return request({
    url: '/getpre.php?type=1',
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
    url: '/getpre.php?type=2',
    method: 'post',
    data
  })
}
export function LogOut(){
  
}