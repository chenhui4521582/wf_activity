import client from '../client'

// 幸运排行榜
export const RankList = ({ page, pageSize }) => client.post(`@box/awards-rank/list`, {
  page, pageSize
})
