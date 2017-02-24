import axios from 'axios'
import { errHandler, warnHandler, env, baseURL } from './config'

const xhr = ({ url, params = {}, method = 'get', data = {} }) => {
  const seed = +new Date()
  let mockParams
  baseURL.webAPI === env.local.webAPI
    ? mockParams = { local: 1, mock: 1, enforce: seed }
    : mockParams = { seed }
  return axios({
    method,
    data,
    url,
    params: Object.assign(params, mockParams),
    baseURL: baseURL.webAPI
  })
    .then(respData => respData.data)
    .then(respData => {
      (+respData.respCode !== 0) && warnHandler(respData)
      return respData
    })
    .catch(errHandler)
}

export default xhr
