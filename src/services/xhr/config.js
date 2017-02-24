// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现

// 后端 API 地址，最好以 http(s):// 打头
let env, envPath, baseURL

function errHandler (err) {
  console.warn('[ XHR:Failed ] 详情请看控制台')
  console.error(err)
}

function warnHandler (res) {
  console.warn(`[ XHR:Warning ] respCode: ${res.respCode}`)
}

env = {
  'local': {
    webAPI: 'http://localhost:8084'
  },
  'dev': {
    webAPI: 'http://10.66.1.133:8081/finance-web'
  },
  'test': {
    webAPI: 'http://10.66.1.160:8087/finance-web'
  },
  'pro': {
    webAPI: 'http://www.ebaoli.com/finance-web'
  }
}

/* === 判断当前为开发环境 === */
switch (window.location.host) {
  // local env
  case 'localhost:8080':
    envPath = env.local
    break
  // dev env
  case '10.66.1.133:8081':
    envPath = env.dev
    break
  // test env
  case '10.66.1.160:8087':
    envPath = env.test
    break
  // pro env
  case 'www.ebaoli.com':
    envPath = env.pro
    break
  default:
    envPath = env.local
}
baseURL = envPath

export { errHandler, warnHandler, env, envPath, baseURL }
