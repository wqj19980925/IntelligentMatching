import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'
const typeKey = 'typeKey'
const userKey = 'userid'
const comID = 'comId'
const admModule = 'admModule'

export function setModule(module) {
  return Cookies.set(admModule, module)
}

export function getAdmModule() {
  return Cookies.get(admModule)
}


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setcomId(comId) {
  return Cookies.set(comID, comId)
}

export function getComID() {
  return Cookies.get(comID)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserid() {
  return Cookies.get(userKey)
}

export function setUserid(userid) {
  return Cookies.set(userKey, userid)
}

export function removeUserid() {
  return Cookies.remove(userKey)
}

export function setAccType(type) {
  return Cookies.set(typeKey, type)
}

export function getAccType() {
  return Cookies.get(typeKey)
}

export  function getUrlKey(name){
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

