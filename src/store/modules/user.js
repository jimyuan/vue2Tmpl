import userService from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    roles: [],
    info: {
      companyId: 0,
      companyName: '',
      departId: 0,
      departName: '',
      email: '',
      mobilePhone: '',
      realname: '',
      roleId: 0,
      roleName: '',
      userId: 0,
      userStatus: 0,
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
      return new Promise(resolve => {
        userService.login(username, userInfo.pwd)
          .then(response => {
            const data = response
            // 存 token
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return userService.getInfo(state.token)
        .then(data => {
          if (!data) return Promise.reject(new Error('Data error!'))
          // 验证返回的roles是否是一个非空数组
          const roles = [data.roleName]
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
        .catch(error => {
          return Promise.reject(error)
        })
    },

    // 前端 登出
    /*
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    */
    // 动态修改权限
    ChangeRoles ({ commit, state }) {
      userService.getInfo(state.token)
        .then(res => {
          const data = res
          commit('SET_ROLES', [data.roleName])
          commit('SET_USER_INFO', data)
          return data
        })
    }
  }
}

export default user
