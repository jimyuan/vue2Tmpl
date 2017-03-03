import Vue from 'vue'
import Vuex from 'vuex'
import WsCache from 'web-storage-cache'
import * as types from './types'

// 设置本地缓存（token）过期时间为 7 天
const exp = 3600 * 24 * 7
const ls = new WsCache()

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {},
    token: null
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      ls.set('token', data, { exp })
      state.token = data
    },
    [types.LOGOUT]: (state) => {
      ls.delete('token')
      state.token = null
      ls.delete('user')
      state.user = {}
    },
    [types.USER]: (state, data) => {
      ls.set('user', data, { exp })
      state.user = data
    }
  }
})
