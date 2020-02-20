import $axios from '../http'

const HOST = '//ops-api.beeplaying.com'

/**
 * @description 活动信息
 * @return {Object} data
 */
export const activityInfo = async () => {
  const { data } = await $axios.post(`${HOST}/ops/invite/activity-info`)
  return data
}

// 获取话费数量和分享用户的信息
export const getFragment = async userId => {
  const { data } = await $axios.post(`${HOST}/ops/invite/getFragment/${userId}`)
  return data
}

// 被邀请用户填写手机号领取礼包
export const phone = async ({
  channelId,
  phone,
  userId
}) => {
  const { data } = await $axios.post(`${HOST}/ops/invite/phone`, {
    channelId,
    phone,
    userId
  })
  return data
}

// 提现金叶子
export const withdraw = async (amount) => {
  const { data } = await $axios.post(`${HOST}/ops/invite/withdraw/${amount}`)
  return data
}
