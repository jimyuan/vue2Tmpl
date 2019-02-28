import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

// 定义静态路由
export const constantRouterMap = [
  {
    path: '/',
    redirect: { name: 'home' }
  }, {
    path: '/home',
    name: 'home',
    component: Home
  }, {
    // 登录页
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }, {
    // 表格
    name: 'table',
    path: '/table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "table" */ '@/views/Table.vue')
  }
]

export default new Router({
  // 后端支持可开
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    // 列表页，需登录
    name: 'list',
    path: '/list',
    component: () => import(/* webpackChunkName: "list" */ '@/views/List.vue')
  }
]
