import axios from '../http'
let services = {
  getActInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/activity-info'
    return axios.post(url)
  },
  getUserInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/user-info'
    return axios.post(url)
  },
  getHornList: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/notice-list'
    return axios.post(url)
  },
  runAnimation: function (sort) {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/bet/' + sort
    return axios.post(url)
  },
  gameReceiveRecord: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/user-awards'
    return axios.post(url)
  },
  showLeaguePacksList: function (bagBatchId) {
    let url = '//shop-api.beeplaying.com/shop/api/mall/getMallProductListByType/250/'+bagBatchId
    return axios.post(url)
  },
  taskProgressInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/task-progress'
    return axios.post(url)
  },
  gameProgress: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/user-progress'
    return axios.post(url)
  },
  gameReceive: function (sort) {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/game-receive/' + sort
    return axios.post(url)
  },
  taskReceive: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/task-receive'
    return axios.post(url)
  },
  rankList: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/rank-list'
    return axios.post(url)
  },
  activityInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/activity-info'
    return axios.post(url)
  },
  getAwardsInfo: function (type) {
    let url = '//ops-api.beeplaying.com/ops/api/crazy-shake/bet-awards/' + type
    return axios.post(url)
  }
}

export default services
