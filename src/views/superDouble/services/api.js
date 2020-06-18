import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/activity-info`)
  const data = { 'code': 200, 'data': { 'state': 1, 'beginDate': '2020-06-12 10:56:29', 'endDate': '2020-06-29 23:59:59', 'timeline': '2020年6月12日-2020年6月29日', 'countdown': 1139159510, 'totalNum': 0, 'curStage': 1, 'stageConfigList': [{ 'stage': 1, 'consumeNum': 2, 'round': 1, 'betNum': 0 }, { 'stage': 2, 'consumeNum': 50, 'round': 1, 'betNum': 0 }, { 'stage': 3, 'consumeNum': 500, 'round': 1, 'betNum': 0 }], 'awardsConfigList': [{ 'level': 1, 'cost': 2, 'name': '0.8元话费券', 'desc': 'hfq', 'img': '/group1/M00/42/7B/CmcEHF7onzmAF5s3AABflsuCfp0935.png' }, { 'level': 2, 'cost': 25, 'name': '10元话费券', 'desc': 'hfq', 'img': '/group1/M00/42/7B/CmcEHF7onzmAF5s3AABflsuCfp0935.png' }, { 'level': 3, 'cost': 125, 'name': '50元话费券', 'desc': 'hfq', 'img': '/group1/M00/42/7B/CmcEHF7onzmAF5s3AABflsuCfp0935.png' }, { 'level': 4, 'cost': 250, 'name': '100元京东卡', 'desc': 'jdk', 'img': '/group1/M00/42/7B/CmcEHF7on6uAUTBaAABqXZrSWqg605.png' }, { 'level': 5, 'cost': 1250, 'name': '500元京东卡', 'desc': 'jdk', 'img': '/group1/M00/42/7B/CmcEHF7on6uAUTBaAABqXZrSWqg605.png' }, { 'level': 6, 'cost': 125, 'name': '50000金叶子', 'desc': 'jyz', 'img': '/group1/M00/42/7B/CmcEHF7onzmAF5s3AABflsuCfp0935.png' }, { 'level': 7, 'cost': 13800, 'name': 'iPhone11 64G', 'desc': 'sw', 'img': '/group1/M00/42/7B/CmcEHF7on9KAFjWhAAB7Coa8CZg777.png' }] }, 'message': null }
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/notice-list`)
  const data = { 'code': 200, 'data': [{ 'userId': 2000, 'nickname': '陆江', 'awardsName': '4000糖豆' }], 'message': null }
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
export const gameReceive = async ({ type, sort }) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/game-receive/${type}/${sort}`)
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
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/my-rank`)
  const data = { 'code': 200, 'data': { 'popup': false, 'myRank': 0, 'awardsList': [] }, 'message': null }
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
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/rank-list`)
  const data = { 'code': 200, 'data': { 'myRank': 0, 'totalNum': 0, 'currentAwards': '无', 'rankList': [{ 'rank': 1, 'userId': 2000, 'nickname': '陆江', 'totalNum': 22400, 'awardsName': '20000元京东卡+1500万金叶子', 'profilePhoto': null, 'updateTime': '6/16 11:01:06' }, { 'rank': 2, 'userId': 99, 'nickname': '李清', 'totalNum': 18900, 'awardsName': '15000元京东卡+500万金叶子', 'profilePhoto': null, 'updateTime': '6/12 17:47:18' }, { 'rank': 3, 'userId': 99, 'nickname': '李清', 'totalNum': 18900, 'awardsName': '15000元京东卡+500万金叶子', 'profilePhoto': null, 'updateTime': '6/12 17:47:18' }, { 'rank': 4, 'userId': 99, 'nickname': '李清', 'totalNum': 18900, 'awardsName': '15000元京东卡+500万金叶子', 'profilePhoto': null, 'updateTime': '6/12 17:47:18' }, { 'rank': 5, 'userId': 99, 'nickname': '李清', 'totalNum': 18900, 'awardsName': '15000元京东卡+500万金叶子', 'profilePhoto': null, 'updateTime': '6/12 17:47:18' }, { 'rank': 6, 'userId': 99, 'nickname': '李清', 'totalNum': 18900, 'awardsName': '15000元京东卡+500万金叶子', 'profilePhoto': null, 'updateTime': '6/12 17:47:18' }] }, 'message': null }
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
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/user-awards`)
  const data = { 'code': 200, 'data': [{ 'awardsName': '50000颗糖豆', 'createTime': '6月17日', 'source': '欢乐兑换专区' }, { 'awardsName': 'iPhone11 64G', 'createTime': '6月17日', 'source': '欢乐兑换专区' }], 'message': 'string' }
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
  userProgress
}
export default Service
