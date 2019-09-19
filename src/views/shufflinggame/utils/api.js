import $axios from '../http'
/**
 * @description 投注奖励
 * @return {Object} data
 */

export const betAwards = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/bet-awards')
  return data
}
/**
 * @description 单次投注
 * @param {Number} value sort
0000000000000000000000000000 * @return {Object} data
 */

export const betSingle = async (params) => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/bet', params)
  return data
}
/**
 * @description 投注进度
 * @return {Object} data
 */

export const betProgress = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/bet-progress')
  return data
}
/**
 * @description 游戏累消进度
 * @return {Object} data
 */

export const gameProgress = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/game-progress')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/notice-list')
  return data
}
/**
 * @description 排行榜列表
 * @return {Object} data
 */

export const rankList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/rank-list')
  return data
}
/**
 * @description 用户信息
 * @return {Object} data
 */

export const userInfo = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/user-info')
  return data
}

/**
 * @description 礼包
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const { data } = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/opencard')
  return data
}
/**
 * @description 用户排名
 * @return {Object} data
 */

export const userRanking = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/user-info')
  return data
}
/**
 * @description 领取礼包
 * @return {Object} data
 */

export const gameReceive = async (params) => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/game-receive',params)
  return data
}
/**
 * @description 领取记录
 * @return {Object} data
 */

export const gameReceiveRecord = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/user-receive-record')
  return data
}

/**
 * @description 升级场次
 * @return {Object} data
 */

export const gameUpgradeStage = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/upgrade-stage')
  return data
}

/**
 * @description 升级场次
 * @return {Object} data
 */

export const gameResetProgress = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/bet-progress-reset')
  return data
}

