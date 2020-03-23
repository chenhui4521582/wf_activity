import axios from './http'

/**
 * @descript 获取活动信息
 * @param 
 */
const getActivityInfo = function(params) {
  let url = '//quoits-api.beeplaying.com/quoits/api/exchange/activity-info'
  return axios.post(url, params)
}

/**
 * @descript 获取商品详情
 * @param productId: 商品id
 */
const getGoodsDetail = function(params) {
  let url = '//quoits-api.beeplaying.com/quoits/api/exchange/detail'
  return axios.post(url, params)
}

/**
 * @descript 抽奖
 * @param productId: 商品id
 */
const getLottery = function(params) {
  let url = '//quoits-api.beeplaying.com/quoits/api/exchange/lottery'
  return axios.post(url, params)
}


/**
 * @descript 抽奖记录
 * @param 
 */
const getLotteryLog = function(params) {
  let url = '//quoits-api.beeplaying.com/quoits/api/exchange/lottery-record'
  return axios.post(url, params)
}

/**
 * @descript 跑马灯
 * @param 
 */
const getNoticeList = function(params) {
  let url = '//quoits-api.beeplaying.com/quoits/api/exchange/notice-list'
  return axios.post(url, params)
}

const Services = {
  getActivityInfo,
  getGoodsDetail,
  getLottery,
  getLotteryLog,
  getNoticeList
}

export {
  getActivityInfo,
  getGoodsDetail,
  getLottery,
  getLotteryLog,
  getNoticeList
}

export default Services