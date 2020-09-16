import axios from './http'
/**
 *  @description  玩游戏 砸金蛋-获取活动信息
 */
const getInfo = ( params ) => {
  let url = '//platform-api.beeplaying.com/point/new/user/welfare/detail'
  return axios.post(url, params)
}




const services = {
  getInfo
}

export default services