import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/national-day/activity-info')
  return data
}
/**
 * @description 领取礼包奖励
 * @return {Object} data
 */

export const receiveBag = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/national-day/receive-bag')
  return data
}
/**
 * @description 选礼包
 * @return {Object} data
 */
export const applyLevel = async (level) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/national-day/apply/${level}`)
  return data
}
/**
 * @description 领取任务奖励
 * @return {Object} data
 */
export const receiveTask = async (sort) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/national-day/receive-task/${sort}`)
  return data
}
