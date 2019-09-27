import userService from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    roles: [],
    info: {
      username: ''
    }

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, data) => {
      state.info = data
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.usr.trim()
      return userService.login(username, userInfo.pwd)
        .then(data => {
          const { token } = data
          // 存 token
          setToken(token)
          commit('SET_TOKEN', token)
        })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return userService.getInfo(state.token)
        .then(data => {
          // 验证返回的roles是否是一个非空数组
          const roles = [data.roleName || 'admin']
          commit('SET_ROLES', roles)
          commit('SET_USER_INFO', data)
          return data
        })
    },

    // 登出
    LogOut ({ commit }) {
      return userService.logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_USER_INFO', {})
          removeToken()
        })
    }
  }
}

export default user
