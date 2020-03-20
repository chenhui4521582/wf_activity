import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/activity-info`)
  return data
}
/**
 * @description 瓜分
 * @return {Object} data
 */
export const divide = async (time) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/divide/${time}`)
  return data
}
/**
 * @description 瓜分榜单
 * @return {Object} data
 */
export const rankList = async (params) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/rank-list`, params)
  return data
}
/**
 * @description 使用加成卡
 * @return {Object} data
 */
export const useMarkup = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/use-markup`)
  return data
}
/**
 * @description 用户记录
 * @return {Object} data
 */
export const userRecord = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/cake/user-record`)
  return data
}
// /**
//  * @description 查询瓜分类活动状态
//  * @return {Object} data
//  */
// export const divideState = async () => {
//   const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/activity/divide-state`)
//   return data
// }
/**
 * @description 礼包接口地址
 * @return {Object} data
 */
export const getMallProductList = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/237
  `)
  return data
}
