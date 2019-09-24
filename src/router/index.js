import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

// 在使用Element UI 时点击同一个路由，控制台报错，用以下代码可消除报错
const originalPush = Router.prototype.push
Router.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 定义静态路由
export const constantRouterMap = [
  {
    path: '/',
    redirect: { name: 'home' }
  }, {
    path: '/home',
    name: 'home',
    whiteList: true,
    component: Home
  }, {
    // 登录页
    name: 'login',
    path: '/login',
    whiteList: true,
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }, {
    // 表格
    name: 'table',
    path: '/table',
    whiteList: true,
    component: () => import(/* webpackChunkName: "table" */ '@/views/Table.vue')
  }, {
    // 图标
    name: 'icons',
    path: '/icons',
    whiteList: true,
    component: () => import(/* webpackChunkName: "icons" */ '@/views/Icons.vue')
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
