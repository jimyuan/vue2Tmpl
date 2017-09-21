import Vue from 'vue'
import VueRouter from 'vue-router'
import WsCache from 'web-storage-cache'
import store from 'STORE/store'
import * as types from 'STORE/types'

Vue.use(VueRouter)

const ls = new WsCache()
const router = new VueRouter({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    // 首页
    path: '/home',
    component: resolve => require(['PAGES/Home'], resolve)
  }, {
    // 列表页，需登录
    path: '/list',
    meta: { auth: true },
    component: resolve => require(['PAGES/List'], resolve)
  }, {
    // 登录页
    path: '/login',
    component: resolve => require(['PAGES/Login'], resolve)
  }, {
    path: '/upload',
    component: resolve => require(['PAGES/Upload'], resolve)
  }]
})

// 页面刷新时，清除过期缓存，并重新赋值token
if (ls.get('token')) {
  ls.deleteAllExpires()
  store.commit(types.LOGIN, ls.get('token'))
  store.commit(types.USER, ls.get('user'))
}

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    store.state.token
      ? next()
      : next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
