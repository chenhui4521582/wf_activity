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

// 用户信息透视次数、开盒次数
export const UserInfo = () => {
  return client.post(`@box/user/info`)
}

// 用户邮寄信息
export const PostInfo = () => {
  return client.post('@box/user/post-info')
}

/**
 * @des 编辑用户邮寄信息
 * @return {Promise}
 * @param {string} address 地址
 * @param {string} mobile 电话
 * @param {string} name 姓名
 */
export const EditPostInfo = ({
  address,
  mobile,
  name
}) => {
  return client.post('@box/user/edit-post-info', {
    address,
    mobile,
    name
  })
}
