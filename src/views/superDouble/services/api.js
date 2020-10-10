import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const SHOP_API_BASE_URL = '//shop-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/activity-info`)
  const data = { 'code': 200, 'data': { 'state': 1, 'beginDate': '2020-06-12 10:56:29', 'endDate': '2020-06-29 23:59:59', 'timeline': '2020年6月12日-2020年6月29日', 'countdown': 877271427, 'totalNum': 1, 'curStage': 1, 'stageConfigList': [{ 'stage': 1, 'consumeNum': 2, 'round': 1, 'betNum': 0 }, { 'stage': 2, 'consumeNum': 50, 'round': 1, 'betNum': 0 }, { 'stage': 3, 'consumeNum': 500, 'round': 1, 'betNum': 0 }], 'awardsConfigList': [{ 'level': 1, 'cost': 2, 'name': '0.8元话费券', 'desc': 'hfq', 'img': '/group1/M00/42/7B/CmcEHF7on3qAXlC9AABNgqhsR5A374.png' }, { 'level': 2, 'cost': 25, 'name': '10元话费券', 'desc': 'hfq', 'img': '/group1/M00/42/7B/CmcEHF7on3qAXlC9AABNgqhsR5A374.png' }, { 'level': 3, 'cost': 125, 'name': '50元话费券', 'desc': 'hfq', 'img': '/group1/M00/42/7B/CmcEHF7on3qAXlC9AABNgqhsR5A374.png' }, { 'level': 4, 'cost': 250, 'name': '100元京东卡', 'desc': 'jdk', 'img': '/group1/M00/42/7B/CmcEHF7on6uAUTBaAABqXZrSWqg605.png' }, { 'level': 5, 'cost': 1250, 'name': '500元京东卡', 'desc': 'jdk', 'img': '/group1/M00/42/7B/CmcEHF7on6uAUTBaAABqXZrSWqg605.png' }, { 'level': 6, 'cost': 125, 'name': '50000金叶子', 'desc': 'jyz', 'img': '/group1/M00/42/7B/CmcEHF7onzmAF5s3AABflsuCfp0935.png' }, { 'level': 7, 'cost': 13800, 'name': 'iPhone11 64G', 'desc': 'sw', 'img': '/group1/M00/42/7B/CmcEHF7on9KAFjWhAAB7Coa8CZg777.png' }] }, 'message': null }
  return data
}
/**
 * @description 跑马灯
 * @return {Object} data
 */

export const noticeList = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/notice-list`)
  const data = { 'code': 200, 'data': [{ 'userId': 10010740, 'nickname': '166****00', 'awardsName': '8糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '8糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '8糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '8糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '8糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010740, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010782, 'nickname': '166****00', 'awardsName': '4糖豆' }, { 'userId': 10010782, 'nickname': '166****00', 'awardsName': '8糖豆' }, { 'userId': 10010782, 'nickname': '166****00', 'awardsName': '100糖豆' }, { 'userId': 10010782, 'nickname': '166****00', 'awardsName': '1000糖豆' }, { 'userId': 10010782, 'nickname': '166****00', 'awardsName': '4糖豆' }], 'message': null }
  return data
}

/**
 * @description 兑换
 * @param {Number} level 糖豆数量
 * @return {Object} data
 */
export const exchange = async (level) => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/exchange/${level}`)
  const data = { 'code': 200, 'data': { 'awardsType': 'hfq', 'awardsName': '0.8元话费券', 'totalNum': 1251, 'img': '/group1/M00/42/7B/CmcEHF7on3qAXlC9AABNgqhsR5A374.png' }, 'message': null }
  return data
}

/**
 * @description 累消/每日累充领取奖励
 * @param {Number} type 类型 1-游戏累消，2-每日累充
 * @param {Number} sort 序号
 * @return {Object} data
 */
export const gameReceive = async ({ type, sort }) => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/game-receive/${type}/${sort}`)
  const data = { 'code': 200, 'data': 1, 'message': null }
  return data
}

/**
 * @description 翻倍抽奖
 * @param {Number} stage 阶段 1=初级 2=中级 3=高级
 * @return {Object} data
 */
export const lot = async (stage) => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/lot/${stage}`)
  const data = { 'code': 200, 'data': { 'totalNum': 0, 'awardNum': 4, 'round': 2, 'flag': true }, 'message': null }
  return data
}

/**
 * @description 用户信息
 * @return {Object} data
 */
export const myRank = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/my-rank`)
  const data = { 'code': 200, 'data': { 'popup': false, 'myRank': 1, 'awardsList': [{ awardsName: '10元话费券', awardsType: 'hfq' }] }, 'message': null }
  return data
}
/**
 * @description 退出翻倍
 * @param {Number} stage 阶段 1=初级 2=中级 3=高级
 * @return {Object} data
 */
export const quit = async (stage) => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/quit/${stage}`)
  const data = { 'code': 200, 'data': { 'totalNum': 6, 'awardNum': 4, 'round': 1, 'flag': false }, 'message': null }
  return data
}

/**
 * @description 排行榜列表
 * @return {Object} data
 */
export const rankList = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/rank-list`)
  const data = { 'code': 200, 'data': { 'myRank': 5, 'totalNum': 2, 'currentAwards': '1500元京东卡+50万金叶子', 'rankList': [{ 'rank': 1, 'userId': 2000, 'nickname': '陆江', 'totalNum': 22470, 'awardsName': '20000元京东卡+1500万金叶子', 'profilePhoto': null, 'updateTime': '6/19 10:28:14' }, { 'rank': 2, 'userId': 99, 'nickname': '李清', 'totalNum': 18900, 'awardsName': '15000元京东卡+500万金叶子', 'profilePhoto': null, 'updateTime': '6/12 17:47:18' }, { 'rank': 3, 'userId': 10010740, 'nickname': '166****0002', 'totalNum': 1240, 'awardsName': '8000元京东卡+200万金叶子', 'profilePhoto': null, 'updateTime': '6/19 20:05:07' }, { 'rank': 4, 'userId': 10010782, 'nickname': '166****0003', 'totalNum': 590, 'awardsName': '1500元京东卡+50万金叶子', 'profilePhoto': null, 'updateTime': '6/19 16:40:25' }, { 'rank': 5, 'userId': 10010671, 'nickname': '166****0001', 'totalNum': 2, 'awardsName': '1500元京东卡+50万金叶子', 'profilePhoto': null, 'updateTime': '6/19 20:19:57' }] }, 'message': null }
  return data
}

/**
 * @description 任务领取奖励
 * @param {Number} type 类型 1-游戏累消，2-每日累充
 * @return {Object} data
 */
export const taskReceive = async (type) => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/task-receive/${type}`)
  const data = { 'code': 200, 'data': { 'awardsType': 'hfq', 'awardsName': '0.8元话费券', 'totalNum': 4, 'img': '/group1/M00/42/7B/CmcEHF7on3qAXlC9AABNgqhsR5A374.png' }, 'message': null }
  return data
}

/**
 * @description 用户奖励
 * @return {Object} data
 */
export const userAwards = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/user-awards`)
  const data = { 'code': 200, 'data': [{ 'awardsName': '0.8元话费券', 'createTime': '06-19 20:22', 'source': '欢乐兑换专区' }], 'message': null }
  return data
}

/**
 * @description 用户进度
 * @return {Object} data
 */
export const userProgress = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/happy/beans/user-progress`)
  const data = { 'code': 200, 'data': { 'taskProgress': [{ 'state': 1, 'totalNum': 10, 'finishNum': 10, 'idx': 2 }, { 'state': 1, 'totalNum': 10, 'finishNum': 10, 'idx': 3 }], 'gameProgress': { 'gameBetting': 120000000, 'receiveNum': 1, 'progressList': [{ 'sort': 1, 'amount': 200000, 'awards': 1, 'status': 2 }, { 'sort': 2, 'amount': 500000, 'awards': 2, 'status': 1 }, { 'sort': 3, 'amount': 1000000, 'awards': 5, 'status': 1 }, { 'sort': 4, 'amount': 3000000, 'awards': 15, 'status': 1 }, { 'sort': 5, 'amount': 5000000, 'awards': 25, 'status': 1 }, { 'sort': 6, 'amount': 10000000, 'awards': 60, 'status': 1 }, { 'sort': 7, 'amount': 30000000, 'awards': 180, 'status': 1 }, { 'sort': 8, 'amount': 40000000, 'awards': 300, 'status': 1 }, { 'sort': 9, 'amount': 100000000, 'awards': 650, 'status': 1 }, { 'sort': 10, 'amount': 300000000, 'awards': 1950, 'status': 0 }, { 'sort': 11, 'amount': 500000000, 'awards': 3250, 'status': 0 }, { 'sort': 12, 'amount': 1000000000, 'awards': 7000, 'status': 0 }, { 'sort': 13, 'amount': 1500000000, 'awards': 10500, 'status': 0 }, { 'sort': 14, 'amount': 2500000000, 'awards': 17500, 'status': 0 }, { 'sort': 15, 'amount': 3500000000, 'awards': 28000, 'status': 0 }, { 'sort': 16, 'amount': 4500000000, 'awards': 36000, 'status': 0 }] }, 'rechargeProgress': { 'gameBetting': 0, 'receiveNum': 0, 'progressList': [{ 'sort': 1, 'amount': 50, 'awards': 3, 'status': 0 }, { 'sort': 2, 'amount': 100, 'awards': 3, 'status': 0 }, { 'sort': 3, 'amount': 200, 'awards': 4, 'status': 0 }, { 'sort': 4, 'amount': 500, 'awards': 10, 'status': 0 }, { 'sort': 5, 'amount': 800, 'awards': 25, 'status': 0 }, { 'sort': 6, 'amount': 1000, 'awards': 25, 'status': 0 }, { 'sort': 7, 'amount': 2000, 'awards': 50, 'status': 0 }, { 'sort': 8, 'amount': 3000, 'awards': 80, 'status': 0 }, { 'sort': 9, 'amount': 5000, 'awards': 100, 'status': 0 }, { 'sort': 10, 'amount': 8000, 'awards': 200, 'status': 0 }, { 'sort': 11, 'amount': 10000, 'awards': 200, 'status': 0 }, { 'sort': 12, 'amount': 12000, 'awards': 200, 'status': 0 }, { 'sort': 13, 'amount': 15000, 'awards': 300, 'status': 0 }, { 'sort': 14, 'amount': 18000, 'awards': 300, 'status': 0 }, { 'sort': 15, 'amount': 20000, 'awards': 300, 'status': 0 }] } }, 'message': null }
  return data
}

/**
 * @description 礼包
 * @return {Object} data
 */

export const showLeaguePacksList = async () => {
  const { data } = await $axios.post(`${SHOP_API_BASE_URL}/shop/api/mall/getMallProductListByType/260`)
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
  showLeaguePacksList
}
export default Service
