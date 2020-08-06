import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/three-hours/activity-info')
  return data
}
/**
 * @description 报名参加
 * @return {Object} data
 */
export const goApply = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/three-hours/apply')
  return data
}
/**
 * @description 领取奖励
 * @return {Object} data
 */
export const receivePrize = async (stage) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/three-hours/receive/${stage}`)
  return data
}
