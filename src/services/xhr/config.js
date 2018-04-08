/**
 * apiEnv: 各个不同环境所对应的 api 地址（公共部分）
 */
const apiEnv = {
  'local': {
    webAPI: '/api'
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

export default () => {
  /**
  * 判断当前运行环境
  * 将当前所对应的 api 地址赋予 apiRoot
  */
  switch (window.location.host) {
    // local env
    case '0.0.0.0:8080':
    case '127.0.0.0:8080':
    case 'localhost:8080':
      return apiEnv.local
    // dev env
    case 'dev.env.com':
      return apiEnv.dev
    // test env
    case 'test.env.com':
      return apiEnv.test
    // prod env
    case 'prod.env.com':
      return apiEnv.prod
    default:
      return apiEnv.local
  }
}
