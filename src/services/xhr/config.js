// 此处配置不同环境下后端 api 同前端访问页面的映射

let apiEnv, apiRoot

/**
 * apiEnv: 各个不同环境所对应的 api
 *
 * @type {Object}
 */
apiEnv = {
  'local': {
    webAPI: 'http://localhost:8084'
  },
  'dev': {
    webAPI: 'http://10.66.1.133:8081/api'
  },
  'test': {
    webAPI: 'http://10.66.1.160:8087/api'
  },
  'pro': {
    webAPI: 'http://www.ebaoli.com/api'
  }
}

/* === 判断当前为开发环境 === */
switch (window.location.host) {
  // local env
  case '0.0.0.0:8080':
    apiRoot = apiEnv.local
    break
  // dev env
  case '10.66.1.133:8081':
    apiRoot = apiEnv.dev
    break
  // test env
  case '10.66.1.160:8087':
    apiRoot = apiEnv.test
    break
  // pro env
  case 'www.ebaoli.com':
    apiRoot = apiEnv.pro
    break
  default:
    apiRoot = apiEnv.local
}
export default apiRoot
