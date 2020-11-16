import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'
const TRANS_API_BASE_URL = '//trans-api.beeplaying.com'
/**
 * @description 活动开关
 * @return {Object} data
 */
export const moveInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/user/move/info`)
  return data
}
/**
 * @description 用户签到
 * @return {Object} data
 */
export const signIn = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/user/move/signIn`)
  return data
}
/**
 * @description 签到信息
 * @return {Object} data
 */
export const signInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/user/move/signIn/info`)
  return data
}
/**
 * @description 用户引流礼包
 * @return {Object} data
 */
export const getMallProductListByType = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/234`)
  return data
}
/**
 * @description 抽奖次数
 * @return {Object} data
 */
export const userMoveNum = async () => {
  const { data } = await $axios.post(`${TRANS_API_BASE_URL}/trans/api/activity/userMoveNum`)
  return data
}
/**
 * @description 抽奖
 * @return {Object} data
 */
export const userMoveSend = async (value) => {
  const { data } = await $axios.post(`${TRANS_API_BASE_URL}/trans/api/activity/userMoveSend`, { value })
  return data
}
/**
 * @description 下载
 * @return {Object} data
 */
export const downloadApk = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/user/move/apk-link`)
  return data
}


