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
  'prod': {
    webAPI: 'http://www.ebaoli.com/api'
  }
}

/* === 判断当前运行环境 === */
switch (window.location.host) {
  // local env
  case '0.0.0.0:8080':
  case 'localhost:8080':
  case '127.0.0.0:8080':
    apiRoot = apiEnv.local
    break
  // dev env
  case 'dev.env.com':
    apiRoot = apiEnv.dev
    break
  // test env
  case 'test.env.com':
    apiRoot = apiEnv.test
    break
  // prod env
  case 'prod.env.com':
    apiRoot = apiEnv.prod
    break
  default:
    apiRoot = apiEnv.local
}
export default apiRoot
