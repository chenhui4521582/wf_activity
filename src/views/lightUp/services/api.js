import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bulb/activity-info`)
  return data
}

/**
 * @description 一键领取
 * @param {Number} level
 * @return {Object} data
 */
export const receiveAll = async (level) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bulb/receive-all/${level}`)
  return data
}

/**
 * @description 领取累消
 * @param {Number} level
 * @param {Number} sort
 * @return {Object} data
 */
export const receive = async ({ level, sort }) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bulb/receive/${level}/${sort}`)
  return data
}

/**
 * @description 我的奖品
 * @return {Object} data
 */
export const userAwards = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bulb/user-awards`)
  return data
}

/**
 * @description 我的排名
 * @return {Object} data
 */
export const myRank = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bulb/my-rank`)
  return data
}

/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/bulb/rank-list`)
  return data
}

const Service = {
  // 活动信息
  activityInfo,
  // 一键领取
  receiveAll,
  // 领取累消
  receive,
  // 我的奖品
  userAwards,
  // 我的排名
  myRank,
  // 排行榜列表
  rankList
}
export default Service
