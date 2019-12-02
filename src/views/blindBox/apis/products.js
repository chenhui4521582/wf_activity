import client from '../client'

// 所有奖品
export const awardsList = () => {
  return client.post('@box/awards/list')
}
