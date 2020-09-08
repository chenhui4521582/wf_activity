import client from '../client'

// 活动信息
export const fissionActivityInfo = async () => {
  const { data } = await client.post(`@box/fission/activity-info`)
  return data
}
// 接收人回调
export const fissionCallback = async (invitationCode) => {
  const { data } = await client.post(`@box/fission/callback/${invitationCode}`)
  return data
}
// 领取免费盲盒
export const fissionReceiveBox = async () => {
  const { data } = await client.post(`@box/fission/receive-box`)
  return data
}
// 领取优惠券
export const fissionReceiveCoupon = async () => {
  const { data } = await client.post(`@box/fission/receive-coupon`)
  return data
}
