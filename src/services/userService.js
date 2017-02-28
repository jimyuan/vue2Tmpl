import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {
  /**
   * 获取用户列表
   *
   * @return {Promise}
   */
  fetch (body = {}) {
    return xhr({
      url: '/start',
      body
    })
  }

  /**
   * 登录接口
   *
   * @param  {Object} body, 用户信息
   * @return {Promise}
   */
  login (body) {
    return xhr({
      method: 'post',
      url: '/login',
      body
    })
  }

  logout () {
    return xhr({ url: '/logout' })
  }

}

// 实例化后再导出
export default new UserService()
