import ajax from './xhr/'
import api from './xhr/api'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {
  /**
   * 获取用户列表
   *
   * @param {Object} 传参，eg: { id: 123 }
   * @return {Promise}
   */
  fetch (body = {}) {
    return ajax({ url: api.list, body })
  }

  /**
   * 登录接口
   *
   * @param  {Object} eg: {usr: 'jim', pwd: 'password'}
   * @return {Promise}
   */
  login (body) {
    return ajax({ url: '/login', method: 'post', body })
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
