import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const PLATFORM_API_BASE_URL = '//platform-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/upgrade-wheel/activity-info`)
  // const data = { 'code': 200, 'data': { 'state': 1, 'beginDate': '2020-04-20 00:00:00', 'endDate': '2020-05-10 23:59:59', 'countdown': 1181939234, 'convertConsumeRmb': 10.0, 'wheelImage': '/group1/M00/43/4F/CmcEHV6yKPGABd0kAAIH-oeS0E0721.png', 'wheelConfigList': [{ 'sort': 1, 'awardsName': '话费红包*300', 'awardsNum': 300 }, { 'sort': 2, 'awardsName': '话费红包*100', 'awardsNum': 100 }, { 'sort': 3, 'awardsName': '话费红包*5000', 'awardsNum': 5000 }, { 'sort': 4, 'awardsName': '话费红包*80', 'awardsNum': 80 }, { 'sort': 5, 'awardsName': '话费红包*50', 'awardsNum': 50 }, { 'sort': 6, 'awardsName': '话费红包*7', 'awardsNum': 7 }, { 'sort': 7, 'awardsName': '话费红包*5', 'awardsNum': 5 }, { 'sort': 8, 'awardsName': '话费红包*3', 'awardsNum': 3 }], 'newUser': true, 'newUserInfo': { 'needRetain': true, 'betTimes': 1001, 'incrBetTimes': 0, 'envelopeNum': 0, 'envelopeRmb': 0.0, 'convertEndDate': '2020-05-20 10:53:53' }, 'oldUserInfo': null }, 'message': null }
  return data
}
/**
 * @description 抽奖
 * @return {Object} data
 */
export const bet = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/upgrade-wheel/bet`)
  // const data = {
  //   'code': 200,
  //   'data': {
  //     'awardsEnvelopeNum': 0,
  //     'awardsEnvelopeRmb': 0,
  //     'awardsSort': 1,
  //     'betTimes': 0,
  //     'envelopeNum': 0,
  //     'envelopeRmb': 0
  //   },
  //   'message': 'string'
  // }
  return data
}
/**
 * @description 提取
 * @return {Object} data
 */
export const convert = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/upgrade-wheel/convert`)
  return data
}
/**
 * @description 话费红包记录
 * @return {Object} data
 */
export const envelopeRecord = async (businessType) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/upgrade-wheel/envelope-record/${businessType}`)
  return data
}
/**
 * @description 挽留
 * @return {Object} data
 */
export const setRetainPopup = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/upgrade-wheel/set-retain-popup`)
  return data
}
/**
 * @description 拉新 幸运转盘活动信息
 * @return {Object} data
 */
export const taskInfo = async () => {
  const { data } = await $axios.post(`${PLATFORM_API_BASE_URL}/task/api/activity/upgrade-wheel/task/info`)
  // const data = { 'code': 200, 'data': [{ 'taskId': 1163, 'taskName': '进入一次游戏大厅', 'gameType': 0, 'taskDesc': '进入一次游戏大厅幸运大转盘拉新-1次转盘机会', 'icon': 'https://file.beeplaying.com/group1/M00/43/4D/CmcEHV6nm52AFv0bAAGMJuRHJK8725.png', 'taskOps': 1, 'finishNum': 0, 'taskStatus': 1, 'taskLogId': null, 'cycle': 1, 'awardsType': 28, 'awardsName': '幸运大转盘拉新-1次转盘机会', 'url': null, 'awardsImage': '', 'showAwardsImage': '', 'taskDescShow': '进入一次游戏大厅', 'awardsNum': 1, 'taskType': 1, 'subTask': null, 'preTask': null, 'startDate': '04月28日', 'endDate': '12月31日', 'action': 94, 'sort': 1, 'totakTaskNum': null, 'hasFinishedTask': null, 'taskDescImg': '/group1/M00/43/4D/CmcEHV6nm6CAPSUMAAGMJuRHJK8936.png' }, { 'taskId': 1164, 'taskName': '查看一次游戏大厅领奖页面', 'gameType': 0, 'taskDesc': '查看一次游戏大厅领奖页面幸运大转盘拉新-1次转盘机会', 'icon': 'https://file.beeplaying.com/group1/M00/42/66/CmcEHF6nnEaAKA81AAGMJuRHJK8186.png', 'taskOps': 1, 'finishNum': 0, 'taskStatus': 1, 'taskLogId': null, 'cycle': 1, 'awardsType': 28, 'awardsName': '幸运大转盘拉新-1次转盘机会', 'url': null, 'awardsImage': '', 'showAwardsImage': '', 'taskDescShow': '查看一次游戏大厅领奖页面', 'awardsNum': 1, 'taskType': 1, 'subTask': null, 'preTask': null, 'startDate': '04月28日', 'endDate': '12月31日', 'action': 94, 'sort': 2, 'totakTaskNum': null, 'hasFinishedTask': null, 'taskDescImg': '/group1/M00/42/66/CmcEHF6nnEiAVycKAAGMJuRHJK8107.png' }, { 'taskId': 1165, 'taskName': '查看一次游戏大厅我的资产', 'gameType': 0, 'taskDesc': '查看一次游戏大厅领奖页面幸运大转盘拉新-1次转盘机会', 'icon': 'https://file.beeplaying.com/group1/M00/43/4D/CmcEHV6nn8uAL9BEAAGMJuRHJK8520.png', 'taskOps': 1, 'finishNum': 0, 'taskStatus': 1, 'taskLogId': null, 'cycle': 1, 'awardsType': 28, 'awardsName': '幸运大转盘拉新-1次转盘机会', 'url': null, 'awardsImage': '', 'showAwardsImage': '', 'taskDescShow': '查看一次游戏大厅领奖页面', 'awardsNum': 1, 'taskType': 1, 'subTask': null, 'preTask': null, 'startDate': '04月28日', 'endDate': '12月31日', 'action': 94, 'sort': 3, 'totakTaskNum': null, 'hasFinishedTask': null, 'taskDescImg': '/group1/M00/43/4D/CmcEHV6nn86AK9RwAAGMJuRHJK8913.png' }, { 'taskId': 1166, 'taskName': '查看一次游戏大厅我的任务', 'gameType': 0, 'taskDesc': '查看一次游戏大厅我的任务幸运大转盘拉新-1次转盘机会', 'icon': 'https://file.beeplaying.com/group1/M00/42/66/CmcEHF6noCCAH408AAGMJuRHJK8590.png', 'taskOps': 1, 'finishNum': 0, 'taskStatus': 1, 'taskLogId': null, 'cycle': 1, 'awardsType': 28, 'awardsName': '幸运大转盘拉新-1次转盘机会', 'url': null, 'awardsImage': '', 'showAwardsImage': '', 'taskDescShow': '查看一次游戏大厅我的任务', 'awardsNum': 1, 'taskType': 1, 'subTask': null, 'preTask': null, 'startDate': '04月28日', 'endDate': '12月31日', 'action': 94, 'sort': 4, 'totakTaskNum': null, 'hasFinishedTask': null, 'taskDescImg': '/group1/M00/42/66/CmcEHF6noCOAVZqBAAGMJuRHJK8831.png' }, { 'taskId': 1167, 'taskName': '欢乐台球支持300金叶子', 'gameType': 2, 'taskDesc': '欢乐台球支持300金叶子幸运大转盘拉新-1次转盘机会', 'icon': 'https://file.beeplaying.com/group1/M00/43/4D/CmcEHV6noHOAOb4jAAGMJuRHJK8026.png', 'taskOps': 300, 'finishNum': 0, 'taskStatus': 1, 'taskLogId': null, 'cycle': 1, 'awardsType': 28, 'awardsName': '幸运大转盘拉新-1次转盘机会', 'url': '/billiards/', 'awardsImage': '', 'showAwardsImage': '', 'taskDescShow': '欢乐台球支持300金叶子', 'awardsNum': 1, 'taskType': 1, 'subTask': null, 'preTask': null, 'startDate': '04月28日', 'endDate': '12月31日', 'action': 2, 'sort': 6, 'totakTaskNum': null, 'hasFinishedTask': null, 'taskDescImg': '/group1/M00/43/4D/CmcEHV6noHaAT7TEAAGMJuRHJK8066.png' }, { 'taskId': 1170, 'taskName': '糖果萌消消支持300金叶子', 'gameType': 12, 'taskDesc': '糖果萌消消支持300金叶子幸运大转盘拉新-1次转盘机会', 'icon': 'https://file.beeplaying.com/group1/M00/42/66/CmcEHF6noWeAEbwpAAGMJuRHJK8396.png', 'taskOps': 300, 'finishNum': 0, 'taskStatus': 1, 'taskLogId': null, 'cycle': 1, 'awardsType': 28, 'awardsName': '幸运大转盘拉新-1次转盘机会', 'url': '/crush/', 'awardsImage': '', 'showAwardsImage': '', 'taskDescShow': '糖果萌消消支持300金叶子', 'awardsNum': 1, 'taskType': 1, 'subTask': null, 'preTask': null, 'startDate': '04月28日', 'endDate': '12月31日', 'action': 2, 'sort': 7, 'totakTaskNum': null, 'hasFinishedTask': null, 'taskDescImg': '/group1/M00/42/66/CmcEHF6noWqAJrYwAAGMJuRHJK8086.png' }], 'message': null }
  return data
}
const Service = {
  activityInfo,
  bet,
  convert,
  envelopeRecord,
  setRetainPopup,
  taskInfo
}
export default Service
