import axios from './http'
const services = {
  /** 秒杀 **/
  commit: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/seckillActivity/pay'
    return axios.post(url, params)
  },
  /** 场次查询 **/
  getList: function(params) {
    let url = "//ops-api.beeplaying.com/ops/api/seckillActivity/period"
    return axios.post(url, params)
  },
  /** 活动信息 **/
  getActivityInfo: function(params) {
    let url = "//ops-api.beeplaying.com/ops/api/seckillActivity/info"
    return axios.post(url, params)
  },
  /** 查询详情 **/
  getActivityDetail: function(params) {
    let url = "//ops-api.beeplaying.com/ops/api/seckillActivity/periodInfo"
    return axios.post(url, params)
  },
  getRingServerStatus: function(params) {
    let url = "//quoits-api.beeplaying.com/quoits/api/quoitsgame/serverStatus"
    return axios.post(url, params)
  }
}
export default services