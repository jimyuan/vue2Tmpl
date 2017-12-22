import Vue from 'vue'
import VueRouter from 'vue-router'
import WsCache from 'web-storage-cache'
import store from 'STORE/store'
import * as types from 'STORE/types'
import routes from './routes'

Vue.use(VueRouter)

const ls = new WsCache()
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  // mode: 'history',
  routes
})

// 页面刷新时，清除过期缓存，并重新赋值token
const token = ls.get('token')
if (token) {
  ls.deleteAllExpires()
  store.commit(types.LOGIN, token)
  store.commit(types.USER, ls.get('user'))
}

/**
 * 全局路由守卫：
 * 用来保证在跳转过程中的身份认证拦截
 * 当然，登录凭证也可以从其他渠道获得，这里举例从 url 获得
 *
 * 2. 检查当前路由以及其父辈路由是否有需要登录的 meta 信息
 * 3. 如已登录，继续跳转路由
 * 4. 如未登录，劫持页面到登录页，带上原页面全路径
 *
 */
router.beforeEach((to, from, next) => {
  // 2
  if (to.matched.some(record => record.meta.auth)) {
    store.state.token
      // 3
      ? next()
      // 4
      : next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
