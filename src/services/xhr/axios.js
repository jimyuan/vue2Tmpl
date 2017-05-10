import axios from 'axios'
import store from 'STORE/store'
import * as types from 'STORE/types'
import router from 'ROUTERS/'
import { errHandler, warnHandler, apiRoot } from './config'

/**
 * 登录跳转方法
 *
 */
function goLogin () {
  store.commit(types.LOGOUT)
  router.replace({
    path: '/login',
    query: { redirect: router.currentRoute.fullPath }
  })
}

/**
 * axios 全局 options
 */
axios.defaults.baseURL = apiRoot.webAPI
axios.defaults.withCredentials = true

/**
 * Ajax response 拦截器
 */
axios.interceptors.response.use(
  response => response.data,
  error => {
    errHandler(error)
    if (error.response) {
      // 401 清除 token 信息并跳转到登录页面
      error.response.status === 401 && goLogin()
    }
    return Promise.reject(error)
  }
)

/**
 * Ajax request 拦截器
 *
 */
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['Credit-Token'] = `token ${store.state.token}`
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
  switch (method.toLowerCase()) {
    case 'get':
      Object.assign(options, {
        params: {...body, ...mockParams}
      })
      break
    case 'post':
      Object.assign(options, { params: mockParams, data: body })
      break
    default:
  }
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
        // 需登录，跳转到登录页 (此处 respCode 取值应与后端协商，这里仅仅举个例子)
        case 100:
          goLogin()
          break
        default:
          reject(warnHandler(response))
      }
    })
  })
}

// export default Promise Object
export default xhr
