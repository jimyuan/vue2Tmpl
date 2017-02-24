import xhr from './xhr/axios'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {

  fetch (params = {}) {
    const url = '/ta/acounts'
    return xhr({ url, params })
  }

  postMsg (data = {}) {
    const url = '/bu/financeOrder'
    const method = 'post'
    return xhr({ url, data, method })
  }

  checkLogin () {
    return xhr({ url: '/user' })
  }

  /**
   * @param  {Object} userData
   * @return {Promise}
   */
  login (userData) {
    return xhr({
      method: 'post',
      url: '/login',
      body: userData
    })
  }

  logout () {
    return xhr({ url: '/logout' })
  }

}

// 实例化后再导出
export default new UserService()
