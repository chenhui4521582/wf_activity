import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/activity-info')
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const getNoticeList = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/notice-list')
  return data
}
/**
 * @description 礼包数据
 * @return {Object} data
 */
export const showLeaguePacksList = async (id) => {
  const {data} = await $axios.post('//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/253/' + id)
  return data
}
/**
 * @description 个人榜列表
 * @return {Object} data
 */
export const getRankListPersonal = async (isToday) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/qixi/personal-rank/${isToday ? 'today' : 'yesterday'}`)
  return data
}
/**
 * @description 往期团队榜
 * @return {Object} data
 */
export const getHistoryRankList = async (params) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/team-rank/history', params)
  return data
}
/**
 * @description 奖励记录
 * @return {Object} data
 */
export const getAwardsRecord = async (isTeam) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/qixi/${isTeam ? 'team-rank' : 'personal-rank'}/my-awards`)
  return data
}
/**
 * @description 领奖
 * @return {Object} data
 */
export const gainAwardsRecord = async (isTeam, id) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/qixi/${isTeam ? 'team-rank' : 'personal-rank'}/receive-awards/` + id)
  return data
}
/**
 * @description 入队
 * @return {Object} data
 */
export const applyTeam = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/apply')
  return data
}
/**
 * @description 活动动态数值
 * @return {Object} data
 */
export const getDynamic = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/activity-dynamic')
  return data
}
/**
 * @description 当前团队榜
 * @return {Object} data
 */
export const getCurrentTeamRank = async (team) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/qixi/team-rank/current/' + team)
  return data
}
