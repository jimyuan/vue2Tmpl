import Const from '@/utils/const'
import { setStore, getStore, removeStore } from '@/utils/store'

const TokenKey = Const.tokenName

export function getToken () {
  return getStore(TokenKey)
}

export function setToken (token) {
  return setStore(TokenKey, token, true)
}

export function removeToken () {
  return removeStore(TokenKey)
}
