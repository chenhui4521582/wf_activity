import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/mid-autumn/activity-info')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/mid-autumn/notice-list')
  return data
}
/**
 * @description 礼包数据
 * @return {Object} data
 */
export const showLeaguePacksList = async (id) => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/258/' + id)
  return data
}
/**
 * @description 排行榜
 * @return {Object} data
 */
export const getRankList = async (flag) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/mid-autumn/rank-list/${flag}`)
  return data
}
/**
 * @description 往期团队榜
 * @return {Object} data
 */
export const getHistoryRankList = async (params) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/mid-autumn/team-rank/history', params)
  return data
}
/**
 * @description 奖励记录
 * @return {Object} data
 */
export const getAwardsRecord = async (businessType) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/mid-autumn/my-awards/${businessType}`)
  return data
}
/**
 * @description 领奖
 * @return {Object} data
 */
export const gainAwardsRecord = async (isTeam, id) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/mid-autumn/${isTeam ? 'team-rank' : 'personal-rank'}/receive-awards/` + id)
  return data
}
/**
 * @description 入队
 * @return {Object} data
 */
export const applyTeam = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/mid-autumn/apply')
  return data
}
/**
 * @description 活动动态数值
 * @return {Object} data
 */
export const getDynamic = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/mid-autumn/jackpot-dynamic')
  return data
}
/**
 * @description 当前团队榜
 * @return {Object} data
 */
export const getCurrentTeamRank = async (team) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/mid-autumn/team-rank/current/' + team)
  return data
}
/**
 * @description 领取奖励
 * @return {Object} data
 */
export const gameReceive = async (businessType,id) => {
  const { data } = await $axios.post(`//ops-api.beeplaying.com/ops/api/mid-autumn/receive-awards/${businessType}/${id}`)
  return data
}
/**
 * @description 领取还愿奖励
 * @return {Object} data
 */
export const gameReceiveAll = async () => {
  const { data } = await $axios.post(`//ops-api.beeplaying.com/ops/api/mid-autumn/receive-timeline-awards`)
  return data
}
