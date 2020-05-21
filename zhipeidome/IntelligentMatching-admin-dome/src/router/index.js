import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'


export const routerMap = {
	Layout: () => import('@/views/layout/Layout'),
	// 采购系统
	PurchaseIndex: () => import('@/views/purchasingSystem/purchasingManagement '),// 采购系统
	Distribution: () => import('@/views/goodsAdmin/brandList'),//分销管理
	Purchaseplain: () => import('@/views/purchasingSystem/procurementPlan'),//采购计划
	// 库房系统
	Verification: () => import('@/views/finanCial/financialList'),
	//财务系统
	Bill: ()=> import('@/views/warehouse/bill')//账单列表
}
export const constantRouterMap = [
{
	path: '/login',
	component: () => import('@/views/login/index'),
	hidden: true
},
{
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
},
// {
// 	path: '/CashierDeskindex',
// 	component: Layout,
// 	hidden: true,
// 	children: [{
// 		path: '',
// 		component: () => import('@/views/dashboard/components/collectMoney'),
// 	}]
// },
// {
//	 path: '',
//	 component: Layout,
//	 redirect: 'Summarizes',
//	 children: [{
//		 path: 'Summarizes',
//		 component: () => import('@/views/companyInfo/compaInfopage'),
//		 name: 'Summarizes',
//		 meta: {
//			 title: '概况',
//			 icon: 'dashboard',
//			 noCache: true
//		 }
//	 }]
// },
// {
//	 path: '/404',
//	 component: () => import('@/views/errorPage/404'),
//	 hidden: true
// },
// {
//	 path: '/401',
//	 component: () => import('@/views/errorPage/401'),
//	 hidden: true
// }
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
