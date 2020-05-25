import axios from './http'
const host1 = 'http://rap2.taobao.org:38080/app/mock/253480'
const host = '//platform-api.beeplaying.com'
/**
 *  @description  玩家攻略发布-获取活动信息
 */
const getInfo = ( params ) => {
  let url = `${host}/wap/api/wap/coterie/home-info`
  return axios.post(url, params)
}

/**
 *  @description  玩家攻略发布-分类下的攻略列表
 */
const getList = ( params ) => {
  let url = `${host}/wap/api/wap/coterie/page-list`
  return axios.post(url, params)
}

/**
 *  @description  玩家攻略发布-获取攻略用户信息
 */
const getStrategyUserInfo = ( params ) => {
  let url = `${host}/wap/api/plat/user/info`
  return axios.post(url, params)
}

/**
 *  @description  玩家攻略发布-排行榜列表
 */
const getRanking = ( params ) => {
  let url = `${host}/wap/api/wap/coterie/rank-list`
  return axios.post(url, params)
}

/**
 *  @description  玩家攻略发布-点赞
 */
const setPraise = ( params ) => {
  let url = `${host}/wap/api/wap/coterie/praise`
  return axios.post(url, params)
}
/**
 *  @description  记录从回归礼包跳转到攻略页的行为
 */
const singleBehavior8 = () => {
  let url = `${host}/wap/api/plat/newUser/singleBehavior/8`
  return axios.post(url)
}

const services = {
  getInfo,
  getList,
  getStrategyUserInfo,
  getRanking,
  setPraise,
  singleBehavior8
}
export default services
