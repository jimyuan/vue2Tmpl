import Vue from 'vue'
import VueRouter from 'vue-router'
import userService from 'SERVICES/userService'

Vue.use(VueRouter)

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
    component: resolve => require(['PAGES/List'], resolve),
    meta: { auth: true }
  }, {
    path: '/login',
    component: resolve => require(['PAGES/Login'], resolve)
  }]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!userService.isLogin) {
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
