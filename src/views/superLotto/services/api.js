import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/activity-info`)
  return data
}
/**
 * @description 新增号码组
 * @return {Object} data
 */
export const addNumGroup = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/add-num-group`)
  return data
}
/**
 * @description 累消领取奖励
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/game-receive/${sort}`)
  return data
}
/**
 * @description 编辑用户号码
 * @return {Object} data
 */
export const modifyNumGroup = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/modify-num-group`)
  return data
}
/**
 * @description 用户信息
 * @return {Object} data
 */
export const myRank = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/my-rank`)
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/rank-list`)
  return data
}
/**
 * @description 任务领取奖励（类型 1=每日任务 2=累充任务）
 * @return {Object} data
 */
export const taskReceive = async (type) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/task-receive/${type}`)
  return data
}
/**
 * @description 用户上期奖励信息
 * @return {Object} data
 */
export const userAwardInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-award-info`)
  return data
}
/**
 * @description 用户上期奖励号码
 * @return {Object} data
 */
export const userAwardNums = async (awardGrade, page) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-award-nums/${awardGrade}/${page}`)
  return data
}
/**
 * @description 用户号码组信息
 * @return {Object} data
 */
export const userNumGroups = async (page) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-num-groups/${page}`)
  return data
}
/**
 * @description 排行榜奖励提示
 * @return {Object} data
 */
export const userAwardsTips = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-awards-tips`)
  return data
}
/**
 * @description 用户号码信息
 * @return {Object} data
 */
export const userNumInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-num-info`)
  return data
}
/**
 * @description 用户进度
 * @return {Object} data
 */
export const userProgress = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/user-progress`)
  return data
}

const Service = {
  activityInfo,
  addNumGroup,
  gameReceive,
  modifyNumGroup,
  myRank,
  rankList,
  taskReceive,
  userAwardInfo,
  userAwardNums,
  userNumGroups,
  userAwardsTips,
  userNumInfo,
  userProgress
}
export default Service
