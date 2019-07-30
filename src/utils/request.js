import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Const from '@/utils/const'

const errorTip = msg => Message({
  showClose: true,
  message: msg,
  type: 'error',
  duration: 5 * 1000
})

// 创建axios实例
const service = axios.create({
  // 在 /config 相对应的环境文件中可分别设置不同环境下的 api 地址
  baseURL: process.env.VUE_APP_API,
  // 请求超时时间
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers[Const.tokenName] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非00000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    // 04002:非法的token;
    if (+res.respCode === 4002) {
      return MessageBox.confirm('你已被登出，请者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => store.dispatch('LogOut'))
    } else if (+res.respCode !== 0) {
      errorTip(res.memo)
      return Promise.reject(new Error(`respCode: ${res.respCode}`))
    } else {
      return res.data
    }
  },
  error => {
    errorTip(error)
    return Promise.reject(error)
  }
)

const ajax = ({ url, method = 'post', data = {} }) => {
  const seed = +new Date()
  const options = { url, method, params: { seed } }
  method === 'post'
    ? Object.assign(options, { data })
    : Object.assign(options, { params: { ...data, seed } })
  return new Promise((resolve, reject) => {
    service(options)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export default ajax
