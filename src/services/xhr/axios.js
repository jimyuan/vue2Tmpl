import axios from 'axios'
import { errHandler, warnHandler, env, baseURL } from './config'

const xhr = ({ url, body = {}, method = 'get' }) => {
  const seed = +new Date()
  let mockParams, options
  baseURL.webAPI === env.local.webAPI
    ? mockParams = { local: 1, mock: 1, enforce: seed }
    : mockParams = { seed }
  options = {
    url, method, baseURL: baseURL.webAPI, withCredentials: true
  }
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
  return axios(options)
    .then(respData => respData.data)
    .then(respData => {
      if (+respData.respCode !== 0) {
        warnHandler(respData)
        return false
      } else {
        return respData.data
      }
    })
    .catch(errHandler)
}

export default xhr
