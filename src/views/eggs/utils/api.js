import $axios from '../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/activity-info')
  return data
}

/**
 * @description 投注奖励
 * @return {Object} data
 */

export const betAwards = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/bet-awards')
  return data
}
/**
 * @description 单次投注
 * @param {Number} value sort
 * @return {Object} data
 */

export const betSingle = async (params) => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/bet-single', params)
  return data
}
/**
 * @description 批量投注
 * @param {Number} value awardsLev
 * @return {Object} data
 */

export const betBatch = async (params) => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/bet-batch', params)
  return data
}
/**
 * @description 投注进度
 * @return {Object} data
 */

export const betProgress = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/bet-progress')
  return data
}
/**
 * @description 游戏累消进度
 * @return {Object} data
 */

export const gameProgress = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/game-progress')
  return data
}
/**
 * @description 我的奖品
 * @return {Object} data
 */

export const myAwards = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/my-awards')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/notice-list')
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */

export const rankList = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/rank-list')
  return data
}
/**
 * @description 用户新增锤子数
 * @return {Object} data
 */
export const userIncrement = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/user-increment')
  return data
}
/**
 * @description 用户信息
 * @return {Object} data
 */

export const userInfo = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/user-info')
  return data
}

/**
 * @description 礼包
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const { data } = await $axios.post('//shop-api.beeplay123.com/shop/api/mall/showLeaguePacksList/20190711')
  return data
}
/**
 * @description 用户排名
 * @return {Object} data
 */

export const userRanking = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/user-ranking')
  return data
}
/**
 * @description 获取用户是否需要新手引导
 * @return {Object} data
 */

export const getGuidePosition = async () => {
  const { data } = await $axios.post('//platform-api.beeplay123.com/wap/api/plat/newUser/get-guide-position', { version: 6 })
  return data
}
/**
 * @description 报存用户新手引导
 * @return {Object} data
 */

export const setGuidePosition = async () => {
  const { data } = await $axios.post('//platform-api.beeplay123.com/wap/api/plat/newUser/set-guide-position', { version: 6 })
  return data
}
