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
 * @description 批量投注
 * @return {Object} data
 */

export const betBatch = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/bet-batch')
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
 * @description 单次投注
 * @return {Object} data
 */

export const betSingle = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/bet-single')
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
 * @description 排行榜列表
 * @return {Object} data
 */

export const rankList = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/plant-food-v2/rank-list')
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
