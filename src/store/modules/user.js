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
      return new Promise((resolve, reject) => {
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
      return new Promise((resolve, reject) => {
        userService.getInfo(state.token)
          .then(data => {
            const roles = [data.roleName]
            if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', roles)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }
            commit('SET_USER_INFO', data)
            // 存 name
            // commit('SET_NAME', data.realname)
            // 存 avatar
            // commit('SET_AVATAR', data.headPic)
            // 存 company
            // commit('SET_POSITION', {
            //   companyName: data.companyName,
            //   departName: data.departName
            // })
            resolve(data)
          })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        userService.logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles ({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        userService.getInfo(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    }
  }
}

export default user
