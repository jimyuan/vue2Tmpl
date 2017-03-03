import axios from 'axios'
import store from 'STORE/store'
import * as types from 'STORE/types'
import router from 'ROUTERS/'
import { errHandler, warnHandler, apiEnv, apiRoot } from './config'

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
  let mockParams, options
  apiRoot.webAPI === apiEnv.local.webAPI
    ? mockParams = { local: 1, mock: 1, enforce: seed }
    : mockParams = { seed }
  options = { url, method }
  if (method.toLowerCase() === 'get') {
    options = {
      ...options,
      params: {...body, ...mockParams}
    }
  } else if (method.toLowerCase() === 'post') {
    options = {
      ...options,
      params: mockParams,
      data: body
    }
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => {
        switch (+response.respCode) {
          case 0:
            resolve(response.data)
            break
          // 需登录，跳转到登录页
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
