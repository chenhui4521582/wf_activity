import axios from '../http'
let services = {
  getActInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/activity-info'
    return axios.post(url)
  },
  getUserInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/user-info'
    return axios.post(url)
  },
  getHornList: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/notice-list'
    return axios.post(url)
  },
  runAnimation: function (sort) {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/bet/' + sort
    return axios.post(url)
  },
  gameReceiveRecord: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/user-awards'
    return axios.post(url)
  },
  showLeaguePacksList: function () {
    let url = '//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/christmas'
    return axios.post(url)
  },
  taskProgressInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/task-progress'
    return axios.post(url)
  },
  gameProgress: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/game-progress'
    return axios.post(url)
  },
  gameReceive: function (sort) {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/game-receive/' + sort
    return axios.post(url)
  },
  taskReceive: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/task-receive'
    return axios.post(url)
  },
  rankList: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/rank-list'
    return axios.post(url)
  },
  activityInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/activity-info'
    return axios.post(url)
  },
  getAwardsInfo: function (type) {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/bet-awards/' + type
    return axios.post(url)
  },
  getMyRank: function () {
    let url = '//ops-api.beeplaying.com/ops/api/christmas/my-rank'
    return axios.post(url)
  }
}

export default services
