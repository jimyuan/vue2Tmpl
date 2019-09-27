import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { specialTip, reLogin } from '@/utils/message'
import Const from '@/utils/const'

// 创建axios实例
const service = axios.create({
  // 在 /config 相对应的环境文件中可分别设置不同环境下的 api 地址
  baseURL: process.env.VUE_APP_API,
  // 请求超时时间
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    // 让每个请求携带自定义token
    config.headers[Const.tokenName] = getToken()
  }
  return config
}, error => Promise.reject(error))

// respone拦截器
service.interceptors.response.use(
  response => {
    const { respCode, memo, data } = response.data
    switch (+respCode) {
      case 0:
        // 正常状态，返回 data
        return data
      case 4002:
        // 4002:非法的token;
        return reLogin()
          .then(() => store.dispatch('LogOut'))
          .then(() => router.replace({ name: 'home' }))
      default:
        // 其他未归类警告
        const err = `response code ${respCode}: ${memo}`
        specialTip(err)
        return Promise.reject(new Error(err))
    }
  },
  error => {
    specialTip(error, 'error')
    return Promise.reject(error)
  }
)

const ajax = ({ url, method = 'post', data = {} }) => {
  const seed = +new Date()
  const options = { url, method, params: { seed } }
  method === 'post'
    ? Object.assign(options, { data })
    : Object.assign(options, { params: { ...data, seed } })
  return service(options)
}

export default ajax
