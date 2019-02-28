import ajax from '@/utils/request'

class UserService {
  // 登录，获取 token
  login (username, password) {
    return ajax({
      url: '/login',
      data: { username, password }
    })
  }
  // 获取用户信息
  getInfo (token) {
    return ajax({
      url: '/user/info',
      data: { token }
    })
  }
  /**
   * 获取用户列表
   *
   * @param {Object} data 传参，eg: { id: 123 }
   * @return {Promise}
   */
  fetch (data = {}) {
    return ajax({
      url: '/start',
      data
    })
  }
  /**
   * 获取表头
   */
  getSort () {
    return ajax({
      url: '/sort'
    })
  }
  // 登出
  logout () {
    return ajax({
      url: '/logout'
    })
  }
}

export default new UserService()
