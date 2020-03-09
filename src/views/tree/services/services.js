import axios from './http'
const services = {
  /** 获取活动信息 **/
  getInfo: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/tree/activity-info'
    return axios.post(url, params)
  },
  /** 获取奖品信息**/
  getAwardList: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/tree/award-info'
    return axios.post(url, params)
  },
  /** 领取树苗 **/
  getTree: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/tree/receive-tree/{awardId}'
    return axios.post(url.replace('{awardId}', params))
  },
  /** 获取任务列表 **/
  getTask: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/tree/find-user-task-panel'
    return axios.post(url, params)
  },
  /** 签到 **/
  sign: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/tree/sign'
    return axios.post(url, params)
  },
  /** 领取任务奖励 **/
  getTaskAward: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/tree/task-receive/{taskId}'
    return axios.post(url.replace('{taskId}', params))
  },
  /** 领取果实奖励 **/
  getAward: function(params) {
    let url = '//ops-api.beeplaying.com/ops/api/tree/receive-awards'
    return axios.post(url, params)
  },
  /** 浇水施肥 **/
  watering: function(params) {
    // let url = '//ops-api.beeplaying.com/ops/api/tree/watering'
    let url = '//ops-api.beeplaying.com/ops/api/tree/watering'
    return axios.post(url, params)
  },
  /** 收获列表 **/
  getLog: function(params) {
    // let url = '//ops-api.beeplaying.com/ops/api/tree/watering'
    let url = '//ops-api.beeplaying.com/ops/api/tree/user-award-list'
    return axios.post(url, params)
  },
  /** 获取新手引导 **/
  getNewUserGuide: function(params) {
    let url = '//platform-api.beeplaying.com/wap/api/plat/newUser/singleBehavior/6'
    return axios.post(url, params)
  },
  getCardList: function(params) {
    let url = '//shop-api.beeplaying.com/shop/api/mall/showLeaguePacksList/tree'
    return axios.post(url, params)
  }
}
export default services