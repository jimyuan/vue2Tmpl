import ajax from './axios'

/**
 * ajax 请求接口定义
 * @param  {String} options.method 请求方法，默认为 get。
 * @param  {String} options.url    请求路径，基于全局 baseURL。仅需要填写剩余路径
 * @param  {Object} options.body   请求体。后端 Express 使用 req.body 获取该对象
 * @return {Promise}
 *
 * 使用例子 ajax({ method: 'post', url: '/login', body: {Object} })
 * 最简单的例子 ajax({ url: '/logout' })
 */
export default ajax
