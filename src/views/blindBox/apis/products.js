import client from '../client'

export const awardsList = () => {
  return client.post('@box/awards/list')
}
