/* 合法用户名长度 */
export const validUserName = str => /\S{6,}/.test(str.trim())
