import client from '../client'

// 盒子列表
export const BoxList = () => {
  return client.post('@box/list')
}

// 跑马灯
export const NoticeList = sort => {
  return client.post(`@box/notice-list`)
}

/**
 * @des 透视/开盒
 * @param {number} category 1--盲盒 2--透视卡
 * @param {number} sort 盲盒位置
 */
export const Operation = ({ category, sort }) => {
  return client.post('@box/operation', {
    category, sort
  })
}

// 打开已透视后的盒子
export const Exchange = sort => {
  return client.post(`@box/exchange/${sort}`)
}

// 更换盲盒
export const ChangeOne = () => {
  return client.post(`@box/change-one`)
}
// 更换一批盲盒
export const ChangeAll = sort => {
  return client.post(`@box/change-all`)
}
/**
 * @des 盲盒变更信息
 * @param {number} category 操作类型 1--盲盒 2--透视
 * @return {Promise}
 */
export const Dynamic = category => {
  return client.post(`@box/dynamic/${category}`)
}
/**
 * @des 获取支付订单信息
 * @param {number} propType 购买类型 1--盒子 2--透视 3--邮费
 * @return {Promise}
 */
export const PayPoint = propType => {
  return client.post(`@box/pay-point/${propType}`)
}

// 领取奖品
export const Receiver = () => (
  client.post('@box/inventory/receiver')
)

// 首次进入，平台最近在玩显示
export const FirstLoad = () => client.post('//platform-api.beeplaying.com/wap/api/game/firstLoad/28')
