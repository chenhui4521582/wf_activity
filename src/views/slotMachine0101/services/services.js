import axios from '../http'
let services = {
  getUserInfo: function(params) {
    let url = "//ops-api.beeplaying.com/ops/api/number-wheel/activity-info"
    return axios.post(url, params)
  },
  getHornList: function(params) {
    let url = "//ops-api.beeplaying.com/ops/api/number-wheel/notice-list"
    return axios.post(url, params)
  },
  runAnimation: function(params) {
    let url = "//ops-api.beeplaying.com/ops/api/number-wheel/bet"
    return axios.post(url, params)
  },
  gameReceiveRecord: function(params) {
    let url = "//ops-api.beeplaying.com/ops/api/open-card/user-awards"
    return axios.post(url, params)
  },
}

export default services
