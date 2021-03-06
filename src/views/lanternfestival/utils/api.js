import $axios from '../../lanternfestival/http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/activity-info')
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */

export const rankList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/rank-list')
  return data
}

/**
 * @description 礼包
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/lantern')
  return data
}
/**
 * @description 元宵红包活动-累消领取奖励
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/game-receive/' + sort)
  return data
}
/**
 * @description 元宵红包活动-副页活动详细信息
 * @return {Object} data
 */
export const taskProgressInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/activity-detail-info')
  return data
}
/**
 * @description 元宵红包活动-任务领取奖励 任务序号,1:每日任务数，2：充值数
 * @return {Object} data
 */
export const taskReceive = async (params) => {
  const {data} = await $axios.post("//ops-api.beeplaying.com/ops/api/lantern/task-receive/" + params.sort)
  return data
}
/**
 * @description 领取记录
 * @return {Object} data
 */

export const gameReceiveRecord = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/user-coupon-awards')
  return data
}

/**
 * @description 奖励提示
 * @return {Object} data
 */

export const userAwardsTips = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/user-awards-tips')
  return data
}

/**
 * @description 瓜分券奖励领取
 * @return {Object} data
 */

export const couponAwardReceive = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/coupon-award-receive')
  return data
}
