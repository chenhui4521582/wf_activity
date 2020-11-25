import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/balloon-boom/home')
  return data
}
/**
 * @description 兑换
 * @return {Object} data
 */
export const exchagePrize = async () => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/balloon-boom/hitBalloon`)
  return data
}
/**
 * @description 奖励列表
 * @return {Object} data
 */
export const getRecords = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/balloon-boom/findUserAwards')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/balloon-boom/notice-list')
  return data
}

