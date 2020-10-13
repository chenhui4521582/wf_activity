import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/activity-info`)
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/notice-list`)
  return data
}

/**
 * @description 兑换
 * @param {Number} level 糖豆数量
 * @return {Object} data
 */
export const exchange = async (level) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/exchange/${level}`)
  return data
}

/**
 * @description 累消/每日累充领取奖励
 * @param {Number} type 类型 1-游戏累消，2-每日累充
 * @param {Number} sort 序号
 * @return {Object} data
 */
export const gameReceive = async ({ sort }) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/game-receive/${sort}`)
  return data
}

/**
 * @description 翻倍抽奖
 * @param {Number} stage 阶段 1=初级 2=中级 3=高级
 * @return {Object} data
 */
export const lot = async (stage) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/lot/${stage}`)
  return data
}

/**
 * @description 用户信息
 * @return {Object} data
 */
export const myRank = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/my-rank`)
  return data
}
/**
 * @description 退出翻倍
 * @param {Number} stage 阶段 1=初级 2=中级 3=高级
 * @return {Object} data
 */
export const quit = async (stage) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/quit/${stage}`)
  return data
}

/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/rank-list`)
  return data
}

/**
 * @description 任务领取奖励
 * @param {Number} type 类型 1-游戏累消，2-每日累充
 * @return {Object} data
 */
export const taskReceive = async (type) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/task-receive/${type}`)
  return data
}

/**
 * @description 用户奖励
 * @return {Object} data
 */
export const userAwards = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/user-awards`)
  return data
}

/**
 * @description 用户进度
 * @return {Object} data
 */
export const userProgress = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/user-progress`)
  return data
}
/**
 * @description 礼包数据
 * @return {Object} data
 */
export const getPackages = async (flag) => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/${flag}`)
  return data
}
const Service = {
  activityInfo,
  noticeList,
  exchange,
  gameReceive,
  lot,
  myRank,
  quit,
  rankList,
  taskReceive,
  userAwards,
  userProgress,
  getPackages
}
export default Service
