import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/discount-gift/activity-info')
  return data
}
/**
 * @description 跑马灯信息
 * @return {Object} data
 */
export const getNoticeList = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/discount-gift/notice-list')
  return data
}
