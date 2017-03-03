import Vue from 'vue'
import VueRouter from 'vue-router'
import WsCache from 'web-storage-cache'
import store from 'STORE/store'
import * as types from 'STORE/types'

Vue.use(VueRouter)

const ls = new WsCache()
const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: resolve => require(['PAGES/Home'], resolve)
  }, {
    path: '/list',
    meta: { auth: true },
    component: resolve => require(['PAGES/List'], resolve)
  }, {
    path: '/login',
    component: resolve => require(['PAGES/Login'], resolve)
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
