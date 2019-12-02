import client from '../client'

// 用户开启盒子跑马灯
export const NoticeList = () => {
  return client.post('@box/notice-list')
}

// 用户开盒记录
export const OpenList = () => {
  return client.post('@box/inventory/open-list')
}

/**
 * @des 用户发货记录
 * @param {number} state 发货状态
 * @return {Promise}
 */
export const InventoryList = (state) => {
  return client.post(`@box/inventory/list/${state}`)
}

// 用户信息
export const UserInfo = () => {
  return client.post(`@box/user/info`)
}
