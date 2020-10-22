import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy-monopoly/activity-info`)
  return data
}
/**
 * @description 投注记录
 * @return {Object} data
 */
export const betRecord = async (gameLevel) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy-monopoly/bet-record/${gameLevel}`)
  return data
}

/**
 * @description 投注
 * @return {Object} data
 */
export const bet = async ({ gameLevel, time }) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy-monopoly/bet/${gameLevel}/${time}`)
  return data
}
/**
 * @description 游戏信息
 * @return {Object} data
 */
export const gameInfo = async (gameLevel) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy-monopoly/game-info/${gameLevel}`)
  return data
}
/**
 * @description 累消领取奖励
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy-monopoly/game-receive/${sort}`)
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async (type) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy-monopoly/rank-list/${type}`)
  return data
}
/**
 * @description 用户进度
 * @return {Object} data
 */
export const userProgress = async (gameLevel) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy-monopoly/user-progress`)
  return data
}

/**
 * @description 礼包数据
 * @return {Object} data
 */

export const getMallProductListByType = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/262`)
  return data
}
const Service = {
  // 活动信息
  activityInfo,
  // 投注记录
  betRecord,
  // 投注
  bet,
  // 游戏信息
  gameInfo,
  // 累消领取奖励
  gameReceive,
  // 排行榜列表
  rankList,
  // 用户进度
  userProgress,
  // 礼包数据
  getMallProductListByType
}
export default Service
