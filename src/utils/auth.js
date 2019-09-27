import { setStore, getStore, removeStore } from '@/utils/store'

const TokenKey = 'token'

export const getToken = () => getStore(TokenKey)

export const setToken = token => setStore(TokenKey, token, true)

export const removeToken = () => removeStore(TokenKey)
