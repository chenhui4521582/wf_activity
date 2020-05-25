import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const getActivityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/user-return/activity-info')
  return data
}
/**
 * @description 领取每日奖励
 * @return {Object} data
 */

export const getReceiveDayAwards = async (day, idx) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/user-return/receive-day/' + day + '/' + idx)
  return data
}

/**
 * @description 领取额外奖励
 * @return {Object} data
 */

export const getExtraAwards = async (day) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/user-return/receive-extend/' + day)
  return data
}
/**
 * @description 获取礼包数据
 * @return {Object} data
 */
export const getPackages = async (params) => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/244')
  return data
}
/**
 * @description 领取福袋奖励
 * @return {Object} data
 */
export const getReceiveGift = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/user-return/receive-gift')
  return data
}
/**
 * @description 获取套圈新版还是老板
 * @return {Object} data
 */
export const getRingServerStatus = async () => {
  const {data} = await $axios.post('//quoits-api.beeplaying.com/quoits/api/quoitsgame/serverStatus')
  return data
}
