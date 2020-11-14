import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/recharge-jackpot/activity-info')
  return data
}
/**
 * @description 兑换奖励列表
 * @return {Object} data
 */

export const getAwardsList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/recharge-jackpot/exchange/awards-list')
  return data
}
/**
 * @description 奖池当前额度
 * @return {Object} data
 */
export const getJackpotAmount = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/recharge-jackpot/jackpot-amount')
  return data
}
/**
 * @description 兑换
 * @return {Object} data
 */
export const exchagePrize = async (sort) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/recharge-jackpot/exchange/${sort}`)
  return data
}
/**
 * @description 获得兑换记录
 * @return {Object} data
 */
export const getRecords = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/recharge-jackpot/exchange/record-list')
  return data
}
/**
 * @description 礼包接口
 * @return {Object} data
 */
export const getPackages = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/265')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/recharge-jackpot/notice-list')
  return data
}

