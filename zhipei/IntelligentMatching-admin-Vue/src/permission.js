	import router from './router'
	import store from './store'
	import {
	Message
	} from 'element-ui'
	import NProgress from 'nprogress' // progress bar
	import 'nprogress/nprogress.css' // progress bar style
	import {
	getToken
	}
	from '@/utils/auth' // getUserid from cookie

	NProgress.configure({
	showSpinner: false
	}) // NProgress Configuration
	function GetQueryValue(queryName) {
		var query = decodeURI(window.location.search.substring(1));
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == queryName) { return pair[1]; }
		}
		return null;
	}

	const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
	if(localStorage.getItem('rolesKey') == 2){
		localStorage.removeItem('rolesKey')
	}
	router.beforeEach((to, from, next) => {
		const toKen = localStorage.getItem('Admin-Token');
		NProgress.start()
		if((GetQueryValue('secret_key')+'') == 'null'){
			if (toKen) {
				if (to.path === '/login') {
					next({
						path: '/'
					})
					NProgress.done()
				} else {
					let rolesKey = localStorage.getItem('rolesKey')
					if(rolesKey != 2){
						store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
							router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
							localStorage.setItem('rolesKey', '2')
							next({ ...to,
								replace: true
							})// hack方法 确保addRoutes已完成 
						})
					}else{
						next()
					}
				}
			} else {
				// 取不到token
				if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
					next()
				} else {
					next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
					NProgress.done() // 手动触发
				}
			}
		}else {
			localStorage.clear();
			let rolesKey = localStorage.getItem('rolesKey')
			if(rolesKey != 1){
				let datadd = {};
				datadd.type = 2;
				datadd.secret_key = GetQueryValue('secret_key');
				datadd.time = GetQueryValue('time');
				store.dispatch("LoginByUsername", datadd).then(data => {
					if(data.code == 200){
						store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
							router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
							localStorage.setItem('rolesKey', '1')
							localStorage.setItem('user_name',data.user_name)
							let urltext = window.location.protocol+"//"+window.location.host+ '/#/' +data.path;
							window.location.href = urltext;
							// next(data.path)// hack方法 确保addRoutes已完成
						})
					}else{
						localStorage.clear();
						localStorage.setItem('rolesKey', '1');
						let urltext = window.location.protocol+"//"+window.location.host +'/#/login';
						window.location.href = urltext;
					}
					
				})
			}else{
				localStorage.clear();
				localStorage.setItem('rolesKey', '1');
				let urltext = window.location.protocol+"//"+window.location.host +'/#/login';
				window.location.href = urltext;
			}
		}
	})

	router.afterEach(() => {
	NProgress.done() 
	})
