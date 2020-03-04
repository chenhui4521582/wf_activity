import axios from '../http'
let services = {
  getActInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/activity-info'
    return axios.post(url)
  },
  getUserInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/user-info'
    return axios.post(url)
  },
  getHornList: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/notice-list'
    return axios.post(url)
  },
  runAnimation: function (sort) {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/bet/' + sort
    return axios.post(url)
  },
  gameReceiveRecord: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/user-awards'
    return axios.post(url)
  },
  showLeaguePacksList: function () {
    let url = '//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/kill-virus'
    return axios.post(url)
  },
  taskProgressInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/task-progress'
    return axios.post(url)
  },
  gameProgress: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/game-progress'
    return axios.post(url)
  },
  gameReceive: function (sort) {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/game-receive/' + sort
    return axios.post(url)
  },
  taskReceive: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/task-receive'
    return axios.post(url)
  },
  rankList: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/rank-list'
    return axios.post(url)
  },
  activityInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/activity-info'
    return axios.post(url)
  },
  getAwardsInfo: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/bet-awards'
    return axios.post(url)
  },
  getMyRank: function () {
    let url = '//ops-api.beeplaying.com/ops/api/kill-virus/my-rank'
    return axios.post(url)
  }
}

export default services
