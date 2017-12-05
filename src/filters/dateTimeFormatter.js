/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
let zerofill = val => val >= 10 ? val : `0${val}`

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {Number} type 格式化类型，默认类型 2
 * @return {String} 默认格式：2015-01-05
 */
export default (time, type = 2) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()

  switch (type) {
    case 0: // 01-05
      return `${zerofill(month)}-${zerofill(day)}`
    case 1: // 11:12
      return `${zerofill(hours)}-${zerofill(minutes)}`
    case 2: // 2015-01-05
      return `${year}-${zerofill(month)}-${zerofill(day)}`
    case 3: // 2015-01-05 11:12
      return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`
    default: // 2015-01-05 11:12:13
      return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
  }
}
