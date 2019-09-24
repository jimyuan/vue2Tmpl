import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { specialTip } from '@/utils/message'
import { getToken } from '@/utils/auth' // token 存取
import { constantRouterMap } from '@/router'

/**
 * 路由规则
 * 1 无 token
 *  1.1 在白名单内，直接跳转
 *  1.2 否则，跳登录页
 * 2. 有 token 有 roles，直接路由，碰到登录页跳转到默认页即可
 * 3. 有 token 无 roles (第一次登陆或刷新页面)
 *  3.1 获取用户权限信息
 *  3.2 根据 roles 权限生成可访问的路由表
 *  3.3 获取信息失败则执行 logout 流程
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 1 无 token
  if (!getToken()) {
    constantRouterMap
      .some(item => item.whiteList ? to.path.startsWith(item.path) : false)
      ? next()
      : next({
        name: 'login',
        query: { redirect: from.name === 'login' ? '/home' : to.path },
        replace: true
      })
    NProgress.done()
    return true
  }
  // 2. 有 token 有 roles，直接路由，如进登录页，跳转到默认页
  if (store.getters.roles.length > 0) {
    to.name === 'login' ? next({ name: 'home', replace: true }) : next()
    NProgress.done()
    return true
  }
  // 3. 有 token 无 roles (第一次登陆或刷新页面)
  // 3.1 获取用户权限信息
  store.dispatch('GetInfo')
    .then(res => {
      // note: roles must be a array! such as: ['editor','develop']
      const roles = [res.roles]
      // 3.2 根据 roles 权限生成可访问的路由表
      return store.dispatch('GenerateRoutes', roles)
    })
    .then(() => {
      router.addRoutes(store.getters.addRouters)
      next({ ...to, replace: true })
    })
    // 3.3 获取信息失败则执行 logout 流程
    .catch(err => {
      store.dispatch('LogOut')
        .then(() => {
          specialTip(err, 'error')
          next({ name: 'home' })
        })
    })
})

// router.afterEach(() => NProgress.done())
