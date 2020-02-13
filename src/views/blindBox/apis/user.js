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
 * @des 用户未领取奖品数量（角标）
 * @return {Promise}
 */
export const Unreceived = () => client.post('@box/inventory/unreceived')

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
  name,
  placeId
}) => {
  return client.post('@box/user/edit-post-info', {
    address,
    mobile,
    name,
    placeId
  })
}

/**
 * @des 用户透视卡提示弹窗是否出现
 * @param {number} type 1--首页透视卡提示 2--详情页透视卡提示
 * @return {Promise}
 */
export const Popup = type => client.post(`@box/popup/${type}`)

// 用户金叶子信息
export const LeafsAccount = () => client.post(`@box/user/leafs-account`)

// 使用金叶子购买
export const LeafsPay = () => client.post(`@box/leafs-pay`)

// 获取省份
export const GetProvince = () => client.post('@uci/user/receiver/getProvince')

// 获取市
export const GetCity = proCode => client.post(`@uci/user/receiver/getCity/${proCode}`)

// 获取区
export const GetArea = cityCode => client.post(`@uci/user/receiver/getArea/${cityCode}`)

// 获取是否是新用户
export const GetGuide = () => client.post(`//platform-api.beeplaying.com/wap/api/plat/newUser/get-guide-position`, {version: 10})

// 更新用户信息（设置为老用户）
export const SetGuide = () => client.post(`//platform-api.beeplaying.com/wap/api/plat/newUser/set-guide-position`, { version: 10 })
