import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityHome = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/super-task/activityHome`)
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

const Service = {
  activityHome,
  findTaskRspByGameType,
  gameReceive,
  taskReceive
}
export default Service
