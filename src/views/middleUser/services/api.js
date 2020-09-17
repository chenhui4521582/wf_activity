import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityHome = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/super-task/activityHome`)
  const data = { 'code': 200, 'data': { 'gameRsps': [{ 'gameId': 13, 'name': '三国', 'url': '/group1/M00/43/7F/CmcEHV9YwVWATHuDAAC_Ib0w1dk980.png', 'state': 0, 'hasRedPoint': 0, 'sort': 3, 'startTime': '2020-09-19 00:00:00', 'endTime': '2020-09-21 23:59:59' }, { 'gameId': 10, 'name': '捕鱼', 'url': '/group1/M00/43/7F/CmcEHV9YwVWATHuDAAC_Ib0w1dk980.png', 'state': 1, 'hasRedPoint': 0, 'sort': 2, 'startTime': '2020-09-16 00:00:00', 'endTime': '2020-09-18 23:59:59' }, { 'gameId': 12, 'name': '糖果', 'url': '/group1/M00/43/7F/CmcEHV9YwVWATHuDAAC_Ib0w1dk980.png', 'state': 2, 'hasRedPoint': 0, 'sort': 1, 'startTime': '2020-09-13 00:00:00', 'endTime': '2020-09-15 23:59:59' }], 'progressList': [{ 'sort': 1, 'amount': 50000, 'awards': 5, 'status': 0 }, { 'sort': 2, 'amount': 100000, 'awards': 5, 'status': 0 }, { 'sort': 3, 'amount': 200000, 'awards': 10, 'status': 0 }, { 'sort': 4, 'amount': 500000, 'awards': 20, 'status': 0 }, { 'sort': 5, 'amount': 1000000, 'awards': 50, 'status': 0 }, { 'sort': 6, 'amount': 2000000, 'awards': 100, 'status': 0 }, { 'sort': 7, 'amount': 5000000, 'awards': 200, 'status': 0 }, { 'sort': 8, 'amount': 100000000, 'awards': 500, 'status': 0 }], 'curGameProgress': 0, 'diffNextProgress': 50000, 'taskRsps': [{ 'taskId': 68, 'taskName': '登录游戏*1', 'taskProgress': 1, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 1, 'url': '/fish/', 'group': 1 }, { 'taskId': 69, 'taskName': '登录游戏*2', 'taskProgress': 2, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 2, 'url': '/fish/', 'group': 1 }, { 'taskId': 70, 'taskName': '登录游戏*3', 'taskProgress': 3, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 3, 'url': '/fish/', 'group': 1 }, { 'taskId': 71, 'taskName': '渔场1炮50金叶*20炮', 'taskProgress': 20, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 4, 'url': '/fish/', 'group': 2 }, { 'taskId': 72, 'taskName': '渔场1炮200金叶*5炮', 'taskProgress': 5, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 5, 'url': '/fish/', 'group': 2 }, { 'taskId': 73, 'taskName': '累计支持50000金叶子', 'taskProgress': 50000, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 6, 'url': '/fish/', 'group': 2 }, { 'taskId': 74, 'taskName': '累计支持200000金叶子', 'taskProgress': 200000, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 7, 'url': '/fish/', 'group': 2 }, { 'taskId': 75, 'taskName': '累计游戏炮数*1000', 'taskProgress': 1000, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 8, 'url': '/fish/', 'group': 2 }, { 'taskId': 76, 'taskName': '累计游戏炮数*2000', 'taskProgress': 2000, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 9, 'url': '/fish/', 'group': 2 }, { 'taskId': 77, 'taskName': '在潜龙深渊捕获50只金鲨鱼', 'taskProgress': 50, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 10, 'url': '/fish/', 'group': 3 }, { 'taskId': 78, 'taskName': '召唤1次潜龙深渊聚宝盆', 'taskProgress': 1, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 11, 'url': '/fish/', 'group': 3 }, { 'taskId': 79, 'taskName': '参加捕鱼高级大师赛5次', 'taskProgress': 5, 'userTaskProgress': 0, 'taskStatus': 1, 'awardName': '500金叶子', 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png', 'sort': 12, 'url': '/fish/', 'group': 3 }] }, 'message': null }
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
 * @param {Number} sort
 * @return {Object} data
 */
export const gameReceive = async (sort) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/super-task/game-receive/${sort}`)
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
