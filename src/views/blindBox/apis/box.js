import client from '../client'

// 盲盒锁定
export const Lock = sort => {
  return client.post(`@box/lock/${sort}`)
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
export const Dynamic = sort => {
  return client.post(`@box/change-one/${sort}`)
}
