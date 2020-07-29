import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityHome = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/activityHome`)
  return data
}
/**
 * @description 首页接口
 * @return {Object} data
 */
export const inlet = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/inlet`)
  return data
}
/**
 * @description 积分领取
 * @return {Object} data
 */
export const pointConvert = async (id) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/pointConvert/${id}`)
  return data
}
/**
 * @description 签到
 * @return {Object} data
 */
export const sign = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/sign`)
  return data
}
/**
 * @description 任务领取
 * @return {Object} data
 */
export const taskFinish = async (taskId) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/taskFinish/${taskId}`)
  return data
}
/**
 * @description 用户积分
 * @return {Object} data
 */
export const userPoint = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/userPoint`)
  return data
}
/**
 * @description 礼包
 * @return {Object} data
 */
export const bigCustomerRecallProducts = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/bigCustomer/bigCustomerRecallProducts`)
  return data
}
/**
 * @description 发送大户召回附赠金叶子
 * @return {Object} data
 */
export const sendBigCustomerAdditionalRewards = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/bigCustomer/sendBigCustomerAdditionalRewards`)
  return data
}

const Service = {
  activityHome,
  inlet,
  pointConvert,
  sign,
  taskFinish,
  userPoint,
  bigCustomerRecallProducts,
  sendBigCustomerAdditionalRewards
}
export default Service
