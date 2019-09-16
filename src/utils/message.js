import { Message, MessageBox } from 'element-ui'

// 异常状态提示
const specialTip = (message = '', type = 'warning') => Message({
  showClose: true,
  message,
  type,
  duration: 5 * 1000
})
// 提示重新登录
const reLogin = () => MessageBox.confirm('你已被登出，请者重新登录', '确定登出', {
  confirmButtonText: '重新登录',
  cancelButtonText: '取消',
  type: 'warning'
})

export { specialTip, reLogin }
