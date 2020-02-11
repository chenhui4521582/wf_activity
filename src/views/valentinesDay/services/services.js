import axios from './http'
const services = {
  /** 获取情人节活动数据 **/
  getValentinesInfo: function(params) {
    let url = '//ops-api.beeplaying.com/ops/valentines/day/activity-info'
    return axios.post(url, params)
  },
  /** 领取爱心接口 **/
  getLoveNo: function(params) {
    let url = '//ops-api.beeplaying.com/ops/valentines/day/get-sweet-heart/{type}'
    return axios.post(url.replace('{type}', params))
  },
  /** 抽红包接口 **/
  getLotter: function(params) {
    let url = '//ops-api.beeplaying.com/ops/valentines/day/lottery'
    return axios.post(url, params)
  },
  /** 获取礼包列表 **/
  getCardList: function(params) {
    let url = '//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/valentines'
    return axios.post(url, params)
  }
}
export default services