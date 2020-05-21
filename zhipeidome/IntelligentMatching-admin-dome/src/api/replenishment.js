import request from '@/utils/request'
// 补货关系 - 列表
export function relationList(data) {
  return request({
    url: '/v1/ReplenishmentLists/index',
    method: 'post',
    data
  })
}

// 补货关系 - 解约
export function relationListtermination(data) {
  return request({
    url: '/v1/ReplenishmentLists/termination',
    method: 'post',
    data
  })
}

// 补货关系 - 补货解约
export function replenishmentTermination(data) {
  return request({
    url: '/v1/ReplenishmentLists/replenishmentTermination',
    method: 'post',
    data
  })
}

// 补货关系 - 关系设定
export function relationshipSet(data) {
  return request({
    url: '/v1/ReplenishmentLists/relationshipSet',
    method: 'post',
    data
  })
}

// 补货关系 - 关系变更
export function relationshipChange(data) {
  return request({
    url: '/v1/ReplenishmentLists/relationshipChange',
    method: 'post',
    data
  })
}

// 补货关系 - 配送详情
export function Listinfo(data) {
  return request({
    url: '/v1/ReplenishmentLists/info',
    method: 'post',
    data
  })
}

// 补货商品 - 列表
export function relationGoodsList(data) {
  return request({
    url: '/v1/ReplenishmentGoods/index',
    method: 'post',
    data
  })
}
// 补货商品 - 维护
export function relationVindicate(data) {
  return request({
    url: '/v1/ReplenishmentGoods/vindicate',
    method: 'post',
    data
  })
}


// 补货订单 - 列表
export function relationOrdersList(data) {
  return request({
    url: '/v1/ReplenishmentOrders/index',
    method: 'post',
    data
  })
}

// 经销商库存 - 列表
export function relationDistributorList(data) {
  return request({
    url: '/v1/DistributorInventorys/index',
    method: 'post',
    data
  })
}

// 经销商库存 - 导出
export function relationexport(data) {
  return request({
    url: '/v1/DistributorInventorys/export',
    method: 'post',
    data
  })
}

// 经销商库存 - 详情列表
export function relationinfo(data) {
  return request({
    url: '/v1/DistributorInventorys/info',
    method: 'post',
    data
  })
}

// 补货账单 - 列表
export function replensBillindex(data) {
  return request({
    url: '/v1/ReplenishmentBills/index',
    method: 'post',
    data
  })
}

// 补货账单 - 备注
export function replensBillremark(data) {
  return request({
    url: '/v1/ReplenishmentBills/remark',
    method: 'post',
    data
  })
}

// 补货账单 - 审核
export function replensBillaudit(data) {
  return request({
    url: '/v1/ReplenishmentBills/audit',
    method: 'post',
    data
  })
}

// 补货账单 - 反审核
export function replensBillcancelAudit(data) {
  return request({
    url: '/v1/ReplenishmentBills/cancelAudit',
    method: 'post',
    data
  })
}

// 补货账单 - 反审核
export function replensBillexport(data) {
  return request({
    url: '/v1/ReplenishmentBills/export',
    method: 'post',
    data
  })
}

// 补货账单 - 反审核
export function replensBilldeliveryList(data) {
  return request({
    url: '/v1/ReplenishmentBills/deliveryList',
    method: 'post',
    data
  })
}

// 补货账单 - 补货单详情
export function replensBillinfo(data) {
  return request({
    url: '/v1/ReplenishmentBills/info',
    method: 'post',
    data
  })
}

// 补货账单 - 补货单详情
export function replensBilldeliveryDetails(data) {
  return request({
    url: '/v1/ReplenishmentBills/deliveryDetails',
    method: 'post',
    data
  })
}

// 配送账单 - 列表
export function ShippingBillsindex(data) {
  return request({
    url: '/v1/ShippingBills/index',
    method: 'post',
    data
  })
}

// 配送账单 - 账单详情
export function ShippingBillsinfo(data) {
  return request({
    url: '/v1/ShippingBills/info',
    method: 'post',
    data
  })
}

// 配送账单 - 账单导出
export function ShippingBillsexport(data) {
  return request({
    url: '/v1/ShippingBills/export',
    method: 'post',
    data
  })
}

// 配送账单 - 账单备注
export function ShippingBillsremark(data) {
  return request({
    url: '/v1/ShippingBills/remark',
    method: 'post',
    data
  })
}

// 配送账单 - 送货备注
export function ShippingBillsdeliveryRemark(data) {
  return request({
    url: '/v1/ShippingBills/deliveryRemark',
    method: 'post',
    data
  })
}

// 配送账单 - 送货列表
export function ShippingBillsdeliveryList(data) {
  return request({
    url: '/v1/ShippingBills/deliveryList',
    method: 'post',
    data
  })
}

// 配送账单 - 送货详情
export function ShippingBillsdeliveryDetails(data) {
  return request({
    url: '/v1/ShippingBills/deliveryDetails',
    method: 'post',
    data
  })
}

// 配送账单 - 账单审核
export function ShippingBillsaudit(data) {
  return request({
    url: '/v1/ShippingBills/audit',
    method: 'post',
    data
  })
}

// 配送账单 - 送货撤销
export function ShippingBillsdeliveryRevocation(data) {
  return request({
    url: '/v1/ShippingBills/deliveryRevocation',
    method: 'post',
    data
  })
}


// 配送账单 - 配送单导入
export function ShippingBillsimport(data) {
  return request({
    url: '/v1/ShippingBills/import',
    method: 'post',
    data
  })
}

// 配送账单 - 新增送货单
export function ShippingBillsdeliveryAdd(data) {
  return request({
    url: '/v1/ShippingBills/deliveryAdd',
    method: 'post',
    data
  })
}

// 残损处理 - 列表
export function DamageProcessindex(data) {
  return request({
    url: '/v1/DamageProcess/index',
    method: 'post',
    data
  })
}

// 残损处理 - 添加
export function DamageProcess_add(data) {
  return request({
    url: '/v1/DamageProcess/add',
    method: 'post',
    data
  })
}


// 残损处理 - 残损备注
export function DamageProcess_remark(data) {
  return request({
    url: '/v1/DamageProcess/remark',
    method: 'post',
    data
  })
}

// 残损处理 - 残损审核
export function DamageProcess_audit(data) {
  return request({
    url: '/v1/DamageProcess/audit',
    method: 'post',
    data
  })
}

// 残损处理 - 残损详情
export function DamageProcess_info(data) {
  return request({
    url: '/v1/DamageProcess/info',
    method: 'post',
    data
  })
}

// 残损处理 - 残损补货详情
export function DamageProcess_damageDetail(data) {
  return request({
    url: '/v1/DamageProcess/damageDetail',
    method: 'post',
    data
  })
}

// 残损补货 - 列表
export function DamageReplenishments_index(data) {
  return request({
    url: '/v1/DamageReplenishments/index',
    method: 'post',
    data
  })
}

// 残损补货 - 撤销
export function DamageReplenishmentsrecall(data) {
  return request({
    url: '/v1/DamageReplenishments/recall',
    method: 'post',
    data
  })
}

// 残损补货 - 撤销
export function DamagedeliveryAdd(data) {
  return request({
    url: '/v1/DamageReplenishments/deliveryAdd',
    method: 'post',
    data
  })
}

// 残损补货 - 备注
export function DamageReplenishments_remark(data) {
  return request({
    url: '/v1/DamageReplenishments/remark',
    method: 'post',
    data
  })
}

// 残损补货 - 残损详情
export function DamageReplenishments_info(data) {
  return request({
    url: '/v1/DamageReplenishments/info',
    method: 'post',
    data
  })
}


// 残损补货 - 残损详情
export function DamageReplenishments_damageDetail(data) {
  return request({
    url: '/v1/DamageReplenishments/damageDetail',
    method: 'post',
    data
  })
}

