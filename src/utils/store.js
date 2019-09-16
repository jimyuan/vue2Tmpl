/*
 * 存储localStorage
 * name: key
 * content: 内容
 * type: true 为 session storage，默认 false
 */
export const setStore = (name, content, type = false) => {
  const obj = { content, type, datetime: +new Date() }
  const storage = type ? sessionStorage : localStorage
  storage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 * 过期则返回 null
 */
export const getStore = (name, expired = null) => {
  const obj = JSON.parse(localStorage.getItem(name) || sessionStorage.getItem(name))
  // 不存在
  if (!obj) return null
  // 过期
  if (expired !== null && +new Date() - obj.datetime > expired) return null
  // 返回真实数据
  return obj.content
}
/**
 * 删除localStorage
 */
export const removeStore = name => {
  localStorage.removeItem(name)
  sessionStorage.removeItem(name)
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (type = false) => {
  const storage = type ? sessionStorage : localStorage
  return Object.keys(storage).map(item => ({
    name: item,
    content: getStore(item)
  }))
}

/**
 * 清空全部 localStorage
 */
export const clearStore = (type = false) => {
  const storage = type ? sessionStorage : localStorage
  storage.clear()
}
