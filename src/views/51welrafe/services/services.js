import axios from './http'
/**
 *  @description  福利游乐场-获取活动信息
 */
const getInfo = ( params ) => {
  let url = '//ops-api.beeplaying.com/ops/api/playground/activity-info'
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-兑换记录
 */
const getExchangeLog = ( params ) => {
  let url = '//ops-api.beeplaying.com/ops/api/playground/convert-record'
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-兑换
 */
const exchange = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/api/playground/convert/${params}`
  return axios.post(url)
}

/**
 *  @description  福利游乐场-排行榜列表
 */
const getRanking = ( params ) => {
  let url = '//ops-api.beeplaying.com/ops/api/playground/rank-list'
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-进度领取
 */
const getProgress = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/api/playground/task-receive/${params.type}/${params.sort}`
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-用户任务进度
 */
const getUserProgress = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/api/playground/user-progress`
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-用户获取道具记录
 */
const getUserPropLog = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/api/playground/user-prop-record`
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-用户排行信息
 */
const getUserRanking = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/api/playground/user-rank`
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-获取礼包列表
 */
const getCardList = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/api/playground/user-rank`
  return axios.post(url, params)
}



const services = {
  getInfo,
  getExchangeLog,
  exchange,
  getRanking,
  getProgress,
  getUserProgress,
  getUserPropLog,
  getUserRanking,
  getCardList
}
export default services