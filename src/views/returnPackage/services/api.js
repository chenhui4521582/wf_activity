import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityHome = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/activityHome`)
  const { data } = { data: { 'code': 200, 'data': { 'state': 1, 'endDate': '07月26日 23:59:59', 'userPoints': 1000, 'signInVo': [{ 'day': 1, 'date': null, 'status': 3, 'awardName': '100金叶子', 'curDay': false }, { 'day': 2, 'date': null, 'status': 3, 'awardName': '1000金叶子', 'curDay': false }, { 'day': 3, 'date': null, 'status': 1, 'awardName': '100金叶子', 'curDay': true }, { 'day': 4, 'date': null, 'status': 0, 'awardName': '1000金叶子', 'curDay': false }, { 'day': 5, 'date': null, 'status': 0, 'awardName': '1000金叶子', 'curDay': false }], 'pointVo': [{ 'id': 1, 'points': 10, 'status': 1, 'awardImg': '/group1/M00/42/66/CmcEHF6pUOGAaMaCAAALg0Zwq8c064.png' }, { 'id': 2, 'points': 30, 'status': 1, 'awardImg': '/group1/M00/42/66/CmcEHF6pUOGAaMaCAAALg0Zwq8c064.png' }, { 'id': 3, 'points': 50, 'status': 1, 'awardImg': '/group1/M00/42/66/CmcEHF6pUOGAaMaCAAALg0Zwq8c064.png' }], 'taskVo': [{ 'taskId': 4, 'taskName': '今日累计支持5W金叶志', 'taskProgress': 0, 'userTaskProgress': null, 'taskStatus': 1, 'awardName': '大户召回积分', 'awardImg': '', 'sort': 1 }, { 'taskId': 5, 'taskName': '今日累计支持10W金叶志', 'taskProgress': 0, 'userTaskProgress': null, 'taskStatus': 1, 'awardName': '大户召回积分', 'awardImg': '', 'sort': 1 }, { 'taskId': 6, 'taskName': '今日累计支持20W金叶志', 'taskProgress': 0, 'userTaskProgress': null, 'taskStatus': 1, 'awardName': '大户召回积分', 'awardImg': '', 'sort': 1 }] }, 'message': null } }
  return data
}
/**
 * @description 首页接口
 * @return {Object} data
 */
export const inlet = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/inlet`)
  return data
}
/**
 * @description 积分领取
 * @return {Object} data
 */
export const pointConvert = async (id) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/pointConvert/${id}`)
  return data
}
/**
 * @description 签到
 * @return {Object} data
 */
export const sign = async () => {
  // const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/sign`)
  const { data } = { data: { 'code': 200, 'data': { 'signInRsps': [{ 'day': 1, 'date': null, 'status': 3, 'awardName': '100金叶子', 'curDay': false }, { 'day': 2, 'date': null, 'status': 3, 'awardName': '1000金叶子', 'curDay': false }, { 'day': 3, 'date': null, 'status': 2, 'awardName': '100金叶子', 'curDay': true }, { 'day': 4, 'date': null, 'status': 0, 'awardName': '1000金叶子', 'curDay': false }, { 'day': 5, 'date': null, 'status': 0, 'awardName': '1000金叶子', 'curDay': false }], 'awardRsp': { 'awardName': '100金叶子', 'awardNum': 100, 'awardImg': '/group1/M00/41/4A/CmcEHV3EA4aAf8YPAACX9A-MxO0482.png' } }, 'message': null } }
  return data
}
/**
 * @description 任务领取
 * @return {Object} data
 */
export const taskFinish = async (taskId) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/biguser-backflow/taskFinish/${taskId}`)
  return data
}

const Service = {
  activityHome,
  inlet,
  pointConvert,
  sign,
  taskFinish
}
export default Service
