import $axios from '../../../http'

/**
 * @description 热门帖子列表
 * @return {Object} data
 */
export const getPostsList = async () => {
  const {data} = await $axios.post('//platform-api.beeplaying.com/wap/api/wap/coterie/posts-list')
  return data
}
/**
 * @description 热门帖子详情
 * @return {Object} data
 */

export const getDetailById = async (id) => {
  const {data} = await $axios.post('//platform-api.beeplaying.com/wap/api/wap/coterie/posts-detail/' + id)
  return data
}

/**
 * @description 帖子评论
 * @return {Object} data
 */

export const commitComment = async (params) => {
  const {data} = await $axios.post('//platform-api.beeplaying.com/wap/api/wap/coterie/comment', params)
  return data
}
/**
 * @description 点赞
 * @return {Object} data
 */
export const commitPraise = async (params) => {
  const {data} = await $axios.post('//platform-api.beeplaying.com/wap/api/wap/coterie/praise', params)
  return data
}
/**
 * @description 所有游戏礼包列表
 * @return {Object} data
 */
export const getGamePacks = async () => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/cdkey/game-pack')
  return data
}
/**
 * @description 领取礼包
 * @return {Object} data
 */
export const getAwards = async (params) => {
  const {data} = await $axios.post('//ops-api.beeplaying.com/ops/api/cdkey/getAwards', params)
  return data
}
