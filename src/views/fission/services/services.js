import axios from './http'
/**
 *  @description  裂变活动-获取活动信息
 */
const getInfo = ( params ) => {
  let url = '//ops-api.beeplaying.com/ops/fission/activity-info'
  return axios.post(url, params)
}

/**
 *  @description  裂变拉新活动-获取我的奖品列表
 */
const getMyAwardLog = ( params ) => {
  let url = '//ops-api.beeplaying.com/ops/fission/awards'
  return axios.post(url, params)
}

/**
 *  @description  裂变拉新活动-获取我的钥匙记录
 */
const getMyKeyLog = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/fission/awards/${params}`
  return axios.post(url)
}

/**
 *  @description  裂变拉新活动-开宝箱
 */
const getAward = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/fission/lot/${params}`
  return axios.post(url)
}

/**
 *  @description  裂变拉新活动-获取跑马灯数据
 */
const getNoticeList = ( params ) => {
  let url = `//ops-api.beeplaying.com/ops/fission/noticeList`
  return axios.post(url, params)
}

/**
 *  @description  裂变拉新活动-被邀请人下载注册后调用
 */
const register = ( code ) => {
  let url = `//ops-api.beeplaying.com/ops/fission/invite/${code}`
  return axios.post(url)
}


export {
  getInfo,
  getMyAwardLog,
  getMyKeyLog,
  getAward,
  getNoticeList,
  register
}

const services = {
  getInfo,
  getMyAwardLog,
  getMyKeyLog,
  getAward,
  getNoticeList,
  register
}
export default services