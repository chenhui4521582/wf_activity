import axios from './http'
const host1 = 'http://rap2.taobao.org:38080/app/mock/253480'
const host = '//ops-api.beeplaying.com'
/**
 *  @description  充值送宝箱-获取活动信息
 */
const getInfo = ( params ) => {
  let url = `${host}/ops/api/recharge/box/activity-info`
  return axios.post(url, params)
}

/**
 *  @description  充值送宝箱-领取奖励
 */
const receiveAwards = ( params ) => {
  let url = `${host}/ops/api/recharge/box/receive-awards`
  return axios.post(url, params)
}


const services = {
  getInfo,
  receiveAwards
}
export default services