export default {
  home: '/',
  tokenName: 'GWTAuthorization',
  pageSize: 5,
  baseAPI: process.env.NODE_ENV === 'production' ? '/' : '/api'
}
