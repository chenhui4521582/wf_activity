import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityHome = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/gold-race/activity-info`)
  return data
}

/**
 * @description 根据游戏获取任务
 * @param {Number} gameType
 * @return {Object} data
 */
export const findTaskRspByGameType = async (gameType) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/super-task/findTaskRspByGameType/${gameType}`)
  return data
}
/**
 * @description 领取累消奖励
 * @return {Object} data
 */
export const gameReceive = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/super-task/game-receive`)
  return data
}

/**
 * @description 领取任务奖励
 * @param {Number,Number} {gameType,taskId}
 * @return {Object} data
 */
export const taskReceive = async ({ gameType, taskId }) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/super-task/taskReceive/${gameType}/${taskId}`)
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */

export const rankList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/rank-list')
  return data
}
/**
 * @description 礼包数据
 * @return {Object} data
 */
export const showLeaguePacksList = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/263')
  return data
}
/**
 * @description 赛段信息
 * @return {Object} data
 */
export const getLevelInfo = async (level) => {
  const {data} = await $axios.post(`${OPS_API_BASE_URL}/ops/api/gold-race/level-info/${level}`)
  return data
}
/**
 * @description 奖励记录 businessType:1=进度奖励 2=排行奖励
 * @return {Object} data
 */
export const getAwardsRecord = async (businessType) => {
  const {data} = await $axios.post(`${OPS_API_BASE_URL}/ops/api/gold-race/my-awards/${businessType}`)
  return data
}
/**
 * @description 领奖
 * @return {Object} data
 */
export const gainAwardsRecord = async (id) => {
  const {data} = await $axios.post(`${OPS_API_BASE_URL}/ops/api/gold-race/receive-awards/${id}`)
  return data
}
/**
 * @description 上期排行数据
 * @return {Object} data
 */
export const getHistoryRankList = async (level) => {
  const {data} = await $axios.post(`${OPS_API_BASE_URL}/ops/api/gold-race/rank-list/history/${level}`)
  return data
}
const Service = {
  activityHome,
  findTaskRspByGameType,
  gameReceive,
  taskReceive,
  rankList,
  showLeaguePacksList,
  getLevelInfo,
  getAwardsRecord,
  gainAwardsRecord,
  getHistoryRankList
}
export default Service
