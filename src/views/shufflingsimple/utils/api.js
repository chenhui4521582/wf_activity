import $axios from '../http'
/**
 * @description 投注奖励
 * @return {Object} data
 */

export const betAwards = async () => {
  const { data } = await $axios.post('//ops-api.beeplaying.com/ops/api/open-card/bet-awards')
  return data
}