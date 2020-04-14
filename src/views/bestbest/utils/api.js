import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lucky-lot/activity-info')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lucky-lot/notice-list')
  return data
}
/**
 * @description 任务领取
 * @return {Object} data
 */
export const taskGain = async (id) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lucky-lot/accept-awards/' + id)
  return data
}

/**
 * @description 礼包数据
 * @return {Object} data
 */
export const showLeaguePacksList = async () => {
  const { data } = await $axios.post('http://shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/238')
  return data
}
/**
 * @description 大家手气
 * @return {Object} data
 */
export const getRankList = async (params) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lucky-lot/rank-list', params)
  return data
}
/**
 * @description 我抽到的签
 * @return {Object} data
 */
export const getLotRecord = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lucky-lot/lot-record')
  return data
}
/**
 * @description 我的奖励
 * @return {Object} data
 */
export const getAwardsRecord = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lucky-lot/awards-record')
  return data
}
/**
 * @description 抽签
 * @return {Object} data
 */
export const drawLot = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lucky-lot/draw-lot')
  return data
}
