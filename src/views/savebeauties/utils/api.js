import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//10.33.80.62:5080/ops/api/beauty/activity-info')
  return data
}
/**
 * @description 我的奖品
 * @return {Object} data
 */
export const myAwards = async () => {
  const {data} = await $axios.post('//10.33.80.62:5080/ops/api/beauty/my-award')
  return data
}
/**
 * @description 我的队伍
 * @return {Object} data
 */

export const myBeauty = async () => {
  const {data} = await $axios.post('//10.33.80.62:5080/ops/api/beauty/my-beauty')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const {data} = await $axios.post('//10.33.80.62:5080/ops/api/beauty/notice-list')
  return data
}
/**
 * @description 领取组合奖励
 * @return {Object} data
 */
export const gameComposeReceive = async (id) => {
  const {data} = await $axios.post('//10.33.80.62:5080/ops/api/beauty/receive-compose-award/' + id)
  return data
}
/**
 * @description 任务自动完成
 * @return {Object} data
 */
export const taskAutoComplete = async (id) => {
  const {data} = await $axios.post('//10.33.80.62:5080/ops/api/beauty/task-auto-completed/' + id)
  return data
}
/**
 * @description 领取任务奖励
 * @return {Object} data
 */
export const taskReceive = async (id) => {
  const {data} = await $axios.post("//10.33.80.62:5080/ops/api/beauty/task-receive/" + id)
  return data
}
/**
 * @description 任务重置
 * @return {Object} data
 */
export const taskReset = async () => {
  const {data} = await $axios.post('//10.33.80.62:5080/ops/api/beauty/task-reset')
  return data
}
/**
 * @description 礼包
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/beauty')
  return data
}
