import $axios from '../../../http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/activity-info`)
  return data
}
/**
 * @description 获取记录
 * @return {Object} data
 */
export const findRecord = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/find-record`)
  return data
}
/**
 * @description 我的排行奖励
 * @return {Object} data
 */
export const myRank = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/my-rank`)
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rank-list`)
  return data
}
/**
 * @description 返利领取
 * @param recordId 返利ID Number
 * @return {Object} data
 */
export const rebateReceive = async (recordId) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rebate-receive/${recordId}`)
  return data
}
/**
 * @description 返利记录
 * @return {Object} data
 */
export const rebateRecord = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/blessing/rebate-record`)
  return data
}
