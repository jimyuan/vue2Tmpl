import 'nprogress/nprogress.css'// Progress 进度条样式
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // token 存取
import { constantRouterMap } from '@/router'
// import { setTitle } from '@/utils/util' // 设置浏览器头部标题

// permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// 不重定向白名单
const whiteList = constantRouterMap
  .filter(r => r.meta && r.meta.whiteList)
  .map(p => p.path)

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    // 有 token 的情况
    if (to.path === '/') {
      next({ path: '/home' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        // 拉取用户信息
        store.dispatch('GetInfo')
          .then(res => {
            // note: roles must be a array! such as: ['editor','develop']
            const roles = [res.roles]
            return store.dispatch('GenerateRoutes', roles)
          })
          // 根据roles权限生成可访问的路由表
          .then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // hack方法 确保addRoutes已完成
            next({ ...to, replace: true })
          })
          .catch((err) => {
            store.dispatch('LogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        next()
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
      }
    }
  } else {
    // 没有 token，只能进白名单路由，否则进登录页
    whiteList.some(path => to.path.startsWith(path))
      ? next()
      : next({
        path: '/login',
        query: { redirect: from.path === '/login' ? '/home' : from.path },
        replace: true
      })
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  // setTimeout(() => {
  //   const browserHeaderTitle = store.getters.browserHeaderTitle
  //   setTitle(browserHeaderTitle)
  // }, 0)
})
