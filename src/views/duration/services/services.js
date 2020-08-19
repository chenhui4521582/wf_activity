import axios from './http'
/**
 *  @description  玩游戏 砸金蛋-获取活动信息
 */
const getInfo = ( params ) => {
  let url = '//platform-api.beeplaying.com/point/api/game/duration/activity-info'
  return axios.post(url, params)
}

/**
 *  @description  玩游戏 砸金蛋-一键领取
 */
const batchReceive = ( params ) => {
  let url = '//platform-api.beeplaying.com/point/api/game/duration/batch-receive'
  return axios.post(url, params)
}

/**
 *  @description  玩游戏 砸金蛋-点击领取
 */
const itemReceive = ( params ) => {
  let url = `//platform-api.beeplaying.com/point/api/game/duration/receive/${params}`
  return axios.post(url)
}

/**
 *  @description  玩游戏 砸金蛋-获取我的奖品
 */
const getMyAward = ( params ) => {
  let url = `//platform-api.beeplaying.com/point/api/game/duration/user-awards`
  return axios.post(url, params)
}

/**
 *  @description  玩游戏 砸金蛋-获取跑马灯
 */
const getNotice = ( params ) => {
  let url = `//platform-api.beeplaying.com/point/api/game/duration/notice-list`
  return axios.post(url, params)
}



const services = {
  getInfo,
  batchReceive,
  itemReceive,
  getMyAward,
  getNotice
}

export default services