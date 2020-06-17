import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dragon-boat/activity-info')
  return data
}

/**
 * @description 昨日榜单
 * @return {Object} data
 */

export const getHistoryRank = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dragon-boat/history-rank')
  return data
}
/**
 * @description 锦鲤记录
 * @return {Object} data
 */

export const getHornList = async (trackLevel) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dragon-boat/notice-list/' + trackLevel)
  return data
}
/**
 * @description 领取奖励
 * @param {Number} id
 * @return {Object} data
 */

export const goApply = async (trackLevel) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dragon-boat/apply/' + trackLevel)
  return data
}
/**
 * @description 获取赛况排行
 * @return {Object} data
 */

export const getRankInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dragon-boat/rank-info')
  return data
}
/**
 * @description 获取排行奖励
 * @return {Object} data
 */
export const getRankConfig = async () => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/dragon-boat/rank-config`)
  return data
}
/**
 * @description 用户排行奖励
 * @return {Object} data
 */
export const getRankAwards = async () => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/dragon-boat/user-rank-awards`)
  return data
}
/**
 * @description 用户赛道奖励

 * @return {Object} data
 */
export const getTrackConfig = async () => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/dragon-boat/user-track-awards`)
  return data
}
/**
 * @description 获取礼包
 * @return {Object} data
 */

export const getPackages = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/246')
  return data
}
/**
 * @description 粽子签到
 * @return {Object} data
 */

export const getSign = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dragon-boat/sign-in')
  return data
}
/**
 * @description 冲刺
 * @return {Object} data
 */

export const getSprint = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dragon-boat/sprint')
  return data
}

