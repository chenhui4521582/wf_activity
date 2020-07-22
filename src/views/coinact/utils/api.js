import $axios from '../../../http'

/**
 * @description 热门帖子列表
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/gold-coin/activity-info')
  return data
}
/**
 * @description 领取所有奖励
 * @return {Object} data
 */
export const receiveAll = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/gold-coin/receive-all')
  return data
}
/**
 * @description 领取奖励
 * @return {Object} data
 */
export const receivePrize = async (category, sort) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/gold-coin/receive/${category}/${sort}`)
  return data
}
/**
 * @description 礼包
 * @return {Object} data
 */
export const getPackages = async (batchId) => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/249/' + batchId)
  return data
}
