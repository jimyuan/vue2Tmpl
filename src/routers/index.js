import Vue from 'vue'
import VueRouter from 'vue-router'
import userService from '../services/userService'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: resolve => require(['../pages/Home'], resolve)
  }, {
    path: '/list',
    component: resolve => require(['../pages/List'], resolve)
  }, {
    path: '/call',
    component: resolve => require(['../pages/Call'], resolve),
    meta: { auth: true }
  }]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!userService.data) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
