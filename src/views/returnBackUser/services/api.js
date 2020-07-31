import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const PLATFORM_API = '//platform-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityHome = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/small-user-return/activityHome`)
  return data
}
/**
 * @description 兑换明细
 * @return {Object} data
 */
export const changeRecordList = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/small-user-return/changeRecordList`)
  return data
}
/**
 * @description 首页调用
 * @return {Object} data
 */
export const inlet = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/small-user-return/inlet`)
  return data
}
/**
 * @description 登录领取
 * @return {Object} data
 */
export const loginAward = async (dayNum) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/small-user-return/loginAward/${dayNum}`)
  return data
}
/**
 * @description 提现
 * @return {Object} data
 */
export const redPackConvert = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/small-user-return/redPackConvert`)
  return data
}
/**
 * @description 任务完成
 * @return {Object} data
 */
export const taskFinish = async (taskId) => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/small-user-return/taskFinish/${taskId}`)
  return data
}
/**
 * @description 任务完成
 * @return {Object} data
 */
export const singleBehavior = async (id) => {
  const { data } = await $axios.post(`${PLATFORM_API}/wap/api/plat/newUser/singleBehavior/${id}`)
  return data
}

const Service = {
  activityHome,
  changeRecordList,
  inlet,
  loginAward,
  redPackConvert,
  taskFinish,
  singleBehavior
}
export default Service
