import client from '../client'

// params 是否失效 boolean
export const List = ({gameId, params}) => client.post('//trans-api.beeplaying.com/trans/api/coupon/list', {
  gameId, page: 1, pageSize: 9999, params
})
