import ajax from './xhr/'
import api from './xhr/api'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {
  /**
   * 获取用户列表
   *
   * @param {Object} data 传参，eg: { id: 123 }
   * @return {Promise}
   */
  fetch (data = {}) {
    return ajax({ url: api.list, data })
  }

  /**
   * 获取表格表头
   *
   * @return {Promise}
   */
  getSort () {
    return ajax({ url: api.sort })
  }

  /**
   * 登录接口
   *
   * @param  {Object} data {usr: 'jim', pwd: 'password'}
   * @return {Promise}
   */
  login (data) {
    return ajax({ url: api.login, method: 'post', data })
  }

  /**
   * 退出登录
   *
   * @return {Promise}
   */
  logout () {
    return ajax({ url: api.logout })
  }
}

/**
 * 实例化后再导出 userService
 *
 */
export default new UserService()
