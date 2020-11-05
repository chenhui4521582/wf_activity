import $axios from '../../../http'

/**
 * @description 活动信息接口
 * @return {Object} data
 */
export const getActInfo = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/user/move/recharge/exposure/activity-info')
  return data
}
/**
 * @description 礼包接口
 * @return {Object} data
 */
export const getPackages = async () => {
  const { data } = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/245')
  return data
}

/**
 * @description 获取用户是否绑定了手机
 */
export const getPhoneBindInfo = async () => {
  const { data } = await $axios.post('//uic-api.beeplaying.com/uic/api/user/center/getPhoneBindInfo')
  return data
}
/**
 * @description 获取短信验证吗
 */
export const getPhoneCode = async phone => {
  const { data } = await $axios.post('//uic-api.beeplaying.com/uic/api/user/center/sendPhoneBindCode', { phone })
  return data
}
/**
 * @description 绑定手机提交
 */
export const bindMobilePhone = async (phone, smsCode) => {
  const { data } = await $axios.post('//uic-api.beeplaying.com/uic/api/user/center/bindMobilePhone', { phone, smsCode })
  return data
}
