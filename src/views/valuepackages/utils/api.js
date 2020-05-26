import $axios from '../../../http'

/**
 * @description 活动信息接口
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/package/feedback/activity-info')
  return data
}
/**
 * @description 礼包接口
 * @return {Object} data
 */
export const getPackages = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/245')
  return data
}
