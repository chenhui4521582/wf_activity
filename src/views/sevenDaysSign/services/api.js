import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'
const TRANS_API_BASE_URL = '//trans-api.beeplaying.com'
/**
 * @description 活动入口
 * @return {Object} data
 */
export const moveInleto = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/clockin/inlet`)
  return data
}
/**
 * @description 活动开关
 * @return {Object} data
 */
export const moveInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/clockin/activityHome`)
  return data
}
/**
 * @description 用户签到
 * @return {Object} data
 */
export const signIn = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/clockin/clockIn`)
  return data
}

/**
 * @description 用户奖励列表
 * @return {Object} data
 */
export const getUserAwards = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/clockin/userAwards`)
  return data
}

/**
 * @description 抽奖
 * @return {Object} data
 */
export const drawPrize = async (sourceType, sourceId) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/clockin/draw/${sourceType}/${sourceId}`)
  return data
}

/**
 * @description 转盘奖励
 * @return {Object} data
 */
export const getWheelAwards = async () => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/clockin/wheelAwards`)
  return data
}
