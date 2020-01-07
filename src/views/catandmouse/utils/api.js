import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/activity/mouseSpringDetail')
  return data
}
/**
 * @description 领取
 * @return {Object} data
 */
export const mouseReceive = async (step) => {
  const { data } = await $axios.post('//petcat-api.beeplaying.com/petcat/api/activity/mouseReceive', { step: step })
  return data
}
