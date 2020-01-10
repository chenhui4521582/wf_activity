import $axios from '../../eggs/http'
import axios from "../../slotMachine0101/http";

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/activity-info')
  return data
}

/**
 * @description 投注奖励
 * @return {Object} data
 */

export const betAwards = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/bet-awards')
  return data
}
/**
 * @description 单次投注
 * @param {Number} value sort
 * @return {Object} data
 */

export const betSingle = async (params) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/bet-single', params)
  return data
}
/**
 * @description 批量投注
 * @param {Number} value awardsLev
 * @return {Object} data
 */

export const betBatch = async (params) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/bet-batch', params)
  return data
}
/**
 * @description 投注进度
 * @return {Object} data
 */

export const betProgress = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/bet-progress')
  return data
}
/**
 * @description 游戏累消进度
 * @return {Object} data
 */

export const gameProgress = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/game-progress')
  return data
}
/**
 * @description 我的奖品
 * @return {Object} data
 */

export const myAwards = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/my-awards')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/notice-list')
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */

export const rankList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/rank-list')
  return data
}
/**
 * @description 用户新增锤子数
 * @return {Object} data
 */
export const userIncrement = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/user-increment')
  return data
}
/**
 * @description 用户信息
 * @return {Object} data
 */

export const userInfo = async () => {
  const {data} = await $axios.post('//trans-api.beeplaying.com/trans/api/trans/accountInfo')
  return data
}

/**
 * @description 礼包
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/lantern')
  return data
}
/**
 * @description 用户排名
 * @return {Object} data
 */

export const userRanking = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/user-ranking')
  return data
}
/**
 * @description 获取用户是否需要新手引导
 * @return {Object} data
 */

export const activityGuide = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/plant-food-v2/activity-guide')
  return data
}
export const gameReceive = async (sort) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/game-receive/' + sort)
  return data
}
export const taskProgressInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/activity-detail-info',)
  return data
}
export const taskReceive = async (params) => {
  const {data} = await $axios.post("//ops-api.beeplaying.com/ops/api/lantern/task-receive/" + params.sort)
  return data
}
/**
 * @description 领取记录
 * @return {Object} data
 */

export const gameReceiveRecord = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/user-coupon-awards')
  return data
}

/**
 * @description 奖励提示
 * @return {Object} data
 */

export const userAwardsTips = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/user-awards-tips')
  return data
}

/**
 * @description 瓜分券奖励领取
 * @return {Object} data
 */

export const couponAwardReceive = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/lantern/coupon-award-receive')
  return data
}
