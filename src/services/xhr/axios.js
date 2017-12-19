import axios from 'axios'
import store from 'STORE/store'
import router from 'ROUTERS/'
import apiRoot from './config'

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
 * 截获相应的数据集，返回接口的真实数据
 */
axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

/**
 * Ajax request 拦截器
 * 在检测到 token 时将其塞入 header 中随请求一起发送给后台
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

// export default Promise Object
const xhr = ({ url, data = {}, method = 'get' }) => {
  const seed = +new Date()
  const options = { url, method, params: { seed } }
  method === 'get'
    ? Object.assign(options, { params: { ...data, seed } })
    : Object.assign(options, { data })
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
    axios(options)
      .then(response => {
        switch (+response.respCode) {
          case 0:
            resolve(response.data)
            break
          case 100:
            goLogin()
            break
          default:
            console.warn(`[ XHR:Warning ] respCode: ${response.respCode}; message: ${response.memo}`)
            reject(response.memo)
        }
      }).catch(error => {
        console.error(`[ XHR:Failed ]: ${error}`)
        reject(error)
      })
  })
}

export default xhr
