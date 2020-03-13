import $axios from '../../../http'

const OPS_API_BASE_URL = '//ops-api.beeplaying.com'


/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityinfo = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/activity-info`)
    return data
}
/**
 * @description 金币获取记录
 * @return {Object} data
 */
export const coinrecord = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/coin-record`)
    return data
}
/**
 * @description 往期榜单
 * @return {Object} data
 */
export const prerankinfo = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/pre-rank-info`)
    return data
}

 /* 
 * @description 奖励列表
 * @return {Object} data
 */
export const ranklist = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/rank-list`)
    return data
}
/**
 * @description 总排行榜列表
 * @return {Object} data
 */
export const totalranklist = async () => {
    const { data } = await $axios.post(`${OPS_API_BASE_URL}/ops/api/monopoly/total-rank-list`)
    return data
}









