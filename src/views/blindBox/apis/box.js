import client from '../client'

// 盒子列表
export const BoxList = () => {
  return client.post('@box/list')
}
