import request from '@/utils/request'
// 品牌列表
export function brandList(data) {
  return request({
    url: '/v1/BrandLists/index',
    method: 'post',
    data
  })
}
// 品牌新增
export function addBrand(data) {
  return request({
    url: '/v1/BrandLists/add',
    method: 'post',
    data
  })
}
// 品牌编辑
export function editBrand(data) {
  return request({
    url: '/v1/BrandLists/edit',
    method: 'post',
    data
  })
}
// 品牌启用
export function startBrand(data) {
  return request({
    url: '/v1/BrandLists/start',
    method: 'post',
    data
  })
}
// 品牌停用
export function stopBrand(data) {
  return request({
    url: '/v1/BrandLists/stop',
    method: 'post',
    data
  })
}


// 品类列表
export function ClasList(data) {
  return request({
    url: '/v1/CategoryLists/index',
    method: 'post',
    data
  })
}
// 品类新增
export function addClass(data) {
  return request({
    url: '/v1/CategoryLists/add',
    method: 'post',
    data
  })
}
// 品类编辑
export function editClass(data) {
  return request({
    url: '/v1/CategoryLists/edit',
    method: 'post',
    data
  })
}
// 品类启用
export function openClas(data) {
  return request({
    url: '/v1/CategoryLists/start',
    method: 'post',
    data
  })
}
// 品类停用
export function stopeClas(data) {
  return request({
    url: '/v1/CategoryLists/stop',
    method: 'post',
    data
  })
}


// 商品列表
export function goodsList(data) {
  return request({
    url: '/v1/GoodsLists/index',
    method: 'post',
    data
  })
}
// 商品新增
export function addGoods(data) {
  return request({
    url: '/v1/GoodsLists/add',
    method: 'post',
    data
  })
}
// 商品编辑
export function editGoods(data) {
  return request({
    url: '/v1/GoodsLists/edit',
    method: 'post',
    data
  })
}
// 商品启用
export function startGoods(data) {
  return request({
    url: '/v1/GoodsLists/start',
    method: 'post',
    data
  })
}
// 商品停用
export function stopGoods(data) {
  return request({
    url: '/v1/GoodsLists/stop',
    method: 'post',
    data
  })
}
// 商品查看
export function infoGoods(data) {
  return request({
    url: '/v1/GoodsLists/info',
    method: 'post',
    data
  })
}

