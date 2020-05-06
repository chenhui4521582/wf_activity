import $axios from '@/http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'
const PLATFORM_API_BASE_URL = '//platform-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/lotto/activity-info`)
  return data
}
/**
 * @description 拉新 幸运转盘活动信息
 * @return {Object} data
 */
export const taskInfo = async () => {
  const { data } = await $axios.post(`${PLATFORM_API_BASE_URL}/task/api/activity/upgrade-wheel/task/info`)
  return data
}
const Service = {
  // 活动信息
  activityInfo
}
export default Service
