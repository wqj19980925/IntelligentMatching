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

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
localStorage.removeItem('rolesKey')
router.beforeEach((to, from, next) => {
  const toKen = localStorage.getItem('Admin-Token');
  NProgress.start()
  if (toKen) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      // if (store.getters.name === '') { // 判断当前用户是否已拉取完user_info信息
        // store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          // const code = res.data.code 
          // if (code === 200) {
          let rolesKey = localStorage.getItem('rolesKey')
          if(rolesKey == 1){
            next()
          }else{
            store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to,
                replace: true
              })// hack方法 确保addRoutes已完成 
              console.log(store.getters.addRouters)
              localStorage.setItem('rolesKey', '1')
            })
          }
            
          // } else {
          //   next()
          //   const data = res.data.data
          //   store.dispatch('FedLogOut').then(() => {
          //     Message.error(data)
          //     next({
          //       path: '/'
          //     })
          //   })
          // }
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || '信息获取失败,请重新登录')
        //     next({
        //       path: '/'
        //     })
        //   })
        // })
      // } else {
      //   next()
      // }
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
})

router.afterEach(() => {
  NProgress.done() 
})
