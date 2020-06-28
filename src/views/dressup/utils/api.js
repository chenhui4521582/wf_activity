import $axios from '../../../http'

/**
 * @description 热门帖子列表
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/dress/up/activity-info')
  return data
}
/**
 * @description 礼包接口
 * @return {Object} data
 */
export const getPackages= async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/247')
  return data
}
