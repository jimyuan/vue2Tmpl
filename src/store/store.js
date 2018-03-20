import Vue from 'vue'
import Vuex from 'vuex'
import WsCache from 'web-storage-cache'

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
    login (state, data) {
      ls.set('token', (state.token = data), { exp })
    },
    logout (state) {
      [state.token, state.user] = [null, {}]
      ls.clear()
    },
    user (state, data) {
      ls.set('user', (state.user = data), { exp })
    }
  }
})
