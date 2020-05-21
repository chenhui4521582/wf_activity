import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'
// const test = 'http://rap2.taobao.org:38080/app/mock/254384'

/**
 * @description 活动信息 1
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/activity-info`)
  return data
}

/**
 * @description 礼包 1
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/243`)
  return data
}

/**
 * @description 用户进度 1
 * @return {Object} data
 */
export const userProgress = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/user-progress`)
  return data
}

/**
 * @description 排行榜列表 1
 * @return {Object} data
 */
export const rankList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/rank-list`)
  return data
}

/**
 * @description 用户攻略和奖励 1
 * @return {Object} data
 */
export const betAwards = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/bet-awards`)
  return data
}

/**
 * @description 用户奖励列表 1
 * @return {Object} data
 */
export const getAwardLog = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/user-awards`)
  return data
}

/**
 * @description 用户完成任务 1
 * @return {Object} data
 */
export const taskFinish = async (type) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/task-receive/${type}`)
  return data
}

/**
 * @description 累消领取奖励
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/game-receive/${sort}`)
  return data
}

/**
 * @description 刮卡
 * @return {Object} data
 */
export const getScratch = async (params) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/lot/${params.stage}/${params.times}`)
  return data
}

/**
 * @description 用户排名
 * @return {Object} data
 */
export const userRanking = async (params) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/scratch-card/my-rank`)
  return data
}

const Service = {
  // 活动信息
  activityInfo,
  rankList,
  userProgress,
  showLeaguePacksList,
  betAwards,
  getAwardLog,
  taskFinish,
  gameReceive,
  getScratch,
  userRanking
}
export default Service
