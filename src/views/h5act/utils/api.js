import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/game/recharge/activity-info')
  return data
}
/**
 * @description 领取优惠券
 * @return {Object} data
 */
export const getCoupon = async (id) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/game/recharge/receive-coupon/' + id)
  return data
}
/**
 * @description 领取奖品
 * @return {Object} data
 */
export const getAwards = async (step) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/game/recharge/receive-awards/' + step)
  return data
}
/**
 * @description 步数奖品领取记录
 * @return {Object} data
 */
export const getAwardsRecord = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/game/recharge/step-awards-list')
  return data
}
/**
 * @description 优惠券领取记录
 * @return {Object} data
 */
export const getCouponssRecord = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/game/recharge/coupon-list')
  return data
}
