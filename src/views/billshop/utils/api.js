import $axios from '../http'
/**
 * @description 获取话费券商城列表 新的接口
 */
export const billList = async () => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/mainNew')
  return data
}
/**
 * @description 话费卷获取
 * @param {Number} productId
 */
export const placeOrder = async (productId, count) => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/placeOrder', { productId, count })
  return data
}
/**
 * @description 商品详情
 * @param {Number} phyAwardsType
 * @param {String} name
 * @param {Number} showOut
 * @return {Object} data
 */

export const getGoodsDetail = async (phyAwardsType, name, showOut) => {
  const { data } = await $axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/detail', { phyAwardsType, name, showOut })
  return data
}
