const Home = () => import('PAGES/Home')
const List = () => import('PAGES/List')
const Login = () => import('PAGES/Login')
const Table = () => import('PAGES/Table')
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
    // 上传页
    path: '/table',
    component: Table
  }
]
