// const userInfo = state =>
const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  name: state => state.user.info.userName,
  addRouters: state => state.permission.addRouters,
  permissionRouters: state => state.permission.routers
}
export default getters
