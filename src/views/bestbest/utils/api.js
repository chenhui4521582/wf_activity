import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/activityInfo')
  return data
}
/**
 * @description
 * @return {Object} data
 */

export const rankList = async () => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/rankList')
  return data
}
/**
 * @description 累消领取奖励
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/game-receive/' + sort)
  return data
}
/**
 * @description 副页活动详细信息
 * @return {Object} data
 */
export const taskProgressInfo = async () => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/activity-detail-info')
  return data
}
/**
 * @description 任务领取奖励 任务序号,1:每日任务数，2：充值数
 * @return {Object} data
 */
export const taskReceive = async (params) => {
  const {data} = await $axios.post("//petcat-api.beeplaying.com/ops/api/kill-virus/task-receive/" + params.sort)
  return data
}
/**
 * @description 领取记录
 * @return {Object} data
 */

export const gameReceiveRecord = async () => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/ops/api/kill-virus/user-coupon-awards')
  return data
}

/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/notice-list')
  return data
}
/**
 * @description 任务领取
 * @return {Object} data
 */
export const taskGain = async (id) => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/task/' + id)
  return data
}
/**
 * @description 一元抽奖
 * @return {Object} data
 */
export const yiyuanlottery = async () => {
  const {data} = await $axios.post('//petcat-api.beeplaying.com/petcat/api/vip/day/lottery')
  return data
}

/**
 * @description 礼包数据
 * @return {Object} data
 */
export const getPackages = async (flag) => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/' + flag)
  return data
}
/**
 * @description 大家手气
 * @return {Object} data
 */
export const getAllRecords = async (params) => {
  const {data} = await $axios.post('//platform-api.beeplaying.com/wap/api/profit/findPage',params)
  return data
}
