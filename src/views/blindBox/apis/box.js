import client from '../client'

// 盒子列表
export const boxList = () => {
  return client.post('@box/list')
}
