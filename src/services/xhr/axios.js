import axios from 'axios'
import store from 'STORE/store'
import router from 'ROUTERS/'
import { apiRoot } from './config'

/**
 * 登录跳转方法，此方法针对在需登录验证后才能进入的页面，
 * 当在该页面停留时间过久，token 失效后再次发送请求时拦截该 request 并跳转到登录页
 *
 * 1. 人工登出，清除之前的登录痕迹
 * 2. 跳转到登录页
 */
function goLogin () {
  // 1
  store.commit('logout')
  // 2
  router.replace({
    path: '/login',
    query: { redirect: router.currentRoute.fullPath }
  })
}

/**
 * axios 全局 options
 */
axios.defaults.baseURL = apiRoot.webAPI
axios.defaults.withCredentials = false

/**
 * Ajax response 拦截器
 */
axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

/**
 * Ajax request 拦截器
 *
 */
axios.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token && !config.headers['Credit-Token']) {
      config.headers['Credit-Token'] = token
    }
    return config
  },
  error => Promise.reject(error)
)

const xhr = ({ url, body = {}, method = 'get' }) => {
  const seed = +new Date()
  const options = { url, method }
  // 本地起的 mock proxy 默认是 8084 端口，需特殊参数餐能申请到 mock 数据
  // 详见 https://github.com/czcg/proxy 项目
  const mockParams = apiRoot.webAPI.indexOf(':8084') > -1
    ? { local: 1, mock: 1, enforce: seed }
    : { seed }
  method === 'get'
    ? Object.assign(options, { params: {...mockParams, ...body} })
    : Object.assign(options, { params: mockParams, data: body })
  /**
   * response json demo:
   *
   * {
   *   "respCode": "0",
   *   "memo": "message info",
   *   "data": {...}
   * }
   */
  return new Promise((resolve, reject) => {
    axios(options).then(response => {
      switch (+response.respCode) {
        case 0:
          resolve(response.data)
          break
        case 100:
          goLogin()
          break
        default:
          reject(response.memo)
      }
    })
  })
}

// export default Promise Object
export default xhr
