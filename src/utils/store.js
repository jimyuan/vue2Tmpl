import { validatenull } from '@/utils/validate'

/*
 * 存储localStorage
 * name: key
 * content: 内容
 * type: true 为 session storage，默认 false
 */
export const setStore = (name, content, type = false) => {
  const obj = {
    content,
    type,
    datetime: new Date().getTime()
  }
  const storage = type ? sessionStorage : localStorage
  storage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 */
export const getStore = name => {
  const obj = localStorage.getItem(name) || sessionStorage.getItem(name)
  return validatenull(obj) ? null : JSON.parse(obj).content
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
  const list = []
  const storage = type ? sessionStorage : localStorage
  for (let i = 0, len = storage.length; i < len; i++) {
    list.push({
      name: storage.key(i),
      content: getStore(storage.key(i))
    })
  }
  return list
}

/**
 * 清空全部 localStorage
 */
export const clearStore = (type = false) => {
  const storage = type ? sessionStorage : localStorage
  storage.clear()
}
