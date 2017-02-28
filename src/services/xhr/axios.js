import axios from 'axios'
import { errHandler, warnHandler, env, baseURL } from './config'

const xhr = ({ url, body = {}, method = 'get' }) => {
  const seed = +new Date()
  let mockParams, options
  baseURL.webAPI === env.local.webAPI
    ? mockParams = { local: 1, mock: 1, enforce: seed }
    : mockParams = { seed }
  if (method.toLowerCase() === 'get') {
    options = {
      url,
      method,
      params: Object.assign(body, mockParams),
      baseURL: baseURL.webAPI
    }
  } else if (method.toLowerCase() === 'post') {
    options = {
      url,
      method,
      params: mockParams,
      data: body,
      baseURL: baseURL.webAPI
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
