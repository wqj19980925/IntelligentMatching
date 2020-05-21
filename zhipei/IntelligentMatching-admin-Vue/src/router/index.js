import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'


export const routerMap = {
	Layout: () => import('@/views/layout/Layout'),
	O2OSystem: () => import('@/views/dashboard/index'),

	// 采购系统
	PurchasePlan: () => import('@/views/PurchaseSystem/PurchasePlan'),// 采购计划
	PurchaseOrder: () => import('@/views/PurchaseSystem/PurchaseOrder'),// 采购管理
	
	// 库房系统
	WareInorder: () => import('@/views/StorageSystem/WareInorder'),// 新入库单管理

	//分销系统
	Distribution: () => import('@/views/DistributionSystem/Distribution'),// 新入库单管理

	// 系统设置
	Czrz: () => import('@/views/System/Czrz'),// 日志管理
	
	
	// //================================
	// // 商品管理
	// SettlementSystem: () => import('@/views/goodsAdmin/brandList'),// 品牌列表
	// StoreSystem: () => import('@/views/goodsAdmin/classList'), //品类列表
	// PurchaseSystem: () => import('@/views/goodsAdmin/goodsList'),// 商品列表
	// // 渠道管理
	// System:() => import('@/views/channel/channellabel'),//渠道标签
	// ChannelListsindex:() => import('@/views/channel/channelList'),//渠道标签
	// // 补货管理
	// ReplenishmentListsindex: () => import('@/views/replenishment/relation'),//补货关系
	// ReplenishmentOrdersindex: () => import('@/views/replenishment/ordersList'),//补货订单
	// ReplenishmentGoodsindex: () => import('@/views/replenishment/goodsList'),//补货商品
	// DistributorInventorysindex: () => import('@/views/replenishment/distributorList'),//配送商库存
	// ReplenishmentBillsindex: () => import('@/views/replenishment/replenishmentBill'),//补货账单
	// ShippingBillsindex: () => import('@/views/replenishment/DeliveryBill'),//配送账单
	// DamageProcessindex: () => import('@/views/replenishment/DamageProcessindex'),//残损处理
	// DamageReplenishmentsindex: () => import('@/views/replenishment/DamageReplenishmentsindex'),//残损补货
	// // 系统管理
	// SystemLogsindex: () => import('@/views/system/logList'),//系统日志
	// RoleSetsindex: () => import('@/views/system/roleList'), //角色列表
	// AdminListsindex: () => import('@/views/system/staff'),//账号列表

}
export const constantRouterMap = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		hidden: true
	},
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})

export const asyncRouterMap = [
	/** When your routing table is too long, you can split it into small modules**/
]
