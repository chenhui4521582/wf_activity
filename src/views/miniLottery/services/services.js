import axios from './http'
const services = {
  getUserInfo: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/smallTreasure/userAccount'
    return axios.post(url, params)
  },
  getLotteryList: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/smallTreasure/main'
    return axios.post(url, params)
  },
  getHistoryList: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/smallTreasure/allWinningLotteryLog'
    return axios.post(url, params)
  },
  getDetails: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/smallTreasure/detail'
    return axios.post(url, params)
  },
  getLottery: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/smallTreasure/lottery'
    return axios.post(url, params)
  },
  getMyLotteryLog: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/smallTreasure/lotteryLog'
    return axios.post(url, params)
  }
}
export default services