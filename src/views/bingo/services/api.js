import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 获取Bingo冲冲冲商品列表
 * @return {Object} data
 */
export const getBingoProductList = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getBingoProductList`)
  return data
}
/**
 * @description 活动首页
 * @return {Object} data
 */
export const activityHome = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bingo/activityHome`)
  return data
}
/**
 * @description 活动初始化首页
 * @return {Object} actInfo, giftInfo
 */
export const initAct = () => {
  return $axios.all([$axios.post(`${OPS_API_BASE_URL}/ops/api/bingo/activityHome`), $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getBingoProductList`)]).then($axios.spread((actInfo, giftInfo) => {
    return { actRes: actInfo.data, giftRes: giftInfo.data }
  }))
}

/**
 * @description 奖励领取
 * @param addedAwardId 奖励ID
 * @return {Object} data
 */
export const receiveAddedAward = async (addedAwardId) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bingo/receiveAddedAward/${addedAwardId}`)
  return data
}
/**
 * @description 重置用户活动信息
 * @return {Object} data
 */
export const resetUserActivity = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bingo/resetUserActivity`)
  return data
}
const Service = {
  getBingoProductList,
  activityHome,
  receiveAddedAward,
  resetUserActivity
}
export default Service
