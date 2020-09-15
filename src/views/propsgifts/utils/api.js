import $axios from '../../../http'

/**
 * @description 热门帖子列表
 * @return {Object} data
 */
export const getActInfo = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/prop-gift/activity-info')
  return data
}
/**
 * @description 抽奖
 * @return {Object} data
 */
export const drawPrize = async (times) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/prop-gift/draw/'+times)
  return data
}
/**
 * @description 兑换
 * @return {Object} data
 */
export const exchagePrize = async (sort) => {
  const {data} = await $axios.post(`//ops-api.beeplaying.com/ops/api/prop-gift/exchange/${sort}`)
  return data
}
/**
 * @description 获得记录
 * @return {Object} data
 */
export const getRecords = async (popType) => {
  const {data} = await $axios.post(popType==5?'//ops-api.beeplaying.com/ops/api/prop-gift/draw-record':'//ops-api.beeplaying.com/ops/api/prop-gift/exchange-record')
  return data
}
