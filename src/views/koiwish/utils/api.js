import $axios from '../../../http'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/koi-jackpot/activity-info')
  return data
}

/**
 * @description 奖励记录
 * @return {Object} data
 */

export const getAwardsList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/koi-jackpot/awards-list')
  return data
}
/**
 * @description 锦鲤记录
 * @return {Object} data
 */

export const getKoiList = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/koi-jackpot/koi-list')
  return data
}
/**
 * @description 领取奖励
 * @param {Number} id
 * @return {Object} data
 */

export const goReceive = async (id) => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/koi-jackpot/receive/'+id)
  return data
}
/**
 * @description 获取奖池动态
 * @return {Object} data
 */

export const getDynamic = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/koi-jackpot/dynamic')
  return data
}
/**
 * @description 许愿
 * @return {Object} data
 */
export const prizeVow = async ({jackpotType,round,amount}) => {
  const { data } = await $axios.post(`//ops-api.beeplaying.com/ops/api/koi-jackpot/lot/${jackpotType}/${round}/${amount}`)
  return data
}

