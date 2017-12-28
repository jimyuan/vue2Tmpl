const Home = () => import(/* webpackChunkName: "home" */ 'PAGES/Home')
const List = () => import(/* webpackChunkName: "list" */ 'PAGES/List')
const Login = () => import(/* webpackChunkName: "login" */ 'PAGES/Login')
const Table = () => import(/* webpackChunkName: "table" */ 'PAGES/Table')
export default [
  {
    path: '/',
    redirect: '/home'
  }, {
    // 首页
    path: '/home',
    component: Home
  }, {
    // 列表页，需登录
    path: '/list',
    meta: { auth: true },
    component: List
  }, {
    // 登录页
    path: '/login',
    component: Login
  }, {
    // 表格
    path: '/table',
    component: Table
  }
]
