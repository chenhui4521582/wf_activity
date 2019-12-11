import client from '../client'

// 所有奖品
export const awardsList = () => {
  return client.post('@box/awards/list')
}
// 热门奖品
export const hotAwardsList = () => {
  return client.post('@box/awards/hot-list')
}
