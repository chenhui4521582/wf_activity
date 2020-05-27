import axios from './http'
const host = '//ops-api.beeplaying.com'
const host1= '//rap2.taobao.org:38080/app/mock/255689'
/**
 *  @description  大神PK-获取活动信息
 */
const getInfo = ( params ) => {
  let url = `${host}/ops/api/pk/activity-info`
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-加入团队
 */
const joinTeam = ( params ) => {
  let url = `${host}/ops/api/pk/add-group`
  return axios.post(url, params)
}

/**
 *  @description  福利游乐场-战队列表
 */
const getRank = ( params ) => {
  let url = `${host}/ops/api/pk/group-top-user/${params}`
  return axios.post(url)
}

/**
 *  @description  福利游乐场-发奖
 */
const getAward = ( params ) => {
  let url = `${host}/ops/api/pk/user-awards-tips`
  return axios.post(url, params)
}

const services = {
  getInfo,
  joinTeam,
  getRank,
  getAward
}
export default services